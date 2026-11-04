-- Admin login accounts are created in Supabase Dashboard > Authentication > Users.
-- This schema only creates profile rows; promote an administrator explicitly in
-- the SQL Editor with: UPDATE public.profiles SET role = 'admin' WHERE id = (
--   SELECT id FROM auth.users WHERE lower(email) = lower('admin@example.com')
-- );
-- The browser app authenticates with Supabase Auth and never stores passwords here.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'customer',
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists role text not null default 'customer';

insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  name text not null default '',
  location text not null default '',
  city text not null default '',
  country text not null default '',
  category text not null default 'Hotel',
  price_per_night numeric(10, 2) not null default 0,
  price numeric(10, 2) not null default 0,
  description text not null default '',
  image text not null default '',
  image_url text not null default '',
  address text not null default '',
  rating numeric(2, 1) not null default 4.8,
  reviews_count integer not null default 0,
  amenities jsonb not null default '[]'::jsonb,
  is_saarbruecken boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.properties add column if not exists title text not null default '';
alter table public.properties add column if not exists name text not null default '';
alter table public.properties add column if not exists location text not null default '';
alter table public.properties add column if not exists city text not null default '';
alter table public.properties add column if not exists country text not null default '';
alter table public.properties add column if not exists category text not null default 'Hotel';
alter table public.properties add column if not exists price_per_night numeric(10, 2) not null default 0;
alter table public.properties add column if not exists price numeric(10, 2) not null default 0;
alter table public.properties add column if not exists description text not null default '';
alter table public.properties add column if not exists image text not null default '';
alter table public.properties add column if not exists image_url text not null default '';
alter table public.properties add column if not exists address text not null default '';
alter table public.properties add column if not exists rating numeric(2, 1) not null default 4.8;
alter table public.properties add column if not exists reviews_count integer not null default 0;
alter table public.properties add column if not exists amenities jsonb not null default '[]'::jsonb;
alter table public.properties add column if not exists is_saarbruecken boolean not null default false;
alter table public.properties add column if not exists created_at timestamptz not null default now();

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  property_id text,
  property_name text not null default '',
  booking_number text not null default '',
  customer_name text not null default '',
  customer_email text not null default '',
  customer_phone text not null default '',
  billing_address text not null default '',
  check_in date,
  check_out date,
  guests integer not null default 1,
  room_type text not null default '',
  rate_type text not null default '',
  status text not null default 'pending',
  total_price numeric(10, 2),
  created_at timestamptz not null default now()
);

alter table public.bookings add column if not exists property_id text;
alter table public.bookings add column if not exists property_name text not null default '';
alter table public.bookings add column if not exists booking_number text not null default '';
alter table public.bookings add column if not exists customer_name text not null default '';
alter table public.bookings add column if not exists customer_email text not null default '';
alter table public.bookings add column if not exists customer_phone text not null default '';
alter table public.bookings add column if not exists billing_address text not null default '';
alter table public.bookings add column if not exists check_in date;
alter table public.bookings add column if not exists check_out date;
alter table public.bookings add column if not exists guests integer not null default 1;
alter table public.bookings add column if not exists room_type text not null default '';
alter table public.bookings add column if not exists rate_type text not null default '';
alter table public.bookings add column if not exists status text not null default 'pending';
alter table public.bookings add column if not exists total_price numeric(10, 2);
alter table public.bookings add column if not exists created_at timestamptz not null default now();

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  subject text not null default '',
  message text not null default '',
  created_at timestamptz not null default now()
);

alter table public.contact_messages add column if not exists name text not null default '';
alter table public.contact_messages add column if not exists email text not null default '';
alter table public.contact_messages add column if not exists phone text not null default '';
alter table public.contact_messages add column if not exists subject text not null default '';
alter table public.contact_messages add column if not exists message text not null default '';
alter table public.contact_messages add column if not exists created_at timestamptz not null default now();

create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id text not null,
  url text not null,
  image_url text not null default '',
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.property_images add column if not exists property_id text;
alter table public.property_images add column if not exists url text not null default '';
alter table public.property_images add column if not exists image_url text not null default '';
alter table public.property_images add column if not exists is_featured boolean not null default false;
alter table public.property_images add column if not exists created_at timestamptz not null default now();

create table if not exists public.site_content (
  key text primary key,
  page_key text not null default 'home',
  page_title text not null default 'Website content',
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_content add column if not exists key text;
alter table public.site_content add column if not exists page_key text not null default 'home';
alter table public.site_content add column if not exists page_title text not null default 'Website content';
alter table public.site_content add column if not exists value text not null default '';
alter table public.site_content add column if not exists updated_at timestamptz not null default now();
alter table public.site_content alter column page_title set default 'Website content';
alter table public.site_content drop constraint if exists site_content_page_key_key;
create unique index if not exists site_content_key_unique on public.site_content (key);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role in ('admin', 'super_admin')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;
alter table public.property_images enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "profiles_read_own_or_admin" on public.profiles;
create policy "profiles_read_own_or_admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "profiles_admin_update" on public.profiles;
create policy "profiles_admin_update" on public.profiles
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "properties_public_read" on public.properties;
create policy "properties_public_read" on public.properties
  for select to anon, authenticated
  using (true);

drop policy if exists "properties_admin_write" on public.properties;
create policy "properties_admin_write" on public.properties
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "bookings_admin_read" on public.bookings;
create policy "bookings_admin_read" on public.bookings
  for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "bookings_public_request_insert" on public.bookings;
create policy "bookings_public_request_insert" on public.bookings
  for insert to anon, authenticated
  with check (status = 'pending');

drop policy if exists "bookings_admin_write" on public.bookings;
create policy "bookings_admin_write" on public.bookings
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

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

drop policy if exists "property_images_public_read" on public.property_images;
create policy "property_images_public_read" on public.property_images
  for select to anon, authenticated
  using (true);

drop policy if exists "property_images_admin_write" on public.property_images;
create policy "property_images_admin_write" on public.property_images
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read" on public.site_content
  for select to anon, authenticated
  using (true);

drop policy if exists "site_content_admin_write" on public.site_content;
create policy "site_content_admin_write" on public.site_content
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('property-images', 'property-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "property_images_bucket_public_read" on storage.objects;
create policy "property_images_bucket_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'property-images');

drop policy if exists "property_images_bucket_admin_insert" on storage.objects;
create policy "property_images_bucket_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'property-images' and (select public.is_admin()));

drop policy if exists "property_images_bucket_admin_update" on storage.objects;
create policy "property_images_bucket_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'property-images' and (select public.is_admin()))
  with check (bucket_id = 'property-images' and (select public.is_admin()));

drop policy if exists "property_images_bucket_admin_delete" on storage.objects;
create policy "property_images_bucket_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'property-images' and (select public.is_admin()));
