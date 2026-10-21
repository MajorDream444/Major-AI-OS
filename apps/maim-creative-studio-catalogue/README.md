# MAIM Creative Studio catalogue preview

Private, review-only UI for the proposed MAIM asset catalogue.

```bash
npm install
npm test
npm run build
```

The default build is live mode and does not fall back to fixtures. The owning
MAIM application must inject `window.__MAIM_STUDIO_SESSION__` with
`getSession()` and an auth-change `subscribe()` callback. Each session carries
the user access token and owning workspace ID. `createSupabaseSessionProvider()`
adapts the owning application's existing Supabase Auth client. Live reads require:

- `VITE_CATALOGUE_API_URL` when the owning application's route is not
  `/api/catalogue`
- an authenticated user's access token supplied by that session provider
- the owning workspace ID supplied by the same trusted application context

Sanitized fixtures are available only when the build explicitly sets
`VITE_CATALOGUE_MODE=fixture`. A failed live read, sign-out, or revoked
membership clears catalogue records and displays the corresponding access state.
The server validates the session and workspace membership before returning the
selected workspace's allow-listed catalogue projection. The browser does not
receive a Supabase project key or call the private `maim` schema directly.
The endpoint must resolve to the Studio's own origin. HTTPS is required except
for an explicit loopback-only local test setting, and redirects are refused
before the bearer token can be forwarded.

Never put a service-role key in this app. Vercel automatically created an
SSO-protected branch preview using the Vercel project's configured
`apps/maim-site` root directory, but its inspected outputs contained only that
site's existing API functions—not this Studio app. That automatic
preview is not a deliberate Studio deployment and does not prove a hosted
catalogue connection.

Preview rules:

- unresolved dependencies block previews;
- recovered HTML/JavaScript is source-only and never executed;
- source links are restricted to HTTPS Google Drive/Docs hosts;
- assets remain `unreviewed` unless a separate human approval changes that field.

## Protected-preview hosted E2E package

The owning app may provide public browser configuration before Studio startup:

```js
window.__MAIM_STUDIO_AUTH_CONFIG__ = {
  supabaseUrl: 'https://njpdlomvyalxrkluaige.supabase.co',
  publishableKey: '<preview publishable key>',
  workspaceId: '<selected workspace UUID>'
}
```

The bootstrap accepts only the exact canonical Supabase origin. It creates the
normal Supabase browser Auth client and installs the existing stale-response-safe
session provider. The server still validates the JWT and workspace membership;
the browser-selected workspace is not an authorization boundary. Never include
an admin or service-role credential in this object.

A one-time server-side runner is prepared but must not run without separate
approval:

```bash
npm run e2e:hosted -- run /absolute/private/path/run.json
npm run e2e:hosted -- expiration /absolute/private/path/run.json
npm run e2e:hosted -- cleanup /absolute/private/path/run.json
```

`run` records the issued token's actual expiry and exits with
`expiration_pending`. Run `expiration` only after that time; it verifies the
real expired token receives 401 and then cleans up. `cleanup` is idempotent and
may be used after interruption. The private manifest must be outside the repo
and is written mode 0600. It contains a short-lived bearer token until the
expiration phase completes, so it must never be committed, uploaded, or pasted
into chat.
