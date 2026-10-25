# Founder decision — MAIM Academy launch revision

Approved directly by Major on 25 October 2026, Asia/Makassar.

| Milestone | Approved date | Gate |
| --- | --- | --- |
| Payment opening and reservation-list invitations | Wednesday 11 November 2026 | Readiness approval first; no early opening |
| Official Academy founding-cohort start | Wednesday 18 November 2026 | Deliver reviewed lessons, member access and support |

Price remains **US$249 once**, capacity **20 founding members**. Reservations remain open. November 4 is removed from the launch schedule. Earlier November 11 start and November 18 fallback are superseded. Finishing early creates time for marketing, QA, partnerships and anticipation; it does not authorize an earlier launch.

## Workstream ownership

- Claude Code: main/Academy public copy and navigation; all countdowns; 16:9 and 9:16 teasers say **Starts November 18**; correct on-screen/poster/metadata dates and verify mobile/desktop/reduced-motion behavior. Do not redraw the approved badge or synthesize Major.
- Codex: member/auth/UUID isolation, enrollment/seat caps, TEST commerce, reservation confirmation truthfulness, scoped database/provider connections and integration QA.
- HAMAL: canonical context synchronization and cross-repository status routing.

Academy operational implementation/evidence is tracked in [MAIMACADEMY PR #20](https://github.com/MajorDream444/MAIMACADEMY/pull/20). The repository's `data/founding-cohort.json`, downloadable calendar and invitation draft must reference this revised decision. Weekly continuation targets after Nov18 are Nov25, Dec2 and Dec9 at the earlier approved 22:00 Asia/Makassar /14:00 UTC time; host review remains required for those follow-up dates. No meeting invitation has been sent.

## Evidence and release boundary

Public /reserve and teaser previously represented Nov11 as start. A new decision does not make those deployments current: verify actual public copy, countdown constants, video frames and deployed SHAs after the responsible agent's reviewed release. This documentation PR does not change or deploy the public site.

Codex's Oct25 inspection found Academy runtime credentials/schema unconfigured, Supabase UUID vs Better Auth text identity mismatch, no implemented atomic 20-seat cap, incomplete fixed-cohort/booking rules and unverified final legal/privacy/TEST/inbox/Airtable bridge. Reservations are interest-list signups, not guaranteed paid seats. Do not bypass authenticated app-created checkout with a generic Stripe link that omits identity/offer/agreement/capacity controls.

Two adult QA accounts are authorized privately for protected sign-in and transactional testing only. Addresses/credentials stay outside public Git. No bulk marketing, live charges or permanent student enrollment. Test cleanup must preserve existing contacts and required audit evidence; do not delete accounts or records by broad email matching.

Payments, invitations and production changes remain off until separately reviewed/authorized. No payment send, bulk mail, production setting, price or capacity change is authorized by this schedule record.
