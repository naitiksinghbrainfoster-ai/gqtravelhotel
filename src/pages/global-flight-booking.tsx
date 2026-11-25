import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import GlobalFlightBookingPortal from '../components/global-flight/booking-portal';
import { globalFlightContentDefaults, HomeContent, homeContentValue } from '../lib/homeContent';

const GlobalFlightBookingPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const bookingUrl = homeContentValue(content, 'global_flight_portal_url', globalFlightContentDefaults.global_flight_portal_url);
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openFlightBooking = () => {
    document.getElementById('global-flight-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-800">
      <Navbar
        currentPath="/global-flight-booking"
        onNavigate={navigateTo}
        onOpenBooking={openFlightBooking}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main className="flex-1">
        <GlobalFlightBookingPortal bookingUrl={bookingUrl} />
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openFlightBooking}
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
          openFlightBooking();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          window.location.assign('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default GlobalFlightBookingPage;
