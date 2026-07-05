# MAIM Codex Task Template

Use this template every time Codex starts a repo task.

## Template

Repository:
MajorDream444/Major-AI-OS

Branch:
[branch name]

Working directory:
[path]

Goal:
[one clear outcome]

Context:
[why this task matters]

Protected areas:
main
unrelated folders
production files unless explicitly approved

Commands to run:
[command list]

Acceptance criteria:
[what success looks like]

Report back with:

1. What changed
2. Files touched
3. Commands run
4. Results
5. Risks or blockers
6. Next recommended step

## Current PR 10 Task

Repository:
MajorDream444/Major-AI-OS

Branch:
cleanup/maim-mission-control-vite-import

Working directory:
experiments/landing-pages/google-ai-studio/maim-mission-control-vite

Goal:
Validate the cleaned MAIM Mission Control Vite prototype before merge.

Context:
This is the working app candidate created from the Google AI Studio export. It must build cleanly before it can become a deployable preview.

Protected areas:
main
other experiment folders
production homepage files
ABC Studio files

Commands to run:
npm install
npm run lint
npm run build
npm run dev

Acceptance criteria:
The app installs, lints, builds, and previews without broken imports, missing assets, or console errors.

Report back with:

1. Install result
2. Lint result
3. Build result
4. Preview notes
5. Mobile issues
6. Form or webhook concerns
7. Files changed
8. Merge recommendation
