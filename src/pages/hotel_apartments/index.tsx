import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BookingModal } from '../../components/BookingModal';
import { PROPERTIES, Property } from '../../data/travelData';
import { HomeContent } from '../../lib/homeContent';
import BenefitsSection from '../../components/hotel_apartments/benefits-section';
import BookingCtaSection from '../../components/hotel_apartments/booking-cta-section';
import FeaturedStaysSection from '../../components/hotel_apartments/featured-stays-section';
import HeroSection from '../../components/hotel_apartments/hero-section';

const normalizeSearchText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u')
    .replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

interface HotelApartmentsPageProps {
  properties?: Property[];
  propertiesLoading?: boolean;
  propertiesError?: string;
  content?: HomeContent;
  onNavigate?: (path: string) => void;
}

const HotelApartmentsPage: React.FC<HotelApartmentsPageProps> = ({
  properties = PROPERTIES,
  propertiesLoading = false,
  propertiesError = '',
  content,
  onNavigate,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [search] = useState(() => new URLSearchParams(window.location.search));
  const destination = search.get('destination')?.trim() ?? '';
  const checkIn = search.get('checkIn') ?? '';
  const checkOut = search.get('checkOut') ?? '';
  const parsedGuests = Number(search.get('guests'));
  const guests = Number.isInteger(parsedGuests) && parsedGuests > 0 ? parsedGuests : 2;
  const searchTerms = normalizeSearchText(destination).split(/\s+/).filter(Boolean);
  const matchingProperties = destination
    ? properties.filter((property) =>
        searchTerms.every((term) =>
          normalizeSearchText(
            [
              property.title,
              property.location,
              property.city,
              property.country,
              property.description,
              property.address ?? '',
            ].join(' '),
          ).includes(term),
        ),
      )
    : properties;

  useEffect(() => {
    if (destination && !propertiesLoading) {
      document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [destination, propertiesLoading]);

  const openBooking = (property = properties[0]) => {
    if (!property) {
      document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (onNavigate) {
      onNavigate(`/property/${property.slug || property.id}`);
    } else {
      window.history.pushState({}, '', `/property/${property.slug || property.id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/hotel-apartments"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => openBooking()}
        onOpenLegal={() => {}}
        onOpenConcierge={() => {}}
      />

      <main>
        <HeroSection content={content} />
        {destination && (
          <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-10">
            <p role="status" className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-950">
              Showing stays matching <strong>{destination}</strong>
              {checkIn && checkOut ? ` · ${checkIn} to ${checkOut}` : ''}
              {` · ${guests} ${guests === 1 ? 'guest' : 'guests'}`}
            </p>
          </div>
        )}
        <FeaturedStaysSection
          properties={matchingProperties}
          loading={propertiesLoading}
          error={propertiesError}
          onSelectProperty={openBooking}
          content={content}
          searchTerm={destination}
        />
        <BenefitsSection content={content} />
        <BookingCtaSection
          onOpenBooking={() => openBooking()}
          bookingAvailable={!propertiesLoading && !propertiesError && properties.length > 0}
          content={content}
        />
      </main>

      <Footer
        onOpenLegal={() => {}}
        onOpenBooking={() => openBooking()}
        onOpenTransferModal={() => window.location.assign('/#transfers')}
      />

      {selectedProperty && (
        <BookingModal
          property={selectedProperty}
          properties={properties}
          initialCheckIn={checkIn || undefined}
          initialCheckOut={checkOut || undefined}
          initialGuests={guests}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

export default HotelApartmentsPage;
