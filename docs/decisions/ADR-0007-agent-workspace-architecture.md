# ADR-0007: Agent Workspace Architecture

Status: proposed
Date: 2026-07-07

## Context

MAIM has strong documentation architecture: `docs/`, `knowledge/`, `apps/`, `experiments/`, `prompts/`, and other source layers are increasingly clear.

That does not yet solve how 144 agents should work inside the repository without scanning too much, losing context, duplicating work, or stepping on one another.

Agents need an operating architecture, not only job descriptions.

## Decision

Introduce a future top-level `workspace/` layer for agent operating rooms.

The proposed structure is:

```txt
workspace/
  000_SHARED_CONTEXT/
  001_COMMAND_CENTER/
  010_LANDING_AGENT/
  011_REGISTRATION_AGENT/
  012_CONTENT_AGENT/
  ...
  144_AGENT/
```

Every agent room should use the same internal structure:

```txt
README.md
context/
inbox/
working/
output/
logs/
archive/
memory.md
```

## Consequences

- Agents receive layered context instead of the whole repo.
- Token usage becomes easier to control.
- Agent-to-agent handoff happens through files and contracts, not hidden chat history.
- `working/` remains temporary.
- `output/` contains approved artifacts only.
- `memory.md` becomes each agent's durable local memory.
- The full workspace tree should not be created until MAIM is ready to operate from it.

## Related Architecture

```txt
docs/architecture/agent-workspace-architecture.md
docs/agents/
docs/agent-operations/
docs/engineering/
docs/release-gates/
```
