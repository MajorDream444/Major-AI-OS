# Performance Checklist — MAIM Gravity Well Landing Test

## Purpose

This checklist protects the MAIM landing page from becoming visually impressive but slow, confusing, or hard to use.

The page must serve the mission first.

The animation supports the message.

The animation is not the message.

## Core Performance Rules

- Keep the signup CTA visible above the fold.
- Lazy-load Three.js where possible.
- Use a static fallback image for mobile or low-power devices.
- Respect prefers-reduced-motion.
- Keep pointer interactions limited and intentional.
- Do not block scrolling or form interaction after the hero.
- Avoid unnecessary analytics, tracking, or external scripts during experiment phase.

## Mobile Rules

Mobile is the primary test.

The hero must work on:

- iPhone Safari
- Android Chrome
- Low bandwidth
- Vertical screen
- Thumb navigation

Mobile fallback may use:

- Static starfield
- CSS radial gradients
- Light sphere animation
- No WebGL

## Reduced Motion Requirement

Add support for:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

If reduced motion is enabled, the page should still look premium.

## Visual Load Budget

Target:

- Hero render under 2 seconds on average mobile connection
- First meaningful content visible immediately
- CTA visible without waiting for Three.js
- No layout jump after canvas loads

## Accessibility

- CTA buttons must be real links or buttons.
- Focus states must be visible.
- Text contrast must meet readable standards.
- Do not rely on color alone for meaning.
- Add aria-labels to interactive controls.
- Avoid tiny labels as primary information.

## Brand Safety

Must use MAIM identity:

- Major AI Mindset
- Crown seal
- Likkle by likkle, we build the future
- If you can text, you can use AI
- See it. Believe it. Build it.

Must remove:

- Superset
- Generic template FAQ
- Any placeholder copy
- Any non-MAIM brand mark

## CTA Tests

Primary CTA:

Reserve Your Seat

Secondary CTA:

Explore the ABC Roadmap

The CTA should link to the active signup form first.

Later it can connect to:

- Google Form
- Opal readiness app
- Airtable form
- MAIM CRM
- Newsletter

## Before Merge

Before merging into main:

1. Preview on desktop.
2. Preview on mobile.
3. Test reduced motion.
4. Test CTA link.
5. Confirm no broken external scripts.
6. Confirm no hidden scroll traps.
7. Confirm the hero is understandable in 5 seconds.
8. Confirm page still makes sense if Three.js fails.

## Final Test Question

Does this page make a new visitor feel:

I understand what this is.

I feel invited.

I know what to do next.

If yes, continue.

If no, simplify.
