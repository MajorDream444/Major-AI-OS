import type { Asset } from '../types'
import { CatalogueHttpError, fetchCatalogueRows } from './catalogueApi.mjs'
import type { CatalogueSession } from '../session'

export { CatalogueHttpError as CatalogueAccessError }

type Row = {
  id: string; stable_id: string; title: string; format: string;
  approval_status: Asset['approvalStatus']; completeness_status: Asset['completenessStatus'];
  integrity_status: Asset['integrityStatus']; project_code: string; project: string;
  dependency_count: number; preview_blocked: boolean; original_source_url: string;
}

export async function fetchCatalogue(session: CatalogueSession): Promise<Asset[]> {
  const endpoint = (import.meta.env.VITE_CATALOGUE_API_URL as string | undefined) ?? '/api/catalogue'
  const rows = await fetchCatalogueRows(endpoint, session, {
    allowHttpLocal: import.meta.env.VITE_CATALOGUE_ALLOW_HTTP_LOCAL === 'true'
  }) as Row[]
  return rows.map((row) => ({
    id: row.id, stableId: row.stable_id, title: row.title, format: row.format,
    projectCode: row.project_code, project: row.project, approvalStatus: row.approval_status,
    completenessStatus: row.completeness_status, integrityStatus: row.integrity_status,
    dependencyCount: row.dependency_count, previewBlocked: row.preview_blocked,
    originalSourceUrl: row.original_source_url
  }))
}
