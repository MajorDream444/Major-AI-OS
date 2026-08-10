# MAIM V1 Launch Checklist

This checklist covers the live-service gates for the MAIM V1 Public Sanctuary.
It separates technical QA from Major's commercial approval. Do not store API
keys, secrets, purchase credentials, private tokens, or dashboard screenshots in
this repository.

## V1 Revenue Loop

```txt
Visitor
-> MAIM
-> Welcome / trust
-> Kit registration
-> Pillars
-> $27 Pillar Scroll
-> Gumroad
-> MAIM Return
-> Next MAIM action
```

## Canonical URLs

- Production canonical domain: `https://www.majoraimindset.com`
- Apex behavior: `https://majoraimindset.com` redirects to `www`
- Pillars route: `https://www.majoraimindset.com/pillars`
- Return route: `https://www.majoraimindset.com/return`

## Live Destinations

- Kit registration destination:
  `https://maim-the-10-pillars.kit.com/products/5-ai-moves`
- V1 paid product:
  `https://majordream.gumroad.com/l/hsyotb`
- Welcome film:
  `https://youtu.be/OZ10QdrUxl8`

## Technical QA

- Build passes with `python3 maim/build.py`.
- No source or built route links to broken `/quiz`.
- `/`, `/pillars`, and `/return` load cleanly.
- `/10-pillars` redirects to `/pillars`.
- `/thank-you` redirects to `/return`.
- Mobile rendering passes at `375`, `390`, and `414` widths.
- Browser console is clean on `/`, `/pillars`, and `/return`.
- Generated canonical, Open Graph, sitemap, and robots URLs use `www`.

## Major Approval Gates

- Run one Kit registration test.
- Confirm the subscriber/member appears in Kit.
- Authorize one $27 purchase test.
- Confirm purchase appears in Gumroad.
- Confirm product delivery works.
- Confirm Gumroad returns to MAIM.
- Approve public launch status.

## Deferred From V1

- Studio
- Operator console
- Archetypes
- Diagnostic engine
- Custom checkout
- CRM
- ManyChat
- Airtable expansion
- Premium welcome film
- Buzz automation
