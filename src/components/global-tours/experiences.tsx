import React from 'react';
import { ArrowRight, Compass, Globe2, Landmark, PawPrint } from 'lucide-react';
import { globalToursContentDefaults, HomeContent, homeContentValue } from '../../lib/homeContent';

const experienceIcons = [Landmark, PawPrint, Globe2];

interface GlobalToursExperiencesProps {
  requestUrl: string;
  content?: HomeContent;
}

const GlobalToursExperiences: React.FC<GlobalToursExperiencesProps> = ({ requestUrl, content }) => (
  <section className="bg-white py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
          {homeContentValue(content, 'global_tours_experiences_label', globalToursContentDefaults.global_tours_experiences_label)}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-teal-900 sm:text-4xl">
          {homeContentValue(content, 'global_tours_experiences_title', globalToursContentDefaults.global_tours_experiences_title)}
        </h2>
        <p className="mt-4 leading-7 text-slate-600">
          {homeContentValue(content, 'global_tours_experiences_description', globalToursContentDefaults.global_tours_experiences_description)}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {experienceIcons.map((Icon, index) => {
          const number = index + 1;
          const title = homeContentValue(content, `global_tours_experience_${number}_title`, globalToursContentDefaults[`global_tours_experience_${number}_title`]);
          const description = homeContentValue(content, `global_tours_experience_${number}_description`, globalToursContentDefaults[`global_tours_experience_${number}_description`]);
          return (
          <article
            key={title}
            className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-800">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            <a
              href={requestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-950"
            >
              {homeContentValue(content, 'global_tours_experience_card_cta', globalToursContentDefaults.global_tours_experience_card_cta)}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </article>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <a
          href={requestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-950"
        >
          <Compass aria-hidden="true" className="h-4 w-4" />
          {homeContentValue(content, 'global_tours_experience_cta', globalToursContentDefaults.global_tours_experience_cta)}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);

export default GlobalToursExperiences;
