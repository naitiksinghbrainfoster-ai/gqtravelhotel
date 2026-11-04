import React from 'react';
import { BadgeCheck, Headset, MapPinned, Sparkles } from 'lucide-react';
import { HomeContent, hotelApartmentsContentDefaults, homeContentValue } from '../../lib/homeContent';

const benefits = [
  {
    icon: MapPinned,
  },
  {
    icon: Headset,
  },
  {
    icon: BadgeCheck,
  },
  {
    icon: Sparkles,
  },
];

const BenefitsSection: React.FC<{ content?: HomeContent }> = ({ content }) => (
  <section className="bg-slate-50 py-20 sm:py-24">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
          {homeContentValue(content, 'hotel_apartments_benefits_label', hotelApartmentsContentDefaults.hotel_apartments_benefits_label)}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {homeContentValue(content, 'hotel_apartments_benefits_title', hotelApartmentsContentDefaults.hotel_apartments_benefits_title)}
        </h2>
        <p className="mt-5 max-w-xl leading-7 text-slate-600">
          {homeContentValue(content, 'hotel_apartments_benefits_description', hotelApartmentsContentDefaults.hotel_apartments_benefits_description)}
        </p>
        <a
          href={`mailto:${homeContentValue(content, 'contact_hotel_email', 'hotel@gqtravel-hotels.com')}?subject=Hotel%20and%20apartment%20enquiry`}
          className="mt-7 inline-flex items-center gap-2 font-semibold text-teal-900 underline decoration-teal-800/40 underline-offset-4 transition hover:text-teal-700"
        >
          {homeContentValue(content, 'hotel_apartments_benefits_cta', hotelApartmentsContentDefaults.hotel_apartments_benefits_cta)}
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {benefits.map(({ icon: Icon }, index) => {
          const number = index + 1;
          const title = homeContentValue(content, `hotel_apartments_benefit_${number}_title`, hotelApartmentsContentDefaults[`hotel_apartments_benefit_${number}_title`]);
          const description = homeContentValue(content, `hotel_apartments_benefit_${number}_description`, hotelApartmentsContentDefaults[`hotel_apartments_benefit_${number}_description`]);
          return (
          <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
