import { supabase } from './supabase';
import { NewsArticle, Property, PROPERTIES } from '../data/travelData';
import { websiteContentDefaults } from './homeContent';

export type SiteContent = Record<string, string>;

export interface PublicBlogArticle extends NewsArticle {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

function normalizeRoomPricing(value: unknown): Property['roomPricing'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const pricing = value as Record<string, unknown>;
  const normalizeTable = (tableValue: unknown): { columns: string[]; rows: string[][] } | undefined => {
    if (!tableValue || typeof tableValue !== 'object' || Array.isArray(tableValue)) return undefined;
    const table = tableValue as Record<string, unknown>;
    if (!Array.isArray(table.columns) || !Array.isArray(table.rows)) return undefined;
    const columns = table.columns.map((column) => column == null ? '' : String(column));
    return {
      columns,
      rows: table.rows
        .filter(Array.isArray)
        .map((row) => columns.map((_, index) => {
          const cell = row[index];
          return cell == null ? '' : String(cell);
        })),
    };
  };
  if (Array.isArray(pricing.columns) && Array.isArray(pricing.rows)) {
    const table = normalizeTable(pricing);
    const extraRoomPricing = normalizeTable(pricing.extra_room_pricing);
    return {
      ...(table ?? { columns: [], rows: [] }),
      ...(extraRoomPricing ? { extraRoomPricing } : {}),
    };
  }

  const legacyRows = [
    ['single', 'Single room'],
    ['double', 'Double room'],
    ['triple', 'Triple room'],
    ['apartment_triple', 'Apartment triple room'],
  ].flatMap(([key, label]) => {
    const value = pricing[key];
    if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
    const rates = value as Record<string, unknown>;
    return [[
      label,
      rates.standard == null ? '' : String(rates.standard),
      rates.comfort == null ? '' : String(rates.comfort),
      rates.extra_person == null ? '' : String(rates.extra_person),
    ]];
  });
  return legacyRows.length
    ? {
        columns: ['Room type', 'Standard (€)', 'Comfort (€)', 'Extra person (€)'],
        rows: legacyRows,
      }
    : undefined;
}

function mapPublicBlogArticle(row: Record<string, unknown>): PublicBlogArticle {
  if (
    typeof row.id !== 'string'
    || typeof row.slug !== 'string'
    || typeof row.title !== 'string'
    || typeof row.excerpt !== 'string'
    || typeof row.category !== 'string'
    || typeof row.content !== 'string'
  ) {
    throw new Error('A published blog article is missing required content.');
  }

  const createdAt = typeof row.created_at === 'string' ? row.created_at : '';
  const articleDate = typeof row.article_date === 'string' && row.article_date
    ? row.article_date
    : createdAt
      ? new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : '';
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    image: typeof row.image_url === 'string' ? row.image_url : '',
    date: articleDate,
    readTime: typeof row.read_time === 'string' ? row.read_time : '',
    content: row.content.split(/\n\s*\n/).filter(Boolean),
    metaTitle: typeof row.meta_title === 'string' && row.meta_title ? row.meta_title : row.title,
    metaDescription: typeof row.meta_description === 'string' && row.meta_description ? row.meta_description : row.excerpt,
    metaKeywords: typeof row.meta_keywords === 'string' && row.meta_keywords
      ? row.meta_keywords
      : row.category,
  };
}

export async function fetchPublicBlogPosts(): Promise<PublicBlogArticle[] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, category, image_url, article_date, read_time, content, meta_title, meta_description, meta_keywords, created_at')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => mapPublicBlogArticle(row));
}

export async function fetchPublicBlogArticle(slug: string): Promise<PublicBlogArticle | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, category, image_url, article_date, read_time, content, meta_title, meta_description, meta_keywords, created_at')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) throw error;
  return data ? mapPublicBlogArticle(data) : null;
}

export async function fetchPublicSiteContent(): Promise<SiteContent> {
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('site_content')
    .select('key, value');

  if (error) throw error;

  const content = Object.fromEntries(
    (data ?? []).flatMap((row) =>
      typeof row.key === 'string' && typeof row.value === 'string'
        ? [[row.key, row.value]]
        : [],
    ),
  );
  const contentWithDefaults = { ...websiteContentDefaults, ...content };
  for (const [key, fallback] of Object.entries(websiteContentDefaults)) {
    if (!content[key]?.trim()) contentWithDefaults[key] = fallback;
  }
  return contentWithDefaults;
}

export async function fetchPublicProperties(): Promise<Property[]> {
  if (!supabase) return PROPERTIES;

  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(image_url, sort_order), property_amenities(amenity_name)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!data?.length) return [];

  return data.map((row): Property => {
    const category = ['Hotel', 'Apartment', 'Villa', 'Resort'].includes(row.property_type)
      ? row.property_type
      : 'Hotel';
    const city = typeof row.city === 'string' ? row.city : '';
    const country = typeof row.country === 'string' ? row.country : '';
    const postalCode = typeof row.postal_code === 'string' ? row.postal_code : '';
    const address = [row.address, postalCode].filter((part) => typeof part === 'string' && part).join(', ');
    const gallery = Array.isArray(row.property_images)
      ? [...row.property_images].sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
      : [];
    const amenities = Array.isArray(row.property_amenities)
      ? row.property_amenities.flatMap((item: { amenity_name?: unknown }) =>
        typeof item.amenity_name === 'string' ? [item.amenity_name] : [],
      )
      : [];
    const rating = Number(row.rating);
    const reviewsCount = Number(row.reviews_count);
    const location = [city, country].filter(Boolean).join(', ');
    const slug = typeof row.slug === 'string' && row.slug.trim()
      ? row.slug.trim()
      : String(row.name || 'property')
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || String(row.id);
    const roomPricing = normalizeRoomPricing(row.room_pricing);
    return {
      id: String(row.id),
      slug,
      title: String(row.name || 'Untitled property'),
      location: location || address,
      city,
      country,
      pricePerNight: Number(row.price_per_night) || 0,
      rating: Number.isFinite(rating) ? rating : 0,
      reviewsCount: Number.isFinite(reviewsCount) ? reviewsCount : 0,
      category,
      image: String(row.featured_image || gallery[0]?.image_url || ''),
      description: typeof row.short_description === 'string' && row.short_description
        ? row.short_description
        : typeof row.description === 'string' ? row.description : '',
      amenities,
      isSaarbruecken: `${city} ${location} ${address}`.toLowerCase().includes('saarbrück') || `${city} ${location} ${address}`.toLowerCase().includes('saarbrucken'),
      address: address || undefined,
      gallery: gallery.flatMap((item: { image_url?: unknown }) =>
        typeof item.image_url === 'string' ? [item.image_url] : [],
      ),
      fullDescription: typeof row.description === 'string' ? row.description : undefined,
      roomPricing,
    };
  });
}
