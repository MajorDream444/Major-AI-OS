# Definition of Done

Status: canonical
Owner: Major AI Mindset

MAIM work is not done just because it compiles.

It is done when the system proves it is safe, understandable, reversible, and ready for the next agent to extend.

Documentation is part of the product.

If a feature is not documented, it is not finished.

## Level 1: Code Quality

Required when applicable:

- syntax check
- lint
- build
- formatting / whitespace check
- no committed secrets
- no accidental generated files
- relevant docs updated

## Level 2: Logic Safety

Required when applicable:

- local harness or unit test
- duplicate protection
- dry-run mode
- idempotency key
- no accidental live sends
- no accidental downstream writes

## Level 3: Platform Verification

Required before production integration:

- real platform test
- real permissions
- real properties / environment variables
- real execution logs
- real rollback path

Examples:

- Google Apps Script against a real Google Sheet
- Airtable sync against a test base or approved test table
- email send only to approved internal test addresses

## Level 4: Production Release

Required before calling the work shipped:

- PR merged
- production deployment completed
- smoke test completed
- release gate documented
- decision record added when the work changes platform direction
- tag created when appropriate
- disabled systems explicitly listed

## Done Means

Every release can answer:

```txt
What changed?
What was tested?
What is still disabled?
What is safe?
What is experimental?
How do we roll back?
Where is it deployed?
Which PRs and tags prove it?
```
