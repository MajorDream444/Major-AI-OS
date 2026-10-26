# MAIM cohort readiness — 26 October 2026

Status: **review candidate; no deployment or commerce activation performed**
Scope: `MajorDream444/Major-AI-OS` public doorway and its boundary with MAIM Academy.

Canonical facts: payment is planned to open **11 November 2026 only after readiness approval**; the cohort starts **18 November 2026**; founding price is **US$249 once**; capacity is **20 members**. Reservations express interest and do not guarantee a paid seat.

| Priority | Blocker / capability | Direct evidence | Owner | Smallest safe fix | Acceptance check | State |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | Academy checkout, atomic capacity and member entitlement | `docs/handoffs/MAIM_ACADEMY_LAUNCH_REVISION_2026-10-25.md`; Issue #37 records that main-site checkout supports Blueprint USD250, not Academy USD249 | MAIMACADEMY / backend | Implement the approved authenticated Academy flow in its own repository; do not use a generic payment link | Controlled TEST journey proves identity, one-time US$249 offer, atomic 20-member cap, idempotent webhook, entitlement and refund recovery | **Blocked outside this repo** |
| P0 | Legal candidate URL returned 404 despite emitted `.2.html` | Issue #37, 26 Oct; `maim/build.py` emits the immutable file while `vercel.json` lacked its route | Major-AI-OS | Add the exact extensionless `.2` rewrite and regression check | Local build emits the file and config test maps the immutable URL; deployed route still requires reviewed preview evidence | **Fixed in this candidate; deployment unverified** |
| P0 | Payment copy omitted the release-approval condition | Founder decision `docs/decisions/MAIM_ACADEMY_SCHEDULE_REVISION_2026-10-25.md`; public chrome/homepage previously said links simply go out on Nov 11 | Major-AI-OS | State that payment is planned for Nov 11 **after readiness approval** | Generated homepage and shared cohort card show Nov 11 gate, Nov 18 start, US$249 once and 20-member capacity | **Fixed in this candidate** |
| P1 | Public navigation and reservation routing | `site_chrome()` routes Academy and reservation CTA to `academy.majoraimindset.com`; redirects cover `/academy`, nested Academy paths and `/reserve` | Major-AI-OS | Preserve current routing and test it | Static build succeeds; redirect and shared-chrome tests pass | **Implemented; live deployment not changed** |
| P1 | Mobile readability | `site-chrome.css` exposes a mobile menu at 1060px, 18px menu links and minimum 44px targets | Major-AI-OS | Preserve responsive chrome and regression check | Source regression and visual QA at 390px; hosted visual QA remains a release check | **Implemented; source-tested** |
| P1 | Truthful reservation confirmation | `api/subscribe.ts` returns `waitlisted`; homepage confirms cohort intake only when that flag is true | Major-AI-OS + Academy | Preserve fail-honest result; Academy must display failure when cohort segment write fails | Unit test plus controlled non-production intake with correlation evidence | **Implemented in source; external provider journey unverified** |
| P1 | Homepage signup performed an extra legacy browser-side Supabase write and still described Kit ownership | `majoraimindset_front_door.html` attached a second submit listener to the current Resend form wrapper | Major-AI-OS | Remove the retired duplicate capture; keep the current `/api/subscribe` request as the single browser submission | Regression check rejects Kit text, the legacy endpoint and the duplicate capture constant | **Fixed in this candidate** |
| P1 | Actual session dates after 18 Nov | Canonical decision derives Nov 25, Dec 2 and Dec 9 but requires host confirmation | Founder / Academy operations | Confirm follow-up dates before invites | Approved calendar and invitation match | **Blocked on host confirmation** |

## Boundaries retained

- No Stripe setting, payment link, production environment, deployment, customer message, reservation or synthetic submission was created or changed.
- Pillar Scroll remains a separate product/delivery path and is not evidence of Academy readiness.
- Passing local checks proves source behavior only. It does not prove the public deployment, provider permissions, atomic capacity, email delivery or member access.
