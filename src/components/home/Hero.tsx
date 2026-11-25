import React, { useEffect, useState } from 'react';
import { Search, Calendar, Users, MapPin, Plane, Hotel, Car, Compass, Navigation, Ship } from 'lucide-react';
import { homeContentValue, homeHeroDefaults, HomeContent } from '../../lib/homeContent';

const kickerLetterDelayMs = 75;
const letterAnimationDurationMs = 350;
const kickerPauseMs = 1800;
const getDateOffset = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AnimatedTabLabel: React.FC<{ label: string; delayStepMs?: number }> = ({
  label,
  delayStepMs = 35,
}) => (
  <>
    <span className="sr-only">{label}</span>
    <span aria-hidden="true">
      {Array.from(label).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="hero-tab-letter"
          style={{ animationDelay: `${index * delayStepMs}ms` }}
        >
          {letter === ' ' ? '\u00a0' : letter}
        </span>
      ))}
    </span>
  </>
);

const LoopingAnimatedLabel: React.FC<{ label: string; delayStepMs: number }> = ({
  label,
  delayStepMs,
}) => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const revealDuration = Array.from(label).length * delayStepMs + letterAnimationDurationMs;
    const timeoutId = window.setTimeout(
      () => setCycle((currentCycle) => currentCycle + 1),
      revealDuration + kickerPauseMs,
    );

    return () => window.clearTimeout(timeoutId);
  }, [cycle, delayStepMs, label]);

  return <AnimatedTabLabel key={cycle} label={label} delayStepMs={delayStepMs} />;
};

interface HeroProps {
  content?: HomeContent;
  onSearch: (params: { tab: string; location: string; checkIn: string; checkOut: string; guests: number }) => void;
  onNavigate: (path: string) => void;
  onOpenTransferModal: () => void;
  onOpenServiceQuote: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  content,
  onSearch, 
  onNavigate,
  onOpenTransferModal, 
  onOpenServiceQuote 
}) => {
  const heroTitle = homeContentValue(content, 'home_hero_title', homeHeroDefaults.home_hero_title);
  const heroSubtitle = homeContentValue(content, 'home_hero_subtitle', homeHeroDefaults.home_hero_subtitle);
  const heroImage = homeContentValue(content, 'home_hero_image', homeHeroDefaults.home_hero_image);
  const [activeTab, setActiveTab] = useState<'hotels' | 'flights' | 'transfers' | 'packages' | 'jet' | 'cruise'>('hotels');
  const [location, setLocation] = useState('Saarbrücken, Germany');
  const [checkIn, setCheckIn] = useState(() => getDateOffset(2));
  const [checkOut, setCheckOut] = useState(() => getDateOffset(6));
  const [guests, setGuests] = useState(2);
  const [flightOrigin, setFlightOrigin] = useState('Frankfurt (FRA)');
  const [flightDestination, setFlightDestination] = useState('Accra (ACC)');
  const [flightDeparture, setFlightDeparture] = useState(() => getDateOffset(14));
  const [flightReturn, setFlightReturn] = useState(() => getDateOffset(21));
  const [flightPassengers, setFlightPassengers] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'flights') {
      onNavigate('/global-flight-booking');
      return;
    }
    if (activeTab === 'transfers') {
      onOpenTransferModal();
      return;
    }
    if (activeTab === 'jet') {
      onOpenServiceQuote('private-jet');
      return;
    }
    if (activeTab === 'cruise') {
      onNavigate('/cruise-booking');
      return;
    }
    onSearch({ tab: activeTab, location, checkIn, checkOut, guests });
    // Scroll smoothly to accommodations or results
    const el = document.getElementById('accommodations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-slate-50">
      {/* Hero banner image */}
      <div className="relative h-[360px] overflow-hidden bg-slate-900 sm:h-[360px] lg:h-[400px]">
        <img
          src={heroImage}
          alt="Luxury overwater bungalows and turquoise sea"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-slate-900/50" />

        {/* Floating Trust Indicators Top-Right in Hero */}
        <div className="absolute top-6 right-6 hidden md:flex items-center gap-3 z-10">
          <div className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20">
            {homeContentValue(content, 'home_hero_badge', homeHeroDefaults.home_hero_badge)}
          </div>
        </div>

        {/* Hero headings over the banner image */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-3 pt-6 text-center sm:px-4 sm:pt-8">
          <span className="mb-2 inline-block max-w-full text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-300 drop-shadow-xs sm:text-xs sm:tracking-widest">
            <LoopingAnimatedLabel label={homeContentValue(content, 'home_hero_kicker', homeHeroDefaults.home_hero_kicker)} delayStepMs={kickerLetterDelayMs} />
          </span>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-balance text-white drop-shadow-md sm:text-3xl lg:text-4xl">
            <AnimatedTabLabel label={heroTitle} delayStepMs={75} />
          </h1>
          <h2 className="mt-2 max-w-4xl text-lg font-extrabold leading-snug tracking-tight text-balance text-white drop-shadow-md sm:mt-1 sm:text-2xl sm:leading-tight lg:text-3xl">
            <AnimatedTabLabel label={heroSubtitle} delayStepMs={75} />
          </h2>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-20 w-full max-w-7xl px-3 pb-8 sm:-mt-28 sm:px-6 lg:px-8">
        {/* The Signature Search Card (Direct Reference to Screenshot 1 "Good Morning!" Floating Card) */}
        <div className="w-full max-w-7xl rounded-2xl border border-white/40 bg-white/95 p-4 shadow-2xl backdrop-blur-xl transition-all sm:rounded-3xl sm:p-8">
          {/* Interactive Navigation Tabs */}
          <div className="mb-4 grid grid-cols-2 items-stretch gap-2 border-b border-slate-100 pb-3 text-xs sm:mb-5 sm:flex sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => { setActiveTab('hotels'); setLocation('Saarbrücken, Germany'); }}
              className={`flex min-w-0 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2 text-center font-medium leading-tight transition-all sm:w-auto sm:px-3.5 ${
                activeTab === 'hotels'
                  ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                  : 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100 hover:border-teal-500'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <AnimatedTabLabel label="Hotels & Apartments" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/global-flight-booking')}
              className={`flex min-w-0 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2 text-center font-medium leading-tight transition-all sm:w-auto sm:px-3.5 ${
                activeTab === 'flights'
                  ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                  : 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100 hover:border-teal-500'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <AnimatedTabLabel label="Global Flight" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/airport-transfers-saarland')}
              className={`flex min-w-0 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2 text-center font-medium leading-tight transition-all sm:w-auto sm:px-3.5 ${
                activeTab === 'transfers'
                  ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                  : 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100 hover:border-teal-500'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <AnimatedTabLabel label="Airport Pick-Up & Drop-Off" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/holidays')}
              className={`flex min-w-0 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2 text-center font-medium leading-tight transition-all sm:w-auto sm:px-3.5 ${
                activeTab === 'packages'
                  ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                  : 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100 hover:border-teal-500'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <AnimatedTabLabel label="Holiday Packages" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/private-jet-rentals')}
              className={`flex min-w-0 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2 text-center font-medium leading-tight transition-all sm:w-auto sm:px-3.5 ${
                activeTab === 'jet'
                  ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                  : 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100 hover:border-teal-500'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <AnimatedTabLabel label="Private Jet Charter" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/cruise-booking')}
              className={`flex min-w-0 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-2 py-2 text-center font-medium leading-tight transition-all sm:w-auto sm:px-3.5 ${
                activeTab === 'cruise'
                  ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                  : 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100 hover:border-teal-500'
              }`}
            >
              <Ship className="w-3.5 h-3.5" />
              <AnimatedTabLabel label="Cruise" />
            </button>

          </div>

          {/* Search Inputs Grid - Full-Width Responsive Flex Layout for Proper Width */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row items-stretch lg:items-center gap-3 w-full">
            {activeTab === 'flights' ? (
              <>
                <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-1 lg:min-w-[180px]">
                  <label htmlFor="hero-flight-origin" className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-teal-700" /> From
                  </label>
                  <input id="hero-flight-origin" type="text" value={flightOrigin} onChange={(event) => setFlightOrigin(event.target.value)} placeholder="Departure city or airport" className="w-full truncate bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden" required />
                </div>
                <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-1 lg:min-w-[180px]">
                  <label htmlFor="hero-flight-destination" className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <Plane className="h-3.5 w-3.5 text-teal-700" /> To
                  </label>
                  <input id="hero-flight-destination" type="text" value={flightDestination} onChange={(event) => setFlightDestination(event.target.value)} placeholder="Arrival city or airport" className="w-full truncate bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden" required />
                </div>
                <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-1 lg:min-w-[160px]">
                  <label htmlFor="hero-flight-departure" className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <Calendar className="h-3.5 w-3.5 text-teal-700" /> Departure
                  </label>
                  <input id="hero-flight-departure" type="date" min={getDateOffset(0)} value={flightDeparture} onChange={(event) => {
                    setFlightDeparture(event.target.value);
                    if (event.target.value > flightReturn) setFlightReturn(event.target.value);
                  }} className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden" required />
                </div>
                <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-1 lg:min-w-[160px]">
                  <label htmlFor="hero-flight-return" className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <Calendar className="h-3.5 w-3.5 text-teal-700" /> Return
                  </label>
                  <input id="hero-flight-return" type="date" min={flightDeparture} value={flightReturn} onChange={(event) => setFlightReturn(event.target.value)} className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden" required />
                </div>
                <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-1 lg:min-w-[130px]">
                  <label htmlFor="hero-flight-passengers" className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <Users className="h-3.5 w-3.5 text-teal-700" /> Passengers
                  </label>
                  <select id="hero-flight-passengers" value={flightPassengers} onChange={(event) => setFlightPassengers(Number(event.target.value))} className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => <option key={number} value={number}>{number} {number === 1 ? 'Passenger' : 'Passengers'}</option>)}
                  </select>
                </div>
              </>
            ) : (
              <>
            {/* Field 1: Location */}
            <div className="min-w-0 sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-[1.4] lg:min-w-[220px]">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                <span>Destination or City</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where to? e.g. Saarbrücken, Maldives"
                className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden truncate"
                required
              />
            </div>

            {/* Field 2: Check-in */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-1 lg:min-w-[180px]">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-700" />
                <span>Check-in</span>
              </label>
              <input
                type="date"
                min={getDateOffset(0)}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value > checkOut) setCheckOut(e.target.value);
                }}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
              />
            </div>

            {/* Field 3: Check-out */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-1 lg:min-w-[180px]">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-700" />
                <span>Check-out</span>
              </label>
              <input
                type="date"
                min={checkIn}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
              />
            </div>

            {/* Field 4: Guests */}
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-slate-300 lg:flex-1 lg:min-w-[170px]">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-teal-700" />
                <span>Guests</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-hidden cursor-pointer"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5+ Family</option>
              </select>
            </div>
              </>
            )}

            {/* Search Button */}
            <div className="sm:col-span-2 lg:shrink-0 flex items-center justify-center">
              <button
                type="submit"
                aria-label="Search Bookings"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-teal-800 font-semibold text-white shadow-lg transition-all hover:bg-teal-900 active:scale-95 focus-visible:outline-2 focus-visible:outline-teal-800 lg:h-14 lg:w-14"
              >
                <Search className="w-6 h-6" />
                <span className="text-sm sm:hidden">Search</span>
                <span className="hidden text-sm sm:inline lg:hidden">{activeTab === 'flights' ? 'Search Global Flights' : activeTab === 'cruise' ? 'Explore Cruises' : 'Search Available Stays'}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};
