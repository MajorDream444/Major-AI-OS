# CODEX.md

Project: **Major AI Mindset ABC Studio**

Repository: `MajorDream444/Major-AI-OS`

## Current Stage

Stage 1: Beginner ABC production system.

## Primary Goal

Build the ABC Studio MVP and keep all production assets synced across the operating stack.

## Source-of-Truth Rules

- GitHub stores canonical docs, code, schemas, prompts, and metadata.
- Airtable stores production status and scheduling fields.
- Notion stores creative review pages and human-readable asset notes.
- Obsidian stores private relationship context, decision history, and network memory.
- Google Drive stores master binary media files when GitHub is not the best place for large files.

## Tool Layers

- NotebookLM = research, podcast, deep-dive, and study-guide outputs.
- Google Opal = interactive mini-apps, audits, calculators, assessments, and experience flows.
- Google Omni = generated video, motion prompts, video briefs, and short-form content.
- Claude Code = review, refactor, UX/system architecture.
- Codex = implementation, file creation, schema work, and integration scaffolding.
- Cowork = weekly production operator and reporting layer.

## Priority Build Order

1. Beginner ABC Library
2. Lesson Detail View
3. Content Generator
4. Workflow Board
5. Podcast Builder / NotebookLM exporter
6. Google Opal Mini-App Builder
7. Google Omni Prompt Builder
8. Obsidian Context Exporter
9. Airtable Integration
10. Notion Integration
11. Scheduling Engine

## Required Repo Structure

```txt
assets/
  thumbnails/
    abc/
      beginner/
        A-awareness/
        B-belief/
        C-curiosity/

data/
  beginner/
    A-awareness.ts
    B-belief.ts
    C-curiosity.ts

prompts/
  notebooklm/
  opal/
  omni/
  codex/
  claude/
  cowork/

workflows/
  week-1-production-report.md
  content-production-sop.md

docs/
  00-source-of-truth.md
  01-architecture.md
  02-obsidian-context-layer.md
```

## Foundation Manuals

Always use `DESIGN.md`.

Before UI work, also read:

```txt
docs/design-system/maim-design-philosophy.md
docs/design-system/landing-page-philosophy.md
```

Before integration or automation work, read:

```txt
docs/engineering/definition-of-done.md
docs/release-gates/
```

Before planning major work, read:

```txt
docs/roadmap/MAIM_MASTER_ROADMAP.md
docs/decisions/
```

For teaching assets, distinguish:

```txt
docs/ = how MAIM operates
knowledge/ = what MAIM teaches
```

Before agent-scoped work, read the relevant playbook in:

```txt
docs/agents/
```

Before designing agent collaboration or memory workflows, read:

```txt
docs/architecture/agent-workspace-architecture.md
```

MAIM engineering principle:

```txt
Preserve ideas immediately. Implement ideas deliberately.
```

## Approved Prototype

`MAIM-ABC-BEG-A-AWARENESS-THUMBNAIL-V001`

## Immediate Dev Priorities

1. Add missing export fields to `A-awareness` lesson data.
2. Create idea-level entries for B, C, D, and E.
3. Add consistent lesson schema.
4. Add export helpers for reel, carousel, captions, NotebookLM, Opal, Omni, and Obsidian.
5. Add README/operator instructions.

## Guardrails

- Do not introduce a new framework without approval.
- Do not create a new visual language.
- Do not hide production metadata inside UI-only files.
- Do not move source-of-truth away from GitHub.
- Do not confuse Opal and Omni: Opal is the interactive app layer; Omni is the video layer.
