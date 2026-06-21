# MAIM Asset Package Template

## Purpose

This is the reusable production template for every Major AI Mindset ABC asset package.

Use this for each letter, level, and concept.

## Operating Rule

One package = one concept = one production bundle.

Do not scatter captions, scripts, prompts, thumbnails, and videos across disconnected files.

Every asset package should be traceable across:

- GitHub
- Google Drive
- Airtable
- Notion
- Obsidian
- NotebookLM
- Google Opal
- Google Omni
- Social platforms

## Asset ID Format

```txt
MAIM-ABC-[LEVEL]-[LETTER]-[CONCEPT]-[ASSETTYPE]-V001
```

Example:

```txt
MAIM-ABC-BEG-B-BELIEF-REEL-V001
```

## Required Asset Types

Each complete package should include:

1. Thumbnail
2. Lesson
3. Reel Script
4. Carousel Copy
5. Caption Pack
6. Podcast / NotebookLM Prompt
7. Google Opal App Prompt
8. Google Omni Video Prompt
9. Obsidian Context Note
10. Metadata JSON

## Required Fields

```json
{
  "assetId": "",
  "series": "Major AI Mindset ABCs",
  "level": "Beginner",
  "letter": "",
  "concept": "",
  "assetType": "",
  "title": "",
  "status": "",
  "bigIdea": "",
  "fiveMinuteAction": "",
  "cta": "",
  "githubPath": "",
  "googleDriveUrl": "",
  "airtableRecordUrl": "",
  "notionReviewUrl": "",
  "obsidianNotePath": "",
  "publishedPlatforms": [],
  "createdAt": "",
  "updatedAt": ""
}
```

## Status Flow

```txt
Idea
→ Drafted
→ Generated
→ Needs Review
→ Approved
→ Designed
→ Recorded
→ Edited
→ Scheduled
→ Published
→ Repurposed
```

## Per-Package Checklist

### GitHub

- [ ] Lesson data exists
- [ ] Metadata JSON exists
- [ ] Prompt files exist
- [ ] Package report exists

### Google Drive

- [ ] Master thumbnail uploaded
- [ ] Master video uploaded
- [ ] Any Canva/export files uploaded

### Airtable

- [ ] Asset package record exists
- [ ] Individual asset type records exist
- [ ] Status is current
- [ ] Platform publishing fields are current

### Notion

- [ ] Review page exists
- [ ] Approval notes captured
- [ ] Links back to GitHub / Drive / Airtable

### Obsidian

- [ ] Relationship context note exists
- [ ] Audience signals captured
- [ ] Partner/community follow-ups captured

### Publishing

- [ ] Instagram caption ready
- [ ] TikTok caption ready
- [ ] YouTube Shorts caption ready
- [ ] LinkedIn caption ready
- [ ] Newsletter/Substack copy ready

## Cowork Operator Rule

Cowork should run one package at a time and report:

- Created
- Missing
- Needs Major's approval
- Recommended next action

## Parallel Pipeline Rule

When one letter is ready for approval, the next letter can be drafted in parallel.

Example:

```txt
A = Approval / Production
B = Full package build
C = Concept setup
```

This prevents the publishing engine from stalling.
