# MAIM Engineering Standards

Status: foundation manual
Owner: Major AI Mindset

This folder defines how MAIM code, automations, docs, and integrations move from idea to production.

The goal is not just to ask, "Did it work?"

The goal is to ask, "Can this become a repeatable system that future agents can safely extend?"

## Manuals

```txt
branch-strategy.md
pull-request-checklist.md
definition-of-done.md
testing.md
deployment.md
```

## Operating Rule

Every new subsystem should move through the release gate:

```txt
Level 1 - Code Quality
Level 2 - Logic Safety
Level 3 - Platform Verification
Level 4 - Production Release
```

See:

```txt
docs/release-gates/
```
