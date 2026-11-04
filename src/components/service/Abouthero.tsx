import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import { brandText, brandTint, btnLink, btnOutline, btnPrimary, EMAIL, PHONE_DISPLAY, waLink } from './shared';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

const aboutHeroImage = encodeURI('/assets/aboutus/Global Journeys Travel Hero-500kb.jpeg');

const AboutHero: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const phoneDisplay = homeContentValue(content, 'about_hero_phone_display', PHONE_DISPLAY);
  const phoneHref = `tel:${phoneDisplay.replace(/[^\d+]/g, '')}`;

  return (
  <section className={brandTint}>
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-24">
      {/* Text */}
      <div>
        <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
          {homeContentValue(content, 'about_hero_title', 'Your Global Travel Partner Since 2005')}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700">
          {homeContentValue(content, 'about_hero_description', 'At GQ Travel & Hotels in Saarbrücken, Germany, we make travel simple, seamless, and personalized. From flight bookings and hotel reservations to medical tourism, guided tours, and business travel, we tailor every journey to your needs and budget.')}
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-gray-700">
          {homeContentValue(content, 'about_hero_description_secondary', 'With over 20 years of experience, we connect you to destinations worldwide with trusted service and expert support.')}
        </p>
        <p className={`mt-4 text-lg font-semibold ${brandText}`}>
          {homeContentValue(content, 'about_hero_tagline', 'Your journey starts here. Let us plan it for you.')}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={waLink('Hello GQ Travel & Hotels, I would like to request a travel offer.')} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
            {homeContentValue(content, 'about_hero_cta_offer', 'Request a Travel Offer')}
          </a>
          <a href={waLink('Hello GQ Travel & Hotels, I would like to book a hotel.')} target="_blank" rel="noopener noreferrer" className={btnOutline}>
            {homeContentValue(content, 'about_hero_cta_hotel', 'Book Your Hotel')}
          </a>
          <a href={`mailto:${EMAIL}`} className={`${btnLink} px-2`}>
            {homeContentValue(content, 'about_hero_cta_contact', 'Contact Us')}
          </a>
        </div>

        <a
          href={phoneHref}
          className="mt-10 inline-flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
        >
          <span className={`flex h-11 w-11 items-center justify-center rounded-full text-white bg-[oklch(0.437_0.078_188.216)]`} aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
            </svg>
          </span>
          <span>
            <span className="block text-sm text-gray-500">{homeContentValue(content, 'about_hero_phone_label', 'Call us')}</span>
            <span className="block text-lg font-bold text-gray-900">{homeContentValue(content, 'about_hero_phone_display', PHONE_DISPLAY)}</span>
          </span>
        </a>
      </div>

      {/* Picture */}
      <div className="relative">
        <ImageWithFallback
          src={homeContentValue(content, 'about_hero_image', aboutHeroImage)}
          alt={homeContentValue(content, 'about_hero_image_alt', 'GQ Travel & Hotels team helping a client plan a journey')}
          className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl"
        />

        <div className="absolute -bottom-6 left-4 rounded-2xl bg-white px-6 py-4 shadow-lg ring-1 ring-black/5 sm:-left-6">
          <p className={`text-4xl font-bold ${brandText}`}>{homeContentValue(content, 'about_hero_experience_value', '20+')}</p>
          <p className="text-sm font-medium text-gray-700">{homeContentValue(content, 'about_hero_experience_label', 'Years of Experience')}</p>
        </div>

        <p className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold italic text-gray-900 shadow-md">
          {homeContentValue(content, 'about_hero_clients_badge', 'Join Us | 1000s of clients globally')}
        </p>
      </div>
    </div>
  </section>
  );
};

export default AboutHero;