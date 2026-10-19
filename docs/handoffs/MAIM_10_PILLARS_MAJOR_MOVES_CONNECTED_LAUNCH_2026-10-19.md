# MAIM 10 Pillars × Major Moves — Integrated Launch Handoff
Date: 2026-10-19
Status: Strategy approved in principle; no claim of checkout, fulfillment, mobile app or session automation deployment.
Owner: Major Dream Williams / Major AI Mindset

## Executive decision
Gumroad, Shopify and Kit are retired. Sell all e-books, bundles, and learning products on the owned Major AI Mindset website, using the selected Vercel + Stripe + Resend + Airtable stack. The existing Ten Pillars microsite at https://pillars.majoraimindset.com/ is a discovery path, not a separate third-party store. One customer identity and entitlements layer should serve web, future app, and community.

## Evidence / audit snapshot
- Major-AI-OS README declares MAIM brand and infrastructure, 2026-10-15 retirement directive, and current context handover.
- MAIM_10_Pillars README documents 10 Pillars, earlier portal/agent, $27 Pillar Scroll, $97 Emerald Awakening, $297 Pillar Code Vault, $17 meditation/music add-on, and outdated Gumroad → n8n token flow. Existing README is not proof of live purchases or deployed entitlements.
- major-moves-series README and docs/MAIM_OS_ALIGNMENT.md preserve visual-manifesto storytelling but contain legacy Gumroad references. README updated 2026-10-19; alignment doc requires cleanup.
- Live MAIM website displays free Live Knowledge Room and 10 Pillars link; it advertises Sunday 7 AM Bali/WITA and Saturday 7 PM New York/ET. These two labels do not necessarily remain equivalent across daylight-saving changes; verify timezone-aware scheduling before public invitations.
- Live pillars microsite says individual editions and complete-series purchasing are in preparation; do not describe commerce as live.
- NotebookLM notebook 'The 10 Pillars of the Major AI Mindset' (https://notebook.google.com/notebook/128bc999-2d63-4789-9ed4-56368a195ab1) was readable in browser on 2026-10-19: seven source documents; themes include diaspora creators/ownership, localized AI, gamification, decentralized value, and intergenerational legacy. Do not assume notebook source documents are all synced to GitHub.

## Canonical separation
Major-AI-OS = umbrella operating policy, brand, commerce, customer journey and handoff.
MAIM_10_Pillars = doctrine, ten canonical pillar definitions, manuscripts, curricular objectives, book-specific product metadata, companion app specification.
major-moves-series = visual-manifesto originals, narrative seeds, founder anecdotes, creative derivatives, standalone micro-books and story quests.
Captain Lucky treasure hunt = separate IP/game project, optional opt-in integrations, not silently merged.
Airtable = metadata/status, Google Drive = final media, GitHub = versioned source, Notion = reference mirror. No claim of successful external synchronization.

## Learning pathways (same connected identity)
1. Books only: buy a standalone pillar e-book, download/read with no app requirement.
2. Book + companion: activate the optional app, quizzes, reflection journal, five-minute action and progress.
3. App-first: free ABC/intro journey; explore pillars and buy a book only when useful.
4. Community-first: attend free weekly Google Meet knowledge room, join guided 10-week pillar cycle and get recordings/resources subject to privacy/consent.
5. Full school: bundles, guided cohorts, deeper curriculum, advanced support.
All paths share opt-in discovery, accessible UX and portable progress; do not make NFT ownership a prerequisite.

## Product packaging — proposed, needs SKU reconciliation
- Individual e-book: working price ~$9 per pillar, with book plus a lightweight in-book reflection and five-minute action. Do not bundle paid coaching or ongoing service by default.
- Pillar Scroll $27: historical tier; confirm which books/quiz/concept map/wallpapers/AI guide are included before publishing.
- Emerald Awakening $97: historical full 10-pillar bundle with journal/workbook and additional guided materials; verify final contents.
- Pillar Code Vault $297: historical advanced bundle, implementation templates and possible AI guidance; do not promise lifetime access or agent usage without operational and financial approval.
- Meditations/music $17: historical optional add-on, rights and deliverables to verify.
- Companion app: free tier plus purchase-aware entitlements; app subscription or premium tier TBD; never promise a feature not built.
No automatic stacking or duplicate entitlements until Stripe product and price IDs, taxes, refund policy, and fulfillment mapping are confirmed.

## Companion app v0.1 specification (proposed)
Mobile-friendly PWA first on MAIM-controlled domain; later native wrapper only if evidence justifies.
Modules: 10 Pillar map; user-selected starting pillar; readable lessons; workbook prompts; private journal; short quizzes; five-minute Major Moves; progress milestones; accessible badges; weekly Google Meet session calendar and replay links; saved artifacts export; simple personal digital-sovereignty audit (data, identity, backups, ownership).
Core data: users, products, entitlements, pillars, lessons, quiz attempts, reflections, quest completions, badge awards, session RSVPs, media assets. Minimize sensitive journal collection, separate public badges from private reflections, allow deletion/export, obtain consent for any recordings.
No crypto wallet, minting, DAO governance, AI coach or token-gating in MVP unless separately approved. Validate user value first.
Use secure server-side Stripe webhook verification, idempotent fulfillment, role/entitlement checks, receipt/recovery flows and tested refunds.

## Weekly community engine
Proposed recurring free weekly Google Meet knowledge session, with 10-week pillar rotation, 5-minute win, guest/community example, live Q&A and optional quest. Sessions link back to the matching book and app lesson. Define timezone-aware canonical schedule, RSVP, reminders, consent for recording, replay access and moderation. Existing MAIM homepage already advertises a Live Knowledge Room; audit that funnel before duplicating it.

## Major Moves preservation
Keep 12 image seeds (Overloaded, Bottleneck, Leak, Orchestra, Machine, Greenhouse, Fire Fighter, Air Traffic Controller, Ecosystem, Bridge, Iceberg, Gardener). Each may link to real founder experience, pillar lesson, mini-book, quest, badge, character/agent narrative, optional art collectible. No invented lived stories. Preserve originals, prompts, rights and aspect ratios. 1:12 derivatives is a creative planning ratio, not a quota.

## Launch sequence / gates
P0 Audit actual live routes, checkout, Stripe products/prices, webhook, refund, access control, email, and source assets; reconcile ebook cover project without overwriting approved covers.
P1 Publish one finished standalone pillar ebook and one validated Stripe checkout + entitlement + download/recovery path; QA on mobile and desktop.
P2 Publish ten book listings and confirmed bundles; link free weekly knowledge room, opt-in registration, email reminders and replay path.
P3 Ship small PWA companion prototype with 1–2 pillars, quizzes, journal, action and progress; interview diaspora users and iterate.
P4 Expand to ten pillars, cohorts, accessible gamification, optional badge/art drops; consider wallet/NFT only after value, rights and compliance review.

## Risks and guardrails
No separate disconnected customer database; do not conflate 10 Pillars doctrine with Major Moves story collection; no clinical claims about nervous-system responses; no guaranteed NFT appreciation; accessibility and low-bandwidth support for diaspora markets; explicit privacy/PII handling; copyright/provenance for images and music; verified billing and tax handling; no premature 'live' claims.

## Agent instructions (copy/paste)
**Codex — MAIM_10_Pillars:** Audit current app/portal/backend and the pillars microsite against this handoff. Produce file-by-file migration plan from legacy Gumroad/n8n flow to MAIM-owned Stripe entitlements, a PWA MVP spec, test plan, observability and PII/data-flow map. Respect AGENTS.md and record readiness evidence. Do not deploy without approval.
**Codex — Major-AI-OS:** Audit live MAIM commerce, Live Knowledge Room, Stripe products, Resend and Airtable integration; report verified vs blocked. Prepare a single customer journey and SKU/entitlement registry. No invented product IDs or secrets.
**Claude/Content — Major Moves:** Catalog twelve original visual seeds and all aspect-ratio variants; map each to canonical pillar, original story interview, action, quest and potential badge. Preserve source art; no synthetic founder anecdotes.
**Cowork — Operations:** Check existing Airtable, Drive and Notion structures before creating anything; propose a single assets and products register, ten-week live session calendar and owner/approval checklist. Do not duplicate folders or announce sessions before verified links.

## Definition of done
Verified public product page + checkout + payment test + delivery/recovery + refunds + analytics/privacy + accessible book + correct cover and SKU; only then classify product launch-ready. App launch requires production-readiness gate (tests, observability, data/PII safety).
