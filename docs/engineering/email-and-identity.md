# MAIM Email and Agent Identity

Status: proposed — needs Major to run the Google Admin and DNS steps
Domain: `majoraimindset.com`
Existing mail: `hanzo.ai`, already on Google Workspace

This document covers the addresses MAIM needs, who or what owns each one,
and the DNS work required so mail actually arrives.

## Principle

One human identity. Many role addresses. Agents receive; one authenticated
service sends.

Deliverability is a shared reputation. Every address on this domain draws
from the same well, and Kit's ability to reach member inboxes depends on
that well staying clean. So the rule is narrow on purpose: agents get
addresses to *receive* at and to sign up for services with. They do not
get to send mail as `@majoraimindset.com` unless that path is
authenticated and deliberately reviewed.

## Recommended approach — domain alias, $0

`hanzo.ai` already runs on Google Workspace. Google lets you attach
additional domains to an existing Workspace at no cost, and a **domain
alias** mirrors every existing user onto the new domain.

The result:

- `major@majoraimindset.com` delivers into the existing `major@hanzo.ai`
  inbox. No second inbox to check.
- Gmail can *send as* `major@majoraimindset.com` natively, with SPF and
  DKIM passing, because Google is the sending server either way.
- Every alias on the user is mirrored too, so the role and agent
  addresses below cost nothing extra.
- **No new seat. No new subscription.**

Do not buy a second Workspace seat for this. A seat buys a separate
person; masking an existing identity onto a new domain is what a domain
alias is for.

### Domain alias vs secondary domain

Google offers both when you add a domain. Pick correctly:

| | Domain alias | Secondary domain |
| --- | --- | --- |
| Mirrors existing users | Yes | No |
| Can create separate users | No | Yes |
| Cost | Free | Free to add, but each user is a paid seat |

**Choose domain alias.** Secondary domain is for when MAIM has staff with
their own mailboxes, which is not now.

### Free alternative, if you would rather not touch Workspace

**Cloudflare Email Routing** — the domain is already on Cloudflare, so
this is a few clicks and no DNS work by hand. It gives unlimited
addresses at `majoraimindset.com` that forward to any inbox you already
have.

The catch: it is **receive-only**. It cannot send. That is fine for agent
and system addresses, which only ever receive. It is not enough for
`major@`, which needs to send as itself.

A reasonable split is domain alias for `major@`, Email Routing for
everything else. But once the domain alias exists, Workspace aliases
cover it all, and one system is simpler than two.

## Kit does not need a mailbox

Worth stating plainly, because it is the thing that makes this cheap:
Kit sends from its own infrastructure. It authenticates
`majoraimindset.com` with CNAME records and sends on your behalf. It does
not need a mailbox at the domain to send as `major@majoraimindset.com`.

The only reason you need to *receive* at that address is so replies from
members reach you. A domain alias or a free forward both solve that.

## Address map

### Human

| Address | Type | Purpose |
| --- | --- | --- |
| `major@majoraimindset.com` | **Domain alias** of `major@hanzo.ai` | Major's identity. The Kit sender address. The only address that sends as a person. |

### Public-facing roles

Aliases on the existing user. Split into their own mailboxes only if
volume ever justifies it, which would mean MAIM has staff.

| Address | Purpose |
| --- | --- |
| `hello@` | Front door. Goes on the site, Instagram bio, and business cards. |
| `support@` | Member help once the Studio has members. |
| `billing@` | Gumroad and payment questions. |
| `press@` | Media and speaking requests. |

### System

Separate from the human inbox so automated noise never buries a real
message from a real person. Route these to a filtered label, not the
main inbox.

| Address | Purpose |
| --- | --- |
| `notifications@` | Vercel, GitHub, n8n, Supabase alerts. |
| `registrations@` | Kit registration confirmations and the seat-reservation trail. |
| `receipts@` | Gumroad purchase records. Feeds the commerce ledger. |

### Agents

One address per agent role, matching the Tool Roles in `CLAUDE.md`. These
exist so each agent can hold its own third-party accounts and so the
audit trail shows which agent did what.

| Address | Agent | Role |
| --- | --- | --- |
| `agent-cowork@` | Cowork | Operator workflow, daily Instagram brief |
| `agent-codex@` | Codex | Implementation engineer |
| `agent-claude@` | Claude Code | Review and refactor architecture |
| `agent-design@` | Claude Design | Visual factory |
| `agent-research@` | NotebookLM | Research, podcast, study guides |
| `agent-automation@` | n8n | Automation layer |

Convention: `agent-<tool>@`. The prefix is explicit on purpose — anyone
reading a log or a signup list can tell in one glance that no human is
behind the address.

Google allows up to 30 aliases per user. The list above is well inside
that. If it ever grows past 30, move the agent addresses to Cloudflare
Email Routing, which has no practical limit.

## Current DNS state

Verified 2026-08-17. The zone is clean — there is no existing mail
configuration to preserve or break.

```txt
NS     majoraimindset.com   doug.ns.cloudflare.com / jillian.ns.cloudflare.com
A      majoraimindset.com   76.76.21.21              (Vercel, DNS-only / grey cloud)
CNAME  www                  cname.vercel-dns-0.com
MX     —  none      TXT/SPF —  none
DMARC  —  none      DKIM    —  none
```

Two standing rules for this zone:

- The website records must stay **DNS-only (grey cloud)**. Proxying them
  through Cloudflare breaks Vercel's certificate issuance.
- With no SPF or DMARC published, the domain is currently spoofable by
  anyone. Publishing those two records is worth doing immediately,
  independent of the mailbox decision.

## DNS records to publish

### Google verification

Adding the domain in Google Admin produces a one-time TXT value. Publish
it, verify in Admin, then it can stay or be removed.

```txt
Type   Name   Value
TXT    @      google-site-verification=(from Google Admin)
```

### Receiving mail

```txt
Type   Name   Value              Priority
MX     @      smtp.google.com    1
```

That single record replaces the older five-record `aspmx.l.google.com`
set. Do not publish both.

Publish this only *after* the domain alias exists in Workspace. Pointing
MX at Google before the alias is live means mail to the domain bounces.

### SPF — who may send as this domain

One TXT record only. Two SPF records is a misconfiguration that causes
silent, hard-to-diagnose failures.

```txt
Type   Name   Value
TXT    @      v=spf1 include:_spf.google.com ~all
```

This matches what `hanzo.ai` already publishes. If Kit needs its own
include, it goes into this same record — never a second one.

### DKIM — signing

Generate in Google Admin (`Apps → Google Workspace → Gmail → Authenticate
email`), selecting `majoraimindset.com` from the domain dropdown — a
domain alias gets its **own** key, separate from the `hanzo.ai` one.
Choose 2048-bit, then publish:

```txt
Type   Name                Value
TXT    google._domainkey   (paste from Google Admin)
```

Turn on signing in Admin only after the record resolves.

### DMARC — policy

Start permissive, watch the reports, then tighten. Going straight to
`p=reject` before SPF and DKIM are confirmed will silently drop real mail.

```txt
Type   Name      Value
TXT    _dmarc    v=DMARC1; p=none; rua=mailto:major@majoraimindset.com; pct=100
```

Move to `p=quarantine` once aggregate reports come back clean for a
couple of weeks, and only then consider `p=reject`.

### Kit sending domain

Kit issues its own CNAME records for authenticating `majoraimindset.com`
as a sending domain. Take those from the Kit dashboard directly. They are
account-specific — do not copy them from documentation.

## Order of operations

1. **Now, no dependencies:** publish SPF and DMARC (`p=none`). Closes the
   spoofing hole immediately and starts collecting reports.
2. Google Admin → `Account → Domains → Manage domains → Add a domain` →
   choose **Domain alias of hanzo.ai**.
3. Publish the Google verification TXT. Verify in Admin.
4. Publish the MX record.
5. Send a test to `major@majoraimindset.com`. Confirm it lands in the
   `hanzo.ai` inbox.
6. Generate DKIM for `majoraimindset.com`, publish it, enable signing.
7. Add the role, system, and agent addresses as aliases and groups.
8. Authenticate the domain in Kit with Kit's own CNAME values, then
   switch the Kit sender to `major@majoraimindset.com`.
9. In Gmail, add `major@majoraimindset.com` under
   `Settings → Accounts → Send mail as`, and set it as default for MAIM
   correspondence.
10. Send a test to a Gmail address and a non-Gmail address. Check raw
    headers show `SPF=pass`, `DKIM=pass`, `DMARC=pass`.
11. Leave DMARC at `p=none` for two weeks, read the reports, then tighten.

## Rules

- Never publish two SPF records. Merge includes into one.
- Never let an agent send as `@majoraimindset.com` without
  authentication. A burned domain reputation takes months to repair and
  takes Kit's member delivery down with it.
- Never commit mailbox passwords, app passwords, API keys, or dashboard
  screenshots to this repository.
- Never buy a seat for an address that only needs to receive.
- Keep the website's A and CNAME records DNS-only.
