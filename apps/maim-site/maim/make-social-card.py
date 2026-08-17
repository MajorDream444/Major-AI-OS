#!/usr/bin/env python3
"""
Generate the MAIM social preview card at the size link unfurlers expect.

The front door declares `twitter:card = summary_large_image` and an
`og:image`, both of which want a 1200x630 landscape image. The medallion
asset is 480x480 square, so using it directly gets centre-cropped by
Facebook, LinkedIn, and X — the mark is clipped and the wordmark is lost.

This composites the medallion onto a brand-black landscape field with the
wordmark and tagline, and writes:

    assets/social-preview.png   (1200x630)

Run it whenever the medallion or tagline changes, then run build.py.

    python3 maim/make-social-card.py
"""

import pathlib
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
OUT = ASSETS / "social-preview.png"

W, H = 1200, 630

INK = (17, 17, 17)
GOLD = (201, 147, 26)
GREEN = (31, 138, 76)
BLUE = (42, 120, 214)
TEXT = (240, 237, 229)
MUTED = (150, 147, 140)

# DejaVu ships with the container and renders predictably. The site's
# 'Arial Narrow' display face is not available here, and a missing font
# would silently fall back to a bitmap default at the wrong size.
SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        print(f"  !! missing font {path}")
        return ImageFont.load_default()


def main() -> int:
    card = Image.new("RGB", (W, H), INK)
    draw = ImageDraw.Draw(card)

    # Champion stripe across the top: gold, green, blue.
    stripe_h = 6
    for i, colour in enumerate((GOLD, GREEN, BLUE)):
        x0 = i * (W // 3)
        x1 = W if i == 2 else (i + 1) * (W // 3)
        draw.rectangle([x0, 0, x1, stripe_h], fill=colour)

    # Medallion, left side, vertically centred.
    medallion_path = ASSETS / "md-medallion.png"
    left = 80
    if medallion_path.exists():
        m = Image.open(medallion_path).convert("RGBA")
        size = 260
        m = m.resize((size, size), Image.LANCZOS)
        card.paste(m, (left, (H - size) // 2), m)
        text_x = left + size + 60
    else:
        print("  !! md-medallion.png not found — text-only card")
        text_x = left

    # Wordmark.
    draw.text((text_x, 172), "MAJOR", font=font(SANS_BOLD, 62), fill=TEXT)
    draw.text((text_x, 240), "AI MINDSET", font=font(SANS_BOLD, 62), fill=GOLD)

    # Rule under the wordmark.
    draw.rectangle([text_x, 330, text_x + 300, 331], fill=(70, 68, 64))

    # Tagline.
    draw.text(
        (text_x, 354),
        "Learn to think with AI",
        font=font(SERIF_BOLD, 27),
        fill=TEXT,
    )
    draw.text(
        (text_x, 390),
        "without losing yourself.",
        font=font(SERIF_BOLD, 27),
        fill=TEXT,
    )

    # Domain, monospace, muted — mirrors the site's system labels.
    draw.text(
        (text_x, 450),
        "majoraimindset.com",
        font=font(MONO, 19),
        fill=MUTED,
    )

    card.save(OUT, "PNG", optimize=True)
    kb = OUT.stat().st_size // 1024
    print(f"social preview: {OUT.name}  {W}x{H}  {kb} KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
