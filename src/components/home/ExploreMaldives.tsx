import React, { useState } from 'react';
import { ArrowRight, Compass, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { DESTINATIONS, Destination } from '../../data/travelData';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

interface ExploreMaldivesProps {
  onSelectDestination: (dest: Destination) => void;
  onOpenBooking: () => void;
  content?: HomeContent;
}

export const ExploreMaldives: React.FC<ExploreMaldivesProps> = ({ onSelectDestination, onOpenBooking, content }) => {
  const [selectedDestId, setSelectedDestId] = useState<string>('maldives');

  const destinations = DESTINATIONS.map((destination) => ({
    ...destination,
    name: homeContentValue(content, `home_destination_${destination.id}_name`, destination.name),
    description: homeContentValue(content, `home_destination_${destination.id}_description`, destination.description),
    image: homeContentValue(content, `home_destination_${destination.id}_image`, destination.image),
  }));
  const currentDest = destinations.find((d) => d.id === selectedDestId) || destinations[0];

  return (
    <section id="destinations" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background with panoramic image and gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentDest.image}
          alt={currentDest.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Destination selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-white/10 scrollbar-none text-xs">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedDestId(dest.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                selectedDestId === dest.id
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {dest.name}
            </button>
          ))}
        </div>

        {/* Content Split: Headline & Narrative on Left, 3 Mini Cards on Right (matching Screenshot 2 layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Big Display Title, Description & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{homeContentValue(content, 'home_destinations_label', 'Signature Destination Spotlight')}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-none drop-shadow-md">
              {homeContentValue(content, 'home_destinations_title', 'Explore')} {currentDest.name}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
              {currentDest.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Best: {currentDest.bestSeason}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Flight: {currentDest.flightTimeFromGermany}</span>
              </div>
            </div>

            {/* Bullets */}
            <div className="space-y-1.5">
              {currentDest.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectDestination(currentDest)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-all shadow-lg active:scale-95"
              >
                <span>{homeContentValue(content, 'home_destinations_itinerary_cta', 'Request Custom Itinerary')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/20"
              >
                <span>{homeContentValue(content, 'home_destinations_booking_cta', 'Book Hotel / Resort')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Vertical Mini Preview Cards (matching Screenshot 2 layout!) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {destinations.filter((d) => d.id !== selectedDestId).slice(0, 3).map((subDest) => (
              <div
                key={subDest.id}
                onClick={() => setSelectedDestId(subDest.id)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/15 hover:border-teal-400/60 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-3/4 w-full overflow-hidden bg-slate-800">
                  <img
                    src={subDest.image}
                    alt={subDest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] text-teal-300 font-semibold uppercase tracking-wider block">
                      {subDest.country}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-teal-200 transition-colors">
                      {subDest.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
