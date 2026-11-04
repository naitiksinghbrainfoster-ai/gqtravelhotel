import React, { useState } from 'react';
import { ArrowRight, ExternalLink, MapPin, Search, TicketCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import { HomeContent, globalAutoRentContentDefaults, homeContentValue } from '../lib/homeContent';

const GlobalAutoRentPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const portalUrl = homeContentValue(content, 'global_auto_rent_portal_url', globalAutoRentContentDefaults.global_auto_rent_portal_url);
  const openBookingPortal = () =>
    window.open(portalUrl, '_blank', 'noopener,noreferrer');

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/global-auto-rent"
        onNavigate={navigate}
        onOpenBooking={openBookingPortal}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <section className="relative overflow-hidden bg-teal-950 px-5 py-16 text-white sm:px-8 sm:py-20">
          <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-teal-700/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#00A79D]">
                {homeContentValue(content, 'global_auto_rent_hero_label', globalAutoRentContentDefaults.global_auto_rent_hero_label)}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {homeContentValue(content, 'global_auto_rent_hero_title', globalAutoRentContentDefaults.global_auto_rent_hero_title)}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-teal-50 sm:text-lg">
                {homeContentValue(content, 'global_auto_rent_hero_description', globalAutoRentContentDefaults.global_auto_rent_hero_description)}
              </p>
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#00A79D] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#008f87] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {homeContentValue(content, 'global_auto_rent_hero_button', globalAutoRentContentDefaults.global_auto_rent_hero_button)}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#00A79D]">
                {homeContentValue(content, 'global_auto_rent_steps_label', globalAutoRentContentDefaults.global_auto_rent_steps_label)}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {homeContentValue(content, 'global_auto_rent_steps_title', globalAutoRentContentDefaults.global_auto_rent_steps_title)}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                {homeContentValue(content, 'global_auto_rent_steps_description', globalAutoRentContentDefaults.global_auto_rent_steps_description)}
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
                <Search aria-hidden="true" className="h-7 w-7 text-[#00A79D]" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{homeContentValue(content, 'global_auto_rent_step_1_title', globalAutoRentContentDefaults.global_auto_rent_step_1_title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {homeContentValue(content, 'global_auto_rent_step_1_description', globalAutoRentContentDefaults.global_auto_rent_step_1_description)}
                </p>
              </article>
              <article className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
                <MapPin aria-hidden="true" className="h-7 w-7 text-[#00A79D]" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{homeContentValue(content, 'global_auto_rent_step_2_title', globalAutoRentContentDefaults.global_auto_rent_step_2_title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {homeContentValue(content, 'global_auto_rent_step_2_description', globalAutoRentContentDefaults.global_auto_rent_step_2_description)}
                </p>
              </article>
              <article className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
                <TicketCheck aria-hidden="true" className="h-7 w-7 text-[#00A79D]" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{homeContentValue(content, 'global_auto_rent_step_3_title', globalAutoRentContentDefaults.global_auto_rent_step_3_title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {homeContentValue(content, 'global_auto_rent_step_3_description', globalAutoRentContentDefaults.global_auto_rent_step_3_description)}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-teal-100 bg-teal-50/50 px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-teal-900/5 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#00A79D]">
                {homeContentValue(content, 'global_auto_rent_cta_label', globalAutoRentContentDefaults.global_auto_rent_cta_label)}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {homeContentValue(content, 'global_auto_rent_cta_title', globalAutoRentContentDefaults.global_auto_rent_cta_title)}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {homeContentValue(content, 'global_auto_rent_cta_description', globalAutoRentContentDefaults.global_auto_rent_cta_description)}
              </p>
            </div>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-[#00A79D] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#008f87] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A79D]"
            >
              {homeContentValue(content, 'global_auto_rent_cta_button', globalAutoRentContentDefaults.global_auto_rent_cta_button)}
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openBookingPortal}
        onOpenTransferModal={() => navigate('/airport-transfers-saarland')}
      />

      {legalModalType && <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />}
      <AiChatConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        onOpenBooking={() => {
          setAiConciergeOpen(false);
          openBookingPortal();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          navigate('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default GlobalAutoRentPage;
