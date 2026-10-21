# MAIM hosted E2E follow-up after merged PR #55

Status: implementation only; hosted execution **PENDING / NOT AUTHORIZED**.

## Findings closed

1. The runner no longer accepts a wildcard `*.vercel.app` target. The checked-in
   production allow-list pins only the exact protected branch alias observed
   through the Vercel plugin; other `vercel.app` hosts are rejected. Validation
   occurs before any network request and redirects remain refused.
2. Browser importer denial sends the publishable key in `apikey` and the user
   JWT only in `Authorization: Bearer`. This reaches the authenticated RPC
   permission boundary rather than failing because the JWT was used as an API
   key.
3. All cleanup identifiers, including stable IDs, Drive IDs, workspace IDs and
   byte-version identities, are persisted before import. Plugin cleanup deletes
   projects by the generated workspace IDs and therefore does not depend on
   discovering project IDs after import. Shared byte versions are retained.
4. Successful reads assert the exact stable identity and one-record count in
   each workspace. Repeat import remains required to report reconciliation.
5. Cleanup success requires plugin-reported global counts to equal the recorded
   pre-run baseline and zero run workspaces/assets before Auth users are removed.

## Plugin-only hosted boundary

Hosted database setup, membership revocation, inspection and cleanup are emitted
as narrowly scoped SQL plans for execution only through the **MAIM ECOSYSTEM**
plugin against `njpdlomvyalxrkluaige`. The runner has no PostgreSQL client or
database-credential setting. Auth administration and protected HTTP requests
remain the application-test boundary; they do not grant direct database access.

The private mode-0600 run manifest remains outside Git. The phases are:

1. `prepare` — create synthetic Auth users and persist every cleanup identity.
2. `plugin-sql setup` — inspect and execute through MAIM ECOSYSTEM; record the
   returned baseline with `record-baseline`.
3. `execute` — import synthetic fixtures and assert Auth → HTTP → RLS results.
4. `plugin-sql revoke` — execute through MAIM ECOSYSTEM, then run `revoked`.
5. `expiration` — resume only after the recorded real token expiry.
6. `plugin-sql cleanup` — execute through MAIM ECOSYSTEM; record returned counts
   with `record-cleanup`; only an exact baseline match permits `cleanup-auth`.

The SQL generator is idempotent at the cleanup boundary and is safe if the
runner is interrupted immediately after an import. It never deletes unrelated
records or a byte version still referenced by a source location.

## Deployment and authorization status

No protected preview was deployed or configured by this change. No hosted
secrets, users, workspaces, catalogue records or private assets were created.
An automatic branch preview was observed as READY at deployment
`dpl_P5Cy1KHnktowRLZ5wiCvfjabB28k`; its exact protected branch alias is pinned.
This provider-created preview is not a deliberate deployment or release and was
not accessed or configured during this work. Studio release and
private archive import remain unauthorized.

## Disposable evidence

Validated against disposable Supabase Auth, PostgREST and PostgreSQL with the
actual `/api/catalogue` HTTP handler. The local harness executed the generated
plugin SQL contract against disposable PostgreSQL only. Results:

- runner/core unit tests: 19 passed;
- owning-app tests: 13 passed;
- importer tests: 6 passed;
- full disposable Auth → HTTP → RPC → RLS → Studio path: passed;
- plugin-boundary setup/revoke/cleanup contract: passed;
- repeat import reconciled one record with no duplicate;
- cleanup restored recorded catalogue counts and left zero run workspaces/assets.

This is disposable evidence only and does not claim hosted execution.
