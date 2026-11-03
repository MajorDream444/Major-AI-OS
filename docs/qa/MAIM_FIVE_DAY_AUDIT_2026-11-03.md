# MAIM funnel and Academy audit — 3 November 2026

Coverage: 29 October–3 November, Asia/Makassar, plus reconciliation from the last
27 October tests. Fresh source clones, full local gates, read-only production
pages/APIs, GitHub PRs/issues, Vercel deployment pins, MAIM Ecosystem aggregate SQL,
and Resend domain capabilities. No form save, email, purchase, Stripe Session,
provider mutation, migration, merge or deployment was executed in this run.

## Current main versus production

| Repository | Inspected main | Production Git SHA | Result |
|---|---|---|---|
| Major-AI-OS | 96b0666f96290806870412a8eec98c42ee4e28a5 | same | source/live parity PASS |
| MAIMACADEMY | 6bf548a16e83f44c749502c11d0eb1b59dd39a2d | same | source/live parity PASS; local lint failure below |
| business-pressure-test-scratch-off | 977959dd61523eee077b1353a272dd5f0fb7fc0f | e6c8bc25e0e4d4f9c11c2f77adcf93a02ab6e62d | BLOCKED: main has incompatible merge; live remains older working version |

Vercel READY production IDs respectively: dpl_CYLGTNNDVUBopVFwJHpcMwMtkFXb,
dpl_HpPXgRbDidPCuixNtGrtD9vvZQHN, dpl_3At3yzY1aoAwicmWg6F37y6zV3pP.
READY proves deployment state, not purchase/member acceptance.

## Changes since the previous check

- MAIM PR #71 merged 27 October: consent/suppression, isolated reservation ledger,
  BPT direct routing and bounded packet. It is no longer a draft awaiting merge.
- MAIM PR #72 merged 31 October: Remotion teaching cards/card-region rendering
  and repaired Inter font. Fresh Remotion TypeScript check passes; this run did
  not re-render all film assets or certify production masters.
- MAIM PR #73 merged 1 November: founder-supplied Volume 1 A–Z mindset map.
- Site commit 96b0666, 1 November: approved welcome cut/poster and One Crown logo
  applied to homepage; film source size about 35 MB. Browser sees film controls
  and full-film YouTube link; full media playback was not independently watched.
- Academy #29 and #30 merged: guide routing, packet reconciliation and gated
  authenticated TEST consent/checkout controls. Production runtime stays closed.
- Academy #32 merged 30 October: dedicated Terms/Privacy/Support review drafts.
  They are publicly visible but not approved effective checkout agreements.
- Academy #33 merged 31 October: Expertise production/caption tooling and release
  package. #35 records the Herk trial; #36 records Volume 2 applied A–Z map.
  Merged production files do not prove that the video was uploaded or published.
- Academy 6bf548a, 1 November: complete Markdown brand/Stripe/legal handoff.
- BPT history timestamps place the incompatible merge on 27 October; it predates
  this five-day window but was not the last verified live code. Do not describe
  the newly discovered failure as a new November deployment.

## Fresh local gate results

| Checkout | Exact command | Before repair | Repair result |
|---|---|---|---|
| Major-AI-OS/apps/maim-site | npm ci; npm run check | 28 PASS, typecheck/build PASS | 28 PASS after E-label correction |
| MAIMACADEMY | npm ci; npm run check | build PASS; HTML lint FAIL, tests not reached | 50 PASS, build/lint PASS |
| BPT root | npm ci; npm run check | TypeScript FAIL; tests/build not reached | 33 PASS, TypeScript/Vite build PASS |
| Major-AI-OS/remotion | npm ci; npx tsc --noEmit | PASS | no render assertion |
| Academy scripts | python3 -m py_compile scripts/build_captions.py scripts/compose_episode.py; node --check public/member-client.js | PASS | syntax checks only |

Site check expands to tsc --noEmit; node --import tsx --test tests/*.test.ts;
python3 maim/build.py (16 pages). Academy check expands to node scripts/build.mjs
(10 generated pages plus copied public policy pages); html-validate
'dist/**/*.html' && node --check scripts/build.mjs; node --test tests/*.test.mjs
tests/database/*.test.mjs. BPT check expands to tsc --noEmit;
node --import tsx --test tests/*.test.ts; tsc --noEmit && vite build.

**111 is the repaired-candidate total, not a claim that all three current mains
passed.** Counts remain 28+50+33; repairs add no mirror tests. Existing gates
reproduce the regressions directly. Mocked provider tests and embedded PostgreSQL
are not hosted integration, inbox or real concurrency proof.

## Smallest engineering fixes prepared

1. BPT issue #7: restore only api/submit.ts and src/App.tsx to tested/deployed
   e6c8bc2 behavior. The incompatible merge had replaced imports/state with an
   older app while retaining the current rendering/handler tail (TS1005 at
   submit:243 and App:233). It also added an unsafe duplicate fire-and-forget
   email path. Retain newer api/email-template.ts, public/email-mockup.html and
   tooling in history/source; integrate their design separately with existing
   consent, server scoring, optional contact, delivery receipts and idempotency.
2. Academy issue #37: uppercase DOCTYPE in public/terms.html, privacy.html and
   support.html. Preserve all review-draft banners, legal text and noindex.
3. MAIM: change homepage E · Execution to E · Experiment, matching the approved
   1 November map. Execution is X in that map. No curriculum substitution.
4. Explicitly disable automatic Vercel deployment for each new repair branch.
   These candidates require review; this run does not merge/promote them.

## Route-by-route matrix

PASS means the stated narrow check, not full conversion readiness. BLOCKED means
there is missing acceptance evidence or a confirmed gate. NOT VERIFIED is a
coverage limitation; an HTTP timeout is not a demonstrated broken route.

| Origin / route | Check | Status |
|---|---|---|
| MAIM / | rendered navigation, welcome film element, direct BPT and Academy links | PASS; E-label correction pending review |
| MAIM /academy | browser redirects to Academy / | PASS |
| MAIM /reserve | browser redirects to Academy /reserve | PASS |
| MAIM /pillars | HTTP 200 | PASS reachability; fulfillment not tested |
| MAIM /library | HTTP 200 | PASS reachability |
| MAIM /vault | HTTP 200 | PASS reachability; private entitlement not tested |
| MAIM /shop | HTTP 200 | PASS reachability; purchase BLOCKED |
| MAIM /coaching | HTTP 200 | PASS reachability; booking not tested |
| MAIM /campus | HTTP 200 | PASS reachability |
| MAIM /privacy | HTTP 200 | PASS reachability; legal approval not inferred |
| MAIM /api/subscribe | mocked suppression/consent/ledger tests | PASS local; external save/contact/membership BLOCKED |
| MAIM free-guide PDF | command-line request timed out | NOT VERIFIED download |
| BPT / | live assessment chooser and separate $250 Blueprint offer | PASS public rendering |
| BPT /#business | ten questions, first option each, no identifying data | PASS browser |
| BPT result view | 0/100, You are the system, three signals, save/print/review actions | PASS browser; no save clicked |
| BPT /api/submit | existing 33-test suite after repair | PASS local; Airtable/email round-trip BLOCKED |
| BPT /api/shop | available:false, MAIM-BLUEPRINT-001, USD250 | PASS closed-gate observation; purchase BLOCKED |
| BPT /privacy.html, /refunds.html, /participant-agreement.html | HTTP 200 | PASS reachability |
| BPT /terms.html | command-line timeout | NOT VERIFIED this run |
| Academy /reserve | free/no paid-place guarantee, $249 once, 20 spots, Nov11 conditional/Nov18 start | PASS public copy; provider save BLOCKED |
| Academy /major-moves | three samples and invitation render | PASS exposure; paid curriculum BLOCKED |
| Academy /member-room | HTTP200 shell, content guarded | PASS shell; authenticated journey BLOCKED |
| Academy /walkthrough | HTTP200 demo shell | PASS reachability; not real member acceptance |
| Academy /api/checkout.json | available:false and readiness reason | PASS closed gate |
| Academy /api/academy-auth/get-session | 503, Member sign-in is not open yet | BLOCKED operational sign-in; expected fail-closed |
| Academy /api/member | 503, member room being prepared | BLOCKED operational member service; expected fail-closed |
| Academy /terms.html | visible REVIEW DRAFT; $249,20,free reservation distinction | PASS draft exposure; effective agreement BLOCKED |
| Academy /privacy.html, /support.html | source/build inspected; HTTP requests timed out | NOT VERIFIED live retrieval; review approval BLOCKED |
| Academy /library, /spark-lab, /foundry | source generated; command-line requests timed out | PASS local build; live UI NOT VERIFIED |

Browser reserve screenshot was captured at desktop width 1456px. Attempted
390px override did not change measured viewport width, so **mobile QA is NOT
VERIFIED**. No mobile PASS, contrast certification or complete accessibility
claim is made. Reserve body/labels measured 17px, lead19.2px, nav16px, eyebrow13.6px
at the observed desktop width. Native navigation links/labels were visible.

## Integration and launch blockers

Read-only MAIM ECOSYSTEM connector confirms njpdlomvyalxrkluaige ACTIVE_HEALTHY.
All 15 academy_test tables have RLS enabled. Fresh aggregate counts: lessons0,
progress0, testers0, auth_sessions0, reservations0, seats0, payment_events0,
grants0, receipts0. These TEST-schema counts do not measure production Stripe
customers or the public Resend reservation list.

Source data/major-moves.json has 30 entries; all30 source_status values still
require approved chapter/passage mapping. Existing issue #34 distinguishes the
public ABC/Ten Pillars sample journey from the practitioner paid cohort.
Publishing the new A–Z maps does not finish 30 reviewed paid lessons.

Resend majoraimindset.com sending VERIFIED/enabled, receiving disabled in Resend.
This does not establish whether another mailbox host forwards/receives mail.
Actual adult-inbox receipt and support monitoring remain unverified; no email
was sent. The Resend test address remains simulation/provider testing only.

Academy issue #31 documents the active standalone LIVE Payment Link, missing
approved terms and absent trusted app-seat/UUID enrollment. Stripe link state
was not re-read through a Stripe connector in this run; treat its 30 October
record as dated evidence. Do not distribute it or equate its20 completed-session
limit with atomic pending/held/paid admission. No payment settings were changed.

Reservations remain uncapped. Paid/pending/checkout/held states share the existing
20-place pool; no cap is newly imposed. Actual hosted paid-seat concurrency,
Stripe TEST payment/refund/revocation, sign-in, receipt and member lesson access
remain separate Academy acceptance work.

Current source/public calendar still uses Wednesdays Nov18/25,Dec2/9 at22:00 Bali,
with continuation targets qualified. A newer Sunday-teaching schedule has been
discussed elsewhere; it is not reflected in these repository calendar sources.
Reconcile the founder-approved final calendar before invitations; do not silently
change dates based on an unrecovered conversation summary. Nov11 payment opening
and Nov18 start are still the displayed launch decisions, subject to release GO.

Homepage free Live Room promises include Studio replays within24 hours, a
personalized ABC starting path and fixed Bali/New York times. This run did not
verify those delivery capabilities or seasonally correct session conversion.
Keep that free-room promise separate from Academy's48-hour reviewed replay target.

## Refreshed external QA packet status

The 27 October packets remain historical scopes, not permission for this run.
Source changed; immutable pins/protected origins must be refreshed after review.
No disposable Airtable base/tables/segments or adult receipt inbox were bound or
created here. Existing variable names/step limits/fixture cleanup remain in
MAIM_FUNNEL_TEST_PACKET_2026-10-27.md. A fresh exact-SHA, privately bound packet
must precede any external saving/email test. No customer information was entered.

## Next three moves

1. Engineering: review the isolated BPT build repair first, Academy lint fix and
   MAIM E-label fix; preserve source history and newer media assets. Deploy only
   through a separately authorized release, then verify production SHA parity.
2. Founder/editorial: resolve issue #34 with the paid cohort content manifest,
   reviewed Week1 lessons and final calendar. Do not substitute the ABC roadmap.
3. Release owner: resolve #31 legal/enrollment path and monitored recipient,
   then prepare the exact protected TEST acceptance packet for approval.

AMA client delivery and Foundry's advanced authorization remain separate. This
report does not audit AMA commerce, modify client systems or grant Foundry access.
