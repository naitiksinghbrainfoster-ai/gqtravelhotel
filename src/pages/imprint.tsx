import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LegalText } from '../components/LegalText';
import { HomeContent, homeContentValue, legalPageContentDefaults } from '../lib/homeContent';
import { contactChannels } from '../lib/contactChannels';

type ImprintPageProps = {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking: () => void;
  onOpenLegal: (type: 'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms') => void;
  onOpenConcierge: () => void;
  onOpenTransferModal: () => void;
  content?: HomeContent;
};

const ImprintPage: React.FC<ImprintPageProps> = ({
  currentPath = '/imprint',
  onNavigate,
  onOpenBooking,
  onOpenLegal,
  onOpenConcierge,
  onOpenTransferModal,
  content,
}) => {
  const customBody = content?.imprint_page_body ?? '';
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar
        currentPath={currentPath}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
        onOpenLegal={onOpenLegal}
        onOpenConcierge={onOpenConcierge}
      />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">Imprint</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {homeContentValue(content, 'imprint_page_title', legalPageContentDefaults.imprint_page_title)}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {homeContentValue(content, 'imprint_page_subtitle', legalPageContentDefaults.imprint_page_subtitle)}
          </p>

          {customBody.trim() ? <div className="mt-8"><LegalText content={customBody} /></div> : <div className="mt-8 space-y-8 text-sm leading-7 text-slate-700">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">01</h2>
              <h3 className="text-base font-bold text-slate-900">Service Provider / Owner</h3>
              <p className="font-semibold text-slate-900">GQ Travel &amp; Hotels</p>
              <p>Owner: Jim E. Baggiocy</p>
              <p>Hochstreet 145</p>
              <p>66115 Saarbrücken – Germany</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">02</h2>
              <h3 className="text-base font-bold text-slate-900">Contact</h3>
              <div className="space-y-2">
                {contactChannels.map((channel) => (
                  <p key={channel.label}>
                    {channel.label}:{' '}
                    <a
                      href={channel.href}
                      {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-teal-800 underline"
                    >
                      {channel.value}
                    </a>
                  </p>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">03</h2>
              <h3 className="text-base font-bold text-slate-900">Tax Number</h3>
              <p>Steuernummer: 040/216/13504</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">04</h2>
              <h3 className="text-base font-bold text-slate-900">Legal Form</h3>
              <p>GQ Travel &amp; Hotels is operated as a sole proprietorship (Einzelunternehmen).</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">05</h2>
              <h3 className="text-base font-bold text-slate-900">Person Responsible for Content</h3>
              <p>Pursuant to Section 18 (2) MStV</p>
              <p>Jim E. Baggiocy</p>
              <p>GQ Travel &amp; Hotels</p>
              <p>Hochstreet 145</p>
              <p>66115 Saarbrücken – Germany</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">06</h2>
              <h3 className="text-base font-bold text-slate-900">Website &amp; Design</h3>
              <p>Website Development: Jim E. Baggiocy &amp; Helene O.</p>
              <p>Updated Design: BrainFoster</p>
              <p>UX/UI &amp; Web Design: Helena O.</p>
              <p>Graphics &amp; Photography: Helena O.</p>
              <p>Content: Jim E. Baggioc</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">07</h2>
              <h3 className="text-base font-bold text-slate-900">Company Int. Identification</h3>
              <p>D-U-N-S Number: 342423355</p>
            </section>
          </div>}
        </div>
      </main>

      <Footer
        onNavigate={onNavigate}
        onOpenLegal={onOpenLegal}
        onOpenBooking={onOpenBooking}
        onOpenTransferModal={onOpenTransferModal}
      />
    </div>
  );
};

export default ImprintPage;
