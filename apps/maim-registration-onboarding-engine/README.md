# MAIM Registration Onboarding Engine Apps Script

Status: Phase 2 starter module

This Apps Script module is the backend starting point for the MAIM registration pipeline:

```txt
Landing Page
-> Google Apps Script
-> Google Sheet
-> Airtable
-> Welcome Email
-> Calendar Invite
-> ManyChat
-> CRM
```

The script is dry-run-first. It records registrations and pipeline events before any downstream write is enabled.

## Install

1. Create or open the MAIM registration Google Sheet.
2. Open Extensions -> Apps Script.
3. Copy `Code.gs` into the Apps Script editor.
4. Copy `appsscript.json` into Project Settings -> Show appsscript.json.
5. Run `setupMaimRegistrationSheets`.
6. Set Script Properties.
7. Deploy as a web app.

## Required Script Properties

```txt
REGISTRATION_SPREADSHEET_ID
DRY_RUN_MODE=true
```

## Optional Script Properties

```txt
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
AIRTABLE_TABLE_NAME
MANYCHAT_API_KEY
CRM_WEBHOOK_URL
CALENDAR_ID
WELCOME_FROM_NAME
WELCOME_REPLY_TO
ALLOWED_TEST_EMAILS
```

Do not commit real values to the repo.

## Test

Run `testMaimRegistrationDryRun` in Apps Script. Confirm rows are created in:

- `registrations`
- `pipeline_events`
- `agent_routes`

Only turn `DRY_RUN_MODE` off after Major approves the live routing behavior.
