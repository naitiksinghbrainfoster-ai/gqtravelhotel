import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import { LegalText } from '../components/LegalText';
import { HomeContent, homeContentValue, legalPageContentDefaults } from '../lib/homeContent';
import { GERMANY_WHATSAPP } from '../lib/contactChannels';

type TransferTermsPageProps = {
  page: 'airport_transfer_terms' | 'accra_transfer_terms';
  content: HomeContent;
};

const TransferTermsPage: React.FC<TransferTermsPageProps> = ({ page, content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const titleKey = `${page}_page_title`;
  const subtitleKey = `${page}_page_subtitle`;
  const bodyKey = `${page}_page_body`;
  const title = homeContentValue(content, titleKey, legalPageContentDefaults[titleKey]);
  const subtitle = homeContentValue(content, subtitleKey, legalPageContentDefaults[subtitleKey]);
  const body = content[bodyKey]?.trim() ?? '';
  const path = page === 'airport_transfer_terms' ? '/airport-transfer-terms' : '/accra-transfer-terms';

  const navigateTo = (nextPath: string) => {
    window.history.pushState({}, '', nextPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openBooking = () => {
    window.open(GERMANY_WHATSAPP.href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar
        currentPath={path}
        onNavigate={navigateTo}
        onOpenBooking={openBooking}
        onOpenLegal={setLegalModalType}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
          <div className="mt-8">
            {body ? (
              <LegalText content={body} />
            ) : (
              <p className="rounded-xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                This page is being prepared. Please contact GQ Travel &amp; Hotels if you need information about these transfer terms.
              </p>
            )}
          </div>
        </article>
      </main>
      <Footer
        onNavigate={navigateTo}
        onOpenLegal={setLegalModalType}
        onOpenBooking={openBooking}
        onOpenTransferModal={() => navigateTo('/airport-transfers-saarland')}
      />
      {legalModalType && <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />}
      <AiChatConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        onOpenBooking={() => {
          setAiConciergeOpen(false);
          openBooking();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          navigateTo('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default TransferTermsPage;
