# Major AI Mindset ABC Studio — Source of Truth

## Doctrine

GitHub is the source of truth. The app is the production dashboard.

Every generated asset should have:

1. A canonical asset ID
2. A GitHub metadata record
3. A Google Drive master file link when binary media is involved
4. An Airtable production record
5. A Notion creative review page
6. An Obsidian relationship/context note when people, partners, or strategic memory are involved

## Full Operating Stack

| Layer | Role | Source-of-Truth Behavior |
|---|---|---|
| GitHub | Canonical code, docs, prompts, metadata | Master source |
| ABC Studio | Production dashboard | Reads from GitHub / exports to tools |
| Google Drive | Master binary asset storage | Stores PNG/video/audio masters |
| Airtable | Production status + scheduling ops | Tracks asset pipeline |
| Notion | Creative review + human-readable pages | Review/approval layer |
| Obsidian | Relationship context + private knowledge graph | Strategic memory layer |
| NotebookLM | Research + podcast/study guide engine | Reads curated sources |
| Google Opal | Interactive app/assessment layer | Builds mini-apps from lessons |
| Google Omni | Video generation layer | Builds video from prompts/scripts |
| Codex | Implementation engineer | Builds app/data/export helpers |
| Claude Code | Review/refactor architect | Audits and improves repo |
| Cowork | Weekly operator | Produces reports/checklists |

## Important Distinction

Google Opal and Google Omni are both included, but they are not the same layer.

- **Google Opal** = interactive experiences, mini-apps, audits, calculators, and guided workflows.
- **Google Omni** = video generation, motion prompts, video briefs, shorts, and visual content.

## Obsidian Layer

Obsidian is where relationship context lives.

Use Obsidian for:

- Relationship history
- Partner context
- Strategic decisions
- Meeting notes
- Trust context
- Voice-of-customer patterns
- Community leader memory
- Personal context that should not be forced into public-facing GitHub docs

Obsidian should not replace GitHub. It supports GitHub by preserving relational and strategic context around why decisions were made.

## Per-Letter Asset Model

Each ABC letter can produce:

1. Lesson
2. Thumbnail
3. Carousel
4. Reel script
5. Platform captions
6. NotebookLM prompt
7. Google Opal mini-app prompt
8. Google Omni video prompt
9. Newsletter/Substack draft
10. Obsidian context note
11. Community challenge
12. Worksheet or implementation action

## Current Approved Prototype

`MAIM-ABC-BEG-A-AWARENESS-THUMBNAIL-V001`

A is approved visually. Its production exports still need to be committed into lesson data before publishing.

## Week 1 Scope

Beginner letters:

- A = Awareness
- B = Basics / Belief decision pending
- C = Context
- D = Delegation
- E = Experiments

Cowork flagged A as designed but not fully production-ready because reel, carousel, NotebookLM, Omni, and platform captions were not yet committed into the repo data layer.
