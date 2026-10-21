export type CatalogueAsset = {
  id: string;
  stable_id: string;
  title: string;
  format: string;
  approval_status: string;
  completeness_status: string;
  integrity_status: string;
  project_code: string;
  project: string;
  dependency_count: number;
  preview_blocked: boolean;
  original_source_url: string | null;
};

export class CatalogueAccessError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}

type CatalogueEnvironment = {
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
  MAIM_CATALOGUE_TEST_ORIGIN?: string;
  NODE_ENV?: string;
};

const canonicalOrigin = 'https://njpdlomvyalxrkluaige.supabase.co';

export function catalogueOrigin(env: CatalogueEnvironment = process.env): string {
  const configured = env.SUPABASE_URL ?? '';
  let url: URL;
  try { url = new URL(configured); } catch { throw new Error('Catalogue service is not configured'); }
  const testOrigin = env.NODE_ENV === 'test' && env.MAIM_CATALOGUE_TEST_ORIGIN
    ? new URL(env.MAIM_CATALOGUE_TEST_ORIGIN).origin
    : undefined;
  const isExplicitTestOrigin = Boolean(testOrigin && url.origin === testOrigin);
  if ((!isExplicitTestOrigin && (url.protocol !== 'https:' || Boolean(url.port))) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('Catalogue service origin is invalid');
  }
  const allowed = testOrigin ?? canonicalOrigin;
  if (url.origin !== allowed) throw new Error('Catalogue service origin is not approved');
  return url.origin;
}

function bearerToken(header: string | string[] | undefined): string {
  const value = Array.isArray(header) ? header[0] : header;
  const match = /^Bearer ([A-Za-z0-9._~-]+)$/.exec(value ?? '');
  if (!match) throw new CatalogueAccessError(401, 'Authentication required');
  return match[1];
}

function safeRows(value: unknown): CatalogueAsset[] {
  if (!Array.isArray(value)) throw new Error('Catalogue returned an invalid response');
  return value.map((item) => {
    const row = item as Record<string, unknown>;
    return {
      id: String(row.id), stable_id: String(row.stable_id), title: String(row.title), format: String(row.format),
      approval_status: String(row.approval_status), completeness_status: String(row.completeness_status),
      integrity_status: String(row.integrity_status), project_code: String(row.project_code), project: String(row.project),
      dependency_count: Number(row.dependency_count), preview_blocked: Boolean(row.preview_blocked),
      original_source_url: typeof row.original_source_url === 'string' ? row.original_source_url : null,
    };
  });
}

export async function readCatalogue(
  authorization: string | string[] | undefined,
  workspaceId: string,
  env: CatalogueEnvironment = process.env,
  request: typeof fetch = fetch,
): Promise<CatalogueAsset[]> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(workspaceId)) {
    throw new CatalogueAccessError(400, 'A valid workspace is required');
  }
  const token = bearerToken(authorization);
  const origin = catalogueOrigin(env);
  const key = env.SUPABASE_PUBLISHABLE_KEY;
  if (!key) throw new Error('Catalogue service is not configured');
  const headers = { apikey: key, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const options = { headers, redirect: 'error' as const, cache: 'no-store' as const, signal: AbortSignal.timeout(10000) };

  const auth = await request(`${origin}/auth/v1/user`, options);
  if (!auth.ok) throw new CatalogueAccessError(401, 'Session is signed out or expired');

  const response = await request(`${origin}/rest/v1/rpc/get_maim_asset_catalogue`, {
    ...options, method: 'POST', body: JSON.stringify({ p_workspace_id: workspaceId }),
  });
  if (response.status === 401 || response.status === 403) throw new CatalogueAccessError(403, 'Workspace membership is not authorized');
  if (!response.ok) throw new Error(`Catalogue service failed (${response.status})`);
  return safeRows(await response.json());
}
