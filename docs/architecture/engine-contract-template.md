# Engine Contract Template

Status: template
Owner: Major AI Mindset

Use this template when defining a new MAIM engine.

Every engine should feel familiar to future agents and contributors.

## Mission

What does this engine exist to do?

## Owner

Which agent or human owns this engine?

## Inputs

- Input 1
- Input 2
- Input 3

## Outputs

- Output 1
- Output 2
- Output 3

## Dependencies

- Internal dependency
- External platform
- Data source

## Configuration

List environment variables, Apps Script properties, Airtable settings, or other configuration names.

Do not include secret values.

## Data Model

Describe primary records, fields, IDs, and ownership.

## API Contracts

Describe request/response shapes, webhooks, Apps Script functions, Airtable writes, or future endpoints.

## Release Gates

Which release gates must this engine pass?

```txt
Level 1 - Code Quality
Level 2 - Logic Safety
Level 3 - Platform Verification
Level 4 - Production Release
```

## Tests

What must be tested before merge?

## Rollback

How do we disable, revert, or safely pause this engine?

## Roadmap

What belongs in the current season?

What belongs later?

## Future Ideas

Preserve useful ideas here without turning them into immediate implementation.
