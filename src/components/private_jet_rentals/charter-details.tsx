import React from 'react';
import {
  ArrowRight,
  CalendarClock,
  Globe2,
  Mail,
  MessageCircle,
  Plane,
  SlidersHorizontal,
} from 'lucide-react';
import { HomeContent, homeContentValue, privateJetContentDefaults } from '../../lib/homeContent';
import { GERMANY_WHATSAPP, HOTEL_EMAIL } from '../../lib/contactChannels';

const features = [
  CalendarClock,
  SlidersHorizontal,
  Globe2,
];

interface PrivateJetCharterDetailsProps {
  quoteUrl: string;
  emailUrl: string;
  content?: HomeContent;
}

const PrivateJetCharterDetails: React.FC<PrivateJetCharterDetailsProps> = ({
  quoteUrl,
  emailUrl,
  content,
}) => (
  <section className="bg-teal-50/60 py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
          {homeContentValue(content, 'private_jet_details_label', privateJetContentDefaults.private_jet_details_label)}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {homeContentValue(content, 'private_jet_details_title', privateJetContentDefaults.private_jet_details_title)}
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          {homeContentValue(content, 'private_jet_details_description', privateJetContentDefaults.private_jet_details_description)}
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {features.map((Icon, index) => {
          const number = index + 1;
          const title = homeContentValue(content, `private_jet_feature_${number}_title`, privateJetContentDefaults[`private_jet_feature_${number}_title`]);
          const description = homeContentValue(content, `private_jet_feature_${number}_description`, privateJetContentDefaults[`private_jet_feature_${number}_description`]);
          return (
          <article key={title} className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Icon aria-hidden="true" className="h-7 w-7 text-teal-700" />
            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </article>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl bg-teal-950 px-6 py-10 text-center text-white sm:px-10">
        <Plane aria-hidden="true" className="mx-auto h-8 w-8 text-teal-300" />
        <h3 className="mt-4 text-2xl font-bold">{homeContentValue(content, 'private_jet_cta_title', privateJetContentDefaults.private_jet_cta_title)}</h3>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-teal-50/80">
          {homeContentValue(content, 'private_jet_cta_description', privateJetContentDefaults.private_jet_cta_description)}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-6 py-3.5 font-bold text-teal-950 transition-colors hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            {GERMANY_WHATSAPP.label}: {GERMANY_WHATSAPP.value}
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </a>
          <a
            href={emailUrl}
            className="inline-flex items-center gap-2 rounded-lg border border-teal-200/50 bg-white/5 px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Mail aria-hidden="true" className="h-5 w-5" />
            {HOTEL_EMAIL.value}
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default PrivateJetCharterDetails;
