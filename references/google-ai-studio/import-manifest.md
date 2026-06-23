# Google AI Studio Prototype Import Manifest

Date: 2026-06-23

Purpose: preserve the Google AI Studio export as a prototype/reference layer for Claude Design, Claude Code, Codex, and future local-first/open-source rebuilds.

This prototype should live conceptually under:

```txt
apps/google-ai-studio-prototype/
```

The current chat also created a local ZIP package named:

```txt
google-ai-studio-prototype-source.zip
```

## Uploaded Source Files

Root files:

```txt
index.html
metadata.json
package.json
README.md
tsconfig.json
vite.config.ts
```

Source files:

```txt
src/App.tsx
src/data.ts
src/index.css
src/main.tsx
src/types.ts
```

Components:

```txt
src/components/AbcLibrary.tsx
src/components/AuraHeader.tsx
src/components/BusinessPressureTest.tsx
src/components/ContentGenerator.tsx
src/components/HeroStatsCards.tsx
src/components/LessonDetailPane.tsx
src/components/PodcastBuilder.tsx
src/components/SparkLabVault.tsx
src/components/VideoPromptBuilder.tsx
```

## Important App Notes

The prototype README says the app can run locally with Node.js, `npm install`, a Gemini API key in `.env.local`, and `npm run dev`.

The prototype `metadata.json` describes the app as:

```txt
Major AI Mindset ABC Studio — a premium content production dashboard for a 3-level ABC AI education system, turning AI lessons into social content, podcasts, and video assets.
```

The prototype `package.json` includes React 19, Vite, Tailwind v4, lucide-react, motion, Express, dotenv, and `@google/genai`.

The prototype `src/index.css` defines the Nexora/Aura application tokens:

```txt
#09090B app background
#191C21 card surface
#FF5A00 orange laser/action accent
#2563EB blue status highlight
#A1A1AA muted metadata
#27272A borders
24px card radius
```

## Import Instruction for Codex / Claude Code

When ready, create:

```txt
apps/google-ai-studio-prototype/
```

Then place the uploaded files into the directory structure listed above.

Do not merge this directly into the production app until reviewed.

First review:

1. Dependency conflicts with current repo
2. Component naming conflicts
3. Curriculum doctrine mismatches
4. Design token overlap with `DESIGN.md`
5. Gemini API handling and environment safety
6. Whether this should become an app, reference, or template library

## Doctrine Boundary

This is a prototype layer.

It does not override:

- `README.md`
- `CLAUDE.md`
- `DESIGN.md`
- `data/design-tokens.json`
- canonical ABC curriculum decisions

Likkle by likkle, we build the future.
