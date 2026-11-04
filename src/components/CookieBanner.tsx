import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gq_cookie_consent');
    if (!saved) {
      setIsOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('gq_cookie_consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setIsOpen(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('gq_cookie_consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setIsOpen(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('gq_cookie_consent', JSON.stringify({ necessary: true, analytics: analyticsEnabled, marketing: marketingEnabled }));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 text-slate-800 transition-all">
      {!showPreferences ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <span>Cookie &amp; Privacy Preferences</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            GQ Travel &amp; Hotels uses cookies and similar technologies to operate our website, improve its functionality, understand website usage and, where permitted, enhance the user experience.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 px-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={() => setShowPreferences(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Manage cookie preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-slate-400">
            Learn more in our{' '}
            <button onClick={onOpenPrivacy} className="text-teal-800 underline">
              Privacy Policy
            </button>
            .
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between font-bold text-slate-900">
            <span>Manage Consent Preferences</span>
            <button onClick={() => setShowPreferences(false)} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 border-y border-slate-100 py-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Strictly Necessary</div>
                <div className="text-[10px] text-slate-400">Essential for bookings and security</div>
              </div>
              <span className="text-[11px] font-bold text-teal-800">Always Active</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Analytics (Google Analytics)</div>
                <div className="text-[10px] text-slate-400">Helps us evaluate website usage</div>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="rounded-sm text-teal-800"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Marketing &amp; Personalization</div>
                <div className="text-[10px] text-slate-400">Tailored travel offers and deals</div>
              </div>
              <input
                type="checkbox"
                checked={marketingEnabled}
                onChange={(e) => setMarketingEnabled(e.target.checked)}
                className="rounded-sm text-teal-800"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSaveCustom}
              className="w-full py-2 bg-teal-800 text-white rounded-xl text-xs font-semibold hover:bg-teal-900 transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
