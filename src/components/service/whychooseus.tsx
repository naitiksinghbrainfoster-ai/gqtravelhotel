import React from 'react';
import { brandBg, brandText, btnOutline, btnPrimary, waLink } from './shared';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

type Reason = {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  tagline?: string;
  question?: string;
  ctas: { label: string; message: string }[];
  note?: string;
};

const reasons: Reason[] = [
  {
    id: 'global-expertise',
    title: 'Global Travel Expertise',
    paragraphs: [
      'From international flight bookings and worldwide hotel reservations to tailor-made holidays and medical tourism, GQ Travel & Hotels connects you with travel solutions across global destinations. Based in Saarbrücken, Germany, we help you plan trips across Europe, Africa, Asia, and beyond, with personalized recommendations, accommodation options, and booking assistance tailored to your destination, budget, and travel needs.',
    ],
    tagline: 'Your destination. Your preferences. Our expertise.',
    ctas: [
      { label: 'Explore Destinations', message: 'Hello GQ Travel & Hotels, I would like to explore destinations.' },
      { label: 'Book Your Trip', message: 'Hello GQ Travel & Hotels, I would like to book a trip.' },
      { label: 'Get a Travel Offer', message: 'Hello GQ Travel & Hotels, I would like a travel offer.' },
    ],
  },
  {
    id: 'reliable-support',
    title: 'Reliable Travel Support',
    subtitle: "Travel with Confidence. We're Here to Help.",
    paragraphs: [
      'At GQ Travel & Hotels, we provide personalized support with flight bookings, hotel reservations, travel arrangements, and corporate travel needs. From planning your journey to coordinating essential details, our team helps you travel with greater confidence and peace of mind.',
      "Whether you're traveling for business, leisure, or medical care abroad, we're here to help you find the right travel solutions.",
    ],
    question: 'Need help planning your next journey?',
    ctas: [
      { label: 'Speak to Our Travel Team', message: 'Hello GQ Travel & Hotels, I would like to speak to your travel team.' },
      { label: 'Request a Travel Quote', message: 'Hello GQ Travel & Hotels, I would like to request a travel quote.' },
    ],
    note: 'Contact us today for personalized travel assistance tailored to your needs.',
  },
  {
    id: 'personalized-services',
    title: 'Personalized Travel Services',
    subtitle: 'Your Trip. Your Budget. Your Perfect Travel Plan.',
    paragraphs: [
      'At GQ Travel & Hotels, we turn your travel ideas into personalized travel solutions. From flights and hotel reservations to tailor-made holidays, business trips, and medical tourism, we help you find options that match your needs, preferences, and budget.',
      'Tell us where you want to go, when you want to travel, and what you need. Our team will help you explore suitable options and plan your journey with confidence.',
    ],
    question: 'Ready to plan your next trip? Get a personalized travel offer today!',
    ctas: [
      { label: 'Get My Travel Offer', message: 'Hello GQ Travel & Hotels, I would like my personalized travel offer.' },
      { label: 'Plan My Trip', message: 'Hello GQ Travel & Hotels, I would like help planning my trip.' },
      { label: 'Book Online Now', message: 'Hello GQ Travel & Hotels, I would like to book now.' },
    ],
  },
  {
    id: 'corporate-travel',
    title: 'Corporate Travel Management',
    subtitle: 'Simplify Business Travel. Save Time. Keep Your Business Moving.',
    paragraphs: [
      "GQ Travel & Hotels helps businesses manage flights, hotel reservations, and corporate travel arrangements tailored to their schedules and budgets. Let us simplify your company's travel planning with personalized support and coordinated booking solutions.",
    ],
    question: 'Ready to optimize your corporate travel?',
    ctas: [
      { label: 'Get Your Corporate Travel Quote Today', message: 'Hello GQ Travel & Hotels, I would like a corporate travel quote.' },
    ],
    note: 'Submit your business travel requirements, and our team will help you find the right solution for your company.',
  },
];

const WhyChooseUs: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [active, setActive] = React.useState(0);
  const displayedReasons = reasons.map((reason) => ({
    ...reason,
    title: homeContentValue(content, `about_why_${reason.id}_title`, reason.title),
    subtitle: homeContentValue(content, `about_why_${reason.id}_subtitle`, reason.subtitle ?? ''),
    paragraphs: homeContentValue(content, `about_why_${reason.id}_description`, reason.paragraphs.join('\n\n'))
      .split(/\n\s*\n/)
      .filter(Boolean),
    tagline: homeContentValue(content, `about_why_${reason.id}_tagline`, reason.tagline ?? ''),
    question: homeContentValue(content, `about_why_${reason.id}_question`, reason.question ?? ''),
    note: homeContentValue(content, `about_why_${reason.id}_note`, reason.note ?? ''),
    ctas: reason.ctas.map((cta, index) => ({
      ...cta,
      label: homeContentValue(content, `about_why_${reason.id}_cta_${index + 1}`, cta.label),
    })),
  }));
  const current = displayedReasons[active];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {homeContentValue(content, 'about_why_title', 'Why choose GQ Travel & Hotels?')}
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Selector */}
          <div role="tablist" aria-label="Reasons to choose GQ Travel & Hotels" className="flex flex-col gap-3">
            {displayedReasons.map((reason, i) => {
              const selected = i === active;
              return (
                <button
                  key={reason.title}
                  role="tab"
                  id={`reason-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="reason-panel"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.437_0.078_188.216)] ${
                    selected
                      ? `${brandBg} border-transparent text-white shadow-md`
                      : 'border-gray-200 bg-white text-gray-800 hover:border-[oklch(0.437_0.078_188.216)]'
                  }`}
                >
                  <span className={`text-sm font-semibold tabular-nums ${selected ? 'text-white/70' : brandText}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-semibold">{reason.title}</span>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div
            role="tabpanel"
            id="reason-panel"
            aria-labelledby={`reason-tab-${active}`}
            className="rounded-3xl bg-[oklch(0.965_0.02_188.216)] p-8 sm:p-10"
          >
            <h3 className={`text-2xl font-bold ${brandText}`}>{current.title}</h3>
            {current.subtitle && <p className="mt-2 text-lg font-semibold text-gray-900">{current.subtitle}</p>}

            {current.paragraphs.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-gray-700">
                {p}
              </p>
            ))}

            {current.tagline && <p className="mt-5 text-lg font-semibold text-gray-900">{current.tagline}</p>}
            {current.question && <p className="mt-5 font-semibold text-gray-900">{current.question}</p>}

            <div className="mt-6 flex flex-wrap gap-3">
              {current.ctas.map((cta, i) => (
                <a
                  key={cta.label}
                  href={waLink(cta.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={i === 0 ? btnPrimary : btnOutline}
                >
                  {cta.label}
                </a>
              ))}
            </div>

            {current.note && <p className="mt-6 italic text-gray-600">{current.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;