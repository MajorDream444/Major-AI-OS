# MAIM hosted E2E runner and protected-preview integration

Status: implementation prepared locally; hosted execution **NOT AUTHORIZED**.

> Historical plan from merged PR #55. The direct-database portions below are superseded by `maim-hosted-e2e-follow-up-2026-10-21.md` and must not be used for hosted execution.
No deployment, hosted secret configuration, synthetic user/data creation,
private import, or Studio release is part of this change.

## Exact target and guards

- Supabase plugin/account: **MAIM ECOSYSTEM**
- Project: `njpdlomvyalxrkluaige`
- Supabase origin: `https://njpdlomvyalxrkluaige.supabase.co`
- Application target: an SSO-protected Vercel **Preview** deployment of the
  `apps/maim-site` owning application containing `/api/catalogue`
- Studio target: the reviewed `apps/maim-creative-studio-catalogue` build wired
  to the owning app's real Supabase Auth client

The hosted runner refuses execution unless the enable flag, exact project ref,
canonical Supabase origin, exact HTTPS preview origin, and exact direct database
host all pass validation before network access. Redirects are refused.

## Preview-only secret names

Configure only after explicit approval, through protected environment settings:

- `SUPABASE_URL` — exact canonical origin
- `SUPABASE_PUBLISHABLE_KEY` — browser-safe publishable key
- `SUPABASE_SERVICE_ROLE_KEY` — runner process only; never browser/Vite
- `MAIM_E2E_DATABASE_URL` — runner process only; exact canonical direct host
- `MAIM_HOSTED_E2E_PROJECT_REF=njpdlomvyalxrkluaige`
- `MAIM_HOSTED_E2E_PREVIEW_ORIGIN` — exact approved preview origin
- `MAIM_HOSTED_E2E_ENABLED=true` — present only for the one-time run
- `VERCEL_AUTOMATION_BYPASS_SECRET` — runner-only protected-preview access

The protected app needs only URL and publishable key. Admin and database
credentials belong only to the one-time server-side runner environment.

## One-time execution mechanism

Use a trusted operator process with Node.js and this repository checkout. Load
credentials from an approved server-side secret environment, never command-line
arguments or chat. Run `npm --prefix apps/maim-creative-studio-catalogue run
e2e:hosted -- run <private-manifest>`. This is a command, not an HTTP controller,
and creates no persistent test endpoint.

The current repository environment supports Node execution, Supabase JS, direct
Postgres TLS, the owning `/api/catalogue` handler, and a disposable Supabase
stack. The disposable validation script executes the new runner against local
Auth, HTTP, PostgREST and Postgres, then invokes idempotent cleanup.

Read-only Vercel plugin inspection confirmed project `major-ai-os`
(`prj_s4qpinxNU7ntgN3LrxoY0xSo0Ane`) uses Node 24.x and has SSO protection on
all non-custom-domain deployments. This supports an SSO-protected branch
preview plus a runner-only automation bypass. No preview was created or
configuration changed during this work.

## Recoverable cleanup

The runner writes an atomic mode-0600 private manifest outside the repository
after each created resource. On ordinary failure, `finally` invokes cleanup.
After interruption, the same manifest drives the idempotent `cleanup` command.
Deletion predicates require the generated user IDs, workspace IDs, asset IDs,
stable IDs, project IDs and order references. Byte versions are deleted only
when their recorded ID has no remaining source-location reference; shared byte
versions and unrelated records are never deleted.

Auth users are removed through Auth Admin. Cleanup is safe to retry and records
its completed state in the private manifest.

## Resumable expiration

The first phase records the actual token expiry and exits. It does not hold a
process open. After the recorded time, the expiration phase submits that exact
short-lived token to `/api/catalogue`, requires HTTP 401, clears the token from
the manifest, and runs cleanup. Until observed, expiration remains **PENDING**.

## Approval boundary

A later single approval may cover the protected preview, preview-only secret
configuration, and synthetic run. It does not authorize private asset import or
Studio release.
