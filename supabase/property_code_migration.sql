begin;

alter table public.properties
  add column if not exists property_code text;

create sequence if not exists public.properties_property_code_seq;

with code_offset as (
  select coalesce(
    max(substring(property_code from 2)::bigint)
      filter (where property_code ~ '^P[0-9]+$'),
    0
  ) as last_code
  from public.properties
),
numbered_properties as (
  select
    properties.id,
    row_number() over (order by properties.created_at nulls first, properties.id)
      + code_offset.last_code as code_number
  from public.properties
  cross join code_offset
  where properties.property_code is null or btrim(properties.property_code) = ''
)
update public.properties
set property_code = 'P' || lpad(numbered_properties.code_number::text, 4, '0')
from numbered_properties
where public.properties.id = numbered_properties.id;

do $$
declare
  last_code bigint;
begin
  select coalesce(
    max(substring(property_code from 2)::bigint)
      filter (where property_code ~ '^P[0-9]+$'),
    0
  )
  into last_code
  from public.properties;

  perform setval(
    'public.properties_property_code_seq',
    greatest(last_code, 1),
    last_code > 0
  );
end;
$$;

create or replace function public.assign_property_code()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.property_code is null or btrim(new.property_code) = '' then
    new.property_code := 'P' || lpad(nextval('public.properties_property_code_seq')::text, 4, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists properties_assign_property_code on public.properties;
create trigger properties_assign_property_code
before insert on public.properties
for each row execute function public.assign_property_code();

create unique index if not exists properties_property_code_unique
  on public.properties (property_code);

commit;
