# MAIM ABC Letter Production Skill

## Purpose

Use this skill every time a new Major AI Mindset ABC letter is created.

The goal is to turn each letter into a repeatable, machine-readable production package that supports:

- Google Gemini / Veo / Omni video generation
- Local asset storage
- Claude Code and Codex workflows
- Remotion programmable video assembly
- Instagram, YouTube Shorts, TikTok, webinar, website, and course reuse

## Core Production Rule

One letter equals two 10-second hero shots.

- Shot A = Emotional / metaphorical opening
- Shot B = Practical teaching moment

The two shots combine into one 20-30 second reel and become reusable cinematic assets.

Never treat a letter as a one-off post.

Every letter is an intellectual property asset.

## Required Folder Path

Each beginner letter lives at:

```txt
content/abc/beginner/{LETTER}_{Concept}/
```

Example:

```txt
content/abc/beginner/A_Awareness/
```

## Required Folder Structure

```txt
{LETTER}_{Concept}/
  00_README.md
  01_Doctrine.md
  02_Lesson.md
  03_Voiceover.md
  04_Caption.md
  05_CTA.md
  manifest.json

  references/
    founder/
    logo/
    roadmap/
    moodboard/

  shot_A/
    prompt.md
    metadata.json
    remotion_notes.md

  shot_B/
    prompt.md
    metadata.json
    remotion_notes.md

  audio/
  exports/
  archive/
```

GitHub should contain the text, prompts, metadata, and assembly notes.

Large generated videos should be stored locally or in the asset library unless explicitly requested for GitHub storage.

## Required Files

### 00_README.md

Must include:

- Letter and concept
- Core doctrine
- Lesson summary
- Production rule
- File inventory
- Status

### 01_Doctrine.md

Must include:

- Core doctrine
- Big idea
- Why the letter matters
- MAIM meaning

### 02_Lesson.md

Must include:

- Learning objective
- Beginner lesson
- Simple explanation
- Five-minute action
- Lesson line

### 03_Voiceover.md

Must include:

- 20-30 second voiceover
- Short cutdown
- Sonic direction

### 04_Caption.md

Must include:

- Instagram caption
- CTA
- Hashtags

### 05_CTA.md

Must include:

- Primary CTA
- Alternate CTAs
- DM follow-up

### manifest.json

Must include machine-readable metadata:

```json
{
  "series": "Major AI Mindset ABC Series",
  "version": "v2_master_canon",
  "letter": "A",
  "title": "Awareness",
  "theme": "Notice before you automate",
  "bigIdea": "Awareness comes before automation.",
  "audience": "Beginner",
  "durationSeconds": 20,
  "generationLimit": {
    "videosPerDay": 2,
    "secondsPerVideo": 10,
    "shotsPerLetter": 2
  },
  "shots": [],
  "voiceover": "03_Voiceover.md",
  "caption": "04_Caption.md",
  "cta": "Comment AWARE",
  "brand": {},
  "futureUses": [],
  "status": "production_ready"
}
```

## Shot A Rules

Shot A is the emotional metaphor.

It must:

- Stop the scroll
- Create recognition
- Show the problem before the solution
- Avoid overexplaining
- End with the letter or concept mark

Shot A prompt must include:

- Series continuity
- Reference image instruction
- Founder continuity instruction
- MAIM logo instruction
- Brand color doctrine
- 10-second duration
- 9:16 vertical format
- Cinematic visual metaphor
- Emotional objective
- Avoid list
- End frame

## Shot B Rules

Shot B is the practical teaching moment.

It must:

- Show the shift from awareness to action
- Make the concept understandable for beginners
- Include one simple visual transformation
- End with MAIM logo and/or tagline

Shot B prompt must include:

- Series continuity
- Reference image instruction
- Founder continuity instruction
- MAIM logo instruction
- Brand color doctrine
- 10-second duration
- 9:16 vertical format
- Practical visual metaphor
- Emotional objective
- Avoid list
- End frame

## Brand Continuity Rules

Every prompt must preserve:

- Major Dream Williams as calm guide and translator
- The woven palm crown / crown symbolism when appropriate
- Black foundation
- Gold authority
- Jamaican green legacy
- Champion blue highlights
- Orange accent energy
- White clarity
- Premium editorial composition
- Afro-Caribbean futurism
- Warm cinematic lighting
- Human-centered AI

Never use:

- Scary robots
- Dystopian tech
- Generic blue hologram overload
- Cold SaaS dashboard visuals
- Overcrowded typography
- Stock-photo corporate scenes
- AI replacing humans

## MAIM Teaching Standard

Every letter must follow:

One Letter.
One Lesson.
One Action.

The viewer should feel one of these:

- I can do this.
- I am not too late.
- I know what to do next.

## Local Storage Rule

When the generated videos are saved locally, mirror the GitHub folder structure.

Example:

```txt
A_Awareness/
  shot_A/video.mp4
  shot_B/video.mp4
  exports/instagram_reel.mp4
```

Keep prompts, metadata, references, and final notes aligned between local storage and GitHub.

## Remotion Rule

Every shot gets `remotion_notes.md` containing:

- Scene role
- Overlay suggestions
- Timing suggestion
- Motion treatment
- Audio notes

Remotion should be able to assemble a reel from:

- Shot A video
- Shot B video
- Voiceover
- Captions
- Logo
- End card
- Manifest metadata

## Definition of Done

A letter package is production-ready when GitHub contains:

- README
- Doctrine
- Lesson
- Voiceover
- Caption
- CTA
- Manifest
- Shot A prompt + metadata + Remotion notes
- Shot B prompt + metadata + Remotion notes

A letter is complete when local storage also contains:

- Generated Shot A video
- Generated Shot B video
- Selected stills
- Final edited reel
- Exported short-form versions

## Operating Reminder

Ready to Publish does not mean Complete.

Do not let missing advanced assets block publishing.

Publishable wins first.

Complete the archive after the market has moved.
