# MAIM catalogue hosted migration receipt — 21 October 2026

Owner authorization: “proceed and get it done” after migration-only scope was presented. Applied through MAIM ECOSYSTEM Supabase plugin only to project njpdlomvyalxrkluaige. No hosted CLI was used.

## Applied SQL and authoritative ledger mapping

| Reviewed source file | SHA-256 | Plugin-generated hosted version | Hosted name |
| --- | --- | --- | --- |
| 202610210001_maim_asset_catalogue.sql | 99c0fb9ad1b04d63cc3901f93191617d5ff9c8df91d8b014c64f6a0ea65b2055 | 20261021123131 | maim_asset_catalogue |
| 202610210002_maim_catalogue_api.sql | 920edf3fbcb90324172c831d1784f5b16506dfc043e7959e40296f003f311499 | 20261021123147 | maim_catalogue_api |

Both source hashes were independently recalculated from current main before submission. Both plugin migration calls returned success. Ledger now has five entries: the three historical entries plus these two. The plugin assigned application timestamps rather than repository source versions. Do not reapply SQL under source filenames or rewrite the hosted ledger to force version equality. This mapping is authoritative for future plugin preflight; reconcile repository naming separately before any future migration-discovery workflow.

## Post-apply verification

- Six catalogue tables exist, all with RLS enabled and six SELECT policies.
- Anonymous table SELECT is denied; authenticated catalogue SELECT is granted; authenticated INSERT/UPDATE/DELETE are denied.
- Studio view has security_invoker=true.
- Private reconciliation function is SECURITY DEFINER with search_path=pg_catalog, maim; authenticated and anonymous EXECUTE are denied.
- Public read and import bridges are SECURITY INVOKER with fixed search_path.
- Public read bridge grants authenticated EXECUTE and denies anonymous EXECUTE.
- Public import bridge grants service_role EXECUTE and denies authenticated/anonymous EXECUTE.
- Function owner is postgres.
- Existing nine maim foundation tables and maim_ops.application_registry retain their table ACLs and RLS flags compared with the fresh pre-apply inspection. Six existing foundation policies remain.
- Catalogue asset count is zero. No private manifest import or synthetic user/data creation occurred.
- No Data API exposure configuration was changed.

Security advisor returned only four pre-existing INFO notices for RLS without policies on refunds, vault_assets, webhook_events and application_registry. No catalogue security notice was returned. These notices were present in the prior consolidation record; no permissive policies were added to silence them.
Reference: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy

## Scope and remaining validation

Migration application and structural/grant verification are complete. Hosted Auth/PostgREST two-user tests, actual HTTP endpoint checks, Drive authorization, private catalogue import and deliberate Studio release are not established by this receipt. Existing disposable tests remain separate evidence. No import, Studio deployment, release, billing or schema-exposure operation was performed.

Next Codex handoff: read this receipt; use MAIM ECOSYSTEM plugin and project njpdlomvyalxrkluaige only. Do not rerun the applied migrations. Prepare hosted synthetic authorization validation and protected Studio integration using the recorded mapping. Keep private import and release separate from this completed migration-only scope.
