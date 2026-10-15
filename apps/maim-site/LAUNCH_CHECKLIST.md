# MAIM owned-store launch checklist

Updated 15 October 2026. Authority: docs/MAIM_LAUNCH_DIRECTIVE_2026-10-15.md and docs/RETIRED_PLATFORMS_2026-10-15.md. Old Kit/Gumroad gates are superseded.

- [ ] Inventory legacy forms, checkout links, redirects, webhooks, sequences and billing in Shopify/Gumroad/Kit. Export owned assets and order/subscriber/consent/suppression history before closure.
- [ ] Replace legacy site entry points with working owned routes; never invent a successful signup or checkout state.
- [ ] Preserve canonical www.majoraimindset.com and apex redirect.
- [ ] Verify first-party intake and operational records with proper error handling.
- [ ] Use Stripe sandbox credentials consistently; verify webhook signatures, durable orders, idempotency and correct entitlements.
- [ ] Verify Resend delivery, bounce/error handling, retries and usable purchased-file access. Provider acceptance and inbox delivery are distinct.
- [ ] Keep Blueprint booking fulfillment separate from book/digital-asset delivery.
- [ ] Test success, failure, duplicate/retried webhook and unauthorized download paths.
- [ ] Build with python3 maim/build.py; verify routes, mobile rendering, console, canonical metadata and redirects.
- [ ] Verify public pages and generated output have no active Shopify, Gumroad or Kit dependencies.
- [ ] Deploy the tested commit and smoke-test exact production routes; record the commit and deployment evidence.
- [ ] Configure live credentials/endpoints only for delivery-ready products; leave client products and links untouched.
- [ ] Deactivate retired-provider forms, campaigns and checkouts; cancel plans and record receipts after migration checks. Account deletion remains separate.
- [ ] Verify support, returns/refunds and continuing access for earlier customers before account closure.

No checkbox is complete merely because this checklist exists. Real purchase tests require specific authorization. Keep secrets, private records and dashboard screenshots out of this public repository.
