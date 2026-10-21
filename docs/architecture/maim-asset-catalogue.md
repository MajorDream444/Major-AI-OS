# MAIM asset catalogue and Creative Studio connection

Status: implementation candidate; not applied to hosted Supabase; Studio not included in the inspected automatic branch deployment

Target project: MAIM Ecosystem `njpdlomvyalxrkluaige`
Original-source authority: controlled Google Drive archive

## Verified starting point

Read-only inspection on 2026-10-21 confirmed that `maim.vault_assets` is empty, RLS-enabled, and workspace-scoped through `maim.workspaces`. Its fields cover storage key, rights, review, third-party consent and retention. It has no authenticated read policy. Existing identity uses `auth.users` → `maim.memberships` → `maim.workspaces`.

The catalogue does not repurpose or alter that table. It adds a separate normalized model for recovered design records while retaining an optional, nullable link to a future compatible `vault_assets` record.

## Model

- `asset_catalog_assets`: stable record and independent approval, completeness and integrity states.
- `asset_catalog_byte_versions`: SHA-256 plus byte size; identical bytes do not imply canonical authority.
- `asset_catalog_source_locations`: private Drive locator and project-relative path; absolute local paths are forbidden.
- `asset_catalog_projects`: workspace-scoped MAIM 00–09 or routing-review projects.
- `asset_catalog_project_memberships`: many-to-many project membership and version relationship.
- `asset_catalog_dependencies`: dependency status, evidence and preview blocking.
- `asset_catalog_studio`: security-invoker read model for the Studio.

All tables are in the private `maim` schema. RLS reuses existing workspace memberships. Authenticated users receive SELECT only and see records only for workspaces they belong to. Anonymous access and browser writes are denied. The reconciliation function is granted only to `service_role` and is intended for server-side/CLI use.

## Importer

`scripts/import_maim_asset_manifest.py` is dry-run by default. It:

1. validates stable IDs, hashes, sizes and Drive identifiers;
2. removes `candidate_source_path` and `source_path` rather than sending them;
3. reports duplicate rows, conflicting stable IDs, missing uploads and the zero-byte exception;
4. preserves recovered approval as `unreviewed` while storing completion context separately;
5. sends one atomic JSON manifest to the server-only RPC only with `--apply`.

Apply mode accepts only the exact origin
`https://njpdlomvyalxrkluaige.supabase.co`: alternate schemes, hosts, explicit
ports, userinfo, paths, queries, and fragments are rejected before networking.
HTTP redirects are refused so service-role headers cannot be replayed to a
redirect destination.

Dry run:

```bash
python3 scripts/import_maim_asset_manifest.py /private/path/upload-manifest.csv \
  --report /private/path/reconciliation-report.json
```

Apply after migration approval and an isolated-database test:

```bash
SUPABASE_URL=https://njpdlomvyalxrkluaige.supabase.co \
SUPABASE_SERVICE_ROLE_KEY='set-outside-git' \
python3 scripts/import_maim_asset_manifest.py /private/path/upload-manifest.csv \
  --workspace-id '<approved-workspace-uuid>' --apply \
  --report /private/path/applied-reconciliation-report.json
```

Never use the service-role credential in Vite, browser code, fixtures, logs or committed environment files.

## Preview safety

The Studio only treats non-blocked images and PDFs as preview-capable. PDFs require an authenticated Drive preview URL and a sandboxed host integration. HTML, JavaScript and other executable recovered content are always source-only links and must never be injected, imported, evaluated, or framed on the Studio origin. Any unresolved dependency sets `preview_blocked`.

The Studio defaults to live mode and consumes the owning application's injected
authenticated-session provider; it does not implement a parallel sign-in. A
normal user token and trusted workspace ID are used with the publishable key.
The Supabase adapter forwards Auth changes, rejects stale delayed session reads,
and verifies workspace membership before loading catalogue rows. Fixture mode requires the
explicit `VITE_CATALOGUE_MODE=fixture` build setting, and live errors never fall
back to fixtures. Sign-out and HTTP 403 membership revocation clear all records.

Vercel automatically rebuilt the PR branch as deployment
`dpl_9g2JfKZUgZzGFqajQ42QBavnZSec` on 2026-10-21. Provider and PR inspection
showed target `preview`, status `Ready`, configured root directory
`apps/maim-site`, an SSO redirect for unauthenticated requests, and only that
site's `api/checkout` and `api/stripe-webhook` function outputs. It did not build
this Studio directory. This is automatic repository-branch deployment
evidence, not a deliberate Studio deployment or a hosted catalogue connection.

After PR #50 merged, Vercel automatically created production deployment
`dpl_3e7e9rNf1WcEJhTV8njHNy1J4WvS` for merge commit
`b848256b61ab8b7fe27f99d02fe057a7db84408a`. It was `Ready` and aliased to the
MAIM domains, but its inspected outputs again contained only the configured
`apps/maim-site` application and its two API functions. `/studio` and
`/creative-studio` returned 404. This is a production deployment caused by the
merge, not evidence that the catalogue or Studio was deployed.

## Validation gates

Before hosted application:

1. Apply migration to an isolated Supabase branch/test database.
2. Run `supabase/tests/asset_catalogue_rls.sql` and prove member read plus cross-user denial.
3. Run importer twice against the same test workspace and compare reconciliation counts.
4. Test a conflicting stable ID and a missing Drive upload.
5. Confirm the zero-byte item remains an exception rather than a fabricated file.
6. Verify the `maim` schema is exposed only as intended by the API configuration.
7. Use two real test users to confirm Studio isolation.
8. Confirm Drive links require the expected private authorization.
9. Obtain human approval before applying to the canonical project or deploying the Studio.

## Rollback

The rollback SQL is `supabase/migrations/202610210001_maim_asset_catalogue.rollback.sql`.

1. Disable the catalogue importer and Studio catalogue adapter.
2. Export catalogue rows and reconciliation evidence if any test data exists.
3. Confirm no later migration or consumer references the catalogue objects.
4. Run the rollback against the same approved environment.
5. Re-run schema and policy inspection.

Rollback intentionally leaves `maim.vault_assets`, `maim.memberships`, `maim.workspaces`, `auth.users`, Drive originals and every existing product policy unchanged.
