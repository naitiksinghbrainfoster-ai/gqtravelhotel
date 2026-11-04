import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import GlobalFlightBookingPortal from '../components/global-flight/booking-portal';
import { ArrowRight, BriefcaseBusiness, Globe2, Plane } from 'lucide-react';
import { globalFlightContentDefaults, HomeContent, homeContentValue } from '../lib/homeContent';

const GlobalFlightPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  const bookingUrl = homeContentValue(content, 'global_flight_portal_url', globalFlightContentDefaults.global_flight_portal_url);
  const openFlightBooking = () => window.location.assign(bookingUrl);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/global-flight"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={openFlightBooking}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <section className="bg-teal-950 px-5 py-12 text-white sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-200">
              {homeContentValue(content, 'global_flight_hero_label', globalFlightContentDefaults.global_flight_hero_label)}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {homeContentValue(content, 'global_flight_hero_title', globalFlightContentDefaults.global_flight_hero_title)}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-teal-50 sm:text-lg">
              {homeContentValue(content, 'global_flight_hero_description', globalFlightContentDefaults.global_flight_hero_description)}
            </p>
            <a
              href={bookingUrl}
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-teal-400 px-5 py-3 text-sm font-bold text-teal-950 transition hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {homeContentValue(content, 'global_flight_hero_button', globalFlightContentDefaults.global_flight_hero_button)}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </section>
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-teal-700">
                {homeContentValue(content, 'global_flight_steps_label', globalFlightContentDefaults.global_flight_steps_label)}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {homeContentValue(content, 'global_flight_steps_title', globalFlightContentDefaults.global_flight_steps_title)}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                {homeContentValue(content, 'global_flight_steps_description', globalFlightContentDefaults.global_flight_steps_description)}
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
                <Globe2 aria-hidden="true" className="h-7 w-7 text-teal-700" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{homeContentValue(content, 'global_flight_feature_1_title', globalFlightContentDefaults.global_flight_feature_1_title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {homeContentValue(content, 'global_flight_feature_1_description', globalFlightContentDefaults.global_flight_feature_1_description)}
                </p>
              </article>
              <article className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
                <Plane aria-hidden="true" className="h-7 w-7 text-teal-700" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{homeContentValue(content, 'global_flight_feature_2_title', globalFlightContentDefaults.global_flight_feature_2_title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {homeContentValue(content, 'global_flight_feature_2_description', globalFlightContentDefaults.global_flight_feature_2_description)}
                </p>
              </article>
              <article className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
                <BriefcaseBusiness aria-hidden="true" className="h-7 w-7 text-teal-700" />
                <h3 className="mt-4 text-lg font-bold text-slate-900">{homeContentValue(content, 'global_flight_feature_3_title', globalFlightContentDefaults.global_flight_feature_3_title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {homeContentValue(content, 'global_flight_feature_3_description', globalFlightContentDefaults.global_flight_feature_3_description)}
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="border-y border-teal-100 bg-teal-50/50 px-5 py-14 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-teal-700">
                {homeContentValue(content, 'global_flight_planning_label', globalFlightContentDefaults.global_flight_planning_label)}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {homeContentValue(content, 'global_flight_planning_title', globalFlightContentDefaults.global_flight_planning_title)}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                {homeContentValue(content, 'global_flight_planning_description', globalFlightContentDefaults.global_flight_planning_description)}
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((step) => (
                <li key={step} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-teal-900/5">
                  <span className="text-sm font-extrabold text-teal-700">{String(step).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-bold text-slate-900">{homeContentValue(content, `global_flight_step_${step}_title`, globalFlightContentDefaults[`global_flight_step_${step}_title`])}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{homeContentValue(content, `global_flight_step_${step}_description`, globalFlightContentDefaults[`global_flight_step_${step}_description`])}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <GlobalFlightBookingPortal bookingUrl={bookingUrl} content={content} />
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

export default GlobalFlightPage;
