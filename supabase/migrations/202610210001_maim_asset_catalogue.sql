-- MAIM asset catalogue for the Drive-backed original-source archive.
-- Target: MAIM Ecosystem (njpdlomvyalxrkluaige), schema maim.
-- Drive remains authoritative for original bytes. This migration does not
-- modify maim.vault_assets or existing product permissions.

create table if not exists maim.asset_catalog_assets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references maim.workspaces(id) on delete restrict,
  stable_id text not null,
  title text not null,
  format text not null,
  approval_status text not null default 'unreviewed'
    check (approval_status in ('unreviewed', 'approved', 'rejected')),
  completeness_status text not null default 'unknown'
    check (completeness_status in ('unknown', 'complete', 'incomplete', 'blocked_dependencies')),
  integrity_status text not null default 'not_verified'
    check (integrity_status in ('not_verified', 'metadata_only', 'sha256_verified', 'failed')),
  completion_context text,
  zero_byte_exception boolean not null default false,
  vault_asset_id uuid references maim.vault_assets(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, stable_id)
);

create table if not exists maim.asset_catalog_byte_versions (
  id uuid primary key default gen_random_uuid(),
  sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  size_bytes bigint not null check (size_bytes >= 0),
  mime_type text,
  created_at timestamptz not null default now(),
  unique (sha256, size_bytes)
);

create table if not exists maim.asset_catalog_source_locations (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references maim.asset_catalog_assets(id) on delete cascade,
  byte_version_id uuid not null references maim.asset_catalog_byte_versions(id) on delete restrict,
  provider text not null check (provider in ('google_drive', 'github', 'other')),
  external_file_id text not null,
  source_url text not null check (source_url ~ '^https://(drive|docs)\.google\.com/'),
  original_filename text not null,
  project_relative_path text not null,
  upload_status text not null check (upload_status in ('uploaded', 'failed', 'skipped')),
  integrity_status text not null check (integrity_status in ('not_verified', 'metadata_only', 'sha256_verified', 'failed')),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, external_file_id)
);

create table if not exists maim.asset_catalog_projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references maim.workspaces(id) on delete restrict,
  project_code text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (workspace_id, project_code)
);

create table if not exists maim.asset_catalog_project_memberships (
  asset_id uuid not null references maim.asset_catalog_assets(id) on delete cascade,
  project_id uuid not null references maim.asset_catalog_projects(id) on delete cascade,
  relationship text not null default 'member'
    check (relationship in ('member', 'reference', 'alternate_version')),
  primary key (asset_id, project_id)
);

create table if not exists maim.asset_catalog_dependencies (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references maim.asset_catalog_assets(id) on delete cascade,
  dependency text not null,
  status text not null check (status in ('resolved', 'recoverable', 'unresolved', 'external', 'configuration')),
  evidence text,
  blocks_preview boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (asset_id, dependency)
);

create index if not exists asset_catalog_assets_workspace_idx
  on maim.asset_catalog_assets (workspace_id, updated_at desc);
create index if not exists asset_catalog_assets_filter_idx
  on maim.asset_catalog_assets (workspace_id, approval_status, completeness_status, integrity_status);
create index if not exists asset_catalog_sources_asset_idx
  on maim.asset_catalog_source_locations (asset_id);
create index if not exists asset_catalog_memberships_project_idx
  on maim.asset_catalog_project_memberships (project_id, asset_id);
create index if not exists asset_catalog_dependencies_blocked_idx
  on maim.asset_catalog_dependencies (asset_id) where blocks_preview;

alter table maim.asset_catalog_assets enable row level security;
alter table maim.asset_catalog_byte_versions enable row level security;
alter table maim.asset_catalog_source_locations enable row level security;
alter table maim.asset_catalog_projects enable row level security;
alter table maim.asset_catalog_project_memberships enable row level security;
alter table maim.asset_catalog_dependencies enable row level security;

revoke all on maim.asset_catalog_assets from public, anon, authenticated;
revoke all on maim.asset_catalog_byte_versions from public, anon, authenticated;
revoke all on maim.asset_catalog_source_locations from public, anon, authenticated;
revoke all on maim.asset_catalog_projects from public, anon, authenticated;
revoke all on maim.asset_catalog_project_memberships from public, anon, authenticated;
revoke all on maim.asset_catalog_dependencies from public, anon, authenticated;

grant usage on schema maim to authenticated;
grant select on maim.asset_catalog_assets to authenticated;
grant select on maim.asset_catalog_byte_versions to authenticated;
grant select on maim.asset_catalog_source_locations to authenticated;
grant select on maim.asset_catalog_projects to authenticated;
grant select on maim.asset_catalog_project_memberships to authenticated;
grant select on maim.asset_catalog_dependencies to authenticated;

drop policy if exists asset_catalog_assets_member_read on maim.asset_catalog_assets;
create policy asset_catalog_assets_member_read on maim.asset_catalog_assets
  for select to authenticated
  using (exists (
    select 1 from maim.memberships m
    where m.workspace_id = asset_catalog_assets.workspace_id
      and m.user_id = (select auth.uid())
  ));

drop policy if exists asset_catalog_projects_member_read on maim.asset_catalog_projects;
create policy asset_catalog_projects_member_read on maim.asset_catalog_projects
  for select to authenticated
  using (exists (
    select 1 from maim.memberships m
    where m.workspace_id = asset_catalog_projects.workspace_id
      and m.user_id = (select auth.uid())
  ));

drop policy if exists asset_catalog_sources_member_read on maim.asset_catalog_source_locations;
create policy asset_catalog_sources_member_read on maim.asset_catalog_source_locations
  for select to authenticated
  using (exists (
    select 1 from maim.asset_catalog_assets a
    join maim.memberships m on m.workspace_id = a.workspace_id
    where a.id = asset_catalog_source_locations.asset_id
      and m.user_id = (select auth.uid())
  ));

drop policy if exists asset_catalog_versions_member_read on maim.asset_catalog_byte_versions;
create policy asset_catalog_versions_member_read on maim.asset_catalog_byte_versions
  for select to authenticated
  using (exists (
    select 1 from maim.asset_catalog_source_locations s
    join maim.asset_catalog_assets a on a.id = s.asset_id
    join maim.memberships m on m.workspace_id = a.workspace_id
    where s.byte_version_id = asset_catalog_byte_versions.id
      and m.user_id = (select auth.uid())
  ));

drop policy if exists asset_catalog_memberships_member_read on maim.asset_catalog_project_memberships;
create policy asset_catalog_memberships_member_read on maim.asset_catalog_project_memberships
  for select to authenticated
  using (exists (
    select 1 from maim.asset_catalog_assets a
    join maim.memberships m on m.workspace_id = a.workspace_id
    where a.id = asset_catalog_project_memberships.asset_id
      and m.user_id = (select auth.uid())
  ));

drop policy if exists asset_catalog_dependencies_member_read on maim.asset_catalog_dependencies;
create policy asset_catalog_dependencies_member_read on maim.asset_catalog_dependencies
  for select to authenticated
  using (exists (
    select 1 from maim.asset_catalog_assets a
    join maim.memberships m on m.workspace_id = a.workspace_id
    where a.id = asset_catalog_dependencies.asset_id
      and m.user_id = (select auth.uid())
  ));

create or replace view maim.asset_catalog_studio
with (security_invoker = true)
as
select
  a.id,
  a.stable_id,
  a.title,
  a.format,
  a.approval_status,
  a.completeness_status,
  a.integrity_status,
  p.project_code,
  p.name as project,
  coalesce(d.dependency_count, 0) as dependency_count,
  coalesce(d.preview_blocked, false) as preview_blocked,
  s.source_url as original_source_url
from maim.asset_catalog_assets a
left join lateral (
  select p.project_code, p.name
  from maim.asset_catalog_project_memberships pm
  join maim.asset_catalog_projects p on p.id = pm.project_id
  where pm.asset_id = a.id
  order by p.project_code
  limit 1
) p on true
left join lateral (
  select count(*)::integer as dependency_count,
         bool_or(dep.blocks_preview) as preview_blocked
  from maim.asset_catalog_dependencies dep
  where dep.asset_id = a.id
) d on true
left join lateral (
  select sl.source_url
  from maim.asset_catalog_source_locations sl
  where sl.asset_id = a.id
  order by sl.updated_at desc
  limit 1
) s on true;

revoke all on maim.asset_catalog_studio from public, anon, authenticated;
grant select on maim.asset_catalog_studio to authenticated;

-- Server-only, atomic reconciliation entry point. Absolute local paths are not
-- accepted or stored. Existing stable IDs with different bytes are conflicts.
create or replace function maim.reconcile_asset_catalog_manifest(
  p_workspace_id uuid,
  p_manifest jsonb
) returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, maim
as $$
declare
  item jsonb;
  v_asset maim.asset_catalog_assets%rowtype;
  v_version_id uuid;
  v_project_id uuid;
  v_existing_sha text;
  v_source_workspace uuid;
  v_source_stable_id text;
  v_inserted integer := 0;
  v_reconciled integer := 0;
  v_conflicts integer := 0;
  v_missing integer := 0;
  v_exceptions integer := 0;
begin
  if jsonb_typeof(p_manifest) <> 'array' then
    raise exception 'manifest must be a JSON array';
  end if;
  if not exists (select 1 from maim.workspaces where id = p_workspace_id) then
    raise exception 'workspace does not exist';
  end if;

  for item in select value from jsonb_array_elements(p_manifest)
  loop
    if coalesce(item->>'upload_status', '') <> 'uploaded'
       or nullif(item->>'drive_file_id', '') is null then
      if coalesce((item->>'size_bytes')::bigint, 0) = 0 then
        v_exceptions := v_exceptions + 1;
      else
        v_missing := v_missing + 1;
      end if;
      continue;
    end if;

    select bv.sha256 into v_existing_sha
      from maim.asset_catalog_assets a
      join maim.asset_catalog_source_locations s on s.asset_id = a.id
      join maim.asset_catalog_byte_versions bv on bv.id = s.byte_version_id
     where a.workspace_id = p_workspace_id
       and a.stable_id = item->>'stable_id'
     limit 1;
    if v_existing_sha is not null and v_existing_sha <> lower(item->>'sha256') then
      v_conflicts := v_conflicts + 1;
      continue;
    end if;
    v_source_workspace := null;
    v_source_stable_id := null;
    select a.workspace_id, a.stable_id into v_source_workspace, v_source_stable_id
      from maim.asset_catalog_source_locations s
      join maim.asset_catalog_assets a on a.id = s.asset_id
     where s.provider = 'google_drive'
       and s.external_file_id = item->>'drive_file_id';
    if v_source_workspace is not null and (
      v_source_workspace <> p_workspace_id
      or v_source_stable_id <> item->>'stable_id'
    ) then
      v_conflicts := v_conflicts + 1;
      continue;
    end if;

    insert into maim.asset_catalog_byte_versions (sha256, size_bytes, mime_type)
    values (lower(item->>'sha256'), (item->>'size_bytes')::bigint, nullif(item->>'mime_type', ''))
    on conflict (sha256, size_bytes) do update set mime_type = coalesce(excluded.mime_type, asset_catalog_byte_versions.mime_type)
    returning id into v_version_id;

    insert into maim.asset_catalog_assets (
      workspace_id, stable_id, title, format, approval_status,
      completeness_status, integrity_status, completion_context, zero_byte_exception
    ) values (
      p_workspace_id, item->>'stable_id', item->>'original_filename', item->>'format',
      'unreviewed', coalesce(nullif(item->>'completeness_status',''), 'unknown'),
      coalesce(nullif(item->>'integrity_status',''), 'not_verified'),
      nullif(item->>'completion_context',''), false
    )
    on conflict (workspace_id, stable_id) do update set
      title = excluded.title,
      format = excluded.format,
      completeness_status = excluded.completeness_status,
      integrity_status = excluded.integrity_status,
      completion_context = excluded.completion_context,
      updated_at = now()
    returning * into v_asset;

    insert into maim.asset_catalog_source_locations (
      asset_id, byte_version_id, provider, external_file_id, source_url,
      original_filename, project_relative_path, upload_status,
      integrity_status, verified_at
    ) values (
      v_asset.id, v_version_id, 'google_drive', item->>'drive_file_id',
      item->>'drive_url', item->>'original_filename', item->>'project_relative_path',
      'uploaded', coalesce(nullif(item->>'integrity_status',''), 'not_verified'),
      case when item->>'integrity_status' = 'sha256_verified' then now() else null end
    )
    on conflict (provider, external_file_id) do update set
      asset_id = excluded.asset_id,
      byte_version_id = excluded.byte_version_id,
      source_url = excluded.source_url,
      original_filename = excluded.original_filename,
      project_relative_path = excluded.project_relative_path,
      upload_status = excluded.upload_status,
      integrity_status = excluded.integrity_status,
      verified_at = excluded.verified_at,
      updated_at = now();

    insert into maim.asset_catalog_projects (workspace_id, project_code, name)
    values (p_workspace_id, item->>'project_code', item->>'project')
    on conflict (workspace_id, project_code) do update set name = excluded.name
    returning id into v_project_id;

    insert into maim.asset_catalog_project_memberships (asset_id, project_id, relationship)
    values (v_asset.id, v_project_id, coalesce(nullif(item->>'project_relationship',''), 'member'))
    on conflict (asset_id, project_id) do update set relationship = excluded.relationship;

    delete from maim.asset_catalog_dependencies where asset_id = v_asset.id;
    insert into maim.asset_catalog_dependencies (asset_id, dependency, status, evidence, blocks_preview)
      select v_asset.id, d->>'dependency', d->>'status', nullif(d->>'evidence',''),
             coalesce((d->>'blocks_preview')::boolean, false)
      from jsonb_array_elements(coalesce(item->'dependencies', '[]'::jsonb)) d;

    if v_existing_sha is null then v_inserted := v_inserted + 1;
    else v_reconciled := v_reconciled + 1;
    end if;
  end loop;

  return jsonb_build_object(
    'inserted', v_inserted,
    'reconciled', v_reconciled,
    'conflicts', v_conflicts,
    'missing_uploads', v_missing,
    'zero_byte_exceptions', v_exceptions
  );
end;
$$;

revoke all on function maim.reconcile_asset_catalog_manifest(uuid, jsonb) from public, anon, authenticated;
grant execute on function maim.reconcile_asset_catalog_manifest(uuid, jsonb) to service_role;

comment on table maim.asset_catalog_assets is
  'Private workspace-scoped catalogue metadata. Drive remains authoritative for original bytes.';
comment on function maim.reconcile_asset_catalog_manifest(uuid, jsonb) is
  'Server-only idempotent manifest reconciliation. Never expose service credentials to a browser.';
