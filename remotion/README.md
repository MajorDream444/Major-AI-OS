# MAIM Remotion Studio

This directory is the programmable video layer for Major AI Mindset.

Use it to render reusable branded videos from structured data.

## First Template

`ABCReel`

Purpose:

- Instagram Reels
- YouTube Shorts
- Meta ads
- Gumroad promos
- webinar clips

Specs:

- 1080 x 1920
- 30fps
- 20–30 seconds
- MAIM black/gold/green/blue/orange visual system
- Brand-safe title, captions, and CTA

## Local Commands

```bash
cd remotion
npm install
npm run dev
npm run render:abc
```

## Data Flow

```txt
src/data/abc-sample.ts
  -> src/compositions/ABCReel.tsx
  -> Remotion Studio
  -> MP4 render
  -> Google Drive / MAIM 10 Remotion Content Engine
```

## Drive Vault

Use this Google Drive folder for media handoff:

`MAIM 10 Remotion Content Engine`

Folder ID:

`1daJkldeZlofdMxpMe6a7Xgx132QLveWq`

## Build Principle

One template working beats ten templates imagined.

Start with A, B, C.
