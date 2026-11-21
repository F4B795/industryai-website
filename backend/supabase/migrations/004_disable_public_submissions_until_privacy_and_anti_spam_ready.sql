-- INDUSTRYAI – close public submissions until legal and anti-spam readiness
drop policy if exists "public submit company profile" on public.company_submissions;
revoke insert on public.company_submissions from anon, authenticated;
