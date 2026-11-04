import React from 'react';
import { HomeContent, contactPageContentDefaults, homeContentValue } from '../../lib/homeContent';
import { brandText, btnPrimary } from '../service/shared';
import { GERMANY_WHATSAPP } from '../../lib/contactChannels';

const ContactFaq: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [open, setOpen] = React.useState<number | null>(null);
  const faqs = [1, 2, 3].map((number) => ({
    question: homeContentValue(content, `contact_faq_${number}_question`, contactPageContentDefaults[`contact_faq_${number}_question`]),
    answer: homeContentValue(content, `contact_faq_${number}_answer`, contactPageContentDefaults[`contact_faq_${number}_answer`]),
    prompt: homeContentValue(content, `contact_faq_${number}_prompt`, contactPageContentDefaults[`contact_faq_${number}_prompt`]),
    cta: homeContentValue(content, `contact_faq_${number}_cta`, contactPageContentDefaults[`contact_faq_${number}_cta`]),
    message: homeContentValue(content, `contact_faq_${number}_message`, contactPageContentDefaults[`contact_faq_${number}_message`]),
    note: homeContentValue(content, `contact_faq_${number}_note`, contactPageContentDefaults[`contact_faq_${number}_note`]),
  }));

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {homeContentValue(content, 'contact_faq_title', contactPageContentDefaults.contact_faq_title)}
          </h2>
          <p className="mt-3 text-gray-600">
            {homeContentValue(content, 'contact_faq_description', contactPageContentDefaults.contact_faq_description)}
          </p>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    id={`faq-btn-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.437_0.078_188.216)]"
                  >
                    <span className="text-lg font-semibold text-gray-900">
                      <span className={`mr-2 ${brandText}`}>{index + 1}.</span>
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 text-2xl leading-none text-[oklch(0.437_0.078_188.216)] transition-transform ${isOpen ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-btn-${index}`} className="pb-6">
                    <p className="leading-relaxed text-gray-700">{faq.answer}</p>
                    {faq.prompt && <p className="mt-4 font-semibold text-gray-900">{faq.prompt}</p>}
                    <a
                      href={`${GERMANY_WHATSAPP.href}?text=${encodeURIComponent(faq.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${btnPrimary} mt-4`}
                    >
                      {faq.cta}
                    </a>
                    {faq.note && <p className="mt-3 text-sm italic text-gray-600">{faq.note}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactFaq;
