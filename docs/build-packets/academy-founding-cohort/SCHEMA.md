# Backend Schema

This document maps ownership and required relationships. The [Academy implementation and QA](https://github.com/MajorDream444/MAIMACADEMY/blob/main/docs/school/IMPLEMENTATION-AND-QA.md) owns the local schema and migration evidence. The [offer register](https://github.com/MajorDream444/MAIM-Commerce-Catalog/blob/main/catalog/offers.csv) owns the commercial identity.

| Record | Required relationship and control |
| --- | --- |
| Offer, cohort and seat hold | Catalog offer identifies approved price and entitlement. Cohort has a versioned schedule and capacity. A hold belongs to one applicant and cohort and expires under the approved policy. |
| Provider event and order | Verify and deduplicate provider events. Trace each paid order to the correct seat, purchaser and offer version. Reconcile refund and cancellation against the grant. |
| Membership and entitlement | Scope role, learner, cohort, status and expiry. Confirm who may provision and revoke. Verify hosted isolation and access after expiry. |
| Project, submission, review and activity | Track versioned private submissions, consented peer sharing, facilitator decisions and acceptance evidence. Preserve ownership on exports. |
| Attendance, replay, showcase and credential | Establish evidence and retention owner before delivery. Public credential verification needs its own reviewed data and consent decision. |

Confirm deployed schema and migration history before changing hosted data. The documented School V1 migration is unapplied. Access, retention, deletion, export and support procedures require review before learner data is collected for the new flow.
