# MAIM Codex Operating Manual

Status: Source of truth
Owner: Major Dream Williams
System: Major AI OS
Version: 0.1

## Purpose

This manual defines how Codex should operate inside Major AI OS.

The goal is to stop rebuilding the same work and start building on top of the system.

Codex is not a random code helper.

Codex is the engineering operator for Major AI Mindset, Hanzo, and the wider Major AI OS ecosystem.

Every task must preserve context, protect main, and leave the repo more organized than it found it.

## Core Principle

Do not rush to build.

First understand the lane, branch, folder, task, and acceptance criteria.

Then build.

Then test.

Then report.

## Environment Strategy

Use separate Codex environments by operating lane.

### Environment 1: Mission Control

Purpose:

- Website
- Landing pages
- React
- Vite
- Tailwind
- UI components
- Google AI Studio imports
- Deployment preparation

Default work location:

```txt
experiments/landing-pages/
major-ai-mindset-abc-studio/
app/
```

Use this environment for PR #10 and all MAIM landing page work.

### Environment 2: Knowledge OS

Purpose:

- Markdown knowledge base
- Prompt libraries
- ABC framework
- Curriculum docs
- NotebookLM prep
- Obsidian notes
- Source of truth cleanup

Default work location:

```txt
docs/
prompts/
data/
workflows/
```

### Environment 3: Automation

Purpose:

- Google Apps Script
- Email automation
- Webhooks
- Airtable
- Notion
- Google Sheets
- CRM flows
- ManyChat and lead routing

Default work location:

```txt
automations/
integrations/
scripts/
```

### Environment 4: Hanzo / Lux Advanced Systems

Purpose:

- AI agents
- Blockchain
- Smart contracts
- Tokenization
- RWA infrastructure
- Advanced backend systems

Default work location:

```txt
hanzo/
lux/
agents/
contracts/
```

Only create this environment when the scope is clearly separate from MAIM public landing work.

## Branching Rules

Never start from main for active work.

Use main only as the stable base.

Branch naming:

```txt
feature/[short-feature-name]
cleanup/[short-cleanup-name]
ops/[system-or-playbook-name]
fix/[bug-or-breakage]
experiment/[prototype-name]
```

Examples:

```txt
cleanup/maim-mission-control-vite-import
ops/agent-operating-system
feature/maim-webhook-register-flow
experiment/gravity-well-hero
```

## PR Rules

Every meaningful change gets a PR.

A PR must explain:

- What changed
- Why it changed
- What folder was affected
- How to test it
- What is not included

Do not merge until:

- Lint passes
- Build passes when applicable
- No broken imports
- No missing assets
- No production pages are changed accidentally
- The user approves the direction

## Task Intake Format

Every Codex task should begin with:

```txt
Repository:
Branch:
Working directory:
Goal:
Do not touch:
Commands to run:
Acceptance criteria:
Report format:
```

## Default Codex Task Template

```txt
Repository:
MajorDream444/Major-AI-OS

Branch:
[branch name]

Working directory:
[path]

Goal:
[clear task]

Do not touch:
main
unrelated folders
production files unless explicitly approved

Commands to run:
[commands]

Acceptance criteria:
[what success looks like]

Report format:
- What you changed
- Files touched
- Commands run
- Results
- Risks
- Next recommended step
```

## Current Mission Control Task

PR:

```txt
#10 Import cleaned MAIM Mission Control Vite prototype
```

Branch:

```txt
cleanup/maim-mission-control-vite-import
```

Working directory:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite
```

First commands:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Goal:

Validate the cleaned Vite prototype before merge.

Do not move it out of experiments yet.

## Google AI Studio vs Codex

Use Google AI Studio for:

- Visual exploration
- One shot design directions
- Fast HTML or React prototypes
- Alternative layouts
- Landing page look and feel

Use Codex for:

- Repo cleanup
- Component architecture
- Build testing
- Bug fixes
- Deployment prep
- Accessibility pass
- Form/webhook wiring
- Code quality

Rule:

Studio explores.

Codex engineers.

GitHub remembers.

## Claude Code Role

Claude Code is a senior reviewer and architecture partner.

Use Claude Code for:

- Reviewing PRs
- Catching structural problems
- Comparing approaches
- Refactoring proposals
- Explaining risks

Do not use Claude Code as the only source of truth.

GitHub remains the source of truth.

## Cowork Role

Cowork is the operator and project manager.

Cowork should track:

- What is approved
- What is in review
- What is blocked
- What needs publishing
- What needs follow up
- What should move to the next letter, session, or sprint

Cowork should read these docs before giving production instructions:

```txt
docs/agent-operations/codex-operating-manual.md
docs/agent-operations/agent-environment-map.md
docs/agent-operations/maim-workflow-playbook.md
```

## Quality Rules

No generic AI copy.

No placeholder language left in production.

No broken image paths.

No overbuilding.

No moving experimental work into production without approval.

No direct edits to main for active feature work.

No hidden dependency on local files.

No publishing without a rollback plan.

## MAIM Voice Rules

Sound like Major.

Plain spoken.

Human.

Builder focused.

No fake hype.

No robotic AI marketing language.

Use the approved phrases when they fit:

```txt
If you can text, you can use AI.
Likkle by likkle, we build the future.
See it. Believe it. Build it.
One letter. One lesson. One action.
The hero is not AI. The hero is the human learning how to use it.
```

## Merge Readiness Checklist

Before merge:

- Branch is current enough for review
- App installs
- Lint passes
- Build passes
- Preview runs
- Mobile layout checked
- Signup CTA checked
- Webhook/fallback checked
- README updated
- PR explains the decision
- Major approves the direction

## Final Rule

Every task should make the system easier to operate next time.

We are not just building pages.

We are building the operating system that builds the pages.

Likkle by likkle, we build the future.
