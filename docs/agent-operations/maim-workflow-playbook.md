# MAIM Workflow Playbook

Status: Source of truth
Owner: Major Dream Williams
Version: 0.1

## Purpose

This playbook defines how work moves through Major AI OS.

It connects Google AI Studio, Codex, GitHub, Notion, Google Drive, Cowork, and future agents into one repeatable operating rhythm.

## Core Workflow

```txt
Idea
→ Design exploration
→ Experiment branch
→ Codex implementation
→ Build test
→ Preview
→ Human review
→ Merge
→ Deploy
→ Document
→ Reuse
```

## Rule 1: GitHub Remembers

If a decision matters, put it in GitHub.

GitHub stores:

- Source of truth docs
- Playbooks
- Prompts
- Code
- Experiment folders
- PR decisions
- Review notes
- Deployment instructions

Do not rely on chat memory alone.

## Rule 2: Studio Explores

Google AI Studio is for fast concept generation.

Use it when:

- You need a first visual direction
- You want to test a design idea
- You want to compare layouts
- You want a one shot prototype
- You want to avoid spending Codex time too early

The output must be reviewed before becoming repo code.

## Rule 3: Codex Engineers

Codex is for implementation.

Use it when:

- The direction is chosen
- The work is in GitHub
- A branch exists
- The acceptance criteria are clear
- The code needs to build
- A PR needs cleanup

Codex should not freestyle without a branch, folder, and task brief.

## Rule 4: Cowork Operates

Cowork tracks production state.

Cowork should answer:

- What is active?
- What is blocked?
- What needs approval?
- What needs publishing?
- What changed since yesterday?
- What should happen next?

Cowork should use GitHub docs, Airtable, and Google Drive as sources.

## Rule 5: Google Drive Stores Media

Google Drive stores large or binary assets.

Use Drive for:

- Images
- Videos
- Audio
- PDFs
- Exports
- Final media assets

Use GitHub for:

- Metadata
- Paths
- Prompts
- Source docs
- Code

Do not bloat GitHub with heavy media unless it is required for the app to run.

## Rule 6: Notion Presents

Notion is for human-readable dashboards and review pages.

Use Notion for:

- Review pages
- Project summaries
- Stakeholder handoffs
- Meeting notes
- Visual status boards

Do not make Notion the only source of truth for code, prompts, or core strategy.

GitHub remains the canonical source.

## Rule 7: Airtable Tracks Production

Airtable tracks operational status.

Use Airtable for:

- Asset IDs
- Content status
- Publishing status
- Assigned owner
- Platform
- Approval stage
- Links to GitHub, Drive, and Notion

Airtable answers what stage something is in.

GitHub answers what it is.

## Landing Page Workflow

### Step 1: Visual Direction

Use Google AI Studio or Aura.

Save:

- Prompt
- Screenshot
- Exported files
- Notes on what worked

### Step 2: Experiment Folder

Place the work under:

```txt
experiments/landing-pages/[name]
```

Include:

```txt
README.md
index or app files
decision-notes.md
performance-checklist.md
```

### Step 3: Branch

Create a branch:

```txt
experiment/[landing-page-name]
```

or:

```txt
cleanup/[landing-page-name]
```

### Step 4: Codex QA

Codex runs:

```bash
npm install
npm run lint
npm run build
npm run dev
```

For non-Node pages, Codex must identify the correct local preview method.

### Step 5: Review

Check:

- Desktop
- Mobile
- CTA clarity
- Load speed
- Copy voice
- Broken imports
- Missing assets
- Form behavior
- Accessibility basics

### Step 6: Merge Decision

Do not merge because it builds.

Merge only when:

- It builds
- It serves the strategy
- Major approves the direction
- Rollback is clear

## Signup and CRM Workflow

Current funnel:

```txt
Landing page
→ Google Apps Script webhook
→ Google Sheet
→ Gmail confirmation sequence
→ MAIM label
→ Follow up / cohort segmentation
```

Current webhook:

```txt
https://script.google.com/a/macros/hanzo.ai/s/AKfycbxpxqKd_unYrHyen2cpxAU85_H4oEU_76Ck4wn2Wpf_rHq2XSl4kOVqpWTEJ0bUZis6/exec
```

Backup form:

```txt
https://forms.gle/RdSX2R6dyRJLqjkk7
```

Phase 2 target:

```txt
Landing page
→ Google Apps Script intake
→ Google Sheet source log
→ Airtable
→ Welcome email
→ Calendar invite
→ ManyChat
→ CRM
```

System contract:

```txt
docs/agent-operations/maim-registration-onboarding-engine.md
```

Agent personalization contract:

```txt
docs/agent-operations/maim-agent-personalization-layer.md
```

Landing CMS content contract:

```txt
docs/agent-operations/maim-landing-cms-content-layer.md
```

## Content Workflow

ABC lesson database:

```txt
data/abc/maim-abc-database.json
```

For ABC content:

```txt
Letter concept
→ Lesson
→ Reel
→ Carousel
→ Caption
→ Podcast prompt
→ Opal prompt
→ Omni prompt
→ GitHub metadata
→ Airtable status
→ Drive media
→ Notion review page
→ Schedule
```

Every asset should have:

- Asset ID
- Letter
- Concept
- Level
- Status
- GitHub path
- Drive path
- Notion review link
- CTA
- Notes

## Review Language

Every review should answer:

```txt
What works?
What breaks?
What is missing?
What should be simplified?
What should be built next?
```

## Merge Policy

Main is stable.

Experiments do not become production automatically.

Production work must pass:

- Build check
- Voice check
- Mobile check
- CTA check
- Integration check
- Human approval

## Deployment Policy

Before deployment:

- Confirm repo folder
- Confirm build command
- Confirm output directory
- Confirm environment variables
- Confirm webhook or form behavior
- Confirm rollback path

Do not connect a production domain until preview passes.

## Current Active Path

Active page project:

```txt
MAIM Mission Control Vite Prototype
```

Active PR:

```txt
#10 Import cleaned MAIM Mission Control Vite prototype
```

Active branch:

```txt
cleanup/maim-mission-control-vite-import
```

Active working directory:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite
```

Next action:

Run Codex QA from the PR branch.

## Final Rule

Every workflow should create reusable structure.

The goal is not to finish one task.

The goal is to make the next task easier.
