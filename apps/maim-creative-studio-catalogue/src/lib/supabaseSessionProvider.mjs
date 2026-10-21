export function createSupabaseSessionProvider(auth, workspaceId) {
  if (!auth || !workspaceId) throw new Error('Supabase auth and workspace ID are required.')
  let generation = 0
  let latestSession
  const listeners = new Set()
  const subscription = auth.onAuthStateChange((_event, session) => {
    generation += 1
    const value = session?.access_token ? { accessToken: session.access_token, workspaceId } : null
    latestSession = value
    for (const listener of listeners) listener(value)
  })
  return {
    async getSession() {
      const startedAt = generation
      const { data, error } = await auth.getSession()
      if (error) throw error
      if (startedAt !== generation) return latestSession ?? null
      return data.session?.access_token ? { accessToken: data.session.access_token, workspaceId } : null
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    dispose() {
      listeners.clear()
      subscription.data?.subscription?.unsubscribe?.()
    }
  }
}
