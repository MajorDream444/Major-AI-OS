import test from 'node:test'
import assert from 'node:assert/strict'
import { catalogueFailureState, signedOutState } from '../src/lib/catalogueState.mjs'

test('sign-out clears the catalogue into an explicit signed-out state', () => {
  assert.deepEqual(signedOutState(), {
    phase: 'signed-out',
    message: 'Sign in through the owning MAIM application to view this private catalogue.'
  })
})

test('revoked membership never falls back to fixtures', () => {
  const state = catalogueFailureState({ status: 403 })
  assert.equal(state.phase, 'revoked')
  assert.match(state.message, /membership may have been revoked/i)
  assert.equal('assets' in state, false)
})
