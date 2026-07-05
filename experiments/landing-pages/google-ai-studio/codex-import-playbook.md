# Codex Import Playbook — Google AI Studio MAIM Prototype

## Goal

Turn the Google AI Studio export into a clean repo-ready Vite/React prototype for Major AI Mindset Mission Control.

This should remain experimental until reviewed and approved.

## Source Files From Upload

Expected root files:

- `index.html`
- `metadata.json`
- `package.json`
- `README.md`
- `tsconfig.json`
- `vite.config.ts`

Expected source files:

- `App.tsx`
- `index.css`
- `main.tsx`
- `types.ts`

Expected component files:

- `AudienceQuizSection.tsx`
- `FactsSection.tsx`
- `FaqSection.tsx`
- `Footer.tsx`
- `HeroSection.tsx`
- `InteractiveClock.tsx`
- `MeetMajor.tsx`
- `MethodologySection.tsx`
- `RegisterSection.tsx`

Missing from upload but required by `App.tsx`:

- `RhythmSection.tsx`

## Recommended Repo Location

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite/
```

## Directory Structure

```txt
maim-mission-control-vite/
  index.html
  metadata.json
  package.json
  README.md
  tsconfig.json
  vite.config.ts
  src/
    App.tsx
    index.css
    main.tsx
    types.ts
    components/
      AudienceQuizSection.tsx
      FactsSection.tsx
      FaqSection.tsx
      Footer.tsx
      HeroSection.tsx
      InteractiveClock.tsx
      MeetMajor.tsx
      MethodologySection.tsx
      RegisterSection.tsx
      RhythmSection.tsx
```

## Required Fixes Before Commit

### 1. Move component imports into `/src/components/`

Uploaded component files are flat.

The app expects:

```ts
import HeroSection from './components/HeroSection';
```

So all component files must live inside:

```txt
src/components/
```

### 2. Add missing `RhythmSection.tsx`

`App.tsx` imports it, but it was missing from the upload.

Create a lightweight section that explains:

- A clear idea
- A live example
- A simple action

### 3. Remove or replace broken hero asset path

`HeroSection.tsx` references a local image asset that was not uploaded.

Replace that block with either:

- CSS gradient fallback
- committed image asset
- generated MAIM portal artwork

Do not leave broken image paths in repo.

### 4. Clean `package.json`

Rename:

```json
"name": "react-example"
```

To:

```json
"name": "maim-mission-control-ai-studio"
```

Remove unused AI/server dependencies unless a Gemini feature is actively used.

Keep:

- React
- React DOM
- Vite
- TypeScript
- Tailwind Vite plugin
- Lucide React

### 5. Connect the registration form

The current form uses localStorage and then links to Google Forms.

Production should connect to the live MAIM signup engine.

Webhook endpoint:

```txt
https://script.google.com/a/macros/hanzo.ai/s/AKfycbxpxqKd_unYrHyen2cpxAU85_H4oEU_76Ck4wn2Wpf_rHq2XSl4kOVqpWTEJ0bUZis6/exec
```

Primary rule:

Capture the lead without making the user submit twice.

Fallback rule:

Keep the Google Form link available if webhook submission fails.

## Local Test Commands

```bash
npm install
npm run lint
npm run build
```

A locally corrected reconstruction passed both lint and build after adding `RhythmSection.tsx` and removing the broken hero image dependency.

## QA Checklist

Before production promotion:

- Hero loads on mobile
- CTA visible above the fold
- Register form works
- Webhook creates row in Sheet
- Email confirmation fires
- Google Form fallback works
- No broken images
- No console errors
- Reduced motion respected
- Text is readable on mobile
- No AI-looking filler copy
- Voice sounds like Major

## Strategic Decision

This Vite app is the best candidate for the actual MAIM Mission Control landing page.

Use it as the implementation base.

Keep the earlier static HTML pages as reference experiments.
