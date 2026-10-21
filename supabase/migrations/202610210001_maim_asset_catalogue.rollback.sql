-- Run only after confirming no later migration or consumer depends on these objects.
revoke all on function maim.reconcile_asset_catalog_manifest(uuid, jsonb) from public, anon, authenticated, service_role;
drop function if exists maim.reconcile_asset_catalog_manifest(uuid, jsonb);
drop view if exists maim.asset_catalog_studio;
drop table if exists maim.asset_catalog_dependencies;
drop table if exists maim.asset_catalog_project_memberships;
drop table if exists maim.asset_catalog_projects;
drop table if exists maim.asset_catalog_source_locations;
drop table if exists maim.asset_catalog_byte_versions;
drop table if exists maim.asset_catalog_assets;

-- Intentionally does not alter maim.vault_assets, maim.memberships,
-- maim.workspaces, auth.users, or any other existing product table/policy.
