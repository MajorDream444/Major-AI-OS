# Codex Prompt — MAIM Elegant Universe Landing Shift

Repository:
MajorDream444/Major-AI-OS

Working directory:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite
```

## First Read

Before editing, read:

```txt
DESIGN.md
experiments/landing-pages/google-ai-studio/maim-command-room-design-review.md
```

These are the design lock files.

Do not ignore them.

## Problem To Fix

The current page feels too boxed in.

It looks like a social media asset or flyer stretched into a website.

It repeats the same visual idea too close together.

The roadmap section has a large text block and then a second poster/card showing almost the same thing.

That is not cool.

That is not elegant.

That is not the landing page feel.

## Required Design Shift

Move the app toward this ratio:

```txt
65–70% Google AI Studio command-room / elegant universe feel
30–35% MAIM current brand asset language
```

The page should feel like people are stepping into the MAIM universe.

Not clicking an ad.

Not reading a flyer.

Not looking at a carousel slide.

## Overall Feel

The page should feel like:

- A live knowledge room
- A command view
- A soft portal into the MAIM universe
- A serious but welcoming learning space
- A schedule and onboarding hub

It should not feel like:

- A social media post
- A webinar flyer
- A poster grid
- A loud sales page
- A boxed-in dashboard

## Core Visual Rules

Use more:

- Air
- Flow
- Negative space
- Wide cinematic panels
- Subtle grid backgrounds
- Thin dividers
- Floating command modules
- Soft glow
- Elegant typography contrast

Use less:

- Heavy square cards
- Poster mockups
- Repeated headlines
- Hard borders
- Giant block text everywhere
- Dense side-by-side duplicated content

## Specific Fixes

### 1. Fix ABC Roadmap Section

Remove the duplicate poster-style roadmap card.

Do not show `One Letter. One Lesson. One Action.` twice in the same view.

Use one elegant roadmap treatment.

Suggested layout:

Left:

```txt
One Letter.
One Lesson.
One Action.
```

Right:

A clean minimal vertical or horizontal A–E sequence with lots of space.

No framed poster card.

No duplicate image mockup.

### 2. Fix Box Overload

Not every section needs a card.

Replace some boxes with:

- horizontal timeline
- thin-line rows
- floating glass panels
- text plus signal strip
- schedule ribbon

### 3. Add Elegant Schedule Flow

Create or refine a schedule section that feels like a calm command module.

Required content:

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

### 4. Keep Hero, But Make It Less Like A Flyer

Hero should stay strong, but reduce any over-poster feeling.

Keep:

```txt
AI MINDSET
Stop carrying your ideas in your head. Build from where you are.
AI is the tool. You are the future.
```

But make the hero feel like an entrance to a room.

### 5. Orange Restraint

Orange should be used only for action energy.

Use orange for CTA or selected state.

Do not let orange dominate entire page sections.

### 6. Logo Usage

Use the circular gold MD + crown seal as the trust stamp.

Keep it clean and restrained.

Do not turn the logo into heavy decoration.

## Technical Rules

Do not scaffold a new app.

Do not create a second Vite app.

Do not add Three.js.

Do not add heavy dependencies.

Do not remove webhook logic.

Do not remove Google Form fallback.

Do not move the app out of experiments.

## Files Likely To Edit

```txt
src/components/HeroSection.tsx
src/components/MethodologySection.tsx
src/components/RhythmSection.tsx
src/components/RegisterSection.tsx
src/components/Footer.tsx
src/index.css
README.md
```

Add only if needed:

```txt
src/components/ScheduleSection.tsx
```

## Commands

Run before and after edits:

```bash
npm install
npm run lint
npm run build
```

## Acceptance Criteria

The pass is successful when:

- The page feels more elegant and less clunky
- The page feels 65–70% AI Studio command-room and 30–35% MAIM asset language
- The ABC roadmap no longer duplicates itself
- There are fewer heavy boxes
- The next knowledge session is visible
- The page feels like a landing page, not a flyer
- The CTA remains clear
- Mobile still works
- Lint passes
- Build passes

## Report Back

Report:

1. Files changed
2. Design decisions made
3. Sections simplified
4. Duplicate content removed
5. Commands run
6. Lint result
7. Build result
8. Remaining concerns

## Final Reminder

The social graphic gets attention.

The landing page earns trust.

Design for trust.
