export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  category: 'Hotel' | 'Apartment' | 'Villa' | 'Resort' | 'Package';
  image: string;
  description: string;
  amenities: string[];
  isSaarbruecken?: boolean;
  address?: string;
}

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  country: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  bestSeason: string;
  flightTimeFromGermany: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  category: string;
  features: string[];
  ctaText: string;
  contactEmail: string;
  badge?: string;
}

export interface NewsArticle {
  id: string;
  slug?: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  trip: string;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
  location: string;
  bio: string;
  experience: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const PROPERTIES: Property[] = [
  {
    id: 'saarbruecken-apt',
    title: 'Saarbrücken City Apartment',
    location: 'Rosenstraße 2, Saarbrücken',
    city: 'Saarbrücken',
    country: 'Germany',
    pricePerNight: 95,
    rating: 4.9,
    reviewsCount: 142,
    category: 'Apartment',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    description: 'Modern serviced apartment in central Saarbrücken, close to St. Johanner Markt, DB main station, and the French border. Perfect for leisure travelers, business professionals, and medical tourism guests.',
    amenities: ['High-speed Wi-Fi', 'Fully-equipped kitchen', 'Air conditioning', 'Smart TV', 'Self check-in', 'Work desk'],
    isSaarbruecken: true,
    address: 'Rosenstraße 2, 66111 Saarbrücken'
  },
  {
    id: 'oasis-villa',
    title: 'The Oasis Luxury Villa',
    location: 'Red Sea Coast, Sharm El Sheikh',
    city: 'Sharm El Sheikh',
    country: 'Egypt',
    pricePerNight: 280,
    rating: 4.9,
    reviewsCount: 98,
    category: 'Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    description: 'Breathtaking beachfront villa featuring private swimming pool, sun terrace with direct reef access, and personal concierge.',
    amenities: ['Private infinity pool', 'Sea view deck', 'Butler service', 'Snorkeling gear', 'Breakfast included', 'Airport transfer']
  },
  {
    id: 'sanctuary-maldives',
    title: 'The Sanctuary Overwater Villa',
    location: 'Baa Atoll Lagoon',
    city: 'Baa Atoll',
    country: 'Maldives',
    pricePerNight: 550,
    rating: 5.0,
    reviewsCount: 84,
    category: 'Resort',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic thatched overwater bungalow perched above crystal-clear turquoise waters with glass bottom floors and direct ocean ladder.',
    amenities: ['Overwater hammock', 'Glass viewing floor', 'Lagoon access', 'Spa discounts', 'Seaplane transfer', 'Sunset terrace']
  },
  {
    id: 'infinity-horizon',
    title: 'The Infinity Horizon Villa',
    location: 'Sydney Harbour Enclave',
    city: 'Sydney',
    country: 'Australia',
    pricePerNight: 420,
    rating: 4.8,
    reviewsCount: 65,
    category: 'Villa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Architectural masterpiece overlooking panoramic ocean vistas, featuring floor-to-ceiling glass and private lap pool.',
    amenities: ['Harbour views', 'Designer kitchen', 'Infinity lap pool', 'Wine cellar', 'Electric vehicle charger', 'High security']
  },
  {
    id: 'la-maison-barcelona',
    title: 'La Maison Seaside Villa',
    location: 'Sitges Coastal Haven, Barcelona',
    city: 'Barcelona',
    country: 'Spain',
    pricePerNight: 310,
    rating: 4.8,
    reviewsCount: 110,
    category: 'Villa',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Catalan elegance meets Mediterranean light. Moments away from pristine beaches with lush olive garden and plunge pool.',
    amenities: ['Private garden', 'Plunge pool', 'Outdoor BBQ', 'Walk to beach', 'High-speed fiber', 'Wine patio']
  },
  {
    id: 'serenity-shores',
    title: 'Serenity Shores Coastal Estate',
    location: 'Sunshine Coast, Noosa',
    city: 'Noosa',
    country: 'Australia',
    pricePerNight: 360,
    rating: 4.9,
    reviewsCount: 77,
    category: 'Villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Lush tropical setting bordering national parkland and pristine beaches with heated saltwater pool and al fresco dining deck.',
    amenities: ['Saltwater pool', 'Rainforest borders', 'Designer patio', 'Surfing gear', 'Espresso bar', 'Daily housekeeping']
  },
  {
    id: 'azure-haven-samui',
    title: 'Azure Haven Hillside Villa',
    location: 'Chaweng Noi Bay',
    city: 'Koh Samui',
    country: 'Thailand',
    pricePerNight: 240,
    rating: 4.9,
    reviewsCount: 92,
    category: 'Resort',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    description: 'Secluded hilltop retreat with commanding panoramic views over the Gulf of Thailand, cascading infinity pool and Thai pavilion.',
    amenities: ['Hillside sea views', 'Private chef available', 'Infinity deck', 'Tropical garden', 'Free airport pickup', 'Yoga terrace']
  },
  {
    id: 'palm-breeze-phuket',
    title: 'Palm Breeze Ocean Penthouse',
    location: 'Kata Beach Viewpoint',
    city: 'Phuket',
    country: 'Thailand',
    pricePerNight: 290,
    rating: 4.8,
    reviewsCount: 104,
    category: 'Apartment',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious modern luxury penthouse with sweeping views across Andaman Sea, rooftop jacuzzi, and steps to golden sand.',
    amenities: ['Rooftop jacuzzi', 'Oceanfront balcony', '24/7 security', 'Resort gym access', 'Concierge service', 'Fast Wi-Fi']
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'maldives',
    name: 'Maldives',
    subtitle: 'Tropical Paradise of Azure Atolls',
    country: 'Maldives',
    tagline: 'Crystal clear lagoons, overwater villas and vibrant coral gardens.',
    description: 'Immerse yourself in secluded luxury across the world’s most pristine turquoise waters. GQ Travel & Hotels coordinates exclusive resort packages, seaplane transfers, and honeymoon retreats.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Overwater bungalow retreats', 'World-class snorkeling & diving', 'Private island dining', 'Direct resort seaplane'],
    bestSeason: 'November – April',
    flightTimeFromGermany: 'Approx. 9.5 hours'
  },
  {
    id: 'ghana',
    name: 'Ghana & Accra',
    subtitle: 'Gateway to West Africa',
    country: 'Ghana',
    tagline: 'Rich heritage, warm hospitality, golden beaches, and thriving culture.',
    description: 'With our dedicated team in Accra, GQ Travel & Hotels provides complete ground handling: expedited Ghana e-Visa assistance, Kotoka Airport transfers, curated tours to Cape Coast Castle and Kakum National Park.',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Expedited Ghana e-Visa (72h)', 'Accra Kotoka Airport Transfer', 'Cape Coast & Elmina historical tours', 'Kakum Canopy Walkway'],
    bestSeason: 'October – March',
    flightTimeFromGermany: 'Approx. 6.5 hours'
  },
  {
    id: 'germany',
    name: 'Saarbrücken & Germany',
    subtitle: 'Heart of Europe & Medical Excellence',
    country: 'Germany',
    tagline: 'Saarland historic charm, world-class German healthcare, and Deutsche Bahn connections.',
    description: 'Headquarters of GQ Travel & Hotels since 2005. Offering premier serviced city apartments, Deutsche Bahn Rail & Fly coordination, European airport transfers, and specialized Medical Tourism coordination.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Saarbrücken City Apartments', 'Medical Tourism coordination', 'Deutsche Bahn Rail & Fly', 'Direct European airport shuttles'],
    bestSeason: 'May – October & Christmas Season',
    flightTimeFromGermany: 'Domestic Base'
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar & Kenya',
    subtitle: 'The Spice Island & Safari Majesty',
    country: 'Tanzania / Kenya',
    tagline: 'Pristine Indian Ocean coastlines blended with legendary African wildlife safaris.',
    description: 'Combine the thrill of Masai Mara safari game drives with tranquil turquoise sandbanks in Zanzibar. Tailor-made guided itineraries crafted by our travel specialists.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Stone Town UNESCO heritage', 'Spice plantation tours', 'Serengeti & Masai Mara safaris', 'Nakupenda sandbank cruising'],
    bestSeason: 'June – October & December – February',
    flightTimeFromGermany: 'Approx. 8.5 hours'
  },
  {
    id: 'dubai',
    name: 'Dubai & UAE',
    subtitle: 'Ultra-Modern Luxury & Desert Dunes',
    country: 'United Arab Emirates',
    tagline: 'Architectural marvels, luxury shopping, desert dunes, and private jet access.',
    description: 'Experience futuristic luxury, private yacht cruises, five-star hotel suites along Jumeirah, and bespoke VIP airport transfers.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Burj Khalifa & Downtown suites', 'Private desert safari dunes', 'Marina yacht charters', 'VIP airport concierge'],
    bestSeason: 'November – March',
    flightTimeFromGermany: 'Approx. 6 hours'
  },
  {
    id: 'southeast-asia',
    name: 'Thailand, Vietnam & Laos',
    subtitle: 'Colors, Temples & Exotic Coasts',
    country: 'Southeast Asia',
    tagline: 'Ancient temples, limestone karts, emerald waters, and renowned street cuisine.',
    description: 'From Bangkok’s bustling markets to the quiet emerald waters of Halong Bay and Luang Prabang temples, our guided tours provide authentic discovery.',
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Halong Bay private cruises', 'Chiang Mai cultural sanctuaries', 'Luang Prabang monk ceremonies', 'Phuket & Krabi island hopping'],
    bestSeason: 'November – April',
    flightTimeFromGermany: 'Approx. 11 hours'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'hotels-flights-packages',
    title: 'Worldwide Hotel & Holiday Packages',
    tagline: 'Your Home Away From Home – Wherever You Travel',
    shortDesc: 'Worldwide hotel and guesthouse reservations, flight-and-hotel holiday packages, airport transfers, and train tickets tailored to your needs.',
    fullDesc: 'At GQ Travel & Hotels, we make travel planning easy and convenient. From worldwide hotel and guesthouse reservations to flight-and-hotel holiday packages, airport transfers, and Deutsche Bahn train tickets in Germany, we help you find travel options that suit your budget and needs. Discover exciting destinations including Ghana, Zanzibar, Kenya, Uganda, Dubai, Thailand, China, Germany, and Paris.',
    icon: 'Hotel',
    category: 'Reservations',
    features: [
      'Worldwide luxury hotels, guesthouses & serviced apartments',
      'Package travel insolvency protection with R+V Allgemeine Versicherung AG',
      'Flexible rates with free cancellation options',
      'Saarbrücken city apartments with low local city tax (3.5%)',
      'Transparent service fee of only €3.99 per day'
    ],
    ctaText: 'Book Your Trip Now',
    contactEmail: 'hotel@gqtravel-hotels.com',
    badge: 'Core Service'
  },
  {
    id: 'flight-booking',
    title: 'Flight Booking & Rail & Fly',
    tagline: 'Your Gateway to Stress-Free International Travel',
    shortDesc: 'Competitive airfares, convenient flight schedules, and seamless Deutsche Bahn Rail & Fly connections across Germany.',
    fullDesc: 'Planning a trip to or from Germany? GQ Travel & Hotels helps you find competitive airfares, convenient flight schedules, and suitable itineraries for domestic and international travel. Whether you are travelling for business or leisure, enjoy personalised booking assistance tailored to your needs. Ask us about available Rail & Fly options with Deutsche Bahn in Germany.',
    icon: 'Plane',
    category: 'Flights',
    features: [
      'Competitive domestic & international airfares',
      'Deutsche Bahn Tourist Tickets & Rail & Fly integration',
      'Personalised itinerary planning & multi-city routing',
      'Assistance with schedule changes and airline coordination',
      'Baggage allowances & check-in guidance'
    ],
    ctaText: 'Search Flights & Book',
    contactEmail: 'hotel@gqtravel-hotels.com'
  },
  {
    id: 'guided-tours',
    title: 'Guided Tours & Safaris',
    tagline: 'Discover the World with GQ Travel & Hotels',
    shortDesc: 'Cultural experiences, wildlife safaris, and tailor-made holidays across Africa, Europe, the Middle East, and Asia.',
    fullDesc: 'Explore unforgettable guided tours, cultural experiences, wildlife safaris, and tailor-made holidays. From Dubai and Ghana to Kenya, Zanzibar, and Southeast Asia (Vietnam, Laos, Cambodia, Thailand), discover your next adventure with our personalised travel assistance.',
    icon: 'Compass',
    category: 'Experiences',
    features: [
      'Authentic African safaris in Kenya, Uganda & Tanzania',
      'Historical & heritage excursions across Ghana and West Africa',
      'Southeast Asia multi-country discovery tours',
      'Experienced English, German, and local language tour guides',
      'Custom group travel and private family itineraries'
    ],
    ctaText: 'Explore Tours & Packages',
    contactEmail: 'hotel@gqtravel-hotels.com'
  },
  {
    id: 'airport-transfers',
    title: 'Airport Pick-Up & Drop-Off',
    tagline: 'Easy & Reliable Pre-Booked Private Transfers',
    shortDesc: 'Direct airport transfers in Saarland / Saarbrücken to Frankfurt, Luxembourg, Stuttgart, Düsseldorf, Frankfurt-Hahn, and Brussels, plus Accra Kotoka.',
    fullDesc: 'Need an airport transfer in Saarland or Saarbrücken? GQ Travel & Hotels offers convenient pick-up and drop-off services to and from Frankfurt (FRA), Luxembourg (LUX), Stuttgart (STR), Düsseldorf (DUS), Frankfurt-Hahn (HHN), and Brussels (BRU) airports. Plus, our Accra branch manages Kotoka International Airport transfers with reliable drivers, free waiting time, and WhatsApp arrival coordination.',
    icon: 'Car',
    category: 'Transfers',
    features: [
      '60 minutes free waiting time after flight landing',
      'Dedicated WhatsApp group with your assigned driver',
      'Free cancellation within 24 hours of booking',
      'Clear, fixed pricing with no hidden surprises',
      'Comfortable, air-conditioned executive fleet'
    ],
    ctaText: 'Book Airport Transfer',
    contactEmail: 'hotel@gqtravel-hotels.com',
    badge: 'Popular in Saarland'
  },
  {
    id: 'private-jet',
    title: 'Private Jet Charter & Rental',
    tagline: 'Experience Luxury, Privacy, and Supreme Flexibility',
    shortDesc: 'Request private jet charter tailored to your destination, schedule, and travel preferences across Germany, Europe, and worldwide.',
    fullDesc: 'Experience luxury, privacy, and flexibility with GQ Travel & Hotels. Whether travelling for business or leisure, request a private jet charter tailored to your destination, schedule, and travel preferences. Enjoy personalised charter assistance, flexible departure options, and aircraft choices suited to your travel needs.',
    icon: 'Navigation',
    category: 'VIP Aviation',
    features: [
      'Access to light jets, mid-size jets, and long-range heavy aircraft',
      'Direct flights from regional German airports including Saarbrücken, Frankfurt, Luxembourg',
      'VIP private terminal lounge access & rapid boarding',
      'Custom onboard catering and discrete executive privacy',
      'Fast turnaround quotations for urgent business needs'
    ],
    ctaText: 'Request Private Jet Quote',
    contactEmail: 'hotel@gqtravel-hotels.com'
  },
  {
    id: 'ghana-visa',
    title: 'Ghana e-Visa Express Assistance',
    tagline: 'Flying to Ghana Within 72 Hours? Get Assistance Now!',
    shortDesc: 'Fast-track visa guidance, document checking, and expedited application coordination for smooth travel to Ghana.',
    fullDesc: 'Flying to Ghana within 72 hours? Get assistance now! GQ Travel & Hotels helps travellers with Ghana e-Visa applications, document preparation, and application guidance before departure. Our Accra and Saarbrücken offices coordinate directly to ensure all requirements are in order.',
    icon: 'FileCheck',
    category: 'Visa Support',
    features: [
      'Urgent 72-hour expedited assistance',
      'Document checklist review & form verification',
      'Direct WhatsApp and email liaison for rapid updates',
      'Guidance for tourist, business, and family visit visas',
      'Coordination with local Ghana immigration guidelines'
    ],
    ctaText: 'Request Ghana e-Visa Support',
    contactEmail: 'hotel@gqtravel-hotels.com',
    badge: 'Urgent 72h Service'
  },
  {
    id: 'medical-tourism',
    title: 'Medical Treatment in Germany',
    tagline: 'Access World-Class Healthcare & Comprehensive Coordination',
    shortDesc: 'Hospital liaison, doctor appointments, medical visas, accommodation, airport transfers, and German/English/Twi translation support.',
    fullDesc: 'Looking for medical treatment in Germany? GQ Travel & Hotels helps you contact reputable hospitals and request treatment appointments, with complete logistical support throughout your journey. From clinic communication and medical visas to comfortable patient accommodation in Saarbrücken, airport transfers, and trilingual translation.',
    icon: 'HeartPulse',
    category: 'Specialized Care',
    features: [
      'Hospital and medical treatment requests with renowned German clinics',
      'Medical visa application assistance and documentation',
      'Comfortable patient & family accommodation in Saarbrücken',
      'Airport pick-up and drop-off with specialized transport',
      'Translation support in German, English, and Twi'
    ],
    ctaText: 'Submit Medical Request',
    contactEmail: 'hotel@gqtravel-hotels.com',
    badge: 'Compassionate Care'
  },
  {
    id: 'corporate-travel',
    title: 'Corporate Travel Management',
    tagline: 'Simplify Business Travel. Save Time. Keep Your Business Moving.',
    shortDesc: 'Dedicated business flight and hotel bookings, train tickets, car rentals, and consolidated corporate invoicing.',
    fullDesc: 'GQ Travel & Hotels helps businesses manage flights, hotel reservations, and corporate travel arrangements tailored to their schedules and budgets. Let us simplify your company\'s travel planning with personalised support, consolidated corporate billing, and rapid itinerary adjustments.',
    icon: 'Briefcase',
    category: 'Business Travel',
    features: [
      'Tailored solutions for individual executives and full company teams',
      'Deutsche Bahn corporate train bookings and Rail & Fly',
      'Consolidated monthly business billing and transparent invoicing',
      'Priority 24/7 travel change and disruption assistance',
      'Negotiated corporate rates with hotels and Sixt car rental'
    ],
    ctaText: 'Request Corporate Quote',
    contactEmail: 'hotel@gqtravel-hotels.com'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'hanalei-bay-dining',
    date: 'February 20, 2026',
    title: 'Delicious Dining & Restful Escapes at Hanalei Bay & Tropical Lagoons',
    excerpt: 'Discover why tropical culinary traditions and serene oceanfront villas are transforming luxury vacationing in 2026.',
    readTime: '4 min read',
    category: 'Culinary Travel',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    content: [
      'Travelers today are seeking more than just sunshine; they are looking for immersive cultural and gastronomic journeys that nourish both body and spirit.',
      'From farm-to-table coastal eateries to secluded reef dining over candlelit lagoons, the blend of fresh organic ingredients and breathtaking oceanic views creates an unforgettable retreat.',
      'At GQ Travel & Hotels, we handpick accommodations that feature world-class dining programs, private chefs, and effortless access to local culinary gems.'
    ]
  },
  {
    id: 'top-10-scenic-spots',
    date: 'January 28, 2026',
    title: 'Top 10 Most Scenic Check-in Spots in Phuket & Zanzibar',
    excerpt: 'Explore the most photogenic viewpoints, turquoise sandbanks, and historic architectural corners across these two iconic islands.',
    readTime: '5 min read',
    category: 'Destination Guide',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    content: [
      'Whether you are strolling through the UNESCO-listed coral stone alleyways of Stone Town or taking in sunset over Promthep Cape, both Zanzibar and Phuket provide incomparable scenic wonder.',
      'In Zanzibar, the Nakupenda sandbank appears like a mirage during low tide, surrounded by crystalline waters perfect for swimming and fresh seafood grills.',
      'In Phuket, hillside villas offer bird’s-eye panoramas over the Andaman Sea, where contemporary architecture frames the dramatic coastline.',
      'Our team coordinates private island-hopping catamarans and expert local guides to ensure you experience these highlights away from the crowds.'
    ]
  },
  {
    id: 'navagio-luxury-services',
    date: 'January 15, 2026',
    title: 'Top 5 Newest Luxury Services at Navagio Beach & Private Jet Charters',
    excerpt: 'How flexible private aviation and bespoke coastal transfers are making remote destinations more accessible than ever.',
    readTime: '3 min read',
    category: 'VIP Aviation',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    content: [
      'Navigating Europe’s most dramatic coastal coves traditionally meant long ferry transfers and rigid timetables. In 2026, private aviation has rewritten the rules.',
      'With direct charters landing at regional airfields, travelers can bypass international terminal congestion and step straight onto a waiting helicopter or yacht.',
      'GQ Travel & Hotels provides turnkey private jet charters from Germany with personalized departure times, luxury ground transport, and complete baggage handling.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sebastian Weber',
    role: 'Managing Director, Logix GmbH',
    location: 'Saarbrücken, Germany',
    rating: 5,
    comment: 'GQ Travel & Hotels has managed our corporate flights and airport transfers from Saarbrücken to Frankfurt for over 4 years. Punctual, reliable, and always available on WhatsApp when flights are delayed.',
    trip: 'Corporate Travel & Airport Transfers',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't-2',
    name: 'Evangeline Osei',
    role: 'Healthcare Professional',
    location: 'Accra, Ghana',
    rating: 5,
    comment: 'When my mother needed medical consultation in Germany, Jim and the GQ team arranged everything: hospital liaison, medical visa support, flight, and a beautiful apartment in Saarbrücken. The Twi and English translation was invaluable.',
    trip: 'Medical Treatment in Germany',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't-3',
    name: 'Alexander Schmidt',
    role: 'Senior Architect',
    location: 'Frankfurt, Germany',
    rating: 5,
    comment: 'Booked our family holiday package to Zanzibar with GQ Travel. The beachfront resort, safari day tour, and airport pick-up were seamless. Knowing our package was backed by German insolvency protection gave total peace of mind.',
    trip: 'Zanzibar Holiday Package',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Jim E. Baggiocy',
    role: 'Managing Director & Founder',
    location: 'Saarbrücken, Germany',
    bio: 'Over 20 years guiding GQ Travel & Hotels with a passion for European-African connectivity, luxury hospitality, and transparent client service.',
    experience: '20+ Years Travel Leadership',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Remy Mantey',
    role: 'General Manager – Ghana',
    location: 'Accra, Ghana',
    bio: 'Oversees West African ground operations, Accra Kotoka Airport logistics, corporate liaison, and expedited Ghana e-Visa management.',
    experience: '12+ Years Operations Lead',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Maxwell Antwi',
    role: 'Marketing & Tour Guide Manager – Ghana',
    location: 'Accra & Cape Coast, Ghana',
    bio: 'Expert tour curator specializing in cultural heritage, Cape Coast expeditions, Kakum rainforest adventures, and local guest experiences.',
    experience: '9+ Years Guided Tourism',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Helena O.',
    role: 'Operations & UX/UI Manager',
    location: 'Saarbrücken, Germany',
    bio: 'Ensures digital convenience, customer journey excellence, automated booking confirmations, and seamless service delivery.',
    experience: '8+ Years Hospitality & Tech',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: '1. What corporate travel management services do you provide?',
    answer: 'GQ Travel & Hotels provides end-to-end corporate travel management services, including business flight and hotel bookings, Deutsche Bahn train tickets, airport transfers, car rentals (including Sixt partner discounts), visa assistance, itinerary planning, and multi-leg transportation coordination. We arrange business travel for individual executives and entire teams, with consolidated invoicing and dedicated 24/7 rebooking support tailored to your company’s needs.',
    category: 'Corporate'
  },
  {
    question: '2. What travel services do you provide in Saarbrücken, Germany, and Accra, Ghana?',
    answer: 'In Saarbrücken, Germany, we operate our primary travel agency and serviced city apartments on Rosenstraße, coordinate direct airport transfers to Frankfurt, Luxembourg, Stuttgart, and Brussels, handle Deutsche Bahn Rail & Fly, and direct medical tourism patients to specialized German hospitals. In Accra, Ghana, our local team coordinates Kotoka International Airport transfers, expedited 72-hour Ghana e-Visa assistance, hotel accommodations, and guided cultural tours across West Africa.',
    category: 'Locations'
  },
  {
    question: '3. How experienced is your team in travel bookings and arrangements?',
    answer: 'Founded in 2005, GQ Travel & Hotels has specialized in travel services since 2009. With over 20 years in the travel industry, we assist with worldwide flight bookings, hotel reservations, airport transfers, private jet charters, and holiday packages, offering personalized support backed by German insolvency protection (R+V Allgemeine Versicherung AG Sicherungsschein).',
    category: 'Company'
  },
  {
    question: '4. What are the cancellation and refund conditions for hotel bookings?',
    answer: 'Your cancellation and refund rights depend on the rate selected at checkout. Best Price Rates are non-refundable in exchange for discounted rates. Flexible Rates offer free cancellation up to 14 or 24 days prior to check-in. Early Booking Rates (booked 84+ days in advance) provide free cancellation up to 28 days before arrival. In Saarbrücken, a 3.5% municipal city tax applies, and all online bookings feature a transparent €3.99 per day service commission.',
    category: 'Bookings'
  },
  {
    question: '5. How does the airport transfer service work and what is the waiting-time policy?',
    answer: 'For airport arrivals (e.g. Frankfurt FRA, Luxembourg LUX, Accra ACC), the first 60 minutes after the flight’s actual landing time are completely free. After that, a charge of €20 per additional 30 minutes applies. For home or hotel pick-ups, the first 15 minutes are free. We create a WhatsApp group with your assigned driver so you can confirm boarding right after takeoff. Transfers can be cancelled free of charge within 24 hours of booking, or 14+ days before pickup.',
    category: 'Transfers'
  }
];

export const AIRPORT_TRANSFER_ROUTES = [
  { from: 'Saarbrücken / Saarland', to: 'Frankfurt Airport (FRA)', distanceKm: 175, estTime: '1h 50m', priceEur: 219 },
  { from: 'Saarbrücken / Saarland', to: 'Luxembourg Airport (LUX)', distanceKm: 105, estTime: '1h 15m', priceEur: 159 },
  { from: 'Saarbrücken / Saarland', to: 'Frankfurt-Hahn Airport (HHN)', distanceKm: 115, estTime: '1h 25m', priceEur: 169 },
  { from: 'Saarbrücken / Saarland', to: 'Stuttgart Airport (STR)', distanceKm: 210, estTime: '2h 15m', priceEur: 269 },
  { from: 'Saarbrücken / Saarland', to: 'Düsseldorf Airport (DUS)', distanceKm: 290, estTime: '3h 10m', priceEur: 349 },
  { from: 'Saarbrücken / Saarland', to: 'Brussels Airport (BRU)', distanceKm: 280, estTime: '3h 05m', priceEur: 339 },
  { from: 'Accra Kotoka Airport (ACC)', to: 'Central Accra / Osu / Airport City', distanceKm: 12, estTime: '30m', priceEur: 45, priceGhc: 650 },
  { from: 'Accra Kotoka Airport (ACC)', to: 'Tema / East Legon / Sakumono', distanceKm: 25, estTime: '50m', priceEur: 60, priceGhc: 850 }
];
