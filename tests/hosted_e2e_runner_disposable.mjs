import assert from 'node:assert/strict'
import { mkdtemp, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { spawn, execFileSync } from 'node:child_process'
import catalogueHandler from '../apps/maim-site/api/catalogue.ts'

const server=createServer(async(request,response)=>{const url=new URL(request.url??'/','http://127.0.0.1');await catalogueHandler({method:request.method,headers:request.headers,query:Object.fromEntries(url.searchParams.entries())},{setHeader:(n,v)=>response.setHeader(n,v),status(c){response.statusCode=c;return this},json(v){response.setHeader('Content-Type','application/json');response.end(JSON.stringify(v))}})})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve)); const address=server.address(); assert.ok(address&&typeof address==='object')
const dir=await mkdtemp(path.join(os.tmpdir(),'maim-hosted-runner-')); const manifest=path.join(dir,'private-run.json')
const env={...process.env,NODE_ENV:'test',MAIM_HOSTED_E2E_MODE:'disposable',MAIM_HOSTED_E2E_ENABLED:'true',MAIM_HOSTED_E2E_PROJECT_REF:'njpdlomvyalxrkluaige',SUPABASE_URL:process.env.API_URL,MAIM_CATALOGUE_TEST_ORIGIN:process.env.API_URL,SUPABASE_PUBLISHABLE_KEY:process.env.ANON_KEY,SUPABASE_SERVICE_ROLE_KEY:process.env.SERVICE_ROLE_KEY,MAIM_HOSTED_E2E_PREVIEW_ORIGIN:`http://127.0.0.1:${address.port}`}
Object.assign(process.env,{NODE_ENV:'test',SUPABASE_URL:env.SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY:env.SUPABASE_PUBLISHABLE_KEY,MAIM_CATALOGUE_TEST_ORIGIN:env.SUPABASE_URL})
async function invoke(phase,args=[]){const child=spawn('node',['apps/maim-creative-studio-catalogue/scripts/hosted-e2e.mjs',phase,manifest,...args.map(String)],{cwd:process.cwd(),env,stdio:['ignore','pipe','pipe']});let out='',err='';child.stdout.on('data',x=>out+=x);child.stderr.on('data',x=>err+=x);const code=await new Promise(resolve=>child.on('close',resolve));assert.equal(code,0,err||out);return out}
function sql(statement){return execFileSync('docker',['exec','-i','supabase_db_maim-asset-e2e','psql','-X','-A','-t','-F',',','-v','ON_ERROR_STOP=1','-U','postgres','-d','postgres'],{input:statement,encoding:'utf8'})}
function counts(){return sql("select (select count(*) from maim.asset_catalog_assets),(select count(*) from maim.asset_catalog_projects),(select count(*) from maim.asset_catalog_source_locations),(select count(*) from maim.asset_catalog_byte_versions)").trim().split(',')}
try {
  const baseline=counts(); assert.match(await invoke('prepare'),/plugin setup/)
  sql(await invoke('plugin-sql',['setup'])); await invoke('record-baseline',baseline)
  assert.match(await invoke('execute'),/exact identities\/counts verified/)
  // Simulates interruption immediately after imports: cleanup relies only on IDs
  // recorded before import and never on project IDs discovered afterward.
  const prepared=JSON.parse(await readFile(manifest,'utf8')); assert.equal(prepared.records.projectIds,undefined)
  sql(await invoke('plugin-sql',['revoke'])); assert.match(await invoke('revoked'),/expiration_pending/)
  sql(await invoke('plugin-sql',['cleanup'])); const after=[...counts(),'0','0']; assert.match(await invoke('record-cleanup',after),/baseline restored/); assert.match(await invoke('cleanup-auth'),/synthetic users removed/)
  const cleaned=JSON.parse(await readFile(manifest,'utf8')); assert.equal(cleaned.phase,'cleaned'); assert.deepEqual(cleaned.sensitive,{})
  console.log('PASS: plugin-boundary hosted runner contract and recoverable cleanup completed.')
} finally {await new Promise(resolve=>server.close(()=>resolve()))}
