# MAIM database consolidation — owner decision, 20 October 2026

## Decision
Use MAIM Ecosystem (njpdlomvyalxrkluaige, us-east-1) as the primary Supabase project for current MAIM ecosystem builds. Major explicitly chose consolidation over spreading across accounts; additional capacity can be purchased later when needed. Separate repositories, applications and product permissions remain intact. A connector is an account authorization, not a database or an application boundary.

Five connector links expose eight distinct projects; the STB and legacy Supabase links expose the same project. See supabase/project-inventory.json. Observations are a point-in-time inventory, not continuous monitoring.

## Verified existing foundation
The canonical project is ACTIVE_HEALTHY. Its public schema is empty, but its private maim schema already has nine RLS-enabled tables: customers, entitlements, memberships, orders, refunds, reports, vault_assets, webhook_events and workspaces. An earlier public-only check did not mean the database was blank.

The Vercel-managed organization contains the active legacy project fsrskmlsxqtxduhdfhnd and inactive jhoehbqzlyflfzmigfwn. Major-AI-OS/supabase/migrations/0001_registrations.sql explicitly targets fsrskmlsxqtxduhdfhnd; its public.registrations exists with RLS. Historical comments mention Kit, which is retired under current ecosystem direction. This is evidence of a legacy dependency, not proof the current production runtime still uses it.

No production Vercel URL, key, DNS or account integration was switched. Changing one environment URL does not migrate data, authentication, storage, policies or webhooks.

## Applied now
Migration maim_canonical_application_registry added only maim_ops.application_registry in the canonical project. Five records designate the canonical target for Major-AI-OS, MAIMACADEMY, amasolagi-site, STB-practitioner-business-os and optionality. Only maim has an existing verified data schema. Other schema fields remain null until implemented; all runtime_verified fields remain false.

Post-write verification confirms five records, RLS enabled, no schema usage or table SELECT privilege for anon, authenticated or service_role, and all nine existing maim tables preserved. No learner/client/payment sample data was inserted.

Security advisor reports INFO-level RLS-without-policy notices for the intentionally administrative registry and three existing maim tables (refunds, vault_assets, webhook_events). Registry denial is intentional; do not add permissive policies to suppress the notice. Existing table policies remain untouched.
Reference: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy

## Application setup contract
- New work targets njpdlomvyalxrkluaige and the MAIM ECOSYSTEM connection.
- Each application owns versioned migrations, restricted runtime credentials and explicit member/client scopes. Sharing a database grants no cross-product entitlement.
- Use private schemas for server-only tables and enable RLS. Never expose administrative keys in browsers.
- Reconcile Academy's draft Better Auth identity/grants with the existing maim schema's Supabase auth.users references before applying its draft SQL. Do not create a second entitlement source accidentally.
- Academy's hosted sign-in, progress, payment and reservation tests remain pending. Its 26 local checks do not prove hosted integration.
- Preserve current application env variable names; record the canonical target in repository binding metadata before a tested cutover.
- Keep old projects/data intact until exports, dependency checks, rollback and destination verification are complete.

## Availability and cost
Six projects are inactive. A restore attempt on gacdrenzgqptxzvnmvxd was rejected because MajorDream444 reached the two-active-free-project limit. After the consolidation instruction, further restore attempts were stopped. No billing, plan changes, deletions or pauses were performed.

Blank versus populated tables does not determine guaranteed availability. Free projects can pause for low database activity over seven days; paid plans prevent inactivity pausing. Routine health checks can detect availability but do not guarantee prevention. No fake records or traffic generator was installed.
Reference: https://supabase.com/docs/guides/platform/free-project-pausing

Daily ChatGPT monitoring creation failed because the current plan already has five scheduled tasks. No existing task was replaced. Monitoring remains unscheduled.

## Next build and cutover gates
1. Map current production env targets and authentication/storage/webhook dependencies without logging values.
2. Reconcile identity and entitlement ownership; implement Academy's isolated permissions within the canonical project.
3. Test two-user isolation, expired/revoked access, event replay/refunds, booking concurrency and the 20-seat cohort limit.
4. Export/check legacy registrations and migrate only after a reviewed destination schema, data mapping and rollback exist.
5. Verify a preview on the canonical database, then request production cutover approval.
6. Review paid capacity only when actual availability/usage needs justify it. No upgrade is authorized by this record.

## Copy and paste — Codex implementation
Use MAIM Ecosystem njpdlomvyalxrkluaige as the canonical Supabase target. Read this record and the repository binding metadata. Preserve the nine existing maim tables and production dependencies. Audit current env target refs without printing credentials. Reconcile Academy auth and entitlements before schema application; keep product/client scopes explicit. Work on an isolated branch, test against preview, and report migration, commit, tests and unresolved blockers. Do not change billing, delete/pause old projects, merge production or activate payments.

## Copy and paste — Cowork operations
Read the canonical database consolidation record in Major-AI-OS and the project inventory. Report verified active/inactive status separately from proposed application bindings. Focus operational work on MAIM Ecosystem njpdlomvyalxrkluaige. Do not reactivate legacy projects or claim monitoring is installed. Record missing configuration and hand implementation tasks back to Codex with repository and exact project reference.

## Rollback
The registry is administrative metadata only and is not used by runtime apps. Remove only its five owner-approved records/schema after confirming no later consumer depends on it; never use a cascade rollback on application data. Git changes can be reverted independently of the recorded hosted migration.
