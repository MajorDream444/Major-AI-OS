# MAIM launch directive — 15 October 2026

## Founder instruction — supersedes conflicting launch plans
MAIM is the immediate launch priority. Use the owned MAIM website, storefront, books, product access and delivery. Stripe is the selected payment processor and Resend the transactional email provider. Do not launch through Gumroad, Shopify, Kit or an additional paid storefront. Existing historical references are not current implementation authority. Reuse existing code and infrastructure; do not replace the stack or purchase another platform.

Shakti is a separate client system. Its portal, uploads, offers, customers, records, payment links, templates and automations are excluded from MAIM. Shared access or a shared merchant account does not make a client asset a MAIM asset. Do not modify client systems as part of this launch.

## Verified observations in this session
- Major-AI-OS/apps/maim-site is the current site source. The bookstore was loaded in a browser at https://www.majoraimindset.com/shop.
- Vercel major-ai-os reports a READY production deployment dpl_8VeQNsxcBJ2dEa1VfQtqU6ZmtmfB, source commit ca221fc338d6eb92d81f0d61fb57c2027ae04ffe. Main has subsequent commits; READY is not proof of commerce readiness.
- Current pillar-scroll.html still links to Gumroad. LAUNCH_CHECKLIST.md still specifies Kit/Gumroad. These are legacy instructions requiring replacement by the owned Stripe/Resend implementation.
- Live Stripe M.A.I.M. catalog has active MAIM Pillar Scroll and Business Pressure Test + Client System Blueprint products. Emerald Awakening and Pillar Code Vault are inactive. Do not activate unfinished offers.
- All six returned live payment links belong to client offers; none is a verified MAIM book link. Leave client links untouched.
- The live Stripe webhook endpoint list returned zero endpoints. This observation applies to the currently connected live account; sandbox configuration is not established.
- Resend lists majoraimindset.com as verified with sending enabled. Domain verification is not proof of fulfillment or inbox delivery.
- business-pressure-test-scratch-off PR #5, maim/deployment-ready, contains Stripe/Airtable/Resend staging work. Its shared/commerce.ts and stripe-webhook.ts accept only MAIM-BLUEPRINT-001, the USD250 Blueprint. They do not implement book fulfillment.
- Major-AI-OS PR #33 is draft campus/philosophy work. Inspect differences against newer main before merging; preserve newer canonical content.
- Two Upload Here First folders were found. The inspected folder contains Shakti materials and is excluded. MAIM KNOWLEDGE VAULT and MAIM Agent Operating System folders were separately found; no MAIM intake folder has yet been verified.

## Execution order
1. Reconcile existing site and commerce branches against current main; preserve relevant work and verify before merge.
2. Implement owned book catalog and signed Stripe payment handling with product-specific delivery, durable order records, retry safety and protected paid files. Keep Blueprint booking fulfillment distinct.
3. Connect Resend transactional delivery; verify failure/retry handling and recipient access. Record provider acceptance separately from confirmed delivery.
4. Prove end-to-end test checkout, order, email and download. Use matching sandbox credentials for tests. Never simulate a paid state using a return-page query parameter.
5. Configure and verify live endpoints, link only delivery-ready products, merge tested changes and verify the production commit/routes.
6. Then activate MAIM launch outreach and promotional assets using verified destination links and approved recipients.

## Definition of complete
A visitor can discover a ready product, pay through Stripe, receive the correct Resend message, access the purchased asset and get support. Evidence records checkout mode, product, deployment commit, order, webhook outcome and delivery outcome. No secrets or customer data in public documentation.

## Status
Investigation and scope reconciliation completed for the observations above. No checkout migration, fulfillment implementation, PR merge, email campaign, deletion or media move has been performed by this directive. Do not describe this document as a launched commerce system or a running autonomous worker service.
