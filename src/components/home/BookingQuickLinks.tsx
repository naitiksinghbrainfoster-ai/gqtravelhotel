import React from 'react';
import { ArrowRight } from 'lucide-react';

const bookingLinks = [
  {
    label: 'Book Global Flight',
    href: '/global-flight',
  },
  {
    label: 'Book Airport Transfers',
    href: 'https://gqtravel-hotels.com/airport-transfers-saarland/',
  },
  {
    label: 'Book Cruise Rides',
    href: '/kreuzfahrten/',
  },
  {
    label: 'Book Vacation',
    href: '/vacation',
  },
  {
    label: 'Book Car Rental',
    href: '/car-rental-worldwide-save-20-with-gq-travel-hotels',
  },
  {
    label: 'Book Private Jet',
    href: '/private-jet-rentals',
  },
  {
    label: 'Book Global Tour',
    href: '/global-tours',
  },
  {
    label: 'Request Railway Tickets',
    href: '/railway-tickets',
  },
];

interface BookingQuickLinksProps {
  onNavigate?: (path: string) => void;
}

export const BookingQuickLinks: React.FC<BookingQuickLinksProps> = ({ onNavigate }) => (
  <section aria-label="Quick booking links" className="bg-slate-100 py-5 sm:py-6">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
      {bookingLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('/') ? undefined : '_blank'}
          rel={link.href.startsWith('/') ? undefined : 'noopener noreferrer'}
          onClick={(event) => {
            if (link.href.startsWith('/') && onNavigate) {
              event.preventDefault();
              onNavigate(link.href);
            }
          }}
          className="group flex min-h-16 items-center justify-center gap-3 rounded-md border border-teal-900/10 bg-teal-700 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:min-h-[72px] sm:px-4"
        >
          <span>{link.label}</span>
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
        </a>
      ))}
    </div>
  </section>
);
