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
