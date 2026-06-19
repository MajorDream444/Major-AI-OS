# Major AI Mindset ABC Studio

> Sovereign AI education infrastructure. From Awareness to Agents — A to Z.

---

## What This Is

Major AI Mindset ABC Studio is the content production operating system for the **Major AI Mindset** brand. It covers 26 AI literacy concepts (A–Z) across three levels (Beginner, Intermediate, Advanced), and is designed to produce content across every platform: short-form video, carousels, podcasts, newsletters, and AI-assisted deep dives via NotebookLM and Google Omni.

GitHub is the source of truth. The app is the production dashboard.

---

## Core Stack

| Tool | Role |
|------|------|
| GitHub | Source of truth — code, schemas, lesson data |
| Airtable | Operational database — lesson tracker, workflow board |
| Notion | Human dashboard — editorial calendar, operator docs |
| NotebookLM | Research vault — source synthesis per lesson |
| HeyGen / Remotion | Video generation engine |
| Canva | Carousel and thumbnail design |
| Google Gemini (Omni) | Multimodal content generation |
| n8n | Automation, triggers, scheduled publishing |
| Gumroad / Shopify | Commerce layer for packaged products |

---

## Repo Structure

```
src/
  types/
    lesson.ts           ← Canonical Lesson type (single source of truth)
  design/
    tokens.ts           ← Aura design tokens (colors, fonts, spacing)
  data/
    lessons/
      index.ts          ← allLessons registry
      A-awareness.ts    ← Example: A is for Awareness
  utils/
    lessonFilters.ts    ← Filter helpers (level, letter, status, platform)
    exportFunctions.ts  ← Export helpers (reel, carousel, captions, prompts)

assets/
  thumbnails/
    abc/
      beginner/
        A-awareness/
          metadata.json
          MAIM-ABC-BEG-A-AWARENESS-THUMBNAIL-V001.png.base64

references/
  README.md             ← Design reference index

DESIGN.md               ← Canonical design system doctrine
SYSTEM_CORE.md          ← Operator law and execution loop
```

---

## Operator Instructions

### Adding a New ABC Lesson

1. **Create the lesson file:**
   ```
   src/data/lessons/<LETTER>-<concept>.ts
   ```
   Export a `const` that satisfies the `Lesson` type from `src/types/lesson.ts`.

2. **Register it in the index:**
   Open `src/data/lessons/index.ts` and add your import + entry to `allLessons`.

3. **Commit and push:**
   ```bash
   git add src/data/lessons/<LETTER>-<concept>.ts src/data/lessons/index.ts
   git commit -m "add: <LETTER> is for <Concept> lesson"
   git push
   ```

4. **Add the thumbnail asset:**
   Place the PNG at:
   ```
   assets/thumbnails/abc/<level>/<LETTER>-<concept>/
   ```
   Include a `metadata.json` matching the existing format.

---

### Running Export Functions

All export utilities are in `src/utils/exportFunctions.ts`.

```ts
import { lessonAwareness } from "./src/data/lessons/A-awareness";
import {
  exportReelScript,
  exportCarouselCopy,
  exportNotebookLMPrompt,
  exportGoogleOmniPrompt,
  exportPlatformCaption,
} from "./src/utils/exportFunctions";

// Generate reel script
console.log(exportReelScript(lessonAwareness));

// Generate carousel copy
console.log(exportCarouselCopy(lessonAwareness));

// Generate NotebookLM source prompt
console.log(exportNotebookLMPrompt(lessonAwareness));

// Generate Google Omni prompt
console.log(exportGoogleOmniPrompt(lessonAwareness));

// Generate Instagram caption
console.log(exportPlatformCaption(lessonAwareness, "instagram"));

// Generate podcast show notes
console.log(exportPlatformCaption(lessonAwareness, "podcast"));
```

---

### Filtering Lessons

```ts
import { allLessons } from "./src/data/lessons";
import { filterLessons } from "./src/utils/lessonFilters";

// All beginner lessons
const beginner = filterLessons(allLessons, { level: "beginner" });

// Only lessons at letter B
const bLessons = filterLessons(allLessons, { letter: "B" });

// Lessons that are published to Instagram
const igLessons = filterLessons(allLessons, { platform: "instagram" });

// Lessons ready to export (all export fields populated)
const ready = filterLessons(allLessons, { exportReadyOnly: true });

// Combine filters
const readyBeginner = filterLessons(allLessons, {
  level: "beginner",
  status: "designed",
});
```

---

### Lesson Status Workflow

Each lesson moves through these statuses in order:

```
idea → drafted → designed → recorded → edited → scheduled → published → repurposed
```

Update the `status` field in the lesson's `.ts` file when it advances.

---

### Design System

All UI tokens are in `src/design/tokens.ts`. Reference this file in all component work. Do not hardcode color or font values.

Key palette:
- **Sovereign Gold** `#D4AF37` — primary brand accent
- **Deep Black** `#050505` — main background
- **System Lime** `#A3E635` — live/active/published states
- **Parchment** `#EAE2D3` — light surface contrast

Typography:
- **Cinzel** — hero titles, letter marks
- **Inter** — body copy, cards
- **JetBrains Mono** — system labels, prompts, technical overlays

Full doctrine: see `DESIGN.md`.

---

## Operating Loop

```
Plan → Build → Run → Log → Improve
```

1. Create lesson in `src/data/lessons/`
2. Generate export content using `exportFunctions.ts`
3. Run through HeyGen / Canva / Google Omni
4. Publish to platforms, update `status` and `exportMeta`
5. Repurpose: newsletter → NotebookLM → podcast episode

---

## Relationship to Major AI OS

Major AI Mindset ABC Studio is the content production layer of the Major AI OS ecosystem. The OS handles agents, automation, and product infrastructure. The ABC Studio handles curriculum, content, and platform delivery.
