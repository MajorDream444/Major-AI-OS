# MAIM 01 — Instagram Launch Grid · Export Package

Major AI Mindset · `@major_ai_mindset`
A 9-post Instagram launch grid + 2 story/reel variants + a grid preview, built as fixed
1080-px artboards that export to production-ready PNGs.

---

## What's in this package

```
maim-01-instagram-launch-grid-export-package/
├── MAIM Asset Exporter.html      ← open this in a browser
├── README.md                     ← you are here
├── assets/
│   ├── maim-mark.png             ← official MD crown-pin mark, cropped to a clean circle (used on every artboard)
│   └── the-one-crown-pin-original.png  ← the original uploaded logo (source, for reference)
├── fonts/
│   ├── anton-latin.woff2         ← headlines
│   ├── manrope-latin.woff2       ← body / labels (variable, weights 200–800)
│   └── cormorant-italic-latin.woff2  ← italic serif taglines
└── lib/
    └── html-to-image.js          ← the renderer that turns each artboard into a PNG
```

All CSS and the page JavaScript are inline inside `MAIM Asset Exporter.html`. The only external
JavaScript is `lib/html-to-image.js` (bundled locally — no internet needed).

---

## How to open & export

1. Unzip this folder anywhere, keeping the structure above intact (the HTML references
   `fonts/`, `lib/`, and `assets/` by relative path).
2. Double-click **`MAIM Asset Exporter.html`** to open it in any modern browser
   (Chrome, Edge, Safari, Firefox). It works fully offline.
3. You'll see all 12 artboards as thumbnails. To export:
   - **One asset:** click the gold **⬇ Download PNG** button under it.
   - **Everything:** click the green **⬇ DOWNLOAD ALL 12 ASSETS** button at the top.
     They download one-by-one with the correct filenames.
4. If your browser asks where to save or blocks multiple downloads, allow downloads for
   this local file (or export them one at a time).

> **Tip:** the first render of a session warms the font cache; if a headline ever looks like a
> plain system font, click the button once more — the second render is always correct.

---

## The 12 assets & exact dimensions

| # | Filename | Size |
|---|----------|------|
| 1 | `01-maim-ai-not-just-tech-people.png` | 1080 × 1350 |
| 2 | `02-maim-a-awareness.png` | 1080 × 1350 |
| 3 | `03-maim-free-webinar.png` | 1080 × 1350 |
| 4 | `04-maim-b-belief.png` | 1080 × 1350 |
| 5 | `05-maim-ai-for-real-problems.png` | 1080 × 1350 |
| 6 | `06-maim-c-context.png` | 1080 × 1350 |
| 7 | `07-maim-a-z-roadmap.png` | 1080 × 1350 |
| 8 | `08-maim-3-things-ai-can-do.png` | 1080 × 1350 |
| 9 | `09-maim-why-im-building-this.png` | 1080 × 1350 |
| 10 | `story-01-maim-intro.png` | 1080 × 1920 |
| 11 | `story-03-free-webinar.png` | 1080 × 1920 |
| 12 | `maim-launch-grid-preview.png` | 1128 × 1398 |

Publishing order is 01 → 09; pin posts **01, 02, 03** to the top row.
Webinar time is shown as **Sat Jun 27 · 7:00 PM ET** and **Sun Jun 28 · 7:00 AM Bali / WITA**.

> **No PNGs are pre-generated in this package** — by request, the files are produced fresh from
> the exporter so you can review each one before publishing.

---

## The rendering fix (why the earlier PNGs broke)

The earlier exports overlapped because the headline font (**Anton**) was being pulled from
Google Fonts at render time. When the PNG renderer rasterized a board, it couldn't always embed
that cross-origin font in time, so headlines fell back to a wide system font — which overran the
layout and crashed into the body copy.

**Fix:** all fonts are now **self-hosted inside this package** and referenced same-origin via
`@font-face`. The renderer embeds them deterministically every time, so the exported PNG matches
the on-screen artboard exactly. Each board is also a fixed 1080-px artboard (no responsive
browser scaling) with a flex layout that keeps headline, subcopy, CTA, and footer in separate,
non-overlapping zones.

---

## Brand notes (do not redraw)

- **Logo:** `assets/maim-mark.png` only — the official MD crown-pin mark. Never rebuild it with type.
- **Palette:** Foundation black `#050505`, Gold `#D8AF55`, Jamaican green `#2E9A4F` / `#1F7A3A`,
  Knicks blue `#006BB6` / `#3a93e0`, Cream `#F7F4EA`.
- **Tri-bar device:** green · gold · blue.
- **Fonts:** Anton (headlines), Manrope (body), Cormorant Garamond italic (serif taglines).

---

## Editing the artboards

Open `MAIM Asset Exporter.html` in a code editor. Each artboard is a `<div class="board …">`
block with inline styles at true 1080-px scale. Edit copy or styling there, save, refresh the
browser, and re-export. The thumbnails are just the same boards shown scaled down — the export
always renders at full resolution.
