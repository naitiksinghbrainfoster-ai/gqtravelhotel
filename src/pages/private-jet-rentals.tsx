import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import PrivateJetHero from '../components/private_jet_rentals/hero';
import PrivateJetCharterDetails from '../components/private_jet_rentals/charter-details';
import { HomeContent, homeContentValue, privateJetContentDefaults } from '../lib/homeContent';
import { GERMANY_WHATSAPP, HOTEL_EMAIL } from '../lib/contactChannels';

const PrivateJetRentalsPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const quoteUrl = `${GERMANY_WHATSAPP.href}?text=${encodeURIComponent(homeContentValue(content, 'private_jet_whatsapp_message', privateJetContentDefaults.private_jet_whatsapp_message))}`;
  const secondContactUrl = `${HOTEL_EMAIL.href}?subject=${encodeURIComponent(homeContentValue(content, 'private_jet_email_subject', privateJetContentDefaults.private_jet_email_subject))}&body=${encodeURIComponent(homeContentValue(content, 'private_jet_email_body', privateJetContentDefaults.private_jet_email_body))}`;

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/private-jet-rentals"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => window.open(quoteUrl, '_blank', 'noopener,noreferrer')}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <PrivateJetHero quoteUrl={quoteUrl} emailUrl={secondContactUrl} content={content} />
        <PrivateJetCharterDetails quoteUrl={quoteUrl} emailUrl={secondContactUrl} content={content} />
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={() => window.open(quoteUrl, '_blank', 'noopener,noreferrer')}
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
          window.open(quoteUrl, '_blank', 'noopener,noreferrer');
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          window.location.assign('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default PrivateJetRentalsPage;
