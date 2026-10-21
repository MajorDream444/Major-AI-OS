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

No canonical Supabase data, private archive data, billing, or provider schema
configuration was changed during this work.
