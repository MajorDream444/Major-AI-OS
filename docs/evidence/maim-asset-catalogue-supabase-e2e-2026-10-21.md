# MAIM Asset Catalogue — Supabase-Compatible End-to-End Evidence

**Date:** 2026-10-21 (Asia/Makassar)  
**Branch:** `codex/maim-supabase-e2e-validation` from merge commit `b848256b61ab8b7fe27f99d02fe057a7db84408a`  
**Decision:** Disposable end-to-end gate PASS; canonical hosted rollout remains HOLD.

## Delivery reconciliation

GitHub records PR #50 as merged at `b848256b61ab8b7fe27f99d02fe057a7db84408a`
on 2026-10-21 at 08:20:12 UTC. The PR description was corrected to supersede
its stale merge HOLD while preserving the hosted-catalogue HOLD.

The merge triggered automatic Vercel production deployment
`dpl_3e7e9rNf1WcEJhTV8njHNy1J4WvS`. Provider inspection showed `Ready`, target
`production`, MAIM production aliases, and only the configured `apps/maim-site`
outputs (`api/checkout` and `api/stripe-webhook`). Public read-only checks found
the homepage at HTTP 200 and both `/studio` and `/creative-studio` at HTTP 404.
The merge therefore deployed the existing MAIM site automatically; it did not
deploy or verify the catalogue Studio.

## Disposable Supabase proof

`scripts/validate_asset_catalogue_supabase_e2e.sh` creates a clean local
Supabase 2.121.0 stack with PostgreSQL 17, GoTrue Auth, Kong, and PostgREST. It
applies only the inspected minimum MAIM foundation fixture and catalogue
migration, uses synthetic records, and destroys its volumes on exit.

Verified through actual HTTP boundaries:

- two synthetic users created through Supabase Auth;
- Python importer called the reconciliation RPC through Kong/PostgREST;
- first import inserted one record; repeat import reconciled it without a duplicate;
- exact loopback test origin required through explicit test-only configuration;
- canonical exact-origin validation and redirect refusal remain unchanged;
- owning Supabase Auth client adapted through `createSupabaseSessionProvider()`;
- User A read one workspace asset; User B read zero in their own workspace and
  received 403 when attempting User A's workspace context;
- an actually signed expired JWT received HTTP 401;
- revoked membership produced 403 before catalogue rows were requested;
- Auth sign-out cleared the provider session;
- a delayed session response arriving after sign-out could not restore access;
- no fixture fallback was used in live mode.

No local keys, tokens, user IDs, temporary paths, or synthetic passwords are
stored in this evidence file or committed fixtures.

## Canonical compatibility inspection — read-only

The MAIM Ecosystem project `njpdlomvyalxrkluaige` reports ACTIVE_HEALTHY in
`us-east-1` with PostgreSQL 17.11. Read-only SQL confirmed:

- `maim.workspaces`, `maim.memberships`, and `maim.vault_assets` exist with RLS;
- `auth.users -> maim.memberships -> maim.workspaces` keys match the migration;
- membership roles are constrained to `client` or `operator`;
- workspace/member SELECT policies match the disposable foundation;
- authenticated has MAIM schema usage and SELECT on workspaces/memberships;
- authenticated has no SELECT on `vault_assets`; anonymous has no MAIM schema usage;
- no `asset_catalog_*` tables or view currently exist in hosted MAIM.

The database reports no session-visible `pgrst.db_schemas` setting, so read-only
SQL did not prove whether `maim` is currently exposed through hosted PostgREST.
No schema setting was changed and no migration or data mutation was applied.

## Precise remaining hosted rollout steps

1. Independent security/privacy review this branch and the merged migration.
2. Confirm the hosted Data API schema allow-list through provider configuration;
   if `maim` is absent, prepare a separately approved minimal change rather than
   broadening schemas implicitly.
3. Snapshot hosted schema/policies and prepare a tested rollback window.
4. With explicit approval, apply the migration only—no private manifest import.
5. Create two non-production hosted test users/workspaces and repeat Auth,
   isolation, expiration, revocation, and rollback checks through hosted API.
6. Integrate the owning application's reviewed session provider and workspace
   context; deploy a protected Studio preview deliberately.
7. Verify protected browser behavior, Drive authorization, safe previews,
   sign-out, token expiry, revocation, logs, and absence of fixture fallback.
8. Obtain a separate human approval before importing the private 162-record
   catalogue manifest. Start with dry-run/reconciliation receipts and retain the
   zero-byte exception and unresolved-preview blocks.
9. Verify row counts, duplicate/conflict reports, links, and rollback evidence.
10. Make a distinct production-release decision; do not infer approval from
    Vercel/Supabase READY signals, merge status, or passing local tests.

## Data API access-path decision

The connected Supabase management surface did not expose the Data API schema
allow-list, and read-only SQL returned no session-visible `pgrst.db_schemas`
value. Do not infer exposure from schema grants. Resolve this before migration:

1. Inspect the Data API schema list in the supported Supabase project settings,
   recording only schema names and timestamp, not keys.
2. If configuration inspection remains unavailable, use an existing approved
   non-production user and publishable key to send authenticated `GET` probes
   with `Accept-Profile: maim` to `workspaces?select=id&limit=1`. Distinguish
   schema-not-exposed, 401 token failure, 403/RLS denial, and successful empty
   results. Do not create a user in the canonical project merely for discovery.
3. Do not add `maim` to the allow-list as part of the probe.

If `maim` is not exposed, prefer assessing a narrow server-side catalogue
endpoint before proposing whole-schema exposure. The endpoint should:

- live in the owning authenticated application, not the recovered Studio;
- validate the caller's user JWT with Supabase Auth and require a workspace ID;
- verify that exact user/workspace membership server-side on every request;
- use server-only credentials and the exact canonical Supabase origin;
- return only the `asset_catalog_studio` projection with pagination;
- reject redirects, omit local/provenance paths, rate-limit, and emit sanitized
  access-denial/audit events;
- have two-user, revocation, expiry, and confused-deputy tests before preview.

This adds a small server boundary but avoids exposing every object in `maim`.
Whole-schema exposure should be proposed only if the object grants/RLS matrix is
independently reviewed and the broader API surface is an intentional decision.

## Exact hosted execution sequence — approval-gated

### Gate A — snapshot only

1. Record project ref, PostgreSQL version, migration ledger, and UTC timestamp.
2. Export definitions—not row data—for the three foundation tables, all MAIM
   constraints, indexes, policies, grants, functions, and exposed-schema setting.
3. Record counts for foundation and any pre-existing `asset_catalog_*` objects.
4. Hash the migration and rollback SQL committed in the approved review SHA.
5. Store the sanitized snapshot privately; stop if drift differs from this audit.

### Gate B — migration only

1. Obtain explicit migration approval independent of import/release approval.
2. Apply exactly `supabase/migrations/202610210001_maim_asset_catalogue.sql`
   through the supported migration mechanism; do not run the manifest importer.
3. Re-read relations, constraints, policies, grants, function owner/search path,
   and migration ledger. Confirm foundation objects and counts are unchanged.
4. If any check fails, disable consumers and run exactly
   `202610210001_maim_asset_catalogue.rollback.sql`; repeat the snapshot queries.

### Gate C — hosted two-user synthetic test

1. Use two approved non-production Auth users and two isolated workspaces.
2. Insert only synthetic catalogue rows through the server importer.
3. Confirm User A reads A, User B reads B, and cross-workspace context is 403.
4. Confirm anonymous, expired-token, browser-write, and browser-RPC denial.
5. Revoke A's membership and confirm access becomes 403 immediately.
6. Confirm sign-out and delayed pre-sign-out responses cannot restore records.
7. Delete synthetic catalogue rows/users only under the approved test cleanup
   procedure; retain sanitized results and exact cleanup receipts.

### Separate later gates

- **Private-data import:** requires its own approval, dry-run report, conflict
  review, zero-byte exception, and private receipt. It is not Gate B or C.
- **Production release:** requires deliberate Studio routing/deployment, browser
  QA, observability, rollback ownership, and a separate human release decision.

No canonical Supabase data, private archive data, billing, or provider schema
configuration was changed during this work.
