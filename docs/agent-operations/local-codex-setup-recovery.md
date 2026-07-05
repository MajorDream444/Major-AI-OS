# Local Codex Setup Recovery Guide

Status: active recovery guide
Owner: Major Dream Williams
Created: 2026-07-05

## Why this exists

Codex took the first pass in the wrong direction because the local desktop folder was empty.

An empty folder is not the repo.

Codex must operate from a cloned copy of the GitHub repository or from a checked-out GitHub branch.

The current source of truth is GitHub main after PR #10 and PR #11 were merged.

## Current merged state

Merged PR #10:

```txt
Import cleaned MAIM Mission Control Vite prototype
```

This added the working prototype at:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite
```

Merged PR #11:

```txt
Add MAIM agent operating system manuals
```

This added the agent operating system docs at:

```txt
docs/agent-operations/
prompts/codex/
```

## Correct local setup

Do not create an empty Desktop folder and ask Codex to work inside it.

Instead, clone the actual repo.

Recommended Desktop setup:

```bash
cd ~/Desktop
git clone https://github.com/MajorDream444/Major-AI-OS.git
cd Major-AI-OS
```

If the repo folder already exists:

```bash
cd ~/Desktop/Major-AI-OS
git status
git pull origin main
```

## Verify the correct folder

Run:

```bash
pwd
ls
```

You should see repo files and folders like:

```txt
docs
experiments
prompts
workflows
```

Then check the app folder:

```bash
ls experiments/landing-pages/google-ai-studio/maim-mission-control-vite
```

You should see:

```txt
README.md
index.html
metadata.json
package.json
src
tsconfig.json
vite.config.ts
```

If those files are missing, you are in the wrong folder.

## Correct app run commands

From the repo root:

```bash
cd experiments/landing-pages/google-ai-studio/maim-mission-control-vite
npm install
npm run lint
npm run build
npm run dev
```

## Correct Codex instruction after local setup

Give Codex this exact instruction:

```txt
You are working locally inside the cloned GitHub repo:

~/Desktop/Major-AI-OS

Do not operate from any empty folder.

First run:

pwd
ls
git status
git branch --show-current

Confirm that the folder contains:

docs
experiments
prompts
workflows

Then move into:

experiments/landing-pages/google-ai-studio/maim-mission-control-vite

Run:

npm install
npm run lint
npm run build
npm run dev

Do not create a new app.
Do not scaffold a new Vite project.
Do not overwrite files.
Do not move anything out of experiments.
Do not touch unrelated folders.

Report back with:

1. Current folder path
2. Git branch
3. Install result
4. Lint result
5. Build result
6. Dev server result
7. Any errors
8. Suggested next step
```

## What Codex should not do

Codex should not:

- Scaffold a new project
- Create a second Vite app
- Work from an empty Desktop folder
- Rebuild the Google AI Studio export from scratch
- Change main without instruction
- Move the prototype into production
- Add Three.js yet
- Replace the MAIM voice with generic AI copy

## Local branch strategy

Since PR #10 and PR #11 are now merged, local work should start from main.

```bash
git checkout main
git pull origin main
```

For any new fixes, create a new local branch:

```bash
git checkout -b fix/maim-mission-control-local-qa
```

Then work inside:

```txt
experiments/landing-pages/google-ai-studio/maim-mission-control-vite
```

## Recovery checklist

Use this if the local folder is wrong:

1. Stop Codex.
2. Confirm the folder path with `pwd`.
3. If the folder is empty, do not build there.
4. Clone the GitHub repo into Desktop.
5. Pull latest main.
6. Confirm the `experiments` folder exists.
7. Run the app commands from the correct app folder.
8. Only then let Codex continue.

## Final rule

The repo is the source of truth.

The local folder must be a clone of the repo.

No empty folder work.

Likkle by likkle, we build clean.
