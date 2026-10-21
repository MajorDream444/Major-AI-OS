import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { mkdtemp, stat } from 'node:fs/promises'
import { assertCleanupBaseline, importerHeaders, readPrivateManifest, renderPluginCleanupSql, validateHostedDestinations, validateManifestPath, writePrivateManifest } from '../src/lib/hostedE2eCore.mjs'

const approved='https://maim-e2e-reviewed.vercel.app'
const env={MAIM_HOSTED_E2E_ENABLED:'true',MAIM_HOSTED_E2E_PROJECT_REF:'njpdlomvyalxrkluaige',SUPABASE_URL:'https://njpdlomvyalxrkluaige.supabase.co',MAIM_HOSTED_E2E_PREVIEW_ORIGIN:approved,SUPABASE_PUBLISHABLE_KEY:'publishable-test',SUPABASE_SERVICE_ROLE_KEY:'service-test',VERCEL_AUTOMATION_BYPASS_SECRET:'bypass-test'}

test('pins one exact reviewed preview before network access',()=>{
  assert.equal(validateHostedDestinations(env,{approvedPreviewOrigins:[approved]}).endpoint,`${approved}/api/catalogue`)
  for(const bad of [{MAIM_HOSTED_E2E_PREVIEW_ORIGIN:'https://other.vercel.app'},{MAIM_HOSTED_E2E_PREVIEW_ORIGIN:'https://user@maim-e2e-reviewed.vercel.app'},{SUPABASE_URL:'https://evil.example/?project=njpdlomvyalxrkluaige'},{MAIM_HOSTED_E2E_ENABLED:'false'}]) assert.throws(()=>validateHostedDestinations({...env,...bad},{approvedPreviewOrigins:[approved]}),/not approved|invalid|guard|exact reviewed/)
  assert.throws(()=>validateHostedDestinations(env),/exact reviewed/)
})

test('import denial uses publishable apikey and user bearer independently',()=>{
  assert.deepEqual(importerHeaders('publishable-key','user-jwt'),{apikey:'publishable-key',Authorization:'Bearer user-jwt','Content-Type':'application/json'})
})

test('private manifest is outside repo and mode 0600',async()=>{
  assert.throws(()=>validateManifestPath(path.join(process.cwd(),'manifest.json')),/outside/)
  const dir=await mkdtemp(path.join(os.tmpdir(),'maim-manifest-')); const file=path.join(dir,'run.json'); await writePrivateManifest(file,{phase:'starting'}); assert.equal((await stat(file)).mode&0o777,0o600); assert.equal((await readPrivateManifest(file)).phase,'starting')
})

test('plugin cleanup recovers without project ids after immediate post-import interruption',()=>{
  const records={userIds:['00000000-0000-4000-8000-000000000201','00000000-0000-4000-8000-000000000202'],workspaceIds:['00000000-0000-4000-8000-000000000101','00000000-0000-4000-8000-000000000102'],orderReferences:['RUN-A','RUN-B'],stableIds:['RUN-A','RUN-B'],driveFileIds:['DRIVE-A','DRIVE-B'],byteVersions:[{sha256:'a'.repeat(64),sizeBytes:12}]}
  const sql=renderPluginCleanupSql(records,{assets:0,projects:0,sources:0,byteVersions:0})
  assert.match(sql,/delete from maim\.asset_catalog_projects where workspace_id/); assert.doesNotMatch(sql,/projectIds|project_ids/); assert.match(sql,/external_file_id/); assert.match(sql,/not exists/)
})

test('cleanup success requires baseline restoration and zero run rows',()=>{
  const baseline={assets:4,projects:2,sources:4,byteVersions:3}; assert.doesNotThrow(()=>assertCleanupBaseline(baseline,{...baseline,runWorkspaces:0,runAssets:0})); assert.throws(()=>assertCleanupBaseline(baseline,{...baseline,assets:5,runWorkspaces:0,runAssets:0}),/baseline/); assert.throws(()=>assertCleanupBaseline(baseline,{...baseline,runWorkspaces:1,runAssets:0}),/remain/)
})
