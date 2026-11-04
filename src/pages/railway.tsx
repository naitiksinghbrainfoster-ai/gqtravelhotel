import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import RailwayBookingInfo, { railRequestUrl } from '../components/railway/booking-info';
import { HomeContent, homeContentValue, railwayContentDefaults } from '../lib/homeContent';

const RailwayPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const openRailwayRequest = () =>
    window.location.assign(railRequestUrl(content));

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/railway-tickets"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={openRailwayRequest}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <section className="bg-teal-950 px-5 py-12 text-white sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-200">
              {homeContentValue(content, 'railway_hero_label', railwayContentDefaults.railway_hero_label)}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {homeContentValue(content, 'railway_hero_title', railwayContentDefaults.railway_hero_title)}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-teal-50 sm:text-lg">
              {homeContentValue(content, 'railway_hero_description', railwayContentDefaults.railway_hero_description)}
            </p>
          </div>
        </section>
        <RailwayBookingInfo content={content} />
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openRailwayRequest}
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
          openRailwayRequest();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          window.location.assign('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default RailwayPage;
