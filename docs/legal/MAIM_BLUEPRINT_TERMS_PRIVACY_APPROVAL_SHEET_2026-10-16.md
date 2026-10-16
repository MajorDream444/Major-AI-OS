# MAIM Blueprint Terms and Privacy — Approval Sheet

**Status:** REVIEW REQUIRED — no document on this sheet is approved or effective  
**Commerce gate:** `ENABLE_BLUEPRINT_CHECKOUT=false`; `CHECKOUT_TERMS_APPROVED=false`  
**Production:** HOLD

## Approval candidates

| Document | Proposed immutable version | Review route | Current status |
|---|---|---|---|
| Blueprint Service Terms | `blueprint-terms-2026-10-16.1` | `/terms/blueprint/blueprint-terms-2026-10-16.1` | Final candidate; owner/legal approval required |
| MAIM Privacy Notice | `maim-privacy-2026-10-16.1` | `/privacy/maim/maim-privacy-2026-10-16.1` | Final candidate; owner/legal approval required |

The historical draft remains separately reviewable at
`/terms/blueprint/blueprint-terms-2026-10-16-draft.1`. Approval of a final
candidate must not overwrite that version.

## Decisions required before approval

| Area | Owner/legal decision |
|---|---|
| Provider/controller | Confirm the exact legal entity, trading name, business address, and contact details |
| Governing law | Confirm governing law, venue, consumer disclosures, and privacy jurisdiction |
| Scheduling | Approve the 24-hour rescheduling/no-show rule and Asia/Makassar availability intent |
| Delivery | Approve the proposed five-business-day delivery target |
| Refunds | Approve cancellation, work-performed deduction, post-delivery, partial-refund, and mandatory-rights language |
| Privacy retention | Approve financial, service, support, and deletion periods |
| Privacy age/transfer | Confirm adult-purchaser statement and international-processing safeguards |
| Publication | Approve exact version strings, immutable URLs, effective dates, and removal of `noindex` |

## Activation controls

After documented approval, configure Preview with the exact approved terms URL
and version, point Stripe TEST public business details to that same terms URL,
and visually verify the hosted Checkout link. Every Checkout Session and durable
order must retain the accepted agreement version and terms URL. Only then may a
human set the two Preview checkout gates to `true` for controlled TEST QA.

Approval of these documents does not authorize Production checkout, a live
transaction, publication of unrelated offers, or a change to client/platform
data boundaries.
