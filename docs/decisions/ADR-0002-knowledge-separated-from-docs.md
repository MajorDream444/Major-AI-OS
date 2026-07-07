# ADR-0002: Knowledge Is Separated From Docs

Status: accepted
Date: 2026-07-07

## Context

The repo contains operating manuals, design standards, release gates, architecture, and also teaching assets such as ABC lessons, webinars, stories, prompt packs, and playbooks.

Those are different kinds of assets.

## Decision

MAIM separates platform documentation from knowledge assets:

```txt
docs/      = how MAIM operates
knowledge/ = what MAIM teaches
```

## Consequences

- Operating manuals, architecture, release gates, and engineering standards belong in `docs/`.
- Lessons, stories, prompt packs, webinars, case studies, and teaching playbooks belong in `knowledge/`.
- Machine-readable canonical data still belongs in `data/`.
- Agent and generation instructions still belong in `prompts/`.
- This separation keeps the Knowledge Vault from being buried inside implementation docs.
