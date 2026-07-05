---
name: add-new-experiment-landing-page
description: Workflow command scaffold for add-new-experiment-landing-page in Major-AI-OS.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-experiment-landing-page

Use this workflow when working on **add-new-experiment-landing-page** in `Major-AI-OS`.

## Goal

Sets up a new experiment landing page by creating a directory and adding standard documentation and prototype files.

## Common Files

- `experiments/landing-pages/*/README.md`
- `experiments/landing-pages/*/decision-notes.md`
- `experiments/landing-pages/*/performance-checklist.md`
- `experiments/landing-pages/*/index.html`
- `experiments/landing-pages/*/pro-max-uiux-review.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create a new directory under experiments/landing-pages/<experiment-name>/
- Add README.md with experiment brief
- Add decision-notes.md with decision documentation
- Add performance-checklist.md for performance criteria
- Add index.html as the prototype or main file

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.