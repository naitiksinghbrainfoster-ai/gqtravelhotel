import React from 'react';
import { ArrowRight, CalendarDays, Mail, MapPinned, Train } from 'lucide-react';
import { HomeContent, homeContentValue, railwayContentDefaults } from '../../lib/homeContent';
import { contactChannels, HOTEL_EMAIL } from '../../lib/contactChannels';

const requestIcons = [MapPinned, CalendarDays, Train];
const railRequestUrl = (content?: HomeContent) => {
  const subject = homeContentValue(content, 'railway_email_subject', railwayContentDefaults.railway_email_subject);
  const body = homeContentValue(content, 'railway_email_body', railwayContentDefaults.railway_email_body);
  return `${HOTEL_EMAIL.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const RailwayBookingInfo: React.FC<{ content?: HomeContent }> = ({ content }) => (
  <section className="bg-teal-50/60 px-5 py-14 sm:px-8 sm:py-16">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
          {homeContentValue(content, 'railway_request_label', railwayContentDefaults.railway_request_label)}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-teal-950 sm:text-4xl">
          {homeContentValue(content, 'railway_request_title', railwayContentDefaults.railway_request_title)}
        </h2>
        <p className="mt-4 leading-7 text-slate-700">
          {homeContentValue(content, 'railway_request_description', railwayContentDefaults.railway_request_description)}
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((number) => {
          const Icon = requestIcons[number - 1];
          return (
          <article key={number} className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-800">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-slate-900">{homeContentValue(content, `railway_detail_${number}_title`, railwayContentDefaults[`railway_detail_${number}_title`])}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{homeContentValue(content, `railway_detail_${number}_description`, railwayContentDefaults[`railway_detail_${number}_description`])}</p>
          </article>
          );
        })}
      </div>

      <div className="mt-9 rounded-2xl bg-teal-950 px-6 py-8 text-center text-white sm:px-10">
        <Mail aria-hidden="true" className="mx-auto h-7 w-7 text-teal-300" />
        <h3 className="mt-4 text-2xl font-bold">{homeContentValue(content, 'railway_cta_title', railwayContentDefaults.railway_cta_title)}</h3>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-teal-50/80">
          {homeContentValue(content, 'railway_cta_description', railwayContentDefaults.railway_cta_description)}
        </p>
        <a
          href={railRequestUrl(content)}
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-teal-300 px-6 py-3 text-sm font-bold text-teal-950 transition hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {homeContentValue(content, 'railway_cta_button', railwayContentDefaults.railway_cta_button)}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-teal-100/80">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="hover:text-white hover:underline"
            >
              {channel.label}: {channel.value}
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export { railRequestUrl };
export default RailwayBookingInfo;
