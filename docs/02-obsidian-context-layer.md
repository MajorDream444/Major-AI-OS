# Obsidian Relationship Context Layer

## Purpose

Obsidian is the private relationship/context memory layer for Major AI Mindset ABC Studio.

It should capture what structured tools do not capture well:

- Who is connected to whom
- Relationship history
- Trust signals
- Decision context
- Meeting memory
- Strategic commitments
- Audience/community signals
- Personal context that should not be public

## What Belongs in Obsidian

Use Obsidian for:

- Partner profiles
- Community leader notes
- Member journey notes
- Event context
- Podcast guest context
- Outreach notes
- Relationship maps
- Decision logs
- Weekly reflections
- Lessons learned
- Strategic breadcrumbs

## What Does Not Belong in Obsidian

Do not use Obsidian as the only home for:

- Source code
- Production metadata
- Canonical prompts
- Final schemas
- Published asset manifests
- Public docs

Those belong in GitHub.

## Suggested Vault Structure

```txt
Major AI Mindset Vault/
  00-Dashboard.md
  01-People/
    Partners/
    Mentors/
    Members/
    Guests/
  02-Projects/
    ABC Studio/
      Decisions/
      Weekly Reports/
      Letter Context/
  03-Content/
    Podcasts/
    Reels/
    Newsletters/
  04-Relationships/
    Introductions/
    Trust Notes/
    Follow Ups/
  05-Strategy/
    Architecture/
    Offers/
    Events/
  06-Meeting Notes/
  07-Templates/
```

## Per-Letter Obsidian Note Template

```md
# MAIM ABC — {{LETTER}} is for {{CONCEPT}}

## Canonical Asset ID

{{ASSET_ID}}

## GitHub Source

{{GITHUB_PATH}}

## Airtable Record

{{AIRTABLE_URL}}

## Notion Review Page

{{NOTION_URL}}

## Google Drive Master

{{DRIVE_URL}}

## Relationship Context

Who discussed this letter?
Who asked questions about this concept?
Who should see this asset?
Who could become a partner/member/client from this topic?

## Audience Signals

Comments:
Questions:
Objections:
Best-performing platform:
Weakest-performing platform:

## Follow-Ups

- [ ] Person / group to follow up with
- [ ] DM idea
- [ ] Podcast expansion idea
- [ ] Cohort invitation idea
```

## Sync Rule

Obsidian remembers relationship context. GitHub remembers canonical production context.

If an Obsidian note changes the actual asset, schema, workflow, or prompt, that change must be mirrored back into GitHub.
