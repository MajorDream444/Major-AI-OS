# MAIM Agent Personalization Layer

Status: Phase 2 system contract
Primary surface: MAIM Command Room landing page
Depends on: registration onboarding engine and ABC database

## Purpose

Use the visitor's selected lane to route them into a more relevant MAIM follow-up path.

The landing page should not eventually send every visitor the same email, same prompt, same lesson, and same CTA. A creator, parent, entrepreneur, coach, beginner, and professional need the same MAIM foundation but different examples and next steps.

## Core Flow

```txt
Visitor chooses lane
-> registration form submits current_lane
-> Apps Script records current_lane
-> route lookup returns agent_route_id
-> onboarding engine selects email path
-> onboarding engine selects prompt pack
-> onboarding engine selects ABC lesson path
-> ManyChat receives lane tag
-> CRM receives segment
```

Example:

```txt
Creator
-> Creator Agent
-> creator email sequence
-> creator prompt pack
-> A, C, I, P, Y, X lesson path
-> lane_creator ManyChat tag
-> MAIM Creator CRM segment
```

## Source Data

Agent routing map:

```txt
data/agents/maim-agent-routing.json
```

ABC lesson database:

```txt
data/abc/maim-abc-database.json
```

Registration engine:

```txt
apps/maim-registration-onboarding-engine/
```

## Route Fields

Each route must define:

```txt
lane
agentId
agentName
agentMission
emailSequenceId
promptPackId
lessonPath
downloadPath
manychatTag
crmSegment
nextCta
```

## First Supported Lanes

```txt
Beginner
Creator
Entrepreneur
Coach
Parent
Professional
```

These match the current landing-page lane options.

## Data Handling

The landing page should continue submitting:

```txt
current_lane
```

The backend should resolve:

```txt
agent_route_id
related_agent
email_sequence_id
prompt_pack_id
lesson_path
manychat_tag
crm_segment
```

Do not expose internal routing IDs to visitors unless there is a clear product reason.

## Implementation Gates

1. Data gate: keep `data/agents/maim-agent-routing.json` valid and aligned with landing-page lanes.
2. Intake gate: add route fields to Google Sheet registration rows.
3. Email gate: use `emailSequenceId` only in dry-run mode until the copy is approved.
4. Prompt gate: attach `promptPackId` to the follow-up email or Airtable record.
5. Lesson gate: use `lessonPath` to recommend ABC lessons.
6. ManyChat gate: send lane tag only after ManyChat endpoint mapping is confirmed.
7. CRM gate: write `crmSegment` only after CRM field names are confirmed.

## Acceptance Criteria

This layer is ready when:

- Every landing-page lane has exactly one route.
- Every route has a valid agent, email sequence, prompt pack, lesson path, ManyChat tag, and CRM segment.
- The registration row stores both the visitor lane and resolved route.
- The ABC lesson path points to letters that exist in `data/abc/maim-abc-database.json`.
- Dry-run logs show which route would have been used.
- No live email, ManyChat, or CRM routing happens without Major approval.

## Next Build Step

Update the Apps Script registration engine so `current_lane` resolves to a route and logs the selected route in `registrations` and `pipeline_events`.
