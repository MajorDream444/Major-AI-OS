-- Disposable-test reconstruction of the minimum existing MAIM foundation.
-- This is not a production migration and must not be applied to hosted Supabase.
create schema if not exists auth;
create schema if not exists maim;
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role nologin bypassrls; end if;
end $$;
create table auth.users (id uuid primary key, instance_id uuid, aud text, role text, email text, encrypted_password text);
create or replace function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;
create table maim.workspaces (id uuid primary key default gen_random_uuid(), order_reference text unique, status text not null default 'active');
create table maim.memberships (workspace_id uuid not null references maim.workspaces(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade, role text not null, primary key (workspace_id, user_id));
create table maim.vault_assets (id uuid primary key default gen_random_uuid(), workspace_id uuid not null references maim.workspaces(id) on delete restrict, title text not null);
alter table maim.workspaces enable row level security;
alter table maim.memberships enable row level security;
alter table maim.vault_assets enable row level security;
create policy member_workspace on maim.workspaces for select to authenticated using (exists (select 1 from maim.memberships m where m.workspace_id = workspaces.id and m.user_id = (select auth.uid())));
create policy own_membership on maim.memberships for select to authenticated using (user_id = (select auth.uid()));
grant usage on schema auth, maim to authenticated, service_role;
grant execute on function auth.uid() to anon, authenticated, service_role;
grant select on maim.workspaces, maim.memberships to authenticated;
grant all on all tables in schema maim to service_role;
