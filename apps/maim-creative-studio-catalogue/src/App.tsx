import { useEffect, useMemo, useState } from 'react'
import { AssetPreview } from './components/AssetPreview'
import { fixtureAssets } from './fixtures'
import { fetchCatalogue } from './lib/catalogueClient'
import { catalogueFailureState, signedOutState } from './lib/catalogueState.mjs'
import type { CatalogueSessionProvider } from './session'
import type { CatalogueSession } from './session'
import type { Asset } from './types'
import './styles.css'

type Phase = 'loading' | 'ready' | 'signed-out' | 'revoked' | 'error'
type Props = { mode: 'live' | 'fixture'; sessionProvider?: CatalogueSessionProvider }

export default function App({ mode, sessionProvider }: Props) {
  const [query, setQuery] = useState('')
  const [project, setProject] = useState('all')
  const [dependency, setDependency] = useState('all')
  const [catalogue, setCatalogue] = useState<{ phase: Phase; message: string; assets: Asset[] }>(() =>
    mode === 'fixture'
      ? { phase: 'ready', message: 'Sanitized fixture mode', assets: fixtureAssets }
      : { phase: 'loading', message: 'Loading private catalogue…', assets: [] })
  const [selectedId, setSelectedId] = useState<string | null>(() => mode === 'fixture' ? fixtureAssets[0]?.id ?? null : null)

  useEffect(() => {
    if (mode === 'fixture') return
    let active = true
    let requestGeneration = 0
    const clearWith = (state: { phase: string; message: string }) => {
      if (!active) return
      setCatalogue({ phase: state.phase as Phase, message: state.message, assets: [] })
      setSelectedId(null)
    }
    const load = async (session: CatalogueSession | null) => {
      const generation = ++requestGeneration
      if (!session) return clearWith(signedOutState())
      if (active) setCatalogue({ phase: 'loading', message: 'Loading private catalogue…', assets: [] })
      try {
        const assets = await fetchCatalogue(session)
        if (!active || generation !== requestGeneration) return
        setCatalogue({ phase: 'ready', message: 'Authenticated workspace catalogue', assets })
        setSelectedId(assets[0]?.id ?? null)
      } catch (error) {
        if (generation === requestGeneration) clearWith(catalogueFailureState(error))
      }
    }
    if (!sessionProvider) {
      clearWith(signedOutState())
      return
    }
    void sessionProvider.getSession().then(load).catch((error) => clearWith(catalogueFailureState(error)))
    const unsubscribe = sessionProvider.subscribe((session) => { void load(session) })
    return () => { active = false; unsubscribe() }
  }, [mode, sessionProvider])

  const projects = useMemo(() => ['all', ...Array.from(new Set(catalogue.assets.map((asset) => asset.projectCode)))], [catalogue.assets])
  const assets = useMemo(() => catalogue.assets.filter((asset) => {
    const text = `${asset.title} ${asset.stableId} ${asset.project}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (project === 'all' || asset.projectCode === project)
      && (dependency === 'all' || (dependency === 'blocked') === asset.previewBlocked)
  }), [catalogue.assets, query, project, dependency])
  const selected = catalogue.assets.find((asset) => asset.id === selectedId) ?? assets[0]

  return <main>
    <header>
      <p className="eyebrow">MAIM Creative Studio / private catalogue preview</p>
      <h1>Build from what we can prove.</h1>
      <p className="lede">Search recovered originals without turning recovery evidence into approval. Drive remains the archive.</p>
      <div className="status"><span>{mode === 'fixture' ? 'Fixture mode' : 'Authenticated live mode'}</span><span>Unreviewed by default</span><span>No executable previews</span></div>
    </header>
    {catalogue.phase !== 'ready' ? <section className={`catalogue-state ${catalogue.phase}`} role="status"><h2>Catalogue unavailable</h2><p>{catalogue.message}</p></section> : <>
      <section className="controls" aria-label="Catalogue filters">
        <label>Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, stable ID, project" /></label>
        <label>Project<select value={project} onChange={(event) => setProject(event.target.value)}>{projects.map((value) => <option key={value} value={value}>{value === 'all' ? 'All projects' : `MAIM ${value}`}</option>)}</select></label>
        <label>Dependencies<select value={dependency} onChange={(event) => setDependency(event.target.value)}><option value="all">All statuses</option><option value="clear">Preview eligible</option><option value="blocked">Blocked</option></select></label>
      </section>
      <div className="workspace">
        <section className="library"><div className="section-title"><h2>Original-source catalogue</h2><span>{assets.length} records</span></div>
          <div className="asset-list">{assets.map((asset) => <button className={selected?.id === asset.id ? 'asset active' : 'asset'} key={asset.id} onClick={() => setSelectedId(asset.id)}>
            <span className="format">{asset.format}</span><span><strong>{asset.title}</strong><small>{asset.project}</small></span><span className={`signal ${asset.previewBlocked ? 'blocked' : 'clear'}`}>{asset.previewBlocked ? 'blocked' : 'ready'}</span>
          </button>)}</div>
        </section>
        <aside>{selected ? <><p className="eyebrow">Selected record</p><h2>{selected.title}</h2><code>{selected.stableId}</code>
          <dl><div><dt>Approval</dt><dd>{selected.approvalStatus}</dd></div><div><dt>Completeness</dt><dd>{selected.completenessStatus}</dd></div><div><dt>Integrity</dt><dd>{selected.integrityStatus}</dd></div><div><dt>Dependencies</dt><dd>{selected.dependencyCount}</dd></div></dl>
          <AssetPreview asset={selected} /></> : <p className="muted">No matching catalogue records.</p>}</aside>
      </div>
    </>}
  </main>
}
