-- MAIM registrations — first-party capture for the Public Sanctuary.
--
-- The front door posts to Kit for email delivery, but that handoff is
-- cross-origin and loses the `lane` value. This table is our own record,
-- written from the browser with the publishable (anon) key before the
-- Kit submit fires.
--
-- Apply with:
--   supabase link --project-ref fsrskmlsxqtxduhdfhnd
--   supabase db push

create table if not exists public.registrations (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  full_name     text,
  email         text,
  lane          text,
  source        text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  referrer      text
);

-- Registrations arrive fastest by email; we look them up that way when
-- reconciling against Kit.
create index if not exists registrations_email_idx
  on public.registrations (lower(email));

create index if not exists registrations_created_at_idx
  on public.registrations (created_at desc);

alter table public.registrations enable row level security;

-- Anonymous visitors may INSERT their own registration and nothing else.
-- No select, update, or delete policy exists for anon, so the publishable
-- key cannot read the list back. Reads happen server-side with the
-- service role, or through the Supabase dashboard.
drop policy if exists "anon can insert registrations" on public.registrations;
create policy "anon can insert registrations"
  on public.registrations
  for insert
  to anon
  with check (true);
