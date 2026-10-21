# MAIM Creative Studio motion contract

2026-10-21 · Direct founder direction, scoped to studio presentation. Complements DESIGN.md; does not replace public-homepage content or Academy release requirements.

## Experience

Show useful movement in the first ten seconds: a gold CSS 3D orbital sculpture under 'From a spark. To a signature.' followed by a sticky three-stage sequence. Preserve native scroll ownership and readable copy. No autoplay audio. A Pause motion control freezes continuous rotation; prefers-reduced-motion shows a still composition. Pause control also works by keyboard.

| Scene | Trigger | Visual change | Meaning | Fallback |
|---|---|---|---|---|
| Spark | Initial viewport | Rotating depth-transformed orbit and particles | A starting idea, clearly illustrative | Static golden sculpture |
| Preserve | First narrative step enters central viewport | Stage 01 and source/reference message | Originals govern production | Stacked text and static stage |
| Compose | Second step enters | Stage 02, editable composition message and blue accent | Skills connect components | Same text visible without animation |
| Deliver | Third step enters | Stage 03, derivative delivery message and green accent | One master supports multiple outputs | Same text visible without animation |

Implementation: dependency-free CSS perspective/transform-style preserve-3d plus IntersectionObserver. Native position:sticky holds the narrative panel on wider screens; under 550 px use stacked sections. The primary specialist is the frontend/motion implementer; this is a lightweight local implementation, not an invented data visualization. No data quantities are encoded by the orbit. Text stages remain in DOM order.

Performance: animate transforms only, fixed 24 decorative particles, no image-generation request and no WebGL dependency. Honor reduced motion and pause; avoid blanket parallax on forms. Validate pause/resume, first frame, forward/reverse scroll, narrow viewport, keyboard links and existing brief persistence. Mobile/reduced-motion style rules require actual device/emulation checks before claiming full QA.

Brand: black/obsidian foundation, crown gold, clarity white and restrained blue/green signals from DESIGN.md. Keep existing approved marks as source assets. Do not distort them into the orbit or regenerate them. The sculpture is an illustration, not a replacement identity mark.

A standalone GitHub runtime repository (suggested future name MAIM-CREATIVE-STUDIO) is optional pending deliberate ownership/release review. The working UI already has versioned Sites source; do not create a duplicate deployment or copy private assets into a public repository. Academy can link to a reviewed studio/lesson destination through a separate navigation/release PR.
