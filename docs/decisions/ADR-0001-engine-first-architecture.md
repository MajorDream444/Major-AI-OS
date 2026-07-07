# ADR-0001: Engine-First Architecture

Status: accepted
Date: 2026-07-07

## Context

MAIM is growing from a landing page and content system into a platform with registration, knowledge, agents, analytics, community, and legacy infrastructure.

If every feature is treated as an isolated build, the repository will become hard to reason about as more agents and collaborators join.

## Decision

MAIM will use an engine-first architecture.

The current platform model is:

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

Each engine should have a mission, owner, inputs, outputs, dependencies, configuration, data model, API contracts, release gates, tests, rollback path, roadmap, and future ideas.

## Consequences

- New capabilities must identify which engine they improve.
- Empty architecture should be avoided until an engine has a real reason to exist.
- Future implementation can move into `platform/` only when a concrete engine spec or implementation needs that layer.
- Agents can be assigned to engines instead of broad vague tasks.
