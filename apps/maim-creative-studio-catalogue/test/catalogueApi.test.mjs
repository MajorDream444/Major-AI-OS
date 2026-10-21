import test from 'node:test'
import assert from 'node:assert/strict'
import { fetchCatalogueRows } from '../src/lib/catalogueApi.mjs'

test('Studio sends the selected workspace and bearer session only to its private endpoint', async () => {
  const originalFetch = globalThis.fetch
  let request
  globalThis.fetch = async (url, init) => {
    request = { url: String(url), init }
    return new Response(JSON.stringify({ assets: [{ id: 'asset-a' }] }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }
  try {
    assert.deepEqual(await fetchCatalogueRows('https://studio.example/api/catalogue', { accessToken: 'user-token', workspaceId: 'workspace-a' }), [{ id: 'asset-a' }])
    assert.equal(request.url, 'https://studio.example/api/catalogue?workspace_id=workspace-a')
    assert.deepEqual(request.init.headers, { Authorization: 'Bearer user-token' })
    assert.equal('apikey' in request.init.headers, false)
    assert.equal(request.init.cache, 'no-store')
  } finally {
    globalThis.fetch = originalFetch
  }
})
