export class CatalogueHttpError extends Error {
  constructor(status) {
    super(status === 401 ? 'Catalogue session is signed out or expired.' : status === 403 ? 'Catalogue membership is not authorized.' : `Catalogue request failed (${status}).`)
    this.status = status
  }
}

async function requestRows(endpoint, publishableKey, accessToken, resource) {
  const response = await fetch(`${endpoint}/rest/v1/${resource}`, {
    headers: { apikey: publishableKey, Authorization: `Bearer ${accessToken}`, 'Accept-Profile': 'maim' }
  })
  if (!response.ok) throw new CatalogueHttpError(response.status)
  return response.json()
}

export async function fetchCatalogueRows(endpoint, publishableKey, session) {
  if (!endpoint || !publishableKey || !session?.accessToken || !session?.workspaceId) throw new Error('Private catalogue session is not configured.')
  const workspace = encodeURIComponent(session.workspaceId)
  const memberships = await requestRows(endpoint, publishableKey, session.accessToken, `workspaces?id=eq.${workspace}&select=id`)
  if (memberships.length !== 1) throw new CatalogueHttpError(403)
  return requestRows(endpoint, publishableKey, session.accessToken, `asset_catalog_studio?workspace_id=eq.${workspace}&select=*&order=title.asc`)
}
