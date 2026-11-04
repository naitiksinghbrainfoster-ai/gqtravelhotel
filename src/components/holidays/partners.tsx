import React from 'react';
import { ArrowRight, Headset, Phone } from 'lucide-react';
import { holidayPartners } from './hero';
import { HomeContent, homeContentValue, websiteContentDefaults } from '../../lib/homeContent';

const HolidayPartners: React.FC<{ content?: HomeContent; contentPrefix?: 'holidays' | 'vacation' }> = ({
  content,
  contentPrefix = 'holidays',
}) => (
  <section id="holiday-partners" className="bg-white py-14 sm:py-16">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
          {homeContentValue(content, `${contentPrefix}_partners_label`, websiteContentDefaults[`${contentPrefix}_partners_label`])}
        </span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {homeContentValue(content, `${contentPrefix}_partners_title`, websiteContentDefaults[`${contentPrefix}_partners_title`])}
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          {homeContentValue(content, `${contentPrefix}_partners_description`, websiteContentDefaults[`${contentPrefix}_partners_description`])}
        </p>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {holidayPartners.map((partner, index) => {
          const number = index + 1;
          const name = homeContentValue(content, `${contentPrefix}_partner_${number}_name`, partner.name);
          const description = homeContentValue(content, `${contentPrefix}_partner_${number}_description`, partner.description);
          const href = homeContentValue(content, `${contentPrefix}_partner_${number}_url`, partner.href);
          const image = homeContentValue(content, `${contentPrefix}_partner_${number}_image`, partner.image);
          const imageAlt = homeContentValue(content, `${contentPrefix}_partner_${number}_image_alt`, partner.imageAlt);
          const Icon = partner.icon;
          return (
          <article
            key={name}
            className="group overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden sm:h-64">
              <img
                src={image}
                alt={imageAlt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-teal-800 shadow">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-200">{homeContentValue(content, `${contentPrefix}_partner_explore_label`, websiteContentDefaults[`${contentPrefix}_partner_explore_label`])}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-white">{name}</h3>
                </div>
              </div>
            </div>
            <div className="flex min-h-36 flex-col bg-teal-50 p-5 sm:p-6">
              <p className="flex-1 text-base font-semibold leading-6 text-slate-800">{description}</p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                {homeContentValue(content, `${contentPrefix}_partner_button`, websiteContentDefaults[`${contentPrefix}_partner_button`])}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </article>
          );
        })}
      </div>

      <aside className="mt-8 rounded-xl border border-teal-100 border-l-4 border-l-teal-700 bg-teal-50 px-6 py-6 sm:px-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-teal-800">
            <Headset aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {homeContentValue(content, `${contentPrefix}_support_title`, websiteContentDefaults[`${contentPrefix}_support_title`])}
            </h2>
            <p className="mt-3 text-base text-slate-700">
              <Phone aria-hidden="true" className="mr-1 inline h-4 w-4" />
              {homeContentValue(content, `${contentPrefix}_support_description`, websiteContentDefaults[`${contentPrefix}_support_description`])}
            </p>
          </div>
        </div>
      </aside>
    </div>
  </section>
);

export default HolidayPartners;
