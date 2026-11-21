-- INDUSTRYAI – Supabase foundation for company profile submissions
-- Apply in Supabase SQL Editor after creating a new project.
-- IMPORTANT: Add the first administrator manually as described in README-supabase.md.

create extension if not exists pgcrypto;

create table if not exists public.industryai_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.company_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'Eingegangen'
    check (status in ('Eingegangen','In Prüfung','Rückfrage','Freigegeben','Abgelehnt')),
  company_name text not null check (char_length(company_name) between 2 and 160),
  location text not null default '' check (char_length(location) <= 160),
  sector text not null default '' check (char_length(sector) <= 120),
  website text not null default '' check (char_length(website) <= 500),
  description text not null default '' check (char_length(description) <= 5000),
  apprenticeships text not null default '' check (char_length(apprenticeships) <= 5000),
  jobs text not null default '' check (char_length(jobs) <= 5000),
  media text not null default '' check (char_length(media) <= 3000),
  workplace text not null default '' check (char_length(workplace) <= 3000),
  technology text not null default '' check (char_length(technology) <= 3000),
  benefits text not null default '' check (char_length(benefits) <= 3000),
  culture text not null default '' check (char_length(culture) <= 3000),
  development text not null default '' check (char_length(development) <= 3000),
  contact_person text not null check (char_length(contact_person) between 2 and 160),
  contact_email text not null check (char_length(contact_email) between 5 and 254),
  internal_note text not null default '' check (char_length(internal_note) <= 5000)
);

-- Only approved, explicitly published company information belongs here.
-- Contact details and internal review notes are intentionally excluded.
create table if not exists public.company_public_profiles (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid unique references public.company_submissions(id) on delete set null,
  published_at timestamptz not null default now(),
  name text not null,
  location text not null default '',
  category text not null default '',
  category_label text not null default '',
  description text not null default '',
  apprenticeships text not null default '',
  jobs text not null default '',
  workplace text not null default '',
  technology text not null default '',
  benefits text not null default '',
  culture text not null default '',
  development text not null default '',
  website text not null default '',
  media text not null default '',
  image text not null default '',
  image_alt text not null default '',
  profile_url text not null default '',
  tag text not null default 'UNTERNEHMEN',
  is_published boolean not null default true
);

create index if not exists company_submissions_status_created_idx
  on public.company_submissions(status, created_at desc);
create index if not exists company_public_profiles_published_idx
  on public.company_public_profiles(is_published, published_at desc);

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create or replace function private.industryai_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $
  select exists (
    select 1 from public.industryai_admins a
    where a.user_id = (select auth.uid())
  );
$;
revoke all on function private.industryai_is_admin() from public, anon;
grant execute on function private.industryai_is_admin() to authenticated;

-- HMAC-based rate-limit records. Raw IP addresses and contact emails are not stored.
create table if not exists private.company_profile_rate_limits (
  key_hash text primary key check (key_hash ~ '^[a-f0-9]{64}

alter table public.industryai_admins enable row level security;
alter table public.company_submissions enable row level security;
alter table public.company_public_profiles enable row level security;

-- Public intake stays closed until privacy, anti-spam and retention controls
-- are complete. Enable later with a dedicated server-side submission flow.
drop policy if exists "public submit company profile" on public.company_submissions;

drop policy if exists "admins read submissions" on public.company_submissions;
create policy "admins read submissions"
on public.company_submissions for select to authenticated
using (private.industryai_is_admin());

drop policy if exists "admins update submissions" on public.company_submissions;
create policy "admins update submissions"
on public.company_submissions for update to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

drop policy if exists "admins manage admin list" on public.industryai_admins;
create policy "admins manage admin list"
on public.industryai_admins for all to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

drop policy if exists "public read published profiles" on public.company_public_profiles;
create policy "public read published profiles"
on public.company_public_profiles for select to anon, authenticated
using (is_published = true);

drop policy if exists "admins manage public profiles" on public.company_public_profiles;
create policy "admins manage public profiles"
on public.company_public_profiles for all to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

grant usage on schema public to anon, authenticated;
grant select, update on public.company_submissions to authenticated;
grant insert, select on public.company_submissions to service_role;
grant select on public.company_public_profiles to anon, authenticated;
grant insert, update, delete on public.company_public_profiles to authenticated;
grant select on public.industryai_admins to authenticated;
grant insert, update, delete on public.industryai_admins to authenticated;
grant execute on function public.industryai_is_admin() to authenticated;

-- First admin bootstrap (run only after creating the admin user in Supabase Auth):
-- insert into public.industryai_admins(user_id)
-- values ('PASTE_AUTH_USER_UUID_HERE');
),
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1 check (request_count >= 1)
);
alter table private.company_profile_rate_limits enable row level security;
revoke all on table private.company_profile_rate_limits from public, anon, authenticated, service_role;

create or replace function public.consume_company_profile_rate_limit(
  p_key_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $
declare
  v_now timestamptz := clock_timestamp();
  v_allowed boolean;
begin
  if p_key_hash !~ '^[a-f0-9]{64}

alter table public.industryai_admins enable row level security;
alter table public.company_submissions enable row level security;
alter table public.company_public_profiles enable row level security;

-- Public intake stays closed until privacy, anti-spam and retention controls
-- are complete. Enable later with a dedicated server-side submission flow.
drop policy if exists "public submit company profile" on public.company_submissions;

drop policy if exists "admins read submissions" on public.company_submissions;
create policy "admins read submissions"
on public.company_submissions for select to authenticated
using (private.industryai_is_admin());

drop policy if exists "admins update submissions" on public.company_submissions;
create policy "admins update submissions"
on public.company_submissions for update to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

drop policy if exists "admins manage admin list" on public.industryai_admins;
create policy "admins manage admin list"
on public.industryai_admins for all to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

drop policy if exists "public read published profiles" on public.company_public_profiles;
create policy "public read published profiles"
on public.company_public_profiles for select to anon, authenticated
using (is_published = true);

drop policy if exists "admins manage public profiles" on public.company_public_profiles;
create policy "admins manage public profiles"
on public.company_public_profiles for all to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

grant usage on schema public to anon, authenticated;
grant select, update on public.company_submissions to authenticated;
grant select on public.company_public_profiles to anon, authenticated;
grant insert, update, delete on public.company_public_profiles to authenticated;
grant select on public.industryai_admins to authenticated;
grant insert, update, delete on public.industryai_admins to authenticated;
grant execute on function public.industryai_is_admin() to authenticated;

-- First admin bootstrap (run only after creating the admin user in Supabase Auth):
-- insert into public.industryai_admins(user_id)
-- values ('PASTE_AUTH_USER_UUID_HERE');

     or p_limit < 1 or p_limit > 100
     or p_window_seconds < 60 or p_window_seconds > 86400 then
    return false;
  end if;
  insert into private.company_profile_rate_limits as rl
    (key_hash, window_started_at, request_count)
  values (p_key_hash, v_now, 1)
  on conflict (key_hash) do update
  set
    window_started_at = case
      when rl.window_started_at <= v_now - make_interval(secs => p_window_seconds)
      then v_now else rl.window_started_at end,
    request_count = case
      when rl.window_started_at <= v_now - make_interval(secs => p_window_seconds)
      then 1 else rl.request_count + 1 end
  returning request_count <= p_limit into v_allowed;
  if random() < 0.01 then
    delete from private.company_profile_rate_limits
    where window_started_at < v_now - interval '30 days';
  end if;
  return coalesce(v_allowed, false);
end;
$;
revoke all on function public.consume_company_profile_rate_limit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_company_profile_rate_limit(text, integer, integer)
  to service_role;

alter table public.industryai_admins enable row level security;
alter table public.company_submissions enable row level security;
alter table public.company_public_profiles enable row level security;

-- Public intake stays closed until privacy, anti-spam and retention controls
-- are complete. Enable later with a dedicated server-side submission flow.
drop policy if exists "public submit company profile" on public.company_submissions;

drop policy if exists "admins read submissions" on public.company_submissions;
create policy "admins read submissions"
on public.company_submissions for select to authenticated
using (private.industryai_is_admin());

drop policy if exists "admins update submissions" on public.company_submissions;
create policy "admins update submissions"
on public.company_submissions for update to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

drop policy if exists "admins manage admin list" on public.industryai_admins;
create policy "admins manage admin list"
on public.industryai_admins for all to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

drop policy if exists "public read published profiles" on public.company_public_profiles;
create policy "public read published profiles"
on public.company_public_profiles for select to anon, authenticated
using (is_published = true);

drop policy if exists "admins manage public profiles" on public.company_public_profiles;
create policy "admins manage public profiles"
on public.company_public_profiles for all to authenticated
using (public.industryai_is_admin())
with check (public.industryai_is_admin());

grant usage on schema public to anon, authenticated;
grant select, update on public.company_submissions to authenticated;
grant select on public.company_public_profiles to anon, authenticated;
grant insert, update, delete on public.company_public_profiles to authenticated;
grant select on public.industryai_admins to authenticated;
grant insert, update, delete on public.industryai_admins to authenticated;
grant execute on function public.industryai_is_admin() to authenticated;

-- First admin bootstrap (run only after creating the admin user in Supabase Auth):
-- insert into public.industryai_admins(user_id)
-- values ('PASTE_AUTH_USER_UUID_HERE');


-- Private contact inbox (migration 006)
-- INDUSTRYAI – private contact message inbox
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254),
  subject text not null check (char_length(subject) between 2 and 160),
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'Eingegangen'
    check (status = any (array['Eingegangen'::text, 'Bearbeitet'::text])),
  processed_at timestamptz
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_idx
  on public.contact_messages (status, created_at desc);

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from public, anon, authenticated;
grant select, delete on table public.contact_messages to authenticated;
grant update (status, processed_at) on table public.contact_messages to authenticated;
grant all on table public.contact_messages to service_role;

drop policy if exists "admins manage contact messages" on public.contact_messages;
create policy "admins manage contact messages"
  on public.contact_messages
  for all
  to authenticated
  using (private.industryai_is_admin())
  with check (private.industryai_is_admin());

-- Daily retention cleanup (migration 007)
-- INDUSTRYAI – automatic cleanup for the private contact inbox and HMAC rate-limit keys
create extension if not exists pg_cron;

create or replace function private.purge_industryai_expired_data()
returns void
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
begin
  delete from public.contact_messages
  where
    (status = 'Bearbeitet' and processed_at < now() - interval '6 months')
    or
    (status = 'Eingegangen' and created_at < now() - interval '12 months');

  delete from private.company_profile_rate_limits
  where window_started_at < now() - interval '30 days';
end;
$$;

revoke all on function private.purge_industryai_expired_data() from public, anon, authenticated;

select cron.schedule(
  'industryai-contact-retention-cleanup',
  '30 3 * * *',
  'select private.purge_industryai_expired_data();'
);

