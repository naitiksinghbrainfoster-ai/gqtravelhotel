export const GHANA_WHATSAPP = {
  label: 'Ghana WhatsApp',
  value: '+233 55 998 2727',
  href: 'https://wa.me/233559982727',
} as const;

export const GERMANY_WHATSAPP = {
  label: 'Germany WhatsApp',
  value: '+49 1521 485 2424',
  href: 'https://wa.me/4915214852424',
} as const;

export const GERMANY_OFFICE_PHONES = [
  { label: 'Tel.', value: '+49 179 986 4242', href: 'tel:+491799864242' },
  { label: 'Tel.', value: '+49 1521 485 2424', href: 'tel:+4915214852424' },
] as const;

export const HOTEL_EMAIL = {
  label: 'Email',
  value: 'hotel@gqtravel-hotels.com',
  href: 'mailto:hotel@gqtravel-hotels.com',
} as const;

export const contactChannels = [GHANA_WHATSAPP, GERMANY_WHATSAPP, HOTEL_EMAIL] as const;
