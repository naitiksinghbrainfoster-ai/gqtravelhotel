import React from 'react';
import { ArrowRight, Check, Globe2 } from 'lucide-react';
import { globalToursContentDefaults, HomeContent, homeContentValue } from '../../lib/homeContent';

interface GlobalToursHeroProps {
  requestUrl: string;
}

const GlobalToursHero: React.FC<GlobalToursHeroProps & { content?: HomeContent }> = ({ requestUrl, content }) => (
  <section className="relative overflow-hidden bg-white">
    <div aria-hidden="true" className="absolute -right-36 -top-40 h-96 w-96 rounded-full bg-teal-50" />
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
      <div className="max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-800">
          <Globe2 aria-hidden="true" className="h-4 w-4" />
          {homeContentValue(content, 'global_tours_hero_badge', globalToursContentDefaults.global_tours_hero_badge)}
        </div>
        <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-teal-900 sm:text-5xl lg:text-6xl">
          {homeContentValue(content, 'global_tours_hero_title', globalToursContentDefaults.global_tours_hero_title)}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
          {homeContentValue(content, 'global_tours_hero_description', globalToursContentDefaults.global_tours_hero_description)}
        </p>
        <div className="mt-6 flex max-w-xl flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <span
              key={number}
              className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-2 text-sm font-semibold text-teal-800"
            >
              <Check aria-hidden="true" className="h-3.5 w-3.5 text-teal-700" />
              {homeContentValue(content, `global_tours_service_${number}`, globalToursContentDefaults[`global_tours_service_${number}`])}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={requestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-teal-800 px-6 py-3 text-sm font-bold text-white shadow-md shadow-teal-900/15 transition hover:-translate-y-0.5 hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            {homeContentValue(content, 'global_tours_hero_cta_primary', globalToursContentDefaults.global_tours_hero_cta_primary)}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href={requestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-teal-800 bg-white px-6 py-3 text-sm font-bold text-teal-900 transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            {homeContentValue(content, 'global_tours_hero_cta_secondary', globalToursContentDefaults.global_tours_hero_cta_secondary)}
          </a>
        </div>
      </div>

      <div className="relative lg:pl-2">
        <div className="absolute -inset-3 rounded-[2rem] bg-teal-100/80" aria-hidden="true" />
        <img
          src={homeContentValue(content, 'global_tours_hero_image', globalToursContentDefaults.global_tours_hero_image)}
          alt={homeContentValue(content, 'global_tours_hero_image_alt', globalToursContentDefaults.global_tours_hero_image_alt)}
          className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl ring-1 ring-teal-900/10"
        />
        <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:bottom-6 sm:left-6 sm:px-5">
          <p className="text-xs font-bold uppercase tracking-wide text-teal-700">{homeContentValue(content, 'global_tours_hero_image_label', globalToursContentDefaults.global_tours_hero_image_label)}</p>
          <p className="mt-0.5 font-bold text-slate-900">{homeContentValue(content, 'global_tours_hero_image_caption', globalToursContentDefaults.global_tours_hero_image_caption)}</p>
        </div>
      </div>
    </div>
  </section>
);

export default GlobalToursHero;
