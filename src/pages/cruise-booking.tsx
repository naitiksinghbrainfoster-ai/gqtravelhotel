import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import { cruiseContentDefaults, HomeContent, homeContentValue } from '../lib/homeContent';

const CruiseBookingPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const bookingUrl = homeContentValue(content, 'cruise_portal_url', cruiseContentDefaults.cruise_portal_url);
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openCruiseBooking = () => {
    document.getElementById('cruise-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-800">
      <Navbar
        currentPath="/cruise-booking"
        onNavigate={navigateTo}
        onOpenBooking={openCruiseBooking}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main className="flex-1">
        <section id="cruise-booking" className="scroll-mt-24 bg-white px-5 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto h-[min(80vh,760px)] min-h-[620px] max-w-7xl overflow-hidden">
            <iframe
              title="Cruise booking"
              src={bookingUrl}
              className="w-full border-0 bg-white"
              style={{ height: 'calc(100% + 180px)', transform: 'translateY(-180px)' }}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="mx-auto mt-2 max-w-7xl text-right text-xs text-slate-500">
            Booking controls not visible?{' '}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-teal-800"
            >
              Open the full cruise booking page
            </a>
          </p>
        </section>
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openCruiseBooking}
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
          openCruiseBooking();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          window.location.assign('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default CruiseBookingPage;
