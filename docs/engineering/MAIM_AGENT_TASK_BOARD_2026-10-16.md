# MAIM Main Launch — Agent Task Board (2026-10-16)

Authority: docs/MAIM_LAUNCH_DIRECTIVE_2026-10-15.md; docs/RETIRED_PLATFORMS_2026-10-15.md; docs/engineering/MAIM_DEPLOYMENT_RECOVERY_2026-10-16.md.
No Shopify, Gumroad, Kit. No Lucky Library scope, Shakti changes, or Cloudroom deployment.

## Codex — implementation
1. Preserve original checkout and untracked work/; create independent clean worktree based on current main. Report status before any change.
2. Compare older fix/maim-v1-revenue-loop and business-pressure-test-scratch-off PR #5 to current main, with inventory of reusable code. Do not blindly merge.
3. Inventory MAIM product routing and dormant provider links; implement scoped Stripe webhook signed/idempotent order, durable entitlements, protected files and product-specific delivery; Resend with retry and evidence.
4. Provide PR, test output, migration notes, commit and release checklist. Never write customer PII or secrets to public logs/docs.

## Claude Code — independent audit
1. Timestamped DNS test with authoritative and public resolvers and verify www/apex responses.
2. Confirm exact Vercel project and assigned domain, deployed commit SHA, /shop and Business Pressure Test routes. Distinguish provider READY from customer-visible.
3. Independently review Codex PR for webhook signature verification, replay, auth, access control and non-MAIM data boundaries.
4. Locate command-repo MAIM_DAILY_SYNC path and reconcile with MAIM repo's daily sync; report both exact file paths and authoritative decision order.

## Claude Cowork — product operations
1. Inventory readiness of MAIM products, price, file source, rights and fulfillment instructions; never mix Shakti files.
2. Locate legacy links in source/exported assets and prepare a replacement checklist.
3. Prepare approved support/return copy and email templates, no outbound send.

## ChatGPT Work — QA
Use authorized browser/session to verify public deployment and sandbox checkout when implementation is ready. Capture timestamp, route, environment and visible outcome without publishing customer data. No real purchases or provider-account deletions.

## Report contract
For each task: STATUS, OWNER, REPO/BRANCH, COMMIT, ENVIRONMENT, EVIDENCE, BLOCKER, NEXT ACTION. No task is DONE based solely on a plan or an HTTP 202 accepted receipt.