-- Disposable Supabase-only reconstruction of the minimum hosted MAIM contracts.
-- Auth, API roles, and auth.uid() are supplied by the local Supabase runtime.
-- This file is not a production migration and must never be pushed to hosted DBs.
create schema if not exists maim;

create table maim.workspaces (
  id uuid primary key default gen_random_uuid(),
  order_reference text not null unique,
  status text not null default 'awaiting_intake',
  created_at timestamptz not null default now()
);

create table maim.memberships (
  workspace_id uuid not null references maim.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('client', 'operator')),
  primary key (workspace_id, user_id)
);

create table maim.vault_assets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references maim.workspaces(id) on delete restrict,
  storage_key text not null unique,
  rights text not null default 'unknown'
    check (rights in ('unknown', 'private_only', 'commercial_approved')),
  reviewed boolean not null default false,
  third_party_consent boolean not null default false,
  retention_until timestamptz not null
);

alter table maim.workspaces enable row level security;
alter table maim.memberships enable row level security;
alter table maim.vault_assets enable row level security;

create policy member_workspace on maim.workspaces
  for select to authenticated
  using (exists (
    select 1 from maim.memberships m
    where m.workspace_id = workspaces.id and m.user_id = (select auth.uid())
  ));

create policy own_membership on maim.memberships
  for select to authenticated
  using (user_id = (select auth.uid()));

grant usage on schema maim to authenticated, service_role;
grant select on maim.workspaces, maim.memberships to authenticated;
grant all on all tables in schema maim to service_role;
