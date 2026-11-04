import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe2 } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
];

type GoogleTranslateElement = new (
  options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
  elementId: string,
) => unknown;

declare global {
  interface Window {
    google?: { translate?: { TranslateElement?: GoogleTranslateElement } };
    googleTranslateElementInit?: () => void;
  }
}

let translateReady: Promise<void> | undefined;

function loadGoogleTranslate() {
  if (translateReady) return translateReady;

  translateReady = new Promise<void>((resolve, reject) => {
    const initialize = () => {
      try {
        const TranslateElement = window.google?.translate?.TranslateElement;
        if (!TranslateElement) {
          reject(new Error('Google Translate could not be initialized.'));
          return;
        }

        let translateContainer = document.getElementById('gq-google-translate');
        if (!translateContainer) {
          translateContainer = document.createElement('div');
          translateContainer.id = 'gq-google-translate';
          translateContainer.style.position = 'fixed';
          translateContainer.style.left = '-10000px';
          translateContainer.style.top = '0';
          translateContainer.style.width = '1px';
          translateContainer.style.height = '1px';
          translateContainer.style.overflow = 'hidden';
          document.body.appendChild(translateContainer);
        }

        new TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: languages.map(({ code }) => code).join(','),
            autoDisplay: false,
          },
          'gq-google-translate',
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    if (window.google?.translate?.TranslateElement) {
      initialize();
      return;
    }

    window.googleTranslateElementInit = initialize;
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => {
      script.remove();
      reject(new Error('Google Translate could not be loaded. Check your connection and try again.'));
    };
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    translateReady = undefined;
    throw error;
  });

  return translateReady;
}

function getCurrentLanguage() {
  const cookie = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
  const languageCode = cookie?.[1] ? decodeURIComponent(cookie[1]) : 'en';
  return languages.find(({ code }) => code === languageCode) ?? languages[0];
}

function resetGoogleTranslation() {
  const hostname = window.location.hostname;
  const domainParts = hostname.split('.');
  const cookieDomains: (string | undefined)[] = [undefined];

  if (domainParts.length > 1 && hostname !== 'localhost') {
    cookieDomains.push(`.${domainParts.slice(-2).join('.')}`);
  }

  for (const domain of cookieDomains) {
    const domainAttribute = domain ? `; domain=${domain}` : '';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttribute}`;
  }

  window.location.reload();
}

export default function LanguageSelector() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLanguage);
  const [translateError, setTranslateError] = useState('');
  const [translateIsReady, setTranslateIsReady] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initializeTranslation = useCallback((isActive: () => boolean = () => true) => {
    setTranslateError('');
    void loadGoogleTranslate()
      .then(() => {
        if (isActive()) {
          setTranslateIsReady(true);
          setSelectedLanguage(getCurrentLanguage());
        }
      })
      .catch((error: unknown) => {
        if (isActive()) {
          setTranslateError(error instanceof Error ? error.message : 'Google Translate could not be loaded.');
        }
      });
  }, []);

  useEffect(() => {
    let active = true;
    initializeTranslation(() => active);

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      active = false;
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [initializeTranslation]);

  const selectLanguage = (language: (typeof languages)[number]) => {
    setTranslateError('');
    if (language.code === 'en') {
      setMenuOpen(false);
      resetGoogleTranslation();
      return;
    }

    const translateSelect = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (!translateSelect) {
      setTranslateError('The translation control is not ready yet. Please try again.');
      return;
    }

    translateSelect.value = language.code;
    translateSelect.dispatchEvent(new Event('change', { bubbles: true }));
    setSelectedLanguage(language);
    setMenuOpen(false);
  };

  return (
    <>
      <div translate="no" className="notranslate relative" ref={menuRef}>
        <button
          type="button"
          aria-label={`Language: ${selectedLanguage.name}`}
          aria-expanded={menuOpen}
          aria-haspopup="listbox"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:px-2.5"
        >
          <Globe2 aria-hidden="true" className="h-4 w-4 text-teal-800" />
          <span>{selectedLanguage.code === 'zh-CN' ? 'ZH' : selectedLanguage.code.toUpperCase()}</span>
          <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
        </button>
        {menuOpen && (
          <div
            role="listbox"
            aria-label="Select language"
            className="absolute right-0 top-full z-[60] mt-2 max-h-[min(70vh,420px)] w-64 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                role="option"
                aria-selected={selectedLanguage.code === language.code}
                disabled={!translateIsReady}
                onClick={() => selectLanguage(language)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-teal-50 disabled:cursor-wait disabled:opacity-60 ${
                  selectedLanguage.code === language.code ? 'bg-teal-50 font-semibold text-teal-900' : 'text-slate-700'
                }`}
              >
                <span aria-hidden="true" className="w-7 shrink-0 text-xs font-bold tracking-wide text-teal-900">{language.flag}</span>
                <span>{language.name}</span>
                <span className="ml-auto text-xs text-slate-400">{language.code === 'zh-CN' ? 'ZH' : language.code.toUpperCase()}</span>
              </button>
            ))}
            {!translateIsReady && !translateError && (
              <p role="status" className="px-4 py-2 text-xs text-slate-500">Loading translations…</p>
            )}
            {translateError && (
              <div className="px-4 py-2">
                <p role="alert" className="text-xs text-rose-700">{translateError}</p>
                <button
                  type="button"
                  onClick={() => initializeTranslation()}
                  className="mt-2 text-xs font-semibold text-teal-800 hover:text-teal-950"
                >
                  Retry loading
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
