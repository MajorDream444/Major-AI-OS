# Ecosystem audit — 22 October 2026

Independent review of the five days 17–22 October, covering Major-AI-OS, the
wider repository estate, Supabase, Vercel and Stripe. Read-only except where
noted. Verified claims are separated from reported claims; where this session
could not reach a system, that is stated rather than inferred.

## 1. Headline

Volume is real and the documentation discipline is good. **86 commits** landed on
`Major-AI-OS` main, PRs **#38–#56**, plus **17 repositories** with activity. The
work is coherent: it consolidates databases, registers the commerce catalogue,
locks the Integrity book design, and adds a creative studio catalogue app.

Nothing is selling. Production commerce remains hard-blocked, and that is
verifiable from configuration rather than taken on trust (§5).

## 2. What was verified independently

| Claim | Source | Verdict |
|---|---|---|
| 59 new LIVE Stripe products, all inactive | `STRIPE_MASTER_CATALOG_2026-10-20.md` | **CONFIRMED** — live account returns 70 products, 59 created in window, 61 inactive / 9 active; all 9 active are pre-existing |
| Zero new live payment links; six originals intact | same | **CONFIRMED** — exactly 6 live links, none new |
| Production checkout disabled | several | **CONFIRMED by absence** — see §5 |
| AMA Supabase account binding | `MAIM_DATABASE_CONSOLIDATION` says "verify, do not guess" | **NOW VERIFIED** — see §4 |
| MAIM Ecosystem project state | same | **NOT VERIFIABLE HERE** — see §4 |

## 3. What actually shipped

**New app — `apps/maim-creative-studio-catalogue`.** React/Vite asset catalogue
with Supabase-backed session bootstrap, workspace-scoped reads, a preview policy
layer and its own test suite. Backed by a new `/api/catalogue` endpoint and
`lib/catalogue.ts` in the site app.

**Database.** `supabase/` is now a real tree: `config.toml`, forward migrations,
rollbacks, tests, `MIGRATION_STREAMS.md` and `project-inventory.json`. Hosted
history was reconstructed byte-for-byte from the hosted ledger. Operations moved
to **plugin-only**; CLI login/link/push is retired.

**Commerce.** 63 MAIM offers registered with live Stripe IDs, exact records in
`data/commerce/`. Pricing schedule from $9 single books to $249 Academy founding
journey. All catalogue drafts, explicitly not purchasable.

**Books (Integrity Collection).** Design lock approved for three editions —
*The Architecture of Integrity* (18+), *The Integrity Code* (13–17),
*The Truth Compass* (7–12) — each retaining two cover directions. A reusable
repository skill at `.agents/skills/maim-integrity-publishing-design/` carries
canon, release policy, a cover builder and asset verification. Identity rules are
strict: supplied MD-over-woven-hat mark and real author portrait only, no
generated substitutes.

**Website.** Terms and privacy pages now exist (`terms.html`,
`terms-2026-10-16.2.html`, `privacy.html`) — previously a checkout blocker.
Founder portrait added, footer wired to the Ten Pillars collection. Typography
rebalanced (merged from this session's branch).

**Three-business model.** MAIM / AMA Solutions / Major Dream adopted as reporting
umbrellas, with four scheduled reviews replacing a sprawl of older schedules.

## 4. Supabase — the three-account picture

The Oct 21 owner update **does** establish the three boundaries you described:
MAIM, AMA and Major Dream. It also says the AMA and Major Dream plugin bindings
were unverified. One of those is now closed:

- **AMA = organization `btbduqtzvonlycxgrxbl` ("ART MOB AGINTS")**, holding four
  projects — MAIM-52 in 52, Optionality, MAJORPRIMEOS_OPENCLAW, Money-Temple.
  **All four are INACTIVE.**
- **MAIM Ecosystem (`njpdlomvyalxrkluaige`)** is the canonical target for all MAIM
  work, with nine RLS-enabled tables in a private `maim` schema.
- **Major Dream** binding remains unverified.

**Limitation:** the Supabase connector in this session reaches only the AMA
organization. It cannot see `njpdlomvyalxrkluaige`. Every statement about the
canonical MAIM database in this audit is therefore *reported*, not verified by me.

**Cost constraint worth planning around:** six projects are inactive and a restore
was refused because the account is at its two-active-free-project limit. A
three-account model with live databases in each will need paid capacity.

## 5. Production commerce — NO-GO, verified by configuration

`checkoutReady()` requires eighteen conditions. At **production** scope the
following variables **do not exist at all**:

`CHECKOUT_TERMS_URL` · `CHECKOUT_AGREEMENT_VERSION` · `STRIPE_MODE` ·
`STRIPE_WEBHOOK_SECRET` · `STRIPE_BLUEPRINT_PRICE_ID` · `AIRTABLE_BASE_ID` ·
`AIRTABLE_ORDERS_TABLE_ID` · `AIRTABLE_CONTACTS_TABLE_ID` · `RESEND_FROM_EMAIL` ·
`APP_ORIGIN` · `BLUEPRINT_BOOKING_URL` · `SUPPORT_EMAIL`

`checkoutReady()` cannot return true in production. This is a stronger guarantee
than a feature flag, and it does not depend on reading any secret value.

**Warning before branch cleanup:** every TEST commerce variable above is
**branch-scoped to `codex/maim-owned-commerce-sprint-v2`** — including the Stripe
TEST webhook secret, price ID, Airtable table IDs and `APP_ORIGIN`. That branch is
merged and appears on the safe-to-delete list. Deleting it does not erase the
variables, but it retires the only preview environment where TEST checkout is
wired. Stand up the replacement preview environment before deleting it.

## 6. Branch estate — 33 branches, resolved

Every branch was compared against `main` by file content, not commit count.

- **21 fully merged** — safe to delete.
- **12 "unmerged"** by commit count, but on inspection **11 are stale duplicates**:
  their 45–183 differing files are *older* versions of files main has since moved
  past. Exactly **one file in the entire set exists nowhere on main**:
  `docs/architecture/hanzo-legacy-media-engine.md` (434 lines, July 7 vision
  capture, marked "Do not hand this to Codex yet"), present on both
  `ideas/hanzo-legacy-media-engine` and `docs/maim-decision-records`.
- `feature/maim-shop-v1` has **no merge base** with main (unrelated history). Its
  one absent file, `supabase/migrations/0001_registrations.sql`, is preserved on
  main at `supabase/legacy/registrations/0001_registrations.sql`.

**Conclusion: cherry-pick that one vision document, then all 33 branches except
`main` can be deleted without losing any work.**

## 7. Open items

1. **Major Dream Supabase binding** is still unverified; do not guess it.
2. **Paid Supabase capacity** blocks a genuine three-account runtime.
3. **TEST preview environment** must be rebuilt off the sprint-v2 branch (§5).
4. **Pillar Code Vault vs Knowledge Vault** entitlement overlap is flagged in the
   Stripe register and unresolved — two products can grant the same access.
5. **Six live payment links carry no terms-of-service consent collection.**
6. **Academy $249 price is archived**, so the product has no `default_price`;
   activation is a separate deliberate step.
7. **No real test purchase has completed.** Local unit tests are not evidence.

## 8. Audit limitations

Egress from this session is allowlisted: no page of any deployed site was
fetched, so all site findings come from source. Supabase reachability is limited
to the AMA organization. Secret *values* are never readable — existence and scope
only. No production mutation, deployment, migration or live Stripe write was
performed.
