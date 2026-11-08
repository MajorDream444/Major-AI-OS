# Technical Requirements

Use the existing [Academy app and runtime](https://github.com/MajorDream444/MAIMACADEMY/blob/main/README.md). The documented baseline is a static build with server handlers, restricted TEST membership and commerce scaffolding, and a gated School V1 candidate. See the [readiness inventory](https://github.com/MajorDream444/MAIMACADEMY/blob/main/docs/operations/SCHOOL-V1-READINESS-2026-11-03.md) and [School V1 QA](https://github.com/MajorDream444/MAIMACADEMY/blob/main/docs/school/IMPLEMENTATION-AND-QA.md). Hosted parity and identity remain verification items.

- AFC-01/02: reconcile one approved launch configuration across website, invitation, checkout, calendar and terms. Keep acceptance and capacity checks on the authorized path.
- AFC-03: preserve signed webhook validation, replay-safe order and grant handling, capacity controls and reviewed refund behavior. Verify confirmation and member access in the same environment.
- AFC-04/05: use scoped membership, session and entitlement checks before exposing private resources. Verify separation of learner, facilitator, preview and synthetic walkthrough.
- Capture exact commit, environment, test run, provider receipts and sanitized failure evidence. Keep learner data and secrets out of Git.
