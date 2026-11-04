import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import GlobalToursHero from '../components/global-tours/hero';
import GlobalToursDestinations from '../components/global-tours/destinations';
import GlobalToursExperiences from '../components/global-tours/experiences';
import GlobalToursTripPlanning from '../components/global-tours/trip-planning';
import { globalToursContentDefaults, HomeContent, homeContentValue } from '../lib/homeContent';

const GlobalToursPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const whatsappNumber = homeContentValue(content, 'global_tours_whatsapp_number', globalToursContentDefaults.global_tours_whatsapp_number).replace(/\D/g, '');
  const tourRequestUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(homeContentValue(content, 'global_tours_whatsapp_message', globalToursContentDefaults.global_tours_whatsapp_message))}`;
  const openTourRequest = () => window.open(tourRequestUrl, '_blank', 'noopener,noreferrer');

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/global-tours"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={openTourRequest}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <GlobalToursHero requestUrl={tourRequestUrl} content={content} />
        <GlobalToursDestinations requestUrl={tourRequestUrl} content={content} />
        <GlobalToursExperiences requestUrl={tourRequestUrl} content={content} />
        <GlobalToursTripPlanning requestUrl={tourRequestUrl} content={content} />
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openTourRequest}
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
          openTourRequest();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          window.location.assign('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default GlobalToursPage;
