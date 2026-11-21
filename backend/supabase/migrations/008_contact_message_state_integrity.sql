
-- Ensure completed contact messages have a processing timestamp so
-- the retention policy can always calculate the correct deletion date.
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'contact_messages_status_processed_at_check'
      and conrelid = 'public.contact_messages'::regclass
  ) then
    alter table public.contact_messages
      add constraint contact_messages_status_processed_at_check
      check (
        (status = 'Eingegangen' and processed_at is null)
        or
        (status = 'Bearbeitet' and processed_at is not null)
      );
  end if;
end;
$$;

-- The maintenance function references all objects with qualified names.
-- Keep only pg_catalog in the SECURITY DEFINER search path.
alter function private.purge_industryai_expired_data()
  set search_path = pg_catalog;

revoke all on function private.purge_industryai_expired_data()
  from public, anon, authenticated;
