import React, { useEffect, useState } from 'react';
import { ArrowLeft, BedDouble, CalendarDays, Check, ChevronLeft, ChevronRight, MapPin, Star, Users, X } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import type { Property, RoomPricingTable } from '../data/travelData';
import type { HomeContent } from '../lib/homeContent';

interface PropertyDetailsPageProps {
  property?: Property;
  properties: Property[];
  loading: boolean;
  onNavigate: (path: string) => void;
  content: HomeContent;
}

const hasPricingData = (table?: RoomPricingTable): table is RoomPricingTable => Boolean(
  table
  && table.columns.length > 0
  && table.rows.length > 0
  && table.rows.some((row) => row.some((cell) => cell.trim().length > 0)),
);

const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  property,
  properties,
  loading,
  onNavigate,
  content,
}) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const gallery = property?.gallery?.length ? property.gallery : property?.image ? [property.image] : [];

  useEffect(() => {
    if (lightboxImage === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null);
      if (event.key === 'ArrowRight') setLightboxImage((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setLightboxImage((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gallery.length, lightboxImage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar currentPath="/hotel-apartments" onNavigate={onNavigate} onOpenBooking={() => onNavigate('/hotel-apartments')} onOpenLegal={() => {}} onOpenConcierge={() => {}} />
        <main className="mx-auto max-w-7xl px-5 py-20 text-center text-slate-500">Loading property details...</main>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar currentPath="/hotel-apartments" onNavigate={onNavigate} onOpenBooking={() => onNavigate('/hotel-apartments')} onOpenLegal={() => {}} onOpenConcierge={() => {}} />
        <main className="mx-auto max-w-7xl px-5 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Property not found</h1>
          <button type="button" onClick={() => onNavigate('/hotel-apartments')} className="mt-5 rounded-full bg-teal-800 px-5 py-3 text-sm font-semibold text-white">
            Back to accommodations
          </button>
        </main>
      </div>
    );
  }

  const roomPricing = property.roomPricing;
  const extraRoomPricing = roomPricing?.extraRoomPricing;

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar currentPath="/hotel-apartments" onNavigate={onNavigate} onOpenBooking={() => setBookingOpen(true)} onOpenLegal={() => {}} onOpenConcierge={() => {}} />
      <main>
        <section className="border-b border-slate-100 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
            <button type="button" onClick={() => onNavigate('/hotel-apartments')} className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800">
              <ArrowLeft className="h-4 w-4" /> Back to accommodations
            </button>
            <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-teal-700" />
                  {property.address || property.location}
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold text-slate-950 sm:text-4xl">{property.title}</h1>
              </div>
              {property.rating > 0 && (
                <span className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-bold text-slate-800">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {property.rating.toFixed(1)}
                  {property.reviewsCount > 0 && <span className="font-normal text-slate-500">({property.reviewsCount})</span>}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          {gallery.length > 0 && (
            <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
              <div className="h-[420px] overflow-hidden rounded-2xl bg-slate-100">
                <button type="button" onClick={() => setLightboxImage(selectedImage)} aria-label="Open property photo gallery" className="block w-full cursor-zoom-in">
                  <img src={gallery[selectedImage] || gallery[0]} alt={property.title} className="block h-[420px] w-full object-cover" />
                </button>
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {gallery.slice(0, 4).map((image, index) => (
                    <button key={`${image}-${index}`} type="button" onClick={() => { setSelectedImage(index); setLightboxImage(index); }} aria-label={`Open photo ${index + 1} of ${property.title}`} className={`overflow-hidden rounded-xl border-2 ${selectedImage === index ? 'border-teal-800' : 'border-transparent'}`}>
                      <img src={image} alt={`${property.title} ${index + 1}`} className="h-32 w-full cursor-zoom-in object-cover lg:h-[204px]" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <section>
                <h2 className="text-xl font-bold text-slate-950">About this property</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {property.fullDescription || property.description}
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-slate-950">Amenities</h2>
                {property.amenities.length > 0 ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-teal-700" /> {amenity}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">Contact us for the full list of amenities.</p>
                )}
              </section>

              {hasPricingData(roomPricing) ? (
                <section className="mt-8">
                  <h2 className="text-xl font-bold text-slate-950">Pricing</h2>
                  <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full min-w-[620px] text-left">
                      <thead className="bg-slate-50 text-xs text-slate-500">
                        <tr>
                          {roomPricing.columns.map((heading, index) => (
                            <th key={index} className="px-4 py-3">{heading}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {roomPricing.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="text-sm">
                            {roomPricing.columns.map((_, columnIndex) => (
                              <td key={columnIndex} className="px-4 py-3">{row[columnIndex] ?? ''}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}
              {hasPricingData(extraRoomPricing) && (
                <section className="mt-8">
                  <h2 className="text-xl font-bold text-slate-950">Extra room pricing</h2>
                  <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full min-w-[620px] text-left">
                      <thead className="bg-slate-50 text-xs text-slate-500">
                        <tr>
                          {extraRoomPricing.columns.map((heading, index) => (
                            <th key={index} className="px-4 py-3">{heading}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {extraRoomPricing.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="text-sm">
                            {extraRoomPricing.columns.map((_, columnIndex) => (
                              <td key={columnIndex} className="px-4 py-3">{row[columnIndex] ?? ''}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>

            <aside className="h-fit rounded-2xl border border-slate-200 p-5 shadow-sm lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">From</p>
              <p className="mt-1 text-3xl font-bold text-teal-900">€{property.pricePerNight}<span className="text-sm font-normal text-slate-500"> / night</span></p>
              <div className="mt-5 space-y-3 border-y border-slate-100 py-4 text-sm text-slate-600">
                <p className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-teal-700" /> {property.category}</p>
                <p className="flex items-center gap-2"><Users className="h-4 w-4 text-teal-700" /> Flexible guest arrangements</p>
                <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-teal-700" /> Check-in from 14:00</p>
              </div>
              <button type="button" onClick={() => setBookingOpen(true)} className="mt-5 w-full rounded-xl bg-teal-800 px-5 py-3.5 text-sm font-bold text-white hover:bg-teal-900">
                Book Now
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">Free cancellation subject to the selected rate and booking terms.</p>
            </aside>
          </div>
        </section>
      </main>
      <Footer onNavigate={onNavigate} onOpenLegal={() => {}} onOpenBooking={() => setBookingOpen(true)} onOpenTransferModal={() => onNavigate('/airport-transfers-saarland')} />
      {bookingOpen && (
        <BookingModal property={property} properties={properties} onClose={() => setBookingOpen(false)} />
      )}
      {lightboxImage !== null && gallery.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${property.title} photo gallery`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <button type="button" onClick={() => setLightboxImage(null)} aria-label="Close photo gallery" className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
          {gallery.length > 1 && (
            <button type="button" onClick={(event) => { event.stopPropagation(); setLightboxImage((lightboxImage - 1 + gallery.length) % gallery.length); }} aria-label="Previous photo" className="absolute left-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-8">
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}
          <img
            src={gallery[lightboxImage]}
            alt={`${property.title} photo ${lightboxImage + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[82vh] max-w-[90vw] rounded-lg object-contain"
          />
          {gallery.length > 1 && (
            <button type="button" onClick={(event) => { event.stopPropagation(); setLightboxImage((lightboxImage + 1) % gallery.length); }} aria-label="Next photo" className="absolute right-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-8">
              <ChevronRight className="h-7 w-7" />
            </button>
          )}
          <p className="absolute bottom-4 text-sm text-white/80">{lightboxImage + 1} / {gallery.length}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
