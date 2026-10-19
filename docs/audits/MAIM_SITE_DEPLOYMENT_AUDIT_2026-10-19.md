# MAIM website and deployment audit — 19 October 2026

Status: informational site reachable; remediation and commerce HOLD. Snapshot in Asia/Makassar. Audit only: no checkout enablement, provider-setting changes, submissions, payments, emails, branch merges or production deployment commands.

## Authority and approval

Read the current canonical source map, launch and retired-platform directives, October 15 context reconciliation, October 17 live-release handover, app README/checklist, brand doctrine and current code. Historical October 15 PR/provider observations are not current verification. No root Graphify report/wiki was present in the audited main checkout. Nested unrelated workspaces were excluded.

Founder approved the service and terms in the October 19 instruction, conditional on MAIM branding/colors. Previously approved policies remain: free rescheduling with 24 hours' notice; one courtesy rebooking; delivery within five business days after review and required inputs; full refund before preparation; customer-agreed deductions afterward. This is recorded approval context, not evidence that branding conditions, final privacy, exact published legal version, TEST verification, merge or payment activation gates have passed. Preserve historical versions and client-private/platform boundaries.

## Deployment and Git reconciliation — VERIFIED

Main HEAD and production both equal `8ef0c685b92da47a3c5c1fa2fefcdc5afc7f6cac`. GitHub was fetched directly. The existing user checkout is on another branch with unrelated untracked work; audit uses an isolated branch from current main.

| System | Exact deployed SHA | Provider evidence |
| --- | --- | --- |
| major-ai-os | `8ef0c685b92da47a3c5c1fa2fefcdc5afc7f6cac` | `dpl_3nv2rqVyvNi7iFtCwd1hmqwv38Hg`, production READY, Git source main, apex and www aliases, no alias error |
| maim-10-pillars | `60f314e158824d7cf6e494ea234bd6ea41afbc21` | `dpl_DSnZC19aCVS9hhg3yUm1kso7kkZp`, production READY, custom domain pillars.majoraimindset.com; GitHub main matches |
| business-pressure-test | `699a3e52fd718c36fbaca720ba8619065f64ee88` | Public alias resolves to production READY `dpl_7qFshkgDTJNwQna5wh6wHLacm3ZY`; project overview instead lists a newer staging deployment `dpl_7AVAUr7dnmuEuxdezWGudGmbwxrH`. Repository is business-pressure-test-scratch-off |

Direct Vercel project and hostname deployment records were inspected; deployment region shown is iad1. This does not prove all provider storage is US-only. Generated Vercel aliases have SSO protection; custom domains were used for public QA.

| PR | State / merged UTC | Merge SHA |
| --- | --- | --- |
| #33 campus/philosophy | MERGED / Oct 16 04:13 | `a9f0ce5dc5f2eb434f56ed9502791352832f263f` |
| #38 commerce | MERGED / Oct 16 05:07 | `40e955f6544a036b799b9d0d9e8fa816998beb53` |
| #40 terms/safeguards | MERGED / Oct 17 03:22 | `912d6c4f790f466f52d11e68687e269f41410c0a` |
| #42 typography | MERGED / Oct 17 11:24 | `80f51a3f576a56e54ffd9fb3c0dea9fc0d0756af` |

Follow-up work below is new remediation against merged code; do not reopen or remerge superseded branches.

## Public route and navigation QA

Actual anonymous GET checks followed redirects. Chromium rendered nine main-site pages at 1440px and 390px widths, plus Ten Pillars, Pressure Test landing and terms at 390px. No form submission or payment action was performed.

| Routes / journey | Actual result |
| --- | --- |
| /, /campus, /shop, /library, /vault, /coaching, /pillars | HTTP 200, expected titles and browser rendering |
| Blueprint | Offer exists at /shop#blueprint; $250 USD; availability API HTTP 200 with `available:false`. No dedicated /blueprint route is promised or verified |
| /shop/pillar-scroll | HTTP 200; not evidence of paid digital fulfillment readiness |
| /return, /checkout/return | HTTP 200; presentation only, no purchase/entitlement inferred |
| /10-pillars and /thank-you | Resolve to /pillars and /return respectively |
| /terms, /privacy | HTTP 200, approval-candidate copy |
| Terms draft.1, terms .1, privacy .1 immutable routes | HTTP 200 |
| Terms .2 clean immutable route | **404**; generated .html equivalent returns 200. Missing vercel.json rewrite, despite /terms displaying .2 |
| Main-site navigation/footer destinations | Extracted href destinations across tested HTML all reachable, including guide PDF and YouTube watch URL; mailto/tel delivery not tested. Google font preconnect roots return 404 when requested as pages, which is not a navigation defect; actual font CSS returns 200 |
| Ten Pillars | Homepage, /series/, all ten pillar detail paths and linked local assets HTTP 200; return-to-MAIM link exists. Book/content accuracy and full-series grandchildren were not reviewed |
| Business Pressure Test | Landing HTTP 200, mobile width 390/390; questionnaire completion, persisted result, email and CTA runtime destinations unverified |

Anchor existence and every interactive state were not exhaustively tested; fetched path success is not a click/functional pass. No authenticated vault access, real-device/Safari/Android testing, screen-reader audit, inbox or appointment test was performed.

## Visual, mobile and brand QA

| Page | Minimum sampled visible text size | Mobile document width at 390px |
| --- | --- | --- |
| Home | 11px | **522px** |
| Campus | 16px | 390px |
| Shop | 13px | 390px |
| Library / vault / coaching | 16px | 390px |
| Pillars funnel | 11px | 390px |
| Terms / privacy | 12px | 390px |

Desktop document width was 1440px on all nine sampled pages. Minimum-size sampling includes labels and hidden-by-CSS exclusions; it is not a claim that all body copy is that size. Homepage overflow is directly attributable to `.footer-links` extending to approximately 522.6px, clipping The 10 Pillars/Studio links. Terms table scrolls inside its container without document overflow.

Visual inspection confirms the gold MD medallion, real founder portrait, gold/green/blue identity and the founder quote before the homepage footer. The quote also appears on campus. The homepage is predominantly cream/editorial whereas legal pages use dark backgrounds, Georgia/Arial and a text wordmark; exact brand-token conformity is incomplete. Legal source uses colors such as #d0a03c and #111315 versus canonical Crown Gold #D8AF55 and charcoal #111111. Founder approval's branding condition needs explicit resolution; this audit changes no legal copy.

Computed solid-color contrast samples on home: gold rgb(201,147,26) against rgb(245,242,236) is 2.45:1, below even the 3:1 large-text threshold; 12px gold step labels against rgb(235,231,224) are 2.22:1. Green/blue large headline samples are about 3.92/3.95:1, sufficient for large text, not a failure merely because below 4.5. These are selected measurements, not full WCAG certification; transparency/images/gradients need dedicated checking.

Browser console reproduced CSP blocking Iconify data requests to api.iconify.design and fallback hosts on /shop. Prefer bundled icons or a reviewed narrow policy correction, not broad CSP relaxation. Screenshot captures were inspected locally; browser profiles/logs and machine paths are intentionally excluded from Git.

## Commerce configuration and release gates

Read current checkout, webhook, provider and fulfillment code plus `.env.example`. Fresh production GET /api/checkout returns `available:false`. No POST was sent. Vercel environment metadata was inspected with decryption disabled; no values were printed or changed. Presence does not establish validity, mode or permissions.

| Configuration | Observed metadata / readiness |
| --- | --- |
| STRIPE_RESTRICTED_KEY | Present in Preview and Production; TEST mode/permissions not runtime validated |
| STRIPE_WEBHOOK_SECRET, STRIPE_MODE, STRIPE_BLUEPRINT_PRICE_ID | Present only on designated TEST Preview branch codex/maim-owned-commerce-sprint-v2 |
| AIRTABLE_PAT, RESEND_API_KEY | Present in both environments; no database writes or email API calls performed |
| AIRTABLE_BASE_ID, AIRTABLE_ORDERS_TABLE_ID, AIRTABLE_CONTACTS_TABLE_ID, RESEND_FROM_EMAIL, APP_ORIGIN, SUPPORT_EMAIL, BLUEPRINT_BOOKING_URL | Configured on designated TEST branch, absent at Production scope in returned metadata |
| ENABLE_BLUEPRINT_CHECKOUT, CHECKOUT_TERMS_APPROVED | Present for Production and designated TEST branch. Values were not decrypted; runtime unavailability is verified independently |
| CHECKOUT_TERMS_URL, CHECKOUT_AGREEMENT_VERSION | **Absent** from returned scopes; exact approved immutable document capture not configured |
| STRIPE_SECRET_KEY | Present Production but code reads STRIPE_RESTRICTED_KEY; do not mistake the unused variable for a verified live setup |

`npm ci --ignore-scripts`, `npm run check`, and `npm audit --audit-level=high` pass: TypeScript; 7/7 commerce tests; 16 static pages / 10 indexed; zero reported vulnerabilities. Actual local interpreter Python 3.14.4; repository pin is 3.12. This run does not reverify the production interpreter. Tests cover fail-closed readiness, amount/environment validation, origin restriction, identifier suffix, durable paid-order preservation before invalid booking, repair/retry, duplicate email/order behavior, and terminal refund. No integration tests against live providers were run.

Remaining checklist, all required before commerce GO:

- [ ] Resolve conditional branding approval and working immutable terms .2 URL; preserve historical sources.
- [ ] Correct-account recording tool/media, consent/decline, storage/access, retention/deletion and training/reuse evidence; final privacy notice and legal/address review.
- [ ] Preview exact terms URL/version and Stripe TEST hosted-terms link match; restricted TEST credentials/permissions verified.
- [ ] Validate required Airtable schema/table bindings and transactional sender/reply-to against actual accounts.
- [ ] Create fresh Checkout through MAIM API only in approved TEST environment; human completes TEST payment.
- [ ] Prove signed webhook, durable order/agreement evidence, Resend acceptance AND inbox receipt, valid booking/timezone/support/return, duplicate/retry and refund/revocation.
- [ ] Independent review of evidence and explicit separate production activation decision.

Current provider dashboards for Stripe webhook state, Airtable table contents and Resend domain/inbox were not independently queried in this audit. The October 17 handover reports zero live webhooks; that historical count must be refreshed, not asserted current. No real/live transaction was authorized or attempted. Pillar Scroll remains a separate protected-delivery gate.

## Retired providers and funnel handoff

No Gumroad, Kit/ConvertKit or Shopify destination URLs were found in the fetched main-site routes. Main registration area is currently a first-party free PDF download stating no registration required, despite Reserve Seat wording. Dormant legacy capture code/comments remain in the homepage source; no actual current signup/email flow is proven. Provider account closure/billing is unverified.

**Ecosystem-wide retirement is NOT complete.** Read the Pressure Test source at its exact deployed SHA: src/App.tsx still routes the playbook CTA through `VITE_GUMROAD_URL` (fallback #) and call CTA through `VITE_CALENDLY_URL` (fallback #). Main-site inspected navigation does not offer a Pressure Test link; its landing has no MAIM return link. Source navigates to results without awaiting successful /api/submit persistence. Its API logs full submission payloads/business answers and names/emails; results email is fire-and-forget and can fall back to onboarding@resend.dev. These are verified source risks; actual configured CTA URLs and end-to-end behavior remain unverified because the questionnaire was not submitted. Inspect and remediate in business-pressure-test-scratch-off, not unrelated client systems. Do not reproduce its tracked .env.local contents.

## Prioritized blocker register

| Priority / ID | Blocker | Owner / acceptance |
| --- | --- | --- |
| P0 COM-01 | No app-created TEST journey evidence; incomplete terms URL/version configuration | Codex + independent Claude Code reviewer: complete the checklist above without live payments |
| P0 PRIV-01 | Correct-account recording/privacy evidence and final notice pending | Cowork + owner/legal: verified handoff and reviewed immutable notice; no placeholder claims |
| P1 LEG-01 | Terms .2 immutable clean URL 404 | Site engineer: add specific rewrite, preserve .1 sources, verify HTTP 200/version/noindex and TEST terms linkage |
| P1 UX-01 | Homepage footer overflow and gold contrast failures | Site engineer: 390px no document overflow; text contrast meets applicable normal/large thresholds; retain authentic MAIM mark/colors |
| P1 FUN-01 | Pressure Test Gumroad/booking fallbacks, silent persistence failure, full payload logging, missing coherent MAIM handoff | Funnel engineer in owning repo: remove retired CTA, use approved owned destination, truthful persistence/error feedback, redacted logs and verified MAIM return |
| P1 BR-01 | Conditional branding approval not yet resolved across legal pages | Owner/design reviewer: token/mark review, exact version approval; do not alter already approved immutable content in place |
| P2 UI-01 | Shop CSP blocks icon data requests | Site engineer: local icons or narrow tested policy; clean console |
| P2 DOC-01 | App README still instructs Kit/Gumroad; canonical source map says Airtable unwired; daily status stale | Documentation owner: reconcile against this audit while retaining historical provenance |
| P2 CONTENT-01 | Pillar Scroll delivery, Ten Pillars book claims, Reserve Seat vs download intent unverified | Cowork/content owner: catalog/rights and truthful CTA review; no paid asset publication inferred |

## Dependency-based proposed schedule

Estimates begin only when their prerequisites and assigned owner availability exist; no deployment/activation is authorized by these dates.

| Window (Asia/Makassar) | Dependency / work | GO criteria / HOLD |
| --- | --- | --- |
| Oct 19–20, 0.5–1 engineering day | LEG-01, UX-01, UI-01 and DOC-01 fixes/review | Informational-site QA GO after immutable route, mobile, contrast and console evidence; existing site can remain informational meanwhile |
| Oct 19 onward, external owner dependency | PRIV-01 and BR-01 | No fixed completion promise: correct-account facts, approved exact legal versions and current-address caveat resolved |
| Oct 21–22 target, 0.5–1 day AFTER legal/config readiness | Preview configuration, Stripe TEST hosted terms, app-created purchase and fulfillment/retry/refund QA | Commerce stays HOLD until provider and inbox evidence passes |
| Oct 23–24 target, parallel funnel/content work | FUN-01 and CONTENT-01, independently reviewed | Funnel GO only after truthful owned handoff and safe persistence; paid digital products stay separately gated |
| Oct 25–26 conditional decision window | All relevant evidence reviewed independently | Explicit owner GO for a specific offer and separate production action; any failed payment/privacy/delivery gate means HOLD, not automatic date-based release |

## Copy-and-paste next tasks

**Site coding agent:** On a clean branch from current Major-AI-OS main, fix LEG-01, UX-01 and UI-01. Add the missing .2 rewrite, wrap homepage footer links at 390px, correct measured gold text contrast using MAIM brand tokens, and resolve shop icon CSP safely. Preserve all previous legal versions, approved policies and checkout flags. Prove routes at 390/1440, console and commerce tests. Return a draft PR; no production deploy or merge.

**Cowork:** Return the correct-account recording/privacy handoff with selected tool/media, consent and decline handling, purpose/storage/access/retention/deletion/training facts; confirm current publishable business address/contact monitoring and conditional branding review. Mark unknowns OPEN. Verify digital-asset rights separately. No recordings, emails, uploads, campaigns or checkout activation.

**Funnel coding agent:** In business-pressure-test-scratch-off at deployed SHA 699a3e52fd718c36fbaca720ba8619065f64ee88, reconcile the owned MAIM handoff, remove VITE_GUMROAD_URL customer path, validate booking destination and $100 credit claims, await submission persistence before success UI, redact sensitive logs and make delivery failures observable. Preserve historical/private records. Return tests and a draft PR without provider writes or deployment.

**Release QA / Claude Code:** Independently review site fixes and immutable document identity, then verify Preview-only TEST configuration and hosted Stripe terms once approved. Record app-created TEST session → webhook → Airtable → Resend/inbox → booking/support/return → duplicate retry → refund. Require explicit separate production decision; leave client Shakti systems untouched.

## Evidence and limits

Primary sources: [main](https://github.com/MajorDream444/Major-AI-OS/commit/8ef0c685b92da47a3c5c1fa2fefcdc5afc7f6cac), [PR #33](https://github.com/MajorDream444/Major-AI-OS/pull/33), [#38](https://github.com/MajorDream444/Major-AI-OS/pull/38), [#40](https://github.com/MajorDream444/Major-AI-OS/pull/40), [#42](https://github.com/MajorDream444/Major-AI-OS/pull/42), direct Vercel authenticated project/deployment/environment-metadata reads, public GETs and Chromium rendering, local source/tests. [Pressure Test exact source](https://github.com/MajorDream444/business-pressure-test-scratch-off/blob/699a3e52fd718c36fbaca720ba8619065f64ee88/src/App.tsx) and [submit API](https://github.com/MajorDream444/business-pressure-test-scratch-off/blob/699a3e52fd718c36fbaca720ba8619065f64ee88/api/submit.ts).

This audit is documentation only. A PR/build/deployment READY signal is not a payment, legal, publication or activation authorization. Review of this report is pending at PR creation.
