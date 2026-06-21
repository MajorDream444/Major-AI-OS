# Instagram Launch Workflow
## Major AI Mindset — Operating Workflow for @major_ai_mindset

**Status:** ACTIVE  
**Trigger:** Manual (Cowork daily brief) / Scheduled (n8n)

---

## Phase 1: Account Setup (One-Time)

```
1. Create @major_ai_mindset Instagram account
2. Switch to Creator account type
3. Upload profile photo (M mark, sovereign gold)
4. Write bio from playbook template
5. Set intake form link in bio
6. Create 5 Highlights (empty covers OK)
7. Connect to Meta Business Suite
8. Connect to n8n for scheduling
```

**Handoff:** Once account is live, move to Phase 2.

---

## Phase 2: Pre-Launch Content Build

For each of the 9 launch posts:

```
Step 1: Pull lesson from ABC Studio (app/src/data/lessons.ts)
Step 2: Run exportReelScript() or exportCarouselCopy() from src/utils/exportFunctions.ts
Step 3: Generate visual using Canva (sovereign gold template)
Step 4: Review with Claude Code (beginner-safe language check)
Step 5: Schedule in Meta Business Suite or n8n
Step 6: Update lesson exportMeta.publishedPlatforms += "instagram"
Step 7: Commit updated lesson record to GitHub
```

**Status logic for each post:**

| Stage | Lesson Status |
|-------|--------------|
| Script written | drafted |
| Visual designed | designed |
| Scheduled in Meta | scheduled |
| Published live | published |
| Comments responded to | published |
| Repurposed to other platform | repurposed |

---

## Phase 3: Daily Operations

### Morning Brief (Cowork runs this)
```
1. Check: Any posts scheduled for today?
2. Check: Any comments/DMs that need keyword response?
3. Check: Any new follower milestones (100, 250, 500)?
4. Check: Which lesson is next in the A-Z sequence?
5. Output: Today's priority action
```

### Post-Publish Checklist
```
1. Confirm post is live at correct time
2. Verify caption matches approved version
3. Confirm hashtags are correct (5 max, not spammy)
4. Pin story if applicable
5. Log publish in GitHub (update lesson status)
```

### Comment Watch (first 2 hours after post)
```
1. Respond to keyword comments (AWARE, BUILD, etc.) with DM
2. Pin best comment if one surfaces
3. Reply to genuine questions — short, value-first
4. Ignore or hide spam
```

---

## Phase 4: Weekly Review

Every Sunday:

```
1. Review top-performing post (reach, saves, profile visits)
2. Review lowest-performing post (what to learn from it)
3. Update content queue for next week
4. Check intake form conversion rate (clicks vs. submissions)
5. Log learnings in GitHub (weekly-review.md)
```

---

## Learning Signals to Watch

| Signal | What it means | Action |
|--------|--------------|--------|
| High saves | Content is reference-quality | Do more carousels in this style |
| High comments | Strong CTA response | Replicate the hook + CTA formula |
| High profile visits | Curiosity triggered | Bio and highlights must convert |
| Low reach on reel | Hook isn't working | A/B test first 3 seconds |
| DMs saying "how do I start?" | Content is attracting beginners | Double down on beginner ABCs |
| Link-in-bio clicks but no intake submits | Form friction | Simplify intake form |

---

## Bottlenecks and Escalation

| Bottleneck | Owner | Resolution |
|-----------|-------|------------|
| Visual not ready | Codex / Canva | Use text-only card as fallback |
| Script not approved | Claude Code | Hold post, do not publish unreviewed |
| Intake form broken | Codex | Publish without CTA link, fix same day |
| Account restricted by Meta | Major | Do not spam recovery actions. Wait + appeal. |
| No content for today | Cowork | Pull from backlog, repurpose a lesson |
