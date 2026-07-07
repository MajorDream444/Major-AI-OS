# MAIM Architecture

Status: foundation manual
Owner: Major AI Mindset

This folder stores system diagrams and subsystem maps.

Architecture docs should explain how MAIM works without requiring someone to inspect every file.

## Current Diagrams

```txt
agent-workspace-architecture.md
ecosystem-map.md
engine-contract-template.md
hamal-legacy-intelligence-vault.md
maim-command-room-system.md
maim-platform-engines.md
```

## Diagram Rule

Every major subsystem should have:

- purpose
- data flow
- enabled pieces
- disabled pieces
- rollback point
- related release gate

## Engine Contract Rule

Every engine should use `engine-contract-template.md` before implementation.

The contract must identify:

- mission
- owner
- inputs
- outputs
- dependencies
- configuration
- data model
- API contracts
- release gates
- tests
- rollback
- roadmap
- future ideas

## Agent Workspace Rule

The future `workspace/` layer should follow `agent-workspace-architecture.md`.

Do not create broad agent folders casually.

Agent rooms exist to reduce context load, preserve durable memory, and let agents hand off through contracts.

## Current Platform Direction

```txt
Command Room
-> Knowledge Sessions
-> ABC Library
-> Discovery Calls
-> Prompt Library
-> Labs
-> Agent Marketplace
-> Legacy OS
```
