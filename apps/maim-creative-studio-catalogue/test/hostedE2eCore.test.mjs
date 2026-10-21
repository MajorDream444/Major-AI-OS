import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { mkdtemp, stat } from 'node:fs/promises'
import { cleanupRun, readPrivateManifest, validateHostedDestinations, validateManifestPath, writePrivateManifest } from '../src/lib/hostedE2eCore.mjs'

const env = {
  MAIM_HOSTED_E2E_ENABLED:'true', MAIM_HOSTED_E2E_PROJECT_REF:'njpdlomvyalxrkluaige',
  SUPABASE_URL:'https://njpdlomvyalxrkluaige.supabase.co',
  MAIM_HOSTED_E2E_PREVIEW_ORIGIN:'https://maim-e2e-abc.vercel.app',
  MAIM_E2E_DATABASE_URL:'postgresql://user:secret@db.njpdlomvyalxrkluaige.supabase.co:5432/postgres',
  SUPABASE_PUBLISHABLE_KEY:'publishable-test', SUPABASE_SERVICE_ROLE_KEY:'service-test', VERCEL_AUTOMATION_BYPASS_SECRET:'bypass-test'
}

test('validates exact hosted destinations before network access', () => {
  assert.equal(validateHostedDestinations(env).endpoint, 'https://maim-e2e-abc.vercel.app/api/catalogue')
  for (const bad of [
    { SUPABASE_URL:'https://evil.example/?project=njpdlomvyalxrkluaige' },
    { MAIM_HOSTED_E2E_PREVIEW_ORIGIN:'https://user@maim-e2e-abc.vercel.app' },
    { MAIM_E2E_DATABASE_URL:'postgresql://user:secret@db.other.supabase.co:5432/postgres' },
    { MAIM_HOSTED_E2E_ENABLED:'false' },
  ]) assert.throws(() => validateHostedDestinations({ ...env, ...bad }), /not approved|invalid|guard/)
})

test('private manifest is outside repo and mode 0600', async () => {
  assert.throws(() => validateManifestPath(path.join(process.cwd(),'manifest.json')), /outside/)
  const dir=await mkdtemp(path.join(os.tmpdir(),'maim-manifest-')); const file=path.join(dir,'run.json')
  await writePrivateManifest(file,{phase:'starting'}); assert.equal((await stat(file)).mode & 0o777,0o600)
  assert.equal((await readPrivateManifest(file)).phase,'starting')
})

test('cleanup is scoped, ordered and idempotent after partial failure', async () => {
  const calls=[]; const manifest={phase:'failed',sensitive:{expirationAccessToken:'private'},records:{workspaceIds:['00000000-0000-4000-8000-000000000101'],userIds:['00000000-0000-4000-8000-000000000201'],assetIds:[],byteVersionIds:[]}}
  const adapters={ cleanupDatabase:async records=>calls.push(['db',records]), deleteUser:async id=>calls.push(['user',id]) }
  await cleanupRun(manifest,adapters); await cleanupRun(manifest,adapters)
  assert.deepEqual(calls.map(c=>c[0]),['db','user','db','user'])
  assert.equal(manifest.phase,'cleaned'); assert.equal(manifest.cleanup.database,'clean'); assert.deepEqual(manifest.sensitive,{})
})
