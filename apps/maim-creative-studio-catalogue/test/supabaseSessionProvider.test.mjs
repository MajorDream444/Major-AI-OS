import test from 'node:test'
import assert from 'node:assert/strict'
import { createSupabaseSessionProvider } from '../src/lib/supabaseSessionProvider.mjs'

test('delayed session response cannot restore access after sign-out', async () => {
  let resolveSession
  let authListener
  const auth = {
    getSession: () => new Promise((resolve) => { resolveSession = resolve }),
    onAuthStateChange: (listener) => { authListener = listener; return { data: { subscription: { unsubscribe() {} } } } }
  }
  const provider = createSupabaseSessionProvider(auth, 'workspace-a')
  const pending = provider.getSession()
  authListener('SIGNED_OUT', null)
  resolveSession({ data: { session: { access_token: 'stale-token' } }, error: null })
  assert.equal(await pending, null)
  provider.dispose()
})

test('session provider forwards the owning auth session and workspace', async () => {
  const auth = {
    getSession: async () => ({ data: { session: { access_token: 'user-token' } }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } })
  }
  const provider = createSupabaseSessionProvider(auth, 'workspace-a')
  assert.deepEqual(await provider.getSession(), { accessToken: 'user-token', workspaceId: 'workspace-a' })
  provider.dispose()
})
