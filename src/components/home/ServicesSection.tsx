import React from 'react';
import { 
  Hotel, Plane, Compass, Car, Navigation, FileCheck, HeartPulse, Briefcase, 
  ArrowRight, CheckCircle2, ShieldCheck, Phone, MessageSquare
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../../data/travelData';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
  onOpenTransferModal: () => void;
  onOpenServiceQuote: (serviceId: string) => void;
  content?: HomeContent;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenBooking,
  onOpenTransferModal,
  onOpenServiceQuote,
  content,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hotel': return Hotel;
      case 'Plane': return Plane;
      case 'Compass': return Compass;
      case 'Car': return Car;
      case 'Navigation': return Navigation;
      case 'FileCheck': return FileCheck;
      case 'HeartPulse': return HeartPulse;
      case 'Briefcase': return Briefcase;
      default: return Compass;
    }
  };

  const handleAction = (service: ServiceItem) => {
    if (service.id === 'hotels-flights-packages') {
      onOpenBooking();
    } else if (service.id === 'airport-transfers') {
      onOpenTransferModal();
    } else {
      onOpenServiceQuote(service.id);
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
            {homeContentValue(content, 'home_services_label', 'Comprehensive Travel Agency Solutions')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
            {homeContentValue(content, 'home_services_title', 'Our World-Class Services')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {homeContentValue(content, 'home_services_description', 'From serviced apartments in Saarbrücken and luxury worldwide resorts to urgent Ghana e-Visas and German medical tourism coordination.')}
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((defaultService, index) => {
            const service = {
              ...defaultService,
              title: homeContentValue(content, `home_service_${defaultService.id}_title`, defaultService.title),
              tagline: homeContentValue(content, `home_service_${defaultService.id}_tagline`, defaultService.tagline),
              shortDesc: homeContentValue(content, `home_service_${defaultService.id}_description`, defaultService.shortDesc),
            };
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-700/40 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-800 text-teal-800 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-teal-700 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {service.badge && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-200 mb-2">
                      {service.badge}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-teal-800 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs font-medium text-teal-700 mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleAction(service)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 active:scale-95 transition-all shadow-xs"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: Medical Tourism & Ghana e-Visa Assistance */}
        <div className="mt-12 p-8 rounded-3xl bg-linear-to-r from-teal-900 via-slate-900 to-teal-950 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 border border-teal-800/40">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
              <HeartPulse className="w-4 h-4" />
              <span>Specialized Care &amp; Express Travel Support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {homeContentValue(content, 'home_services_banner_title', 'Looking for Medical Care in Germany or an Urgent Ghana e-Visa?')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {homeContentValue(content, 'home_services_banner_description', 'We provide German hospital appointments, translation support (German, English, Twi), and 72-hour expedited Ghana visa assistance.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenServiceQuote('medical-tourism')}
              className="px-5 py-2.5 rounded-xl bg-white text-teal-950 font-bold text-xs hover:bg-slate-100 transition-all shadow-sm"
            >
              Medical Treatment Request
            </button>
            <button
              onClick={() => onOpenServiceQuote('ghana-visa')}
              className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-semibold text-xs transition-colors border border-teal-600"
            >
              72h Ghana e-Visa Help
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
