import test from 'node:test'
import assert from 'node:assert/strict'
import { createCatalogueLoader } from '../src/lib/catalogueLoader.mjs'

test('delayed records from a previous workspace cannot replace the selected workspace', async () => {
  const pending = new Map()
  const ready = []
  const loader = createCatalogueLoader({
    fetchCatalogue: (session) => new Promise((resolve) => pending.set(session.workspaceId, resolve)),
    onLoading() {},
    onReady: (assets) => ready.push(assets),
    onSignedOut() {},
    onFailure(error) { throw error }
  })

  const requestA = loader.load({ accessToken: 'token', workspaceId: 'workspace-a' })
  const requestB = loader.load({ accessToken: 'token', workspaceId: 'workspace-b' })
  pending.get('workspace-b')([{ id: 'asset-b' }])
  await requestB
  pending.get('workspace-a')([{ id: 'asset-a' }])
  await requestA

  assert.deepEqual(ready, [[{ id: 'asset-b' }]])
  loader.dispose()
})
