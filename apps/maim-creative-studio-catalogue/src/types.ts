export type Asset = {
  id: string
  stableId: string
  title: string
  format: string
  projectCode: string
  project: string
  approvalStatus: 'unreviewed' | 'approved' | 'rejected'
  completenessStatus: 'unknown' | 'complete' | 'incomplete' | 'blocked_dependencies'
  integrityStatus: 'not_verified' | 'metadata_only' | 'sha256_verified' | 'failed'
  dependencyCount: number
  previewBlocked: boolean
  originalSourceUrl: string
}
