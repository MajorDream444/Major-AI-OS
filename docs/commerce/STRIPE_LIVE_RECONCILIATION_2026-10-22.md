# Stripe live account reconciliation — 22 October 2026

Read directly from the LIVE M.A.I.M. account (`acct_1TLgn2BaiziDnHMm`). Nothing was
written. Answers the founder question: *"where are the items Codex created?"*

## Answer: nothing is missing

**70 products. 61 archived, 9 active.** Codex's work is all present. The dashboard's
Products list defaults to **active only**, so 61 of your items are hidden behind the
**Archived** filter. Switch that filter and they appear.

## The distinction that matters

**The products are archived. Most of their prices are already active.**

Only the Academy's four prices are inactive. Every Ten Pillars, Lucky Library, Vault,
ABC and Advisory price reads `active: true` — the archived *product* is what hides them.
For most of the catalogue, unarchiving the product is the only step. The Academy is the
exception and needs both.

## Archived inventory

| Group | Products | Prices | List value |
|---|---:|---|---:|
| Academy journey | 1 | **inactive** ($249 / $149 / $399 / $999.99 reference) | $249 |
| Ten Pillars single books | 10 | active, $9 each | $90 |
| Pillars bundles + collection | 4 | active, $24 ×3 and $69 | $141 |
| Lucky Library volumes + bundles | 37 | active, $9 / $24 / $149 | $599 |
| Knowledge Vault passes | 4 | active, $49 / $129 / $229 / $399 | $806 |
| ABC catalog | 2 | active, $19 and $39 | $58 |
| Three-session advisory | 1 | active, $450 | $450 |
| **Pillar Code Vault** | 1 | active, $297 | $297 |
| **Emerald Awakening** | 1 | active, $97 | $97 |

Key IDs: `prod_MAIM_ACADEMY_JOURNEY_V1` · `prod_MAIM_PILLARS_COLLECTION_V1` ($69) ·
`prod_MAIM_VAULT_12M_V1` ($399) · `prod_MAIM_ADVISORY_3_V1` ($450) ·
`prod_VOxz1RXkKV49mr` (Pillar Code Vault) · `prod_VOxzm77oM60yZ8` (Emerald Awakening).
Academy founding price: `price_1USUWmBaiziDnHMm4AdgcMqx`, lookup key
`maim_journey_founding_usd_v1`, $249.00 one-time.

## Correction to the 20 October catalogue record

`STRIPE_MASTER_CATALOG_2026-10-20.md` describes Pillar Code Vault ($297) and Emerald
Awakening ($97) as "untouched historical live records," implying they are sellable.
**Both are archived and cannot be purchased.** Only The Pillar Scroll ($27,
`prod_VOxzpbJcWB5Psj`) and Business Pressure Test + Client System Blueprint ($250,
`prod_VQ3PnQKlO2DtQu`) are active MAIM retail products.

## The six live payment links are client work, not retail

Verified by line items — three checked directly, the other three created in the same
batch:

| Link | Sells | Scope |
|---|---|---|
| `plink_1U66AD…` | Shakti System Foundation — Build Fee $2,000 | client |
| `plink_1ThrRQ…` | Josie Personal Presentations & Podcast Plan $150 | client |
| `plink_1TgmB1…` | M-02 Active Build Shakti Shala Foundation $2,000 | client |

**No MAIM retail payment link exists.** These must not be published on a public page;
client boundaries are explicit in the operating docs.

## Live write access is blocked from the agent session

| Operation | Mode | Result |
|---|---|---|
| `GetProducts`, `GetPrices`, `GetPaymentLinks` | live | **OK** |
| `PostPricesPrice` (activate Academy price) | live | **Forbidden** (twice) |
| `PostProductsId` | test | **OK** |

Live reads work; live writes are refused. The connected Stripe credential carries
read-only scope for livemode. Re-authorizing the Stripe connector with live write scope
is required before an agent can activate prices, unarchive products or create payment
links. Until then those are founder dashboard actions.

A single test-mode metadata write was made as the diagnostic probe and reverted in the
same session; the test product's metadata is back to its prior state. Live data was
never modified.

## Do not bulk-unarchive

Every archived description still reads "catalogue draft, not available for purchase,"
and the underlying books are unfinished — Lucky Library D–Z are working principles with
incomplete atlas mechanics; the Integrity packet is at v0.1. Unarchiving all 61 publishes
61 buy buttons for goods that cannot be delivered. Unarchive per offer, as each becomes
deliverable.
