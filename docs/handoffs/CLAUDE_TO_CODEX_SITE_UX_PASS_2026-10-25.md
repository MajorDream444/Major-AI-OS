# Handover: site UX pass + cohort teaser (25 Oct 2026)

> **Schedule superseded by the later founder decision:** payments open Nov11
> after release approval; official cohort start Nov18; Nov4 removed. Read
> [MAIM_ACADEMY_LAUNCH_REVISION_2026-10-25.md](MAIM_ACADEMY_LAUNCH_REVISION_2026-10-25.md).
> Dates/countdown/teaser observations below preserve the earlier implementation
> history and must not be reused as the current launch schedule.

**From:** Claude Code · **To:** Codex (pick up anything not ticked)
**Approved by Major, 25 Oct:** "Let's do it all." Two stages: fixes first, teaser right after.
Rules: use the UI/UX Pro Max skill (`MajorDream444/ui-ux-pro-max-skill`,
`.claude/skills/ui-ux-pro-max/SKILL.md`). Colours only from `data/design-tokens.json`.

## The ecosystem rule (Major, 25 Oct)

majoraimindset.com is the one doorway. Everything we build sits under it as a
subdomain: academy., library, vault and so on. No new domains until the audience
demands one. The other two live sites, amasoulagi.com and majordreamwilliams.com,
are separate ecosystems and are not part of this pass.

## Where things stand

- The Academy is at **academy.majoraimindset.com** (Vercel project `maimacademy`,
  repo `MajorDream444/MAIMACADEMY`). The domain has been added in Vercel, but
  **the DNS is on Cloudflare**, and Major is adding the records himself:
  CNAME `academy` → `201f9f4de56d1296.vercel-dns-017.com` (DNS only) and
  TXT `_vercel` → `vc-domain-verify=academy.majoraimindset.com,c10237e6d00ec330fff9`.
- **Reservations are open; payment opens 11 Nov.** `/reserve` on the Academy
  posts to `www.majoraimindset.com/api/subscribe` with `cohort: true`, which
  sends the person to the Resend cohort segment. CORS allows the Academy origin
  only. On 11 Nov the people on that list get a Stripe payment link first.
  A production `STRIPE_SECRET_KEY` exists on the `major-ai-os` project.
  **Not built yet:** the 11 Nov payment-link send.

## Stage 1: UX fixes (main site `apps/maim-site`, plus the Academy)

Audit findings (live site, 25 Oct):
1. Nav text was 12px in tracked capitals on Home and Pillars, 13px on Shop, 16px on Campus.
2. Library, Vault and Coaching had no menu, and the Pillars logo went to `#top`, not home.
3. Elements looked clickable but did nothing: the A·B·C cards and locked letter
   chips, the Pillar cards, the Library and Campus tiles, and Shop's "future" cards.
4. **There was no menu at all on mobile**, only "Reserve Seat".
5. Nothing on the first screen pushed the cohort.

The fix, with each part ticked when it lands on main:
- [x] One shared site header injected by `maim/build.py` into every page,
      replacing each page's own bar. Logo → home, 16px links, a mobile menu
      button, and a "Reserve your spot" CTA to academy /reserve.
- [x] One shared footer nav on every page.
- [x] A cohort slide-up card 2s after landing: live countdown to 2026-11-11T14:00Z,
      20 spots, $249, Reserve → academy /reserve. It can be dismissed (remembered),
      respects reduced motion, and never blocks the page. Not shown on
      return/checkout/terms/privacy.
- [x] Every element that looks clickable goes somewhere; anything that can't
      loses the clickable styling.
- [ ] The same nav rules on the Academy site (`MAIMACADEMY/scripts/build.mjs`).
- [ ] Before and after screenshots at desktop 1440 and phone 390.

Stage 1 notes: the shared chrome lives in `apps/maim-site/maim/site-chrome.{css,js}` and is injected by
`site_chrome()` / `strip_page_nav()` in `maim/build.py`. It uses `div[role]`, not `header`/`nav`/`footer`,
so the pages' own element selectors don't restyle it.

## Stage 2: the cohort teaser (motion graphic)

- [x] 8 seconds, Remotion (`remotion/` in this repo), 1920×1080 and 1080×1920.
      Beats: "Founding cohort" → "20 spots" → "Starts 11 November" → badge →
      "Reserve your spot". Tokens only. The Academy badge is
      `MAIMACADEMY/assets/brand/MD-Academy-Badge-Transparent.png` and must never
      be redrawn. If footage is used, it's Major's real footage only.
- [x] Plays in the home hero (muted, looping, with a poster frame, and paused
      under reduced motion) and in the slide-up card on desktop.

Stage 2 notes: compositions are `CohortTeaser` (1920×1080) and `CohortTeaserVertical`
(1080×1920) in `remotion/src/compositions/CohortTeaser.tsx`. Render with
`npx remotion render src/index.ts CohortTeaser out/x.mp4 --browser-executable=<chrome-headless-shell>`.
The web copy is `apps/maim-site/maim/assets/cohort-teaser.mp4` (1280×720, about 250 KB) plus a poster.
On the home page the slide-up card waits until the teaser scrolls away, so only one
call to action shows at a time. Still open: put the teaser in the slide-up card on
other pages, the Academy site's own nav pass, the 11 Nov payment-link send, and
using the vertical cut for Instagram and Shorts.

## Guardrails

- Never synthesise Major's likeness. Never redraw the MD mark or the badge.
- Never commit secrets. Stripe stays off until the 11 Nov send is built and approved.
- The pages are fragments wrapped by `maim/build.py`; edit the fragment and run `npm run check` in `apps/maim-site`.
