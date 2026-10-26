# BPT saving and reservation provenance — reconciled QA packet

27 October 2026, WITA. **PREPARED; EXTERNAL QA NOT APPROVED OR EXECUTED.**
This is a limited provider integration test, not full launch acceptance.

## Immutable executable candidates

| Component | Code SHA | Owning review | Local origin and start command |
|---|---|---|---|
| Main-site reservation API | aae4e1c9e1c77ba7a71af51ccee5f5a3de66bcac | isolated codex/funnel-reconciled-2026-10-27 branch | http://127.0.0.1:3001; from apps/maim-site: `node --import tsx scripts/qa-subscribe-server.ts` |
| BPT capture API | 239af00245916dbaac086b8f5f529067ead2ea4f | BPT PR #5, maim/deployment-ready | http://127.0.0.1:3000; from repo root: `node --import tsx scripts/qa-local-server.ts` |
| Academy public source | 67d09473e6b532867d46eba07a15dea7564fe88f | Academy PR #28 | build-only in this packet; no member server or hosted API enabled |

Run exact code SHAs in clean worktrees. Later documentation-only PR commits do
not silently change these executable pins. Any runtime change requires new pins,
fresh tests and approval. No hosted preview or production URL is a test target.
Both loopback adapters import the reviewed real handlers, not a duplicate stub.
They load no dotenv files. BPT adapter exposes only challenge/submit and refuses
the known production base, contact-sync configuration, nurture and checkout.

## Resource bindings: explicit and intentionally not fabricated

No disposable resources have been created. Exact returned resource IDs and the
adult inbox mapping are **UNBOUND**; the packet cannot execute until they are
captured and privately reviewed. Approval to run is separate from this code push.
Do not fill these slots using an existing production integration.

Create only a NEW disposable Airtable base `MAIM Funnel QA 2026-10-27`, containing
`BPT Responses` and `Academy Reservations`, and NEW Resend segments
`QA-20261027-guide` and `QA-20261027-cohort`. No automation/broadcast is attached.
Schema proposal: `funnel-qa-airtable-schema-2026-10-27.json`.

| Local process | Variable | Exact resource slot / required state |
|---|---|---|
| BPT | AIRTABLE_PAT | private PAT restricted to new QA base |
| BPT | AIRTABLE_BASE_ID | QA_BASE_ID: returned ID for the new base only |
| BPT | AIRTABLE_TABLE_ID | QA_BPT_TABLE_ID: BPT Responses only |
| Reservation | RESERVATIONS_AIRTABLE_PAT | private PAT restricted to new QA base |
| Reservation | RESERVATIONS_AIRTABLE_BASE_ID | same QA_BASE_ID |
| Reservation | RESERVATIONS_AIRTABLE_TABLE_ID | QA_RESERVATION_TABLE_ID: Academy Reservations only |
| Reservation | RESEND_SEGMENT_ID | QA_GUIDE_SEGMENT_ID: QA-20261027-guide only |
| Reservation | RESEND_COHORT_SEGMENT_ID | QA_COHORT_SEGMENT_ID: QA-20261027-cohort only |
| Both | RESEND_API_KEY | private MAIM sending/contact credential, never copied from production env exports |
| BPT | RESEND_FROM_EMAIL | proposed already-domain-verified sender `MAIM QA <qa@majoraimindset.com>`; confirm privately |
| BPT | ENABLE_SUBMISSIONS / ENABLE_RESULTS_EMAIL | true only in bounded local run; otherwise unset/false |
| Reservation | ENABLE_RESERVATION_LEDGER | true only in bounded local run |
| BPT | AIRTABLE_CONTACTS_TABLE_ID / AIRTABLE_ASSESSMENTS_TABLE_ID / AIRTABLE_ORDERS_TABLE_ID / AIRTABLE_FOLLOWUP_TABLE_ID | UNSET; contact, assessment, order and follow-up integrations excluded |
| BPT | ENABLE_CHECKOUT / ENABLE_NURTURE | false |
| Both | Stripe/Supabase/Auth credentials and Academy enable flags | UNSET; no such operations in scope |

Never bind MAIM Orders, Client Profiles, or `tbl1pPhCa6bx3ST3E` (MAIM Follow-up
Queue) to these disposable slots. The BPT table-policy guard from #5 is preserved.
No Vercel env, secret, DNS, callback, CORS, integration or production flag write
is authorized. Record ID->resource-name receipts and credentials separately;
keep credentials, private inbox, full email content and tokens out of public Git.

## Synthetic identities and distinct email evidence

**SIM-01**: QA Funnel, `delivered+maim-funnel-20261027@resend.dev`.
This is Resend delivery simulation only. Accepted/delivered provider events do
not establish receipt in a human-controlled inbox. Label all evidence SIMULATED.

**SUP-01**: QA Suppressed,
`delivered+maim-funnel-suppressed-20261027@resend.dev`; create one NEW QA-only
contact with `unsubscribed=true` as a fixture. Send no email to this address.

**INBOX-01**: QA Adult, exact privately designated adult-controlled email mapped
to `BPT_QA_INBOX` in the private run manifest. Status: UNBOUND. Do not assume an
Academy QA address is approved for this run, invent an address, or substitute a
customer. Phase 2 requires separate explicit approval of this exact recipient.
Use that address only for one BPT transactional email, never segmentation.

SIM-01 BPT payload: UUID `ca270001-1027-4270-8270-000000000001`; firstName QA,
lastName Funnel; businessType Other; revenueRange Pre-revenue; blank phone;
biggestIssue `SYNTHETIC MAIM funnel QA 2026-10-27`; readiness
`Exploring my options`; answers `[1,1,1,1,1,1,1,1,1,1]`; consent true;
marketingConsent false; website empty. Fetch a fresh HMAC challenge, preserve
normal anti-bot checks, and use exactly the same data/UUID on its one retry.
INBOX-01 uses UUID `ca270002-1027-4270-8270-000000000002`, the privately approved
email, name QA Adult, and otherwise the same synthetic answers/context.

## Per-step upper limits and expected outcomes

All provider work is after separate approval. Capture baseline absence first.
Stop if an exact fixture/resource already exists; never overwrite it.

| Step | New rows / contacts / memberships / emails at most | Expected result |
|---|---|---|
| Setup | 1 new base, 2 tables, 2 isolated segments; 1 SUP-01 contact; 0 memberships; 0 emails | New resource IDs match manifest; no automation |
| Consent-denied BPT POST (SIM-01, consent=false) | 0 / 0 / 0 / 0 | HTTP 400; no provider write or email |
| SIM-01 BPT save once | 1 BPT row / 0 / 0 / 1 simulated email | score 25, Critical, primary Lead Flow, priority COLD; consent and provider ID recorded |
| Identical SIM-01 retry within 30 minutes | 0 / 0 / 0 / 0 | same submission; accepted email not resent; no duplicate row |
| SIM-01 guide-only signup, cohort=false | 0 reservation rows / 1 contact / 1 guide membership / 0 emails | waitlisted=false; no cohort consent/seat inferred |
| SIM-01 reservation once, then one retry | 1 reservation row / 0 / 1 additional cohort membership / 0 emails | waitlisted=true, provider confirmed; initial consent time/source retained; Paid Seat=false |
| SUP-01 reservation | 1 suppressed reservation row / 0 / 0 / 0 | existing unsubscribe preserved; waitlisted=false; no segment addition |
| Phase 2: INBOX-01 BPT save once + identical retry | 1 BPT row / 0 / 0 / 1 actual-inbox email | provider acceptance plus independently observed receipt; retry creates nothing |

Total ceiling: **4 Airtable rows** (2 BPT, 2 reservation), **2 Resend contacts**,
**2 memberships**, **2 emails** (1 simulated, 1 privately approved inbox), plus
normal provider audit/delivery events. No booking, financial event, paid seat,
Auth identity or marketing/nurture row. If phase 2 is not approved, its row/email
ceiling is ZERO, and inbox receipt remains BLOCKED.

Reservation fixture uses the SIM-01/SUP-01 identity, first_name QA,
website empty, cohort=true, source=academy-reserve. Only post to local
http://127.0.0.1:3001/api/subscribe with matching loopback Origin. Do not submit
the public Academy form, which still targets production.

Record consent=false and suppressed cases as separate outcomes, not as successful
enrollment. Failure injection/outage and ambiguous-status-write tests stay in
local mocks; never break provider configuration to manufacture a failure.

## Actual inbox acceptance gate

For INBOX-01 record privately: exact approval/recipient, consent timestamp,
submission ID, provider ID, subject, visible received timestamp and Message-ID or
header evidence obtained from the designated inbox/owner. Verify links without
booking or purchasing. Provider accepted/delivered status alone does NOT pass.
If the inbox is inaccessible, the message is absent, or only simulation exists,
report INBOX RECEIPT BLOCKED; do not resend speculatively or increase limits.

## Stop conditions and fixture-ID cleanup

Stop new actions on any wrong resource, existing non-fixture data, unexpected
row/contact/email, missing consent, suppression mutation, uncertain send,
provider failure, unapproved recipient or changed code SHA. Turn local flags off
and stop both processes before cleanup. Unknown delivery must be reconciled by
provider ID before retry, especially beyond the provider idempotency window.

Persist each created ID immediately in a private run manifest outside Git. After
sanitized evidence capture, remove only the recorded 4-or-fewer QA rows,
2-or-fewer contacts and 2-or-fewer memberships created by this run. Remove the
exact two newly created QA segments. Trash the new disposable base recoverably
only if supported/authorized; do not permanently purge. Never broad-delete by
email, reset counts by deleting concurrent records, drop shared schemas, delete
existing Auth users, or touch production integrations. Verify no fixture remains
and clear injected credentials. If interrupted, resume cleanup from the manifest,
not guessed emails. Sent messages cannot be unsent; provider audit/simulation
history may remain and must be disclosed. Retain only sanitized evidence.

## Separate acceptance runs, not authorized here

Academy sign-in, A/B RLS/progress, real paid-seat concurrency, Stripe TEST Checkout,
signed webhook replay, refund/revocation, booking and protected delivery remain
the independent Academy acceptance run in PR #28. Its larger packet is not
approved by this narrower one. Production payment activation and deployment
remain off. AMA client delivery and Foundry governance remain separate.
