# Pull Request Checklist

Status: canonical
Owner: Major AI Mindset

Use this before asking for review or merge.

## Scope

- The PR has one clear purpose.
- The branch name matches the work.
- Unrelated refactors are not included.
- Generated files are excluded unless intentionally required.

## Safety

- No secrets are committed.
- No live sends are enabled without approval.
- No external write is enabled without an explicit gate.
- Rollback is possible.

## Testing

- Syntax/lint/build checks were run when available.
- Local harness or unit test was run when applicable.
- Platform test was run when the work touches external systems.
- Duplicate/idempotency behavior was tested for registration, sync, messaging, or payment flows.

## Documentation

- Operator docs were updated.
- Release gate was added or updated when the work changes production behavior.
- Disabled systems are explicitly named.
- Next sprint or follow-up is clear.

## Review Question

Before merge, answer:

```txt
Can a future agent understand what changed, what is safe, and what remains disabled?
```
