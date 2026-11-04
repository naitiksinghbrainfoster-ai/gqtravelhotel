import React from 'react';
import { HomeContent, contactPageContentDefaults, homeContentValue } from '../../lib/homeContent';
import { contactChannels } from '../../lib/contactChannels';

const icons = {
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" />,
};

const ContactHero: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const quick = contactChannels.map((channel) => ({
    label: channel.label,
    value: channel.value,
    href: channel.href,
    external: channel.href.startsWith('https:'),
    key: channel.href,
    icon: icons.chat,
  }));

  return (
    <section
      className="relative overflow-hidden bg-[oklch(0.437_0.078_188.216)] text-white"
      style={{ backgroundImage: 'url(/images/contact/contact-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-[oklch(0.437_0.078_188.216)]/90" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <h1 className="text-2xl font-bold sm:text-4xl lg:text-6xl">
          {homeContentValue(content, 'contact_hero_title', contactPageContentDefaults.contact_hero_title)}
        </h1>
        <p className="mt-4 text-2xl font-medium text-white/90">
          {homeContentValue(content, 'contact_hero_subtitle', contactPageContentDefaults.contact_hero_subtitle)}
        </p>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/80">
          {homeContentValue(content, 'contact_hero_description', contactPageContentDefaults.contact_hero_description)}
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {quick.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/20 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[oklch(0.437_0.078_188.216)]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-white/70">{item.label}</span>
                  <span className="block truncate font-semibold">{item.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ContactHero;
