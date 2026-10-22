# Email migration to Resend — 22 October 2026

Kit and Gumroad are retired. The seven-email "MAIM — Start Here" sequence from
`docs/kit/MAIM_Kit_Sequence_StartHere_v2.1_Final.md` is now in Resend as branded
templates. Copy is unchanged except where a retired provider was referenced.

## Templates created

| # | Day | Alias | Status |
|---|---|---|---|
| 1 | 0 | `maim-start-here-01-immediate` | draft |
| 2 | 1 | `maim-start-here-02-awareness` | draft |
| 3 | 3 | `maim-start-here-03-belief` | draft |
| 4 | 5 | `maim-start-here-04-context` | draft |
| 5 | 7 | `maim-start-here-05-direction` | draft |
| 6 | 10 | `maim-start-here-06-experiment` | draft |
| 7 | 14 | `maim-start-here-07-pillar-scroll-gated` | draft, **gated** |

Sender `Major Dream Williams <hello@majoraimindset.com>`, reply-to
`contact@majoraimindset.com`. Domain `majoraimindset.com` is verified with sending
enabled.

## Changes made during migration

- **Email 7 CTA** pointed at `majordream.gumroad.com`. Repointed to
  `majoraimindset.com/shop/pillar-scroll`. Gumroad is retired and must not be restored.
- **Email 1 download** now resolves to `majoraimindset.com/assets/MAIM_Free_Guide_5_AI_Moves.pdf`
  rather than a Kit-hosted attachment.
- **Merge syntax** converted from Kit Liquid `{{ subscriber.first_name | default: "friend" }}`
  to a `GREETING` variable with fallback `friend`. Resend templates reject the pipe
  operator, and `FIRST_NAME` is reserved and cannot carry a fallback.
- **Brand applied**: ground `#111111`, gold `#C9931A`, green `#1F8A4C`, blue `#2A78D6`,
  orange `#E07A2F`, Georgia body, medallion from `majoraimindset.com/assets/`. Each
  letter's Major Move block is bordered in its own pillar colour.
- Table-based layout, inline CSS, unsubscribe in every footer.

## Email 7 stays gated

Its own launch gate requires the $27 package to be confirmed first: the 10 Pillars
digital book, visual concept map, M.A.I.M. Oath Wallpaper Pack, AI Guide access for
Pillars 1–3 and the self-discovery quiz. Only a 28 KB Pillar Scroll PDF is verified, and
no payment link exists for it. Emails 1–6 can publish and run now; 7 waits.

## What is still missing

**Zero contacts.** The domain sends, the sequence exists, the audience does not. The site
has no signup form on any page — the Kit form was removed and nothing replaced it, so
free-guide traffic leaks entirely.

Next: publish 1–6, add a capture form posting to Resend, reconcile the $27 package, then
release 7.
