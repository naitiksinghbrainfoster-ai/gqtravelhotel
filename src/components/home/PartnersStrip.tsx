import React from 'react';
import { Shield, Train, Car, Compass, CreditCard, Sparkles } from 'lucide-react';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

export const PartnersStrip: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const partners = [
    { name: 'Schauinsland-Reisen', category: 'Holiday Partner', icon: Compass },
    { name: 'Bentour Reisen', category: 'Tour Operator', icon: Sparkles },
    { name: 'GetYourGuide', category: 'Activities & Excursions', icon: Compass },
    { name: 'Sixt Car Rental', category: 'Worldwide Fleet Partner', icon: Car },
    { name: 'Deutsche Bahn Rail & Fly', category: 'German Rail Partner', icon: Train },
    { name: 'R+V Versicherung', category: 'Insolvency Protection', icon: Shield },
    { name: 'Hubtel & Stripe 3D Secure', category: 'Payment Security', icon: CreditCard },
  ];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            {homeContentValue(content, 'home_partners_title', 'OUR TRUSTED TRAVEL & BOOKING PARTNERS')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 items-center justify-center">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            const name = homeContentValue(content, `home_partner_${index + 1}_name`, partner.name);
            const category = homeContentValue(content, `home_partner_${index + 1}_category`, partner.category);
            return (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white border border-slate-200/70 hover:border-teal-700/40 hover:shadow-xs transition-all text-center group"
              >
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-teal-700 transition-colors mb-1.5" />
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {name}
                </span>
                <span className="text-[10px] text-slate-600 mt-0.5">
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
