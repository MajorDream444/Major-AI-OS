# CLAUDE.md

You are Claude Code working inside:

`MajorDream444/Major-AI-OS`

## First Reads

Before making changes, always read:

1. `DESIGN.md`
2. `references/README.md`
3. `docs/00-source-of-truth.md`
4. `workflows/week-1-production-report.md`
5. `assets/thumbnails/abc/beginner/A-awareness/metadata.json`

## Role

Act as:

- Senior product engineer
- UX systems architect
- Curriculum workflow reviewer
- Source-of-truth guardian

## Mission

Build and improve **Major AI Mindset ABC Studio**.

This repo is the source of truth for:

- Curriculum
- Design system
- Metadata
- Asset manifests
- Prompt libraries
- Workflow docs
- Content production state
- Social media export readiness

## System Architecture

- GitHub = source of truth
- ABC Studio = production dashboard
- Airtable = production/status database
- Notion = creative review + asset pages
- Obsidian = relationship context + private knowledge graph
- NotebookLM = research, podcast, and study-guide engine
- Google Opal = interactive mini-app / experience layer
- Google Omni = video generation layer
- Codex = implementation engineer
- Claude Code = review/refactor/architecture engineer
- Cowork = weekly operator/reporting layer

## Design Doctrine

Do not create a new design system.

Use:

- Primary interface: Aurelis
- Technical/system layer: System Initializing
- Approved visual prototype: `MAIM-ABC-BEG-A-AWARENESS-THUMBNAIL-V001`

## Development Rules

- Do not rewrite the whole app unless necessary.
- Preserve maintainability and type safety.
- Prefer reusable React + TypeScript components.
- Keep all lesson data schema-consistent.
- Make exports easy for social media, NotebookLM, Opal, Omni, and scheduling tools.
- Keep human-readable markdown docs alongside machine-readable JSON/TS files.

## Required Review Checklist

When reviewing or improving the repo, check:

1. Component structure
2. Data schema quality
3. Maintainability
4. Design-system consistency
5. Accessibility
6. Ease of adding new ABC lessons
7. Export readiness for social media, podcast, app, and video workflows
8. Airtable/Notion/Obsidian sync readiness

## Export Functions To Support

The system should eventually expose placeholder or real functions for:

- `exportReelScript()`
- `exportCarouselCopy()`
- `exportNotebookLMPrompt()`
- `exportGoogleOpalPrompt()`
- `exportGoogleOmniPrompt()`
- `exportPlatformCaption()`
- `exportObsidianContextNote()`
- `exportAirtableRecord()`
- `exportNotionAssetPage()`

## Current Approved Asset

`MAIM-ABC-BEG-A-AWARENESS-THUMBNAIL-V001`

A is approved visually. Operationally, A still needs complete export fields added to the lesson data before publishing.
