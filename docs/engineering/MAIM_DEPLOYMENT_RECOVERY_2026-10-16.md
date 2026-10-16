# MAIM Deployment Recovery — 2026-10-16

## Locked decisions
MAIM deployment is P0. Shopify, Gumroad and Kit are RETIRED for MAIM/AMA/HAMAL owned operations. Current stack: Vercel owned MAIM website, Stripe, Resend, Airtable. Lucky Library stays in separate chat/repo. Shakti is isolated client work. Cloudroom remains research only.

## Conflicting evidence requiring reconciliation
- Claude Code reports its command-repo checkout at c30b80a and nonresolving MAIM DNS records in its environment. Those observations must be timestamped and checked again; they are not current global DNS proof.
- MAIM launch directive in this repo records a browser-loaded /shop and Vercel READY production deployment dpl_8VeQNsxcBJ2dEa1VfQtqU6ZmtmfB for commit ca221fc338d6eb92d81f0d61fb57c2027ae04ffe. READY does not prove custom-domain reachability or correct live content.
- This repo's docs/MAIM_DAILY_SYNC.md is updated to Stripe/Resend. Claude Code reports a distinct daily-sync file in Major-OS-AMA-OS--Command. The presumed command-repo docs/MAIM_DAILY_SYNC.md path was not found via GitHub; locate the exact path before editing and reconcile source authority.
- Codex reports local checkout fix/maim-v1-revenue-loop at be529e3 with untracked work/; do not clean, reset, checkout across, or delete that directory. Create a separate worktree to reconcile against main.

## Execution owners
ChatGPT/Yawdie: architect, scope/priority owner, decisions and evidence ledger; do not claim execution outside verified tools.
Codex: safely inspect main and historical branches, implement and test owned commerce via scoped PRs, preserve local work/.
Claude Code: independent DNS/Vercel/prod-SHA/browser and security verification plus code review.
Claude Cowork: approved product asset inventory, rights, copy, legacy links and release readiness; no customer messages or destructive account actions.
ChatGPT Work: permitted authenticated browser steps and deployment verification where available; no purchases or billing changes without specific approval.

## P0 release gates
1. Identify canonical deployed repo, Vercel project, main HEAD, branch ancestry and local changes safely.
2. Independently verify authoritative DNS, multiple resolvers, Vercel domain assignments, HTTPS, apex/www redirects, /shop and Business Pressure Test routes, and production commit SHA.
3. Implement signed Stripe webhooks, replay-safe durable orders/entitlements, product-specific fulfillment, access controls, Resend emails and retry/failure handling. Do not grant access from return URL params.
4. Test sandbox checkout, webhook retries/duplicates, delivery and inbox receipt, file access, refund/revocation and support path; avoid any live charge without explicit authorization.
5. Merge approved tested PR and verify deployed commit with customer-browser checks before declaring LIVE-VERIFIED.
6. Inventory/rewrite legacy commerce dependencies; deactivation/cancellation of third-party accounts requires export integrity, owner review and provider receipts.

## Milestone vocabulary
DOCUMENTED -> IMPLEMENTED -> BUILD-VERIFIED -> DEPLOYED -> LIVE-VERIFIED -> PURCHASE-DELIVERY-VERIFIED -> REVENUE-VERIFIED. Record timestamp, environment, SHA, URL, owner and evidence for every claim.

## Scope exclusions
No Cloudroom deployment, Lucky Library manuscript work, Shakti client system changes, unrelated agency expansion, speculative feature redesign or new storefront provider.

## Next handoff report
One table: gate, executor, source observations, evidence URL/SHA, status, blocker, next action. Reconcile historical reports without deleting provenance.