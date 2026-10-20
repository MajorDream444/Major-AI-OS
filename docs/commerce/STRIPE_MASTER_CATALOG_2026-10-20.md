# MAIM master Stripe catalog — 20 October 2026

## Outcome
Live Stripe writes succeeded on retry. The previous connector authentication loop is no longer a catalog-creation blocker. No upload workaround was needed.

Created 59 new inactive LIVE products: the Academy journey plus 58 book/catalog/bundle/advisory/vault offers. Together with four untouched existing MAIM products, the register contains 63 MAIM products. Client and Substack entries are excluded from this public register and were not changed.

Read-back returned 70 total account products and 82 prices with no further pages, including separate client/Substack records. The live account still has its original six payment links; zero new live payment links were opened. This is a catalog setup, not an enabled storefront or evidence of completed books.

## Working price schedule
| Offer | USD | Status |
| --- | ---: | --- |
| Academy founding journey | 249 once | Owner-approved amount; product and price archived/inactive |
| Journey campaign variants | 149 / 399 | Reserved inactive alternatives |
| Journey reference amount | 999.99 | Unpublished inactive reference, not an established former selling price |
| Three-session implementation advisory | 450 | Working draft; 3 × 45 minutes, preparation brief, proposed 90-day window |
| Knowledge Vault passes | 49 / 129 / 229 / 399 | Working draft; 1 / 3 / 6 / 12 calendar months, no automatic renewal |
| Ten Pillars single digital books | 9 each | Existing source plan; 10 canonical pillars |
| Ten Pillars focus bundles | 24 each | Existing source plan; Creator Ownership, Resilient Builder, Community Legacy |
| Ten Pillars complete digital collection | 69 | Existing source plan; self-guided collection |
| ABC A–Z digital catalog | 19 | Working draft; optional compilation, free introductory ABC pathway remains |
| ABC catalog plus implementation workbook | 39 | Working draft |
| Lucky Library individual digital volumes | 9 each | Working draft; 27 provisional catalog entries |
| Lucky Library three-volume bundles | 24 each | Working draft; 9 source-defined bundles |
| Lucky Library complete digital collection | 149 | Working draft; all 27 volumes, not a pre-order |
| Existing Client System Blueprint | 250 | Untouched historical live record; distinct from the journey |
| Existing Pillar Scroll / Emerald Awakening / Pillar Code Vault | 27 / 97 / 297 | Untouched historical records; release status is not certified |

Prices are USD one-time catalog amounts. Tax treatment, release dates, refund/service terms and delivery readiness must be finalized before customer checkout. Physical editions and institutional licenses are not included or invented here. The source-proposed Ten Pillars guided cohort and historical meditation/music add-on remain outside this batch; reconcile actual assets and calendar before expanding further.

## Exact records
- data/commerce/stripe-master-catalog-2026-10-20.json: all 63 titles, descriptions, SKU ownership, actual live product/price IDs, source and release state.
- data/commerce/stripe-master-catalog-2026-10-20.csv: flat operator register for review. This is an export, not a claim that Stripe accepts an upload of this format.
- Individual products can be opened in the live Stripe dashboard with https://dashboard.stripe.com/products/ followed by the product ID. New products are inactive/archived, so use that filter in the catalog.

## Source and scope
Ten Pillars names: MajorDream444/MAIM_10_Pillars/public/catalog.json.
Book prices, bundle composition and production limits: books/PRODUCTION_AND_COMMUNITY_PLAN.md in that repo. Pillar 09 has two approved cover concepts but is one book; no duplicate product was created for those covers.
ABC concepts: MajorDream444/Major-AI-OS/data/abc/maim-abc-database.json and its README. It is seed content, not proof of final paid files.
Lucky volumes/bundles: MajorDream444/MAIM-LUCKY-LIBRARY/docs/27-VOLUME-MASTER-MATRIX.md. A-C are first-release development; D-Z are working principles, and the atlas mechanics are unfinished. Product titles are clearly labeled working catalog labels, not invented finished manuscripts.
Advisory/vault/journey: owner conversation and the Academy offer record.

All new product descriptions explicitly say they are catalog drafts and not available for purchase. Advisory and vault price gaps are now filled with working amounts in Stripe; this does not silently adopt final cancellation, refund or delivery policies.

## Verification
All 58 newly created book/advisory/vault/catalog products were matched against Stripe by stable ID. Their descriptions, default USD one-time price amounts and inactive product state match the register. The four journey price IDs were read back with correct amounts and inactive state. The 11 pre-existing account products had no differences in name, description, active status, default price or metadata. Existing six live payment links remain.

The journey has no Stripe default_price because its US$249 live price is archived. Setting it as default returned a Stripe error requiring price activation. Automatic approval review rejected unarchiving that live price because enrollment remains closed and activation was not authorized. No workaround was used. The product metadata and register identify the founding offer; price activation/default assignment is a separate launch action.

## Marketing rules
Use “Founding offer — US$249 once.” Do not advertise “was US$999.99”, a fabricated percentage saving, finished books, unlimited coaching, lifetime vault service or guaranteed business results. New catalog prices are unpublished working amounts until each actual deliverable and offer is released.

## Next implementation
1. Review the register and reconcile old Pillar Code Vault with the new fixed-term Knowledge Vault so entitlements do not overlap accidentally.
2. Finish and approve source files, rights, age pathways and descriptions per offer; publish a precise included-assets list.
3. Implement authenticated purchase/access, durable orders, refunds/retries, protected downloads and Resend delivery on the canonical MAIM database.
4. Run real test purchases and delivery for the first release-ready products; local unit tests are insufficient.
5. Select the release-ready subset, approve terms/availability/tax treatment, then authorize activation and checkout publication. Do not open every catalog draft at once.

## Copy and paste — Codex
Read this register and JSON. Use existing stable product IDs; do not recreate them. Keep the 59 new products inactive. Implement fulfillment only for the first reviewed release-ready offers. Preserve client/Substack records and all old prices. The Academy live founding price remains archived after automatic approval review rejected activation; no activation workaround is authorized. Test end to end before proposing a concrete checkout release.

## Copy and paste — Cowork
Review the 63-offer catalog by actual asset readiness, not catalog existence. Prioritize the first finished books and journey pilot. Collect final file versions, permissions, format, entitlement, delivery owner and remaining terms for each. Do not claim all 27 Lucky manuscripts or the ten Pillars manuscripts are finished, publish discount claims or send live links.

## Rollback
No production code, domains or customer orders were changed by this catalog setup. New products are already archived/inactive and no new live links exist. Retain IDs and receipts for reconciliation. Do not delete products, prices or existing records as a cleanup shortcut.
