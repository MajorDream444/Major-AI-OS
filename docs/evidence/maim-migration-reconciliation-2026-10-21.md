# MAIM migration reconciliation — 2026-10-21

**Scope:** read-only hosted inspection plus disposable local validation. No hosted migration, ledger repair, schema-exposure change, or private-data import was performed.

## Plugin-backed hosted verification

Connection: **MAIM ECOSYSTEM**; project `njpdlomvyalxrkluaige`.

The Supabase plugin returned exactly these hosted ledger records:

| Version | Name | Authoritative statement bytes | Authoritative MD5 |
| --- | --- | ---: | --- |
| `20261014043844` | `maim_workspace_foundation` | 2665 | `b445e831e37a408fd50770163f425d70` |
| `20261014043909` | `maim_payments_foundation` | 3040 | `13e6e044fa6fcad5dba64ebabd5b0794` |
| `20261020030402` | `maim_canonical_application_registry` | 2228 | `31db836eae4f4ea49530605f38fbf8b9` |

Each local historical file was reconstructed solely from the corresponding hosted `statements` array. Local byte counts and MD5 values match the plugin query. SHA-256 values are:

- `20261014043844_maim_workspace_foundation.sql`: `d42fe57c2e5f9a9947caaf8cd11c5a9b74fb3e43065a7d0698d5fca4cc2e565d`
- `20261014043909_maim_payments_foundation.sql`: `a810a8adec24972f0dae6836b1c9240cc0044ec586d91247a1c62f5136c1445c`
- `20261020030402_maim_canonical_application_registry.sql`: `c93ce1aa43c672833d6a4f227dac4197659cb29ccfd6ce76240a5d1e0d8da819`

A separate read-only catalogue query found all ten tables named by those records and RLS enabled on every table. This is structural comparison evidence; it is not a migration apply or a claim that every semantic database property was exhaustively diffed.

## Stream separation

- Canonical forward migrations: `supabase/migrations/`
- Operator rollback SQL: `supabase/rollbacks/`
- Legacy `fsrskmlsxqtxduhdfhnd` registrations history: `supabase/legacy/registrations/`
- Ownership and discovery rules: `supabase/MIGRATION_STREAMS.md`

The two rollback files retain their prior SHA-256 values:

- catalogue rollback: `e56f3420f43319e21b501881899717e44c6b94e58b458016a1731e29b1e5f541`
- API rollback: `8e32739ca4304efd88513e626c8ce8badbf94eb4ac41f4789d53a65438c256f5`

The legacy migration remains byte-identical at SHA-256 `1d3987b853204e8e34daf6ac362afdcb7ab710a23e70fbb142d01ce7f2c7014b` and retains its original project reference and Git history.

## Disposable validation

- Python migration/importer contracts: **PASS** (12 tests)
- Disposable PostgreSQL migration, import, RLS and rollback: **PASS**
- Disposable Supabase Auth, HTTP handler, PostgREST, database and Studio session flow: **PASS**

The PostgreSQL harness now waits across the image's bootstrap restart before beginning validation.

## Historical CLI observation — superseded

The earlier linked CLI dry-run was **NOT RUN**. This is retained only as
historical evidence. Owner decision `abc9977679c0a581690d11c88301391feb1abbd8`
supersedes CLI login, linking, push, and dry-run requirements for hosted
Supabase operations. It does not require enabling local migration discovery.

The active plugin-backed preflight expects exactly these proposed changes:

1. `202610210001_maim_asset_catalogue.sql`
2. `202610210002_maim_catalogue_api.sql`

No rollback, legacy, or unexpected migration may be included. Application via
the MAIM ECOSYSTEM plugin remains separately approval-gated.
