import React from 'react';
import { ExternalLink } from 'lucide-react';
import { globalFlightContentDefaults, HomeContent, homeContentValue } from '../../lib/homeContent';

interface GlobalFlightBookingPortalProps {
  bookingUrl: string;
  content?: HomeContent;
}

const GlobalFlightBookingPortal: React.FC<GlobalFlightBookingPortalProps> = ({ bookingUrl, content }) => (
  <section className="bg-teal-950 px-5 py-12 text-white sm:px-8 sm:py-16">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-teal-300">
            {homeContentValue(content, 'global_flight_portal_label', globalFlightContentDefaults.global_flight_portal_label)}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            {homeContentValue(content, 'global_flight_portal_title', globalFlightContentDefaults.global_flight_portal_title)}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-teal-50/90">
            {homeContentValue(content, 'global_flight_portal_description', globalFlightContentDefaults.global_flight_portal_description)}
          </p>
        </div>
        <a
          href={bookingUrl}
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-teal-400 px-5 py-3 text-sm font-bold text-teal-950 transition hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {homeContentValue(content, 'global_flight_portal_button', globalFlightContentDefaults.global_flight_portal_button)}
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);

export default GlobalFlightBookingPortal;
