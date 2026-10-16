# MAIM Public Sanctuary

This app contains the deployable MAIM front door currently treated as the Layer 1
Public Sanctuary baseline.

## Provenance

- Source repository: `MajorDream444/Major-OS-AMA-OS--Command`
- Source branch: `claude/maim-ecosystem-wireframe-xk8swp`
- Source commit: `efad5b0`
- Verified production URL: `https://major-ai-mindset.vercel.app`
- Verified deployment: `dpl_GasEpAbMeZnqNfWb3kyMXHzbVmn4`

## Build

From this directory:

```bash
python3 maim/build.py
```

The build emits static files into:

```txt
maim/dist/
```

Vercel is configured by `vercel.json` with:

- Build command: `python3 maim/build.py`
- Output directory: `maim/dist`

## Routes

- `/`
- `/pillars`
- `/return`
- `/return?product=pillar_scroll`
- `/terms` (no-index review draft until owner/legal approval)

Legacy routes:

- `/10-pillars` redirects to `/pillars`
- `/thank-you` redirects to `/return`

## Launch Boundaries

This migration preserves the current public experience. It is not a redesign,
framework migration, Studio implementation, operator implementation, or live
automation expansion.

Open gates before a full production cutover:

- Preserve `https://www.majoraimindset.com` as the V1 canonical domain and keep
  `https://majoraimindset.com` redirecting to `www`.
- Verify Kit registration destination and member-record path.
- Verify the $27 Pillar Scroll Gumroad URL and return behavior.
- Run a real purchase to return to delivery test.
- Decide section-by-section whether this Public Sanctuary or the existing
  Command Room experiment is canonical for the next MAIM front-door release.

For the current V1 revenue-loop gate, use
[`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md).

## Stripe-hosted terms verification

`consent_collection.terms_of_service = required` makes acceptance mandatory in
Stripe-hosted Checkout. Stripe supplies the linked terms destination from the
account's public business details; the Checkout Session API does not accept a
per-session terms URL. Before enabling Preview checkout:

1. approve and publish the immutable terms version;
2. set Stripe TEST mode's public terms URL to the exact `CHECKOUT_TERMS_URL`;
3. create a fresh session through `/api/checkout`;
4. open the hosted Checkout page and confirm its terms link resolves to that
   exact approved URL and displays `CHECKOUT_AGREEMENT_VERSION`;
5. retain a redacted screenshot or browser receipt in Issue #37.

Treat a missing, mismatched, redirected-to-draft, or inaccessible link as a
failed release gate. Keep `CHECKOUT_TERMS_APPROVED=false` until this inspection
can be performed against the approved document.
