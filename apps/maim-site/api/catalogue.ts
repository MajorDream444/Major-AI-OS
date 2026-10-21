import type { ApiRequest, ApiResponse } from './_types.js';
import { CatalogueAccessError, readCatalogue } from '../lib/catalogue.js';

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Vary', 'Authorization');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const rawWorkspace = req.query?.workspace_id;
  const workspaceId = Array.isArray(rawWorkspace) ? rawWorkspace[0] : rawWorkspace;
  try {
    const assets = await readCatalogue(req.headers.authorization, workspaceId ?? '');
    res.status(200).json({ assets });
  } catch (error) {
    if (error instanceof CatalogueAccessError) {
      res.status(error.status).json({ error: error.message });
      return;
    }
    res.status(503).json({ error: 'Catalogue is unavailable' });
  }
}
