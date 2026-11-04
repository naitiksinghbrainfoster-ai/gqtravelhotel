import React from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { contactChannels } from '../lib/contactChannels';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M13.5 22v-8.5h2.7l.4-3.1h-3.1V7.3c0-.9.3-1.5 1.6-1.5h1.7V2.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7v3.1h2.7V22h3.8Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M18.9 2h3.4l-7.4 8.5L22.8 22h-6.7l-5.2-7.3L4.7 22H1.3l7.9-9.1L1 2h6.9l4.7 6.7L18.9 2Zm-1.2 18h1.8L7.2 3.9H5.3L17.7 20Z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.6 12 4.6 12 4.6s-7.5 0-9.4.5A3 3 0 0 0 .5 7.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-4.8ZM9.8 15.5v-7l6.3 3.5-6.3 3.5Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6A5.2 5.2 0 0 1 16.8 22H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 1.8A3.4 3.4 0 0 0 3.8 7.2v9.6a3.4 3.4 0 0 0 3.4 3.4h9.6a3.4 3.4 0 0 0 3.4-3.4V7.2a3.4 3.4 0 0 0-3.4-3.4H7.2Zm9.8 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.2A5.8 5.8 0 1 1 12 17.8 5.8 5.8 0 0 1 12 6.2Zm0 1.8A4 4 0 1 0 12 16.2a4 4 0 0 0 0-8Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.31 9.94h3.2v9.05h-3.2V9.94Zm5.08 0h3.07v1.24h.04c.42-.8 1.46-1.64 3.02-1.64 3.23 0 3.82 2.12 3.82 4.88v3.57h-3.2v-3.33c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.48v3.46h-3.2V9.94Z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M15.7 2c.3 1.8 1.5 3.2 3.3 3.8v2.9c-1.3 0-2.6-.4-3.7-1.1v6.4a5.6 5.6 0 1 1-5.6-5.6c.2 0 .4 0 .6.1v3a2.8 2.8 0 1 0 1.9 2.7V2h3.5Z" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M12 2.2A9.8 9.8 0 0 0 7.3 19c-.1-1.6 0-3.4.5-5l.8-3.2c.2-.9-.3-1.7-.9-2.3A3 3 0 0 1 8.7 6a3.8 3.8 0 0 1 4.1 3.8c0 1.6-.9 3.3-2.2 3.3-.7 0-1.3-.6-1.1-1.4.2-.9.6-1.9.6-2.8 0-.7-.4-1.3-1.1-1.3-.8 0-1.4.9-1.4 2.1 0 .8.3 1.3.3 1.3L7.6 18c-.4 1.8-.1 4.1.1 5.8A9.8 9.8 0 1 0 12 2.2Zm0 0" />
  </svg>
);

const socialLinks = [
  { href: 'https://www.facebook.com/GQTravelHotels/', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://x.com/gqtravelhotel', label: 'X / Twitter', Icon: XIcon },
  { href: 'https://www.youtube.com/watch?si=ammfScfDpWTFes5E&v=zBs09SLyUA0&feature=youtu.be', label: 'YouTube', Icon: YoutubeIcon },
  { href: 'https://www.instagram.com/gqtravelhotels/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.linkedin.com/company/gq-travel-and-hotels/about/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://www.tiktok.com/in/about', label: 'TikTok', Icon: TikTokIcon },
  { href: 'https://de.pinterest.com/gqtravelhotels/', label: 'Pinterest', Icon: PinterestIcon },
];

interface FooterProps {
  onNavigate?: (path: string) => void;
  onOpenLegal: (type: 'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms') => void;
  onOpenBooking: () => void;
  onOpenTransferModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal, onOpenBooking, onOpenTransferModal }) => {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Address Column (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex rounded-lg bg-white px-2 py-1">
              <img
                src="/assets/aistudio/logo.png"
                alt="GQ Travel & Hotels"
                className="h-14 w-auto max-w-[180px] object-contain"
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Founded in 2005. Your global travel agency headquartered in Saarbrücken, Germany, with branch operations in Accra, Ghana. Worldwide hotel reservations, private airport transfers, flights, holiday packages, and medical tourism.
            </p>

            <a
              href="/about"
              className="inline-flex items-center text-xs font-semibold text-teal-300 transition-colors hover:text-teal-200"
            >
              About Us
            </a>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Hochstr. 145, 66115 Saarbrücken, Germany</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-slate-400">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:border-teal-400/70 hover:bg-teal-500/10 hover:text-teal-300"
                  aria-label={label}
                  title={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Channels (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Reach Us
            </h4>
            <div className="space-y-3 text-xs">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block rounded-xl border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
                >
                  <span className="block text-[10px] font-bold uppercase text-teal-400">{channel.label}</span>
                  <span className="mt-1 block break-all font-mono">{channel.value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Working Hours Column (Cols 8-10) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Office Working Hours</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Monday – Friday:</span>
                <span className="font-semibold text-white">10:00 – 18:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Saturday:</span>
                <span className="font-semibold text-white">11:00 – 14:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span className="text-slate-400">Sunday:</span>
                <span className="text-rose-400">Closed</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span className="text-slate-400">Public Holidays:</span>
                <span className="text-rose-400">Closed</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-800 text-[11px] text-teal-200">
              <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-teal-400" />
              Customer package insolvency protection via R+V Allgemeine Versicherung AG.
            </div>
          </div>

          {/* Quick Bookings Column (Cols 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Direct Bookings
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Book Hotels Worldwide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTransferModal}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Airport Transfers Saarbrücken
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTransferModal}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Accra Airport Transfers
                </button>
              </li>
              <li>
                <a href="/private-jet-rentals" className="text-slate-400 hover:text-white transition-colors">
                  Private Jet Charter
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-white transition-colors">
                  Ghana e-Visa 72h
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-white transition-colors">
                  Medical Tourism Germany
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Compliance Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 GQ Travel &amp; Hotels. All Rights Reserved. Your Next Trip. Book It Here.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/general-terms-conditions');
                  return;
                }
                onOpenLegal('terms');
              }}
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              General Terms &amp; Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/imprint');
                  return;
                }
                onOpenLegal('imprint');
              }}
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              Impressum (Imprint)
            </button>
            <span>·</span>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/privacy-policy');
                  return;
                }
                onOpenLegal('privacy');
              }}
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              Privacy Policy (GDPR)
            </button>
            <span>·</span>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/airport-transfer-terms');
                  return;
                }
                onOpenLegal('airport-terms');
              }}
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              Airport Transfer Terms
            </button>
            <span>·</span>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/accra-transfer-terms');
                  return;
                }
                onOpenLegal('accra-terms');
              }}
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              Accra Transfers Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
