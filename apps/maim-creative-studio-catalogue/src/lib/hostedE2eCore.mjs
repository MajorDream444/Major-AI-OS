import { chmod, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const PROJECT_REF = 'njpdlomvyalxrkluaige'
export const SUPABASE_ORIGIN = `https://${PROJECT_REF}.supabase.co`
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function validateHostedDestinations(env) {
  if (env.MAIM_HOSTED_E2E_ENABLED !== 'true' || env.MAIM_HOSTED_E2E_PROJECT_REF !== PROJECT_REF) throw new Error('Hosted E2E execution guard is not enabled for MAIM Ecosystem.')
  const supabase = new URL(env.SUPABASE_URL ?? '')
  const preview = new URL(env.MAIM_HOSTED_E2E_PREVIEW_ORIGIN ?? '')
  const database = new URL(env.MAIM_E2E_DATABASE_URL ?? '')
  const disposable = env.NODE_ENV === 'test' && env.MAIM_HOSTED_E2E_MODE === 'disposable'
  if (disposable) {
    if (supabase.origin !== 'http://127.0.0.1:54321' || preview.protocol !== 'http:' || preview.hostname !== '127.0.0.1' || database.hostname !== '127.0.0.1') throw new Error('Disposable destination is not approved.')
  } else {
    if (supabase.href !== `${SUPABASE_ORIGIN}/` || supabase.username || supabase.password || supabase.port || supabase.search || supabase.hash) throw new Error('Supabase destination is not approved.')
    if (preview.protocol !== 'https:' || preview.username || preview.password || preview.port || preview.pathname !== '/' || preview.search || preview.hash) throw new Error('Protected preview origin is invalid.')
    if (!/\.vercel\.app$/.test(preview.hostname) && preview.hostname !== 'preview.majoraimindset.com') throw new Error('Protected preview origin is not approved.')
    if (!['postgres:', 'postgresql:'].includes(database.protocol) || database.hostname !== `db.${PROJECT_REF}.supabase.co` || database.pathname !== '/postgres') throw new Error('Database destination is not approved.')
  }
  if (!env.SUPABASE_PUBLISHABLE_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Server-side E2E credentials are not configured.')
  if (!disposable && !env.VERCEL_AUTOMATION_BYPASS_SECRET) throw new Error('Protected preview access is not configured.')
  return { supabaseOrigin: supabase.origin, previewOrigin: preview.origin, endpoint: `${preview.origin}/api/catalogue`, databaseUrl: database.href, databaseSsl: !disposable, previewBypass: env.VERCEL_AUTOMATION_BYPASS_SECRET ?? '' }
}

export function validateManifestPath(value, repoRoot = process.cwd()) {
  if (!value || !path.isAbsolute(value)) throw new Error('Private run manifest path must be absolute.')
  const resolved = path.resolve(value)
  const root = path.resolve(repoRoot)
  if (resolved === root || resolved.startsWith(`${root}${path.sep}`)) throw new Error('Private run manifest must be outside the repository.')
  return resolved
}

export async function writePrivateManifest(file, manifest) {
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 })
  const temp = `${file}.tmp`
  await writeFile(temp, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 })
  await chmod(temp, 0o600)
  await rename(temp, file)
}

export async function readPrivateManifest(file) { return JSON.parse(await readFile(file, 'utf8')) }
export function sanitizeResult(name, status, detail) { return { event: name, status, ...(detail ? { detail } : {}) } }
export function assertUuid(value, label) { if (!UUID.test(value ?? '')) throw new Error(`${label} is invalid.`); return value }

export async function cleanupRun(manifest, adapters) {
  const result = { database: 'skipped', users: 'skipped' }
  if (manifest.records) {
    await adapters.cleanupDatabase(manifest.records)
    result.database = 'clean'
    for (const id of manifest.records.userIds ?? []) await adapters.deleteUser(id)
    result.users = 'clean'
  }
  manifest.phase = 'cleaned'
  manifest.cleanedAt = new Date().toISOString()
  manifest.cleanup = result
  manifest.sensitive = {}
  return result
}
