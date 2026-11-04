import React from 'react';
import { MessageCircle } from 'lucide-react';
import { HomeContent, homeContentValue, websiteContentDefaults } from '../../lib/homeContent';
import { contactChannels } from '../../lib/contactChannels';

const BookingHelp: React.FC<{ content?: HomeContent; contentPrefix?: 'holidays' | 'vacation' }> = ({
  content,
  contentPrefix = 'holidays',
}) => {
  return (
  <section className="bg-white pb-16 sm:pb-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="rounded-2xl border border-teal-100 bg-white p-6 sm:p-9">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {homeContentValue(content, `${contentPrefix}_help_title`, websiteContentDefaults[`${contentPrefix}_help_title`])}
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          {homeContentValue(content, `${contentPrefix}_help_description`, websiteContentDefaults[`${contentPrefix}_help_description`])}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-start gap-3 rounded-xl bg-teal-50 p-5 text-teal-800 transition hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              <MessageCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                <span className="block font-bold">{channel.label}</span>
                <span className="mt-1 block break-all font-semibold">{channel.value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default BookingHelp;
