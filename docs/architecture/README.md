# MAIM Architecture

Status: foundation manual
Owner: Major AI Mindset

This folder stores system diagrams and subsystem maps.

Architecture docs should explain how MAIM works without requiring someone to inspect every file.

## Current Diagrams

```txt
maim-command-room-system.md
```

## Diagram Rule

Every major subsystem should have:

- purpose
- data flow
- enabled pieces
- disabled pieces
- rollback point
- related release gate

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
