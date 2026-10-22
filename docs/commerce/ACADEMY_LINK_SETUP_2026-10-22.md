# Academy founding cohort — payment link setup

Link `plink_1UTCv1BaiziDnHMm5khsHi4K` · https://buy.stripe.com/cNi28q73ZdBbd2o9W9afS06
Live, active, automatic tax on. Verified 22 October 2026.

## First: there are now two Academy products

| Product | State |
|---|---|
| `prod_VUBHrWCb7jCHO7` "MAIM MINDSET ACADEMY COHORT" | **new** · price `price_1UTCucBaiziDnHMmPHI1BFri` $249 active · **has the live link** · no description, no metadata |
| `prod_MAIM_ACADEMY_JOURNEY_V1` | Codex-built · full metadata · in the git register · active but `default_price` null · **no link** |

One offer, two SKUs. The git catalogue points at the second; money will arrive through
the first. Reconcile before selling.

**Recommendation: keep `prod_VUBHrWCb7jCHO7`.** It already works — don't disturb a live
link to save a record. Enrich it with the fields below, archive
`prod_MAIM_ACADEMY_JOURNEY_V1`, and repoint the register.

## Description — paste into `prod_VUBHrWCb7jCHO7`

> The founding cohort. Thirty days building one useful, repeatable workflow around a real
> problem in your business — not an AI course, and not theory. Four live implementation
> sessions on 11, 18, 25 November and 2 December, plus one 45-minute private session with
> Major Dream Williams to use within 90 days. Session replays included. Capped at 20
> people for the founding run. Founding offer, US$249 once.

Never write "was US$999.99" or any percentage saving. No former price was established.

## Metadata — tag the product

| Key | Value |
|---|---|
| `sku` | `MAIM-ACADEMY-JOURNEY-001` |
| `business` | `MAIM` |
| `brand` | `MAIM` |
| `category` | `academy_journey` |
| `cohort_capacity` | `20` |
| `cohort_run` | `founding-2026-11` |
| `group_days` | `30` |
| `session_dates` | `2026-11-11,2026-11-18,2026-11-25,2026-12-02` |
| `private_session_minutes` | `45` |
| `private_session_window_days` | `90` |
| `audience` | `existing_practitioners_and_business_owners` |
| `fulfillment` | `human_delivery` |
| `launch_status` | `founding_cohort_open` |

Reusing `MAIM-ACADEMY-JOURNEY-001` keeps the SKU continuous with the register.

## Four changes to the link itself

**1. Cap the cohort automatically.** Set `restrictions.completed_sessions.limit = 20`.
Stripe then stops accepting payments at 20 seats. This is the difference between a cap
you enforce by hand and one that cannot be oversold — do this before any traffic.

**2. Require terms.** `consent_collection.terms_of_service` is `none`. Set it to
`required` with `https://majoraimindset.com/terms`. Terms are already published, and the
refund window, 48-hour prep brief and 24-hour reschedule rule need acceptance on record.

**3. Write the confirmation message.** `after_completion` shows Stripe's default. Use:

> You're in the founding cohort. Within 24 hours you'll get your session calendar for 11,
> 18, 25 November and 2 December, plus your preparation brief — due 48 hours before your
> private session. Bring a real problem. Questions: contact@majoraimindset.com

**4. Collect the problem at checkout.** Add a custom field:
*"What is the one business problem you want to work on?"* — optional, long text. Twenty
answers before the first session is the best preparation material available, and it costs
the buyer ten seconds.

## Already correct

Automatic tax on with self liability · currency USD · one-time $249 · quantity fixed at 1
· customer creation if required. The old Shakti and Josie client links now read
`active: false`.

## Still open

The $250 Business Pressure Test and canon's $497 / $750 Spark Lab–STB sprint tiers are
unreconciled. They may be one diagnostic feeding a paid sprint, or duplicate pricing for
the same work. Resolve before both are promoted.
