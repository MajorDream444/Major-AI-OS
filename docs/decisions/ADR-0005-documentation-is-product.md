# ADR-0005: Documentation Is Product

Status: accepted
Date: 2026-07-07

## Context

MAIM is expected to grow across agents, automations, content systems, registrations, community, analytics, and future legacy infrastructure.

If important behavior lives only in chat or memory, future contributors will have to rediscover the same decisions.

## Decision

Documentation is not a byproduct of development.

Documentation is part of the product.

If a feature is not documented, it is not finished.

## Consequences

- Definition of Done must include documentation.
- Release gates should capture what changed, what was tested, what remains disabled, what is safe, what is experimental, rollback, production URL, tags, and PR numbers.
- Agent playbooks, engineering standards, architecture, and decision records are product surfaces, not optional notes.
- Docs-only PRs are valid product work.
