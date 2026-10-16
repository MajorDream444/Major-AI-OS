# MAIM Blueprint Terms and Privacy — Approval Sheet

**Status:** REVIEW REQUIRED — no document on this sheet is approved or effective  
**Commerce gate:** `ENABLE_BLUEPRINT_CHECKOUT=false`; `CHECKOUT_TERMS_APPROVED=false`  
**Production:** HOLD

## Approval candidates

| Document | Proposed immutable version | Review route | Current status |
|---|---|---|---|
| Blueprint Service Terms | `blueprint-terms-2026-10-16.1` | `/terms/blueprint/blueprint-terms-2026-10-16.1` | Final candidate; owner/legal approval required |
| Blueprint Service Terms successor | `blueprint-terms-2026-10-16.2` | `/terms/blueprint/blueprint-terms-2026-10-16.2` | Incorporates approved commercial policies; recording and legal decisions remain open |
| MAIM Privacy Notice | `maim-privacy-2026-10-16.1` | `/privacy/maim/maim-privacy-2026-10-16.1` | Final candidate; owner/legal approval required |

The historical draft remains separately reviewable at
`/terms/blueprint/blueprint-terms-2026-10-16-draft.1`. Approval of a final
candidate must not overwrite that version.

The `2026-10-16.1` terms and privacy candidates remain frozen, unapproved
review artifacts. The successor terms candidate does not approve or replace
the privacy candidate.

## Decisions required before approval

| Area | Owner/legal decision |
|---|---|
| Provider/controller | AMA Solutions Corporation is supported as MAIM parent/default contracting entity by the recovered formation handover; confirm the current publishable mailing/business address and do not present its formation-era registered office as current headquarters |
| Governing law | Confirm governing law, venue, consumer disclosures, and privacy jurisdiction |
| Scheduling | Approved: one free reschedule with at least 24 hours’ notice plus one courtesy rebooking; confirm Asia/Makassar availability intent |
| Delivery | Approved: electronic delivery within five business days after the review and receipt of required assessment results and the business challenge |
| Refunds | Approved: full refund before preparation; customer-agreed deduction for completed preparation afterward; exceptions handled by Major through the configured contact mailbox |
| Recording/transcription | Approved in principle; select the tool/media and approve notice, participant consent and decline handling, purpose, access, storage, retention/deletion, and training/reuse wording before use |
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
