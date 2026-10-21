#!/usr/bin/env node
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import process from 'node:process'
import { createClient } from '@supabase/supabase-js'
import { assertCleanupBaseline, importerHeaders, PROJECT_REF, readPrivateManifest, renderPluginCleanupSql, renderPluginRevokeSql, renderPluginSetupSql, sanitizeResult, validateHostedDestinations, validateManifestPath, writePrivateManifest } from '../src/lib/hostedE2eCore.mjs'

const [phase, manifestArg, ...args] = process.argv.slice(2)
const phases = ['prepare','record-baseline','execute','plugin-sql','revoked','expiration','record-cleanup','cleanup-auth']
if (!phases.includes(phase) || !manifestArg) throw new Error(`Usage: hosted-e2e.mjs <${phases.join('|')}> <absolute-private-manifest-path>`)
const manifestPath = validateManifestPath(manifestArg, process.cwd())
const log = (name, status, detail) => console.log(JSON.stringify(sanitizeResult(name, status, detail)))
const destinations = validateHostedDestinations(process.env)
const admin = createClient(destinations.supabaseOrigin, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
const publicClient = () => createClient(destinations.supabaseOrigin, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })

async function deleteUser(id) { const { error } = await admin.auth.admin.deleteUser(id); if (error && !/not found/i.test(error.message)) throw error }
async function requestCatalogue(token, workspaceId) {
  const headers = { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(destinations.previewBypass ? { 'x-vercel-protection-bypass': destinations.previewBypass } : {}) }
  return fetch(`${destinations.endpoint}?workspace_id=${encodeURIComponent(workspaceId)}`, { headers, redirect: 'error', cache: 'no-store' })
}
async function readAssets(token, workspaceId) {
  const response = await requestCatalogue(token, workspaceId); const body = await response.json().catch(() => ({}))
  assert.equal(response.status, 200, `catalogue returned ${response.status}`); assert.ok(Array.isArray(body.assets), 'catalogue response has no assets array')
  return body.assets
}
async function importManifest(workspaceId, item, credentials = { apiKey: process.env.SUPABASE_SERVICE_ROLE_KEY, bearer: process.env.SUPABASE_SERVICE_ROLE_KEY }) {
  return fetch(`${destinations.supabaseOrigin}/rest/v1/rpc/reconcile_maim_asset_catalog_manifest`, { method: 'POST', redirect: 'error', headers: importerHeaders(credentials.apiKey, credentials.bearer), body: JSON.stringify({ p_workspace_id: workspaceId, p_manifest: [item] }) })
}
async function importResult(workspaceId, item) {
  const response = await importManifest(workspaceId, item); const body = await response.json().catch(() => ({}))
  assert.equal(response.status, 200, `import bridge returned ${response.status}: ${String(body.message ?? body.code ?? 'unknown error')}`); return body
}
function numericCounts(values) {
  const result = Object.fromEntries(values.map((v,i) => [['assets','projects','sources','byteVersions','runWorkspaces','runAssets'][i], Number(v)]))
  if (Object.values(result).some(v => !Number.isSafeInteger(v) || v < 0)) throw new Error('Plugin counts must be non-negative integers.')
  return result
}

async function prepare() {
  const runId = `HOSTED-E2E-${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}`
  const password = `Maim-${crypto.randomBytes(18).toString('base64url')}!`
  const workspaceIds = [crypto.randomUUID(), crypto.randomUUID()]; const orderReferences = [`${runId}-A`, `${runId}-B`]
  const items = ['A','B'].map((label, index) => ({ stable_id: `${runId}-${label}`, sha256: (index ? 'b' : 'a').repeat(64), size_bytes: 12 + index, format: index ? '.svg' : '.png', mime_type: index ? 'image/svg+xml' : 'image/png', original_filename: `synthetic-${label.toLowerCase()}.${index ? 'svg':'png'}`, project_code: `E2E-${label}`, project: `Synthetic ${label}`, project_relative_path: `  assets/synthetic-${label.toLowerCase()}`, drive_file_id: `${runId}-DRIVE-${label}`, drive_url: `https://drive.google.com/file/d/${runId}-DRIVE-${label}/view`, upload_status: 'uploaded', approval_status: 'unreviewed', integrity_status: 'sha256_verified', dependencies: [] }))
  const records = { userIds: [], workspaceIds, orderReferences, stableIds: items.map(x=>x.stable_id), driveFileIds: items.map(x=>x.drive_file_id), byteVersions: items.map(x=>({sha256:x.sha256,sizeBytes:x.size_bytes})), items }
  const manifest = { schemaVersion: 2, runId, projectRef: PROJECT_REF, phase: 'preparing', createdAt: new Date().toISOString(), records, sensitive: { password } }
  await writePrivateManifest(manifestPath, manifest)
  const emails = [`maim-e2e-a+${runId.toLowerCase()}@example.invalid`, `maim-e2e-b+${runId.toLowerCase()}@example.invalid`]
  try {
    for (const email of emails) {
      const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { synthetic_run_id: runId } })
      if (error) throw error
      records.userIds.push(data.user.id); await writePrivateManifest(manifestPath, manifest)
    }
  } catch (error) { for (const id of records.userIds) await deleteUser(id).catch(()=>{}); throw error }
  manifest.sensitive.emails = emails; manifest.phase = 'plugin_setup_pending'; await writePrivateManifest(manifestPath, manifest)
  log('prepare','pass','MAIM ECOSYSTEM plugin setup and baseline capture required')
}
async function recordBaseline() {
  const manifest=await readPrivateManifest(manifestPath); assert.equal(manifest.phase,'plugin_setup_pending')
  manifest.baseline=numericCounts(args.slice(0,4)); manifest.phase='plugin_ready'; await writePrivateManifest(manifestPath,manifest); log('baseline','recorded','plugin setup acknowledged')
}
async function execute() {
  const manifest=await readPrivateManifest(manifestPath); assert.equal(manifest.phase,'plugin_ready')
  const sessions=[]
  for (const email of manifest.sensitive.emails) { const client=publicClient(); const {data,error}=await client.auth.signInWithPassword({email,password:manifest.sensitive.password}); if(error||!data.session) throw error??new Error('Synthetic session was not issued.'); sessions.push(data.session) }
  const [wa,wb]=manifest.records.workspaceIds; const [a,b]=manifest.records.items
  const first=await importResult(wa,a); assert.equal(first.inserted,1)
  const repeat=await importResult(wa,a); assert.equal(repeat.reconciled,1)
  const second=await importResult(wb,b); assert.equal(second.inserted,1)
  assert.equal((await requestCatalogue(null,wa)).status,401)
  const assetsA=await readAssets(sessions[0].access_token,wa); const assetsB=await readAssets(sessions[1].access_token,wb)
  assert.deepEqual(assetsA.map(x=>x.stable_id),[a.stable_id]); assert.deepEqual(assetsB.map(x=>x.stable_id),[b.stable_id])
  assert.equal(assetsA.length,1); assert.equal(assetsB.length,1)
  assert.equal((await requestCatalogue(sessions[0].access_token,wb)).status,403); assert.equal((await requestCatalogue(sessions[1].access_token,wa)).status,403)
  const deniedImport=await importManifest(wa,a,{apiKey:process.env.SUPABASE_PUBLISHABLE_KEY,bearer:sessions[0].access_token}); assert.ok([401,403].includes(deniedImport.status))
  const deniedWrite=await fetch(`${destinations.supabaseOrigin}/rest/v1/asset_catalog_assets`,{method:'POST',headers:importerHeaders(process.env.SUPABASE_PUBLISHABLE_KEY,sessions[0].access_token),body:'{}',redirect:'error'}); assert.ok([401,403,404,406].includes(deniedWrite.status))
  manifest.sensitive.sessions=sessions.map(s=>({accessToken:s.access_token,expiresAt:s.expires_at})); manifest.phase='plugin_revoke_pending'; await writePrivateManifest(manifestPath,manifest)
  log('execute','pass','exact identities/counts verified; plugin revocation required')
}
async function revoked() {
  const manifest=await readPrivateManifest(manifestPath); assert.equal(manifest.phase,'plugin_revoke_pending')
  const response=await requestCatalogue(manifest.sensitive.sessions[0].accessToken,manifest.records.workspaceIds[0]); assert.equal(response.status,403)
  const session=manifest.sensitive.sessions[1]; manifest.expiration={expiresAt:new Date(session.expiresAt*1000).toISOString(),observed:false}; manifest.sensitive.expirationAccessToken=session.accessToken; delete manifest.sensitive.sessions; manifest.phase='expiration_pending'; await writePrivateManifest(manifestPath,manifest); log('revoked','pass','expiration_pending')
}
async function expiration() {
  const manifest=await readPrivateManifest(manifestPath); assert.equal(manifest.phase,'expiration_pending')
  if(Date.now()<=Date.parse(manifest.expiration.expiresAt)) return log('expiration','pending',manifest.expiration.expiresAt)
  assert.equal((await requestCatalogue(manifest.sensitive.expirationAccessToken,manifest.records.workspaceIds[1])).status,401)
  manifest.expiration.observed=true; manifest.expiration.observedAt=new Date().toISOString(); delete manifest.sensitive.expirationAccessToken; manifest.phase='plugin_cleanup_pending'; await writePrivateManifest(manifestPath,manifest); log('expiration','pass','MAIM ECOSYSTEM plugin cleanup required')
}
async function recordCleanup() {
  const manifest=await readPrivateManifest(manifestPath); const after=numericCounts(args.slice(0,6)); assertCleanupBaseline(manifest.baseline,after)
  manifest.cleanup={pluginVerified:true,after}; manifest.phase='auth_cleanup_pending'; await writePrivateManifest(manifestPath,manifest); log('cleanup','verified','baseline restored')
}
async function cleanupAuth() {
  const manifest=await readPrivateManifest(manifestPath); assert.equal(manifest.cleanup?.pluginVerified,true,'Plugin cleanup must be verified before Auth cleanup.')
  for(const id of manifest.records.userIds) await deleteUser(id)
  manifest.sensitive={}; manifest.phase='cleaned'; manifest.cleanedAt=new Date().toISOString(); await writePrivateManifest(manifestPath,manifest); log('cleanup-auth','pass','synthetic users removed')
}
async function pluginSql() {
  const manifest=await readPrivateManifest(manifestPath); const kind=args[0]
  if(kind==='setup') process.stdout.write(renderPluginSetupSql(manifest.records))
  else if(kind==='revoke') process.stdout.write(renderPluginRevokeSql(manifest.records))
  else if(kind==='cleanup') process.stdout.write(renderPluginCleanupSql(manifest.records,manifest.baseline))
  else throw new Error('plugin-sql requires setup, revoke, or cleanup')
}

try {
  if(phase==='prepare') await prepare(); else if(phase==='record-baseline') await recordBaseline(); else if(phase==='execute') await execute(); else if(phase==='plugin-sql') await pluginSql(); else if(phase==='revoked') await revoked(); else if(phase==='expiration') await expiration(); else if(phase==='record-cleanup') await recordCleanup(); else await cleanupAuth()
} catch { log('hosted-e2e','failed','inspect private manifest; use the MAIM ECOSYSTEM plugin plan and idempotent cleanup'); process.exitCode=1 }
