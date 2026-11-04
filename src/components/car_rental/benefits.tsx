import React from 'react';
import { ArrowRight, CheckCircle2, Headset, ReceiptText } from 'lucide-react';
import { HomeContent, carRentalContentDefaults, homeContentValue } from '../../lib/homeContent';

const benefits = [
  { icon: CheckCircle2 },
  { icon: CheckCircle2 },
  { icon: CheckCircle2 },
  { icon: Headset },
  { icon: ReceiptText },
];

interface CarRentalBenefitsProps {
  bookingUrl: string;
  content?: HomeContent;
}

const CarRentalBenefits: React.FC<CarRentalBenefitsProps> = ({ bookingUrl, content }) => (
  <section className="bg-slate-50 py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">
          {homeContentValue(content, 'car_rental_benefits_label', carRentalContentDefaults.car_rental_benefits_label)}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {homeContentValue(content, 'car_rental_benefits_title', carRentalContentDefaults.car_rental_benefits_title)}
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ icon: Icon }, index) => {
          const number = index + 1;
          const title = homeContentValue(content, `car_rental_benefit_${number}_title`, carRentalContentDefaults[`car_rental_benefit_${number}_title`]);
          const description = homeContentValue(content, `car_rental_benefit_${number}_description`, carRentalContentDefaults[`car_rental_benefit_${number}_description`]);
          return (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <Icon aria-hidden="true" className="h-6 w-6 text-teal-700" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </article>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl bg-teal-950 px-6 py-10 text-center text-white sm:px-10">
        <p className="mx-auto max-w-3xl text-base leading-7 text-teal-50 sm:text-lg">
          {homeContentValue(content, 'car_rental_cta_description', carRentalContentDefaults.car_rental_cta_description)}
        </p>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-teal-400 px-6 py-3.5 font-bold text-teal-950 transition-colors hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {homeContentValue(content, 'car_rental_cta_button', carRentalContentDefaults.car_rental_cta_button)}
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </a>
      </div>
    </div>
  </section>
);

export default CarRentalBenefits;
