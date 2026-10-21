import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SQL = (ROOT / "supabase/migrations/202610210001_maim_asset_catalogue.sql").read_text()
ROLLBACK = (ROOT / "supabase/migrations/202610210001_maim_asset_catalogue.rollback.sql").read_text()
RLS_TEST = (ROOT / "supabase/tests/asset_catalogue_rls.sql").read_text()
API_SQL = (ROOT / "supabase/migrations/202610210002_maim_catalogue_api.sql").read_text()
API_ROLLBACK = (ROOT / "supabase/migrations/202610210002_maim_catalogue_api.rollback.sql").read_text()
SUPABASE_CONFIG = (ROOT / "supabase/config.toml").read_text()


class AssetCatalogueMigrationContractTests(unittest.TestCase):
    def test_existing_vault_table_is_not_altered_or_dropped(self):
        lowered = SQL.lower()
        self.assertNotIn("alter table maim.vault_assets", lowered)
        self.assertNotIn("drop table maim.vault_assets", lowered)
        self.assertNotIn("drop table if exists maim.vault_assets", ROLLBACK.lower())

    def test_every_catalogue_table_enables_rls(self):
        tables = [
            "assets", "byte_versions", "source_locations", "projects",
            "project_memberships", "dependencies",
        ]
        for suffix in tables:
            self.assertIn(
                f"alter table maim.asset_catalog_{suffix} enable row level security;",
                SQL.lower(),
            )

    def test_browser_is_read_only_and_rpc_is_server_only(self):
        self.assertIn("a.workspace_id", SQL.lower())
        self.assertIn("grant select on maim.asset_catalog_studio to authenticated", SQL.lower())
        self.assertIn(
            "revoke all on function maim.reconcile_asset_catalog_manifest(uuid, jsonb) from public, anon, authenticated",
            SQL.lower(),
        )
        self.assertIn(
            "grant execute on function maim.reconcile_asset_catalog_manifest(uuid, jsonb) to service_role",
            SQL.lower(),
        )

    def test_cross_user_denial_fixture_exists(self):
        self.assertIn("User A records leaked to User B", RLS_TEST)
        self.assertIn("request.jwt.claim.sub", RLS_TEST)

    def test_narrow_api_is_authenticated_security_invoker_and_reversible(self):
        lowered = API_SQL.lower()
        self.assertIn("security invoker", lowered)
        self.assertIn("revoke all on function public.get_maim_asset_catalogue(uuid) from public, anon", lowered)
        self.assertIn("grant execute on function public.get_maim_asset_catalogue(uuid) to authenticated", lowered)
        self.assertIn("m.workspace_id = p_workspace_id", lowered)
        self.assertIn("security invoker", lowered)
        self.assertIn("revoke all on function public.reconcile_maim_asset_catalog_manifest(uuid, jsonb) from public, anon, authenticated", lowered)
        self.assertIn("grant execute on function public.reconcile_maim_asset_catalog_manifest(uuid, jsonb) to service_role", lowered)
        self.assertIn("maim.reconcile_asset_catalog_manifest(p_workspace_id, p_manifest)", lowered)
        self.assertIn("drop function if exists public.get_maim_asset_catalogue(uuid)", API_ROLLBACK.lower())
        self.assertIn("drop function if exists public.reconcile_maim_asset_catalog_manifest(uuid, jsonb)", API_ROLLBACK.lower())
        self.assertIn('schemas = ["public", "graphql_public"]', SUPABASE_CONFIG)
        self.assertNotIn('schemas = ["public", "graphql_public", "maim"]', SUPABASE_CONFIG)


if __name__ == "__main__":
    unittest.main()
