import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import CarRentalHero from '../components/car_rental/hero';
import CarRentalBenefits from '../components/car_rental/benefits';
import { HomeContent, carRentalContentDefaults, homeContentValue } from '../lib/homeContent';

const CarRentalPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const bookingUrl = homeContentValue(content, 'car_rental_portal_url', carRentalContentDefaults.car_rental_portal_url);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/car-rental-worldwide-save-20-with-gq-travel-hotels"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => window.open(bookingUrl, '_blank', 'noopener,noreferrer')}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <CarRentalHero bookingUrl={bookingUrl} content={content} />
        <CarRentalBenefits bookingUrl={bookingUrl} content={content} />
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={() => window.open(bookingUrl, '_blank', 'noopener,noreferrer')}
        onOpenTransferModal={() => window.location.assign('/airport-transfers-saarland')}
      />

      {legalModalType && (
        <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
      )}
      <AiChatConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        onOpenBooking={() => {
          setAiConciergeOpen(false);
          window.open(bookingUrl, '_blank', 'noopener,noreferrer');
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          window.location.assign('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default CarRentalPage;
