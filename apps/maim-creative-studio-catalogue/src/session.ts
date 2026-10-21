export type CatalogueSessionProvider = {
  getAccessToken(): Promise<string | null>
  subscribe(listener: (accessToken: string | null) => void): () => void
}

declare global {
  interface Window {
    __MAIM_STUDIO_SESSION__?: CatalogueSessionProvider
  }
}
