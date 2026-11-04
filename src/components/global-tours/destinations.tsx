import React from 'react';
import { ArrowRight, Globe2 } from 'lucide-react';
import { globalToursContentDefaults, HomeContent, homeContentValue } from '../../lib/homeContent';

const popularDestinations = [
  ['🇩🇪', 'Germany'],
  ['🇦🇪', 'Dubai'],
  ['🇬🇭', 'Ghana'],
  ['🇰🇪', 'Kenya'],
  ['🇺🇬', 'Uganda'],
  ['🌴', 'Zanzibar'],
  ['🇫🇷', 'Paris'],
  ['🇻🇳', 'Vietnam'],
  ['🇱🇦', 'Laos'],
  ['🇰🇭', 'Cambodia'],
  ['🇹🇭', 'Thailand'],
  ['🇹🇿', 'Tanzania'],
  ['🇹🇹', 'Trinidad & Tobago'],
];

const destinations = [
  { name: 'Paris', category: 'France', image: '/assets/global-tours/img_tow.jpeg', alt: 'The Eiffel Tower overlooking Paris' },
  { name: 'Dubai', category: 'United Arab Emirates', image: '/assets/global-tours/image11.jpeg', alt: 'A landmark in the modern city of Dubai' },
  { name: 'Tropical Islands', category: 'Southeast Asia', image: '/assets/global-tours/img_moun.jpeg', alt: 'Tropical island scenery surrounded by turquoise water' },
  { name: 'Ha Long Bay', category: 'Vietnam', image: '/assets/global-tours/imgi_28.jpg', alt: 'Limestone islands rising from the sea in Vietnam' },
  { name: 'Safari Adventures', category: 'East Africa', image: '/assets/global-tours/imgi_27.jpg', alt: 'Wildlife in a natural African landscape' },
  { name: 'Coastal Escapes', category: 'Worldwide', image: '/assets/global-tours/imgi_29.jpg', alt: 'A peaceful tropical coastline' },
  { name: 'African Wildlife', category: 'Africa', image: '/assets/global-tours/imgi_elmen.jpeg', alt: 'Elephants walking together across the savannah' },
];

interface GlobalToursDestinationsProps {
  requestUrl: string;
  content?: HomeContent;
}

const GlobalToursDestinations: React.FC<GlobalToursDestinationsProps> = ({ requestUrl, content }) => (
  <section className="border-t border-teal-100 bg-white py-14 sm:py-16">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          <Globe2 aria-hidden="true" className="h-7 w-7 text-teal-700" />
          {homeContentValue(content, 'global_tours_destinations_title', globalToursContentDefaults.global_tours_destinations_title)}
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {popularDestinations.map(([flag, defaultName], index) => {
            const name = homeContentValue(content, `global_tours_popular_${index + 1}_name`, defaultName);
            return (
            <a
              key={name}
              href={`${requestUrl}%20Destination%3A%20${encodeURIComponent(name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:border-teal-400 hover:bg-teal-100"
            >
              <span aria-hidden="true">{flag}</span>
              {name}
            </a>
            );
          })}
        </div>
        <p className="mt-5 text-base italic text-slate-700">
          {homeContentValue(content, 'global_tours_destinations_prompt', globalToursContentDefaults.global_tours_destinations_prompt)}
        </p>
      </div>

      <aside className="mt-8 rounded-2xl border border-teal-100 border-l-4 border-l-teal-700 bg-teal-50 px-6 py-5 sm:px-8 sm:py-6">
        <h3 className="text-xl font-bold text-slate-900">{homeContentValue(content, 'global_tours_zanzibar_title', globalToursContentDefaults.global_tours_zanzibar_title)}</h3>
        <p className="mt-2 leading-7 text-slate-700">
          {homeContentValue(content, 'global_tours_zanzibar_description', globalToursContentDefaults.global_tours_zanzibar_description)}
        </p>
      </aside>

      <div className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-teal-900 sm:text-3xl">
          {homeContentValue(content, 'global_tours_discover_title', globalToursContentDefaults.global_tours_discover_title)}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => {
            const number = index + 1;
            const name = homeContentValue(content, `global_tours_destination_${number}_name`, destination.name);
            const category = homeContentValue(content, `global_tours_destination_${number}_category`, destination.category);
            const image = homeContentValue(content, `global_tours_destination_${number}_image`, destination.image);
            const imageAlt = homeContentValue(content, `global_tours_destination_${number}_image_alt`, destination.alt);
            return (
            <a
              key={destination.name}
              href={`${requestUrl}%20Destination%3A%20${encodeURIComponent(name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-teal-200">
                    {category}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">{name}</h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-teal-800 transition group-hover:bg-teal-700 group-hover:text-white">
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
            </a>
            );
          })}
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-4 rounded-2xl border border-teal-100 bg-teal-50 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{homeContentValue(content, 'global_tours_destinations_cta_title', globalToursContentDefaults.global_tours_destinations_cta_title)}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              {homeContentValue(content, 'global_tours_destinations_cta_description', globalToursContentDefaults.global_tours_destinations_cta_description)}
            </p>
          </div>
          <a
            href={requestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-teal-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-900"
          >
            {homeContentValue(content, 'global_tours_destinations_cta_button', globalToursContentDefaults.global_tours_destinations_cta_button)}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default GlobalToursDestinations;
