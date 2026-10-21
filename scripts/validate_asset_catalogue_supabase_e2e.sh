#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
SUPABASE=(npx --yes supabase@2.121.0)
EXTRAS="realtime,storage-api,imgproxy,studio,edge-runtime,logflare,vector,supavisor,mailpit,postgres-meta"

cleanup() { "${SUPABASE[@]}" stop --no-backup >/dev/null 2>&1 || true; }
trap cleanup EXIT
cleanup

# PostgREST requires every configured exposed schema to exist at startup.
# Prepare the DB/Auth foundation first, preserve it, then add Kong/PostgREST.
"${SUPABASE[@]}" start -x "$EXTRAS,postgrest,kong" --yes >/dev/null
docker exec -i supabase_db_maim-asset-e2e psql -X -v ON_ERROR_STOP=1 -U postgres -d postgres < supabase/tests/fixtures/maim_supabase_foundation.sql >/dev/null
docker exec -i supabase_db_maim-asset-e2e psql -X -v ON_ERROR_STOP=1 -U postgres -d postgres < supabase/migrations/202610210001_maim_asset_catalogue.sql >/dev/null
"${SUPABASE[@]}" stop >/dev/null
"${SUPABASE[@]}" start -x "$EXTRAS" --yes >/dev/null

STATUS_FILE="$(mktemp)"
chmod 600 "$STATUS_FILE"
"${SUPABASE[@]}" status -o json > "$STATUS_FILE"
eval "$(python3 - "$STATUS_FILE" <<'PY'
import json, shlex, sys
d=json.load(open(sys.argv[1]))
for key in ('API_URL','ANON_KEY','SERVICE_ROLE_KEY','JWT_SECRET'):
    print(f'export {key}={shlex.quote(d[key])}')
PY
)"
rm -f "$STATUS_FILE"

node tests/asset_catalogue_supabase_e2e.mjs
echo 'PASS: disposable Supabase Auth -> PostgREST -> DB -> Studio validation completed.'
