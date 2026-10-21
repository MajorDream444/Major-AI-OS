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

This legacy stream is retained for provenance and audit. It is not a MAIM Ecosystem migration and must not be discovered by a linked canonical-project dry-run.

## Gates

Plugin reads can reconcile hosted history and inspect schema state. They do not establish CLI authentication and cannot satisfy the linked CLI dry-run gate. A linked dry-run remains **NOT RUN** until an authenticated Supabase CLI executes it and reports exactly the two proposed forward catalogue migrations.
