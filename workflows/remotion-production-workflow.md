# Remotion Production Workflow

This workflow turns MAIM content into reusable rendered video.

## Phase 1 — Prepare the Asset

For each video, collect:

- Letter / campaign name
- Hook
- Big idea
- Lesson
- CTA
- Source footage or images
- Voiceover
- Logo / seal
- Platform target

## Phase 2 — Place Media in Drive

Use the Drive Vault:

`MAIM 10 Remotion Content Engine`

Folder rules:

- Raw generated clips go in `01-source-footage`.
- Narration goes in `02-voiceovers`.
- Draft MP4s go in `03-renders`.
- Approved platform-ready exports go in `04-final-exports`.
- Logos, founder references, and visual references go in `05-reference-assets`.

## Phase 3 — Update Data

Put the copy and metadata into a structured data file.

For the first build, use:

`remotion/src/data/abc-sample.ts`

Later, migrate to:

- `content/abc/beginner/*.md`
- `data/abc-beginner.json`
- Airtable sync

## Phase 4 — Render

```bash
cd remotion
npm install
npm run dev
npm run render:abc
```

## Phase 5 — Review

A render passes if:

- The message is clear in 5 seconds.
- Text is readable on mobile.
- Colors match MAIM.
- CTA is simple.
- No generic AI visuals dominate.
- The human lesson leads.

## Phase 6 — Export + Log

Upload approved render to:

`04-final-exports`

Then log:

- title
- date
- platform
- source files
- final export link
- status
- next repurpose action

## First Sprint

1. Install the Remotion scaffold.
2. Open `ABCReel` in Remotion Studio.
3. Render A = Awareness.
4. Replace sample visuals with real source footage.
5. Render A/B/C as first batch.
6. Post one, archive all three.

One brick. Then the wall.
