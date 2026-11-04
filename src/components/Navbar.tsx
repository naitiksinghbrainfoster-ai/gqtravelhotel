import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, MessageSquare, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { contactChannels } from '../lib/contactChannels';

const bookingMenuItems = [
  { label: 'Hotels & Apartments', href: '/hotel-apartments' },
  {
    label: 'Global Flight',
    href: '/global-flight',
  },
  { label: 'Airport Shuttle', href: '/airport-transfers-saarland' },
  {
    label: 'Global Auto Rent',
    href: '/global-auto-rent',
  },
  {
    label: 'Sixt Car Rent',
    href: '/sixt-car-rent',
  },
  { label: 'Private Jet Rentals', href: '/private-jet-rentals' },
  { label: 'Global Tours', href: '/global-tours' },
  { label: 'Vacation', href: '/vacation' },
  { label: 'Cruise', href: '/cruise' },
  {
    label: 'Railway Tickets',
    href: '/railway-tickets',
    description: 'Email GQ Travel to request railway tickets',
  },
];

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLegal: (type: 'terms' | 'imprint' | 'privacy') => void;
  onOpenConcierge: () => void;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenLegal,
  onOpenConcierge,
  currentPath = '/',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingMenuOpen, setBookingMenuOpen] = useState(false);
  const desktopBookingRef = useRef<HTMLDivElement>(null);
  const mobileBookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeBookingMenuOutside = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !desktopBookingRef.current?.contains(target) &&
        !mobileBookingRef.current?.contains(target)
      ) {
        setBookingMenuOpen(false);
      }
    };
    const closeBookingMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setBookingMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeBookingMenuOutside);
    document.addEventListener('keydown', closeBookingMenuOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeBookingMenuOutside);
      document.removeEventListener('keydown', closeBookingMenuOnEscape);
    };
  }, []);

  const goToPath = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      return;
    }

    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSection = (sectionId: string) => {
    if (currentPath === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (onNavigate) {
      onNavigate('/');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    window.location.href = `/#${sectionId}`;
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-normal">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3 h-3 shrink-0 text-teal-400 sm:h-3.5 sm:w-3.5" />
              <span>Saarbrücken, Germany &amp; Accra, Ghana</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Insolvency Protected (R+V Versicherung)</span>
            </span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-slate-400">20+ Years Travel Excellence</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:justify-end sm:text-xs">
            {contactChannels.filter((channel) => channel.label !== 'Ghana WhatsApp').map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-1 whitespace-nowrap text-teal-300 transition-colors hover:text-white"
              >
                {channel.href.startsWith('mailto:') ? (
                  <span aria-hidden="true" className="text-[10px] font-bold">✉</span>
                ) : (
                  <MessageSquare aria-hidden="true" className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">{channel.label}: {channel.value}</span>
                <span className="sm:hidden">{channel.href.startsWith('mailto:') ? 'Email' : 'WhatsApp'}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Brand logo */}
          <a
            href="/"
            aria-label="GQ Travel & Hotels home"
            className="min-w-0 shrink"
            onClick={(event) => {
              event.preventDefault();
              if (onNavigate) {
                onNavigate('/');
              } else {
                window.history.pushState({}, '', '/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img
              src="/assets/aistudio/logo.png"
              alt="GQ Travel & Hotels"
              className="h-10 w-auto max-w-[120px] object-contain sm:h-14 sm:max-w-[150px]"
            />
          </a>

          {/* Primary navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-sm font-medium text-slate-600">
            <a
              href="/services"
              onClick={(event) => {
                event.preventDefault();
                goToPath('/services');
              }}
              aria-current={currentPath === '/services' ? 'page' : undefined}
              className="hover:text-teal-800 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="/blog"
              onClick={(event) => {
                event.preventDefault();
                goToPath('/blog');
              }}
              className="hover:text-teal-800 transition-colors whitespace-nowrap shrink-0"
            >
              Blog
            </a>
            <div ref={desktopBookingRef} className="relative">
              <button
                type="button"
                aria-expanded={bookingMenuOpen}
                aria-haspopup="true"
                aria-controls="booking-menu"
                onClick={() => setBookingMenuOpen((isOpen) => !isOpen)}
                className={`inline-flex items-center gap-1 border-b-2 py-2 transition-colors whitespace-nowrap ${
                  bookingMenuOpen
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent hover:border-teal-700 hover:text-teal-800'
                }`}
              >
                Booking
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${bookingMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {bookingMenuOpen && (
                <div
                  id="booking-menu"
                  className="absolute left-0 top-full z-50 mt-2 w-60 bg-white py-1 shadow-xl ring-1 ring-black/5"
                >
                  {bookingMenuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      title={item.description}
                      target={item.href.startsWith('/') || item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('/') || item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      onClick={(event) => {
                        if (item.href.startsWith('/')) {
                          event.preventDefault();
                          goToPath(item.href);
                        }
                        setBookingMenuOpen(false);
                      }}
                      className="block px-6 py-2.5 text-base font-medium text-teal-700 transition-colors hover:bg-teal-50 hover:text-teal-900"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a
              href="/contact"
              onClick={(event) => {
                event.preventDefault();
                goToPath('/contact');
              }}
              aria-current={currentPath === '/contact' ? 'page' : undefined}
              className="hover:text-teal-800 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <LanguageSelector />
            <button
              onClick={onOpenConcierge}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
              <span>Chat with Us</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center px-3 py-2 text-[11px] font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:px-4 sm:py-2.5 sm:text-xs"
            >
              <span className="sm:hidden">Book Stay</span>
              <span className="hidden sm:inline">Book Your Stay</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 focus-visible:outline-hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="xl:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
              <a
                href="/services"
                onClick={(event) => {
                  event.preventDefault();
                  goToPath('/services');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md hover:bg-slate-100"
              >
                Services
              </a>
              <a
                href="/blog"
                onClick={(event) => {
                  event.preventDefault();
                  goToPath('/blog');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md hover:bg-slate-100"
              >
                Blog
              </a>
              <div ref={mobileBookingRef}>
                <button
                  type="button"
                  aria-expanded={bookingMenuOpen}
                  aria-controls="mobile-booking-menu"
                  onClick={() => setBookingMenuOpen((isOpen) => !isOpen)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-slate-100"
                >
                  Booking
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 transition-transform ${bookingMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {bookingMenuOpen && (
                  <div id="mobile-booking-menu" className="ml-3 mt-1 border-l-2 border-teal-100 pl-2">
                    {bookingMenuItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        title={item.description}
                        target={item.href.startsWith('/') || item.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={item.href.startsWith('/') || item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        onClick={(event) => {
                          if (item.href.startsWith('/')) {
                            event.preventDefault();
                            goToPath(item.href);
                          }
                          setBookingMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="block rounded-md px-3 py-2 text-sm text-teal-700 hover:bg-teal-50"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a
                href="/contact"
                onClick={(event) => {
                  event.preventDefault();
                  goToPath('/contact');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md hover:bg-slate-100"
              >
                Contact
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="w-full py-3 bg-teal-800 text-white rounded-lg text-sm font-semibold text-center shadow-xs"
              >
                Book Your Trip Now
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenConcierge(); }}
                className="w-full py-2.5 bg-slate-100 text-slate-800 rounded-lg text-sm font-medium text-center"
              >
                Chat with AI Travel Assistant
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
