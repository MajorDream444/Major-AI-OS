\set ON_ERROR_STOP on
do $$ begin
 if to_regclass('maim.vault_assets') is null or to_regclass('maim.memberships') is null or to_regclass('maim.workspaces') is null then raise exception 'rollback removed foundation table'; end if;
 if (select count(*) from maim.vault_assets where id='20000000-0000-0000-0000-000000000001') <> 1 then raise exception 'rollback removed vault data'; end if;
 if not exists (select 1 from pg_policies where schemaname='maim' and tablename='memberships' and policyname='own_membership') or not exists (select 1 from pg_policies where schemaname='maim' and tablename='workspaces' and policyname='member_workspace') then raise exception 'rollback removed foundation policy'; end if;
 if to_regclass('maim.asset_catalog_assets') is not null or to_regclass('maim.asset_catalog_byte_versions') is not null or to_regclass('maim.asset_catalog_source_locations') is not null or to_regclass('maim.asset_catalog_projects') is not null or to_regclass('maim.asset_catalog_project_memberships') is not null or to_regclass('maim.asset_catalog_dependencies') is not null then raise exception 'rollback left catalogue tables'; end if;
 if to_regclass('maim.asset_catalog_studio') is not null then raise exception 'rollback left Studio view'; end if;
 if to_regprocedure('public.get_maim_asset_catalogue(uuid)') is not null then raise exception 'rollback left catalogue API function'; end if;
 if to_regprocedure('public.reconcile_maim_asset_catalog_manifest(uuid,jsonb)') is not null then raise exception 'rollback left importer bridge'; end if;
end $$;
select 'asset catalogue rollback validation passed' as result;
