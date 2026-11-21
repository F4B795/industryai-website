-- INDUSTRYAI – extend public company profiles with approved public content
alter table public.company_public_profiles
  add column if not exists apprenticeships text not null default '',
  add column if not exists jobs text not null default '',
  add column if not exists workplace text not null default '',
  add column if not exists technology text not null default '',
  add column if not exists benefits text not null default '',
  add column if not exists culture text not null default '',
  add column if not exists development text not null default '',
  add column if not exists website text not null default '',
  add column if not exists media text not null default '';
