# Hanzo Legacy Media Engine

Status: Vision capture
Owner: Major Dream Williams
Date: 2026-07-07

## Purpose

This document captures a new strategic layer for MAIM and Hanzo before it becomes an implementation task.

Do not hand this to Codex yet.

This is a vision and architecture note.

## Core Insight

Most people keep years of valuable video, audio, podcasts, voice notes, interviews, workshops, family recordings, lives, reels, talks, and raw footage trapped on phones, hard drives, cloud folders, and old project archives.

The value is not only in creating new media.

The value is also in recovering, organizing, understanding, tagging, repurposing, and preserving the media that already exists.

## Working Name

Hanzo Legacy Media Engine

Other possible names:

- Legacy Media OS
- Memory-to-Media Engine
- Ancestral Media Vault
- Hanzo Signal Vault
- Personal Media Intelligence Layer
- Legacy Content Engine

## Strategic Frame

MAIM teaches people to think with AI.

Hanzo can help people operationalize the media and knowledge they already created.

This engine turns dormant media into usable intelligence, searchable memory, repurposable content, and long-term legacy assets.

## Problem

People have valuable media sitting unused:

- iPhone videos
- voice notes
- podcast recordings
- Zoom calls
- old webinars
- family interviews
- business workshops
- client calls
- raw B-roll
- livestream archives
- spiritual talks
- health journeys
- founder reflections
- product demos
- event footage
- community conversations

Most of this media is never:

- transcribed
- tagged
- summarized
- searched
- edited
- clipped
- connected to themes
- turned into lessons
- preserved as legacy
- linked to a person, place, moment, or mission

## Opportunity

Build an OS that can ingest old media, understand it, and make it useful again.

The system should help answer:

```txt
What do I have?
What is inside it?
Who is in it?
What was said?
What themes are present?
What can be clipped?
What can become a lesson?
What should be preserved?
What should become a product, post, podcast, chapter, card, or course?
```

## Initial Capabilities

### 1. Ingest

Bring media in from:

- iPhone exports
- hard drives
- Google Drive
- Dropbox
- local folders
- podcast archives
- YouTube downloads
- livestream recordings
- WhatsApp exports
- Telegram folders

### 2. Normalize

Create a predictable media structure:

```txt
source file
clean filename
date
format
duration
location
person or project
collection
rights status
```

### 3. Transcribe

Generate transcripts for:

- video
- podcast audio
- voice notes
- interviews
- meetings
- webinars

### 4. Tag

Tag media by:

- people
- project
- date
- location
- topic
- emotion
- lesson
- quote
- product idea
- spiritual theme
- business theme
- MAIM ABC letter
- agent relevance
- reuse potential

### 5. Analyze

Use model routing to analyze media through multiple lenses:

- summary
- key quotes
- themes
- clips
- chapter markers
- emotional arc
- teaching moments
- founder story
- brand assets
- content opportunities
- evergreen wisdom

### 6. Repurpose

Turn existing media into:

- short clips
- podcast segments
- newsletter drafts
- social posts
- quote cards
- lesson outlines
- YouTube chapters
- course modules
- book chapters
- pitch material
- legacy cards
- knowledge base entries

### 7. Preserve

Store important material as legacy assets:

- founder vault
- family archive
- community memory
- course source library
- cultural record
- oral history
- personal knowledge graph

## OpenRouter Layer

OpenRouter can become the model-routing layer.

Different models can be used for different media tasks:

- cheap model for basic transcript cleanup
- strong reasoning model for deep theme extraction
- vision model for visual scene tagging
- long-context model for full podcast analysis
- creative model for repurposed captions and titles
- local model for private archive scanning

This keeps Hanzo from depending on one model or one vendor.

## Video Intelligence Layer

This is not only video editing.

It is video intelligence.

Editing asks:

```txt
How do we cut this?
```

Video intelligence asks:

```txt
What is this media worth?
Where is the signal?
How should it be organized?
What can it become?
What should never be lost?
```

## Legacy Layer

Legacy is not only storage.

Legacy means meaning stays attached to the media.

A family video without context is just a file.

A family video with names, dates, places, transcript, story, lessons, and tags becomes an inheritance.

For MAIM and Hanzo, this matters because the mission is not only content creation.

The mission is memory, sovereignty, wisdom, and continuity.

## Relationship To MAIM

MAIM can use this engine to organize:

- live knowledge sessions
- morning mindset recordings
- ABC lesson videos
- podcast drafts
- webinar archives
- social video source files
- founder voice notes
- community testimonials
- student wins
- cohort calls

Each recording can become:

- searchable transcript
- ABC-linked lesson
- content clip
- NotebookLM packet
- podcast segment
- newsletter draft
- training asset
- legacy artifact

## Relationship To Hanzo

Hanzo can become the infrastructure layer behind:

- media ingestion
- transcription
- model routing
- clip detection
- knowledge extraction
- storage
- semantic search
- asset repurposing
- creator/business media vaults

This gives Hanzo a practical product lane beyond generic AI automation.

## Possible Architecture

```txt
Media Source
↓
Ingest Worker
↓
Storage Layer
↓
Transcript Layer
↓
Metadata + Tagging Layer
↓
OpenRouter Model Layer
↓
Knowledge Graph
↓
Clip + Repurpose Engine
↓
Legacy Vault
↓
Search / Dashboard / Agent Interface
```

## First MVP Thought

Start small.

Pick one folder of old media.

Run one batch:

1. List files.
2. Extract metadata.
3. Transcribe one file.
4. Summarize it.
5. Tag it.
6. Identify 3 clips.
7. Connect it to one MAIM ABC letter.
8. Save a JSON record.
9. Save a human-readable markdown summary.

No dashboard yet.

No full automation yet.

No blockchain yet.

Just prove that old media can become searchable, meaningful, and reusable.

## Data Record Sketch

```json
{
  "assetId": "legacy-media-001",
  "sourceFile": "IMG_1234.mov",
  "title": "Morning reflection on AI mindset",
  "dateCaptured": "2025-08-14",
  "people": ["Major Dream Williams"],
  "projects": ["MAIM"],
  "topics": ["AI mindset", "belief", "legacy"],
  "abcLetters": ["B", "E"],
  "duration": "00:18:42",
  "transcriptPath": "transcripts/legacy-media-001.md",
  "summaryPath": "summaries/legacy-media-001.md",
  "clipIdeas": [
    "If you can text, you can use AI",
    "Experiment before you overbuild",
    "The human is the hero"
  ],
  "reusePotential": "high",
  "rightsStatus": "owned",
  "legacyValue": "founder philosophy"
}
```

## Guardrails

This system must handle privacy carefully.

Do not assume all media is public.

Every asset needs a rights and visibility status:

```txt
private
family-only
internal
community
public
licensed
unknown
```

Never publish or repurpose private media without approval.

## Future Possibilities

- personal AI memory vault
- family archive product
- creator archive cleanup service
- founder legacy package
- podcast recovery engine
- YouTube back catalog analysis
- cohort call knowledge base
- NFT or tokenized milestone archive
- Caribbean oral history vault
- diaspora story preservation engine
- AI-assisted documentary builder

## Strategic Position

This could become one of Hanzo's strongest product directions:

```txt
We do not just help you create new content.
We help you recover the value of everything you already created.
```

## Current Decision

Do not build yet.

Capture the idea.

Study the repositories Major found.

Identify reusable components.

Then design the smallest safe MVP.

## Final Thought

The future is not only generated media.

The future is remembered media.

Likkle by likkle, we turn memory into legacy.
