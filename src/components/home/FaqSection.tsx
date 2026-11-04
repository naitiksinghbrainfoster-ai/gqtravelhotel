import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '../../data/travelData';
import { homeContentValue, HomeContent } from '../../lib/homeContent';
import { contactChannels } from '../../lib/contactChannels';

export const FaqSection: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
            {homeContentValue(content, 'home_faq_label', 'Got Questions? We Have Answers')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            {homeContentValue(content, 'home_faq_title', 'Frequently Asked Questions')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            {homeContentValue(content, 'home_faq_description', 'Clear information about our bookings, airport transfers, corporate travel, and policies.')}
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((defaultFaq, index) => {
            const faq = {
              ...defaultFaq,
              question: homeContentValue(content, `home_faq_${index + 1}_question`, defaultFaq.question),
              answer: homeContentValue(content, `home_faq_${index + 1}_answer`, defaultFaq.answer),
            };
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-slate-900 font-bold text-sm sm:text-base focus-visible:outline-teal-800"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-800 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Consultation CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-sm">{homeContentValue(content, 'home_faq_cta_title', 'Have a customized travel inquiry?')}</h4>
            <p className="text-xs text-slate-500">{homeContentValue(content, 'home_faq_cta_description', 'Speak with our travel specialists in Saarbrücken or Accra.')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-1.5 rounded-xl bg-teal-800 px-3 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-900"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{channel.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
