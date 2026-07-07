# Deployment Standard

Status: canonical
Owner: Major AI Mindset

## Deployment Principle

Deploy only after the release gate for the subsystem has passed.

Production should be boring.

## Before Deploy

- PR is reviewed and merged.
- Build passes.
- Required platform tests pass.
- Rollback path is known.
- Disabled systems are listed.

## After Deploy

- Smoke test the production URL.
- Confirm visible content is correct.
- Confirm forms and fallbacks still work.
- Confirm no console errors for frontend releases when applicable.
- Confirm no live sends or external writes were accidentally enabled.

## Tagging

Tag stable milestones that future agents may need to return to.

Examples:

```txt
v0.1.0
v0.1.1
v0.2.0
```

## Release Record

Every production-capable release should have a file in:

```txt
docs/release-gates/
```
