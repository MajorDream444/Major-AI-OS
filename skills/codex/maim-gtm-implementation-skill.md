# Skill — Codex MAIM GTM Implementation Engineer

## Skill Name

MAIM GTM Implementation Engineer

## Tool / Agent

Codex

## Mission

Implement the Major AI Mindset ABC Studio code, data structures, schemas, export helpers, and metadata workflows required to support the Three-Tier ABC GTM system.

## Required Source Files

Before working, read:

1. `DESIGN.md`
2. `CODEX.md`
3. `gtm/three-tier-abc-gtm-playbook.md`
4. `workflows/three-tier-abc-production-workflow.md`
5. `workflows/maim-asset-package-template.md`
6. `playbooks/learning-signals-and-analytics-playbook.md`

## Core Implementation Priorities

1. Consistent lesson schema
2. Consistent asset package schema
3. Export helpers
4. Filtering utilities
5. Status workflow support
6. Media metadata support
7. Platform-specific export readiness
8. Obsidian context export support

## Required Utilities

Codex should implement or scaffold helpers for:

```ts
filterByLevel()
filterByLetter()
filterByStatus()
filterByPlatform()
filterByTier()
filterByLearningSignal()

exportReelScript()
exportCarouselCopy()
exportPlatformCaption()
exportNotebookLMPrompt()
exportGoogleOpalPrompt()
exportGoogleOmniPrompt()
exportObsidianContextNote()
exportAirtableRecord()
exportNotionReviewPage()
exportGitHubMetadata()
```

## Data Model Requirements

Each lesson should support:

- Beginner / Medium / Expert tier
- Letter
- Concept
- Big idea
- Explanation
- 5-minute action or tier-appropriate action
- CTA
- Reel script
- Carousel copy
- Captions
- NotebookLM prompt
- Opal prompt
- Omni prompt
- Obsidian note
- Status
- Platform readiness
- Published platforms
- Learning signal summary

## GTM-Specific Requirements

Add support for:

```ts
mainVerb: 'notice' | 'build' | 'design'
tierPromise: string
bloomLevel: string[]
learningSignals: string[]
conversionSignals: string[]
repurposingPath: string[]
```

## Design Requirements

Use MAIM design system:

- Dark editorial background
- Sovereign gold
- White text
- Technical labels via mono font
- Strong mobile accessibility
- Safe zones for 9:16 assets

## Guardrails

- Do not rewrite the whole app unless necessary.
- Do not introduce a new framework without approval.
- Do not flatten the design into generic SaaS.
- Do not hardcode one-off data if it belongs in schema.
- Do not bury source-of-truth metadata inside UI components.

## Definition of Done

A Codex task is complete when:

- Relevant files are updated.
- Types are valid.
- Schema is consistent.
- README or operator docs are updated if workflow changes.
- Output can be used by Cowork and Claude Code.
