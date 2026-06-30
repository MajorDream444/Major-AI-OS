# HANZO OPERATING DOCTRINE

This file governs how ChatGPT, Claude, Claude Code, Codex, Cowork, and future Hanzo agents operate inside `MajorDream444/Major-AI-OS`.

The purpose is simple:

Prevent confident drift.

No agent should invent curriculum, brand rules, file structures, or production doctrine when a source of truth already exists.

## 1. Source-of-Truth Hierarchy

Use this order before creating or changing MAIM assets:

1. `README.md` — project identity, repo purpose, brand architecture
2. `CLAUDE.md` — agent behavior and operating rules
3. `DESIGN.md` — visual system and design rules
4. `HANZO_OPERATING_DOCTRINE.md` — multi-agent coordination doctrine
5. `data/MAIM_LEARNING_ENGINE_CANONICAL.json` — canonical learning engine content
6. `docs/` — long-form operating documents
7. `workflows/` — production workflows
8. `prompts/` — tool-specific prompt instructions
9. `remotion/` — programmable video implementation

If a chat memory, screenshot, HTML export, or prior assistant answer conflicts with these files, the files win.

## 2. No Confident Improvisation

Do not invent letters, modules, slogans, curriculum language, or content slots when canonical data exists.

Failure mode this prevents:

- Replacing `Direction` with `Curiosity`
- Replacing `Experiment` with `Execution`
- Building reels with hardcoded content that does not match the learning engine
- Treating a temporary HTML export as the canonical source
- Treating a chat answer as more authoritative than the repo

If something is missing, mark it as `pending`, `needs_review`, or `source_required`.

Do not fill the gap with confidence.

## 3. GitHub Is Canon

GitHub is the source of truth for:

- operating doctrine
- curriculum JSON
- docs
- prompts
- workflows
- code
- reusable templates
- data schemas

Google Drive stores binary assets and exports.

Drive is not canon unless a Drive document has been extracted, reviewed, and committed into GitHub.

## 4. Google Drive Is Media Vault / Staging

`MAIM 10 Remotion Content Engine` is Remotion staging.

It stores:

- source footage
- voiceovers
- draft renders
- final MP4 exports
- reference assets

It does not replace the canonical repo.

Approved final campaign assets may later be mirrored into the MAIM 09 weekly vault / IP Vault structure.

## 5. Curriculum Source of Truth

The canonical curriculum data lives at:

`data/MAIM_LEARNING_ENGINE_CANONICAL.json`

Any future format should consume this file or a generated derivative of this file.

That includes:

- reels
- stories
- carousel posts
- workbook pages
- course lessons
- podcast outlines
- YouTube scripts
- Remotion templates
- NotebookLM source packages
- Airtable syncs

Rule:

No template should hardcode letter content once the canonical JSON exists.

Hardcoded content may exist only as a temporary scaffold and must be labeled as scaffold data.

## 6. ABCs Are A Lens, Not Disposable Content

The ABCs are not just social posts.

They are the curriculum spine for MAIM.

Each letter can become:

- a reel
- a story
- a carousel
- a workbook page
- a course lesson
- a podcast segment
- a webinar section
- a community prompt
- a lead magnet
- a book chapter

The weekly webinar may still tag to a letter, but the larger doctrine is that the ABCs are reusable thinking lenses.

## 7. Canonical Beginner A–E

Current verified beginner modules:

- A = Awareness
- B = Belief
- C = Context
- D = Direction
- E = Experiment

Do not rename these without an explicit doctrine update.

## 8. Tool Roles

ChatGPT:

- strategy
- synthesis
- QA
- source-of-truth decisions
- file planning
- prompt architecture

Claude:

- design and content generation
- structured draft output
- curriculum expansion when guided by canon

Claude Code:

- repo-aware implementation
- refactors
- component wiring
- install/test/fix loops

Codex:

- engineering execution
- implementation checks
- code scaffolding

Cowork:

- operator workflow
- daily execution
- project coordination

Remotion:

- programmable branded video rendering

n8n:

- automation layer after manual workflow works

Airtable:

- status tracker and CRM, not curriculum canon unless synced from GitHub

## 9. Branch Hygiene

Default branch:

`main`

Operating rule:

- one active feature branch per live build
- merge or close stale PRs quickly
- delete branches after merge or close
- avoid parallel duplicate branches that solve the same problem

Before creating a new branch, check open PRs.

Before merging, check whether the branch contains canonical docs or experimental output.

## 10. Remotion Rule

Remotion should start small.

First template:

`ABCReel`

First batch:

- A = Awareness
- B = Belief
- C = Context

Do not build ten templates before one works.

The order is:

1. get one component rendering
2. wire it to canonical JSON
3. render A/B/C
4. review output
5. then expand formats

## 11. Human Test

Every asset must pass:

- Is it clear in five seconds?
- Does it sound like Major?
- Would a beginner feel safe?
- Would a builder feel called?
- Does it use canon instead of memory?
- Can the next tool pick it up without guessing?

If not, simplify.

Likkle by likkle, we build the future.
