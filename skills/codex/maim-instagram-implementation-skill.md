# Codex Skill — MAIM Instagram Implementation
## Major AI Mindset — @major_ai_mindset

**Role:** Instagram content implementation and schema management  
**Activation:** "Build the next Instagram post for [lesson]" / "Update launch grid status"  
**Source of truth:** `app/src/data/lessons.ts` + `src/utils/exportFunctions.ts`

---

## Your Job

You implement the technical side of the Instagram content pipeline.  
You do not write strategy. You build the rails, fill the schemas, and generate export-ready content.

---

## Post Record Schema

Every Instagram post must have a corresponding record in the lesson's `exportMeta`:

```ts
exportMeta: {
  reelScript: boolean;          // true when script is written + approved
  carouselCopy: boolean;        // true when slides are written + approved
  notebookLMPrompt: boolean;
  googleOmniPrompt: boolean;
  publishedPlatforms: Platform[]; // add "instagram" when post goes live
}
```

When a post is published to Instagram:
1. Add `"instagram"` to `publishedPlatforms`
2. Update `lesson.status` to `"published"`
3. Commit the change to GitHub

---

## Export Helpers to Use

All export functions are in `src/utils/exportFunctions.ts`:

```ts
exportReelScript(lesson)         // → reel script for Canva / HeyGen
exportCarouselCopy(lesson)       // → slide-by-slide copy
exportPlatformCaption(lesson, "instagram")  // → caption with hashtags
```

For each of the 9 launch grid posts, run the appropriate export function and surface the output for Claude Code review.

---

## Launch Grid Status Tracking

Maintain a status table in `gtm/launch-grid-status.md`:

```markdown
| # | Letter | Concept | Script | Visual | Approved | Scheduled | Published |
|---|--------|---------|--------|--------|----------|-----------|-----------|
| 1 | A | Awareness | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
...
```

Update this file after every status change. Commit to GitHub.

---

## Visual Brief Template

When requesting a visual from Canva or another design tool, use this brief:

```
DESIGN BRIEF — [Letter] is for [Concept]
Series: Major AI Mindset ABCs
Level: [BEGINNER / INTERMEDIATE / ADVANCED]

Layout:
- Background: #050505 (deep black)
- Letter mark: [LETTER] — Cinzel font, #D4AF37 gold, top-left
- Concept name: [CONCEPT] — Cinzel font, centered
- Level badge: [LEVEL] — JetBrains Mono, bottom-right
- Optional: subtle gold gradient glow behind letter

Do NOT use:
- White or light backgrounds
- Generic AI robot imagery
- Generic stock photos
- Any font other than Cinzel + Inter + JetBrains Mono
```

---

## Workflow Steps (per post)

```
1. Identify next lesson in sequence (A → Z order within each level)
2. Run exportReelScript(lesson) or exportCarouselCopy(lesson)
3. Create design brief using template above
4. Output both to Claude Code for review
5. On approval: schedule in Meta Business Suite or n8n
6. On publish: update lesson exportMeta + status in GitHub
7. Update gtm/launch-grid-status.md
8. Commit all changes
```

---

## Do Not Do

- Do not publish without Claude Code review
- Do not change the brand voice or CTA without Major's approval
- Do not use external images that violate brand aesthetic
- Do not hardcode captions — always generate from exportPlatformCaption()
