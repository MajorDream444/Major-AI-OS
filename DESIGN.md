---
version: "major-ai-mindset-abc-studio-v1"
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
- Google Omni prompt generation
- NotebookLM export screen
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
- Podcast angle
- Google Omni prompt
- NotebookLM prompt
- Export buttons

### 4. Generator Console

Blend Aurelis layout with System Initializing behavior.

When generating content, show system-style progress states:

- `SYS.CHK.LESSON`
- `PROMPT.PACK.BUILDING`
- `OMNI.SCENE.COMPILING`
- `NOTEBOOKLM.SOURCE.READY`
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

## File References

Canonical references:

- `/references/design/aurelis-intelligence-beyond-boundaries-DESIGN.md`
- `/references/html/aurelis-intelligence-beyond-boundaries.html`
- `/references/design/system-initializing-DESIGN.md`
- `/references/html/system-initializing.html`
