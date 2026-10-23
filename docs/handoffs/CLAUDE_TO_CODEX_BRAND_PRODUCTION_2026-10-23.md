# Claude → Codex · brand production is locked

**Date:** 23 October 2026 · **From:** Claude Code · **Repo:** `major-ai-os` `main`

Read `.claude/skills/maim-brand-production/SKILL.md` (mirrored to
`.agents/skills/` for the Codex path) before any MAIM visual work. It carries
the tokens, the font pipeline, the mark derivations and the verification steps,
so none of it needs re-deriving on either side.

---

## What is new in this repo

| Path | What |
|---|---|
| `.claude/skills/maim-brand-production/` | the skill, with `references/tokens.md` and `references/pipeline.md` |
| `.agents/skills/maim-brand-production/` | same, on the Codex path |
| `assets/brand/MD-Circle-Transparent.png` | seal, transparent ground |
| `assets/brand/MD-Hat-Transparent.png` | unencircled mark, transparent ground |
| `assets/brand/transparent-derivation.json` | method + hashes for both |
| `assets/fonts/Inter-*.ttf` | TrueType Inter, embeddable |
| `scripts/build_interior.py` | 6×9 book interior from manuscript markdown |
| `scripts/build_cover_front.py` | front cover |
| `scripts/build_catalog_images.py` | 7 catalogue/social exports from one cover |
| `build/catalog/` | the seven, built for Volume 1 |
| `docs/design/PHILOSOPHY_CONSTRICTED_FLOW.md` | the cover's design philosophy |

## Three things that will save you time

**1 · The marks now have transparent versions.** The approved originals carry
flat near-black grounds, so unprocessed they can only be placed on black. The
two derivations need different methods and the difference matters: the circular
seal has a **black interior**, so it takes a geometric mask — a luminance key
would hollow it out. The unencircled mark takes a luminance key plus
un-premultiply, or edge pixels keep dark values and halo on light grounds.

Originals are untouched and still verify: `MD-Circle-Original.png` `4fde85eb…`,
`MD-Hat-Original.png` `97d66750…`. Nothing was redrawn, traced or regenerated.

**2 · The canonical tokens were not being used.** `DESIGN.md` says every agent
must read it before visual decisions. An earlier pass used approximations —
`#111111` for the ground instead of `#050505` maimBlack, `#C9931A` instead of
`#D8AF55` crownGold, Helvetica and Times instead of Inter. Each was close
enough to look right and wrong enough to be off-brand. `references/tokens.md`
now carries every value.

Also: use the token names. `#F7F4EA` is **clarityWhite**, not "cream". A second
vocabulary beside the canonical one is how drift starts.

**3 · Inter is a trap.** It ships as OTF with CFF outlines, which ReportLab
cannot embed. Registration fails, the build **silently falls back to Helvetica**,
and the output looks fine. TrueType conversions are committed at
`assets/fonts/`. Always confirm with `pdffonts` that brand faces show `emb yes`.

## Catalogue imagery for commerce

`build/catalog/` holds seven exports at the canonical sizes from
`design-tokens.json`, including **`stripe-1024x1024.png`** for product images
and `open-graph-1200x630.png` for link previews. Each is composed for its own
aspect ratio rather than cropped.

Regenerate for any other product:

```bash
python3.13 scripts/build_catalog_images.py --cover <cover.pdf> --out <dir>
```

**These are assets, not an activation.** Production commerce remains disabled,
Academy enrollment remains closed, and nothing here authorises a live price,
product or checkout.

## Boundaries held

- Integrity's six illustrations stay with Integrity. Volume 1's cover uses none
  of them.
- No ISBN, barcode, spine or print specification invented. Barcode space is
  reserved empty.
- Nothing is called print-ready.
- P3 restricted sources are extracted outside every Git working tree and are not
  in any repository.

## Next from this side

1. Back cover for Volume 1, matching the front.
2. Integrity L01 author review from the P2 transfer — separate track.
3. Volume 1 remains blocked on nothing but owner decisions: cover choice, title
   prefix, seed confirmation.
