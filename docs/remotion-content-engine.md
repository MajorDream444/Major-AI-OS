# Remotion Content Engine

Remotion is the programmable video layer for Major AI Mindset.

It turns MAIM scripts, visuals, AI-generated clips, voiceovers, and brand assets into repeatable MP4 outputs for Instagram Reels, YouTube Shorts, Meta ads, Gumroad promos, webinar intros, and course clips.

This is not the whole content system.

It is the assembly line.

## Current Drive Vault

Parent folder:

- Google Drive: `MAIM 10 Remotion Content Engine`
- Folder ID: `1daJkldeZlofdMxpMe6a7Xgx132QLveWq`

Subfolders:

- `01-source-footage` — Higgsfield, Nano Banana, Veo, Omni, Flow, Sora-style source clips
- `02-voiceovers` — AI voice, founder voice, narration, podcast excerpts
- `03-renders` — draft MP4 renders from Remotion
- `04-final-exports` — approved platform-ready outputs
- `05-reference-assets` — logos, founder photos, crown references, roadmap visuals, style references

## First Build Target

Build one template first:

`MAIM ABC Reel Template`

Specs:

- Format: 9:16 vertical
- Duration: 20–30 seconds
- Resolution: 1080 x 1920
- Intro: MAIM seal reveal
- Body: letter title, one lesson, two visual shots, captions
- Outro: CTA + logo + tagline

## First Test Batch

Use A, B, C as the first data set.

- A = Awareness
- B = Belief
- C = Context

Each letter should render from structured data, not hardcoded copy.

## Operating Rule

Do not build ten templates before one works.

Pipeline first:

```txt
Prompt / image / clip
  -> Remotion template
  -> MP4 render
  -> Drive Vault
  -> post / schedule
  -> lead capture
```

## Tool Roles

- ChatGPT: strategy, scripts, prompts, QA
- Claude Code: scaffold, components, refactors
- Codex: implementation support
- Remotion: React-to-MP4 rendering
- Google Drive: binary media vault
- GitHub: source of truth
- n8n: later automation layer
- Airtable: later status tracker

## Definition of Done for V1

V1 is done when:

1. `remotion/` installs cleanly.
2. One ABC Reel composition appears in Remotion Studio.
3. A/B/C can be selected through input props or sample data.
4. One MP4 render is exported.
5. Render can be uploaded to the Drive Vault.
6. Future templates can reuse the same tokens, typography, and data format.

Likkle by likkle, we build the future.
