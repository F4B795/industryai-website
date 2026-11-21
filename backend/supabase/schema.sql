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

create or replace function public.industryai_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.industryai_admins a
    where a.user_id = (select auth.uid())
  );
$$;

alter table public.industryai_admins enable row level security;
alter table public.company_submissions enable row level security;
alter table public.company_public_profiles enable row level security;

-- Anonymous visitors may submit new profiles, but cannot choose review status
-- or read any submission. Admins may review and update all submissions.
drop policy if exists "public submit company profile" on public.company_submissions;
create policy "public submit company profile"
on public.company_submissions for insert to anon, authenticated
with check (status = 'Eingegangen' and internal_note = '');

drop policy if exists "admins read submissions" on public.company_submissions;
create policy "admins read submissions"
on public.company_submissions for select to authenticated
using (public.industryai_is_admin());

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
grant insert on public.company_submissions to anon, authenticated;
grant select, update on public.company_submissions to authenticated;
grant select on public.company_public_profiles to anon, authenticated;
grant insert, update, delete on public.company_public_profiles to authenticated;
grant select on public.industryai_admins to authenticated;
grant insert, update, delete on public.industryai_admins to authenticated;
grant execute on function public.industryai_is_admin() to authenticated;

-- First admin bootstrap (run only after creating the admin user in Supabase Auth):
-- insert into public.industryai_admins(user_id)
-- values ('PASTE_AUTH_USER_UUID_HERE');
