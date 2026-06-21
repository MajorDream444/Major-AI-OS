# Codex Skill — MAIM Instagram Implementation

**Activation:** "Build the next Instagram post for [lesson]" / "Update launch grid status"  
**App source:** `app/src/data/lessons.ts` | `app/src/utils/exportFunctions.ts`

## Role

You are the implementation engineer for the Major AI Mindset Instagram launch system.

Your job is to make the repo, app, schemas, exports, and automation helpers support the launch of `@major_ai_mindset`.

## Source Documents

Use these files:

- `gtm/instagram-launch-playbook.md`
- `workflows/instagram-launch-workflow.md`
- `data/abc-beginner.json`
- `data/abc-medium.json`
- `data/abc-expert.json`
- `data/platforms.json`
- `data/design-tokens.json`
- `app/src/data/lessons.ts` (React app lesson registry)
- `app/src/utils/exportFunctions.ts` (export helpers)

## Implementation Goals

Build or update support for:

1. Instagram content records
2. ABC post exports
3. CTA tracking
4. Post status logic
5. Metadata fields
6. Design token references
7. Launch grid tracking
8. Simple content package exports for Cowork and Claude Code

## Recommended Data Fields

Each Instagram post record should support:

- id
- platform
- postType
- title
- hook
- caption
- visualPrompt
- designNotes
- cta
- linkTarget
- contentBucket
- abcLetter
- abcLevel
- status
- publishDate
- assetPath
- sourceDoc
- repurposeTargets
- learningSignals

## Export Helpers (App Layer)

The React app exposes these functions in `app/src/utils/exportFunctions.ts`:

```ts
exportReelScript(lesson)                       // → reel script
exportCarouselCopy(lesson)                     // → slide-by-slide copy
exportPlatformCaption(lesson, "instagram")     // → caption with hashtags
exportNotebookLMPrompt(lesson)                 // → NotebookLM source doc
exportGoogleOmniPrompt(lesson)                 // → Gemini prompt
```

Run these against any lesson in `app/src/data/lessons.ts` to generate export-ready content.

## Status Logic

Use this status ladder:

- Draft
- Ready to Publish
- Scheduled
- Published
- Post-Publish Completion
- Complete

Do not treat missing archive metadata as a blocker to publishing.

## Launch Grid

Create or support the first 9-post launch grid:

1. What is Major AI Mindset?
2. A is for Awareness
3. Free Webinar Announcement
4. B is for Belief
5. Why AI is not just for tech people
6. C is for Context
7. The A-Z Roadmap
8. 3 things AI can help you do this week
9. Founder post: why Major is building MAIM

## Visual Brief Template

```
DESIGN BRIEF — [Letter] is for [Concept]
Background: #050505 | Letter mark: Cinzel, #D4AF37 gold | Level badge: JetBrains Mono
Do NOT use white backgrounds, generic AI imagery, or non-brand fonts.
```

## Acceptance Criteria

- Content records can represent all first 9 posts.
- ABC lesson content can be exported into Instagram-ready packages.
- CTA field is always present.
- Status logic separates publish readiness from archive completion.
- Brand tokens are referenced consistently.
- No implementation depends on a paid tool unless explicitly configured.

## Constraints

Keep the system lightweight. This launch needs momentum before complexity.
