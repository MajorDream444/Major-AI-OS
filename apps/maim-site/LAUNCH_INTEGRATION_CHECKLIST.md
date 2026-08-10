# MAIM Launch Integration Checklist

This checklist covers the live-service gates for the MAIM Public Sanctuary. It is
intentionally limited to verification and launch readiness. Do not store API keys,
secrets, or private tokens in this repository.

## Kit

- Confirm the free guide product is live:
  `https://maim-the-10-pillars.kit.com/products/5-ai-moves`
- Confirm all Public Sanctuary registration forms submit to the intended Kit
  destination.
- Confirm a real test registration creates the expected subscriber/member record.
- Confirm the MAIM welcome sequence behavior before production traffic.
- Keep Kit API keys in the service that needs them, such as Vercel environment
  variables or Kit itself. Never commit them to Git.

## Gumroad

- Confirm the Gumroad store is live:
  `https://majordream.gumroad.com`
- Confirm the primary Pillar Scroll checkout URL is live and correct before
  replacing store-level CTAs with product-level CTAs.
- Confirm every paid product has the correct file bundle, price, description,
  cover image, and receipt copy.
- Confirm Gumroad return URLs point back to:
  `https://majoraimindset.com/return`
- Run one real purchase test before calling the purchase loop production-ready.

## Current Site Wiring

- `/` sends registration to Kit and embeds the welcome film.
- `/pillars` sends registration to Kit and includes Gumroad purchase paths.
- `/return` sends post-purchase follow-up requests to Kit.
- `/10-pillars` redirects to `/pillars`.
- `/thank-you` redirects to `/return`.

## Production Cutover Gates

- Attach `majoraimindset.com`.
- Attach `www.majoraimindset.com`.
- Verify SSL on both domains.
- Verify clean routes after Vercel deployment.
- Verify mobile rendering at `375`, `390`, and `414` widths.
- Verify no browser console errors on `/`, `/pillars`, and `/return`.
- Verify one real visitor can register, reach an offer, purchase, and return to
  MAIM.
