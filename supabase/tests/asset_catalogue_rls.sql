\set ON_ERROR_STOP on
-- Requires asset_catalogue_imports.sql fixtures in a disposable database.
do $$ begin
 if has_table_privilege('anon','maim.asset_catalog_assets','select') or has_table_privilege('anon','maim.asset_catalog_studio','select') then raise exception 'anonymous catalogue access was granted'; end if;
 if has_table_privilege('authenticated','maim.asset_catalog_assets','insert,update,delete') then raise exception 'browser role has write privileges'; end if;
 if has_function_privilege('authenticated','maim.reconcile_asset_catalog_manifest(uuid,jsonb)','execute') or has_function_privilege('anon','maim.reconcile_asset_catalog_manifest(uuid,jsonb)','execute') then raise exception 'browser role can invoke importer RPC'; end if;
 if has_function_privilege('anon','public.get_maim_asset_catalogue(uuid)','execute') then raise exception 'anonymous role can invoke catalogue API'; end if;
 if not has_function_privilege('service_role','maim.reconcile_asset_catalog_manifest(uuid,jsonb)','execute') then raise exception 'service role lacks importer RPC'; end if;
 if not exists (select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='maim' and p.proname='reconcile_asset_catalog_manifest' and p.prosecdef and p.proconfig @> array['search_path=pg_catalog, maim']::text[]) then raise exception 'SECURITY DEFINER search_path is unsafe'; end if;
end $$;
set role anon;
do $$ begin
 begin
  perform count(*) from maim.asset_catalog_studio;
  raise exception 'anonymous select unexpectedly succeeded';
 exception when insufficient_privilege then null; end;
 begin
  perform maim.reconcile_asset_catalog_manifest('10000000-0000-0000-0000-000000000001','[]'::jsonb);
  raise exception 'anonymous RPC invocation unexpectedly succeeded';
 exception when insufficient_privilege then null; end;
 begin
  perform * from public.get_maim_asset_catalogue('10000000-0000-0000-0000-000000000001');
  raise exception 'anonymous catalogue API unexpectedly succeeded';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000101',false);
do $$ begin
 if (select count(*) from maim.asset_catalog_assets) <> 1 or (select count(*) from maim.asset_catalog_source_locations) <> 1 or (select count(*) from maim.asset_catalog_byte_versions) <> 1 or (select count(*) from maim.asset_catalog_projects) <> 1 or (select count(*) from maim.asset_catalog_project_memberships) <> 1 or (select count(*) from maim.asset_catalog_dependencies) <> 1 or (select count(*) from maim.asset_catalog_studio) <> 1 then raise exception 'authorized member cannot read own related records'; end if;
 if (select count(*) from public.get_maim_asset_catalogue('10000000-0000-0000-0000-000000000001')) <> 1 then raise exception 'authorized member cannot use narrow catalogue endpoint'; end if;
 begin
  insert into maim.asset_catalog_assets (workspace_id,stable_id,title,format) values ('10000000-0000-0000-0000-000000000001','BROWSER-WRITE','denied','.txt');
  raise exception 'browser write unexpectedly succeeded';
 exception when insufficient_privilege then null; end;
 begin
  perform maim.reconcile_asset_catalog_manifest('10000000-0000-0000-0000-000000000001','[]'::jsonb);
  raise exception 'authenticated RPC invocation unexpectedly succeeded';
 exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000202',false);
do $$ begin
 if (select count(*) from maim.asset_catalog_assets) <> 0 or (select count(*) from maim.asset_catalog_source_locations) <> 0 or (select count(*) from maim.asset_catalog_byte_versions) <> 0 or (select count(*) from maim.asset_catalog_projects) <> 0 or (select count(*) from maim.asset_catalog_project_memberships) <> 0 or (select count(*) from maim.asset_catalog_dependencies) <> 0 or (select count(*) from maim.asset_catalog_studio) <> 0 then raise exception 'User A records leaked to User B'; end if;
 begin perform * from public.get_maim_asset_catalogue('10000000-0000-0000-0000-000000000001'); raise exception 'cross-workspace endpoint access was allowed'; exception when insufficient_privilege then null; end;
end $$;
reset role;
delete from maim.memberships where workspace_id='10000000-0000-0000-0000-000000000001' and user_id='00000000-0000-0000-0000-000000000101';
set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000101',false);
do $$ begin
 if (select count(*) from maim.asset_catalog_studio) <> 0 then raise exception 'revoked membership retained access'; end if;
 begin perform * from public.get_maim_asset_catalogue('10000000-0000-0000-0000-000000000001'); raise exception 'revoked membership retained endpoint access'; exception when insufficient_privilege then null; end;
end $$;
reset role;
select 'asset catalogue RLS validation passed' as result;
