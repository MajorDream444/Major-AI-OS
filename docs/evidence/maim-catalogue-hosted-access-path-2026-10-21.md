# MAIM catalogue hosted access-path decision

**Date:** 2026-10-21 17:47 WITA / 09:47 UTC  
**Scope:** read-only hosted inspection plus local implementation  
**Decision:** use a narrow authenticated server endpoint backed by one
membership-scoped `public` RPC; do not expose the whole `maim` schema.  
**Hosted readiness:** HOLD.

## Hosted exposure evidence

The canonical project is `njpdlomvyalxrkluaige`. No hosted mutation was made.

At 2026-10-21T09:47:34Z, read-only SQL through the connected Supabase
management surface returned:

```json
{
  "session_visible_db_schemas": null,
  "session_visible_extra_search_path": null,
  "maim_workspace_exists": true,
  "catalogue_view_exists": false
}
```

An unauthenticated HTTPS request to
`/rest/v1/workspaces?select=id&limit=1` with `Accept-Profile: maim` returned
HTTP 401 and `No API key found in request`. That proves the gateway requires an
API key; it does not distinguish an exposed schema from an unexposed schema.
The connected management tools did not expose the Data API schema allow-list,
and there was no approved hosted test-user token for an authenticated probe.

**Conclusion:** whether hosted PostgREST currently exposes `maim` remains
**INCONCLUSIVE**. Database grants and a null session setting are not evidence of
Data API exposure. The proposed path does not require adding `maim` to the
allow-list.

## Narrow access path

`public.get_maim_asset_catalogue(uuid)` is the narrow browser-read PostgREST
surface. It:

- is `SECURITY INVOKER`, granted only to `authenticated`;
- rejects a missing or non-member `auth.uid()`;
- reads the RLS-protected, security-invoker `maim.asset_catalog_studio` view;
- filters again by the selected workspace;
- returns only the Studio catalogue projection and omits workspace/provenance
  internals.

`apps/maim-site/api/catalogue.ts` validates the bearer session against Supabase
Auth, invokes that RPC with the same user JWT, refuses redirects, and returns a
defensive field allow-list with `Cache-Control: private, no-store`. The service
origin and publishable key are server environment values. No service-role key
is used by this read endpoint or sent to the browser.

The Studio now calls `/api/catalogue?workspace_id=...` with its owning
application session instead of calling the private schema directly.

The server-only importer uses a separate
`public.reconcile_maim_asset_catalog_manifest(uuid,jsonb)` bridge. It is
`SECURITY INVOKER`, granted only to `service_role`, and delegates to the
canonical `maim.reconcile_asset_catalog_manifest` implementation. The Python
importer keeps dry-run as its default and preserves reconciliation, conflict,
missing-upload, zero-byte, exact-origin, and redirect-refusal behavior.

The disposable Supabase configuration exposes only `public` and
`graphql_public`; `maim` is deliberately absent. With that configuration, the
HTTP importer passed first import, repeat reconciliation, conflict protection,
missing/zero-byte classification, and two-workspace imports through the public
service-only bridge.

The disposable end-to-end test now starts a real local HTTP server around
`/api/catalogue` and drives the Studio client through that handler. It confirms
anonymous 401, expired-token 401, revoked/cross-workspace 403, multi-workspace
selection, and sign-out behavior. Studio destination tests prove that
cross-origin, userinfo, and non-HTTPS URLs are rejected before any request;
redirects use `redirect: error`. Explicit HTTP testing is loopback and
exact-origin only.

## Approval-gated hosted rollout commands

These commands are a runbook, not authorization. Run from the reviewed clean
checkout at the approved commit. Keep snapshot output in a private operations
location, never Git.

### Gate 0 — verify review state

```bash
git fetch origin
git status --short
git rev-parse HEAD
gh pr view 52 --json state,isDraft,mergeCommit,headRefOid
supabase projects list
```

PR #52 merge state and hosted readiness are independent. Stop unless the
approved commit contains both catalogue migrations in order.

### Gate 1 — read-only snapshot and dry run

```bash
supabase link --project-ref njpdlomvyalxrkluaige
supabase migration list --linked
supabase db dump --linked --schema-only --schema auth,maim,public \
  --file /private/approved-location/maim-before-catalogue.sql
shasum -a 256 \
  supabase/migrations/202610210001_maim_asset_catalogue.sql \
  supabase/migrations/202610210002_maim_catalogue_api.sql \
  supabase/rollbacks/202610210001_maim_asset_catalogue.rollback.sql \
  supabase/rollbacks/202610210002_maim_catalogue_api.rollback.sql
supabase db push --linked --dry-run
```

Review the proposed migration list and snapshot before any write.

### Gate 2 — migration only, after separate approval

```bash
supabase db push --linked
supabase migration list --linked
```

Immediately re-inspect the function owner, `prosecdef=false`, fixed search
path, grants for both public bridges, view RLS behavior, and foundation-object
counts. Confirm `maim` was not added to the Data API schema allow-list. Do not
run the private manifest importer.

### Gate 3 — server configuration and protected preview, after separate approval

Configure these only in the protected owning application:

```text
SUPABASE_URL=https://njpdlomvyalxrkluaige.supabase.co
SUPABASE_PUBLISHABLE_KEY=<hosted publishable key>
VITE_CATALOGUE_API_URL=/api/catalogue
```

Then perform a deliberate protected preview deployment through the repository's
approved Vercel workflow. Do not place a service-role key in Vite or browser
configuration.

### Gate 4 — hosted synthetic validation

Use two approved non-production Auth users and two synthetic workspaces. Test
anonymous, expired, revoked, cross-workspace, multi-workspace selection,
sign-out, and delayed response behavior. Capture sanitized HTTP status and
field-shape evidence. Do not import archive data.

Run a synthetic importer dry-run, then an approved synthetic apply through
`public.reconcile_maim_asset_catalog_manifest`. Confirm a repeat apply is
idempotent and that conflicting stable IDs and Drive reassignment are rejected.
This test must succeed while `maim` remains absent from exposed schemas.

### Rollback

Disable the endpoint route first, then run only after dependency review:

```bash
psql "$APPROVED_MAIM_DATABASE_URL" -v ON_ERROR_STOP=1 \
  -f supabase/rollbacks/202610210002_maim_catalogue_api.rollback.sql
psql "$APPROVED_MAIM_DATABASE_URL" -v ON_ERROR_STOP=1 \
  -f supabase/rollbacks/202610210001_maim_asset_catalogue.rollback.sql
```

Re-run the private schema snapshot comparison. Existing `workspaces`,
`memberships`, `vault_assets`, policies, and data must remain unchanged.

## Remaining gates

- independent security/privacy review;
- PR #52 disposition and review of this follow-up branch;
- explicit migration approval;
- hosted synthetic two-user evidence;
- deliberate protected Studio preview approval;
- separate private catalogue import approval;
- separate production release approval.

No hosted migration, schema allow-list change, private import, or deliberate
deployment was performed for this decision. Pushing the review branch triggered
the repository's automatic Vercel preview `dpl_5ZfozNjQxZA4umhsEJ5CwahbnEAd`.
Provider inspection showed target `preview`, status `Ready`, and the new
`api/catalogue` function alongside the existing checkout/webhook functions. An
unauthenticated request was redirected to Vercel SSO (HTTP 302). This protected
automatic build is not a deliberate Studio deployment, hosted Supabase
connection test, or release approval.
