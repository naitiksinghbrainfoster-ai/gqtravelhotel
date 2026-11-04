import React, { useMemo, useState } from 'react';
import { ArrowUpRight, MapPin, RotateCcw, Star } from 'lucide-react';
import { Property } from '../../data/travelData';
import { HomeContent, hotelApartmentsContentDefaults, homeContentValue } from '../../lib/homeContent';

type StayFilter = 'all' | 'Hotel' | 'Apartment' | 'Villa' | 'Resort';

interface FeaturedStaysSectionProps {
  properties: Property[];
  loading?: boolean;
  error?: string;
  searchTerm?: string;
  onSelectProperty: (property: Property) => void;
  content?: HomeContent;
}

const filters: { id: StayFilter; key: string }[] = [
  { id: 'all', key: 'hotel_apartments_filter_all' },
  { id: 'Hotel', key: '' },
  { id: 'Apartment', key: 'hotel_apartments_filter_apartments' },
  { id: 'Villa', key: 'hotel_apartments_filter_villas' },
  { id: 'Resort', key: 'hotel_apartments_filter_resorts' },
];

const FeaturedStaysSection: React.FC<FeaturedStaysSectionProps> = ({
  properties,
  loading = false,
  error = '',
  searchTerm = '',
  onSelectProperty,
  content,
}) => {
  const [activeFilter, setActiveFilter] = useState<StayFilter>('all');
  const [minimumPrice, setMinimumPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');
  const [minimumRating, setMinimumRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const amenities = useMemo(
    () => [...new Set(properties.flatMap((property) => property.amenities).filter(Boolean))].sort(),
    [properties],
  );
  const priceBounds = useMemo(
    () => ({
      minimum: properties.length ? Math.min(...properties.map((property) => property.pricePerNight)) : 0,
      maximum: properties.length ? Math.max(...properties.map((property) => property.pricePerNight)) : 0,
    }),
    [properties],
  );
  const filteredProperties = useMemo(
    () =>
      properties.filter((property) => {
        const categoryMatches = activeFilter === 'all' || property.category === activeFilter;
        const minimumPriceMatches = minimumPrice === '' || property.pricePerNight >= Number(minimumPrice);
        const maximumPriceMatches = maximumPrice === '' || property.pricePerNight <= Number(maximumPrice);
        const ratingMatches = minimumRating === 0 || property.rating >= minimumRating;
        const amenitiesMatch = selectedAmenities.every((amenity) => property.amenities.includes(amenity));

        return categoryMatches && minimumPriceMatches && maximumPriceMatches && ratingMatches && amenitiesMatch;
      }),
    [activeFilter, maximumPrice, minimumPrice, minimumRating, properties, selectedAmenities],
  );

  const resetFilters = () => {
    setActiveFilter('all');
    setMinimumPrice('');
    setMaximumPrice('');
    setMinimumRating(0);
    setSelectedAmenities([]);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  return (
    <section id="stays" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 lg:px-10">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-slate-950">Filter stays</h3>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {filters.map((filter) => {
              const count = filter.id === 'all'
                ? properties.length
                : properties.filter((property) => property.category === filter.id).length;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                  className={`flex shrink-0 items-center justify-between gap-5 rounded-xl px-4 py-3 text-left text-sm font-semibold transition lg:w-full ${
                    activeFilter === filter.id
                      ? 'bg-teal-800 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-900'
                  }`}
                >
                  <span>{filter.key
                    ? homeContentValue(content, filter.key, hotelApartmentsContentDefaults[filter.key])
                    : 'Hotels'}</span>
                  <span className={`text-xs ${activeFilter === filter.id ? 'text-teal-100' : 'text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <h4 className="text-sm font-bold text-slate-900">Price per night</h4>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="text-xs font-medium text-slate-600">
                Min (€)
                <input
                  type="number"
                  min={priceBounds.minimum}
                  max={maximumPrice || priceBounds.maximum}
                  value={minimumPrice}
                  onChange={(event) => setMinimumPrice(event.target.value)}
                  placeholder={String(priceBounds.minimum)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                />
              </label>
              <label className="text-xs font-medium text-slate-600">
                Max (€)
                <input
                  type="number"
                  min={minimumPrice || priceBounds.minimum}
                  value={maximumPrice}
                  onChange={(event) => setMaximumPrice(event.target.value)}
                  placeholder={String(priceBounds.maximum)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <h4 className="text-sm font-bold text-slate-900">Guest rating</h4>
            <div className="mt-3 space-y-2">
              {[0, 4, 4.5].map((rating) => (
                <label key={rating} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="minimum-rating"
                    checked={minimumRating === rating}
                    onChange={() => setMinimumRating(rating)}
                    className="accent-teal-800"
                  />
                  {rating === 0 ? 'Any rating' : `${rating}+ stars`}
                </label>
              ))}
            </div>
          </div>

          {amenities.length > 0 && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h4 className="text-sm font-bold text-slate-900">Amenities</h4>
              <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
                {amenities.map((amenity) => (
                  <label key={amenity} className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="mt-0.5 accent-teal-800"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        <div className="min-w-0">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
              {homeContentValue(content, 'hotel_apartments_stays_label', hotelApartmentsContentDefaults.hotel_apartments_stays_label)}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {homeContentValue(content, 'hotel_apartments_stays_title', hotelApartmentsContentDefaults.hotel_apartments_stays_title)}
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              {homeContentValue(content, 'hotel_apartments_stays_description', hotelApartmentsContentDefaults.hotel_apartments_stays_description)}
            </p>
          </div>

        {loading && (
          <p role="status" className="mt-10 rounded-2xl bg-slate-50 p-8 text-center text-slate-600">
            {homeContentValue(content, 'hotel_apartments_loading', hotelApartmentsContentDefaults.hotel_apartments_loading)}
          </p>
        )}
        {!loading && error && (
          <p role="alert" className="mt-10 rounded-2xl bg-rose-50 p-8 text-center text-rose-800">
            {error}
          </p>
        )}
        {!loading && !error && (
        <>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProperties.map((property) => (
            <article
              key={property.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-teal-800/30 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={property.image}
                  alt={property.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
                  {property.category}
                </span>
                {property.rating > 0 && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-950/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                  <Star aria-hidden="true" className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {property.rating.toFixed(1)}
                </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-teal-800" />
                  <span>{property.location}</span>
                </p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-slate-950">
                  {property.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                  {property.description}
                </p>
                <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-4 mt-5">
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {homeContentValue(content, 'hotel_apartments_card_price_label', hotelApartmentsContentDefaults.hotel_apartments_card_price_label)}
                    </span>
                    <span className="font-display text-xl font-bold text-teal-900">
                      €{property.pricePerNight}
                    </span>
                    <span className="text-xs text-slate-500"> {homeContentValue(content, 'hotel_apartments_card_night_label', hotelApartmentsContentDefaults.hotel_apartments_card_night_label)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectProperty(property)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-900 transition hover:bg-teal-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                  >
                    {homeContentValue(content, 'hotel_apartments_card_book_label', hotelApartmentsContentDefaults.hotel_apartments_card_book_label)}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <p className="mt-10 rounded-2xl bg-slate-50 p-8 text-center text-slate-600">
            {properties.length === 0 && searchTerm
              ? `No stays match “${searchTerm}”. Try another destination or city.`
              : properties.length === 0
              ? homeContentValue(content, 'hotel_apartments_empty_stays', hotelApartmentsContentDefaults.hotel_apartments_empty_stays)
              : 'No stays match these filters. Try changing or resetting your filters.'}
          </p>
        )}
        </>
        )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStaysSection;
