# MAIM catalogue plugin preflight — 2026-10-21

**Authority:** owner decision `abc9977679c0a581690d11c88301391feb1abbd8`.
**Scope:** read-only hosted inspection and local validation only. No hosted DDL,
ledger repair, private import, schema-exposure change, or Studio release.

## Exact hosted target

The **MAIM ECOSYSTEM** Supabase plugin connection returned one project:

- name: `MAIM Ecosystem`
- project: `njpdlomvyalxrkluaige`
- region: `us-east-1`
- status: `ACTIVE_HEALTHY`

No generic Supabase, AMA, Major Dream, legacy, or Vercel-managed connection was
used for this preflight.

## Authoritative hosted ledger

The plugin returned exactly three applied records:

1. `20261014043844` — `maim_workspace_foundation`
2. `20261014043909` — `maim_payments_foundation`
3. `20261020030402` — `maim_canonical_application_registry`

Their statement byte counts and MD5 values continue to match the recovered
local history recorded in `maim-migration-reconciliation-2026-10-21.md`.
Neither reviewed catalogue migration appears in the hosted ledger.

## Reviewed forward SQL

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `202610210001_maim_asset_catalogue.sql` | 16022 | `99c0fb9ad1b04d63cc3901f93191617d5ff9c8df91d8b014c64f6a0ea65b2055` |
| `202610210002_maim_catalogue_api.sql` | 2374 | `920edf3fbcb90324172c831d1784f5b16506dfc043e7959e40296f003f311499` |

These are the only pending catalogue changes. A future approved plugin apply
must submit their reviewed SQL contents separately and in this order.

## Hosted dependency and collision check

Read-only plugin queries confirmed:

- required `maim.workspaces`, `maim.memberships`, and `maim.vault_assets`
  tables exist;
- `maim.workspaces` and `maim.memberships` have RLS enabled;
- the `own_membership` policy exists;
- `anon`, `authenticated`, and `service_role` roles exist;
- `gen_random_uuid()` exists;
- authenticated already has `maim` schema usage and SELECT on workspaces and
  memberships, but no SELECT on `vault_assets`;
- all six proposed catalogue tables, the Studio view, the private reconcile
  function, and both public bridge functions are absent.

No hosted name collision or missing foundation dependency was found.

## Exact proposed delta

Migration 001 creates six private `maim` tables, five indexes, six
authenticated SELECT policies, one security-invoker Studio view, and one
fixed-search-path security-definer reconciliation function. It grants
authenticated SELECT only on the catalogue tables/view, and grants the private
reconcile function only to `service_role`. It does not alter
`maim.vault_assets` or existing product permissions.

Migration 002 creates two narrow `public` bridge functions. The read bridge is
security-invoker, checks selected-workspace membership, and is executable only
by `authenticated`. The import bridge is executable only by `service_role` and
delegates to the private reconcile function. Neither migration changes the
Data API schema allow-list.

## Grants and rollback readiness

The forward SQL explicitly revokes catalogue table/view/function access before
granting its allow-listed roles. The rollback sequence removes the public
bridges first and the private catalogue objects second. It explicitly leaves
workspaces, memberships, vault assets, Auth, and existing product policies
untouched.

| Rollback file | Bytes | SHA-256 |
| --- | ---: | --- |
| `202610210001_maim_asset_catalogue.rollback.sql` | 1367 | `e56f3420f43319e21b501881899717e44c6b94e58b458016a1731e29b1e5f541` |
| `202610210002_maim_catalogue_api.rollback.sql` | 370 | `8e32739ca4304efd88513e626c8ce8badbf94eb4ac41f4789d53a65438c256f5` |

Rollback remains a separate human-approved plugin operation after consumer and
dependency review; it is not part of the forward migration set.

## Current gate

Read-only plugin preflight: **PASS**. Concrete blockers found: **none** for the
two reviewed migration SQL files. Hosted application remains **HOLD** pending
explicit migration-only approval. Private catalogue import, hosted synthetic
validation, protected Studio preview, and release remain separate gates.
