# MAIM Registration Onboarding Engine

Status: Phase 2 system contract
Owner: Major AI Mindset
Primary surface: MAIM Command Room landing page

## Purpose

Turn the landing page registration form into a real onboarding engine without losing the current simple signup path.

The form should still feel calm and human. The backend should become operational: every registration is captured, synced, welcomed, invited, routed, and reviewable.

## Target Pipeline

```txt
Landing Page
-> Google Apps Script intake
-> Google Sheet source log
-> Airtable registration base
-> Welcome email
-> Calendar invite
-> ManyChat follow-up
-> CRM record
```

The Google Form fallback stays available until the full engine is proven in preview and production.

## Data Contract

Every registration should create one lead record with these fields:

```txt
lead_id
submitted_at
source_page
source_form
session_id
session_title
session_date_local
session_timezone
full_name
email
current_lane
agent_route_id
related_agent
email_sequence_id
prompt_pack_id
lesson_path
ai_goal
notes
utm_source
utm_medium
utm_campaign
referrer
consent_status
pipeline_status
last_pipeline_step
last_error
```

Use `lead_id` as the durable ID across Google Sheets, Airtable, email, calendar, ManyChat, and CRM.

Use `current_lane` to resolve personalized follow-up before downstream routing.

Agent routing source:

```txt
data/agents/maim-agent-routing.json
```

Recommended idempotency key:

```txt
email + session_id
```

## Google Sheet Tabs

The Apps Script project should maintain these tabs:

- `registrations`: source-of-truth intake rows
- `pipeline_events`: timestamped step log for each `lead_id`
- `sync_errors`: failed downstream actions and retry notes
- `sessions`: editable session schedule and meeting metadata
- `agent_routes`: lane-to-agent routing map for personalized follow-up
- `config`: non-secret labels, routing names, and enabled/disabled flags

Secrets must stay in Apps Script Properties, not in the sheet and not in repo files.

## Pipeline States

```txt
submitted
sheet_recorded
airtable_synced
welcome_email_sent
calendar_invite_sent
manychat_queued
crm_created
complete
needs_review
failed
```

Each downstream action should write a `pipeline_events` row before moving to the next step.

## Integration Gates

Do not turn on all actions at once.

1. Intake gate: landing page posts to Apps Script and writes the `registrations` row.
2. Sync gate: Apps Script syncs safe test records into Airtable.
3. Message gate: welcome email sends only to internal test addresses.
4. Calendar gate: invite creation is tested against a test calendar.
5. Follow-up gate: ManyChat and CRM writes are dry-run logged before live routing.
6. Production gate: Major approves copy, timing, routing, and rollback.

## Config Placeholders

Use Apps Script Properties for secret or environment-specific values:

```txt
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
AIRTABLE_TABLE_NAME
MANYCHAT_API_KEY
CRM_WEBHOOK_URL
CALENDAR_ID
WELCOME_FROM_NAME
WELCOME_REPLY_TO
DRY_RUN_MODE
ALLOWED_TEST_EMAILS
```

Do not commit real values.

## Welcome Email

The first email should do four jobs:

- Confirm the seat.
- Restate the session date, time, and location.
- Set the tone: practical, human, one useful action.
- Point to the backup path if the invite or link does not arrive.

Avoid generic AI marketing language. Keep the voice in the MAIM command-room style: calm, direct, warm, and useful.

## Calendar Invite

The invite should use the `sessions` tab as the editable schedule source.

Minimum fields:

```txt
session_id
title
description
start_time_iso
end_time_iso
timezone
location
meet_link
```

If `meet_link` is not ready, do not create a misleading invite. Route the registration to `needs_review`.

## Failure Handling

The system should never lose a registration because a downstream tool fails.

Required behavior:

- Write the Google Sheet registration first.
- Log each downstream attempt.
- Put failed downstream steps in `sync_errors`.
- Keep `pipeline_status` readable by a human.
- Allow manual retry by `lead_id`.

## Acceptance Criteria

Phase 2 is ready when:

- A test form submission creates one clean Google Sheet row.
- The same lead syncs once to Airtable.
- Duplicate submissions do not create duplicate Airtable records for the same session.
- Welcome email can run in dry-run and live test modes.
- Calendar invite can run in dry-run and live test modes.
- ManyChat and CRM steps can be disabled without breaking intake.
- Agent route lookup can run in dry-run mode and record the selected route.
- The Google Form fallback remains visible on the landing page.
- No secrets are committed.

## Next Build Step

Use the starter Apps Script module at:

```txt
apps/maim-registration-onboarding-engine/
```

Then harden it with:

- `doPost(e)` for landing page submissions
- schema validation
- lead ID creation
- sheet append
- event logging
- dry-run flags for downstream actions

Keep the landing page inside `experiments` until Major approves production movement.
