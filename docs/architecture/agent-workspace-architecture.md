# Agent Workspace Architecture

Status: foundation architecture
Owner: Major AI Mindset

This document defines how MAIM agents think, remember, hand off, and avoid context overload.

The release gates govern how software ships.

The agent workspace architecture governs how 144 agents collaborate without losing context or stepping on each other.

## Core Distinction

MAIM now separates documentation architecture from operating architecture.

```txt
docs/       = how the platform works
knowledge/  = what the platform teaches
workspace/  = where agents work
```

The `workspace/` directory is not production.

It is the living agent operating layer.

## Why This Exists

Agents do not get confused only because the task is hard.

They get confused because they are asked to reason over too much at once.

The workspace constrains each agent's universe so it can work with less token waste, less context drift, and fewer accidental edits.

## Proposed Top-Level Structure

```txt
workspace/
  000_SHARED_CONTEXT/
  001_COMMAND_CENTER/
  010_LANDING_AGENT/
  011_REGISTRATION_AGENT/
  012_CONTENT_AGENT/
  013_ABC_AGENT/
  014_KNOWLEDGE_SESSION_AGENT/
  ...
  144_AGENT/
```

The numbers make the workspace stable, sortable, and easy to scan.

## Shared Context

Every agent can read this folder.

It should stay small.

```txt
workspace/000_SHARED_CONTEXT/
  MAIM_CONTEXT.md
  DESIGN_SYSTEM.md
  BRAND.md
  ABC.md
  ROADMAP.md
  CURRENT_SPRINT.md
  ACTIVE_DECISIONS.md
  GLOSSARY.md
```

These files summarize source-of-truth material. They do not replace the canonical docs.

They are token-efficient context packets.

## Command Center

Every agent reads this before starting active work.

```txt
workspace/001_COMMAND_CENTER/
  sprint.md
  priorities.md
  backlog.md
  releases.md
  blockers.md
```

The Command Center tells agents what matters now.

It prevents future-season ideas from hijacking the active sprint.

## Universal Agent Home

Every agent gets the same folder structure.

```txt
workspace/010_LANDING_AGENT/
  README.md
  context/
  inbox/
  working/
  output/
  logs/
  archive/
  memory.md
```

Consistency matters more than cleverness.

When every agent home looks the same, humans and agents can navigate quickly.

## Folder Purposes

### `README.md`

Short orientation for the agent room.

Answers:

- What is this agent?
- What does it own?
- What should it read first?
- What should it never touch?

### `context/`

Agent-specific context packets.

Use this for distilled context, not full repo copies.

Examples:

- landing page QA notes
- registration engine contract summaries
- current subsystem map
- handoff summaries from another agent

### `inbox/`

Incoming work.

Use this for:

- task briefs
- handoff packets
- unresolved questions
- artifacts another agent produced for review

### `working/`

Temporary work area.

This folder should be emptied at the end of each sprint or task.

Nothing in `working/` is permanent.

### `output/`

Approved work products.

Only move something here when it is ready to be referenced, reviewed, or handed off.

### `logs/`

Short dated summaries.

Not full conversations.

Example:

```txt
logs/2026-07-07.md
logs/2026-07-08.md
```

Each log should capture:

- what changed
- what was learned
- what is blocked
- what should happen next

### `archive/`

Nothing important is deleted.

Completed, stale, or superseded workspace material moves here.

### `memory.md`

The agent's durable memory.

It should answer:

```txt
Who am I?
What do I own?
What do I never touch?
What did I learn?
What are my current assumptions?
What known issues should I remember?
```

## Layered Context Model

Agents should receive context in layers:

```txt
Layer 1 - Shared Context
Layer 2 - Agent Memory
Layer 3 - Working Folder
Layer 4 - Current Task
```

Do not start by asking an agent to scan the whole repo.

Start with the smallest context layer that can safely complete the task.

## Inter-Agent Communication

Agents should not rely on private conversation history.

Agents communicate through contracts and files.

Example:

```txt
Registration Agent produces:
  output/registration.json

Content Agent consumes:
  inbox/registration.json
```

No direct conversation is required.

The file contract becomes the API between agents.

## Contract Rules

Every inter-agent contract should define:

- producer
- consumer
- file name
- schema or fields
- required fields
- optional fields
- version
- validation rule
- owner

Contracts should live in the producing agent's `output/` and the consuming agent's `inbox/`.

When the contract becomes permanent, promote it to the appropriate source folder:

```txt
data/
docs/architecture/
docs/agent-operations/
```

## Token Discipline

Agents should not read broad folders by default.

Recommended read order:

1. `workspace/000_SHARED_CONTEXT/`
2. `workspace/001_COMMAND_CENTER/`
3. current agent `memory.md`
4. current agent `context/`
5. current task in `inbox/`
6. only then, canonical repo files required by the task

If an agent needs more context, it should request or retrieve a targeted file, not scan everything.

## Workspace Lifecycle

```txt
inbox
-> working
-> output
-> archive
```

### Inbox

Work arrives.

### Working

The agent explores, drafts, tests, and prepares.

### Output

Approved or handoff-ready artifacts move here.

### Archive

Old context and completed work move here.

## What Workspace Is Not

`workspace/` is not:

- production code
- canonical source of truth
- a dumping ground
- a replacement for `docs/`
- a replacement for `knowledge/`
- a place to store secrets

## Relationship to Existing Repo Layers

```txt
docs/        Operating Manual
knowledge/   Knowledge Vault
apps/        Production Systems
research/    Future Concepts
experiments/ Prototypes
assets/      Brand and media resources
prompts/     AI instructions
scripts/     Operational tooling
workspace/   Agent operating rooms
```

## Implementation Gate

Do not create the full `workspace/` tree until MAIM is ready to operate agents from it.

The first implementation should be small:

```txt
workspace/
  000_SHARED_CONTEXT/
  001_COMMAND_CENTER/
  010_LANDING_AGENT/
  011_REGISTRATION_AGENT/
```

That first version should include templates and two active agent rooms only.

## Open Questions

- Should workspace logs be committed, or should some logs remain local/private?
- Which files from `docs/` should be summarized into `000_SHARED_CONTEXT/` first?
- What contract schema should govern agent-to-agent JSON handoffs?
- Should each agent room map to a future automation, a future Codex thread, or both?
