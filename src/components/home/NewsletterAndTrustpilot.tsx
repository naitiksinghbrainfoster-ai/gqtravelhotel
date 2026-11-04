import React, { useState } from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { homeContentValue, HomeContent } from '../../lib/homeContent';

const TRUSTPILOT_PROFILE_URL = 'https://www.trustpilot.com/review/gqtravel-hotels.com';

interface NewsletterAndTrustpilotProps {
  onOpenLegal: (type: 'privacy') => void;
  content?: HomeContent;
}

export const NewsletterAndTrustpilot: React.FC<NewsletterAndTrustpilotProps> = ({ onOpenLegal, content }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Banner matching Screenshot 2 layout (Villa photo on left, newsletter text & form on right) */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left: Villa Photography */}
          <div className="md:col-span-5 h-64 md:h-full relative overflow-hidden bg-slate-200">
            <img
              src={homeContentValue(content, 'home_newsletter_image', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80')}
              alt="Luxury modern villa pool overlooking sea"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent md:hidden" />
          </div>

          {/* Right: Newsletter Copy & Input */}
          <div className="md:col-span-7 p-8 sm:p-12 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
              {homeContentValue(content, 'home_newsletter_label', 'Newsletter')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {homeContentValue(content, 'home_newsletter_title', 'Travel Inspiration, Exclusive Deals & Updates')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md">
              {homeContentValue(content, 'home_newsletter_description', 'Subscribe to our newsletter for the latest travel news, special offers, holiday inspiration and exclusive deals from GQ Travel & Hotels.')}
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-teal-800"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm whitespace-nowrap shrink-0"
                >
                  Subscribe →
                </button>
              </form>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! You are now subscribed to GQ Travel &amp; Hotels exclusive offers.</span>
              </div>
            )}

            <div className="mt-3 text-[11px] text-slate-600">
              You can unsubscribe at any time. See our{' '}
              <button
                type="button"
                onClick={() => onOpenLegal('privacy')}
                className="text-teal-800 font-semibold hover:underline"
              >
                Privacy Policy
              </button>{' '}
              for details on how we handle your personal data.
            </div>
          </div>
        </div>

        {/* Trustpilot rating and review link */}
        <div className="p-6 sm:p-8 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-emerald-700 sm:justify-start">
              <span aria-hidden="true" className="text-2xl leading-none text-emerald-600">★</span>
              <span className="text-lg font-bold tracking-tight text-slate-900">Trustpilot</span>
              <span className="ml-2 text-xs font-semibold text-slate-700">4.5 / 5 · 15 reviews</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:justify-start" aria-label="Rated 4.5 out of 5 on Trustpilot">
              {[0, 1, 2, 3, 4].map((star) => (
                <span
                  key={star}
                  aria-hidden="true"
                  className={`flex h-5 w-5 items-center justify-center rounded-sm text-xs text-white ${
                    star < 4 ? 'bg-[#00b67a]' : 'bg-gradient-to-r from-[#00b67a] 50% to-slate-300 50%'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {homeContentValue(content, 'home_trustpilot_title', 'We Value Your Feedback')}
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              {homeContentValue(content, 'home_trustpilot_description', 'We’d love to hear about your experience with GQ Travel & Hotels. Share your honest feedback on Trustpilot and help us improve our services.')}
            </p>
          </div>

          <a
            href={TRUSTPILOT_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors shrink-0 shadow-xs"
          >
            <span>View reviews on Trustpilot</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
