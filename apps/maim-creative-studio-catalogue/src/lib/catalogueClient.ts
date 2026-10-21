import type { Asset } from '../types'

export class CatalogueAccessError extends Error {
  constructor(public readonly status: number) {
    super(status === 401 ? 'Catalogue session is signed out.' : status === 403 ? 'Catalogue membership is not authorized.' : `Catalogue request failed (${status}).`)
  }
}

type Row = {
  id: string; stable_id: string; title: string; format: string;
  approval_status: Asset['approvalStatus']; completeness_status: Asset['completenessStatus'];
  integrity_status: Asset['integrityStatus']; project_code: string; project: string;
  dependency_count: number; preview_blocked: boolean; original_source_url: string;
}

export async function fetchCatalogue(accessToken: string): Promise<Asset[]> {
  const endpoint = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined
  if (!endpoint || !publishableKey || !accessToken) throw new Error('Private catalogue session is not configured.')
  const response = await fetch(`${endpoint}/rest/v1/asset_catalog_studio?select=*&order=title.asc`, {
    headers: { apikey: publishableKey, Authorization: `Bearer ${accessToken}`, 'Accept-Profile': 'maim' }
  })
  if (!response.ok) throw new CatalogueAccessError(response.status)
  return ((await response.json()) as Row[]).map((row) => ({
    id: row.id, stableId: row.stable_id, title: row.title, format: row.format,
    projectCode: row.project_code, project: row.project, approvalStatus: row.approval_status,
    completenessStatus: row.completeness_status, integrityStatus: row.integrity_status,
    dependencyCount: row.dependency_count, previewBlocked: row.preview_blocked,
    originalSourceUrl: row.original_source_url
  }))
}
