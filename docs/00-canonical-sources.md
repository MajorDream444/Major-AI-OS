# Canonical Sources

Status: canonical
Last reviewed: 2026-08-17

Read this before deploying anything or creating another front-end. It
exists because MAIM briefly had the same website living in two repositories
with no sync between them, and four parallel front-ends in this one.

## The one repository

```txt
MajorDream444/Major-AI-OS
```

This repository is the source of truth for MAIM code, docs, and site
content. Every agent — Codex, Claude Code, Claude Design, Cowork — commits
here.

### Retired source

`MajorDream444/Major-OS-AMA-OS--Command` previously drove the production
deployment of `major-ai-mindset.vercel.app` from branch
`claude/maim-ecosystem-wireframe-xk8swp`. The site was copied into this
repository at `apps/maim-site/`, but the Vercel project was never
repointed, so pushes here changed nothing live.

Once the Vercel project is repointed at this repository, that repo is
**read-only history**. Do not commit site changes there. If you find
yourself editing MAIM site files anywhere other than
`Major-AI-OS/apps/maim-site/`, stop.

## The one deployed site

| Layer | Path in repo | Domain | Status |
| --- | --- | --- | --- |
| Layer 1 — Public Sanctuary | `apps/maim-site/` | `www.majoraimindset.com` | **Live. Canonical.** |
| Layer 2 — ABC Studio | not built | `studio.majoraimindset.com` | Not started. No DNS record. |
| Layer 3 — Operator Console | not built | `studio.majoraimindset.com/operator` | Not started. |

`apps/maim-site/` is the only directory that deploys. Build it with:

```bash
cd apps/maim-site
python3 maim/make-social-card.py   # only when the mark or tagline changes
python3 maim/build.py
```

Output lands in `maim/dist/`, which is gitignored and rebuilt by Vercel.

## The other front-ends, and what they are

These all exist in this repository and none of them are deployed. Knowing
which is which prevents the next agent from "fixing" the wrong one.

| Directory | What it is | Status |
| --- | --- | --- |
| `apps/maim-site/` | The live public front door | **Canonical** |
| `app/` | React/Vite ABC Studio MVP — 8 screens, lesson registry | Prototype for Layer 2 |
| `major-ai-mindset/` | React "gravity well" landing experiment | Experiment |
| `major-ai-mindset-abc-studio/` | Earlier ABC Studio attempt | Superseded by `app/` |
| `experiments/landing-pages/` | Assorted landing page tests | Experiments |
| `apps/google-ai-studio-prototype/` | Google AI Studio export | Reference only |

Nothing outside `apps/maim-site/` should be deployed to a production
domain without updating this table first.

## Design and content authority

| Question | Authority |
| --- | --- |
| What does the ecosystem look like? | `docs/architecture/maim-ecosystem-wireframe-v2.md` |
| What are the colours and type? | `DESIGN.md` and `data/design-tokens.json` |
| What is the voice? | `CLAUDE.md` |
| What ships before launch? | `apps/maim-site/LAUNCH_CHECKLIST.md` |
| How do we deploy? | `docs/engineering/deployment.md` |
| Who owns which email? | `docs/engineering/email-and-identity.md` |

When the shipped site and the wireframe disagree, that is a decision to
record, not a bug to silently fix. Amend the wireframe with a dated note
explaining which version won and why — see the hero and lane amendments in
that document for the pattern.

## Deploy rules

1. Never deploy from a dirty working tree. Every production deployment so
   far carries `gitDirty: 1`, meaning no commit reproduces what is live.
   That breaks the rollback path the deployment standard requires.
2. Commit, push, let Vercel build from the pushed commit.
3. Tag stable releases (`v1.0.0`) so there is something to roll back to.
4. Smoke-test `/`, `/pillars`, and `/return` after every production deploy.

## Data

| System | Purpose | Status |
| --- | --- | --- |
| Supabase `fsrskmlsxqtxduhdfhnd` | First-party registration capture | Table defined in `supabase/migrations/`, needs applying |
| Kit | Email delivery and sequences | Live |
| Gumroad | $27 Pillar Scroll | Live |
| Airtable | Asset and status tracking | Not yet wired to the site |

The registration form writes to Supabase first, then hands off to Kit. The
Supabase write is fire-and-forget and must never block the Kit submit.
