-- INDUSTRYAI – harden administrator function exposure
-- Keep the SECURITY DEFINER helper outside the exposed public API schema.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create or replace function private.industryai_is_admin()
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
revoke all on function private.industryai_is_admin() from public, anon;
grant execute on function private.industryai_is_admin() to authenticated;

drop policy if exists "admins manage admin list" on public.industryai_admins;
create policy "admins manage admin list"
on public.industryai_admins for all to authenticated
using (private.industryai_is_admin())
with check (private.industryai_is_admin());

drop policy if exists "admins read submissions" on public.company_submissions;
create policy "admins read submissions"
on public.company_submissions for select to authenticated
using (private.industryai_is_admin());

drop policy if exists "admins update submissions" on public.company_submissions;
create policy "admins update submissions"
on public.company_submissions for update to authenticated
using (private.industryai_is_admin())
with check (private.industryai_is_admin());

drop policy if exists "admins insert public profiles" on public.company_public_profiles;
create policy "admins insert public profiles"
on public.company_public_profiles for insert to authenticated
with check (private.industryai_is_admin());

drop policy if exists "admins update public profiles" on public.company_public_profiles;
create policy "admins update public profiles"
on public.company_public_profiles for update to authenticated
using (private.industryai_is_admin())
with check (private.industryai_is_admin());

drop policy if exists "admins delete public profiles" on public.company_public_profiles;
create policy "admins delete public profiles"
on public.company_public_profiles for delete to authenticated
using (private.industryai_is_admin());

alter table public.company_public_profiles
  add column if not exists media text not null default '';

revoke all on function public.industryai_is_admin() from public, anon, authenticated;
drop function if exists public.industryai_is_admin();

revoke all on function public.rls_auto_enable() from public, anon, authenticated;
