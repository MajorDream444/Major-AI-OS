# MAIM Creative Studio catalogue preview

Private, review-only UI for the proposed MAIM asset catalogue.

```bash
npm install
npm test
npm run build
```

The default build is live mode and does not fall back to fixtures. The owning
MAIM application must inject `window.__MAIM_STUDIO_SESSION__` with
`getAccessToken()` and an auth-change `subscribe()` callback. Live reads require:

- `VITE_SUPABASE_URL` for project `njpdlomvyalxrkluaige`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- an authenticated user's access token supplied by that session provider

Sanitized fixtures are available only when the build explicitly sets
`VITE_CATALOGUE_MODE=fixture`. A failed live read, sign-out, or revoked
membership clears catalogue records and displays the corresponding access state.

Never put a service-role key in this app. Vercel automatically created an
SSO-protected branch preview for the repository root, but its inspected build
contained only the root API functions—not this Studio app. That automatic
preview is not a deliberate Studio deployment and does not prove a hosted
catalogue connection.

Preview rules:

- unresolved dependencies block previews;
- recovered HTML/JavaScript is source-only and never executed;
- source links are restricted to HTTPS Google Drive/Docs hosts;
- assets remain `unreviewed` unless a separate human approval changes that field.
