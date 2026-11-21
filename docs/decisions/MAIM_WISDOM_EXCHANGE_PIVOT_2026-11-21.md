# MAIM Wisdom Exchange Pivot — 21 November 2026

Status: founder-directed narrative decision. The site copy is on branch `wisdom-pivot-narrative` for review.
Scope: what MAIM is and where it is going. This does not open checkout, change pricing or turn on any marketplace feature.

## The one line

**Hanzo builds the agents. MAIM gives them wisdom.**

## Why

Agents have intelligence but no wisdom. They are like brilliant new hires: fast, energetic and short on experience. The know-how that makes work go right lives with people who did the work: practitioners, retired professionals, tradespeople, producers, farmers, elders. Most of it is never written down.

MAIM started as an AI education brand: the ABCs for people who never had to think about tech. That still matters. But Hanzo already provides the deep academy (Hanzo University, for engineers) and the infrastructure (MCP, agents, metering, commerce, an owned cloud). Building a second academy and platform under MAIM would duplicate Hanzo.

What nobody offers yet is the **wisdom layer**: capturing real human know-how, with permission, as something agents can call on, with the people who earned it paid on every use. The idea grew out of the Pathfinders and Legacy Leavers concept: youth seek out people who carry institutional knowledge, gain that wisdom, and the funders' knowledge — not only their money — reaches the next generation.

## Who owns what

| Layer | Role |
|---|---|
| **Hanzo** | Infrastructure. Hosts wisdom as MCP, meters every call, bills, and keeps data in an owned cloud. Hanzo University is the deep academy. |
| **MAIM** | The mindset and the people. The story-led ABCs, community cohorts in underserved communities, and the "label" that finds, captures and packages wisdom. |
| **AMA Solutions** | The front door for businesses. The paid diagnostic surfaces the wisdom a business already holds. |
| **Pathfinders and Legacy Leavers** | MAIM's community program and supply engine. Pathfinders capture; Legacy Leavers contribute and earn. |

## The loop

1. **Find**: an AMA diagnostic or a conversation surfaces the wisdom.
2. **Capture**: a Pathfinder records it with the Legacy Leaver.
3. **Shape**: it becomes a Wisdom Unit (structured, reviewed, tested, licensed).
4. **Run**: Hanzo hosts it as MCP and meters every call.
5. **Use**: agents and operators call it, starting inside one industry (the clinical aesthetics equipment pilot).
6. **Return**: royalties go to the Legacy Leaver and the Pathfinder, which brings in new contributors.

## What makes the loop hold

- **A Wisdom Unit spec.** A transcript is not something an agent can use. Each unit needs context, decision rules, when to do it and when not to, scripts, red flags, worked examples, a record of who it came from, a license, and a small test set.
- **Proof.** Run each unit with and without the wisdom and show the difference. Sell outcomes, not token savings.
- **One vertical first.** Agents do not have wallets; operators do. Bundle wisdom into a vertical (equipment buyers get the coaching agent) before opening a general marketplace.
- **Legal terms before contributor two.** Ownership, royalty split, the right to withdraw, attribution. Regulated domains (clinical, legal, financial) keep a qualified human in the loop. Do not claim HIPAA compliance outside US patient data.

## What changes on the public site

- Home: a "Three doors" section — **Learn the ABCs**, **Leave a Legacy**, **Hire Wisdom** — under the line "Hanzo builds the agents. MAIM gives them wisdom."
- New `/wisdom` page explaining the Wisdom Exchange, Legacy Leavers and Pathfinders, marked plainly as **in pilot, nothing for sale yet**. Interest goes to `contact@majoraimindset.com` (mailto only; no new data capture).
- "Wisdom" added to the shared site navigation; "Powered by Hanzo" added to the home footer.
- The existing funnel (Live Room, A·B·C, register form, 10 Pillars, Academy cohort) is unchanged.

## Direction for engineering and agents

- **Do not build a standalone MAIM LMS or academy platform.** MAIM Foundations is the entry-level on-ramp that leads into Hanzo University. Coordinate any Academy restructuring with the MAIMACADEMY repo and Hanzo before changing `academy.majoraimindset.com` redirects.
- **Do not build marketplace infrastructure in MAIM repos.** Registry, metering and billing belong to Hanzo. MAIM owns the contributor experience, the capture method, the Wisdom Unit spec and the brand.
- **Public repos: no named contributors, clients or pilot partners.** Describe pilots generically ("a clinical aesthetics partner").
- **No public promise of royalties, pricing or availability** until terms are approved.

## Next steps

1. Write the Wisdom Unit spec (v0.1).
2. Draft the contributor agreement with counsel.
3. Run three pilots: the clinical aesthetics practitioner capture, one business knowledge-asset capture from an AMA diagnostic, and one retired professional captured by one Pathfinder.
4. Propose a wisdom marketplace section to Hanzo, with MAIM as the first featured publisher.
5. Decide how MAIM Foundations is presented inside Hanzo University.
