import React from 'react';
import { DollarSign, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

export const WhyChooseUs: React.FC<{ content?: HomeContent }> = ({ content }) => {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Screenshot 1 layout */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
            {homeContentValue(content, 'home_why_label', 'Trusted Travel Partner Since 2005')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            {homeContentValue(content, 'home_why_title', 'WHY CHOOSE US?')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            {homeContentValue(content, 'home_why_description', 'Personalised travel planning, competitive airfares, and comprehensive booking support across Europe, Africa, and beyond.')}
          </p>
        </div>

        {/* 3 Pillars Grid with icons and editorial copy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Pillar 1: Competitive Prices */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-5 shadow-xs">
              <DollarSign className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {homeContentValue(content, 'home_why_card_1_title', 'Competitive Prices & Best Value')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {homeContentValue(content, 'home_why_card_1_description', 'Explore available flights, hotels, apartments, and cruises to match your budget. Transparent fees (€3.99/day service commission) and no hidden checkout costs.')}
            </p>
          </div>

          {/* Pillar 2: Secure Booking & Insolvency Protection */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-5 shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {homeContentValue(content, 'home_why_card_2_title', 'Secure Booking & R+V Protection')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {homeContentValue(content, 'home_why_card_2_description', 'Package travel bookings are legally protected against insolvency through R+V Allgemeine Versicherung AG (Sicherungsschein) with 3D Secure card processing.')}
            </p>
          </div>

          {/* Pillar 3: Seamless Experience & 20+ Years */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-5 shadow-xs">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {homeContentValue(content, 'home_why_card_3_title', 'Seamless Experience & Support')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {homeContentValue(content, 'home_why_card_3_description', 'Direct WhatsApp arrival groups for airport transfers, 24/7 personal travel rebooking assistance, and dedicated German and Ghanaian branch coordinators.')}
            </p>
          </div>
        </div>

        {/* Trust Metric Strip */}
        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-900 tabular-nums">{homeContentValue(content, 'home_why_metric_1_value', '20+ Years')}</div>
            <div className="text-xs text-slate-500 mt-1">{homeContentValue(content, 'home_why_metric_1_label', 'Travel Agency Experience')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-900 tabular-nums">{homeContentValue(content, 'home_why_metric_2_value', '1,000s')}</div>
            <div className="text-xs text-slate-500 mt-1">{homeContentValue(content, 'home_why_metric_2_label', 'Clients Served Globally')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-900 tabular-nums">{homeContentValue(content, 'home_why_metric_3_value', '60 Min')}</div>
            <div className="text-xs text-slate-500 mt-1">{homeContentValue(content, 'home_why_metric_3_label', 'Free Airport Landing Wait')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-900 tabular-nums">{homeContentValue(content, 'home_why_metric_4_value', '72h')}</div>
            <div className="text-xs text-slate-500 mt-1">{homeContentValue(content, 'home_why_metric_4_label', 'Express Ghana e-Visa')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
