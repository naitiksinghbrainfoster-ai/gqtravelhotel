import React, { useState } from 'react';
import { Star, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Property, PROPERTIES } from '../../data/travelData';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

interface TopBookNowProps {
  properties?: Property[];
  loading?: boolean;
  error?: string;
  title?: string;
  description?: string;
  content?: HomeContent;
  onSelectProperty: (property: Property) => void;
}

export const TopBookNow: React.FC<TopBookNowProps> = ({
  properties = PROPERTIES,
  loading = false,
  error = '',
  title = 'TOP BOOK NOW',
  description = 'Handpicked hotels, serviced apartments in Saarbrücken, and luxury worldwide villas.',
  content,
  onSelectProperty,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProperties = properties.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'saarbruecken') return item.isSaarbruecken;
    if (filter === 'villas') return item.category === 'Villa';
    if (filter === 'resorts') return item.category === 'Resort';
    if (filter === 'apartments') return item.category === 'Apartment';
    return true;
  });

  return (
    <section id="accommodations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screenshot 1 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
              {homeContentValue(content, 'home_properties_eyebrow', 'Featured Stays & Holiday Rentals')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {description}
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-white text-teal-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Accommodations
            </button>
            <button
              onClick={() => setFilter('saarbruecken')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'saarbruecken'
                  ? 'bg-white text-teal-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Saarbrücken Apartments
            </button>
            <button
              onClick={() => setFilter('villas')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'villas'
                  ? 'bg-white text-teal-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Luxury Villas
            </button>
            <button
              onClick={() => setFilter('resorts')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'resorts'
                  ? 'bg-white text-teal-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overwater &amp; Resorts
            </button>
          </div>
        </div>

        {/* 8 Cards in a 4-Column Grid matching Screenshot 1 */}
        {loading && (
          <p role="status" className="rounded-2xl bg-slate-50 p-8 text-center text-slate-600">
            Loading available stays…
          </p>
        )}
        {!loading && error && (
          <p role="alert" className="rounded-2xl bg-rose-50 p-8 text-center text-rose-800">
            {error}
          </p>
        )}
        {!loading && !error && filteredProperties.length === 0 && (
          <p className="rounded-2xl bg-slate-50 p-8 text-center text-slate-600">
            {properties.length === 0
              ? 'No published stays are available right now. Please check back soon.'
              : 'No stays match this category yet. Choose another filter to explore.'}
          </p>
        )}
        {!loading && !error && filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="group flex flex-col rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-teal-700/30 transition-all duration-300"
            >
              {/* Image Container with Aspect Ratio */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                <img
                  src={property.image}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Rating Badge */}
                {property.rating > 0 && (
                <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="tabular-nums">{property.rating.toFixed(1)}</span>
                </div>
                )}

                {/* Special Tag for Saarbrücken */}
                {property.isSaarbruecken && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-teal-800 text-white text-[11px] font-bold shadow-xs">
                    Direct Saarbrücken Office
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                    <MapPin className="w-3 h-3 text-teal-700 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-800 transition-colors line-clamp-1">
                    {property.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Amenities pills / clean unboxed list */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">From</span>
                    <span className="text-lg font-extrabold text-teal-900 tabular-nums">
                      €{property.pricePerNight}
                    </span>
                    <span className="text-[11px] text-slate-500"> / night</span>
                  </div>

                  <button
                    onClick={() => onSelectProperty(property)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-800 hover:text-white rounded-lg transition-colors active:scale-95"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Specific City Tax & Commission Note */}
                {property.isSaarbruecken && (
                  <div className="mt-2 text-[10px] text-teal-700 bg-teal-50/60 p-1.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>3.5% Saarbrücken City Tax + €3.99/day service</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {/* View All / Explore More CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const el = document.getElementById('destinations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-teal-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <span>{homeContentValue(content, 'home_properties_cta', 'Explore All Worldwide Destinations')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
