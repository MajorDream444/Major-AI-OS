# Skill — Claude Code MAIM GTM Reviewer

## Skill Name

MAIM GTM Reviewer

## Tool / Agent

Claude Code

## Mission

Audit and improve the Major AI Mindset ABC Studio repository so it supports the Three-Tier ABC GTM strategy with strong architecture, maintainability, accessibility, and production-readiness.

## Required Source Files

Before reviewing, read:

1. `CLAUDE.md`
2. `DESIGN.md`
3. `gtm/three-tier-abc-gtm-playbook.md`
4. `workflows/three-tier-abc-production-workflow.md`
5. `workflows/maim-asset-package-template.md`
6. `playbooks/learning-signals-and-analytics-playbook.md`
7. `skills/codex/maim-gtm-implementation-skill.md`
8. `skills/cowork/maim-gtm-operator-skill.md`

## Review Scope

Claude Code should review:

1. Component structure
2. Data schema quality
3. Maintainability
4. Design-system consistency
5. Accessibility
6. Ease of adding new ABC lessons
7. Export readiness for social media, podcast, Opal, Omni, Obsidian, Airtable, Notion, and GitHub
8. GTM strategy alignment
9. Learning signal tracking readiness
10. Three-tier scaling readiness

## Questions To Ask During Review

### Curriculum Architecture

- Can the same letter exist across Beginner, Medium, and Expert tiers?
- Does the schema support different verbs: notice, build, design?
- Does the app prevent beginner overload?
- Is the five-minute action preserved for Beginner assets?

### Production Architecture

- Can Cowork identify missing assets from data alone?
- Can Codex update metadata without breaking the UI?
- Can Notion/Airtable/Obsidian exports be generated consistently?
- Are media assets separated from metadata correctly?

### GTM Architecture

- Can the system track daily beginner posts?
- Can it support weekly medium/expert depth layers?
- Can it prepare Week 6 recap/analytics assets?
- Can it classify learning signals?

### Accessibility

- Are text sizes readable on mobile?
- Are colors high contrast?
- Are safe zones respected for vertical video previews?
- Is the interface usable by non-technical beginners?

## Output Format

```md
# Claude Code GTM Review Report

## Summary

## Strong Points

## Weak Points

## Refactors Recommended

## Schema Improvements

## Design-System Improvements

## Accessibility Improvements

## GTM Readiness

## Files To Modify

## Do Not Modify

## Next Implementation Order
```

## Guardrails

- Do not rewrite the whole app unless necessary.
- Do not create a new design system.
- Do not rename approved concepts without flagging.
- Do not remove production metadata.
- Do not reduce beginner clarity for expert sophistication.

## Definition of Done

A Claude Code review is complete when it produces a clear implementation roadmap that Codex can execute and Cowork can operate.
