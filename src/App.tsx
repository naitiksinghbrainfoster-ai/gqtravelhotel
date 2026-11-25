/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/home/Hero';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { FeaturedContentStrip } from './components/home/FeaturedContentStrip';
import { PartnersStrip } from './components/home/PartnersStrip';
import { TopBookNow } from './components/home/TopBookNow';
import { ExploreMaldives } from './components/home/ExploreMaldives';
import { ServicesSection } from './components/home/ServicesSection';
import { AirportTransferCalculator } from './components/home/AirportTransferCalculator';
import { FeatureNews } from './components/home/FeatureNews';
import { Testimonials } from './components/home/Testimonials';
import { TeamSection } from './components/home/TeamSection';
import { FaqSection } from './components/home/FaqSection';
import { NewsletterAndTrustpilot } from './components/home/NewsletterAndTrustpilot';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceQuoteModal } from './components/ServiceQuoteModal';
import { LegalModal } from './components/LegalModals';
import { AiChatConcierge } from './components/AiChatConcierge';
import { CookieBanner } from './components/CookieBanner';
import { Property, Destination, ServiceItem, PROPERTIES } from './data/travelData';
import { GERMANY_WHATSAPP } from './lib/contactChannels';
import ServicePage from './pages/service';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import HotelApartmentsPage from './pages/hotel_apartments';
import PropertyDetailsPage from './pages/property-details';
import AirportTransferSaarlandPage from './pages/airport-transfers-saarland';
import CarRentalPage from './pages/car-rental';
import SixtCarRentPage from './pages/sixt-car-rent';
import GlobalAutoRentPage from './pages/global-auto-rent';
import PrivateJetRentalsPage from './pages/private-jet-rentals';
import GlobalToursPage from './pages/global-tours';
import HolidaysPage from './pages/holidays';
import VacationPage from './pages/vacation';
import GlobalFlightPage from './pages/global-flight';
import GlobalFlightBookingPage from './pages/global-flight-booking';
import CruisePage from './pages/cruise';
import CruiseBookingPage from './pages/cruise-booking';
import RailwayPage from './pages/railway';
import BlogPage from './pages/blog';
import BlogArticlePage from './pages/blog-article';
import GeneralTermsConditionsPage from './pages/general-terms-conditions';
import ImprintPage from './pages/imprint';
import PrivacyPolicyPage from './pages/privacy-policy';
import TransferTermsPage from './pages/transfer-terms';
import AdminApp from '../admin/pages/AdminPage';
import { fetchPublicProperties, fetchPublicSiteContent, SiteContent } from './lib/siteContent';
import { supabase } from './lib/supabase';

const getCurrentPath = () => window.location.pathname;
const seoPrefixByPath: Record<string, string> = {
  '/': 'home',
  '/services': 'services',
  '/about': 'about',
  '/contact': 'contact',
  '/hotel-apartments': 'hotel_apartments',
  '/airport-transfers-saarland': 'airport_transfers',
  '/global-auto-rent': 'global_auto_rent',
  '/sixt-car-rent': 'sixt_car_rent',
  '/car-rental-worldwide-save-20-with-gq-travel-hotels': 'car_rental',
  '/private-jet-rentals': 'private_jet_rentals',
  '/global-tours': 'global_tours',
  '/holidays': 'holidays',
  '/vacation': 'vacation',
  '/global-flight': 'global_flight',
  '/global-flight-booking': 'global_flight',
  '/cruise': 'cruise',
  '/cruise-booking': 'cruise',
  '/kreuzfahrten': 'cruise',
  '/railway-tickets': 'railway_tickets',
  '/blog': 'blog',
  '/general-terms-conditions': 'terms',
  '/terms': 'terms',
  '/terms-and-conditions': 'terms',
  '/imprint': 'imprint',
  '/impressum': 'imprint',
  '/privacy-policy': 'privacy_policy',
  '/privacy': 'privacy_policy',
  '/datenschutz': 'privacy_policy',
  '/airport-transfer-terms': 'airport_transfer_terms',
  '/accra-transfer-terms': 'accra_transfer_terms',
};
const defaultSeoTitles: Record<string, string> = {
  home: 'GQ Travel & Hotels | Global Booking & Travel Agency',
  services: 'Our Services | GQ Travel & Hotels',
  about: 'About Us | GQ Travel & Hotels',
  contact: 'Contact | GQ Travel & Hotels',
  hotel_apartments: 'Hotels & Apartments | GQ Travel & Hotels',
  airport_transfers: 'Airport Transfers | GQ Travel & Hotels',
  global_auto_rent: 'Global Auto Rent | GQ Travel & Hotels',
  sixt_car_rent: 'Sixt Car Rental | GQ Travel & Hotels',
  car_rental: 'Car Rental | GQ Travel & Hotels',
  private_jet_rentals: 'Private Jet Rentals | GQ Travel & Hotels',
  global_tours: 'Global Tours | GQ Travel & Hotels',
  holidays: 'Holidays | GQ Travel & Hotels',
  vacation: 'Vacation | GQ Travel & Hotels',
  global_flight: 'Flights | GQ Travel & Hotels',
  cruise: 'Cruises | GQ Travel & Hotels',
  railway_tickets: 'Railway Tickets | GQ Travel & Hotels',
  blog: 'Travel Blog | GQ Travel & Hotels',
  terms: 'Terms & Conditions | GQ Travel & Hotels',
  imprint: 'Imprint | GQ Travel & Hotels',
  privacy_policy: 'Privacy Policy | GQ Travel & Hotels',
  airport_transfer_terms: 'Airport Transfer Terms | GQ Travel & Hotels',
  accra_transfer_terms: 'Accra Transfers Terms | GQ Travel & Hotels',
};

export default function App() {
  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [serviceQuoteId, setServiceQuoteId] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(() => getCurrentPath());
  const [siteContent, setSiteContent] = useState<SiteContent>({});
  const [publicProperties, setPublicProperties] = useState<Property[]>(() => supabase ? [] : PROPERTIES);
  const [publicPropertiesLoading, setPublicPropertiesLoading] = useState(Boolean(supabase));
  const [publicPropertiesError, setPublicPropertiesError] = useState('');

  useEffect(() => {
    const syncPath = () => setCurrentPath(getCurrentPath());
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    setPublicPropertiesLoading(true);
    setPublicPropertiesError('');
    void fetchPublicProperties()
      .then((properties) => {
        if (active) {
          setPublicProperties(properties);
          setPublicPropertiesLoading(false);
        }
      })
      .catch((error: unknown) => {
        console.error('Unable to load public properties from Supabase:', error);
        if (active) {
          setPublicProperties([]);
          setPublicPropertiesError(
            error instanceof Error
              ? error.message
              : typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
                ? error.message
                : 'Unable to load properties. Please try again later.',
          );
          setPublicPropertiesLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [currentPath]);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    const handleContentUpdate = (event: Event) => {
      const updatedContent = (event as CustomEvent<SiteContent>).detail;
      if (updatedContent) setSiteContent(updatedContent);
    };
    window.addEventListener('gq-site-content-updated', handleContentUpdate);
    void fetchPublicSiteContent()
      .then((content) => {
        if (active) setSiteContent(content);
      })
      .catch((error: unknown) => {
        console.error('Unable to load public website content from Supabase:', error);
      });
    return () => {
      active = false;
      window.removeEventListener('gq-site-content-updated', handleContentUpdate);
    };
  }, []);

  useEffect(() => {
    const normalizedPath = currentPath.replace(/\/+$/, '') || '/';
    if (/^\/blog\/[^/]+$/.test(normalizedPath)) return;
    const seoPrefix = seoPrefixByPath[normalizedPath] ?? 'home';
    const title = siteContent[`${seoPrefix}_seo_title`]
      || defaultSeoTitles[seoPrefix]
      || defaultSeoTitles.home;
    const description = siteContent[`${seoPrefix}_seo_description`]
      || (seoPrefix === 'services'
        ? 'Hotels, flights, tours, transfers and more — everything for your journey, in one place.'
        : seoPrefix === 'home'
          ? 'Worldwide Hotel & Flight Bookings, Airport Transfers, Holiday Packages, Private Jet Charter, Ghana e-Visa & Medical Tourism. Headquartered in Saarbrücken, Germany.'
          : seoPrefix === 'blog'
            ? 'Explore destination inspiration, travel tips and booking guides from GQ Travel & Hotels.'
            : 'Worldwide Hotel & Flight Bookings, Airport Transfers, Holiday Packages, Private Jet Charter, Ghana e-Visa & Medical Tourism.');
    const keywords = siteContent[`${seoPrefix}_seo_keywords`] ?? '';
    document.title = title;
    const setMetaContent = (selector: string, attribute: 'name' | 'property', key: string, value: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }
      tag.content = value;
    };
    setMetaContent('meta[name="description"]', 'name', 'description', description);
    setMetaContent('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaContent('meta[property="og:description"]', 'property', 'og:description', description);
    if (keywords.trim()) {
      setMetaContent('meta[name="keywords"]', 'name', 'keywords', keywords);
    } else {
      document.querySelector('meta[name="keywords"]')?.remove();
    }
  }, [currentPath, siteContent]);

  const defaultProperty = publicProperties[0] ?? (!supabase ? PROPERTIES[0] : null);
  const destinationProperty = publicProperties[2] ?? (!supabase ? PROPERTIES[2] : null) ?? defaultProperty;

  const navigateTo = (path: string) => {
    const nextPath = path.startsWith('/') ? path : `/${path}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setCurrentPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDefaultBooking = (property = defaultProperty) => {
    if (!property) {
      navigateTo('/hotel-apartments');
      return;
    }
    setSelectedProperty(property);
    setBookingModalOpen(true);
  };

  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    return <AdminApp />;
  }

  if (currentPath === '/services') {
    return <ServicePage onNavigate={navigateTo} content={siteContent} />;
  }

  if (currentPath === '/about') {
    return (
      <AboutPage
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenBooking={() => openDefaultBooking()}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
        onOpenTransferModal={() => {
          const el = document.getElementById('transfers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        content={siteContent}
      />
    );
  }

  if (currentPath === '/contact') {
    return (
      <ContactPage
        currentPath={currentPath}
        content={siteContent}
        onNavigate={navigateTo}
        onOpenBooking={() => openDefaultBooking()}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
        onOpenTransferModal={() => {
          const el = document.getElementById('transfers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    );
  }

  if (currentPath === '/hotel-apartments') {
    return (
      <HotelApartmentsPage
        properties={publicProperties}
        propertiesLoading={publicPropertiesLoading}
        propertiesError={publicPropertiesError}
        content={siteContent}
        onNavigate={navigateTo}
      />
    );
  }

  const propertyDetailsMatch = currentPath.match(/^\/property\/([^/]+)\/?$/);
  if (propertyDetailsMatch) {
    const propertySlug = propertyDetailsMatch[1];
    const property = publicProperties.find((item) =>
      item.slug === propertySlug || item.id === propertySlug,
    );
    return (
      <PropertyDetailsPage
        property={property}
        properties={publicProperties}
        loading={publicPropertiesLoading}
        onNavigate={navigateTo}
        content={siteContent}
      />
    );
  }

  if (currentPath === '/airport-transfers-saarland') {
    return <AirportTransferSaarlandPage content={siteContent} />;
  }

  if (currentPath === '/global-auto-rent' || currentPath === '/global-auto-rent/') {
    return <GlobalAutoRentPage content={siteContent} />;
  }

  if (currentPath === '/sixt-car-rent' || currentPath === '/sixt-car-rent/') {
    return <SixtCarRentPage content={siteContent} />;
  }

  if (
    currentPath === '/car-rental-worldwide-save-20-with-gq-travel-hotels' ||
    currentPath === '/car-rental-worldwide-save-20-with-gq-travel-hotels/'
  ) {
    return <CarRentalPage content={siteContent} />;
  }

  if (currentPath === '/private-jet-rentals' || currentPath === '/private-jet-rentals/') {
    return <PrivateJetRentalsPage content={siteContent} />;
  }

  if (currentPath === '/global-tours' || currentPath === '/global-tours/') {
    return <GlobalToursPage content={siteContent} />;
  }

  if (currentPath === '/holidays' || currentPath === '/holidays/') {
    return <HolidaysPage content={siteContent} />;
  }

  if (currentPath === '/vacation' || currentPath === '/vacation/') {
    return <VacationPage content={siteContent} />;
  }

  if (currentPath === '/global-flight-booking' || currentPath === '/global-flight-booking/') {
    return <GlobalFlightBookingPage content={siteContent} />;
  }

  if (currentPath === '/global-flight' || currentPath === '/global-flight/') {
    return <GlobalFlightPage content={siteContent} />;
  }

  if (
    currentPath === '/cruise-booking' ||
    currentPath === '/cruise-booking/'
  ) {
    return <CruiseBookingPage content={siteContent} />;
  }

  if (
    currentPath === '/kreuzfahrten' ||
    currentPath === '/kreuzfahrten/' ||
    currentPath === '/cruise' ||
    currentPath === '/cruise/'
  ) {
    return <CruisePage content={siteContent} />;
  }

  if (currentPath === '/railway-tickets' || currentPath === '/railway-tickets/') {
    return <RailwayPage content={siteContent} />;
  }

  if (currentPath === '/blog' || currentPath === '/blog/') {
    return <BlogPage content={siteContent} />;
  }

  const blogArticleMatch = currentPath.match(/^\/blog\/([^/]+)\/?$/);
  if (blogArticleMatch) {
    return <BlogArticlePage slug={blogArticleMatch[1]} content={siteContent} />;
  }

  if (
    currentPath === '/general-terms-conditions' ||
    currentPath === '/general-terms-conditions/' ||
    currentPath === '/terms' ||
    currentPath === '/terms/' ||
    currentPath === '/terms-and-conditions' ||
    currentPath === '/terms-and-conditions/'
  ) {
    return (
      <GeneralTermsConditionsPage
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenBooking={() => openDefaultBooking()}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
        onOpenTransferModal={() => {
          const el = document.getElementById('transfers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        content={siteContent}
      />
    );
  }

  if (currentPath === '/imprint' || currentPath === '/imprint/' || currentPath === '/impressum' || currentPath === '/impressum/') {
    return (
      <ImprintPage
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenBooking={() => openDefaultBooking()}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
        onOpenTransferModal={() => {
          const el = document.getElementById('transfers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        content={siteContent}
      />
    );
  }

  if (currentPath === '/airport-transfer-terms' || currentPath === '/airport-transfer-terms/') {
    return <TransferTermsPage page="airport_transfer_terms" content={siteContent} />;
  }

  if (currentPath === '/accra-transfer-terms' || currentPath === '/accra-transfer-terms/') {
    return <TransferTermsPage page="accra_transfer_terms" content={siteContent} />;
  }

  if (
    currentPath === '/privacy-policy' ||
    currentPath === '/privacy-policy/' ||
    currentPath === '/privacy' ||
    currentPath === '/privacy/' ||
    currentPath === '/datenschutz' ||
    currentPath === '/datenschutz/'
  ) {
    return (
      <PrivacyPolicyPage
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenBooking={() => openDefaultBooking()}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
        onOpenTransferModal={() => {
          const el = document.getElementById('transfers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        content={siteContent}
      />
    );
  }

  // Search filter handler from Hero
  const handleHeroSearch = (params: {
    tab: string;
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => {
    if (params.tab === 'hotels') {
      const search = new URLSearchParams({
        destination: params.location.trim(),
        checkIn: params.checkIn,
        checkOut: params.checkOut,
        guests: String(params.guests),
      });
      navigateTo(`/hotel-apartments?${search.toString()}`);
      return;
    }

    if (params.tab === 'flights') {
      navigateTo('/global-flight-booking');
      return;
    }

    if (params.tab === 'cruise') {
      navigateTo('/cruise-booking');
    }
  };

  const handleSelectProperty = (property: Property) => {
    navigateTo(`/property/${property.slug || property.id}`);
  };

  const handleSelectDestination = (dest: Destination) => {
    setServiceQuoteId('packages');
  };

  const handleSelectService = (service: ServiceItem) => {
    if (service.id === 'hotels-flights-packages') {
      openDefaultBooking();
    } else {
      setServiceQuoteId(service.id);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-teal-800 selection:text-white">
      {/* Primary Top Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenBooking={() => openDefaultBooking()}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero with Floating Search Card (Matching Screenshot 1) */}
        <Hero
          content={siteContent}
          onSearch={handleHeroSearch}
          onNavigate={navigateTo}
          onOpenTransferModal={() => {
            const el = document.getElementById('transfers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenServiceQuote={(serviceId) => setServiceQuoteId(serviceId)}
        />

        {/* 2. Featured Global Escapes / Landmarks Strip (Matching User Reference Image 0c27b0aa.png) */}
        <FeaturedContentStrip
          content={siteContent}
          onSelectItem={(item) => {
            setServiceQuoteId('packages');
          }}
        />

        {/* 3. Why Choose Us (Matching Screenshot 1) */}
        <WhyChooseUs content={siteContent} />

        {/* 4. Our Partners Strip (Matching Screenshot 1) */}
        <PartnersStrip content={siteContent} />

        {/* 4. Top Book Now - 8 Luxury Properties in 4-Col Grid (Matching Screenshot 1) */}
        <TopBookNow
          properties={publicProperties}
          loading={publicPropertiesLoading}
          error={publicPropertiesError}
          title={siteContent.home_properties_title}
          description={siteContent.home_properties_description}
          content={siteContent}
          onSelectProperty={handleSelectProperty}
        />

        {/* 5. Explore Destinations / Maldives Spotlight (Matching Screenshot 2) */}
        <ExploreMaldives
          content={siteContent}
          onSelectDestination={handleSelectDestination}
          onOpenBooking={() => openDefaultBooking(destinationProperty)}
        />

        {/* 6. Comprehensive 8 Core Services Breakdown */}
        <ServicesSection
          content={siteContent}
          onSelectService={handleSelectService}
          onOpenBooking={() => openDefaultBooking()}
          onOpenTransferModal={() => {
            const el = document.getElementById('transfers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenServiceQuote={(serviceId) => setServiceQuoteId(serviceId)}
        />

        {/* 7. Airport Transfer Calculator & Booking Engine (Saarbrücken & European Airports, Accra) */}
        <AirportTransferCalculator
          content={siteContent}
          onBookTransfer={() => {
            // Callback when transfer is confirmed
          }}
        />

        {/* 8. Feature News & Travel Guides (Matching Screenshot 2) */}
        <FeatureNews content={siteContent} />

        {/* 9. Testimonials (Matching Screenshot 2) */}
        <Testimonials content={siteContent} />

        {/* 10. Leadership & 20+ Years Experience Showcase */}
        <TeamSection content={siteContent} />

        {/* 11. FAQ Accordions */}
        <FaqSection content={siteContent} />

        {/* 12. Newsletter & Trustpilot Section (Matching Screenshot 2) */}
        <NewsletterAndTrustpilot content={siteContent} onOpenLegal={(type) => setLegalModalType(type)} />

        <section className="bg-teal-950 px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">{siteContent.home_car_rental_label || 'Worldwide car rental'}</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{siteContent.home_car_rental_title || 'Save 20% on car rental with GQ Travel & Hotels'}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-teal-50/80">
                {siteContent.home_car_rental_description || 'Explore worldwide rental options and book your next trip with our car rental service.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('/car-rental-worldwide-save-20-with-gq-travel-hotels')}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-teal-950 transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {siteContent.home_car_rental_cta || 'Explore car rental'}
            </button>
          </div>
        </section>
      </main>

      {/* Footer with Working Hours, Contact & Legal Modals */}
      <Footer
        onNavigate={navigateTo}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={() => openDefaultBooking()}
        onOpenTransferModal={() => {
          const el = document.getElementById('transfers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Interactive Modals */}
      {bookingModalOpen && selectedProperty && (
        <BookingModal
          property={selectedProperty}
          properties={publicProperties}
          onClose={() => {
            setBookingModalOpen(false);
            setSelectedProperty(null);
          }}
        />
      )}

      {serviceQuoteId && (
        <ServiceQuoteModal
          serviceId={serviceQuoteId}
          onClose={() => setServiceQuoteId(null)}
        />
      )}

      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}

      {/* AI Chat Concierge ("Chat with Us" button requirement) */}
      <AiChatConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        onOpenBooking={() => {
          setAiConciergeOpen(false);
          openDefaultBooking();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          const el = document.getElementById('transfers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating Action Buttons: WhatsApp & AI Chat */}
      <div className="pointer-events-none fixed bottom-3 right-3 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
        <a
          href={GERMANY_WHATSAPP.href}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group pointer-events-auto flex items-center justify-center rounded-full bg-emerald-600 p-3 text-white shadow-xl transition-all hover:scale-105 hover:bg-emerald-700 sm:p-3.5"
        >
          <Phone className="w-5 h-5 fill-white" />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold transition-all duration-300 ease-out group-hover:max-w-xs group-hover:pl-2 sm:inline">
            {GERMANY_WHATSAPP.label}: {GERMANY_WHATSAPP.value}
          </span>
        </a>

        <button
          onClick={() => setAiConciergeOpen(true)}
          aria-label="Open AI Travel Concierge"
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-teal-800 p-3 text-white shadow-xl transition-all hover:scale-105 hover:bg-teal-900 sm:px-4 sm:py-3"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden text-xs font-bold sm:inline">Chat with Us (AI)</span>
        </button>
      </div>

      {/* GDPR Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => setLegalModalType('privacy')} />
    </div>
  );
}
