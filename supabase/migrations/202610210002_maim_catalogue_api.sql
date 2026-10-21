-- Narrow public-schema bridge for PostgREST installations that do not expose
-- the private maim schema. RLS remains active and membership is checked here.
create or replace function public.get_maim_asset_catalogue(p_workspace_id uuid)
returns table (
  id uuid,
  stable_id text,
  title text,
  format text,
  approval_status text,
  completeness_status text,
  integrity_status text,
  project_code text,
  project text,
  dependency_count integer,
  preview_blocked boolean,
  original_source_url text
)
language plpgsql
stable
security invoker
set search_path = pg_catalog, maim
as $$
begin
  if (select auth.uid()) is null or not exists (
    select 1
    from maim.memberships m
    where m.workspace_id = p_workspace_id
      and m.user_id = (select auth.uid())
  ) then
    raise insufficient_privilege using message = 'workspace membership required';
  end if;

  return query
  select
    s.id,
    s.stable_id,
    s.title,
    s.format,
    s.approval_status,
    s.completeness_status,
    s.integrity_status,
    s.project_code,
    s.project,
    s.dependency_count,
    s.preview_blocked,
    s.original_source_url
  from maim.asset_catalog_studio s
  where s.workspace_id = p_workspace_id
  order by s.title;
end;
$$;

revoke all on function public.get_maim_asset_catalogue(uuid) from public, anon;
grant execute on function public.get_maim_asset_catalogue(uuid) to authenticated;

comment on function public.get_maim_asset_catalogue(uuid) is
  'Authenticated, membership-scoped read bridge for the private MAIM asset catalogue.';
