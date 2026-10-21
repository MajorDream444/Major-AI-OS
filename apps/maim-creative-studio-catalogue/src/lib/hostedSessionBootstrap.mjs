import { createClient } from '@supabase/supabase-js'
import { createSupabaseSessionProvider } from './supabaseSessionProvider.mjs'

const CANONICAL_SUPABASE_ORIGIN = 'https://njpdlomvyalxrkluaige.supabase.co'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function validateHostedSessionConfig(config) {
  if (!config || typeof config !== 'object') throw new Error('Hosted Studio authentication is not configured.')
  let url
  try { url = new URL(config.supabaseUrl) } catch { throw new Error('Hosted Studio Supabase origin is invalid.') }
  if (url.origin !== CANONICAL_SUPABASE_ORIGIN || url.href !== `${CANONICAL_SUPABASE_ORIGIN}/`
      || url.username || url.password || url.port || url.search || url.hash) {
    throw new Error('Hosted Studio Supabase origin is not approved.')
  }
  if (typeof config.publishableKey !== 'string' || !config.publishableKey.trim()) {
    throw new Error('Hosted Studio publishable key is missing.')
  }
  if (!UUID.test(config.workspaceId ?? '')) throw new Error('Hosted Studio workspace is invalid.')
  return { supabaseUrl: url.origin, publishableKey: config.publishableKey, workspaceId: config.workspaceId }
}

export function createHostedStudioSession(config, clientFactory = createClient) {
  const validated = validateHostedSessionConfig(config)
  const client = clientFactory(validated.supabaseUrl, validated.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  })
  return { client, provider: createSupabaseSessionProvider(client.auth, validated.workspaceId) }
}

export function installHostedStudioSession(target = globalThis.window) {
  if (!target?.__MAIM_STUDIO_AUTH_CONFIG__) return null
  const installed = createHostedStudioSession(target.__MAIM_STUDIO_AUTH_CONFIG__)
  target.__MAIM_STUDIO_SESSION__ = installed.provider
  return installed
}
