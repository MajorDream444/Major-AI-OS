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
    assert.deepEqual(await fetchCatalogueRows('/api/catalogue', { accessToken: 'user-token', workspaceId: 'workspace-a' }, { baseOrigin: 'https://studio.example' }), [{ id: 'asset-a' }])
    assert.equal(request.url, 'https://studio.example/api/catalogue?workspace_id=workspace-a')
    assert.deepEqual(request.init.headers, { Authorization: 'Bearer user-token' })
    assert.equal('apikey' in request.init.headers, false)
    assert.equal(request.init.cache, 'no-store')
    assert.equal(request.init.redirect, 'error')
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('Studio rejects credential destinations before any request occurs', async () => {
  const originalFetch = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => { calls += 1; return new Response() }
  try {
    for (const endpoint of [
      'https://evil.example/api/catalogue',
      'https://user@studio.example/api/catalogue',
      'http://studio.example/api/catalogue',
      '//evil.example/api/catalogue'
    ]) {
      await assert.rejects(
        () => fetchCatalogueRows(endpoint, { accessToken: 'user-token', workspaceId: 'workspace-a' }, { baseOrigin: 'https://studio.example' }),
        /same origin/
      )
    }
    assert.equal(calls, 0)
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('explicit local HTTP testing remains exact-origin only', async () => {
  const originalFetch = globalThis.fetch
  let requested
  globalThis.fetch = async (url) => { requested = String(url); return new Response('{"assets":[]}', { status: 200 }) }
  try {
    await fetchCatalogueRows('/api/catalogue', { accessToken: 'test-token', workspaceId: 'workspace-a' }, {
      baseOrigin: 'http://127.0.0.1:54329', allowHttpLocal: true
    })
    assert.match(requested, /^http:\/\/127\.0\.0\.1:54329\/api\/catalogue/)
    await assert.rejects(
      () => fetchCatalogueRows('http://localhost:54329/api/catalogue', { accessToken: 'test-token', workspaceId: 'workspace-a' }, {
        baseOrigin: 'http://127.0.0.1:54329', allowHttpLocal: true
      }),
      /same origin/
    )
  } finally {
    globalThis.fetch = originalFetch
  }
})
