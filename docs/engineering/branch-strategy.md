# Branch Strategy

Status: canonical
Owner: Major AI Mindset

## Main Branch

`main` is the stable source of truth.

Do not work directly from `main` for feature, design, integration, or automation changes.

## Branch Types

Use clear prefixes:

```txt
feature/
fix/
docs/
design/
chore/
experiment/
```

Examples:

```txt
feature/registration-engine-sprint-002
docs/maim-release-gates
design/command-room-refinement
```

## Merge Rule

Merge only after the relevant release gate passes.

For integrations, this usually means:

- dry-run first
- live platform verification second
- production activation last

## Cleanup Rule

After a PR is merged, delete the branch unless it is still actively needed.

Keep:

```txt
main
active feature branches
```

Delete old merged lanes once their code is safely in `main`.
