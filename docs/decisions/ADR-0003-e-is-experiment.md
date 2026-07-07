# ADR-0003: E Is Experiment

Status: accepted
Date: 2026-07-07

## Context

The early A-E roadmap used Execution in the fifth position. That created overlap with the broader ABC system, where shipping and implementation belong later in the journey.

MAIM needs a cleaner distinction between testing an idea and shipping a system.

## Decision

The canonical A-E spine is:

```txt
A = Awareness
B = Belief
C = Context
D = Direction
E = Experiment
```

Execution remains in the system as:

```txt
X = eXecution
```

## Consequences

- Experiment is the testing layer.
- eXecution is the shipping layer.
- Landing page copy, ABC data, docs, and future knowledge assets should use `E = Experiment`.
- Any old `E = Execution` reference should be treated as stale unless explicitly marked as historical.
