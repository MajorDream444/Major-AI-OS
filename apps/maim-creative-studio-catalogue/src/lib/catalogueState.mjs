export function catalogueFailureState(error) {
  if (error && error.status === 401) return { phase: 'signed-out', message: 'Sign in through the owning MAIM application to view this private catalogue.' }
  if (error && error.status === 403) return { phase: 'revoked', message: 'Catalogue access is unavailable. Your workspace membership may have been revoked.' }
  return { phase: 'error', message: error instanceof Error ? error.message : 'Catalogue request failed.' }
}

export function signedOutState() {
  return { phase: 'signed-out', message: 'Sign in through the owning MAIM application to view this private catalogue.' }
}
