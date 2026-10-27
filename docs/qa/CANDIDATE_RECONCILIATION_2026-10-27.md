# Candidate reconciliation and suite evidence — 27 October 2026

## Recovery and source selection

The earlier unpushed objects dd15b00 (site), 51df197 (Academy) and ecdff78
(BPT) are not present in the current workspace or inspected clones. They cannot
be independently recovered here and are **not** the candidates to approve.
Reconstructed changes receive new SHAs; no claim of byte-identical recovery or
preserved commit identity is made. The earlier reported 98 tests are historical,
not independent verification of these recovered/reconciled candidates.

- Site: reconstructed relevant signup, ledger, BPT routing and 45-minute session
  fixes from current main 79137ee29c8e93ebbc2ec002d3b03262ef70ee70. Existing
  PR #69 readiness copy and retired-browser integration removal are preserved.
- Academy: continue the existing PR #28 branch, not a competing capacity branch.
  Its latest fetched head was 01ced0fe303496b37c5de07ef1463b7daa12c435, based on
  d3ab0d620e27e278e11498cd91e35f5ba11e5884. Preserve its atomic capacity test,
  HTTP 409 classifier, table-role correction and separately bounded acceptance
  packet. Restore only the public guide link and qualified continuation dates.
- BPT: continue PR #5 at 998f44177e5ae5d26f9856223bca264c497cd7cd, rather than
  replacing it with the narrower former main-based UI. Preserve continuity,
  delivery, Google booking, nurture and table-role guards, with all of those
  larger acceptance paths outside this run. Add the independent email flag,
  status-persistence feedback, duplicate-read/consent preservation, and a
  dotenv-free loopback capture adapter. No wholesale replacement of PR #5.

## Selected executable pins

| Component | Immutable tested code commit |
|---|---|
| Site | fc5c94f4479a7523c277615de4ad26c8413db7b5 |
| Academy #29 follow-up | 5095ba145a6453461c09b2a3ffb12e43e46ff6bb |
| BPT #5 | 239af00245916dbaac086b8f5f529067ead2ea4f |

Later PR heads may add this documentation and packet only. The test environment
must check out these executable pins; changes to runtime/config/test paths
invalidate them and require new tests/approval. Final review-head SHAs are also
recorded in each draft PR body. No merges or force-pushes.

## Commands and changed counts

| Working directory | Exact aggregate command | Expansion | Fresh result |
|---|---|---|---|
| Major-AI-OS/apps/maim-site | npm run check | npm run typecheck (`tsc --noEmit`); npm test (`node --import tsx --test tests/*.test.ts`); npm run build (`python3 maim/build.py`) | 28 tests, typecheck and 16-page build PASS |
| MAIMACADEMY | npm run check | npm run build (`node scripts/build.mjs`); npm run lint (`html-validate 'dist/**/*.html' && node --check scripts/build.mjs`); npm test (`node --test tests/*.test.mjs tests/database/*.test.mjs`) | 50 tests, 10-page build and HTML lint PASS |
| business-pressure-test-scratch-off | npm run check | npm run lint (`tsc --noEmit`); npm test (`node --import tsx --test tests/*.test.ts`); npm run build (`tsc --noEmit && vite build`) | 33 tests, typecheck and Vite build PASS |

**111 passing tests, not 98.** Counts include Node's reported subtests and do not
represent 111 independent hosted user journeys.

- Site: the original main suite has 22 tests; four provider/suppression/parsing
  cases and two scoped-ledger cases produce the current 28. These are rerun here.
- Academy: 49 was the reported result at PR #28 commit 33f1f6b. The later
  01ced0f adds one site regression for bounded external checkout sessions,
  producing the freshly reproduced 50. The earlier unavailable local branch's
  48 used a different standalone capacity test; do not compare it as the same
  suite or sum the overlapping branch results.
- BPT: the unavailable local 22-test branch started from the older main app and
  selectively imported helpers. PR #5 has a broader 29-test suite including
  continuity, delivery, integrations, nurture and table-policy tests. Two added
  submit regressions (independent email flag; status-persistence evidence) make
  the reconciled 33 after two newer upstream regressions described below. Existing six submit tests now cover lookup/upsert sequencing.
  No claim that its 29 is a simple seven-test superset of the former 22.

All checks ran locally with mocked providers/disposable embedded PostgreSQL.
No real inbox, live provider save, hosted concurrency or Stripe round trip is
certified. Expected failure-path tests print sanitized provider error categories.

## Production boundary

Branch-specific `git.deploymentEnabled` blocks are included before pushing:
site codex/funnel-reconciled-2026-10-27, Academy
codex/academy-capacity-test-packet-2026-10-27, BPT maim/deployment-ready.
No main-branch deployment rule, provider env, credential, integration mapping,
price, schema or production flag is edited. No deploy workflow exists in the
inspected repository trees. No manual deployment or pipeline dispatch is run.

Production alias/deployment and non-decrypted production env metadata were
captured before push and will be compared after push. A stable metadata snapshot
plus no mutation calls is bounded evidence; it is not an audit of every provider
credential value or every unrelated integration. Secrets are never decrypted.

See the one narrowed [external packet](MAIM_FUNNEL_TEST_PACKET_2026-10-27.md).
Simulated email and controlled-inbox receipt are separate acceptance results.
Disposable resource IDs and adult inbox are unbound, so execution remains
blocked until those private mappings and the bounded run are separately approved.

## Concurrent updates preserved before push

The pre-push fetch found Academy 5f8f531 and BPT c8b19cc ahead of the initially
inspected PR heads. Both were merged without force-pushing. Academy's additional
assertions extend its existing bounded-session test, so its count stays 50. BPT
2891852/c8b19cc add table-role/dependency hardening and two new baseline tests;
its baseline increases from 29 to 31, then the two delivery regressions here
produce 33. Lock changes and all newer guards are preserved; npm ci and the
full suite/build pass again on the merged candidate. Only a BPT packet-text
conflict occurred: newer content was retained with an explicit pointer to the
separate narrowed packet. Executable pins above reflect these merged sources.

## Publishing provenance

Shell push authentication was unavailable. The connected GitHub Git-object API
created fast-forward commits from the current PR heads. The complete remote tree
SHAs equal the locally tested merged tree SHAs: Academy
`c2cfc33426bbe73a08636312f76ddc8e48d68b33` and BPT
`efe4bb25c51fab010bd2dae3aa5458af05dd8ddd`. Commit IDs differ because the
publication commits have new metadata; source trees are byte-identical. The
unpublished local merge heads were 2568dc33 and df60c61e respectively.

## Final concurrent-main boundary exception

During publication, independent merges advanced Academy main to
`d7f6a0f496097d936fdd0294e78116079c47283c` (PR #28, head 5f8f531), and BPT
main to `e6c8bc25e0e4d4f9c11c2f77adcf93a02ab6e62d` (PR #5, head 239af002).
This task did not initiate those merges or deployments. Production aliases now
point to those newer SHAs; therefore **production is not proven untouched**.
BPT merged main has exactly the same tree as the reconciled/tested candidate.
Academy follow-up is isolated draft #29 at
`5095ba145a6453461c09b2a3ffb12e43e46ff6bb`, based on the newer main; its
runtime/build/tests are unchanged from the tested candidate, with an added
branch-specific deployment guard. Original #28 and #5 are merged, not drafts.

Production environment metadata comparison passed unchanged: site 24, Academy
16, BPT 3 variables (IDs, keys, targets, types and update times; no secret
decryption). Site production alias remained at 79137ee29c8e93ebbc2ec002d3b03262ef70ee70.
No provider env changes, customer submissions, external QA, payment activation
or manual deployment were performed by this task. This metadata evidence does
not establish unchanged credentials or every external integration. The changed
production pins trigger the packet's stop condition: external QA remains BLOCKED.
Do not run against production or reinterpret these merges as QA approval.
