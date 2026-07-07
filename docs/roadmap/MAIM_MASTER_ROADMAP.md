# MAIM Master Roadmap

Status: living map
Owner: Major AI Mindset

This is not a backlog.

This is the alignment map for the MAIM Platform.

Every agent should read this before planning major work.

## Roadmap Boundary

Keep these layers separate:

```txt
Vision  = 10-year direction
Roadmap = season objectives
Backlog = implementation tasks
```

Do not turn this roadmap into a task list.

## Platform Model

```txt
MAIM Platform
├── Command Room
├── Knowledge Engine
├── Registration Engine
├── Content Engine
├── Agent Engine
├── Community Engine
├── Analytics Engine
└── Legacy Engine
```

## Horizons

| Horizon | Focus | Success |
| --- | --- | --- |
| Now | Ship and validate | People attend sessions and complete registrations |
| Next | Automate operations | Registration, emails, routing, and analytics run reliably |
| Later | Scale the platform | Multiple cohorts, agents, labs, and content engines operate together |
| Vision | Build a legacy ecosystem | MAIM becomes a knowledge operating system with global communities, certifications, and licensed facilitators |

## Operating Seasons

### Season 1: The Foundation

Focus:

- Portal
- Command Room
- Registration
- ABC foundation
- Knowledge sessions

Success:

- The landing page works as the front door.
- Registrations safely enter the system.
- The ABC canon is stable.
- The first knowledge sessions create reusable teaching assets.
- Release gates are documented and followed.

### Season 2: Builders

Focus:

- Prompt library
- Labs
- Automation
- Agents
- Airtable-backed operations

Success:

- Participants receive useful, lane-aware follow-up.
- Agents can route people to prompts, lessons, and next actions.
- Internal operations become less manual without becoming unsafe.

### Season 3: Scale

Focus:

- Community
- Marketplace
- Certification
- Multi-cohort delivery
- Analytics engine

Success:

- MAIM can support multiple groups, facilitators, agents, and content paths without losing coherence.
- The platform can measure what people attend, use, complete, and need next.

### Season 4: Legacy

Focus:

- Knowledge vault
- Tokenization
- Licensing
- Global chapters
- Legacy OS

Success:

- MAIM becomes a durable knowledge operating system that can be taught, licensed, localized, and expanded beyond one founder-led room.

## Current Priority

Season 1 is active.

The current system priority is:

```txt
Command Room
-> Registration Engine
-> Airtable Sync Gate
-> Welcome Email Gate
-> Calendar Gate
-> ManyChat Gate
-> CRM Gate
```

## Sprint Ladder

```txt
Sprint 001 - Registration enters Google Sheet, preview email, event log
Sprint 002 - Google Sheet to Airtable, dry-run first
Sprint 003 - Welcome email only
Sprint 004 - Calendar invite
Sprint 005 - ManyChat
Sprint 006 - CRM
```

## Agent Planning Rule

Before starting work, identify:

```txt
Which engine does this improve?
Which season does it belong to?
Which release gate proves it is safe?
Which agent owns it?
What stays disabled?
```

## Related Manuals

```txt
docs/decisions/
docs/design-system/
docs/engineering/
docs/agents/
docs/architecture/
docs/release-gates/
knowledge/
```
