import assert from 'node:assert/strict'
import test from 'node:test'
import { createHostedStudioSession, installHostedStudioSession, validateHostedSessionConfig } from '../src/lib/hostedSessionBootstrap.mjs'

const valid = { supabaseUrl: 'https://njpdlomvyalxrkluaige.supabase.co', publishableKey: 'sb_publishable_test', workspaceId: '00000000-0000-4000-8000-000000000101' }

test('accepts only the canonical exact Supabase origin and a UUID workspace', () => {
  assert.equal(validateHostedSessionConfig(valid).supabaseUrl, valid.supabaseUrl)
  for (const supabaseUrl of [
    'http://njpdlomvyalxrkluaige.supabase.co', 'https://evil.example/?next=njpdlomvyalxrkluaige',
    'https://user@njpdlomvyalxrkluaige.supabase.co', 'https://njpdlomvyalxrkluaige.supabase.co:444',
    'https://njpdlomvyalxrkluaige.supabase.co/rest/v1',
  ]) assert.throws(() => validateHostedSessionConfig({ ...valid, supabaseUrl }), /not approved|invalid/)
  assert.throws(() => validateHostedSessionConfig({ ...valid, workspaceId: 'workspace-a' }), /workspace/)
})

test('installs the real auth-backed provider without exposing an admin credential', async () => {
  let listener
  const auth = {
    onAuthStateChange(fn) { listener = fn; return { data: { subscription: { unsubscribe() {} } } } },
    async getSession() { return { data: { session: { access_token: 'user-jwt' } }, error: null } }
  }
  const created = createHostedStudioSession(valid, (url, key, options) => {
    assert.equal(url, valid.supabaseUrl); assert.equal(key, valid.publishableKey)
    assert.equal(options.auth.persistSession, true)
    return { auth }
  })
  assert.deepEqual(await created.provider.getSession(), { accessToken: 'user-jwt', workspaceId: valid.workspaceId })
  listener('SIGNED_OUT', null)
  created.provider.dispose()
})

test('does nothing unless the owning app supplies explicit auth configuration', () => {
  assert.equal(installHostedStudioSession({}), null)
})
