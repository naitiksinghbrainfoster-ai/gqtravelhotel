import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/travelData';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

export const Testimonials: React.FC<{ content?: HomeContent }> = ({ content }) => {
  return (
    <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
      {/* Background Image with Pool & Loungers (Inspired by Screenshot 2 Testimonials Section) */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={homeContentValue(content, 'home_testimonials_background', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80')}
          alt="Luxury resort loungers and pool"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screenshot 2 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            {homeContentValue(content, 'home_testimonials_label', 'Trusted by 1,000s of Clients Globally')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            {homeContentValue(content, 'home_testimonials_title', 'Guest Experiences & Testimonials')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            {homeContentValue(content, 'home_testimonials_description', 'Read what corporate clients, medical travelers, and holidaymakers say about GQ Travel & Hotels.')}
          </p>
        </div>

        {/* 3 Review Cards matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((defaultTestimonial, index) => {
            const testimonial = {
              ...defaultTestimonial,
              name: homeContentValue(content, `home_testimonial_${index + 1}_name`, defaultTestimonial.name),
              role: homeContentValue(content, `home_testimonial_${index + 1}_role`, defaultTestimonial.role),
              location: homeContentValue(content, `home_testimonial_${index + 1}_location`, defaultTestimonial.location),
              comment: homeContentValue(content, `home_testimonial_${index + 1}_comment`, defaultTestimonial.comment),
              trip: homeContentValue(content, `home_testimonial_${index + 1}_trip`, defaultTestimonial.trip),
              avatar: homeContentValue(content, `home_testimonial_${index + 1}_avatar`, defaultTestimonial.avatar),
            };
            return (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white text-slate-900 shadow-xl relative group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Author Info with Avatar at Top */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-teal-700/20 shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      {testimonial.name}
                    </h3>
                    <div className="text-[11px] text-slate-500">{testimonial.role}</div>
                    <div className="text-[10px] text-teal-700 font-medium">{testimonial.location}</div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
              </div>

              {/* Service Tag */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-teal-800 font-semibold">
                ✓ {testimonial.trip}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
