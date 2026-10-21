# Supabase migration stream ownership

## Canonical MAIM Ecosystem

- Project: **MAIM Ecosystem** (`njpdlomvyalxrkluaige`)
- Configuration: `supabase/config.toml`
- Forward migration directory: `supabase/migrations/`
- Hosted-history files: the three `20261014...` / `20261020...` files were reconstructed byte-for-byte from the `statements` arrays in the hosted `supabase_migrations.schema_migrations` ledger through the MAIM ECOSYSTEM plugin connection.
- Proposed forward changes: `202610210001_maim_asset_catalogue.sql` and `202610210002_maim_catalogue_api.sql`.

Only canonical MAIM Ecosystem forward migrations belong in `supabase/migrations/`. The local disposable harness deliberately applies its synthetic foundation fixture followed by the two proposed catalogue migrations; it does not replay hosted production history.

## Rollback operations

- Directory: `supabase/rollbacks/`
- Owner: MAIM Ecosystem operational runbook
- Status: operator-invoked rollback SQL, never part of Supabase migration discovery

Moving these files did not change their bytes. Rollback remains a separate, explicit human action.

## Legacy registrations project

- Project: **major ai mindset** (`fsrskmlsxqtxduhdfhnd`)
- Directory: `supabase/legacy/registrations/`
- Historical file: `0001_registrations.sql`
- Original repository commit: `7fc1379` (`Establish canonical source of truth and close launch gaps`)

This legacy stream is retained for provenance and audit. It is not a MAIM Ecosystem migration and must not be included in a MAIM ECOSYSTEM plugin migration operation.

## Gates

Use the **MAIM ECOSYSTEM** plugin connection for hosted history inspection,
approved migration application, and post-change verification. The canonical
project is `njpdlomvyalxrkluaige`. CLI login, linking, push, and dry-run gates
are superseded by the owner decision in
`docs/decisions/MAIM_DATABASE_CONSOLIDATION_2026-10-20.md`.

Before any separately approved hosted apply, use read-only plugin queries to
confirm the target, authoritative ledger, dependencies, object absence, SQL
hashes, grants, and rollback readiness. Plugin application must contain only
the two reviewed forward catalogue migrations. Private import and Studio
release remain separate approvals.
