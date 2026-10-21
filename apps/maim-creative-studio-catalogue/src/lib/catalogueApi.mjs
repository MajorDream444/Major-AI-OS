export class CatalogueHttpError extends Error {
  constructor(status) {
    super(status === 401 ? 'Catalogue session is signed out or expired.' : status === 403 ? 'Catalogue membership is not authorized.' : `Catalogue request failed (${status}).`)
    this.status = status
  }
}

export async function fetchCatalogueRows(endpoint, session) {
  if (!endpoint || !session?.accessToken || !session?.workspaceId) throw new Error('Private catalogue session is not configured.')
  const url = new URL(endpoint, globalThis.location?.origin ?? 'http://localhost')
  url.searchParams.set('workspace_id', session.workspaceId)
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    credentials: 'same-origin',
    cache: 'no-store'
  })
  if (!response.ok) throw new CatalogueHttpError(response.status)
  const body = await response.json()
  if (!Array.isArray(body?.assets)) throw new Error('Catalogue endpoint returned an invalid response.')
  return body.assets
}
