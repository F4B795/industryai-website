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
