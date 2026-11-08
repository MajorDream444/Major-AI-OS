# App Flow

| Requirement | Journey | Exception and recovery |
| --- | --- | --- |
| AFC-01/02 | Offer → reserve or apply → readiness review → approved invite and seat hold. | Incomplete application stays in review. Full or expired capacity follows the approved hold or waitlist policy. No unapproved payment destination. |
| AFC-03 | Invited learner → checkout → payment verification → durable order and seat → confirmation and scoped access. | Cancel returns to the approved invite state. Pending verification shows a pending state. Replayed events must not duplicate orders or access. Refund and entitlement handling follow reviewed terms. |
| AFC-04/05 | Sign in → orientation and schedule → project draft → submit → peer feedback when shared → facilitator decision → revision or acceptance → progress and showcase. | Check inaccessible, revoked or expired access, withdrawn sharing, stale revisions, export and support. |

Exercise a complete invited adult journey in the authorized TEST environment. Record payment, seat, entitlement and learner experience as separate evidence. Use the [School V1 QA packet](https://github.com/MajorDream444/MAIMACADEMY/blob/main/docs/school/IMPLEMENTATION-AND-QA.md) for the candidate project workflow and its limits.
