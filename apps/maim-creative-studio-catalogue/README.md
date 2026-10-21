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
