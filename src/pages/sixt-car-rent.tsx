import React, { useState } from 'react';
import { CarFront, ExternalLink } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import { HomeContent, sixtCarRentContentDefaults, homeContentValue } from '../lib/homeContent';

const SixtCarRentPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sixtUrl = homeContentValue(content, 'sixt_car_rent_portal_url', sixtCarRentContentDefaults.sixt_car_rent_portal_url);
  const openSixt = () => window.open(sixtUrl, '_blank', 'noopener,noreferrer');

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/sixt-car-rent"
        onNavigate={navigate}
        onOpenBooking={openSixt}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <section className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">{homeContentValue(content, 'sixt_car_rent_heading_label', sixtCarRentContentDefaults.sixt_car_rent_heading_label)}</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">{homeContentValue(content, 'sixt_car_rent_heading_title', sixtCarRentContentDefaults.sixt_car_rent_heading_title)}</h1>
              <p className="mt-2 text-slate-600">{homeContentValue(content, 'sixt_car_rent_heading_description', sixtCarRentContentDefaults.sixt_car_rent_heading_description)}</p>
            </div>
            <button
              type="button"
              onClick={openSixt}
              className="inline-flex shrink-0 items-center gap-2 font-semibold text-teal-800 hover:text-teal-950"
            >
              {homeContentValue(content, 'sixt_car_rent_heading_button', sixtCarRentContentDefaults.sixt_car_rent_heading_button)}
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[420px] max-w-7xl flex-col items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-teal-50 px-6 py-12 text-center shadow-sm sm:min-h-[500px]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-teal-800">
              <CarFront aria-hidden="true" className="h-10 w-10" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">{homeContentValue(content, 'sixt_car_rent_portal_title', sixtCarRentContentDefaults.sixt_car_rent_portal_title)}</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
              {homeContentValue(content, 'sixt_car_rent_portal_description', sixtCarRentContentDefaults.sixt_car_rent_portal_description)}
            </p>
            <a
              href={sixtUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-teal-800 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
            >
              {homeContentValue(content, 'sixt_car_rent_portal_button', sixtCarRentContentDefaults.sixt_car_rent_portal_button)}
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm text-slate-500">{homeContentValue(content, 'sixt_car_rent_portal_note', sixtCarRentContentDefaults.sixt_car_rent_portal_note)}</p>
          </div>
        </section>
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openSixt}
        onOpenTransferModal={() => navigate('/airport-transfers-saarland')}
      />

      {legalModalType && <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />}
      <AiChatConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        onOpenBooking={() => {
          setAiConciergeOpen(false);
          openSixt();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          navigate('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default SixtCarRentPage;
