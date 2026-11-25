alter table public.bookings
  add column if not exists booking_number text not null default '',
  add column if not exists property_name text not null default '',
  add column if not exists adults integer not null default 1,
  add column if not exists children integer not null default 0,
  add column if not exists guests integer not null default 1,
  add column if not exists room_type text not null default '',
  add column if not exists rate_type text not null default '',
  add column if not exists booking_status text not null default 'pending',
  add column if not exists status text not null default 'pending',
  add column if not exists currency text not null default 'EUR',
  add column if not exists total_price numeric(10, 2),
  add column if not exists payment_status text not null default 'pending',
  add column if not exists paypal_order_id text,
  add column if not exists paypal_capture_id text,
  add column if not exists payment_session_token_hash text,
  add column if not exists payment_paid_at timestamptz;

update public.bookings
set booking_number = 'GQ-' || upper(substr(replace(id::text, '-', ''), 1, 12))
where booking_number = '';

create unique index if not exists bookings_booking_number_unique
  on public.bookings (booking_number)
  where booking_number <> '';

create unique index if not exists bookings_paypal_order_id_unique
  on public.bookings (paypal_order_id)
  where paypal_order_id is not null;

alter table public.properties
  add column if not exists is_saarbruecken boolean not null default false;
