import { chmod, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const PROJECT_REF = 'njpdlomvyalxrkluaige'
export const SUPABASE_ORIGIN = `https://${PROJECT_REF}.supabase.co`
// Hosted execution remains blocked until a reviewed commit pins one exact
// protected deployment origin. Wildcard vercel.app destinations are forbidden.
export const APPROVED_PREVIEW_ORIGINS = Object.freeze([])
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function validateHostedDestinations(env, options = {}) {
  if (env.MAIM_HOSTED_E2E_ENABLED !== 'true' || env.MAIM_HOSTED_E2E_PROJECT_REF !== PROJECT_REF) throw new Error('Hosted E2E execution guard is not enabled for MAIM Ecosystem.')
  const supabase = new URL(env.SUPABASE_URL ?? '')
  const preview = new URL(env.MAIM_HOSTED_E2E_PREVIEW_ORIGIN ?? '')
  const disposable = env.NODE_ENV === 'test' && env.MAIM_HOSTED_E2E_MODE === 'disposable'
  if (disposable) {
    if (supabase.origin !== 'http://127.0.0.1:54321' || preview.protocol !== 'http:' || preview.hostname !== '127.0.0.1') throw new Error('Disposable destination is not approved.')
  } else {
    if (supabase.href !== `${SUPABASE_ORIGIN}/` || supabase.username || supabase.password || supabase.port || supabase.search || supabase.hash) throw new Error('Supabase destination is not approved.')
    if (preview.protocol !== 'https:' || preview.username || preview.password || preview.port || preview.pathname !== '/' || preview.search || preview.hash) throw new Error('Protected preview origin is invalid.')
    const approved = options.approvedPreviewOrigins ?? APPROVED_PREVIEW_ORIGINS
    if (!approved.includes(preview.origin)) throw new Error('Protected preview origin is not the exact reviewed deployment.')
  }
  if (!env.SUPABASE_PUBLISHABLE_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Server-side E2E credentials are not configured.')
  if (!disposable && !env.VERCEL_AUTOMATION_BYPASS_SECRET) throw new Error('Protected preview access is not configured.')
  return { supabaseOrigin: supabase.origin, previewOrigin: preview.origin, endpoint: `${preview.origin}/api/catalogue`, previewBypass: env.VERCEL_AUTOMATION_BYPASS_SECRET ?? '' }
}

export function validateManifestPath(value, repoRoot = process.cwd()) {
  if (!value || !path.isAbsolute(value)) throw new Error('Private run manifest path must be absolute.')
  const resolved = path.resolve(value); const root = path.resolve(repoRoot)
  if (resolved === root || resolved.startsWith(`${root}${path.sep}`)) throw new Error('Private run manifest must be outside the repository.')
  return resolved
}
export async function writePrivateManifest(file, manifest) {
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 })
  const temp = `${file}.tmp`; await writeFile(temp, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 }); await chmod(temp, 0o600); await rename(temp, file)
}
export async function readPrivateManifest(file) { return JSON.parse(await readFile(file, 'utf8')) }
export function sanitizeResult(name, status, detail) { return { event: name, status, ...(detail ? { detail } : {}) } }
export function assertUuid(value, label) { if (!UUID.test(value ?? '')) throw new Error(`${label} is invalid.`); return value }

const sqlText = value => `'${String(value).replaceAll("'", "''")}'`
const sqlArray = (values, cast) => `array[${values.map(sqlText).join(',')}]::${cast}[]`
function validateRecords(records) {
  for (const value of records.userIds ?? []) assertUuid(value, 'user id')
  for (const value of records.workspaceIds ?? []) assertUuid(value, 'workspace id')
  if ((records.userIds?.length ?? 0) !== 2 || (records.workspaceIds?.length ?? 0) !== 2) throw new Error('Plugin plan requires exactly two synthetic users and workspaces.')
  return records
}
export function renderPluginSetupSql(records) {
  validateRecords(records)
  const [wa, wb] = records.workspaceIds; const [ua, ub] = records.userIds; const [oa, ob] = records.orderReferences
  return `-- Execute only with the MAIM ECOSYSTEM plugin for ${PROJECT_REF}.\n` +
    `select 'baseline' as phase,\n (select count(*) from maim.asset_catalog_assets) assets,\n (select count(*) from maim.asset_catalog_projects) projects,\n (select count(*) from maim.asset_catalog_source_locations) sources,\n (select count(*) from maim.asset_catalog_byte_versions) byte_versions;\n` +
    `insert into maim.workspaces(id,order_reference,status) values (${sqlText(wa)}::uuid,${sqlText(oa)},'active'),(${sqlText(wb)}::uuid,${sqlText(ob)},'active');\n` +
    `insert into maim.memberships(workspace_id,user_id,role) values (${sqlText(wa)}::uuid,${sqlText(ua)}::uuid,'operator'),(${sqlText(wb)}::uuid,${sqlText(ub)}::uuid,'operator');\n`
}
export function renderPluginRevokeSql(records) {
  validateRecords(records)
  return `delete from maim.memberships where workspace_id=${sqlText(records.workspaceIds[0])}::uuid and user_id=${sqlText(records.userIds[0])}::uuid;\n`
}
export function renderPluginCleanupSql(records, baseline) {
  validateRecords(records)
  const workspaces = sqlArray(records.workspaceIds, 'uuid'); const stableIds = sqlArray(records.stableIds ?? [], 'text'); const driveIds = sqlArray(records.driveFileIds ?? [], 'text')
  const versions = (records.byteVersions ?? []).map(v => `(${sqlText(v.sha256)},${Number(v.sizeBytes)})`).join(',') || `('',-1)`
  if (!['assets','projects','sources','byteVersions'].map(k => Number(baseline?.[k])).every(Number.isSafeInteger)) throw new Error('Verified plugin baseline counts are required before cleanup.')
  return `-- Execute only with the MAIM ECOSYSTEM plugin for ${PROJECT_REF}. Safe immediately after import.\nbegin;\n` +
    `delete from maim.memberships where workspace_id=any(${workspaces});\n` +
    `delete from maim.asset_catalog_assets a where a.workspace_id=any(${workspaces}) and (a.stable_id=any(${stableIds}) or exists(select 1 from maim.asset_catalog_source_locations s where s.asset_id=a.id and s.external_file_id=any(${driveIds})));\n` +
    `delete from maim.asset_catalog_projects where workspace_id=any(${workspaces});\n` +
    `delete from maim.asset_catalog_byte_versions bv using (values ${versions}) v(sha256,size_bytes) where bv.sha256=v.sha256 and bv.size_bytes=v.size_bytes and not exists(select 1 from maim.asset_catalog_source_locations s where s.byte_version_id=bv.id);\n` +
    `delete from maim.workspaces where id=any(${workspaces}) and order_reference=any(${sqlArray(records.orderReferences, 'text')});\ncommit;\n` +
    `select 'cleanup' as phase,\n (select count(*) from maim.asset_catalog_assets) assets,\n (select count(*) from maim.asset_catalog_projects) projects,\n (select count(*) from maim.asset_catalog_source_locations) sources,\n (select count(*) from maim.asset_catalog_byte_versions) byte_versions,\n (select count(*) from maim.workspaces where id=any(${workspaces})) run_workspaces,\n (select count(*) from maim.asset_catalog_assets where workspace_id=any(${workspaces})) run_assets;\n` +
    `-- Success requires counts exactly ${baseline.assets}, ${baseline.projects}, ${baseline.sources}, ${baseline.byteVersions}, 0, 0.\n`
}
export function importerHeaders(publishableKey, bearerToken) {
  return { apikey: publishableKey, Authorization: `Bearer ${bearerToken}`, 'Content-Type': 'application/json' }
}
export function assertCleanupBaseline(baseline, after) {
  for (const key of ['assets','projects','sources','byteVersions']) if (Number(after?.[key]) !== Number(baseline?.[key])) throw new Error(`Cleanup did not restore ${key} baseline.`)
  if (Number(after.runWorkspaces) !== 0 || Number(after.runAssets) !== 0) throw new Error('Synthetic run records remain after cleanup.')
}
