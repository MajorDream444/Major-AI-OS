import { isSafeSourceUrl, previewPolicy } from '../lib/previewPolicy.mjs'
import type { Asset } from '../types'

export function AssetPreview({ asset }: { asset: Asset }) {
  const policy = previewPolicy(asset)
  const safeLink = isSafeSourceUrl(asset.originalSourceUrl)
  return <section className="preview" aria-live="polite">
    <div className="preview-head"><span>Preview policy</span><strong>{policy.mode.replace('-', ' ')}</strong></div>
    {policy.mode === 'image' && <div className="preview-placeholder" role="img" aria-label={`Preview placeholder for ${asset.title}`}>Image bytes stay in private Drive</div>}
    {policy.mode === 'sandboxed-document' && <div className="preview-placeholder">PDF preview requires an authenticated Drive preview URL and remains sandboxed.</div>}
    {policy.reason && <p>{policy.reason}</p>}
    {safeLink ? <a href={asset.originalSourceUrl} target="_blank" rel="noreferrer">Open original source ↗</a> : <span className="muted">Original link unavailable in fixture mode</span>}
  </section>
}
