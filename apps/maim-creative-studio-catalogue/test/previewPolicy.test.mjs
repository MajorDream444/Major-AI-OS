import test from 'node:test'
import assert from 'node:assert/strict'
import { isSafeSourceUrl, previewPolicy } from '../src/lib/previewPolicy.mjs'

test('recovered HTML and JavaScript are never executable previews', () => {
  for (const format of ['.html', '.js', '.mjs']) {
    assert.equal(previewPolicy({ format, completenessStatus: 'complete' }).mode, 'source-only')
  }
})

test('unresolved dependencies block otherwise supported previews', () => {
  assert.equal(previewPolicy({ format: '.png', previewBlocked: true }).mode, 'blocked')
})

test('only approved Drive HTTPS hosts are accepted for source links', () => {
  assert.equal(isSafeSourceUrl('https://drive.google.com/file/d/example/view'), true)
  assert.equal(isSafeSourceUrl('javascript:alert(1)'), false)
  assert.equal(isSafeSourceUrl('https://example.com/file'), false)
})
