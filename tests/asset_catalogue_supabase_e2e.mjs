import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { mkdtemp, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { createClient } from '../apps/maim-creative-studio-catalogue/node_modules/@supabase/supabase-js/dist/index.mjs'
import { createSupabaseSessionProvider } from '../apps/maim-creative-studio-catalogue/src/lib/supabaseSessionProvider.mjs'
import { readCatalogue } from '../apps/maim-site/lib/catalogue.ts'

const { API_URL, ANON_KEY, SERVICE_ROLE_KEY, JWT_SECRET } = process.env
for (const [name, value] of Object.entries({ API_URL, ANON_KEY, SERVICE_ROLE_KEY, JWT_SECRET })) assert.ok(value, `${name} is required`)
const catalogueEnv = {
  NODE_ENV: 'test', SUPABASE_URL: API_URL, MAIM_CATALOGUE_TEST_ORIGIN: API_URL,
  SUPABASE_PUBLISHABLE_KEY: ANON_KEY
}
const endpointRead = (session) => readCatalogue(`Bearer ${session.accessToken}`, session.workspaceId, catalogueEnv)

const headers = {
  apikey: SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
  'Content-Profile': 'maim',
  'Accept-Profile': 'maim',
  Prefer: 'return=minimal'
}
async function serviceRequest(resource, init = {}) {
  const response = await fetch(`${API_URL}/rest/v1/${resource}`, { ...init, headers: { ...headers, ...init.headers } })
  assert.ok(response.ok, `service request ${resource} failed: ${response.status} ${await response.text()}`)
}

const suffix = crypto.randomUUID().slice(0, 8)
const password = `Local-only-${suffix}!`
const clientA = createClient(API_URL, ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
const clientB = createClient(API_URL, ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
const signupA = await clientA.auth.signUp({ email: `asset-a-${suffix}@example.invalid`, password })
const signupB = await clientB.auth.signUp({ email: `asset-b-${suffix}@example.invalid`, password })
assert.ifError(signupA.error)
assert.ifError(signupB.error)
assert.ok(signupA.data.session?.access_token && signupA.data.user?.id)
assert.ok(signupB.data.session?.access_token && signupB.data.user?.id)

const workspaceA = crypto.randomUUID()
const workspaceB = crypto.randomUUID()
await serviceRequest('workspaces', { method: 'POST', body: JSON.stringify([
  { id: workspaceA, order_reference: `e2e-a-${suffix}`, status: 'active' },
  { id: workspaceB, order_reference: `e2e-b-${suffix}`, status: 'active' }
]) })
await serviceRequest('memberships', { method: 'POST', body: JSON.stringify([
  { workspace_id: workspaceA, user_id: signupA.data.user.id, role: 'operator' },
  { workspace_id: workspaceB, user_id: signupA.data.user.id, role: 'operator' },
  { workspace_id: workspaceB, user_id: signupB.data.user.id, role: 'operator' }
]) })

const temp = await mkdtemp(path.join(os.tmpdir(), 'maim-e2e-'))
const manifestA = path.join(temp, 'synthetic-manifest-a.csv')
const manifestB = path.join(temp, 'synthetic-manifest-b.csv')
const header = 'stable_id,sha256,size_bytes,format,mime_type,original_filename,project_code,project,project_relative_path,drive_file_id,drive_url,upload_status,approval_status,integrity_status,dependencies'
await writeFile(manifestA, [
  header,
  'MAIM-E2E-A,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,12,.png,image/png,synthetic-a.png,00,MAIM 00 Brand System,"  assets/synthetic-a.png",driveSyntheticA01,https://drive.google.com/file/d/driveSyntheticA01/view,uploaded,unreviewed,sha256_verified,'
].join('\n'))
await writeFile(manifestB, [
  header,
  'MAIM-E2E-B,bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb,13,.svg,image/svg+xml,synthetic-b.svg,01,MAIM 01,"  assets/synthetic-b.svg",driveSyntheticB01,https://drive.google.com/file/d/driveSyntheticB01/view,uploaded,unreviewed,sha256_verified,'
].join('\n'))

function runImporter(manifest, workspaceId) {
  const run = spawnSync('python3', ['scripts/import_maim_asset_manifest.py', manifest, '--workspace-id', workspaceId, '--apply'], {
    cwd: process.cwd(), encoding: 'utf8', env: {
      ...process.env,
      SUPABASE_URL: API_URL,
      SUPABASE_SERVICE_ROLE_KEY: SERVICE_ROLE_KEY,
      MAIM_ASSET_IMPORTER_TEST_ORIGIN: API_URL
    }
  })
  assert.equal(run.status, 0, run.stderr)
  return JSON.parse(run.stdout)
}
const first = runImporter(manifestA, workspaceA)
const repeat = runImporter(manifestA, workspaceA)
const secondWorkspace = runImporter(manifestB, workspaceB)
assert.equal(first.database.inserted, 1)
assert.equal(repeat.database.reconciled, 1)
assert.equal(secondWorkspace.database.inserted, 1)

const providerA = createSupabaseSessionProvider(clientA.auth, workspaceA)
const providerB = createSupabaseSessionProvider(clientB.auth, workspaceB)
const sessionA = await providerA.getSession()
const sessionB = await providerB.getSession()
assert.ok(sessionA && sessionB)
const workspaceARows = await endpointRead(sessionA)
const workspaceBRowsForA = await endpointRead({ ...sessionA, workspaceId: workspaceB })
const workspaceBRowsForB = await endpointRead(sessionB)
assert.deepEqual(workspaceARows.map(({ stable_id }) => stable_id), ['MAIM-E2E-A'])
assert.deepEqual(workspaceBRowsForA.map(({ stable_id }) => stable_id), ['MAIM-E2E-B'])
assert.deepEqual(workspaceBRowsForB.map(({ stable_id }) => stable_id), ['MAIM-E2E-B'])
await assert.rejects(() => endpointRead({ ...sessionB, workspaceId: workspaceA }), (error) => error.status === 403)

function base64url(value) { return Buffer.from(JSON.stringify(value)).toString('base64url') }
const jwtHeader = base64url({ alg: 'HS256', typ: 'JWT' })
const jwtPayload = base64url({ aud: 'authenticated', exp: Math.floor(Date.now() / 1000) - 60, sub: signupA.data.user.id, role: 'authenticated', iss: 'supabase-demo' })
const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${jwtHeader}.${jwtPayload}`).digest('base64url')
await assert.rejects(() => endpointRead({ accessToken: `${jwtHeader}.${jwtPayload}.${signature}`, workspaceId: workspaceA }), (error) => error.status === 401)

await serviceRequest(`memberships?workspace_id=eq.${workspaceA}&user_id=eq.${signupA.data.user.id}`, { method: 'DELETE' })
await assert.rejects(() => endpointRead(sessionA), (error) => error.status === 403)
assert.equal((await endpointRead({ ...sessionA, workspaceId: workspaceB }))[0].stable_id, 'MAIM-E2E-B')

let signedOut = false
const unsubscribe = providerA.subscribe((session) => { if (session === null) signedOut = true })
const signout = await clientA.auth.signOut()
assert.ifError(signout.error)
await new Promise((resolve) => setTimeout(resolve, 20))
assert.equal(signedOut, true)
assert.equal(await providerA.getSession(), null)
unsubscribe()
providerA.dispose()
providerB.dispose()

console.log(JSON.stringify({
  auth: 'two synthetic users; user-a belongs to two workspaces', importer: { first: first.database, repeat: repeat.database, second_workspace: secondWorkspace.database },
  isolation: 'selected workspace returns only its own asset; user-b denied workspace-a',
  expired_token: '401', revoked_membership: '403', sign_out: 'session cleared'
}, null, 2))
