// Shared constants + Tailwind class strings for the About page components.
// Brand teal = oklch(0.437 0.078 188.216) (same as the "Hotels & Apartments" button).
import { GERMANY_WHATSAPP, HOTEL_EMAIL } from '../../lib/contactChannels';

export const PHONE_DISPLAY = GERMANY_WHATSAPP.value;
export const PHONE_TEL = `tel:+${GERMANY_WHATSAPP.value.replace(/\D/g, '')}`;
export const EMAIL = HOTEL_EMAIL.value;
export const waLink = (message: string) =>
  `${GERMANY_WHATSAPP.href}?text=${encodeURIComponent(message)}`;

export const brandText = 'text-[oklch(0.437_0.078_188.216)]';
export const brandBg = 'bg-[oklch(0.437_0.078_188.216)]';
export const brandTint = 'bg-[oklch(0.965_0.02_188.216)]';

const focus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.437_0.078_188.216)] focus-visible:ring-offset-2';

export const btnPrimary = `inline-flex items-center justify-center rounded-full bg-[oklch(0.437_0.078_188.216)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[oklch(0.37_0.07_188.216)] ${focus}`;

export const btnOutline = `inline-flex items-center justify-center rounded-full border border-[oklch(0.437_0.078_188.216)] px-6 py-3 text-sm font-semibold text-[oklch(0.437_0.078_188.216)] transition hover:bg-[oklch(0.437_0.078_188.216)]/10 ${focus}`;

export const btnLink = `text-sm font-semibold text-[oklch(0.437_0.078_188.216)] underline-offset-4 hover:underline ${focus}`;