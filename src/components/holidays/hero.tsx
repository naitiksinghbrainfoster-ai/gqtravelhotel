import React from 'react';
import { ArrowRight, Compass, Globe2, Sparkles } from 'lucide-react';
import { HomeContent, homeContentValue, websiteContentDefaults } from '../../lib/homeContent';

const holidayPartners = [
  {
    name: 'Schauinsland-Reisen',
    description: 'All-inclusive holidays with Schauinsland-Reisen',
    href: 'https://www.schauinsland-reisen.de/?agency=130106',
    icon: Globe2,
    image: '/assets/global-tours/imgi_29.jpg',
    imageAlt: 'Tropical coastline for a relaxing holiday',
  },
  {
    name: 'Bentour Reisen',
    description: 'All-inclusive holidays with Bentour Reisen',
    href: 'https://www.bentour.de/?agent=11722',
    icon: Sparkles,
    image: '/assets/global-tours/img_moun.jpeg',
    imageAlt: 'Island scenery surrounded by clear turquoise water',
  },
  {
    name: 'GetYourGuide',
    description: 'Tours and activities with GetYourGuide',
    href: 'https://www.getyourguide.com/?partner_id=TLDYM6D&cmp=share_to_earn',
    icon: Compass,
    image: '/assets/global-tours/img_tow.jpeg',
    imageAlt: 'The Eiffel Tower, a popular sightseeing destination',
  },
];

const HolidaysHero: React.FC<{ content?: HomeContent; contentPrefix?: 'holidays' | 'vacation' }> = ({
  content,
  contentPrefix = 'holidays',
}) => (
  <section className="relative overflow-hidden bg-teal-950 text-white">
    <div aria-hidden="true" className="absolute -right-36 -top-40 h-96 w-96 rounded-full bg-teal-800/40" />
    <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-100">
          <Globe2 aria-hidden="true" className="h-4 w-4" />
          {homeContentValue(content, `${contentPrefix}_hero_badge`, websiteContentDefaults[`${contentPrefix}_hero_badge`])}
        </span>
        <h1 className="mt-6 whitespace-nowrap text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {homeContentValue(content, `${contentPrefix}_hero_title`, websiteContentDefaults[`${contentPrefix}_hero_title`])}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-teal-50 sm:text-lg sm:leading-8">
          {homeContentValue(content, `${contentPrefix}_hero_description`, websiteContentDefaults[`${contentPrefix}_hero_description`])}
        </p>
        <a
          href="#holiday-partners"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-teal-300 px-6 py-3 text-sm font-bold text-teal-950 transition hover:-translate-y-0.5 hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {homeContentValue(content, `${contentPrefix}_hero_button`, websiteContentDefaults[`${contentPrefix}_hero_button`])}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);

export { holidayPartners };
export default HolidaysHero;
