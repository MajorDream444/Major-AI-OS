-- Run only after confirming no later migration or consumer depends on these objects.
revoke all on function maim.reconcile_asset_catalog_manifest(uuid, jsonb) from public, anon, authenticated, service_role;
drop function if exists maim.reconcile_asset_catalog_manifest(uuid, jsonb);
drop view if exists maim.asset_catalog_studio;
drop policy if exists asset_catalog_versions_member_read on maim.asset_catalog_byte_versions;
drop policy if exists asset_catalog_sources_member_read on maim.asset_catalog_source_locations;
drop policy if exists asset_catalog_memberships_member_read on maim.asset_catalog_project_memberships;
drop policy if exists asset_catalog_dependencies_member_read on maim.asset_catalog_dependencies;
drop policy if exists asset_catalog_projects_member_read on maim.asset_catalog_projects;
drop policy if exists asset_catalog_assets_member_read on maim.asset_catalog_assets;
drop table if exists maim.asset_catalog_dependencies;
drop table if exists maim.asset_catalog_project_memberships;
drop table if exists maim.asset_catalog_projects;
drop table if exists maim.asset_catalog_source_locations;
drop table if exists maim.asset_catalog_byte_versions;
drop table if exists maim.asset_catalog_assets;

-- Intentionally does not alter maim.vault_assets, maim.memberships,
-- maim.workspaces, auth.users, or any other existing product table/policy.
