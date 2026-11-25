-- Additive property-management setup for the existing properties table.
-- Existing property and booking data is preserved.
alter table public.properties
  add column if not exists postal_code text not null default '';

alter table public.properties
  add column if not exists room_pricing jsonb not null default '{}'::jsonb;

alter table public.properties
  add column if not exists slug text not null default '',
  add column if not exists title text not null default '',
  add column if not exists property_type text not null default 'Hotel',
  add column if not exists short_description text not null default '',
  add column if not exists max_adults integer not null default 2,
  add column if not exists max_children integer not null default 0,
  add column if not exists max_guests integer not null default 2,
  add column if not exists featured_image text not null default '',
  add column if not exists featured boolean not null default false,
  add column if not exists status text not null default 'draft',
  add column if not exists currency text not null default 'EUR';

-- Older installations have a required title column that the property manager
-- now fills with the same value as name.
alter table public.properties
  alter column title set default '';

alter table public.property_images
  add column if not exists sort_order integer not null default 0,
  add column if not exists url text not null default '';

create table if not exists public.property_amenities (
  id uuid primary key default gen_random_uuid(),
  property_id text not null,
  amenity_name text not null,
  created_at timestamptz not null default now()
);

create index if not exists property_amenities_property_id_idx
  on public.property_amenities (property_id);

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

alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.property_amenities enable row level security;

drop policy if exists "properties_public_read" on public.properties;
create policy "properties_public_read" on public.properties
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "properties_admin_write" on public.properties;
create policy "properties_admin_write" on public.properties
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "property_images_public_read" on public.property_images;
create policy "property_images_public_read" on public.property_images
  for select to anon, authenticated
  using (
    exists (
      select 1
      from public.properties
      where properties.id::text = property_images.property_id::text
        and properties.status = 'published'
    )
  );

drop policy if exists "property_images_admin_write" on public.property_images;
create policy "property_images_admin_write" on public.property_images
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "property_amenities_public_read" on public.property_amenities;
create policy "property_amenities_public_read" on public.property_amenities
  for select to anon, authenticated
  using (
    exists (
      select 1
      from public.properties
      where properties.id::text = property_amenities.property_id::text
        and properties.status = 'published'
    )
  );

drop policy if exists "property_amenities_admin_write" on public.property_amenities;
create policy "property_amenities_admin_write" on public.property_amenities
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-images',
  'property-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

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
