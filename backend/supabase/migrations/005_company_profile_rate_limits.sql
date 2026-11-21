-- INDUSTRYAI – rate-limit storage for the public company profile intake
create table if not exists private.company_profile_rate_limits (
  key_hash text primary key check (key_hash ~ '^[a-f0-9]{64}$'),
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
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_allowed boolean;
begin
  if p_key_hash !~ '^[a-f0-9]{64}$'
     or p_limit < 1 or p_limit > 100
     or p_window_seconds < 60 or p_window_seconds > 86400 then
    return false;
  end if;

  insert into private.company_profile_rate_limits as rl
    (key_hash, window_started_at, request_count)
  values
    (p_key_hash, v_now, 1)
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
$$;

revoke all on function public.consume_company_profile_rate_limit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_company_profile_rate_limit(text, integer, integer)
  to service_role;
