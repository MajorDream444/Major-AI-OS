# MAIM Vault MVP Specification

Status: MVP design ready
Date: 2026-06-29
Project: Major AI Mindset
Parent Systems:
- MAIM 09 — Media Vault + Merch Artifacts
- MAIM 09 — Knowledge Vault Sessions Standard
- MAIM 08 — Hanzo Powered-By Assets

## Core Decision

The Vault is the business memory of MAIM.

It is where ideas become assets, assets become IP, and IP becomes reusable, searchable, monetizable knowledge.

## Core Formula

```txt
Idea → Asset → IP → Vault → Reuse → Revenue
```

## MVP Purpose

Build a simple working prototype of the MAIM Vault that lets the team:

```txt
Browse assets
Search assets
Add new assets
View asset details
Track asset status
Group assets by category
Connect assets to Knowledge Vault Sessions
```

The MVP does not need blockchain, payments, token gating, marketplace features, or complex automation yet.

The first goal is visibility.

```txt
Can we see what we have?
Can we find it again?
Can we connect it to the system?
```

## Product Name

```txt
MAIM Vault
```

Internal name:

```txt
Major AI Mindset Knowledge Vault MVP
```

## User Roles

### Founder / Operator

Major can add assets, organize sessions, review status, and identify what needs to be produced next.

### Agent / Assistant

ChatGPT, Claude, Codex, Cowork, and future AMA agents using Hanzo infrastructure can use the Vault structure to understand what exists and what needs to happen next.

### Future Member

A future MAIM member can search approved lessons, prompts, replays, and resources.

Member access is not part of the first MVP.

## MVP Screens

### 01 — Dashboard

Shows the state of the Vault.

Cards:

```txt
Total Assets
Knowledge Sessions
Needs Review
Ready to Publish
Published
Archived
```

Recent activity:

```txt
Latest session
Latest asset
Latest prompt
Latest video
Latest document
```

### 02 — Asset Library

A searchable grid/list of all Vault assets.

Fields visible:

```txt
Asset ID
Title
Category
Status
Format
Related Session
Last Updated
```

### 03 — Asset Detail Page

Each asset has a detail page.

Fields:

```txt
Asset ID
Title
Description
Category
Format
Status
Version
Owner
Source Link
Drive Link
GitHub Path
Notion Link
Airtable Record
Related Session
Related ABC Letter
Tags
Revenue Potential
Next Action
```

### 04 — Knowledge Sessions

A list of Knowledge Vault Sessions.

Each session shows:

```txt
Session Number
Title
Date
Theme
Recording Link
Transcript Link
Knowledge Index Link
Assets Created
Production Status
```

### 05 — Add New Asset

A simple form to register an asset.

Required fields:

```txt
Title
Category
Format
Status
Source Link
Tags
Next Action
```

### 06 — Status Board

Kanban-style board:

```txt
Captured
Extracted
Indexed
Designed
Ready to Publish
Published
Archived
```

## Data Model

### Asset

```json
{
  "id": "MAIM-ABC-A-001",
  "title": "A — Awareness: Notice the Opportunity",
  "description": "Hero visual and lesson asset for A Awareness.",
  "category": "ABC Curriculum",
  "format": "Image",
  "status": "Ready to Publish",
  "version": "v1",
  "owner": "Major Dream Williams",
  "source_link": "",
  "drive_link": "",
  "github_path": "",
  "notion_link": "",
  "airtable_record": "",
  "related_session": "KVS-001",
  "related_letter": "A",
  "tags": ["Awareness", "ABC", "Mindset", "Visual"],
  "revenue_potential": "Medium",
  "next_action": "Create caption and schedule post"
}
```

### Knowledge Session

```json
{
  "id": "KVS-001",
  "title": "The ABCs Are Life Principles First",
  "date": "2026-06-28",
  "theme": "Mindset before AI tools",
  "recording_link": "",
  "transcript_link": "",
  "knowledge_index_link": "docs/maim-09-session-001-knowledge-index.md",
  "status": "Indexed",
  "assets_created": ["MAIM-KVS-001-INDEX"]
}
```

## Categories

```txt
Brand
ABC Curriculum
Knowledge Vault Session
Webinar
Video
Image
Prompt
Agent
Course
Cohort
Website
Newsletter
Research
Legal
Revenue
CoCo 40
ART MOB
Plantbasedman
Hanzo
```

## Statuses

```txt
Captured
Extracted
Indexed
Designed
Ready to Publish
Published
Archived
Needs Review
Backlog
```

## Design Direction

Use MAIM visual language:

```txt
Black foundation
Gold authority
Jamaican green legacy
Champion blue action energy
Orange CTA accents
White clarity
Editorial dashboard style
Calm operator energy
Premium but simple
```

The MVP should feel like a command center, not a consumer social app.

## Technical Options

### One-Shot Prototype

Use Google AI Studio / Gemini to generate a quick visual prototype or static web app.

Purpose:

```txt
See the shape of the product quickly.
Validate screens.
Clarify data model.
Create something Codex / Claude Code can improve.
```

### Build MVP

Preferred stack:

```txt
Next.js
Tailwind CSS
Supabase
Vercel
GitHub
```

Later integrations:

```txt
Google Drive
Airtable
Notion
Slack
n8n
Obsidian
AMA agents using Hanzo infrastructure
```

## What Is Not Included In MVP

```txt
Payments
Token gating
Blockchain certificates
Full member portal
Complex permissions
Video editing
AI retrieval chat
Shopify commerce
Marketplace
```

These belong later.

## Definition of Done

The first MVP is done when:

```txt
1. A user can view dashboard metrics.
2. A user can browse asset records.
3. A user can search/filter assets.
4. A user can open an asset detail page.
5. A user can view Knowledge Vault Session 001.
6. A user can add a new asset record.
7. The app is deployed on Vercel.
```

## Next Move

Create a one-shot Google AI Studio prototype first.

Then use the generated artifact as visual reference for Claude Code / Codex to build the real app.

Guiding rule:

```txt
Do not overbuild.
Make the Vault useful first.
```
