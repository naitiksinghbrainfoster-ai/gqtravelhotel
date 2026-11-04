create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  subject text not null default '',
  message text not null default '',
  created_at timestamptz not null default now()
);

alter table public.contact_messages
  add column if not exists name text not null default '',
  add column if not exists email text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists subject text not null default '',
  add column if not exists message text not null default '',
  add column if not exists created_at timestamptz not null default now();

alter table public.contact_messages enable row level security;

grant select, insert, update, delete on public.contact_messages to authenticated;
grant insert on public.contact_messages to anon;

drop policy if exists "contact_messages_public_insert" on public.contact_messages;
create policy "contact_messages_public_insert" on public.contact_messages
  for insert to anon, authenticated
  with check (true);

drop policy if exists "contact_messages_admin_read" on public.contact_messages;
create policy "contact_messages_admin_read" on public.contact_messages
  for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "contact_messages_admin_write" on public.contact_messages;
create policy "contact_messages_admin_write" on public.contact_messages
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

notify pgrst, 'reload schema';
