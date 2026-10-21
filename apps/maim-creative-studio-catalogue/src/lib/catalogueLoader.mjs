export function createCatalogueLoader({ fetchCatalogue, onLoading, onReady, onSignedOut, onFailure }) {
  let active = true
  let generation = 0

  async function load(session) {
    const requestGeneration = ++generation
    if (!session) {
      if (active) onSignedOut()
      return
    }
    if (active) onLoading()
    try {
      const assets = await fetchCatalogue(session)
      if (active && requestGeneration === generation) onReady(assets)
    } catch (error) {
      if (active && requestGeneration === generation) onFailure(error)
    }
  }

  return {
    load,
    fail(error) {
      generation += 1
      if (active) onFailure(error)
    },
    dispose() {
      active = false
      generation += 1
    }
  }
}
