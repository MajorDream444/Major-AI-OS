#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONTAINER="${MAIM_CATALOGUE_DB_CONTAINER:-maim-catalogue-validation}"
IMAGE="${MAIM_CATALOGUE_DB_IMAGE:-postgres:15-alpine}"
cleanup() { docker rm -f "$CONTAINER" >/dev/null 2>&1 || true; }
trap cleanup EXIT
cleanup
docker run -d --name "$CONTAINER" -e POSTGRES_PASSWORD=disposable-local-only -e POSTGRES_DB=maim_validation "$IMAGE" >/dev/null
for _ in $(seq 1 60); do
  if docker exec "$CONTAINER" pg_isready -U postgres -d maim_validation >/dev/null 2>&1; then
    # The image briefly accepts connections during bootstrap before restarting.
    sleep 1
    docker exec "$CONTAINER" pg_isready -U postgres -d maim_validation >/dev/null 2>&1 && break
  fi
  sleep 1
done
docker exec "$CONTAINER" pg_isready -U postgres -d maim_validation >/dev/null
psql_file() { docker exec -i "$CONTAINER" psql -X -v ON_ERROR_STOP=1 -U postgres -d maim_validation < "$1"; }
psql_file "$ROOT/supabase/tests/fixtures/maim_identity_foundation.sql"
psql_file "$ROOT/supabase/migrations/202610210001_maim_asset_catalogue.sql"
psql_file "$ROOT/supabase/migrations/202610210002_maim_catalogue_api.sql"
psql_file "$ROOT/supabase/tests/asset_catalogue_imports.sql"
psql_file "$ROOT/supabase/tests/asset_catalogue_rls.sql"
psql_file "$ROOT/supabase/rollbacks/202610210002_maim_catalogue_api.rollback.sql"
psql_file "$ROOT/supabase/rollbacks/202610210001_maim_asset_catalogue.rollback.sql"
psql_file "$ROOT/supabase/tests/asset_catalogue_rollback_assertions.sql"
echo 'PASS: disposable PostgreSQL asset catalogue validation completed.'
