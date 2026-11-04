import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import HolidaysHero from '../components/holidays/hero';
import HolidayPartners from '../components/holidays/partners';
import BookingHelp from '../components/holidays/booking-help';
import { HomeContent, homeContentValue, websiteContentDefaults } from '../lib/homeContent';

const VacationPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const whatsappNumber = homeContentValue(content, 'vacation_whatsapp_number', websiteContentDefaults.vacation_whatsapp_number).replace(/\D/g, '');
  const openWhatsApp = () =>
    window.open(`https://wa.me/${whatsappNumber}`, '_blank', 'noopener,noreferrer');

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/vacation"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={openWhatsApp}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <HolidaysHero content={content} contentPrefix="vacation" />
        <HolidayPartners content={content} contentPrefix="vacation" />
        <BookingHelp content={content} contentPrefix="vacation" />
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openWhatsApp}
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
          openWhatsApp();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          window.location.assign('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default VacationPage;
