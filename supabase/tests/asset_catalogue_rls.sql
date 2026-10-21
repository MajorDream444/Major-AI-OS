-- Run against an isolated Supabase test database after applying the migration.
-- Rolls back all fixtures. It does not target hosted production.
begin;

insert into auth.users (id, instance_id, aud, role, email, encrypted_password)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'catalog-owner@example.invalid', ''),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'catalog-outsider@example.invalid', '');

insert into maim.workspaces (id, order_reference, status)
values ('10000000-0000-0000-0000-000000000001', 'test-asset-catalogue', 'active');
insert into maim.memberships (workspace_id, user_id, role)
values ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'operator');

select maim.reconcile_asset_catalog_manifest(
  '10000000-0000-0000-0000-000000000001',
  '[{"stable_id":"MAIM-CD-TEST-ONE","sha256":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","size_bytes":12,"format":".png","original_filename":"safe.png","project_code":"00","project":"MAIM 00 Brand System","project_relative_path":"safe.png","drive_file_id":"driveTestAsset001","drive_url":"https://drive.google.com/file/d/driveTestAsset001/view","upload_status":"uploaded","integrity_status":"sha256_verified","dependencies":[]}]'::jsonb
);

set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000101', true);
do $$ begin
  if (select count(*) from maim.asset_catalog_studio) <> 1 then
    raise exception 'workspace member should see one catalogue asset';
  end if;
end $$;

select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000202', true);
do $$ begin
  if (select count(*) from maim.asset_catalog_studio) <> 0 then
    raise exception 'cross-user catalogue access was not denied';
  end if;
end $$;

reset role;
rollback;
