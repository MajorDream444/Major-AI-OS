# Google AI Studio Prototype — Brand Handoff & Design System

This document describes the Google AI Studio prototype layer for Major AI Mindset.

It does not override the canonical MAIM brand system in `DESIGN.md`.

Use this for app UI, CSS tokens, component structure, interactive dashboard behavior, and prototype continuity.

## Core Visual DNA

The platform uses a Nexora/Aura design system. The aesthetic blends raw technical utility, inspired by terminal interfaces, with premium, spacious, dark editorial typography.

The interface relies on deliberate visual breathing room, subtle glowing coordinates, and distinct high-contrast highlights instead of dense decorative patterns or uncontrolled gradients.

Theme vibe:

Premium minimalist. Cinematic. High-leverage dark mode.

Palette focus:

Soft off-white and deep charcoal surfaces accented by energetic orange lasers, neon aura backdrops, and structure-critical royal blue highlights.

Grid constraint:

ABC mathematical columns designed around absolute alignment and functional modular grids, such as the interactive Editorial Desk.

## Prototype Design Tokens

Source file: `src/index.css`

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  --font-body: "Manrope", "Inter", sans-serif;

  --color-brand-bg: #09090B;
  --color-brand-card: #191C21;
  --color-brand-orange: #FF5A00;
  --color-brand-blue: #2563EB;
  --color-brand-muted: #A1A1AA;
  --color-brand-border: #27272A;

  --radius-card: 24px;
}
```

## Aura Effects

### Orange Laser Coordinate

```css
.laser-line-orange {
  position: relative;
}
.laser-line-orange::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 2px;
  background: #FF5A00;
  box-shadow: 0 0 8px #FF5A00;
}
```

### Royal Blue Laser Segment

```css
.laser-line-blue {
  position: relative;
}
.laser-line-blue::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 2px;
  background: #2563EB;
  box-shadow: 0 0 8px #2563EB;
}
```

## Key Prototype Files

| File | Team | Purpose |
|---|---|---|
| `src/index.css` | Designers + front-end | Typography, colors, scrollbars, laser definitions |
| `src/types.ts` | Engineers | TypeScript architecture, Level and status types |
| `src/data.ts` | Copywriters + strategists | Editorial database and A-Z mapping |
| `src/App.tsx` | Full-stack engineers | High-level conversion pipeline and state machines |
| `src/components/` | Interface developers | Modular conversion components |

## Core Components

- Scroll Progress Bar: fixed 4px top viewport indicator tracking scroll depth.
- `BusinessPressureTest.tsx`: interactive 4-stage wizard for cognitive bottlenecks and Mindset Leverage Score.
- `SparkLabVault.tsx`: modular digital product collection and pricing ladder.
- `AbcLibrary.tsx`: interactive editorial desk for the A-Z concept database.
- `PodcastBuilder.tsx`: audio prompt and podcast builder.
- `VideoPromptBuilder.tsx`: video prompt and asset prompt builder.

## Layout Principles

Avoid flat backdrops. Use `bg-brand-card/25 border border-brand-border backdrop-blur-md` to maintain the glassy, layered look.

Use spacious margins like `py-12 md:py-20` for readable breathing room.

All interactive targets should be at least 44px on mobile.

Use subtle scale-up animation through `motion/react` where appropriate.

## Doctrine Boundary

This prototype currently uses some concept names that may differ from the public MAIM curriculum. The canonical beginner curriculum remains:

- A = Awareness
- B = Belief
- C = Context
- D = Direction
- E = Experiment

If the prototype uses alternate terms such as Accentuate, Boundaries, or Constraints, treat those as experimental app-data placeholders unless intentionally promoted into the canonical curriculum.
