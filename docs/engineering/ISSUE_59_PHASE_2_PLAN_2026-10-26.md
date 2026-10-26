# Issue #59 — Phase 2 development checkpoint
Date: 2026-10-26 Asia/Makassar
Status: DRAFT PLAN / COMMERCE HOLD. No implementation, deployment or activation claimed.
Branch base: Major-AI-OS main 00713ff629dac0e2284741f79eeb25dc8728c59c.
Related: https://github.com/MajorDream444/Major-AI-OS/issues/59
Contract: https://github.com/MajorDream444/Major-AI-OS/issues/59#issuecomment-6406763517

## Authorization and scope
Major supplied the Phase 1 review and authorized development planning and an isolated implementation branch only. This checkpoint records the ownership design before coding. Recommendations in the brief remain recommendations: no founder approval is inferred for scope/price, rights, public-file removal, Academy payment-link pause, schema application or release.
No live Stripe writes, checkout activation, migrations, customer emails, paid generation, catalogue imports, history rewriting or production promotion. Do not change current live commerce configuration under this development scope.
MAIM digital delivery is separate from Academy, AMA client delivery and Foundry. Yawdie coordinates; Codex implements; Claude Code reviews; Cowork owns asset reconciliation/re-export. This record does not start a background agent.

## Evidence inspected
- Claude contract above, including both comments in issue #59.
- MAIM_PRODUCT_READINESS_2026-10-26.md, full 11,735-byte report.
- CODEX.md, CLAUDE.md, .codex/AGENTS.md, generated repo skill and foundation manuals.
- apps/maim-site/lib/{commerce,fulfillment,providers}.ts; api/{checkout,stripe-webhook}.ts; package.json.
- supabase/migrations/20261014043909_maim_payments_foundation.sql.
- MAIM ECOSYSTEM hosted maim schema through the specifically named plugin connection, read-only, 26 Oct: customers, orders, entitlements, webhook_events, refunds and vault_assets are present with RLS enabled. Provider summary reported 0 rows; this is not a Stripe purchase inventory.
- Private MAIM-PRODUCTION-OS README is readable in this session. Its policy assigns original binaries to Drive and explicitly excludes binary storage authority. No private original preservation is proven by repository access.

## Proposed fulfillment ownership
| Concern | Authority during this pilot |
| --- | --- |
| Payment and refund facts | Stripe, validated signature and retrieved session/price/product |
| MAIM-DIG-001 order and access | Supabase maim.orders and maim.entitlements |
| Digital operations display | Airtable projection of canonical Supabase IDs/status, never a digital access authority |
| MAIM-BLUEPRINT-001 existing booking flow | Existing Airtable fulfillment, unchanged in this phase |
| Rights to deliver exact file version | Reviewed vault_assets record, commercial_approved rights, approved private object and full SHA-256 |
| Delivery email progress | Proposed durable server-only delivery job ledger |
| Runtime task state | Not provisioned by this checkpoint |

This is a SKU-scoped boundary, not two writers for the same entitlement. A digital order must never invoke fulfillBlueprint or let an Airtable edit grant/reinstate access. Do not silently migrate existing Blueprint orders to Supabase. Any later convergence is a separate reviewed migration and backfill with reconciliation.
Airtable downtime must not undo the canonical entitlement or block refund revocation. Persist projection work and retry; expose discrepancies to operations. The existing Airtable upsert does not establish atomic cross-system consistency.

## Blocking design gaps confirmed in source and hosted schema
1. orders has a unique checkout session but no payment-intent identifier. Refund mapping cannot safely use the current Blueprint-only handler for digital purchases. Propose a reviewed payment-intent mapping with uniqueness and mode isolation.
2. webhook_events has event uniqueness/status/attempts, but no demonstrated atomic claim, stale-lease recovery or transactional order/entitlement operation. A duplicate event row alone must not be treated as successful processing.
3. No durable digital email/outbox state is present in the inspected payment foundation. Persist work before external send; provider idempotency alone cannot promise indefinite exactly-once delivery.
4. customers requires stripe_customer_id; digital checkout must retain customer_creation=always and fail closed on absent customer identity. Binding auth_user_id requires a verified identity workflow; an arbitrary checkout email is not proof of account ownership.
5. No reviewed private bucket, storage policy, asset-to-SKU mapping, token lifecycle or service endpoint is proven. These need source review and explicit schema/policy approval before hosted changes.
6. Test-mode data must not authorize live access. Choose an approved isolated test environment; do not insert test payment rows into the production ledger without an explicit mode-isolation design and authorization.
7. vault_assets requires workspace_id and retention_until in addition to rights/reviewed. Resolve the approved product workspace and retention decision; do not create dummy values to bypass the schema.

## Retry, concurrency and event ordering contract
- Validate signature before processing; validate known SKU, one-time mode, paid status, expected amount/currency, exact configured TEST price, expanded product metadata, scope/agreement provenance and livemode=false for the digital pilot.
- Claim unique (provider, external_event_id) atomically. Concurrent workers get one owner; processed events return success, incomplete/failed events remain recoverable.
- Atomically persist customer, unique session order, unique (order_id,sku) entitlement and delivery/projection jobs. Do not mark processed before durable state commits.
- Two distinct successful-payment event IDs for one session still create one entitlement and one initial delivery job.
- Use a session-scoped stable delivery key maim-dig-001-{session_id}; persist provider acceptance/message ID separately from inbox delivery evidence.
- On ambiguous send timeout, reconcile before resending; once the provider's deduplication window ends, do not blindly resend an unresolved job. Exactly-once external effects cannot be inferred from local status alone.
- Full refunds atomically revoke access and cancel unsent delivery jobs. A later paid replay cannot reactivate a revoked order. Handle refund-before-payment with durable pending refund/tombstone reconciliation; an unresolved refund must not be discarded as success.
- Multiple partial refunds must be reconciled against authoritative cumulative refunded amount; define partial-refund access policy before release.
- Keep Blueprint refund handling isolated. Current recordRefund writes Blueprint SKU even when no Airtable record exists, so routing a digital refund through it would misclassify the payment.
- Delayed Airtable sync must not overwrite a newer revoked status with stale active state.

## Download and security contract
Proposed API: /api/download, no-store, with authenticated owner verification plus a short-lived entitlement-bound token. Authentication/identity linking remains a gate; a bearer link alone cannot substantiate a foreign-owner denial.
- Missing valid authentication: 401. Valid authenticated user with foreign/revoked entitlement: 403. Valid owned but expired delivery token: 410. Malformed/tampered token: deny without revealing order existence.
- Fetch current entitlement on every fresh authorization. Check order/SKU, mode, rights approval, exact object version and approved asset hash.
- Token has expiry, audience, entitlement and nonce; secrets remain server-only. Never log raw token, signed URL, customer email or payment payload.
- Issue storage URL only for a fixed allowlisted private object; no arbitrary path/bucket/redirect input. TTL at most 15 minutes, preferably 5 minutes.
- No public bucket, anonymous listing/read policy, public asset path or Drive paid-delivery URL.
- Refund prevents fresh signing. Already issued URLs can remain usable until expiry; previously downloaded files cannot be recalled.
- Use a confirmation step rather than consuming a single-use token on an email scanner GET. Prefer short TTL plus owner auth unless single-use semantics are explicitly required.
- Preview QA must use TEST secrets, an owner-authorized QA identity and no production sends. Default flag ENABLE_DIG_001_CHECKOUT=false; fail closed in production even if accidentally toggled for this test pilot.
- Review grants, RLS, service role exposure, search_path/EXECUTE on any proposed RPC, storage policies, token leakage and refund races independently.

## Bounded implementation PR sequence
1. SKU registry and compatibility: preserve OFFER/isPaidBlueprint exports or adapt all existing callers; missing sku retains existing Blueprint behavior, unknown sku returns 400. Per-SKU price/flags/terms; include sku in checkout idempotency key; never accept client amount or price ID.
2. Reviewed schema/policy proposal: transaction/claim mechanism, payment mapping, durable delivery/projection jobs, test isolation, recovery leases and storage policy. Review only; do not apply or reapply migrations.
3. Digital webhook/download implementation against dependency-injected adapters and local test doubles. No hosted acceptance claim from mocks.
4. Draft Resend copy and safe public product-info CTA. No template publication or sending.
5. Free Guide v1.1 review: preserve original, re-export using approved MAIM marks, extract and scan text/links for retired providers, visually inspect pages, hash final bytes. Same published filename preserves inbound links; production replacement remains gated.
6. Public paid-file removal PRs in both repos only after verified private originals, permissions and full hash receipts exist. No history rewrite. Removal from a PR branch does not remove public main or existing historic URLs.

## Reviewable copy drafts (not published)
Free Guide byline: Major Dream Williams · Major AI Mindset · majoraimindset.com
CTA: Explore The Pillar Scroll at https://www.majoraimindset.com/shop/pillar-scroll
Required destination notice: The Pillar Scroll is being prepared. Checkout is not open. No payment is being collected.
No Buy button or active checkout/payment link. Verify the destination itself before the new guide is approved. Do not advertise PDF-only $27 scope while the founder decision and Email 7 package mismatch remain open.

Resend draft alias: maim-pillar-scroll-delivery-v1
From: Major Dream Williams <hello@majoraimindset.com>
Reply-to: contact@majoraimindset.com
Subject: Your Pillar Scroll is ready
Body:
{{GREETING}},
Your copy of The Pillar Scroll is ready: {{DOWNLOAD_URL}}
Sign in with your verified purchase account to access it. This link expires in {{LINK_TTL}}.
If it expires, contact contact@majoraimindset.com with order reference {{ORDER_REF}}.
Refund policy: {{REFUND_POLICY_URL}}
One letter. One lesson. One action.
— Major Dream

Transactional only; preserve suppression handling; never add marketing segments. Copy must match the finally selected auth/renewal flow. Store this draft in source only; do not create/send provider objects under the current scope.

## Asset preservation and integrity
Report-observed hashes, not recomputed in this checkpoint:
- Pillar Scroll v1.0: 89e51fb01c058ebbbad9a91b2588926c5abc70c288d406d1cf546a7fc7f19ea3 (28,294 bytes).
- Free Guide v1.0: 42f6a2d3a54a6fed4a08c48f03ccefed1a34115fa4f0857eee507d4f0a58d964 (13,817 bytes).
- Emerald: report supplies only a shortened hash; obtain full hash before preservation/removal.
Private receipt must include original path/ref, bytes, full hash, verified destination and access review; keep sensitive locators private. Current checkout code contains no verified binary preservation receipt.
No paid-file removal is performed or proposed as ready to merge yet.

## Acceptance matrix
| Check | Required proof | Current status |
| --- | --- | --- |
| Existing Blueprint compatibility | npm run check; unchanged booking/refund tests | Not run; planning-only |
| Digital checkout defaults/mismatch validation | Unit/API tests for disabled/unknown SKU, amount/price/currency/mode/agreement | Not implemented |
| Duplicate/concurrent event delivery | Real transactional concurrency + crash/retry tests, one order/entitlement/job | Not implemented |
| Refund ordering/race | Full/cumulative partial/refund-before-paid/replay; revoked stays revoked | Not implemented |
| Download | Owner A vs B, 401/403/410, tamper, expiry, revoked, rights denied | Not implemented |
| Private storage | Bucket public=false, policy/grant inspection, anonymous direct-read/list denial | Not verified |
| Inbox | Authorized TEST inbox receipt, provider acceptance distinct from delivered | Not run; no sends |
| Preservation/re-export | Full hashes, private receipts, visual and retired-link checks | Blocked |
| Independent security review | Named reviewer, reviewed commit and findings closed | Pending |

## Hosted QA permission status
MAIM ECOSYSTEM list_tables succeeded on 26 Oct in this Codex session using the named connection; do not repeat the earlier Cowork denial as a current Codex result. This proves schema-read permission only. Storage policies, runtime secrets, auth A/B, transactional writes, Stripe TEST configuration and inbox delivery remain unverified. No retired CLI credentials were read or used. If any permitted hosted read fails later, record the exact redacted operation/error; do not switch accounts or CLI credentials silently.

## Yawdie board and release blockers
| Priority | Work | Owner | Status / exit |
| --- | --- | --- | --- |
| P0 | Academy payment exposure | Major / Academy ops | Reported active by prior audit; current Stripe acceptance and existing purchasers not independently rechecked here. Read-only verification first; any pause needs authorization. Payment opens Nov 11 only after readiness approval; cohort starts Nov 18. |
| P0 | Free Guide retired CTA | Cowork + Codex | Copy drafted; source re-export and destination verification pending |
| P1 | Digital private delivery | Codex + Claude Code | Ownership plan ready for review; implementation and hosted TEST acceptance pending |
| P1 | Paid files in public HEAD | Cowork + Codex | Preservation and removal decision pending; no deletion |
| P2 | Academy 15-item media reconciliation | Cowork | Reconcile existing assets before commissioning; no catalogue import |

Founder decisions remain open. This checkpoint is not approval to sell. Issue #59 remains open and this PR must use Related to #59, not Closes #59.
