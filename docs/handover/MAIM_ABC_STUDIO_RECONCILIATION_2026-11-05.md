# MAIM ABC Studio — Reconciliation and Handover

Date: 2026-11-05
Status: current
Audience: Major, Codex, Cowork, Claude Design, Claude Code, and any new agent session
Trigger: a dedicated repository, `MajorDream444/MAIM_ABC_STUDIO`, was opened to
build the ABCs into an app.

Read this before writing a line of code in the new repository.

---

## 1. Why this document exists

The ABC work is real, substantial, and scattered. It currently lives across at
least eight directories in `Major-AI-OS`, in three separate half-built
front-ends, and in one complete data file that most of those front-ends do not
use.

`MAIM_ABC_STUDIO` is **empty** as of this writing — a verified blank repository,
no commits. That is an advantage, not a problem: it means the new app can be
seeded from the best of what exists rather than inheriting the drift.

This document reconciles what exists, names what is canonical, and says what to
carry over.

---

## 2. Repository map

| Repository | Role | Status |
| --- | --- | --- |
| `MajorDream444/Major-AI-OS` | MAIM operating system: public site, curriculum, content, agents, docs | **Canonical. Active.** |
| `MajorDream444/MAIM_ABC_STUDIO` | The ABC app | **New. Empty.** To be seeded — see §6 |
| `MajorDream444/Major-OS-AMA-OS--Command` | Yawdie orchestration; broader ecosystem and Major Moves coordination | **Active** — but its MAIM *site copy* is historical |

`Major-AI-OS` stays the source of truth for ABC *content and curriculum*.
`MAIM_ABC_STUDIO` becomes the source of truth for the ABC *application*. Content
flows one direction: OS → app. Do not fork the curriculum into the app repo.

On the Command repository, hold the distinction carefully. It once held a copy
of the MAIM site and drove the production deploy; **that copy is historical and
MAIM site changes belong in `Major-AI-OS`**. The repository itself is **not**
retired: `docs/00-canonical-sources.md` keeps it as the active Yawdie
orchestration source, and
`docs/handoffs/MAIM_CODEX_CLAUDE_PUBLISHING_SYNC_2026-10-23.md` assigns it
broader ecosystem and Major Moves coordination. Do not skip its operating
instructions or refuse a coordination update there on the belief that it is
dead.

---

## 3. What changed since the last major reconciliation

Three changes invalidate earlier instructions. Any agent working from a document
written before 15 October 2026 is working from stale assumptions.

### 3.1 Kit, Gumroad and Shopify are retired

Founder directive, 15 October 2026 — `docs/RETIRED_PLATFORMS_2026-10-15.md`.

Do not provision, recommend, reactivate, or route anything through them. The
replacement stack is:

```txt
Vercel    owned website and shop
Stripe    payments, orders, entitlements
Resend    transactional and authorized mail
Airtable  operational registries, intake, delivery state
GitHub    source, instructions, evidence, handoff
```

**This supersedes the email plan in `docs/engineering/email-and-identity.md`,**
which was written in August around Kit as the sending layer. The address map and
DNS guidance in that document remain sound; the Kit-specific sections do not.
Resend is now the sending layer.

The directive names remaining cleanup targets that are still open:
`apps/maim-site/maim/pillar-scroll.html` carries a legacy Gumroad checkout, and
`apps/maim-site/maim/shop.html` carries a legacy Kit link.

### 3.2 Main's git history was rewritten

`git merge-base origin/main <any pre-October branch>` returns nothing — there is
**no common ancestor**. Branches cut before the rewrite cannot be merged
normally; their content landed in the new history by other means.

Practical rule: do not try to rebase or merge an old branch. Start fresh from
`origin/main`, re-apply what is still wanted, and verify the file is present on
main before assuming work was lost.

### 3.3 The Supabase registration table was parked

`supabase/migrations/0001_registrations.sql` was moved to
`supabase/legacy/registrations/0001_registrations.sql`. The live migration stream
is now `20261014043844_maim_workspace_foundation.sql` and
`20261014043909_maim_payments_foundation.sql`.

Treat the legacy registrations table as retired unless someone confirms
otherwise. Build against the workspace and payments foundations.

---

## 4. ABC asset inventory

Everything below is in `Major-AI-OS` on `main`. Verified present 2026-11-05.

### 4.1 The single most important file

```txt
data/abc/maim-abc-database.json
```

- **26 records, A through Z. Complete.**
- Nine fields, **all populated on all 26 records**: `letter`, `title`, `lesson`,
  `exercise`, `prompt`, `video`, `download`, `cta`, `relatedAgent`.
- Version `0.1.1`, status `phase_2_seed`, updated 2026-07-06.
- Its own `sourceRule` says: *"Use this file as the Phase 2 data source for ABC
  lessons, downloads, videos, prompts, landing-page sections, and future Airtable
  sync."*

**This is the spine of the new app.** Build against it.

### 4.2 Production content

```txt
content/abc/beginner/A_Awareness/
  00_README.md  01_Doctrine.md  02_Lesson.md
  03_Voiceover.md  04_Caption.md  05_CTA.md
  manifest.json
  shot_A/{prompt.md, metadata.json, remotion_notes.md}
  shot_B/{prompt.md, metadata.json, remotion_notes.md}
```

A complete per-letter production template. Only `A_Awareness` is built out;
`B-belief` exists in thumbnails only. This structure is the pattern for the
remaining 25.

### 4.3 Curriculum and framework

| Path | What it is |
| --- | --- |
| `docs/curriculum/ABC_VOLUME_1_MINDSET.md` | Founder-supplied curriculum volume |
| `docs/abc-framework.md` | Framework definition |
| `knowledge/abc/README.md` | Knowledge layer entry |
| `data/abc/README.md` | Data layer entry |
| `gtm/three-tier-abc-gtm-playbook.md` | Three-tier go-to-market |
| `assets/thumbnails/abc/beginner/` | Thumbnail assets + metadata |

### 4.4 The three existing front-ends

This is where the drift is. All three are in `Major-AI-OS`, none is deployed.

| Directory | What it is | Verdict |
| --- | --- | --- |
| `app/` | React 19 + Vite + Tailwind 4 + react-router 7. Eight screens: Home, Library, LessonDetail, Generator, PodcastBuilder, OmniBuilder, WorkflowBoard, SystemInit. | **Best starting point.** See caveat below |
| `major-ai-mindset-abc-studio/` | Earlier attempt — `AbcLibrary.tsx`, `AuraHeader.tsx` | Superseded. Mine for ideas only |
| `apps/google-ai-studio-prototype/` | Google AI Studio export | Reference only |

**The caveat that matters:** `app/src/data/lessons.ts` hardcodes **only 10
lessons, A through J**. The complete 26-letter data sits unused in
`data/abc/maim-abc-database.json`.

That disconnect is the single highest-value fix in this whole handover. The app
has the screens; the database has the content; nobody wired them together.

---

## 5. Where the rest of MAIM stands

Context for anyone picking this up cold.

| Area | State |
| --- | --- |
| Public site (Layer 1) | Live. `apps/maim-site/`, built by `python3 maim/build.py`, deployed on Vercel |
| ABC Studio (Layer 2) | **Not built.** This is what `MAIM_ABC_STUDIO` becomes |
| Operator Console (Layer 3) | Not built |
| Domain | `majoraimindset.com` on Cloudflare DNS, pointed at Vercel (apex `76.76.21.21`, www → `cname.vercel-dns-0.com`), records must stay DNS-only/grey-cloud |
| Email | Not provisioned. `hanzo.ai` is on Google Workspace; a free domain alias is the recommended path — see `docs/engineering/email-and-identity.md`, discounting its Kit sections |
| SPF / DKIM / DMARC | **None published.** The domain is spoofable today. Open item |
| Architecture | `docs/architecture/maim-ecosystem-wireframe-v2.md` — three-layer campus, still canonical |

---

## 6. Recommended build plan for `MAIM_ABC_STUDIO`

A sequence, not a wish list. Each step is verifiable.

**Step 1 — Seed the repo.**
Copy `app/` from `Major-AI-OS` as the application skeleton. It already carries
the MAIM design system in `src/index.css`, the eight screens, and a working
Vite/Tailwind build.

**Step 2 — Replace the data layer. This is the point of the exercise.**
Delete the hardcoded 10 lessons in `src/data/lessons.ts`. Import
`data/abc/maim-abc-database.json` instead. Write a typed adapter that maps the
database's nine fields onto the app's `Lesson` type. Result: 26 letters live in
the app instead of 10.

**Step 3 — Reconcile the type.**
The app's `Lesson` type and the database's field list were designed separately
and do not match. Pick the database's shape as canonical — it is the one with
complete data — and adapt the app to it, not the reverse.

**Step 4 — Decide the content boundary.**
Does the app read ABC content from `Major-AI-OS` at build time (git submodule,
synced copy, or published JSON), or does the curriculum move into the app repo?
**Recommendation: keep curriculum in `Major-AI-OS` and sync the JSON at build
time.** The OS is where Cowork, Codex and Claude Design already work.

**Step 5 — Deploy.**
New Vercel project pointed at `MAIM_ABC_STUDIO`. Target
`studio.majoraimindset.com` per the wireframe. That subdomain has no DNS record
yet and will need one.

**Step 6 — Only then, the Studio features.**
Pressure Test engine, personalized path, progress, My Shelf. All of it is Layer 2
work described in the wireframe. None of it should start before steps 1–3 are
done, because all of it depends on the data layer being real.

---

## 7. Agent briefing

What each role needs to know, in one line each.

**Codex (implementation):** Start from `app/`, not from scratch. The build
target is steps 1–3 above. The 10-vs-26 lesson gap is the first bug to fix.

**Claude Code (review/architecture):** Enforce the content boundary in §6 step 4.
Watch for a fourth front-end appearing — the pattern in this project is that
parallel implementations get built rather than one being finished.

**Claude Design (visual factory):** The design system is already in
`app/src/index.css` and `data/design-tokens.json`. Crown Rule applies. Use the
exact colour values in `CLAUDE.md`; do not invent new ones.

**Cowork (operator):** The ABC database is complete, so content operations can
run across all 26 letters now. Only `A_Awareness` has full production assets —
the other 25 are the production backlog.

**Any new session:** Read `CLAUDE.md`, then
`docs/RETIRED_PLATFORMS_2026-10-15.md`, then this file. Those three together
prevent most of the mistakes available here.

---

## 8. Open items

Carried forward, with honest status.

| Item | Status |
| --- | --- |
| Wire 26-letter database into the app | **Not started.** Highest value |
| Publish SPF and DMARC | Not started. Domain spoofable until done |
| Provision `major@majoraimindset.com` | Not started. Free via Workspace domain alias |
| Replace Kit with Resend as sending layer | Directive issued, implementation not verified |
| Legacy Gumroad link in `pillar-scroll.html` | Open — named in the retirement directive |
| Legacy Kit link in `shop.html` | Open — named in the retirement directive |
| `studio.majoraimindset.com` DNS record | Not created |
| Production assets for letters B–Z | 1 of 26 complete |
| `Meet the Builders` placeholder cards | **Still placeholders.** Must not ship as real testimonials |
| Two source-of-truth docs | `docs/00-source-of-truth.md` and `docs/00-canonical-sources.md` both exist and are both maintained; `CLAUDE.md` points only at the first. Worth collapsing |

---

## 9. Decisions needed from Major

1. **Content boundary** — curriculum stays in `Major-AI-OS` and syncs, or moves
   into `MAIM_ABC_STUDIO`? (Recommendation: stays, syncs.)
2. **Studio domain** — confirm `studio.majoraimindset.com` as the target.
3. **Sending layer** — confirm Resend for the Kit replacement so the email work
   can be finished.
4. **Front-end cleanup** — may `major-ai-mindset-abc-studio/` be deleted from
   `Major-AI-OS` once `MAIM_ABC_STUDIO` is seeded? Keeping it guarantees a future
   agent edits the wrong one.

---

Likkle by likkle, we build the future.
