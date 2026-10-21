import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SQL = (ROOT / "supabase/migrations/202610210001_maim_asset_catalogue.sql").read_text()
ROLLBACK = (ROOT / "supabase/migrations/202610210001_maim_asset_catalogue.rollback.sql").read_text()
RLS_TEST = (ROOT / "supabase/tests/asset_catalogue_rls.sql").read_text()


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


if __name__ == "__main__":
    unittest.main()
