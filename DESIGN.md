---
version: "major-ai-mindset-abc-studio-v1.1"
name: "Major AI Mindset ABC Studio Design System"
source_templates:
  primary_interface: "Aurelis - Intelligence Beyond Boundaries"
  technical_background: "System Initializing"
brand:
  project: "Major AI Mindset ABC Studio"
  repo: "MajorDream444/Major-AI-OS"
  doctrine: "GitHub is the source of truth. The app is the production dashboard."
colors:
  sovereign_gold: "#D4AF37"
  deep_black: "#050505"
  near_black: "#080808"
  parchment_surface: "#EAE2D3"
  system_lime: "#A3E635"
  dark_surface: "#18181B"
  text_primary_dark: "#FFFFFF"
  text_primary_light: "#111827"
  text_secondary_dark: "#A1A1AA"
  text_secondary_light: "#4B5563"
  border_dark: "#27272A"
  border_light: "#E5E7EB"
typography:
  display:
    fontFamily: "Cinzel"
    usage: "Hero titles, major letter marks, sovereign/intelligence moments"
  body:
    fontFamily: "Inter"
    usage: "Lesson copy, cards, interface text"
  technical:
    fontFamily: "JetBrains Mono"
    usage: "Labels, status badges, system logs, prompt metadata"
layout:
  card_radius: "16px for Aurelis editorial cards; 8px for technical/system cards"
  section_padding: "80px"
  base_spacing: "8px"
  gap: "16px"
motion:
  principles:
    - "Smooth masked reveals"
    - "Staggered entrance"
    - "Hover lift"
    - "Subtle ambient technical motion"
    - "WebGL/canvas effects stay behind content"
guardrails:
  - "Do not flatten the design into a generic SaaS card grid."
  - "Preserve first-screen signal, hierarchy, and density from the HTML references."
  - "Keep the system premium, sovereign, technical, and readable."
  - "Use Aurelis as the primary interface language."
  - "Use System Initializing as the technical overlay/loading/agent-console language."
  - "Do not confuse Google Opal with Google Omni. Opal is interactive app flow; Omni is video."
---

# Major AI Mindset ABC Studio — DESIGN.md

This file is the canonical design source for the **Major AI Mindset ABC Studio** app.

The app should feel like a sovereign AI education command center, not a generic course dashboard. It combines two uploaded Neuform-inspired design references:

1. **Aurelis - Intelligence Beyond Boundaries**  
   Use this as the primary interface language: sovereign gold, premium intelligence, Cinzel display typography, dark cinematic AI background, bento cards, navigation, and enterprise-grade structure.

2. **System Initializing**  
   Use this as the technical system layer: JetBrains Mono, lime secure-link indicators, system logs, initialization states, processing screens, operator console, and AI workflow status surfaces.

## Product Personality

Major AI Mindset ABC Studio should communicate:

- Sovereign intelligence
- Beginner-safe clarity
- Builder/operator discipline
- Caribbean-rooted future literacy
- Premium educational infrastructure
- AI as leverage, not hype

## Visual Hierarchy

### Primary Experience: Aurelis

Use Aurelis for:

- Landing page
- Dashboard
- ABC library
- Lesson detail pages
- Level selection
- Podcast builder
- Course overview
- Marketing/sales pages
- Opal mini-app previews

Core motifs:

- Dark cinematic background
- Gold intelligence glow
- Premium serif hero typography
- Bento card layout
- Subtle WebGL/canvas atmosphere
- Controlled grid rhythm
- "Built for Visionaries" energy adapted to "Built for Builders"

### Secondary Experience: System Initializing

Use System Initializing for:

- App loading screen
- AI generation states
- Prompt builder
- Google Opal prompt generation
- Google Omni prompt generation
- NotebookLM export screen
- Obsidian context export screen
- Workflow automation console
- Technical metadata overlays
- GitHub sync status

Core motifs:

- Mono typography
- Lime secure-link status
- Thin technical borders
- Initialization messages
- Marquee/system notices
- Operator terminal feel

## Full Production Stack

```txt
GitHub        = source of truth
ABC Studio    = production dashboard
Google Drive  = master binary asset vault
Airtable      = production status + scheduling database
Notion        = creative review + human-readable asset pages
Obsidian      = relationship context + private knowledge graph
NotebookLM    = research, podcast, study-guide engine
Google Opal   = interactive mini-app / experience layer
Google Omni   = video generation layer
Codex         = implementation engineer
Claude Code   = review/refactor architecture engineer
Cowork        = weekly operator/reporting layer
```

## Tool-Specific Design Roles

### NotebookLM

Use NotebookLM for research, podcast outlines, study guides, FAQ development, intermediate/advanced expansions, and source-grounded lesson deepening.

### Google Opal

Use Google Opal for interactive experiences:

- Assessments
- Audits
- Calculators
- Guided workflows
- Mini-apps per letter
- Lead capture experiences

Example: `A = Awareness` can become an **AI Awareness Audit**.

### Google Omni

Use Google Omni for video generation:

- 30-second reels
- 60-second reels
- teaser videos
- motion graphics
- short-form video prompts

### Obsidian

Use Obsidian for relationship context:

- Who should see an asset
- Who asked a question
- Which relationships connect to the concept
- Strategic decisions and meeting context
- Private memory that should not be public in GitHub

## Key Pages

### 1. Home / Hero

Headline examples:

- `MAJOR AI MINDSET`
- `ABC STUDIO`
- `INTELLIGENCE FOR BUILDERS`
- `FROM AWARENESS TO AGENTS`

Primary CTA:

- `Enter Studio`
- `Open ABC Library`
- `Generate Content Pack`

### 2. ABC Library

A-Z cards must feel like premium intelligence modules.

Each card shows:

- Letter
- Concept
- Level
- Status
- Content readiness
- Export readiness

### 3. Lesson Detail

Each lesson page includes:

- Big idea
- Explanation
- 5-minute action
- Reel script
- Carousel copy
- Platform captions
- Podcast angle
- NotebookLM prompt
- Google Opal mini-app prompt
- Google Omni video prompt
- Obsidian context note
- Export buttons

### 4. Generator Console

Blend Aurelis layout with System Initializing behavior.

When generating content, show system-style progress states:

- `SYS.CHK.LESSON`
- `PROMPT.PACK.BUILDING`
- `OPAL.APP.COMPILING`
- `OMNI.SCENE.COMPILING`
- `NOTEBOOKLM.SOURCE.READY`
- `OBSIDIAN.CONTEXT.NOTE.READY`
- `GITHUB.SOURCE.TRUTH.SYNCED`

### 5. Workflow Board

Use bento sections for statuses:

- Idea
- Drafted
- Designed
- Recorded
- Edited
- Scheduled
- Published
- Repurposed

## Design Tokens

```ts
export const designTokens = {
  colors: {
    gold: "#D4AF37",
    black: "#050505",
    nearBlack: "#080808",
    parchment: "#EAE2D3",
    lime: "#A3E635",
    darkSurface: "#18181B",
    textLight: "#FFFFFF",
    textDark: "#111827",
    mutedDark: "#A1A1AA",
    mutedLight: "#4B5563",
    borderDark: "#27272A",
    borderLight: "#E5E7EB",
  },
  fonts: {
    display: "Cinzel",
    body: "Inter",
    mono: "JetBrains Mono",
  },
  radii: {
    editorialCard: "16px",
    systemCard: "8px",
    pill: "9999px",
  },
  spacing: {
    base: "8px",
    gap: "16px",
    cardPadding: "24px",
    sectionPadding: "80px",
  },
};
```

## Implementation Notes for Codex / Claude Code

- Preserve the uploaded HTML references in `/references/html`.
- Preserve the uploaded design specs in `/references/design`.
- Do not import the raw HTML directly into the React app.
- Rebuild the visual language as reusable React/Tailwind components.
- Keep WebGL/canvas effects optional and non-blocking.
- Prioritize readable content production workflows over decorative effects.
- Use the design system to support the ABC curriculum, not distract from it.
- Build explicit export surfaces for NotebookLM, Google Opal, Google Omni, Obsidian, Airtable, and Notion.

## File References

Canonical references:

- `/references/design/aurelis-intelligence-beyond-boundaries-DESIGN.md`
- `/references/html/aurelis-intelligence-beyond-boundaries.html`
- `/references/design/system-initializing-DESIGN.md`
- `/references/html/system-initializing.html`
