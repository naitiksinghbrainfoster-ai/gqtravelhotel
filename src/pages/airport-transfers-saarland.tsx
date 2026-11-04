import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import AirportTransferSaarlandHero from '../components/airport-transfer-saarland/hero';
import AirportTransferRequest from '../components/airport-transfer-saarland/request';
import { HomeContent } from '../lib/homeContent';

const scrollToRequest = () => {
  document.getElementById('airport-transfer-request')?.scrollIntoView({ behavior: 'smooth' });
};

const AirportTransferSaarlandPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/airport-transfers-saarland"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={scrollToRequest}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <AirportTransferSaarlandHero onRequestTransfer={scrollToRequest} content={content} />
        <AirportTransferRequest content={content} />
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={scrollToRequest}
        onOpenTransferModal={scrollToRequest}
      />

      {legalModalType && (
        <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
      )}
      <AiChatConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        onOpenBooking={() => {
          setAiConciergeOpen(false);
          scrollToRequest();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          scrollToRequest();
        }}
      />
    </div>
  );
};

export default AirportTransferSaarlandPage;
