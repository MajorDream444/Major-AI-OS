# MAIM Asset Catalogue — Disposable Database Validation

**Status:** PASS locally; hosted connection remains untested and gated.  
**Scope:** PostgreSQL 15 disposable Docker container only. No canonical MAIM Supabase mutation.

## Evidence

- Reconstructed only the minimum existing `auth.users`, `maim.workspaces`,
  `maim.memberships`, and `maim.vault_assets` contracts in a test fixture.
- Applied `202610210001_maim_asset_catalogue.sql` as the database owner.
- Used real `anon`, `authenticated`, and `service_role` PostgreSQL roles plus
  `request.jwt.claim.sub` values for two distinct users.
- Confirmed anonymous reads and RPC calls fail.
- Confirmed User A can read their workspace asset and all related catalogue
  records while User B sees none of them.
- Confirmed `authenticated` cannot write catalogue tables or invoke the importer
  RPC; `service_role` can invoke it.
- Confirmed membership removal immediately removes Studio catalogue access.
- Confirmed the importer is `SECURITY DEFINER` with fixed
  `search_path = pg_catalog, maim`.
- Confirmed first import, repeat reconciliation, conflicting stable identity,
  missing upload, and documented zero-byte exception behavior. Repeating the
  import leaves one asset, byte version, source, membership, and dependency.
- Confirmed an existing Drive file ID cannot be reassigned to a different stable
  asset in the same workspace; the original association remains unchanged.
- Confirmed importer destination validation rejects noncanonical URLs before a
  network opener is created and the importer refuses HTTP redirects.
- Confirmed the project-relative path `  assets/safe.png` is preserved exactly.
- Found and fixed a rollback dependency-order defect. The rerun confirmed that
  existing vault asset data, foundation tables, and membership/workspace policies
  survive while all catalogue objects are removed.

## Reproduction

```sh
scripts/validate_asset_catalogue_db.sh
```

The script creates and removes `maim-catalogue-validation`. It accepts
`MAIM_CATALOGUE_DB_CONTAINER` and `MAIM_CATALOGUE_DB_IMAGE` overrides.

## Remaining gates

- The test foundation is a deliberately minimal reconstruction because this
  repository does not contain the canonical hosted MAIM identity migration.
- PostgREST/JWT transport and the Python importer's HTTP adapter were not tested
  end to end; database reconciliation was tested directly through PostgreSQL.
- Hosted schema compatibility, Studio authentication, signed/original-source
  links, and browser preview behavior remain unverified.
- Vercel automatically created an SSO-protected branch preview using its
  configured `apps/maim-site` root. Provider inspection showed only that site's
  existing API functions and no Studio output. It does not establish a deployed
  catalogue connection.
- The archive receipt reports 162 originals checked with zero mismatches and 22
  provenance files before the receipt itself. This database run did not rehash
  those private files and does not upgrade that reported evidence.
- No deployment, merge, hosted migration, billing change, or publication is
  authorized by this result.
