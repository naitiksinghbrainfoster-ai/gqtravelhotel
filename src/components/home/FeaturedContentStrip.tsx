import React from 'react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

interface FeaturedContentItem {
  id: string;
  title: string;
  location: string;
  country: string;
  image: string;
  tagline: string;
}

interface FeaturedContentStripProps {
  onSelectItem: (item: FeaturedContentItem) => void;
  content?: HomeContent;
}

export const FeaturedContentStrip: React.FC<FeaturedContentStripProps> = ({ onSelectItem, content }) => {
  // 4 Featured cards exactly matching the user's reference screenshot (image_0c27b0aa.png)
  const defaultItems: FeaturedContentItem[] = [
    {
      id: 'london-millennium',
      title: 'Millennium Bridge',
      location: 'London, United Kingdom',
      country: 'United Kingdom',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      tagline: 'Iconic Thames walkway framing St. Paul’s Cathedral'
    },
    {
      id: 'venice-rialto',
      title: 'Rialto Bridge',
      location: 'Venice, Italy',
      country: 'Italy',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
      tagline: 'Gondolas drifting along the historic Grand Canal'
    },
    {
      id: 'thailand-cove',
      title: 'Phi Phi Coastal Cove',
      location: 'Thailand, Asia',
      country: 'Thailand',
      image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80',
      tagline: 'Crystalline waters & towering emerald limestone cliffs'
    },
    {
      id: 'berlin-museum',
      title: 'Museumsinsel & Cathedral',
      location: 'Berlin, Germany',
      country: 'Germany',
      image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80',
      tagline: 'UNESCO world heritage island & majestic dome architecture'
    }
  ];
  const items = defaultItems.map((item) => ({
    ...item,
    title: homeContentValue(content, `home_featured_${item.id}_title`, item.title),
    location: homeContentValue(content, `home_featured_${item.id}_location`, item.location),
    country: homeContentValue(content, `home_featured_${item.id}_country`, item.country),
    tagline: homeContentValue(content, `home_featured_${item.id}_tagline`, item.tagline),
    image: homeContentValue(content, `home_featured_${item.id}_image`, item.image),
  }));

  return (
    <section className="py-16 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching the "Content" header in image_0c27b0aa.png */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              <span>{homeContentValue(content, 'home_featured_label', 'Curated Highlights')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {homeContentValue(content, 'home_featured_title', 'Featured Global Escapes')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {homeContentValue(content, 'home_featured_description', 'Explore legendary landmarks and scenic wonders arranged by GQ Travel & Hotels.')}
            </p>
          </div>

          <div className="text-xs text-slate-400 hidden sm:block">
            {homeContentValue(content, 'home_featured_meta', 'Handpicked Itineraries · 2026')}
          </div>
        </div>

        {/* 4 Vertical Rounded Cards matching image_0c27b0aa.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 relative aspect-3/4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-slate-200/60"
            >
              {/* Background Photo */}
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

              {/* Top pill/badge */}
              <div className="absolute top-3.5 right-3.5">
                <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide border border-white/20">
                  {item.country}
                </span>
              </div>

              {/* Content overlay at bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-base sm:text-lg leading-snug group-hover:text-teal-300 transition-colors drop-shadow-xs">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-teal-300 font-medium">
                  <span>{homeContentValue(content, 'home_featured_cta', 'View Package & Flights')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
