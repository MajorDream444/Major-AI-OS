# ADR-0008: The Repository Is Not The Memory

Status: accepted
Date: 2026-07-07

## Context

MAIM and HAMAL are growing across repository docs, agent workspaces, knowledge assets, intelligence relationships, and production systems.

These layers are related, but they are not the same thing.

If agents treat the repository as the memory, they will scan too much, confuse source files with active context, and miss the relationship graph that turns information into intelligence.

## Decision

The repository is not the memory.

Use this architecture:

```txt
Repository Architecture = source code, docs, version control
Workspace Architecture  = active agent context and task memory
Knowledge Architecture  = institutional learning and evergreen teaching
Intelligence Architecture = relationships between people, assets, ideas, events, systems, and actions
```

Agents should consume curated indexes and contracts instead of scanning the repository directly.

Examples:

```txt
knowledge_index.json
asset_index.json
prompt_index.json
people_index.json
relationship_index.json
```

## Consequences

- GitHub remains source control, not the whole cognitive system.
- `workspace/` holds current operational context.
- `knowledge/` holds institutional learning.
- The intelligence layer holds relationships.
- Agents should read indexes, contracts, and curated context packets before raw folders.
- Graph memory becomes a first-class architectural concern.

## Principle

```txt
Files -> Knowledge -> Intelligence -> Action
```

MAIM and HAMAL should not stop at file search.

The long-term asset is compounding memory: knowledge, relationships, context, provenance, and action.
