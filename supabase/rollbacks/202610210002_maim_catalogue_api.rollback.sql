revoke all on function public.reconcile_maim_asset_catalog_manifest(uuid, jsonb) from public, anon, authenticated, service_role;
drop function if exists public.reconcile_maim_asset_catalog_manifest(uuid, jsonb);
revoke all on function public.get_maim_asset_catalogue(uuid) from public, anon, authenticated;
drop function if exists public.get_maim_asset_catalogue(uuid);
