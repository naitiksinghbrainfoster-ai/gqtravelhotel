import React from 'react';
import { ArrowRight, Globe2, Mail, MessageCircle, Plane, ShieldCheck } from 'lucide-react';
import { HomeContent, homeContentValue, privateJetContentDefaults } from '../../lib/homeContent';
import { GERMANY_WHATSAPP, HOTEL_EMAIL } from '../../lib/contactChannels';

interface PrivateJetHeroProps {
  quoteUrl: string;
  emailUrl: string;
  content?: HomeContent;
}

const PrivateJetHero: React.FC<PrivateJetHeroProps> = ({ quoteUrl, emailUrl, content }) => (
  <section className="relative isolate overflow-hidden bg-teal-950 text-white">
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-800/50 via-teal-950 to-teal-950"
    />
    <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-14">
      <div className="lg:col-span-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-100 backdrop-blur">
          <Globe2 aria-hidden="true" className="h-4 w-4 text-teal-300" />
          {homeContentValue(content, 'private_jet_hero_badge', privateJetContentDefaults.private_jet_hero_badge)}
        </div>
        <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {homeContentValue(content, 'private_jet_hero_title', privateJetContentDefaults.private_jet_hero_title)}
        </h1>
        <p className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {homeContentValue(content, 'private_jet_hero_tagline', privateJetContentDefaults.private_jet_hero_tagline)}
        </p>
        <p className="mt-4 max-w-xl text-base leading-7 text-teal-50 sm:text-lg sm:leading-8">
          {homeContentValue(content, 'private_jet_hero_description', privateJetContentDefaults.private_jet_hero_description)}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-teal-100/75 sm:text-base">
          {homeContentValue(content, 'private_jet_hero_secondary', privateJetContentDefaults.private_jet_hero_secondary)}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-6 py-3.5 text-sm font-bold text-teal-950 shadow-lg shadow-teal-950/20 transition hover:-translate-y-0.5 hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            {GERMANY_WHATSAPP.label}: {GERMANY_WHATSAPP.value}
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </a>
          <a
            href={emailUrl}
            className="inline-flex items-center gap-2 rounded-lg border border-teal-200/50 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Mail aria-hidden="true" className="h-5 w-5" />
            {HOTEL_EMAIL.value}
          </a>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-teal-100/75">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-teal-300" />
          {homeContentValue(content, 'private_jet_hero_notice', privateJetContentDefaults.private_jet_hero_notice)}
        </p>
      </div>
      <div className="relative lg:col-span-6">
        <div className="absolute -inset-4 rounded-[2rem] bg-teal-300/10 blur-2xl" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-2xl border border-teal-200/20 bg-teal-950 shadow-2xl shadow-black/40">
          <img
            src={homeContentValue(content, 'private_jet_hero_image', privateJetContentDefaults.private_jet_hero_image)}
            alt={homeContentValue(content, 'private_jet_hero_image_alt', privateJetContentDefaults.private_jet_hero_image_alt)}
            className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-teal-950/10" />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">
                {homeContentValue(content, 'private_jet_image_label', privateJetContentDefaults.private_jet_image_label)}
              </span>
              <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
                {homeContentValue(content, 'private_jet_image_caption', privateJetContentDefaults.private_jet_image_caption)}
              </p>
            </div>
            <Plane aria-hidden="true" className="mb-1 h-7 w-7 shrink-0 text-teal-200" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PrivateJetHero;
