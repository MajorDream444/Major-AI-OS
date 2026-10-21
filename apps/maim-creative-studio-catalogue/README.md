# MAIM Creative Studio catalogue preview

Private, review-only UI for the proposed MAIM asset catalogue.

```bash
npm install
npm test
npm run build
```

The default build uses sanitized fixtures. Live reads require:

- `VITE_SUPABASE_URL` for project `njpdlomvyalxrkluaige`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- an authenticated user's access token supplied by the owning host application

Never put a service-role key in this app. The current preview is not deployed and does not prove a hosted connection.

Preview rules:

- unresolved dependencies block previews;
- recovered HTML/JavaScript is source-only and never executed;
- source links are restricted to HTTPS Google Drive/Docs hosts;
- assets remain `unreviewed` unless a separate human approval changes that field.
