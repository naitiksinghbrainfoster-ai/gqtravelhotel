import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SiteContent } from '../lib/siteContent';
import { GERMANY_WHATSAPP, HOTEL_EMAIL } from '../lib/contactChannels';

/**
 * Service page – src/pages/service.tsx
 * Layout alternates automatically: text left / picture right, then picture left / text right.
 * Put your images in /public/images/services/ and update the `image` paths below.
 */

const WHATSAPP_BASE_URL = GERMANY_WHATSAPP.href;
const WHATSAPP_DISPLAY = GERMANY_WHATSAPP.value;
const EMAIL = HOTEL_EMAIL.value;

const waLink = (text: string) =>
  `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;

type Cta = { label: string; href: string; primary?: boolean };

type Service = {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  highlights?: string; // bold line of destinations, etc.
  blocks?: { heading: string; text: string }[];
  listTitle?: string;
  list?: string[];
  closingHeading?: string;
  closingText?: string;
  contact?: boolean;
  ctas: Cta[];
  image: string;
  imageAlt: string;
};

const serviceImage = (fileName: string) => encodeURI(`/assets/service/${fileName}`);

const services: Service[] = [
  {
    id: 'hotel-flight-holiday',
    title: 'Worldwide Hotel, Flight & Holiday Package Reservations',
    subtitle: 'Your Home Away From Home – Wherever You Travel',
    paragraphs: [
      'At GQ Travel & Hotels, we make travel planning easy and convenient. From worldwide hotel and guesthouse reservations to flight-and-hotel holiday packages, airport transfers, and Deutsche Bahn train tickets in Germany, we help you find travel options that suit your budget and needs.',
      'Discover exciting destinations including Ghana, Zanzibar, Kenya, Uganda, Dubai, Thailand, China, Germany and Paris, or plan your next adventure anywhere in the world.',
    ],
    closingHeading: 'Ready to travel?',
    closingText:
      'Book your hotel, plan your holiday, or request your personalised travel quote today!',
    ctas: [
      { label: 'Book your trip now', href: waLink('Hello GQ Travel & Hotels, I would like to book a trip.'), primary: true },
    ],
    image: serviceImage('Tropical Infinity Pool Sunset Escape-500kb.jpeg'),
    imageAlt: 'Hotel and holiday package reservations',
  },
  {
    id: 'flight-booking',
    title: 'Flight Booking Assistance',
    subtitle: 'Your Gateway to Stress-Free International Travel.',
    paragraphs: [
      'Planning a trip to or from Germany? GQ Travel & Hotels helps you find competitive airfares, convenient flight schedules, and suitable itineraries for domestic and international travel.',
      "Whether you're travelling for business or leisure, enjoy personalised booking assistance tailored to your needs.",
    ],
    listTitle: 'Why Choose GQ Travel & Hotels?',
    blocks: [
      {
        heading: 'Competitive Flight Fares',
        text: 'Explore available flight options to match your budget and travel plans.',
      },
      {
        heading: 'Convenient Travel Options',
        text: 'Discover suitable routes, flight schedules, and connections for a smoother journey.',
      },
      {
        heading: 'Personalised Booking Assistance',
        text: 'Get expert support with flight reservations, multi-city itineraries, and travel changes, subject to applicable booking conditions.',
      },
    ],
    closingHeading: 'Ready to Book Your Next Flight?',
    closingText:
      'Find your ideal flight, compare available options, and book your next journey with GQ Travel & Hotels. Need a convenient train connection? Ask us about available Rail & Fly options in Germany.',
    ctas: [
      { label: 'Search flights & book now', href: waLink('Hello GQ Travel & Hotels, I would like help booking a flight.'), primary: true },
    ],
    image: serviceImage('Sunset Airport Travel Essentials.png'),
    imageAlt: 'Flight booking assistance',
  },
  {
    id: 'guided-tours',
    title: 'Guided Tours & Holiday Packages',
    subtitle: 'Discover the World with GQ Travel & Hotels',
    paragraphs: [
      'Explore unforgettable guided tours, cultural experiences, wildlife safaris, and tailor-made holidays. From Dubai and Ghana to Kenya, Zanzibar, and Southeast Asia, discover your next adventure with personalised travel assistance.',
    ],
    highlights:
      'Germany · Dubai · Ghana · Kenya · Uganda · Zanzibar · Paris · Vietnam · Laos · Cambodia · Thailand',
    closingHeading: 'Ready for Your Next Adventure?',
    closingText: 'Find your ideal tour or let us create a journey tailored to your needs.',
    ctas: [
      { label: 'Explore tours & book now', href: waLink('Hello GQ Travel & Hotels, I would like to book a guided tour.'), primary: true },
      { label: 'Request a free quote', href: waLink('Hello GQ Travel & Hotels, I would like a free quote for a holiday package.') },
    ],
    image: serviceImage('Golden Safari Sunset with Wildlife-500kb.jpeg'),
    imageAlt: 'Guided tours and holiday packages',
  },
  {
    id: 'airport-transfer',
    title: 'Airport Pick-Up & Drop-Off',
    subtitle: 'Book Your Airport Transfer Online — Easy & Reliable',
    paragraphs: [
      'Need an airport transfer in Saarland or Saarbrücken? GQ Travel & Hotels offers convenient pick-up and drop-off services to and from Frankfurt, Luxembourg, Stuttgart, Düsseldorf, Frankfurt-Hahn, and Brussels airports.',
      'Enjoy comfortable transfers, reliable pick-ups, and easy online booking for your next journey.',
    ],
    ctas: [
      { label: 'Book your airport transfer now', href: waLink('Hello GQ Travel & Hotels, I would like to book an airport transfer.'), primary: true },
    ],
    image: serviceImage('Golden Hour Airport Chauffeur Pickup-500kb.jpeg'),
    imageAlt: 'Airport pick-up and drop-off',
  },
  {
    id: 'private-jet',
    title: 'Private Jet Charter',
    subtitle: 'Request Your Private Jet Charter Online',
    paragraphs: [
      'Experience luxury, privacy, and flexibility with GQ Travel & Hotels. Whether travelling for business or leisure, request a private jet charter tailored to your destination, schedule, and travel preferences.',
    ],
    blocks: [
      {
        heading: 'Your Journey, Your Schedule',
        text: 'Enjoy personalised charter assistance, flexible departure options, and aircraft choices suited to your travel needs.',
      },
    ],
    closingHeading: 'Ready to Fly Private?',
    closingText: 'Submit your trip details and receive a personalised private jet charter quotation.',
    ctas: [
      { label: 'Request your private jet quote now', href: waLink('Hello GQ Travel & Hotels, I would like a private jet charter quote.'), primary: true },
    ],
    image: serviceImage('Luxury Jet at Sunset-500kb.jpeg'),
    imageAlt: 'Private jet charter',
  },
  {
    id: 'ghana-evisa',
    title: 'Ghana e-Visa Assistance',
    subtitle: 'Flying to Ghana Within 72 Hours? Get Assistance Now!',
    paragraphs: [
      'GQ Travel & Hotels helps travellers with Ghana e-Visa applications, document preparation, and application guidance before departure.',
      'Send us your travel details via WhatsApp or email to get started.',
    ],
    closingHeading: 'Need urgent assistance? Contact us today!',
    contact: true,
    ctas: [
      { label: 'Request Ghana e-Visa assistance', href: waLink('Hello GQ Travel & Hotels, I need help with a Ghana e-Visa.'), primary: true },
    ],
    image: serviceImage('Stamped Passport Travel Still Life-500kb.jpeg'),
    imageAlt: 'Ghana e-Visa assistance',
  },
  {
    id: 'medical-treatment',
    title: 'Get Medical Treatment in Germany',
    paragraphs: [
      'Looking for medical treatment in Germany? GQ Travel & Hotels helps you contact hospitals and request treatment appointments, with support throughout your journey.',
    ],
    listTitle: 'Our Services',
    list: [
      'Hospital and medical treatment requests',
      'Visa assistance',
      'Flight reservations',
      'Accommodation',
      'Airport pick-up and drop-off',
      'Translation support: German, English, and Twi',
    ],
    closingHeading: 'Take the First Step Towards Your Treatment Today!',
    closingText:
      'Let us help you contact the right hospital and begin your journey towards medical care in Germany.',
    contact: true,
    ctas: [
      { label: 'Submit your medical treatment request now', href: waLink('Hello GQ Travel & Hotels, I would like to submit a medical treatment request for Germany.'), primary: true },
    ],
    image: serviceImage('Welcoming Arrival at a German Hospital-500kb.jpeg'),
    imageAlt: 'Medical treatment in Germany',
  },
];

const ServiceImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full min-h-[260px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400"
      >
        Picture here
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full min-h-[260px] w-full rounded-2xl object-cover shadow-md"
    />
  );
};

const ServiceRow: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const imageFirst = index % 2 === 1;

  return (
    <section
      id={service.id}
      className="mx-auto grid max-w-7xl scroll-mt-24 items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-14 lg:px-8"
    >
      {/* Text */}
      <div className={imageFirst ? 'md:order-2' : 'md:order-1'}>
        <h2 className="text-2xl font-bold leading-tight text-[oklch(0.437_0.078_188.216)] sm:text-3xl">
          {service.title}
        </h2>

        {service.subtitle && (
          <p className="mt-3 text-lg font-semibold text-gray-900">{service.subtitle}</p>
        )}

        {service.paragraphs?.map((p) => (
          <p key={p} className="mt-4 leading-relaxed text-gray-700">
            {p}
          </p>
        ))}

        {service.highlights && (
          <p className="mt-4 font-medium text-gray-900">{service.highlights}</p>
        )}

        {service.listTitle && (
          <h3 className="mt-6 font-bold text-gray-900">{service.listTitle}</h3>
        )}

        {service.blocks && (
          <div className="mt-3 space-y-4">
            {service.blocks.map((b) => (
              <div key={b.heading}>
                <h4 className="font-semibold text-gray-900">{b.heading}</h4>
                <p className="text-gray-700">{b.text}</p>
              </div>
            ))}
          </div>
        )}

        {service.list && (
          <ul className="mt-3 list-disc space-y-1 pl-6 text-gray-700">
            {service.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {service.closingHeading && (
          <h3 className="mt-6 font-bold text-gray-900">{service.closingHeading}</h3>
        )}
        {service.closingText && <p className="mt-1 text-gray-700">{service.closingText}</p>}

        {service.contact && (
          <dl className="mt-3 space-y-1 text-gray-700">
            <div className="flex gap-2">
              <dt className="font-semibold">WhatsApp:</dt>
              <dd>
                <a className="underline hover:text-[oklch(0.437_0.078_188.216)]" href={waLink('Hello GQ Travel & Hotels')}>
                  {WHATSAPP_DISPLAY}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold">Email:</dt>
              <dd>
                <a className="underline hover:text-[oklch(0.437_0.078_188.216)]" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {service.ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                cta.primary
                  ? 'rounded-full bg-[oklch(0.437_0.078_188.216)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[oklch(0.37_0.07_188.216)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.437_0.078_188.216)] focus-visible:ring-offset-2'
                  : 'rounded-full border border-[oklch(0.437_0.078_188.216)] px-6 py-3 text-sm font-semibold text-[oklch(0.437_0.078_188.216)] transition hover:bg-[oklch(0.437_0.078_188.216)]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.437_0.078_188.216)] focus-visible:ring-offset-2'
              }
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>

      {/* Picture */}
      <div className={imageFirst ? 'md:order-1' : 'md:order-2'}>
        <ServiceImage src={service.image} alt={service.imageAlt} />
      </div>
    </section>
  );
};

const ServicePage: React.FC<{ onNavigate?: (path: string) => void; content?: SiteContent }> = ({ onNavigate, content = {} }) => {
  const displayedServices = services.map((service) => {
    const description = content[`service_${service.id}_description`];
    return {
      ...service,
      title: content[`service_${service.id}_title`] || service.title,
      subtitle: content[`service_${service.id}_subtitle`] || service.subtitle,
      paragraphs: description ? description.split(/\n\s*\n/).filter(Boolean) : service.paragraphs,
      image: content[`service_${service.id}_image`] || service.image,
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        currentPath="/services"
        onNavigate={onNavigate}
        onOpenBooking={() => {}}
        onOpenLegal={() => {}}
        onOpenConcierge={() => {}}
      />

      <main>
        <header
          className="bg-gray-50 py-14 text-center"
          style={content.services_page_banner_image ? {
            backgroundImage: `linear-gradient(rgb(15 23 42 / 65%), rgb(15 23 42 / 65%)), url("${content.services_page_banner_image}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          } : undefined}
        >
          <h1 className={`text-3xl font-bold sm:text-4xl ${content.services_page_banner_image ? 'text-white' : 'text-gray-900'}`}>{content.services_page_title || 'Our Services'}</h1>
          <p className={`mx-auto mt-3 max-w-2xl px-4 ${content.services_page_banner_image ? 'text-white/90' : 'text-gray-600'}`}>
            {content.services_page_description || 'Hotels, flights, tours, transfers and more — everything for your journey, in one place.'}
          </p>
        </header>

        {displayedServices.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </main>

      <Footer
        onOpenLegal={() => {}}
        onOpenBooking={() => {}}
        onOpenTransferModal={() => {}}
      />
    </div>
  );
};

export default ServicePage;
