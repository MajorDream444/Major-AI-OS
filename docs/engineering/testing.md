# Testing Standard

Status: canonical
Owner: Major AI Mindset

Testing in MAIM should prove safety, not only correctness.

## Test Levels

```txt
Level 1 - Syntax, lint, build
Level 2 - Local harness and logic
Level 3 - Real platform
Level 4 - Production smoke
```

## Automation Tests

For automations, always test:

- dry-run behavior
- duplicate behavior
- disabled downstream behavior
- event logging
- error capture
- rollback path

## External System Tests

When a subsystem touches Google, Airtable, email, calendar, ManyChat, CRM, payments, or publishing:

- start with a test resource
- use dry-run mode
- never print secrets
- confirm no unexpected downstream writes
- document the exact properties or environment variables used, without values for secrets

## Registration Engine Standard

Registration-like systems must verify:

- one clean submit creates one source record
- duplicate submit does not create a duplicate source record
- event log proves the sequence
- preview records do not send live messages
- disabled systems stay disabled
