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

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null default '',
  title text not null,
  excerpt text not null default '',
  category text not null default '',
  image_url text not null default '',
  article_date text not null default '',
  read_time text not null default '',
  content text not null default '',
  meta_title text not null default '',
  meta_description text not null default '',
  meta_keywords text not null default '',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts
  add column if not exists slug text not null default '',
  add column if not exists title text not null default '',
  add column if not exists excerpt text not null default '',
  add column if not exists category text not null default '',
  add column if not exists image_url text not null default '',
  add column if not exists article_date text not null default '',
  add column if not exists read_time text not null default '',
  add column if not exists content text not null default '',
  add column if not exists meta_title text not null default '',
  add column if not exists meta_description text not null default '',
  add column if not exists meta_keywords text not null default '',
  add column if not exists published boolean not null default false,
  add column if not exists sort_order integer not null default 0,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

with slug_bases as (
  select
    id,
    coalesce(
      nullif(btrim(slug), ''),
      nullif(trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g')), ''),
      'article'
    ) as base_slug
  from public.blog_posts
),
ranked_slugs as (
  select
    id,
    base_slug,
    row_number() over (partition by base_slug order by created_at, id) as duplicate_number
  from slug_bases
)
update public.blog_posts as post
set
  slug = case
    when ranked_slugs.duplicate_number = 1 then ranked_slugs.base_slug
    else ranked_slugs.base_slug || '-' || left(post.id::text, 8)
  end,
  meta_title = coalesce(nullif(btrim(post.meta_title), ''), nullif(btrim(post.title), ''), 'Travel article'),
  meta_description = coalesce(nullif(btrim(post.meta_description), ''), btrim(post.excerpt), ''),
  meta_keywords = coalesce(nullif(btrim(post.meta_keywords), ''), btrim(post.category), '')
from ranked_slugs
where ranked_slugs.id = post.id;

create unique index if not exists blog_posts_slug_unique
  on public.blog_posts (slug);

alter table public.blog_posts enable row level security;

grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;

drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read" on public.blog_posts
  for select to anon, authenticated
  using (published = true);

drop policy if exists "blog_posts_admin_write" on public.blog_posts;
create policy "blog_posts_admin_write" on public.blog_posts
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create index if not exists blog_posts_public_order_idx
  on public.blog_posts (published, sort_order, created_at desc);

insert into public.blog_posts
  (id, slug, title, excerpt, category, image_url, article_date, read_time, content, meta_title, meta_description, meta_keywords, published, sort_order)
values
  ('90f3c1b2-01a1-4f4f-9f01-000000000001', 'delicious-dining-restful-escapes-hanalei-bay-tropical-lagoons', 'Delicious Dining & Restful Escapes at Hanalei Bay & Tropical Lagoons', 'Discover why tropical culinary traditions and serene oceanfront villas are transforming luxury vacationing in 2026.', 'Culinary Travel', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80', 'February 20, 2026', '4 min read', E'Travelers today are seeking more than just sunshine; they are looking for immersive cultural and gastronomic journeys that nourish both body and spirit.\n\nFrom farm-to-table coastal eateries to secluded reef dining over candlelit lagoons, the blend of fresh organic ingredients and breathtaking oceanic views creates an unforgettable retreat.\n\nAt GQ Travel & Hotels, we handpick accommodations that feature world-class dining programs, private chefs, and effortless access to local culinary gems.', 'Delicious Dining & Tropical Lagoon Escapes', 'Discover tropical culinary traditions and serene oceanfront villas for an unforgettable luxury vacation.', 'culinary travel, tropical escapes, Hanalei Bay, luxury villas', true, 1),
  ('90f3c1b2-01a1-4f4f-9f01-000000000002', 'scenic-check-in-spots-phuket-zanzibar', 'Top 10 Most Scenic Check-in Spots in Phuket & Zanzibar', 'Explore the most photogenic viewpoints, turquoise sandbanks, and historic architectural corners across these two iconic islands.', 'Destination Guide', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 'January 28, 2026', '5 min read', E'Whether you are strolling through the UNESCO-listed coral stone alleyways of Stone Town or taking in sunset over Promthep Cape, both Zanzibar and Phuket provide incomparable scenic wonder.\n\nIn Zanzibar, the Nakupenda sandbank appears like a mirage during low tide, surrounded by crystalline waters perfect for swimming and fresh seafood grills.\n\nIn Phuket, hillside villas offer bird’s-eye panoramas over the Andaman Sea, where contemporary architecture frames the dramatic coastline.\n\nOur team coordinates private island-hopping catamarans and expert local guides to ensure you experience these highlights away from the crowds.', 'Scenic Check-in Spots in Phuket & Zanzibar', 'Explore photogenic viewpoints, turquoise sandbanks, and historic corners in Phuket and Zanzibar.', 'Phuket travel, Zanzibar travel, scenic destinations, island holidays', true, 2),
  ('90f3c1b2-01a1-4f4f-9f01-000000000003', 'luxury-services-navagio-beach-private-jet-charters', 'Top 5 Newest Luxury Services at Navagio Beach & Private Jet Charters', 'How flexible private aviation and bespoke coastal transfers are making remote destinations more accessible than ever.', 'VIP Aviation', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', 'January 15, 2026', '3 min read', E'Navigating Europe’s most dramatic coastal coves traditionally meant long ferry transfers and rigid timetables. In 2026, private aviation has rewritten the rules.\n\nWith direct charters landing at regional airfields, travelers can bypass international terminal congestion and step straight onto a waiting helicopter or yacht.\n\nGQ Travel & Hotels provides turnkey private jet charters from Germany with personalized departure times, luxury ground transport, and complete baggage handling.', 'Private Jet Charters & Luxury Coastal Travel', 'Discover how private aviation and bespoke transfers make remote coastal destinations easier to reach.', 'private jet charter, luxury travel, Navagio Beach, coastal transfers', true, 3)
on conflict (id) do nothing;

notify pgrst, 'reload schema';
