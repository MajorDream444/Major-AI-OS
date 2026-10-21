import type { Asset } from './types'

// Sanitized UI fixtures only. No private paths, Drive IDs, or credentials.
export const fixtureAssets: Asset[] = [
  {
    id: 'fixture-brand', stableId: 'MAIM-CD-00-FIXTURE', title: 'Crown brand mark.png',
    format: '.png', projectCode: '00', project: 'MAIM 00 Brand System', approvalStatus: 'unreviewed',
    completenessStatus: 'complete', integrityStatus: 'sha256_verified', dependencyCount: 0,
    previewBlocked: false, originalSourceUrl: 'https://drive.google.com/'
  },
  {
    id: 'fixture-grid', stableId: 'MAIM-CD-01-FIXTURE', title: 'Instagram Launch Grid.html',
    format: '.html', projectCode: '01', project: 'MAIM 01 Instagram Launch Grid', approvalStatus: 'unreviewed',
    completenessStatus: 'blocked_dependencies', integrityStatus: 'sha256_verified', dependencyCount: 1,
    previewBlocked: true, originalSourceUrl: 'https://drive.google.com/'
  },
  {
    id: 'fixture-workbook', stableId: 'MAIM-CD-03-FIXTURE', title: 'ABC learning workbook.pdf',
    format: '.pdf', projectCode: '03', project: 'MAIM 03 ABC Roadmap + Learning Engine', approvalStatus: 'unreviewed',
    completenessStatus: 'complete', integrityStatus: 'sha256_verified', dependencyCount: 0,
    previewBlocked: false, originalSourceUrl: 'https://drive.google.com/'
  }
]
