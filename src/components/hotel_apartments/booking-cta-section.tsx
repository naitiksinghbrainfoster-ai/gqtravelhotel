import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { HomeContent, hotelApartmentsContentDefaults, homeContentValue } from '../../lib/homeContent';
import { GERMANY_WHATSAPP } from '../../lib/contactChannels';

interface BookingCtaSectionProps {
  onOpenBooking: () => void;
  bookingAvailable?: boolean;
  content?: HomeContent;
}

const BookingCtaSection: React.FC<BookingCtaSectionProps> = ({
  onOpenBooking,
  bookingAvailable = true,
  content,
}) => (
  <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-teal-950 px-7 py-10 text-white sm:px-12 sm:py-14 lg:flex-row lg:items-center">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-200">
          {homeContentValue(content, 'hotel_apartments_cta_label', hotelApartmentsContentDefaults.hotel_apartments_cta_label)}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {homeContentValue(content, 'hotel_apartments_cta_title', hotelApartmentsContentDefaults.hotel_apartments_cta_title)}
        </h2>
        <p className="mt-4 leading-7 text-teal-50/80">
          {homeContentValue(content, 'hotel_apartments_cta_description', hotelApartmentsContentDefaults.hotel_apartments_cta_description)}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        <button
          type="button"
          onClick={onOpenBooking}
          disabled={!bookingAvailable}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-teal-950 transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {homeContentValue(content, 'hotel_apartments_cta_book', hotelApartmentsContentDefaults.hotel_apartments_cta_book)}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
        <a
          href={`${GERMANY_WHATSAPP.href}?text=${encodeURIComponent('Hello GQ Travel & Hotels, I need help finding a hotel or apartment.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          {homeContentValue(content, 'hotel_apartments_cta_whatsapp', hotelApartmentsContentDefaults.hotel_apartments_cta_whatsapp)}
        </a>
      </div>
    </div>
  </section>
);

export default BookingCtaSection;
