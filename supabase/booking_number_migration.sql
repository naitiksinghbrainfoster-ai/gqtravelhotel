alter table public.bookings
  add column if not exists booking_number text not null default '';

update public.bookings
set booking_number = 'GQ-' || upper(substr(replace(id::text, '-', ''), 1, 12))
where booking_number = '';

create unique index if not exists bookings_booking_number_unique
  on public.bookings (booking_number)
  where booking_number <> '';
