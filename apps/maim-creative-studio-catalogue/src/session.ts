export type CatalogueSession = { accessToken: string; workspaceId: string }

export type CatalogueSessionProvider = {
  getSession(): Promise<CatalogueSession | null>
  subscribe(listener: (session: CatalogueSession | null) => void): () => void
}

declare global {
  interface Window {
    __MAIM_STUDIO_SESSION__?: CatalogueSessionProvider
    __MAIM_STUDIO_AUTH_CONFIG__?: {
      supabaseUrl: string
      publishableKey: string
      workspaceId: string
    }
  }
}
