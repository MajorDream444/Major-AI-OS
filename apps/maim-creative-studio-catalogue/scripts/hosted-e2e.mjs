#!/usr/bin/env node
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import process from 'node:process'
import { createClient } from '@supabase/supabase-js'
import pg from 'pg'
import { cleanupRun, PROJECT_REF, readPrivateManifest, sanitizeResult, validateHostedDestinations, validateManifestPath, writePrivateManifest } from '../src/lib/hostedE2eCore.mjs'

const [phase, manifestArg] = process.argv.slice(2)
if (!['run', 'expiration', 'cleanup'].includes(phase) || !manifestArg) throw new Error('Usage: hosted-e2e.mjs <run|expiration|cleanup> <absolute-private-manifest-path>')
const manifestPath = validateManifestPath(manifestArg, process.cwd())
const log = (name, status, detail) => console.log(JSON.stringify(sanitizeResult(name, status, detail)))
const destinations = validateHostedDestinations(process.env)
const admin = createClient(destinations.supabaseOrigin, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
const publicClient = () => createClient(destinations.supabaseOrigin, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
const pool = new pg.Pool({ connectionString: destinations.databaseUrl, ssl: destinations.databaseSsl ? { rejectUnauthorized: true } : false, max: 1 })

async function cleanupDatabase(records) {
  const client = await pool.connect()
  try {
    await client.query('begin')
    await client.query('delete from maim.memberships where workspace_id = any($1::uuid[]) and user_id = any($2::uuid[])', [records.workspaceIds ?? [], records.userIds ?? []])
    await client.query('delete from maim.asset_catalog_assets where workspace_id = any($1::uuid[]) and (id = any($2::uuid[]) or stable_id = any($3::text[]))', [records.workspaceIds ?? [], records.assetIds ?? [], records.stableIds ?? []])
    await client.query('delete from maim.asset_catalog_projects where id = any($1::uuid[]) and workspace_id = any($2::uuid[])', [records.projectIds ?? [], records.workspaceIds ?? []])
    await client.query('delete from maim.asset_catalog_byte_versions bv where bv.id = any($1::uuid[]) and not exists (select 1 from maim.asset_catalog_source_locations s where s.byte_version_id=bv.id)', [records.byteVersionIds ?? []])
    for (const version of records.byteVersions ?? []) await client.query('delete from maim.asset_catalog_byte_versions bv where bv.sha256=$1 and bv.size_bytes=$2 and not exists (select 1 from maim.asset_catalog_source_locations s where s.byte_version_id=bv.id)', [version.sha256, version.sizeBytes])
    await client.query('delete from maim.workspaces where id = any($1::uuid[]) and order_reference = any($2::text[])', [records.workspaceIds ?? [], records.orderReferences ?? []])
    await client.query('commit')
  } catch (error) { await client.query('rollback'); throw error } finally { client.release() }
}
async function deleteUser(id) { const { error } = await admin.auth.admin.deleteUser(id); if (error && !/not found/i.test(error.message)) throw error }
const adapters = { cleanupDatabase, deleteUser }

async function requestCatalogue(token, workspaceId) {
  const headers = { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(destinations.previewBypass ? { 'x-vercel-protection-bypass': destinations.previewBypass } : {}) }
  return fetch(`${destinations.endpoint}?workspace_id=${encodeURIComponent(workspaceId)}`, { headers, redirect: 'error', cache: 'no-store' })
}
async function importManifest(workspaceId, item, key = process.env.SUPABASE_SERVICE_ROLE_KEY) {
  return fetch(`${destinations.supabaseOrigin}/rest/v1/rpc/reconcile_maim_asset_catalog_manifest`, { method: 'POST', redirect: 'error', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_workspace_id: workspaceId, p_manifest: [item] }) })
}
async function importResult(workspaceId, item, key) {
  const response = await importManifest(workspaceId, item, key)
  const body = await response.json().catch(() => ({}))
  assert.equal(response.status, 200, `import bridge returned ${response.status}: ${String(body.message ?? body.code ?? 'unknown error')}`)
  return body
}

async function cleanup(manifest) { const result = await cleanupRun(manifest, adapters); await writePrivateManifest(manifestPath, manifest); log('cleanup', 'pass', result) }

async function run() {
  const runId = `HOSTED-E2E-${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}`
  const manifest = { schemaVersion: 1, runId, projectRef: PROJECT_REF, phase: 'starting', createdAt: new Date().toISOString(), records: { userIds: [], workspaceIds: [], orderReferences: [], stableIds: [], driveFileIds: [], assetIds: [], projectIds: [], byteVersionIds: [], byteVersions: [] }, sensitive: {} }
  await writePrivateManifest(manifestPath, manifest)
  let completed = false
  try {
    const password = `Maim-${crypto.randomBytes(18).toString('base64url')}!`
    const emails = [`maim-e2e-a+${runId.toLowerCase()}@example.invalid`, `maim-e2e-b+${runId.toLowerCase()}@example.invalid`]
    for (const email of emails) {
      const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { synthetic_run_id: runId } })
      if (error) throw error
      manifest.records.userIds.push(data.user.id); await writePrivateManifest(manifestPath, manifest)
    }
    const sessions = []
    for (const email of emails) {
      const client = publicClient(); const { data, error } = await client.auth.signInWithPassword({ email, password })
      if (error || !data.session) throw error ?? new Error('Synthetic session was not issued.')
      sessions.push(data.session)
    }
    const workspaceIds = [crypto.randomUUID(), crypto.randomUUID()]
    const orderReferences = [`${runId}-A`, `${runId}-B`]
    manifest.records.workspaceIds = workspaceIds; manifest.records.orderReferences = orderReferences; await writePrivateManifest(manifestPath, manifest)
    const db = await pool.connect()
    try {
      await db.query('begin')
      await db.query("insert into maim.workspaces(id,order_reference,status) values($1,$2,'active'),($3,$4,'active')", [workspaceIds[0], orderReferences[0], workspaceIds[1], orderReferences[1]])
      await db.query("insert into maim.memberships(workspace_id,user_id,role) values($1,$2,'operator'),($3,$4,'operator')", [workspaceIds[0], manifest.records.userIds[0], workspaceIds[1], manifest.records.userIds[1]])
      await db.query('commit')
    } catch (error) { await db.query('rollback'); throw error } finally { db.release() }
    const items = ['A','B'].map((label, index) => ({ stable_id: `${runId}-${label}`, sha256: (index ? 'b' : 'a').repeat(64), size_bytes: 12 + index, format: index ? '.svg' : '.png', mime_type: index ? 'image/svg+xml' : 'image/png', original_filename: `synthetic-${label.toLowerCase()}.${index ? 'svg':'png'}`, project_code: `E2E-${label}`, project: `Synthetic ${label}`, project_relative_path: `  assets/synthetic-${label.toLowerCase()}`, drive_file_id: `${runId}-DRIVE-${label}`, drive_url: `https://drive.google.com/file/d/${runId}-DRIVE-${label}/view`, upload_status: 'uploaded', approval_status: 'unreviewed', integrity_status: 'sha256_verified', dependencies: [] }))
    manifest.records.stableIds = items.map(x=>x.stable_id); manifest.records.driveFileIds = items.map(x=>x.drive_file_id); manifest.records.byteVersions=items.map(x=>({sha256:x.sha256,sizeBytes:x.size_bytes})); await writePrivateManifest(manifestPath, manifest)
    const first = await importResult(workspaceIds[0], items[0]); assert.equal(first.inserted, 1)
    const repeat = await importResult(workspaceIds[0], items[0]); assert.equal(repeat.reconciled, 1)
    const second = await importResult(workspaceIds[1], items[1]); assert.equal(second.inserted, 1)
    const db2 = await pool.query(`select a.id asset_id,p.id project_id,bv.id byte_version_id from maim.asset_catalog_assets a join maim.asset_catalog_project_memberships pm on pm.asset_id=a.id join maim.asset_catalog_projects p on p.id=pm.project_id join maim.asset_catalog_source_locations s on s.asset_id=a.id join maim.asset_catalog_byte_versions bv on bv.id=s.byte_version_id where a.workspace_id=any($1::uuid[]) and a.stable_id=any($2::text[])`, [workspaceIds, manifest.records.stableIds])
    manifest.records.assetIds=db2.rows.map(r=>r.asset_id); manifest.records.projectIds=db2.rows.map(r=>r.project_id); manifest.records.byteVersionIds=db2.rows.map(r=>r.byte_version_id); await writePrivateManifest(manifestPath, manifest)
    assert.equal((await requestCatalogue(null, workspaceIds[0])).status, 401)
    assert.equal((await requestCatalogue(sessions[0].access_token, workspaceIds[0])).status, 200)
    assert.equal((await requestCatalogue(sessions[1].access_token, workspaceIds[1])).status, 200)
    assert.equal((await requestCatalogue(sessions[0].access_token, workspaceIds[1])).status, 403)
    assert.equal((await requestCatalogue(sessions[1].access_token, workspaceIds[0])).status, 403)
    const deniedImport = await importManifest(workspaceIds[0], items[0], sessions[0].access_token); assert.ok([401,403].includes(deniedImport.status))
    const deniedWrite = await fetch(`${destinations.supabaseOrigin}/rest/v1/asset_catalog_assets`, { method:'POST', headers:{apikey:process.env.SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${sessions[0].access_token}`,'Content-Type':'application/json'}, body:'{}', redirect:'error' }); assert.ok([401,403,404,406].includes(deniedWrite.status))
    await pool.query('delete from maim.memberships where workspace_id=$1 and user_id=$2', [workspaceIds[0], manifest.records.userIds[0]])
    assert.equal((await requestCatalogue(sessions[0].access_token, workspaceIds[0])).status, 403)
    manifest.phase='expiration_pending'; manifest.sensitive.expirationAccessToken=sessions[1].access_token; manifest.expiration={expiresAt:new Date(sessions[1].expires_at*1000).toISOString(), observed:false}; await writePrivateManifest(manifestPath, manifest)
    completed=true; log('hosted-e2e', 'pass', 'expiration_pending')
  } finally {
    if (!completed) { try { await cleanup(manifest) } catch { log('cleanup','failed','use idempotent cleanup command') } }
  }
}

async function expiration() {
  const manifest = await readPrivateManifest(manifestPath)
  if (manifest.phase === 'cleaned') return log('expiration','skipped','run already cleaned')
  if (Date.now() <= Date.parse(manifest.expiration.expiresAt)) return log('expiration','pending',manifest.expiration.expiresAt)
  const response = await requestCatalogue(manifest.sensitive.expirationAccessToken, manifest.records.workspaceIds[1])
  assert.equal(response.status, 401)
  manifest.expiration.observed=true; manifest.expiration.observedAt=new Date().toISOString(); manifest.sensitive={}; manifest.phase='expiration_observed'; await writePrivateManifest(manifestPath, manifest)
  log('expiration','pass','expired token rejected'); await cleanup(manifest)
}

try {
  if (phase==='run') await run(); else if (phase==='expiration') await expiration(); else await cleanup(await readPrivateManifest(manifestPath))
} catch {
  log('hosted-e2e', 'failed', 'inspect the private manifest and run idempotent cleanup')
  process.exitCode = 1
} finally { await pool.end() }
