# MAIM Remotion — ABC Reel Pipeline

Content assembly line for Major AI OS. One template. Three reels. Repeatable forever.

---

## What this builds

| Reel | Theme | Hook |
|------|-------|------|
| A — Activate | Permission / awakening | "Most people are waiting for permission." |
| B — Build | Builder's edge / AI stack | "They ship while others scroll." |
| C — Command | Sovereignty / operator identity | "You are not an employee. You are an operator." |

**Format:** 9:16 · 1080×1920 · 30fps · ~30 seconds · MP4

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Drop your assets into /public/assets/
# See Asset Checklist below

# 3. Open Remotion Studio to preview
npm start

# 4. Render all three reels to /vault/
npm run render:all
```

---

## Asset checklist

Before rendering, add these files to `/public/assets/`:

### Reel A — Activate
- [ ] `reel_a_shot1.jpg` — dark cinematic portrait, dramatic lighting
- [ ] `reel_a_shot2.jpg` — hands at work, movement, or laptop dashboard
- [ ] *(optional)* `reel_a_vo.mp3` — voiceover audio file

### Reel B — Build
- [ ] `reel_b_shot1.jpg` — construction, creation, or build process imagery
- [ ] `reel_b_shot2.jpg` — output/result, finished product, or urban skyline
- [ ] *(optional)* `reel_b_vo.mp3` — voiceover audio file

### Reel C — Command
- [ ] `reel_c_shot1.jpg` — command center, dark workspace, or dashboard
- [ ] `reel_c_shot2.jpg` — global reach, map, or sovereign imagery
- [ ] *(optional)* `reel_c_vo.mp3` — voiceover audio file

> **Image specs:** Any aspect ratio. Remotion scales to cover 1080×1920.
> Minimum 1080px wide. JPG or PNG. Use Higgsfield/Nano Banana exports or Canva exports.

---

## Render commands

```bash
# Render one at a time
npm run render:a        # → vault/MAIM_Reel_A.mp4
npm run render:b        # → vault/MAIM_Reel_B.mp4
npm run render:c        # → vault/MAIM_Reel_C.mp4

# Render all three in sequence
npm run render:all

# Preview in browser (no render, just studio)
npm start
```

---

## Adding voiceover audio

In each reel composition (`MAIMReelA.tsx` etc.), the `MAIMReel` component
accepts audio via the `VideoShot` or a top-level `<Audio>` tag in `MAIMReel.tsx`.

To add audio, edit `MAIMReel.tsx` and add after the imports:

```tsx
import { Audio, staticFile } from 'remotion';

// Inside the component return, before </AbsoluteFill>:
{voSrc && <Audio src={staticFile(voSrc)} />}
```

Then pass `voSrc="reel_a_vo.mp3"` as a prop from each reel composition.

---

## Customise the brand

All colors, fonts, logo text, timing, and dimensions live in one file:

```
src/brand.ts
```

Change `BRAND.colors.gold` → all gold accents update across every reel.
Change `TIMING.shot1In` → shot timing shifts across all reels.

---

## Scale: adding more reels

1. Duplicate `MAIMReelA.tsx` → `MAIMReelD.tsx`
2. Update the content props (letter, headline, shots, captions, CTA)
3. Register in `src/index.ts` with a new `<Composition id="MAIMReelD" ...>`
4. Run `npm run render -- MAIMReelD --output ./vault/MAIM_Reel_D.mp4`

One component. Infinite content.

---

## Vault

Rendered MP4s are saved to `/vault/`. This folder is git-ignored (videos are large).
Upload directly from here to Instagram, YouTube Shorts, Meta Ads Manager, or Gumroad.

---

## Next: connect n8n

Once the pipeline is verified:
- Trigger render via n8n on a schedule or Airtable row creation
- Auto-upload to IG/YouTube via their APIs from n8n
- Route leads from CTA landing page back to AMA MOB OS V2

---

*Built on Remotion 4.x · React 18 · TypeScript · Major AI OS*
