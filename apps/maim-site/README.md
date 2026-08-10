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

Legacy routes:

- `/10-pillars` redirects to `/pillars`
- `/thank-you` redirects to `/return`

## Launch Boundaries

This migration preserves the current public experience. It is not a redesign,
framework migration, Studio implementation, operator implementation, or live
automation expansion.

Open gates before a full production cutover:

- Attach `majoraimindset.com` and `www.majoraimindset.com`.
- Verify Kit registration destination and member-record path.
- Verify Gumroad return URLs.
- Run a real purchase to return to delivery test.
- Decide section-by-section whether this Public Sanctuary or the existing
  Command Room experiment is canonical for the next MAIM front-door release.
