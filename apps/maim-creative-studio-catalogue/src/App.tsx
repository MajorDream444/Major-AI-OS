import { useMemo, useState } from 'react'
import { AssetPreview } from './components/AssetPreview'
import { fixtureAssets } from './fixtures'
import type { Asset } from './types'
import './styles.css'

const projects = ['all', ...Array.from(new Set(fixtureAssets.map((asset) => asset.projectCode)))]

export default function App() {
  const [query, setQuery] = useState('')
  const [project, setProject] = useState('all')
  const [dependency, setDependency] = useState('all')
  const [selected, setSelected] = useState<Asset>(fixtureAssets[0])
  const assets = useMemo(() => fixtureAssets.filter((asset) => {
    const text = `${asset.title} ${asset.stableId} ${asset.project}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (project === 'all' || asset.projectCode === project)
      && (dependency === 'all' || (dependency === 'blocked') === asset.previewBlocked)
  }), [query, project, dependency])

  return <main>
    <header>
      <p className="eyebrow">MAIM Creative Studio / private catalogue preview</p>
      <h1>Build from what we can prove.</h1>
      <p className="lede">Search recovered originals without turning recovery evidence into approval. Drive remains the archive.</p>
      <div className="status"><span>Fixture mode</span><span>Unreviewed by default</span><span>No executable previews</span></div>
    </header>
    <section className="controls" aria-label="Catalogue filters">
      <label>Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, stable ID, project" /></label>
      <label>Project<select value={project} onChange={(event) => setProject(event.target.value)}>{projects.map((value) => <option key={value} value={value}>{value === 'all' ? 'All projects' : `MAIM ${value}`}</option>)}</select></label>
      <label>Dependencies<select value={dependency} onChange={(event) => setDependency(event.target.value)}><option value="all">All statuses</option><option value="clear">Preview eligible</option><option value="blocked">Blocked</option></select></label>
    </section>
    <div className="workspace">
      <section className="library"><div className="section-title"><h2>Original-source catalogue</h2><span>{assets.length} records</span></div>
        <div className="asset-list">{assets.map((asset) => <button className={selected.id === asset.id ? 'asset active' : 'asset'} key={asset.id} onClick={() => setSelected(asset)}>
          <span className="format">{asset.format}</span><span><strong>{asset.title}</strong><small>{asset.project}</small></span><span className={`signal ${asset.previewBlocked ? 'blocked' : 'clear'}`}>{asset.previewBlocked ? 'blocked' : 'ready'}</span>
        </button>)}</div>
      </section>
      <aside><p className="eyebrow">Selected record</p><h2>{selected.title}</h2><code>{selected.stableId}</code>
        <dl><div><dt>Approval</dt><dd>{selected.approvalStatus}</dd></div><div><dt>Completeness</dt><dd>{selected.completenessStatus}</dd></div><div><dt>Integrity</dt><dd>{selected.integrityStatus}</dd></div><div><dt>Dependencies</dt><dd>{selected.dependencyCount}</dd></div></dl>
        <AssetPreview asset={selected} />
      </aside>
    </div>
  </main>
}
