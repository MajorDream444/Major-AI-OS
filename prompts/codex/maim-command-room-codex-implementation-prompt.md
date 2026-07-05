# Codex Prompt — MAIM Command Room Landing Page Pass

Repository:
MajorDream444/Major-AI-OS

Branch:
Create a new branch from main:

```txt
feature/maim-command-room-landing-pass
```

Working directory:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite
```

## Goal

Update the existing MAIM Mission Control Vite app to better match the approved Google AI Studio command-room direction.

Do not create a new app.

Do not scaffold Vite.

Do not overwrite the app from scratch.

This is a refinement pass.

## Source of Truth

Use this review first:

```txt
experiments/landing-pages/google-ai-studio/maim-command-room-design-review.md
```

Then use the existing Vite app as the implementation base.

## Visual Direction

The page should feel like:

- A live knowledge room
- A command room
- A signal deck
- A weekly schedule hub
- A premium learning doorway

The page should not feel like:

- A social media flyer
- A webinar ad
- A poster stretched into a webpage
- A generic AI course landing page
- A robot/future-tech template

## Design Lock

Preserve the AI Studio direction:

- Premium black foundation
- Subtle command grid
- Gold authority accents
- Jamaican green signal accents
- Knicks blue signal accents
- Knicks orange reserved for action and CTA energy
- Thin borders
- Panel-based command interface
- Schedule visible on page
- Calm but powerful typography

## Color Rules

Use:

```txt
Black: #030304 or #0A0A0A
Gold: #D8AF55 or #D4AF37
Jamaican Green: #1F7A3A
Knicks Blue: #006BB6
Knicks Orange: #F58426
White: #F7F4EA
Muted Text: #B8B8B8
Grid Line: rgba(216,175,85,0.10)
Panel Background: rgba(12,12,15,0.82)
```

Orange is for CTA and action moments only.

Do not let orange dominate the entire page.

## Required Page Structure

1. Command Room Hero
2. Next Knowledge Session / Weekly Schedule
3. Signal Deck: Format, Rhythm, Audience
4. ABC Roadmap
5. What Happens Inside a Knowledge Session
6. Choose Your Lane
7. Meet Major
8. Reserve Your Seat
9. FAQ
10. Footer

## Hero Copy

Main title:

```txt
AI MINDSET
```

Supporting headline:

```txt
Stop carrying your ideas in your head. Build from where you are.
```

Support copy:

```txt
A live learning room for beginners, creators, community leaders, and builders who are ready to stop fearing AI and start using it with confidence.
```

Footer line:

```txt
AI is the tool. You are the future.
```

Right-side flow cards:

```txt
01 See It
Find the real-life use case.

02 Believe It
Use plain language to make it yours.

03 Build It
Leave with one action you can test.
```

## Schedule Section Copy

Add or refine a clear next-session section.

Use placeholder-safe copy so it can be updated weekly:

```txt
Next Knowledge Session
Sunday, [date]
7:00 AM Bali / WITA
Saturday, [date]
7:00 PM New York / ET
Live on Google Meet
```

Also include:

```txt
This Week in the Room
A live idea
A working example
A simple action
Replay and follow up
```

## Technical Rules

Run before editing:

```bash
pwd
ls
git status
```

Then run:

```bash
npm install
npm run lint
npm run build
```

After edits, run:

```bash
npm run lint
npm run build
```

Do not add Three.js.

Do not add heavy animation libraries.

Do not add new dependencies unless absolutely required.

Do not remove the Google Apps Script webhook fallback logic.

Do not remove the Google Form fallback link.

## Files Likely To Edit

```txt
src/components/HeroSection.tsx
src/components/FactsSection.tsx
src/components/MethodologySection.tsx
src/components/RhythmSection.tsx
src/components/RegisterSection.tsx
src/components/Footer.tsx
src/index.css
README.md
```

Add a new component only if needed:

```txt
src/components/ScheduleSection.tsx
```

## Acceptance Criteria

The pass is successful when:

- The page feels closer to the AI Studio command-room screenshot
- The next knowledge session / weekly schedule is visible
- The page feels like a landing page, not a flyer
- CTA is clear
- Mobile still works
- npm run lint passes
- npm run build passes
- No broken imports
- No missing assets
- No new app was scaffolded

## Report Back

Report:

1. Files changed
2. Commands run
3. Lint result
4. Build result
5. Design decisions made
6. Anything still visually off
7. Recommended next pass

## Final Reminder

Studio explores.

Codex engineers.

GitHub remembers.

Do not redesign from scratch.

Refine the existing app toward the approved command-room direction.
