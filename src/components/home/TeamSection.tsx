import React from 'react';
import { Award, ShieldCheck, MapPin, MessageCircle } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/travelData';
import { homeContentValue, HomeContent } from '../../lib/homeContent';
import { contactChannels } from '../../lib/contactChannels';

export const TeamSection: React.FC<{ content?: HomeContent }> = ({ content }) => {
  return (
    <section id="about" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
              {homeContentValue(content, 'home_team_label', 'About GQ Travel & Hotels')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {homeContentValue(content, 'home_team_title', 'Your Global Travel Partner Since 2005')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {homeContentValue(content, 'home_team_description', 'At GQ Travel & Hotels in Saarbrücken, Germany, we make travel simple, seamless, and personalized. From flight bookings and hotel reservations to medical tourism, guided tours, and corporate travel, we tailor every journey to your needs and budget.')}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {homeContentValue(content, 'home_team_description_secondary', 'With over 20 years of experience, we connect you to destinations worldwide with trusted service and expert support. Headquartered in Saarbrücken with our dedicated branch in Accra, Ghana.')}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>R+V Versicherung Sicherungsschein</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                <Award className="w-4 h-4 text-teal-700" />
                <span>20+ Years Travel Expertise</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-linear-to-br from-teal-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Contact Our Direct Office
                </span>
                <h3 className="text-2xl font-bold">
                  Saarbrücken Headquarters
                </h3>
                <div className="space-y-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Hochstr. 145, 66115 Saarbrücken, Germany</span>
                  </div>
                  {contactChannels.map((channel) => (
                    <a
                      key={channel.label}
                      href={channel.href}
                      {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-2 hover:text-white"
                    >
                      <MessageCircle className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{channel.label}: {channel.value}</span>
                    </a>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-slate-300">
                  <strong>Working Hours:</strong> Mon – Fri: 10:00 – 18:00 | Sat: 11:00 – 14:00 | Sun &amp; Holidays: Closed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {homeContentValue(content, 'home_team_members_title', 'Dedicated Travel Experts & Leadership')}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {homeContentValue(content, 'home_team_members_description', 'Personalized guidance from our experienced team in Germany and Ghana.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((defaultMember, idx) => {
              const member = {
                ...defaultMember,
                name: homeContentValue(content, `home_team_${idx + 1}_name`, defaultMember.name),
                role: homeContentValue(content, `home_team_${idx + 1}_role`, defaultMember.role),
                bio: homeContentValue(content, `home_team_${idx + 1}_bio`, defaultMember.bio),
                image: homeContentValue(content, `home_team_${idx + 1}_image`, defaultMember.image),
              };
              return (
              <div
                key={idx}
                className="flex flex-col p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-700/30 hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 mb-4 mx-auto shrink-0 ring-2 ring-white shadow-xs">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
                    <div className="text-xs font-semibold text-teal-800 mt-0.5">{member.role}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{member.location}</div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-slate-400">
                    {member.experience}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
