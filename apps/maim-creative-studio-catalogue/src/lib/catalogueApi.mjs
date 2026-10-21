export class CatalogueHttpError extends Error {
  constructor(status) {
    super(status === 401 ? 'Catalogue session is signed out or expired.' : status === 403 ? 'Catalogue membership is not authorized.' : `Catalogue request failed (${status}).`)
    this.status = status
  }
}

export function validatedCatalogueEndpoint(endpoint, { baseOrigin, allowHttpLocal = false } = {}) {
  const origin = baseOrigin ?? globalThis.location?.origin
  if (!endpoint || !origin) throw new Error('Private catalogue endpoint is not configured.')
  let base
  let url
  try {
    base = new URL(origin)
    url = new URL(endpoint, base)
  } catch {
    throw new Error('Private catalogue endpoint is invalid.')
  }
  const localHttp = allowHttpLocal && url.protocol === 'http:' && base.protocol === 'http:'
    && ['127.0.0.1', 'localhost'].includes(url.hostname) && url.origin === base.origin
  if (url.username || url.password || url.origin !== base.origin || (url.protocol !== 'https:' && !localHttp)) {
    throw new Error('Private catalogue endpoint must use the approved same origin.')
  }
  return url
}

export async function fetchCatalogueRows(endpoint, session, options) {
  if (!endpoint || !session?.accessToken || !session?.workspaceId) throw new Error('Private catalogue session is not configured.')
  const url = validatedCatalogueEndpoint(endpoint, options)
  url.searchParams.set('workspace_id', session.workspaceId)
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    credentials: 'same-origin',
    cache: 'no-store',
    redirect: 'error'
  })
  if (!response.ok) throw new CatalogueHttpError(response.status)
  const body = await response.json()
  if (!Array.isArray(body?.assets)) throw new Error('Catalogue endpoint returned an invalid response.')
  return body.assets
}
