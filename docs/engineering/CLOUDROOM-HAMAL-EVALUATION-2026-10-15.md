# Cloudroom Core Evaluation for HAMAL — 2026-10-15

Upstream: https://github.com/davidondrej/cloudroom-core
Status: RESEARCHED / PILOT PROPOSED. Not installed or deployed.

## Verified capabilities
- Rust service running AI coding harnesses on owned Linux machines; Codex, Claude Code, Pi and other harnesses appear in API docs.
- Self-hosted without Cloudroom account; Apache 2.0 source license.
- Authenticated HTTP API for sessions, prompts, events, workspace metadata, child sessions and status.
- Locally persisted session history, asynchronous receipt tracking, prompt queueing, sleeping idle sessions, and native conversation resumption.
- Disconnecting client does not stop running turns; server shutdown or crash can interrupt turns. Dispatched unfinished work may become unknown and is not automatically resent.

## Economics
The software is open-source, not a promise of cost-free infrastructure or tokens. Budget for a VM, backups, storage, model/API/subscription use, telemetry and maintenance. Hosted product may have separate pricing.

## Security constraints
- Pre-release software, not a certified multi-tenant execution sandbox.
- Agents execute without approval prompts. Upstream recommends a separate VM for each trusted user; agents on a VM share account files.
- Never grant agent sudo, Docker socket, broad payment/customer write privileges, production credentials, or unrestricted GitHub tokens.
- Keep API bound to localhost behind Tailscale or verified HTTPS proxy and bearer authentication. Avoid public HTTP and Tailscale Funnel.
- Isolate client workspaces and secrets. Require human approval before deploying, spending, messaging customers, payments or deleting assets.

## Proposed HAMAL integration
Cloudroom is the remote EXECUTION layer, not the complete agency orchestrator. HAMAL supplies schedules, tasks, approvals, job ownership, tests, evidence and reporting. GitHub remains source-of-truth; Airtable may track jobs; MAIM consumes publishable approved knowledge.

## Pilot recommendation
1. Provision one disposable Ubuntu 24.04 VM dedicated to a single trusted non-production Codex agent.
2. Pin and review upstream release/install script; verify dependencies and security behavior before execution.
3. Connect only a low-risk sample repository with least-privilege credentials.
4. Run three acceptance cases: complete a bounded task while client disconnects; queue second task; restart service and verify receipt/history/resume behavior.
5. Record CPU/RAM, uptime, cloud and model costs, logs, error recovery, test pass rate and human review burden.
6. Require explicit approval before any production deployment or customer-specific agent workload.

## Decision gate
Promote from RESEARCHED to TESTED only after a repeatable environment, test logs, security checklist and spend limit have been demonstrated. No automatic 24/7 or free inference claim.