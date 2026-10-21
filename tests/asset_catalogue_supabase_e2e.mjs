import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { mkdtemp, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { createServer } from 'node:http'
import { createClient } from '../apps/maim-creative-studio-catalogue/node_modules/@supabase/supabase-js/dist/index.mjs'
import { fetchCatalogueRows } from '../apps/maim-creative-studio-catalogue/src/lib/catalogueApi.mjs'
import { createSupabaseSessionProvider } from '../apps/maim-creative-studio-catalogue/src/lib/supabaseSessionProvider.mjs'
import catalogueHandler from '../apps/maim-site/api/catalogue.ts'

const { API_URL, ANON_KEY, SERVICE_ROLE_KEY, JWT_SECRET } = process.env
for (const [name, value] of Object.entries({ API_URL, ANON_KEY, SERVICE_ROLE_KEY, JWT_SECRET })) assert.ok(value, `${name} is required`)
Object.assign(process.env, {
  NODE_ENV: 'test', SUPABASE_URL: API_URL, MAIM_CATALOGUE_TEST_ORIGIN: API_URL,
  SUPABASE_PUBLISHABLE_KEY: ANON_KEY
})

const catalogueServer = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1')
  const apiResponse = {
    setHeader(name, value) { response.setHeader(name, value) },
    status(code) { response.statusCode = code; return this },
    json(value) { response.setHeader('Content-Type', 'application/json'); response.end(JSON.stringify(value)) }
  }
  await catalogueHandler({
    method: request.method,
    headers: request.headers,
    query: Object.fromEntries(url.searchParams.entries())
  }, apiResponse)
})
await new Promise((resolve) => catalogueServer.listen(0, '127.0.0.1', resolve))
const catalogueAddress = catalogueServer.address()
assert.ok(catalogueAddress && typeof catalogueAddress === 'object')
const catalogueEndpoint = `http://127.0.0.1:${catalogueAddress.port}/api/catalogue`
const catalogueOptions = { baseOrigin: `http://127.0.0.1:${catalogueAddress.port}`, allowHttpLocal: true }
const endpointRead = (session) => fetchCatalogueRows(catalogueEndpoint, session, catalogueOptions)
const anonymousResponse = await fetch(`${catalogueEndpoint}?workspace_id=${crypto.randomUUID()}`, { redirect: 'error' })
assert.equal(anonymousResponse.status, 401)

function databaseSql(query, variables = {}) {
  const args = ['exec', '-i', 'supabase_db_maim-asset-e2e', 'psql', '-X', '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', 'postgres']
  for (const [key, value] of Object.entries(variables)) args.push('-v', `${key}=${value}`)
  const run = spawnSync('docker', args, { encoding: 'utf8', input: query })
  assert.equal(run.status, 0, run.stderr)
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
databaseSql(`
  insert into maim.workspaces (id, order_reference, status) values
    (:'workspace_a', :'order_a', 'active'), (:'workspace_b', :'order_b', 'active');
  insert into maim.memberships (workspace_id, user_id, role) values
    (:'workspace_a', :'user_a', 'operator'), (:'workspace_b', :'user_a', 'operator'), (:'workspace_b', :'user_b', 'operator');
`, {
  workspace_a: workspaceA, workspace_b: workspaceB, order_a: `e2e-a-${suffix}`, order_b: `e2e-b-${suffix}`,
  user_a: signupA.data.user.id, user_b: signupB.data.user.id
})

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

databaseSql("delete from maim.memberships where workspace_id=:'workspace' and user_id=:'user_id'", {
  workspace: workspaceA, user_id: signupA.data.user.id
})
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
await new Promise((resolve, reject) => catalogueServer.close((error) => error ? reject(error) : resolve()))

console.log(JSON.stringify({
  auth: 'two synthetic users; user-a belongs to two workspaces', importer: { first: first.database, repeat: repeat.database, second_workspace: secondWorkspace.database },
  isolation: 'selected workspace returns only its own asset; user-b denied workspace-a',
  endpoint: 'actual local HTTP handler', anonymous: '401', expired_token: '401', revoked_membership: '403', sign_out: 'session cleared'
}, null, 2))
