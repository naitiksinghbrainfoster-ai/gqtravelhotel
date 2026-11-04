import React from 'react';
import { ArrowRight, CalendarDays, MessageCircle, MapPinned } from 'lucide-react';
import { globalToursContentDefaults, HomeContent, homeContentValue } from '../../lib/homeContent';

const planningIcons = [MessageCircle, MapPinned, CalendarDays];

interface GlobalToursTripPlanningProps {
  requestUrl: string;
  content?: HomeContent;
}

const GlobalToursTripPlanning: React.FC<GlobalToursTripPlanningProps> = ({ requestUrl, content }) => (
  <>
    <section className="border-t border-teal-100 bg-teal-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            {homeContentValue(content, 'global_tours_planning_label', globalToursContentDefaults.global_tours_planning_label)}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-teal-900 sm:text-4xl">
            {homeContentValue(content, 'global_tours_planning_title', globalToursContentDefaults.global_tours_planning_title)}
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            {homeContentValue(content, 'global_tours_planning_description', globalToursContentDefaults.global_tours_planning_description)}
          </p>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {planningIcons.map((Icon, index) => {
            const number = index + 1;
            const title = homeContentValue(content, `global_tours_planning_step_${number}_title`, globalToursContentDefaults[`global_tours_planning_step_${number}_title`]);
            const description = homeContentValue(content, `global_tours_planning_step_${number}_description`, globalToursContentDefaults[`global_tours_planning_step_${number}_description`]);
            return (
            <li key={number} className="relative rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-widest text-teal-700">{number}</span>
                <Icon aria-hidden="true" className="h-6 w-6 text-teal-700" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </li>
            );
          })}
        </ol>

        <div className="mt-10 text-center">
          <a
            href={requestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            {homeContentValue(content, 'global_tours_planning_cta', globalToursContentDefaults.global_tours_planning_cta)}
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>

    <section className="border-t border-teal-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            {homeContentValue(content, 'global_tours_faq_label', globalToursContentDefaults.global_tours_faq_label)}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-teal-900 sm:text-4xl">
            {homeContentValue(content, 'global_tours_faq_title', globalToursContentDefaults.global_tours_faq_title)}
          </h2>
        </div>

        <div className="mt-10 divide-y divide-teal-100 rounded-2xl border border-teal-100 bg-teal-50/50 px-6">
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
              {homeContentValue(content, 'global_tours_faq_1_question', globalToursContentDefaults.global_tours_faq_1_question)}
              <span aria-hidden="true" className="text-xl text-teal-700 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {homeContentValue(content, 'global_tours_faq_1_answer', globalToursContentDefaults.global_tours_faq_1_answer)}
            </p>
          </details>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
              {homeContentValue(content, 'global_tours_faq_2_question', globalToursContentDefaults.global_tours_faq_2_question)}
              <span aria-hidden="true" className="text-xl text-teal-700 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {homeContentValue(content, 'global_tours_faq_2_answer', globalToursContentDefaults.global_tours_faq_2_answer)}
            </p>
          </details>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
              {homeContentValue(content, 'global_tours_faq_3_question', globalToursContentDefaults.global_tours_faq_3_question)}
              <span aria-hidden="true" className="text-xl text-teal-700 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {homeContentValue(content, 'global_tours_faq_3_answer', globalToursContentDefaults.global_tours_faq_3_answer)}
            </p>
          </details>
        </div>
      </div>
    </section>
  </>
);

export default GlobalToursTripPlanning;
