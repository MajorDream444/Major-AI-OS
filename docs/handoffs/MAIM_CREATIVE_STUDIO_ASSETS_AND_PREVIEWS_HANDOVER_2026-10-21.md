# MAIM Creative Studio, assets and preview consolidation handover

Date: 21 October 2026 (Asia/Makassar).
Audience: Major Dream Williams and the lead ecosystem agent.
Controlling repository: MajorDream444/Major-AI-OS.

## Outcome and immediate state

The goal is a reusable MAIM creative agency: preserve Claude Design work, establish consistent branding, give creative agents reliable assets/context, and connect a searchable Creative Studio to Academy, production and marketing.

Original-source recovery and private Drive ingestion are complete per the ingestion receipt. Catalogue code and its security follow-ups are merged. The two catalogue migrations are applied through the MAIM ECOSYSTEM plugin. The hosted catalogue is empty. Hosted synthetic Auth/HTTP validation, private archive import and deliberate Studio release remain pending.

Major now wants the lead agent to organize remaining Vercel previews and decide which work is ready to merge or promote. This handover requests that assessment; it does not authorize blanket merging or production promotion.

Fresh checks during this handover:
- PR #54 is merged: 86ca5ab9336d815bb73470cf76d741bea4b05448.
- PR #55 is merged: b07108e76450e1b109f17b5a5d13102c0a6adb22.
- PR #56 is merged: bb54780202a0c0f54c9fc9469a78c56b52222bcf; reviewed head 6df651c331d91dddf1863bfa29a413b9f11f3d19.
- Hosted ledger has the five expected entries.
- Hosted counts: assets 0, projects 0, source locations 0, dependencies 0.
Other deployment observations below are historical reports and require fresh provider inspection.

## Operating authority: plugins and account routing

Use connected plugins for hosted operations. Do not request Supabase CLI login/link/push/dry-run, use the retired account, or introduce hosted direct-Postgres credentials.

Three account boundaries: MAIM, AMA, Major Dream.
- All MAIM work: MAIM ECOSYSTEM plugin, project njpdlomvyalxrkluaige.
- AMA: AMA account.
- Major Dream: Major Dream account.
Verify exact bindings for the latter two before operating; do not infer them from generic connector names.

Read docs/decisions/MAIM_DATABASE_CONSOLIDATION_2026-10-20.md, including owner update abc9977. Historical CLI material is superseded, not an active gate. Local test commands are evidence of disposable validation, not a hosted CLI requirement.

## Storage and ownership

| System | Role |
| --- | --- |
| Major Dream Systems Google Drive | Original files, editable bundles and private provenance |
| MAIM Ecosystem Supabase | Workspace-scoped catalogue, versions, source locations, projects and dependencies |
| GitHub | Code, skills, contracts, brand rules and sanitized evidence |
| Creative Studio | Search and production interface; integration/release status must be verified |

Drive originals retain filenames and project-relative paths, including a directory named exactly two spaces followed by assets. Repairs belong in working copies. SHA equality proves byte identity, not approval, recency or canonical authority. Recovered assets remain unreviewed unless separately approved. No private local paths, manifests, credentials or raw private media belong in public Git.

Drive archive and provenance locators remain in the owner's private ingestion receipt/context; do not replicate the complete private registry in public documentation.

## Recovery and ingestion baseline

Reported local inventory:
- 927 initial candidates: 118 confirmed Claude Design sources, 80 context files, 729 possible matches.
- 705 locally available files hashed, 222 initially cloud-only, 66 exact duplicate groups.
- 12 ZIPs inspected in place; originals not executed or modified.
- 17 priority cloud files hydrated and inspected, moving the grouped total to 135 confirmed sources plus 80 context files; 712 possible matches remain.
- 16 complete/standalone editable candidates.

Final ingestion receipt: INGESTION-RECEIPT-FINAL.md in private Drive provenance.
- 163 selected originals attempted; 162 uploaded.
- 162 originals / 193,730,203 bytes downloaded and SHA-256 verified; zero mismatches.
- 22 provenance files verified before the final receipt itself. Do not claim all 23 were reverified.
- One zero-byte img2.png placeholder failed upload and remains a documented exception.
- Existing MAIM ABC's export location preserved and linked as another source location.

Dependency gates remain on spark_lab_bali.html, nil_spark_lab.html, Volume I Media Design System, MAIM 08 crown-coin.png, One Crown 2 external CDN dependencies, and the intentional YOUR_TYPEFORM_QUIZ_URL configuration placeholder. Affected executable previews remain blocked; complete bundles can be reviewed independently.

Project organization follows MAIM 00–09 plus Shared Context/Routing Review. Do not hydrate or import the remaining review queue indiscriminately.

## Delivered architecture and code

Primary paths:
- apps/maim-creative-studio-catalogue/
- apps/maim-site/api/catalogue.ts
- apps/maim-site/lib/catalogue.ts
- scripts/import_maim_asset_manifest.py
- supabase/migrations/
- supabase/rollbacks/
- supabase/legacy/registrations/
- supabase/MIGRATION_STREAMS.md
- docs/architecture/maim-asset-catalogue.md

Catalogue separates assets, SHA byte versions, source locations, workspace projects/memberships and dependencies. Approval, completeness and integrity are independent. Existing maim.vault_assets and foundation permissions were preserved.

Reads: Studio → same-origin /api/catalogue → Auth validation → public.get_maim_asset_catalogue(uuid) using the same user JWT → membership/RLS-backed private view. Selected workspace is explicitly scoped; stale responses cannot repopulate a switched or signed-out view.

Imports: service-only public.reconcile_maim_asset_catalog_manifest → private canonical reconciliation. Exact destination checks and redirect refusal protect credentials. Drive source IDs cannot move to different stable assets.

Neither bridge requires adding maim to PostgREST's exposed schemas. Hosted maim exposure was inconclusive; do not broaden it to solve this.

Recovered HTML/JS is source-only, never executed in the Studio origin. Real-session bootstrap is implemented, but implementation is not proof of deployed sign-in/UI behavior.

Six saved creative skills: brand asset steward, creative workflow orchestrator, layered cover builder, marketing asset packager, motion graphics producer, storyboard continuity director. Their existence does not mean generation/rendering/marketing automation is connected.

## Hosted migrations: complete, do not reapply

Receipt: docs/evidence/maim-catalogue-hosted-migration-2026-10-21.md
Receipt commit: 9a2975750e673efb237f46d4e4dc4b029c8040b3.

| Source | SHA-256 | Hosted ledger version |
| --- | --- | --- |
| 202610210001_maim_asset_catalogue.sql | 99c0fb9ad1b04d63cc3901f93191617d5ff9c8df91d8b014c64f6a0ea65b2055 | 20261021123131 |
| 202610210002_maim_catalogue_api.sql | 920edf3fbcb90324172c831d1784f5b16506dfc043e7959e40296f003f311499 | 20261021123147 |

Earlier hosted versions: 20261014043844, 20261014043909, 20261020030402. Plugin assigns application timestamps. Do not reapply source SQL or rewrite the hosted ledger to force filename equality.

Post-apply checks verified six RLS tables, six SELECT policies, security-invoker view/public bridges, fixed function search paths, no anonymous reads/browser writes, and service-only import execution. Foundation ACLs/RLS remained unchanged. Four pre-existing INFO advisor notices remain on foundation tables with RLS but no policies; no new catalogue notice was reported.

## PR and review chain

| PR | Delivered scope | Disposition |
| --- | --- | --- |
| #50 | Catalogue model, importer, private Studio proof; origin and source-reassignment fixes | Merged b848256 |
| #51 | Disposable Auth/PostgREST validation and session adapter | Merged 3ab82d9 |
| #52 | Selected-workspace isolation and delayed-switch protection | Merged fe73584 |
| #53 | Narrow public bridges, same-origin endpoint, HTTP E2E, migration stream reconciliation | Merged 636623d |
| #54 | Plugin-only runbooks and preflight | Merged; freshly checked |
| #55 | Hosted runner/session bootstrap | Merged; original direct-DB plan superseded |
| #56 | Exact preview pinning, proper RPC denial test, plugin database plans, recoverable partial-Auth cleanup | Merged; freshly checked |

Do not reopen review of fixed findings without new evidence. Local/disposable suites passed per committed evidence; this handover did not rerun them.

## Vercel: distinguish preview, merge and release

A GitHub PR merge and a Vercel deployment promotion are different operations. A READY deployment proves a build completed, not authentication, database connectivity or Studio availability.

Historical provider observations in this thread:
- Configured major-ai-os project root is apps/maim-site, not the standalone Studio.
- Early previews built checkout and Stripe webhook functions only.
- Later previews also built api/catalogue.
- The #51 merge triggered production deployment dpl_3e7e9rNf1WcEJhTV8njHNy1J4WvS; /studio and /creative-studio returned 404 at that observation.
- #55 automatic preview: dpl_A79sKuNQC64ntJcxcBe6XwtY6AKa.
- #56 automatic preview initially observed: dpl_P5Cy1KHnktowRLZ5wiCvfjabB28k.
- Runner pins https://major-ai-os-git-codex-maim-hosted-e2e-hardening-hamal-agi.vercel.app. Verify its current deployment/head/protection before using it; branch aliases can move.
- Protected previews were reported as Vercel SSO-protected. Current protection and secret scope require fresh inspection.

Earlier standalone Sites prototype: https://maim-creative-studio.majoraimindset.chatgpt.site. It was a private prototype with local browser state, workspace backup import/export, skill briefs and animated sections. Do not confuse that prototype with the new hosted catalogue or imply it uses shared storage.

The user wants engaging motion: scrollytelling, pinned/sticky sections and a moving 3D “from spark to a signature” concept, with reduced-motion/pause/mobile behavior. The design studio is a separate application with an Academy doorway. Do not replace functioning production pages merely because a preview looks newer.

## Hosted synthetic runner: next operational gate

Read docs/evidence/maim-hosted-e2e-follow-up-2026-10-21.md and current runner code. PR #55's direct-database instructions are historical and superseded.

Current phases:
1. Prepare private run manifest, planned emails and generated identities.
2. Capture plugin baseline BEFORE Auth creation; record exactly four counts.
3. Create/reconcile synthetic Auth users by exact planned email plus run ID.
4. Execute reviewed setup SQL through MAIM ECOSYSTEM plugin; acknowledge setup.
5. Run actual sign-in/import/HTTP authorization tests; assert asset identities/counts.
6. Revoke membership through plugin and test denial.
7. Resume expiration only after issued token's real expiry; require HTTP 401.
8. Execute plugin cleanup; require exactly six cleanup counts, restored baseline and zero run rows.
9. Delete/reconcile zero, one or two synthetic Auth users; clear private secrets.

No hosted test has been authorized or executed in this thread. Protected preview configuration, Auth/HTTP test boundary and one-time synthetic execution need a concrete owner decision. Database operations remain plugin-only. Do not request tokens/passwords in chat. Private import and Studio release are separate decisions.

Disposable evidence includes Auth → actual HTTP handler → RPC → RLS, repeat imports, rollback, cross-workspace/multi-workspace tests, sign-out/stale response handling, first-user interruption recovery and incomplete-count rejection. Real hosted token expiration is still pending.

## Lead agent: action order

1. Read this handover, the owner decision and hosted migration receipt; refresh current main and PR states using plugins.
2. Inventory relevant Vercel deployments across MAIM apps. For each record: project/root, environment, branch, commit, PR/merge state, protection, current production deployment, secrets readiness (names only), tested routes and concrete blocker.
3. Present a compact decision table: already merged, ready for code review, ready for protected testing, blocked, superseded. Do not treat all previews as unmerged work.
4. Confirm #56 code is included in the selected test build and pin the exact deployment that will receive credentials.
5. Present one concrete approval scope for preview-only setup and the synthetic test; then execute/clean up when authorized.
6. After hosted test evidence, prepare the private archive import dry-run using verified private manifests. Do not import without authorization.
7. Integrate and test the actual Studio UI and Drive access; prepare a separate release decision and rollback.
8. Keep Academy, production OS, legacy media and HAMAL context synchronized through pointers, not copies of private registries.

Other ecosystem repositories in scope for context: MAIMACADEMY, MAIM-PRODUCTION-OS, MAIM-Legacy-Media-Studio, HAMAL_MOB_PLAYBOOKS; design tooling references open-design and Open-AI-Design-Agent. Older cross-repo context PRs were not freshly audited here; check their current state rather than assume merged.

## Copy/paste to lead agent

Read docs/handoffs/MAIM_CREATIVE_STUDIO_ASSETS_AND_PREVIEWS_HANDOVER_2026-10-21.md in MajorDream444/Major-AI-OS. Start with a plugin-backed inventory of MAIM Vercel previews and their actual code/merge/deployment states. All MAIM Supabase work uses MAIM ECOSYSTEM project njpdlomvyalxrkluaige; no hosted CLI/direct-DB fallback. Catalogue migrations are already applied and the catalogue is empty. PRs #54–#56 are merged. Identify what is ready for protected testing or promotion, and give Major a concrete decision table. Do not duplicate migrations, import private assets, configure secrets, create synthetic hosted data, merge unrelated work or promote production merely from this handover. Continue reversible/read-only preparation independently.
