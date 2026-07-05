# Google AI Studio MAIM Mission Control Vite Prototype Review

Status: Reviewed
Source: Uploaded Google AI Studio Vite/React export
Review date: 2026-07-05

## Executive Read

This is the strongest direction so far.

The Google AI Studio version successfully combines the two landing page instincts:

- Gravity Well / universe portal energy
- Structural luxury landing page clarity

It feels closer to the actual MAIM Mission Control idea than the earlier static HTML experiments.

The page is no longer only a flyer or signup page.

It is becoming an interactive learning doorway.

## What Came Through Strongly

### 1. The MAIM identity is present

The exported metadata names the app `Major AI Mindset` and describes it as `The Mindset Operating System for the AI Age`, focused on helping beginners, builders, and professionals turn ideas into digital assets.

This matches the canonical direction.

### 2. The technical structure is usable

The project is a Vite React app.

The uploaded `package.json` includes scripts for:

- `dev`
- `build`
- `preview`
- `lint`

That gives Codex a clean entry point.

### 3. The page has the right modular sections

The React app is broken into sections rather than one massive file.

Observed sections include:

- HeroSection
- FactsSection
- MethodologySection
- RhythmSection
- AudienceQuizSection
- MeetMajor
- RegisterSection
- FaqSection
- Footer

This is the right architecture for a reusable MAIM landing system.

### 4. The design system is aligned

The uploaded CSS defines MAIM colors and fonts:

- Black foundation
- Gold authority
- Jamaican green
- Knicks blue
- Knicks orange
- White clarity
- Cormorant Garamond
- Inter
- Oswald
- JetBrains Mono

This is aligned with the MAIM visual system.

## Issues Found

### 1. Missing component in the uploaded file set

`App.tsx` imports `RhythmSection`, but no `RhythmSection.tsx` file was included in the uploaded files.

This would break the app if imported directly without correction.

### 2. Broken hero background asset path

`HeroSection.tsx` references:

`/src/assets/images/maim_gravity_well_portal_1783228927066.jpg`

That file was not included in the upload.

This needs to be replaced by either:

- a committed asset
- a CSS gradient fallback
- a public image URL
- a generated MAIM portal asset from the brand vault

### 3. Form is not yet connected to the live signup engine

The registration section currently records a local RSVP in browser storage, then directs the user to the Google Form.

That is acceptable for prototype testing, but production should connect directly to the existing Google Apps Script webhook or the Google Form.

Production options:

1. Submit directly to the Google Form
2. Submit directly to the Google Apps Script webhook
3. Use the form as the fallback and webhook as the primary capture

### 4. Package still has AI Studio defaults

The uploaded `package.json` is named `react-example`.

It also includes some dependencies that are not needed for the current landing page if Gemini is not being used directly in the app.

This should be cleaned before production.

## Local Test Result

I reconstructed the project locally, added a missing `RhythmSection.tsx`, removed the broken hero image dependency by replacing it with a CSS gradient fallback, installed dependencies, then ran:

```bash
npm run lint
npm run build
```

Result:

Passed.

The corrected prototype builds successfully.

## Recommendation

Keep this version.

This should become the working prototype for the Codex implementation pass.

The static HTML versions are still useful as references, but this React/Vite version is the better long-term base.

## Next Codex Pass

Codex should:

1. Import the cleaned Vite structure into the repo.
2. Add the missing `RhythmSection.tsx`.
3. Replace the broken hero image reference with a committed MAIM portal asset or CSS fallback.
4. Rename package from `react-example` to `maim-mission-control-ai-studio`.
5. Remove unused dependencies.
6. Wire the Register section into the Google Apps Script webhook.
7. Add mobile QA pass.
8. Add accessibility pass.
9. Add deploy target notes for Netlify/Vercel.

## Decision

This is no longer just a design sketch.

This is the beginning of the real MAIM Mission Control landing app.

Keep it in the experiment branch until the production handoff is clean.

Likkle by likkle, we build the doorway.
