# MAIM Agent Environment Map

Status: Source of truth
Owner: Major Dream Williams
Version: 0.1

## Purpose

This map defines which AI agent or tool should be used for each kind of work.

The goal is to avoid confusion, repeated setup, and agents stepping on each other.

## Operating Layers

Major AI OS is organized into five operating layers.

```txt
Knowledge Layer
Design Layer
Development Layer
Automation Layer
Distribution Layer
```

Each layer has a primary tool, a backup tool, and a clear output.

## Layer 1: Knowledge Layer

Purpose:

- Curriculum
- ABC framework
- Research notes
- Source of truth docs
- Prompt libraries
- Knowledge vault
- NotebookLM packets

Primary tools:

- ChatGPT
- NotebookLM
- Obsidian
- GitHub markdown

Agent lane:

- Knowledge OS Codex environment
- Cowork for status tracking

Primary repo folders:

```txt
docs/
prompts/
data/
workflows/
```

Output:

- Markdown briefs
- Lesson files
- Podcast prompts
- Opal app prompts
- Omni video prompts
- Curriculum source docs

## Layer 2: Design Layer

Purpose:

- Visual direction
- Landing page concepts
- Social graphics
- Motion prompts
- Design system exploration

Primary tools:

- Google AI Studio
- Aura
- Canva
- Figma

Agent lane:

- Google AI Studio for first visual pass
- Claude Design for style references when available
- Codex only after design direction is selected

Primary repo folders:

```txt
references/
experiments/landing-pages/
design/
assets/
```

Output:

- Prototype screenshots
- HTML concepts
- React prototype exports
- Design handoff docs
- Brand references

## Layer 3: Development Layer

Purpose:

- Apps
- Websites
- Components
- Landing pages
- Build systems
- Deployment preparation

Primary tools:

- Codex
- GitHub
- Vercel or Netlify

Agent lane:

- Mission Control Codex environment

Primary repo folders:

```txt
experiments/landing-pages/
app/
major-ai-mindset-abc-studio/
```

Output:

- Working apps
- Tested branches
- PRs
- Deployment notes
- Build reports

## Layer 4: Automation Layer

Purpose:

- Lead capture
- Email sequences
- Webhooks
- CRM routing
- Airtable and Notion sync
- Google Sheets automation
- ManyChat flows

Primary tools:

- Google Apps Script
- Gmail
- Google Sheets
- Airtable
- Notion
- n8n or Make later

Agent lane:

- Automation Codex environment

Primary repo folders:

```txt
automations/
integrations/
scripts/
docs/automation/
```

Output:

- Apps Script files
- Webhook specs
- CRM maps
- Email sequence docs
- Test reports

## Layer 5: Distribution Layer

Purpose:

- Publishing
- Community updates
- Social content
- Webinar reminders
- Newsletter
- YouTube
- Instagram

Primary tools:

- Postiz
- Instagram
- YouTube
- Gmail
- WhatsApp
- Telegram
- Substack or newsletter platform

Agent lane:

- Cowork for calendar and checklist
- ChatGPT for copy and scripts
- Airtable for content tracking

Primary repo folders:

```txt
content/
workflows/
docs/content-engine/
```

Output:

- Captions
- Scripts
- Schedule notes
- Posting checklists
- Follow up messages

## Agent Decision Table

| Task | First Tool | Second Tool | Repo Action |
| --- | --- | --- | --- |
| New visual idea | Google AI Studio | Aura / Canva | Save prompt and screenshots |
| Clean code | Codex | Claude Code | PR only |
| Review architecture | Claude Code | ChatGPT | Add review notes |
| Build landing page | Codex | Google AI Studio | Feature branch |
| Write curriculum | ChatGPT | NotebookLM | Markdown file |
| Track status | Cowork | Airtable | Update checklist |
| Automate email | Apps Script | Codex | Script folder |
| Store final media | Google Drive | GitHub metadata | Link only unless code asset |

## Current Active Environment

Environment:

```txt
Mission Control
```

Repo:

```txt
MajorDream444/Major-AI-OS
```

Current PR:

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

## Environment Creation Rules

Create a new Codex environment only when:

- The work has a different operating lane
- The setup needs are different
- The agent should not touch the same folders
- The task requires different secrets or dependencies
- The work would create confusion inside the current environment

Do not create a new environment just because a task is new.

Create a branch first.

Create a new environment only when the lane changes.

## Current Recommendation

Use the existing Codex cloud environment for PR #10.

Do not set up local development yet.

Local setup becomes valuable later when:

- Large media assets are involved
- Final deployment assets are being managed
- Daily editing becomes frequent
- Local preview quality matters
- Drive, Obsidian, and repo assets need filesystem coordination

## Final Rule

The environment must match the job.

Do not bring every tool into every task.

Use the smallest reliable system that gets the work done cleanly.
