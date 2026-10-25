#!/usr/bin/env python3
"""
Build the deployable MAIM site.

The page sources in maim/ are *fragments* — they open with <title> and <style>
and carry no <!DOCTYPE>, <html>, or <head>. That is correct for Claude Artifacts,
which injects a document skeleton at publish time. Served raw by a static host it
is not correct: no charset, no viewport (mobile renders at desktop width), no
social preview, no favicon.

This script wraps each fragment into a complete document, rewrites internal links
to clean routes, and emits robots.txt + sitemap.xml into maim/dist/.

    python3 maim/build.py

Run it after apply-logo.py, and after any edit to a page source.
"""

import pathlib
import re
import shutil
import sys
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parent
DIST = ROOT / "dist"
ORIGIN = "https://www.majoraimindset.com"
NOINDEX_ROUTES = {
    "/terms",
    "/terms/blueprint/blueprint-terms-2026-10-16-draft.1",
    "/terms/blueprint/blueprint-terms-2026-10-16.1",
    "/terms/blueprint/blueprint-terms-2026-10-16.2",
    "/privacy",
    "/privacy/maim/maim-privacy-2026-10-16.1",
}

# source fragment -> (output file, route, description)
PAGES = {
    "majoraimindset_front_door.html": (
        "index.html",
        "/",
        "Learn to think with AI without losing yourself. A free live room for "
        "anyone ready to begin — one letter, one lesson, one action at a time.",
    ),
    "MAIM_Funnel_Landing_Page.html": (
        "pillars.html",
        "/pillars",
        "Five AI moves you can run this week, free. Then the 10 Pillars — the "
        "architecture underneath the A·B·C.",
    ),
    "return.html": (
        "return.html",
        "/return",
        "Your asset is ready. This is not the end of the purchase — it is your "
        "first brick inside MAIM.",
    ),
    "shop.html": ("shop.html", "/shop", "Explore MAIM digital learning guides and resources."),
    "pillar-scroll.html": ("shop/pillar-scroll.html", "/shop/pillar-scroll", "Explore the $27 Pillar Scroll and its deeper 10-Pillar learning framework."),
    "coaching.html": ("coaching.html", "/coaching", "Learn about MAIM coaching and workshops."),
    "library.html": ("library.html", "/library", "Explore MAIM recommended reading, resources and book clubs."),
    "vault.html": ("vault.html", "/vault", "MAIM premium collections and access guidance."),
    "campus.html": ("campus.html", "/campus", "Explore MAIM as a lifelong learning campus bridging wisdom, technology and stewardship."),
    "checkout-return.html": ("checkout/return.html", "/checkout/return", "MAIM is confirming your checkout and preparing the next step."),
    "terms-2026-10-16.2.html": ("terms.html", "/terms", "Review the proposed terms for the MAIM Client System Blueprint service."),
    "privacy.html": ("privacy.html", "/privacy", "Review the proposed MAIM privacy notice."),
}

# Reuse the same reviewed source for the convenience and immutable candidate
# routes so legal copy cannot drift between two hand-maintained files.
VERSIONED_PAGES = [
    (
        "terms.html",
        "terms/blueprint/blueprint-terms-2026-10-16-draft.1.html",
        "/terms/blueprint/blueprint-terms-2026-10-16-draft.1",
        "Review the proposed versioned terms for the MAIM Client System Blueprint service.",
    ),
    (
        "terms.html",
        "terms/blueprint/blueprint-terms-2026-10-16.1.html",
        "/terms/blueprint/blueprint-terms-2026-10-16.1",
        "Review the approval-candidate terms for the MAIM Client System Blueprint service.",
    ),
    (
        "terms-2026-10-16.2.html",
        "terms/blueprint/blueprint-terms-2026-10-16.2.html",
        "/terms/blueprint/blueprint-terms-2026-10-16.2",
        "Review the successor approval-candidate terms for the MAIM Client System Blueprint service.",
    ),
    (
        "privacy.html",
        "privacy/maim/maim-privacy-2026-10-16.1.html",
        "/privacy/maim/maim-privacy-2026-10-16.1",
        "Review the approval-candidate MAIM privacy notice.",
    ),
]

# old relative links -> clean routes
LINK_MAP = {
    "./majoraimindset_front_door.html": "/",
    "./MAIM_Funnel_Landing_Page.html": "/pillars",
    "./return.html": "/return",
}

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.DOTALL)

TERMS_VARIANTS = {
    "/terms/blueprint/blueprint-terms-2026-10-16-draft.1": {
        "{{STATUS_SHORT}}": "Review Draft",
        "{{STATUS_HEADING}}": "Review draft — not approved for checkout.",
        "{{TERMS_VERSION}}": "blueprint-terms-2026-10-16-draft.1",
        "{{TERMS_LABEL}}": "PROPOSAL",
        "{{TERMS_ROUTE}}": "/terms/blueprint/blueprint-terms-2026-10-16-draft.1",
        "{{FOOTER_STATUS}}": "Review draft · Not approved for checkout",
    },
    "default": {
        "{{STATUS_SHORT}}": "Approval Candidate",
        "{{STATUS_HEADING}}": "Approval candidate — not approved for checkout.",
        "{{TERMS_VERSION}}": "blueprint-terms-2026-10-16.1",
        "{{TERMS_LABEL}}": "FINAL CANDIDATE · PENDING APPROVAL",
        "{{TERMS_ROUTE}}": "/terms/blueprint/blueprint-terms-2026-10-16.1",
        "{{FOOTER_STATUS}}": "Approval candidate · Not approved for checkout",
    },
}

# Gold medallion mark. Replaced by the real asset when it exists.
FALLBACK_FAVICON = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
<circle cx="24" cy="24" r="23" fill="#C9931A"/>
<circle cx="24" cy="24" r="20" fill="#0E0E0E"/>
<text x="24" y="30" font-family="Georgia,serif" font-size="20" font-style="italic"
      font-weight="700" fill="#C9931A" text-anchor="middle">MD</text>
</svg>
"""


ACADEMY = "https://academy.majoraimindset.com"
SITE_NAV = [
    ("Home", "/"),
    ("Academy", ACADEMY),
    ("10 Pillars", "/pillars"),
    ("Library", "/library"),
    ("Vault", "/vault"),
    ("Shop", "/shop"),
    ("Coaching", "/coaching"),
]
NO_COHORT_PREFIXES = ("/return", "/checkout", "/terms", "/privacy")
PAGE_NAV_PATTERNS = [
    re.compile(r"<!-- NAV -->\s*<nav>.*?</nav>", re.DOTALL),
    re.compile(r"<nav>\s*<a class=\"nav-logo\".*?</nav>", re.DOTALL),
    re.compile(r"<header><a href=\"/\">MAJOR AI MINDSET</a>.*?</header>", re.DOTALL),
    re.compile(r"<div class=\"nav\"><div class=\"shell[^\"]*\">.*?</div></div>", re.DOTALL),
]


def strip_page_nav(body):
    """Remove the page's own top bar; the shared header replaces it."""
    for pattern in PAGE_NAV_PATTERNS:
        body, n = pattern.subn("", body, count=1)
        if n:
            return body
    return body


def site_chrome(route):
    """Shared header, footer loop and cohort card (UX pass, Major, 25 Oct 2026)."""
    def link(label, href):
        current = ' aria-current="page"' if href == route else ""
        return f'<li><a href="{href}"{current}>{label}</a></li>'
    items = "".join(link(label, href) for label, href in SITE_NAV)
    header = (
        '<div class="mc-bar" role="banner"><div class="mc-inner" role="navigation" aria-label="Main">'
        '<a class="mc-brand" href="/" aria-label="Major AI Mindset home">'
        '<img src="/favicon.png" alt="" width="36" height="36">Major AI Mindset</a>'
        '<button class="mc-menu" type="button" aria-expanded="false" aria-controls="mc-links">Menu</button>'
        f'<ul class="mc-links" id="mc-links">{items}'
        f'<li><a class="mc-cta mc-cta-mob" href="{ACADEMY}/reserve">Reserve your spot</a></li></ul>'
        f'<a class="mc-cta mc-cta-desk" href="{ACADEMY}/reserve">Reserve your spot</a>'
        '</div></div>'
    )
    foot_links = "".join(
        f'<a href="{href}"{" class=\"mc-home\"" if href == "/" else ""}>{"← Home" if href == "/" else label}</a>'
        for label, href in SITE_NAV
    )
    footer = f'<div class="mc-foot"><div class="mc-foot-nav" role="navigation" aria-label="Site">{foot_links}<a href="{ACADEMY}/reserve">Reserve your Academy spot</a></div></div>'
    cohort = ""
    if not route.startswith(NO_COHORT_PREFIXES):
        cohort = (
            '<aside class="mc-cohort" id="mc-cohort" hidden data-start="2026-11-18T14:00:00Z" aria-label="Founding cohort">'
            '<button class="mc-x" type="button" aria-label="Dismiss">×</button>'
            '<p class="mc-kick">MAIM Academy · Founding cohort</p>'
            '<h2>20 spots. Starts 18 November.</h2>'
            '<div class="mc-count"><div><b data-d>–</b><span>days</span></div>'
            '<div><b data-h>–</b><span>hours</span></div><div><b data-m>–</b><span>min</span></div></div>'
            '<p>US$249, paid once. Reserve free now; payment links go out 11 November, reserved people first.</p>'
            f'<a class="mc-cta" href="{ACADEMY}/reserve">Reserve your spot →</a>'
            '<div class="mc-bar-tri" aria-hidden="true"><i style="background:#1F7A3A"></i><i style="background:#D8AF55"></i><i style="background:#006BB6"></i></div>'
            '</aside>'
        )
    return header, footer + cohort


def document(title, description, route, body, favicon_href):
    canonical = ORIGIN + route
    social = f"{ORIGIN}/social-preview.png"
    robots = '<meta name="robots" content="noindex,nofollow">' if route in NOINDEX_ROUTES else ""
    # Contact details appear on every generated page without duplicating the
    # footer markup in the three independently maintained source fragments.
    contact_links = (
        '<a href="https://pillars.majoraimindset.com">Ten Pillars collection</a>'
        '<a href="mailto:contact@majoraimindset.com">Contact</a>'
        '<a href="mailto:major@majoraimindset.com">Email Major</a>'
        '<a href="tel:+61450461470">+61 450 461 470</a>'
    )
    body = body.replace('<div class="footer-links">',
                        '<div class="footer-links">' + contact_links, 1)
    body = strip_page_nav(body)
    chrome_top, chrome_bottom = site_chrome(route)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
{robots}
<link rel="canonical" href="{canonical}">
<meta name="theme-color" content="#111111">
<link rel="icon" href="{favicon_href}">
<link rel="apple-touch-icon" href="{favicon_href}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Major AI Mindset">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{social}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="{social}">
<script defer src="/_vercel/insights/script.js"></script>
<link rel="stylesheet" href="/site-chrome.css">
<script defer src="/site-chrome.js"></script>
</head>
<body>
{chrome_top}
{body}
{chrome_bottom}
</body>
</html>
"""


def main() -> int:
    print(f"build interpreter: Python {sys.version.split()[0]}")
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    shutil.copy2(ROOT / "checkout.js", DIST / "checkout.js")
    for name in ("site-chrome.css", "site-chrome.js"):
        shutil.copy2(ROOT / name, DIST / name)

    # Publish only explicitly public assets. Paid source files stay out of dist.
    public_assets = ("major-dream-williams.jpg", "MAIM_Free_Guide_5_AI_Moves.pdf",
                     "cohort-teaser.mp4", "cohort-teaser-poster.jpg")
    (DIST / "assets").mkdir(exist_ok=True)
    for name in public_assets:
        shutil.copy2(ROOT / "assets" / name, DIST / "assets" / name)

    # Cover art is marketing, not a paid file: the books themselves stay out of dist.
    # Published so Stripe product images and campaign pages can cite one canonical URL.
    covers = ROOT / "assets" / "covers"
    if covers.is_dir():
        shutil.copytree(covers, DIST / "assets" / "covers", dirs_exist_ok=True)
        print(f"covers: {len(list((DIST / 'assets' / 'covers').glob('*.jpg')))} published")

    # favicon: real medallion if present, else the drawn mark
    logo = ROOT / "assets" / "md-medallion.png"
    if logo.exists():
        shutil.copy(logo, DIST / "favicon.png")
        favicon_href = "/favicon.png"
        print("favicon: md-medallion.png")
    else:
        (DIST / "favicon.svg").write_text(FALLBACK_FAVICON)
        favicon_href = "/favicon.svg"
        print("favicon: drawn fallback (no md-medallion.png yet)")

    # Social preview must be 1200x630 landscape. The square medallion gets
    # centre-cropped by every major unfurler, so only use it as a last
    # resort — generate the real card with make-social-card.py.
    social = ROOT / "assets" / "social-preview.png"
    if social.exists():
        shutil.copy(social, DIST / "social-preview.png")
        print("social preview: assets/social-preview.png (1200x630)")
    elif logo.exists():
        shutil.copy(logo, DIST / "social-preview.png")
        print("social preview: !! falling back to square medallion — "
              "run `python3 maim/make-social-card.py` to fix cropping")
    else:
        print("social preview: !! none available")

    routes = []
    page_entries = [
        (src_name, out_name, route, description)
        for src_name, (out_name, route, description) in PAGES.items()
    ] + VERSIONED_PAGES
    for src_name, out_name, route, description in page_entries:
        src = ROOT / src_name
        if not src.exists():
            print(f"  !! missing source {src_name}")
            return 1

        body = src.read_text()

        if src_name == "terms.html":
            replacements = TERMS_VARIANTS.get(route, TERMS_VARIANTS["default"])
            for old, new in replacements.items():
                body = body.replace(old, new)
            if any(marker in body for marker in TERMS_VARIANTS["default"]):
                print(f"  !! unresolved terms template marker for {route}")
                return 1

        m = TITLE_RE.search(body)
        if not m:
            print(f"  !! {src_name} has no <title>")
            return 1
        title = m.group(1).strip()
        body = TITLE_RE.sub("", body, count=1).lstrip()

        # Founder signature quote: shared homepage element, independent of fragment markup.
        if route == "/":
            founder_quote = """
<style>
.maim-founder-quote{position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(circle at 85% 15%,rgba(31,138,76,.17),transparent 45%),#141618;color:#f8f5ec;padding:clamp(64px,9vw,132px) 24px;text-align:center;border-block:1px solid rgba(201,147,26,.35)}
.maim-founder-quote:before{content:"“";position:absolute;z-index:-1;left:4%;top:-110px;font:clamp(230px,38vw,530px) Georgia,serif;color:rgba(201,147,26,.09);line-height:1}
.maim-founder-quote blockquote{margin:0 auto;max-width:1040px;font:clamp(31px,5.4vw,72px)/1.16 Georgia,serif;letter-spacing:-.035em}
.maim-founder-quote strong{color:#d9ad55;font-weight:normal}
.maim-founder-quote figcaption{margin-top:36px;color:#d5d6d1;font:600 12px/1.8 Arial,sans-serif;letter-spacing:.19em;text-transform:uppercase}
.maim-founder-quote a{color:#e5bf76;text-underline-offset:5px}
.maim-founder-quote a:focus-visible{outline:3px solid #d9ad55;outline-offset:5px}
</style>
<section class="maim-founder-quote" aria-label="A thought from founder Major Dream Williams">
<figure><blockquote>“The most future-proof technology you will ever develop is <strong>your own mindset.</strong>”</blockquote>
<figcaption>Major Dream Williams · Founder, Major AI Mindset</figcaption></figure>
<p><a href="/campus">Discover the philosophy behind MAIM →</a></p>
</section>
"""
            # Place before the footer where possible; otherwise append after main content.
            if "</footer>" in body:
                body = body.replace("<footer", founder_quote + "<footer", 1)
            else:
                body += founder_quote

        for old, new in LINK_MAP.items():
            body = body.replace(old, new)

        (DIST / out_name).parent.mkdir(parents=True, exist_ok=True)
        (DIST / out_name).write_text(
            document(title, description, route, body, favicon_href)
        )
        if route not in NOINDEX_ROUTES:
            routes.append(route)
        print(f"  {src_name} -> dist/{out_name}  ({route})")

    (DIST / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\n\nSitemap: {ORIGIN}/sitemap.xml\n"
    )

    today = date.today().isoformat()
    urls = "\n".join(
        f"  <url><loc>{ORIGIN}{r}</loc><lastmod>{today}</lastmod></url>"
        for r in routes
    )
    (DIST / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n</urlset>\n"
    )

    print(f"\nBuilt {len(page_entries)} pages ({len(routes)} indexed) + robots.txt + sitemap.xml into maim/dist/")
    print("Deploy that directory. vercel.json already points at it.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
