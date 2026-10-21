const IMAGE = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'])
const EXECUTABLE = new Set(['.html', '.htm', '.js', '.jsx', '.mjs', '.cjs'])

export function previewPolicy(asset) {
  const format = String(asset.format || '').toLowerCase()
  if (asset.previewBlocked || asset.completenessStatus === 'blocked_dependencies') {
    return { mode: 'blocked', reason: 'Unresolved dependencies block preview.' }
  }
  if (EXECUTABLE.has(format)) {
    return { mode: 'source-only', reason: 'Recovered executable content is never run in the Studio origin.' }
  }
  if (IMAGE.has(format)) return { mode: 'image', reason: '' }
  if (format === '.pdf') return { mode: 'sandboxed-document', reason: '' }
  return { mode: 'source-only', reason: 'This format is available from its original-source link.' }
}

export function isSafeSourceUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && ['drive.google.com', 'docs.google.com'].includes(url.hostname)
  } catch {
    return false
  }
}
