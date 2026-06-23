# MAIM 00 Brand System — Claude Design HTML Review

Date reviewed: 2026-06-23

Source file reviewed: `MAIM 00 Brand System.html`

## Executive Read

This Claude Design export is a strong parent brand-system board. It should be preserved as a visual reference artifact and used as the parent context for the other eight Claude Design projects.

It should not replace the canonical repo docs. Treat it as a designed expression of the MAIM brand system, not the source of truth itself.

Source of truth remains:

- `README.md`
- `CLAUDE.md`
- `DESIGN.md`
- `data/design-tokens.json`
- `docs/00-source-of-truth.md`

## Technical Review

The uploaded file is a bundled standalone HTML export.

It includes:

- A black loading/thumbnail shell
- A large SVG thumbnail for the MAIM Brand System Vol. 00 cover
- A bundler script that unpacks assets from embedded base64 data
- A manifest with fonts and image assets
- A template payload that renders the full board client-side

This makes it useful for sharing and reviewing visually, but not ideal as editable source code.

Recommendation:

- Archive the HTML export as a design artifact
- Extract design doctrine into markdown
- Keep editable docs and tokens in GitHub
- Use Claude Design itself as the editable design workspace

## Strong Sections Found

### Foundation Board

The board clearly establishes:

- Major AI Mindset
- Likkle by likkle, we build the future
- @major_ai_mindset
- Education Movement
- Powered by Hanzo
- Brand System Vol. 00

This is strong and should remain the parent brand identity frame.

### Brand Mood & Positioning

The board locks the doctrine:

- Humans are the hero
- AI is the amplifier
- The crown is the symbol
- Major is the translator

It also includes the strong line:

Build the system. Serve the community. Secure the legacy.

This should be added into future MAIM founder/deck language.

### Color Palette

The board uses:

- Foundation Black `#050505`
- Clarity White `#F7F4EA`
- Gold Authority `#D8AF55`
- Gold Deep `#D4AF37`
- Jamaican Green `#1F7A3A`
- Knicks Blue `#006BB6`
- Knicks Orange `#F58426`

The tri-bar signature device is strong:

Green → Gold → Blue underline for headlines and CTAs.

Keep this.

### Typography

The board suggests:

- Display: Archivo Black 800–900
- Body: Archivo 400–600
- Label/System: JetBrains Mono 400–700

This is visually strong, but should be reconciled with `DESIGN.md`, which also allows Inter, Manrope, Montserrat, Anton, Bebas Neue, League Spartan, Archivo Black, and Cinzel.

Recommendation:

Use Archivo/Archivo Black as Claude Design display/body defaults, while keeping Inter/Manrope as app UI defaults.

### Crown System

The crown is correctly positioned as a seal, not decoration.

Strong rules:

- The crown anchors every highlight, badge, and seal
- Never stretch
- Never recolor
- Minimum 64px for master seal
- Highlight icons use woven base + single gold glyph on black

This should be treated as a locked visual totem rule.

### Logo & Lockups

The board defines:

- Horizontal lockup
- Stacked lockup
- Icon-only mark
- Gold-on-green default treatment
- Transparent gold line treatment
- Crown seal
- Clear space rule
- Minimum sizes

This is useful for future asset production.

### Social Template System

The board includes reusable templates for:

- Instagram feed 4:5 — 1080 x 1350
- Story/Reel 9:16 — 1080 x 1920
- Carousel flow
- YouTube thumbnail 16:9 — 1280 x 720

This confirms the board is useful as a production template reference.

## Important Corrections / Refinements

### 1. Keep the doctrine, tighten the file title

The HTML browser title currently appears as a bundled page. Future exports should use:

```txt
MAIM 00 Brand System — Major AI Mindset
```

### 2. Keep canonical ABC language consistent

The board correctly uses:

A is for Awareness

Continue using the canonical beginner spine:

- A = Awareness
- B = Belief
- C = Context
- D = Direction
- E = Experiment

Do not let experimental prototype terms override this.

### 3. Reconcile type systems

Use this split:

Marketing / Claude Design:

- Archivo Black for display
- Archivo for body
- JetBrains Mono for labels

App / prototype:

- Inter for system UI
- Manrope for headings/body emphasis
- JetBrains Mono for labels

### 4. Archive HTML, do not depend on it

This HTML is a rendered/exported artifact, not a maintainable source file.

Keep editable truth in Markdown, JSON tokens, and source components.

## Recommended Repo Placement

Store the raw HTML export under:

```txt
archives/claude-design/maim-00-brand-system/MAIM 00 Brand System.html
```

Store extracted doctrine under:

```txt
references/claude-design/maim-00-brand-system-review.md
references/claude-design/maim-00-brand-system-extracted-notes.md
```

## Recommended Claude Design Use

Use this project as the parent reference for:

1. MAIM 01 Instagram Launch Grid
2. MAIM 02 Webinar Funnel
3. MAIM 03 ABC Roadmap
4. MAIM 04 YouTube Thumbnail System
5. MAIM 05 Lead Magnets + Ebooks
6. MAIM 06 Landing Pages + Wireframes
7. MAIM 07 Course + Skool Assets
8. MAIM 08 Hanzo Powered-By Assets

Each project should reference `MAIM 00 Brand System` before generating assets.

## Decision

Approved as a parent brand board.

Use it.

Do not let it become the only source of truth.

Likkle by likkle, we build the future.
