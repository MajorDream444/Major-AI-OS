# MAIM Email and Agent Identity

Status: proposed — needs Major to pick a provider and run the DNS steps
Domain: `majoraimindset.com`

This document covers the mailboxes MAIM needs, who or what owns each one,
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

## Recommended provider

**Google Workspace, one paid seat, plus free aliases.**

| Option | Cost | Why / why not |
| --- | --- | --- |
| **Google Workspace** (recommended) | ~$7/mo for one seat | Major already uses Google Drive as the binary media vault. One seat buys the real `major@` inbox; every other address below is a free alias or group on that seat, so agent addresses cost nothing. |
| Cloudflare Email Routing | Free | Unlimited addresses, but forward-only — it cannot send. Fine as a supplement, not a primary. |
| Zoho Mail | Free tier, 5 users | Cheapest real mailboxes. Weaker integration with the Google tooling already in use. |
| Migadu | ~$19/yr flat | Unlimited mailboxes. Best choice *only* if agents need to send independently. |
| Per-seat plans generally | $6–7/user/mo | Avoid. Paying per agent address does not scale and buys nothing an alias does not. |

The trap to avoid is buying a seat per agent. Aliases and groups are free
and do the same job.

## Address map

### Human

| Address | Type | Purpose |
| --- | --- | --- |
| `major@majoraimindset.com` | **Real mailbox** | Major's identity. The Kit sender address. The only address that sends as a person. |

### Public-facing roles

Aliases on `major@` to begin with. Split into their own mailboxes only
when volume justifies it.

| Address | Purpose |
| --- | --- |
| `hello@` | Front door. Goes on the site, Instagram bio, and business cards. |
| `support@` | Member help once the Studio has members. |
| `billing@` | Gumroad and payment questions. |
| `press@` | Media and speaking requests. |

### System

Separate from the human inbox so automated noise never buries a real
message from a real person.

| Address | Purpose |
| --- | --- |
| `notifications@` | Vercel, GitHub, n8n, Supabase alerts. |
| `registrations@` | Kit registration confirmations and the seat-reservation trail. |
| `receipts@` | Gumroad purchase records. Feeds the commerce ledger. |

### Agents

One address per agent role, matching the Tool Roles in `CLAUDE.md`. These
exist so each agent can hold its own third-party accounts and so the audit
trail shows which agent did what.

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

## DNS records

All of these go at whoever hosts DNS for `majoraimindset.com`. The A and
CNAME records for the website itself already point at Vercel and should
not be touched by this work.

### Receiving mail — Google Workspace

```txt
Type   Name   Value              Priority
MX     @      smtp.google.com    1
```

That single record replaces the older five-record Google set. Delete any
previous `aspmx.l.google.com` entries so they do not compete.

### SPF — who may send as this domain

One TXT record only. Multiple SPF records is a misconfiguration that
causes silent failures.

```txt
Type   Name   Value
TXT    @      v=spf1 include:_spf.google.com ~all
```

If Kit sends from the domain, its include must be added to this same
record — never a second one. Get the exact include string from the Kit
dashboard rather than guessing it.

### DKIM — signing

Generate in Google Admin (`Apps → Google Workspace → Gmail → Authenticate
email`), select 2048-bit, then publish the value it gives you:

```txt
Type   Name                Value
TXT    google._domainkey   (paste from Google Admin)
```

Turn on signing in the Admin console *after* the record resolves.

### DMARC — policy

Start permissive, watch the reports, then tighten. Going straight to
`p=reject` before DKIM and SPF are confirmed will silently drop real mail.

```txt
Type   Name      Value
TXT    _dmarc    v=DMARC1; p=none; rua=mailto:major@majoraimindset.com; pct=100
```

Move to `p=quarantine` once the aggregate reports come back clean for a
couple of weeks, and only then consider `p=reject`.

### Kit sending domain

Kit issues its own CNAME records for authenticating `majoraimindset.com`
as a sending domain. Take those from the Kit dashboard directly. Do not
copy them from documentation — they are account-specific.

## Order of operations

1. Buy one Google Workspace seat, `major@majoraimindset.com`.
2. Publish the MX record. Confirm mail arrives before going further.
3. Publish SPF, then DKIM, then DMARC at `p=none`.
4. Create the role, system, and agent addresses as aliases and groups.
5. Authenticate the domain in Kit using Kit's own CNAME values.
6. Switch the Kit sender from the current address to
   `major@majoraimindset.com`.
7. Send a test to a Gmail address and a non-Gmail address. Check the raw
   headers show `SPF=pass`, `DKIM=pass`, `DMARC=pass`.
8. Leave DMARC at `p=none` for two weeks, read the reports, then tighten.

## Rules

- Never publish two SPF records. Merge includes into one.
- Never let an agent send as `@majoraimindset.com` without authentication.
  A burned domain reputation takes months to repair and takes Kit's member
  delivery down with it.
- Never commit mailbox passwords, app passwords, API keys, or dashboard
  screenshots to this repository.
- Role addresses stay aliases until real volume justifies a mailbox.
