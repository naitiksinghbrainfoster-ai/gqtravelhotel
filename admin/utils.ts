import { Building2, CalendarDays, FileText, LayoutDashboard, MessageSquare } from 'lucide-react';
import { DESTINATIONS, FAQS, NEWS_ARTICLES, SERVICES, TEAM_MEMBERS, TESTIMONIALS } from '../src/data/travelData';

export type AdminSection = 'overview' | 'properties' | 'bookings' | 'enquiries' | 'content';

export type DataRow = Record<string, unknown>;

export type PropertyDraft = {
  name: string;
  slug: string;
  property_type: 'Hotel' | 'Apartment' | 'Villa' | 'Resort';
  short_description: string;
  description: string;
  country: string;
  city: string;
  address: string;
  postal_code: string;
  price_per_night: string;
  max_adults: string;
  max_children: string;
  featured_image: string;
  featured: boolean;
  status: 'draft' | 'published';
  amenities: string[];
};

export const navigation: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays },
  { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
  { id: 'content', label: 'Website content', icon: FileText },
];

export const contentFields = [
  { key: 'services_page_title', label: 'Services page title', group: 'Services page' },
  { key: 'services_page_description', label: 'Services page introduction', group: 'Services page' },
  { key: 'services_page_banner_image', label: 'Services page banner image', group: 'Services page' },
];

type WebsiteContentField = { key: string; label: string; type: 'text' | 'textarea' | 'image' };
type HomeContentSection = { id: string; label: string; fields: WebsiteContentField[] };

const textField = (key: string, label: string, type: WebsiteContentField['type'] = 'text'): WebsiteContentField => ({
  key,
  label,
  type,
});

const aboutReasonDefinitions = [
  { id: 'global-expertise', label: 'Global Travel Expertise', ctas: ['Explore Destinations', 'Book Your Trip', 'Get a Travel Offer'] },
  { id: 'reliable-support', label: 'Reliable Travel Support', ctas: ['Speak to Our Travel Team', 'Request a Travel Quote'] },
  { id: 'personalized-services', label: 'Personalized Travel Services', ctas: ['Get My Travel Offer', 'Plan My Trip', 'Book Online Now'] },
  { id: 'corporate-travel', label: 'Corporate Travel Management', ctas: ['Get Your Corporate Travel Quote Today'] },
];

const aboutTeamMembers = [
  { id: 'jim', label: 'Jim E. Baggiocy' },
  { id: 'remy', label: 'Remy Mantey' },
  { id: 'maxwell', label: 'Maxwell Antwi' },
  { id: 'helena', label: 'Helena O.' },
];

export const aboutContentSections: HomeContentSection[] = [
  {
    id: 'about-hero',
    label: 'About introduction',
    fields: [
      textField('about_hero_title', 'Headline'),
      textField('about_hero_description', 'Introduction', 'textarea'),
      textField('about_hero_description_secondary', 'Additional introduction', 'textarea'),
      textField('about_hero_tagline', 'Closing tagline'),
      textField('about_hero_cta_offer', 'Travel offer button'),
      textField('about_hero_cta_hotel', 'Hotel booking button'),
      textField('about_hero_cta_contact', 'Contact button'),
      textField('about_hero_phone_label', 'Phone card label'),
      textField('about_hero_phone_display', 'Phone number display'),
      textField('about_hero_experience_value', 'Experience metric'),
      textField('about_hero_experience_label', 'Experience label'),
      textField('about_hero_clients_badge', 'Client badge'),
      textField('about_hero_image', 'Hero image', 'image'),
      textField('about_hero_image_alt', 'Hero image description', 'textarea'),
    ],
  },
  {
    id: 'about-why-heading',
    label: 'Why choose us heading',
    fields: [textField('about_why_title', 'Section heading')],
  },
  ...aboutReasonDefinitions.map((reason) => ({
    id: `about-reason-${reason.id}`,
    label: reason.label,
    fields: [
      textField(`about_why_${reason.id}_title`, 'Reason title'),
      textField(`about_why_${reason.id}_subtitle`, 'Subtitle'),
      textField(`about_why_${reason.id}_description`, 'Description', 'textarea'),
      textField(`about_why_${reason.id}_tagline`, 'Tagline'),
      textField(`about_why_${reason.id}_question`, 'Callout question'),
      textField(`about_why_${reason.id}_note`, 'Additional note', 'textarea'),
      ...reason.ctas.map((_, index) =>
        textField(`about_why_${reason.id}_cta_${index + 1}`, `Button ${index + 1} label`),
      ),
    ],
  })),
  {
    id: 'about-team-introduction',
    label: 'Travel experts & booking',
    fields: [
      textField('about_team_title', 'Section heading'),
      textField('about_team_subtitle', 'Section subheading'),
      textField('about_team_description', 'Introduction', 'textarea'),
      textField('about_team_booking_description', 'Booking information', 'textarea'),
      textField('about_team_booking_heading', 'Booking callout heading'),
      textField('about_team_booking_cta', 'Booking button'),
      textField('about_team_booking_note', 'Booking note', 'textarea'),
    ],
  },
  ...aboutTeamMembers.map((member, index) => ({
    id: `about-team-${member.id}`,
    label: `${member.label} profile`,
    fields: [
      textField(`about_team_member_${index + 1}_name`, 'Name'),
      textField(`about_team_member_${index + 1}_role`, 'Role'),
      textField(`about_team_member_${index + 1}_image`, 'Profile photo', 'image'),
    ],
  })),
];

export const homeContentSections: HomeContentSection[] = [
  {
    id: 'hero',
    label: 'Hero banner & search',
    fields: [
      textField('home_hero_kicker', 'Small banner text'),
      textField('home_hero_badge', 'Top-right agency badge'),
      textField('home_hero_title', 'Headline'),
      textField('home_hero_subtitle', 'Subheading', 'textarea'),
      textField('home_hero_image', 'Banner image', 'image'),
    ],
  },
  {
    id: 'featured',
    label: 'Featured global escapes',
    fields: [
      textField('home_featured_label', 'Eyebrow'),
      textField('home_featured_title', 'Section heading'),
      textField('home_featured_description', 'Introduction', 'textarea'),
      textField('home_featured_meta', 'Small side note'),
      textField('home_featured_cta', 'Card action label'),
      ...['london-millennium', 'venice-rialto', 'thailand-cove', 'berlin-museum'].flatMap((id, index) => {
        const number = index + 1;
        return [
          textField(`home_featured_${id}_title`, `Card ${number} title`),
          textField(`home_featured_${id}_location`, `Card ${number} location`),
          textField(`home_featured_${id}_country`, `Card ${number} country`),
          textField(`home_featured_${id}_tagline`, `Card ${number} short description`, 'textarea'),
          textField(`home_featured_${id}_image`, `Card ${number} image`, 'image'),
        ];
      }),
    ],
  },
  {
    id: 'why-choose-us',
    label: 'Why choose us',
    fields: [
      textField('home_why_label', 'Eyebrow'),
      textField('home_why_title', 'Section heading'),
      textField('home_why_description', 'Introduction', 'textarea'),
      ...['Competitive Prices & Best Value', 'Secure Booking & R+V Protection', 'Seamless Experience & Support'].flatMap((_, index) => [
        textField(`home_why_card_${index + 1}_title`, `Benefit ${index + 1} title`),
        textField(`home_why_card_${index + 1}_description`, `Benefit ${index + 1} description`, 'textarea'),
      ]),
      ...['Years', 'Clients', 'Airport wait', 'Express e-Visa'].flatMap((_, index) => [
        textField(`home_why_metric_${index + 1}_value`, `Trust metric ${index + 1} value`),
        textField(`home_why_metric_${index + 1}_label`, `Trust metric ${index + 1} label`),
      ]),
    ],
  },
  {
    id: 'partners',
    label: 'Travel partners',
    fields: [
      textField('home_partners_title', 'Section heading'),
      ...['Schauinsland-Reisen', 'Bentour Reisen', 'GetYourGuide', 'Sixt Car Rental', 'Deutsche Bahn Rail & Fly', 'R+V Versicherung', 'Hubtel & Stripe 3D Secure'].flatMap((_, index) => [
        textField(`home_partner_${index + 1}_name`, `Partner ${index + 1} name`),
        textField(`home_partner_${index + 1}_category`, `Partner ${index + 1} category`),
      ]),
    ],
  },
  {
    id: 'stays',
    label: 'Featured stays',
    fields: [
      textField('home_properties_eyebrow', 'Eyebrow'),
      textField('home_properties_title', 'Section heading'),
      textField('home_properties_description', 'Introduction', 'textarea'),
      textField('home_properties_cta', 'Explore destinations button'),
    ],
  },
  {
    id: 'destinations',
    label: 'Explore destinations',
    fields: [
      textField('home_destinations_label', 'Eyebrow'),
      textField('home_destinations_title', 'Section heading'),
      textField('home_destinations_itinerary_cta', 'Itinerary button'),
      textField('home_destinations_booking_cta', 'Booking button'),
      ...DESTINATIONS.flatMap((destination) => [
        textField(`home_destination_${destination.id}_name`, `${destination.name} name`),
        textField(`home_destination_${destination.id}_description`, `${destination.name} description`, 'textarea'),
        textField(`home_destination_${destination.id}_image`, `${destination.name} image`, 'image'),
      ]),
    ],
  },
  {
    id: 'services',
    label: 'Travel services',
    fields: [
      textField('home_services_label', 'Eyebrow'),
      textField('home_services_title', 'Section heading'),
      textField('home_services_description', 'Introduction', 'textarea'),
      textField('home_services_banner_title', 'Special services banner heading'),
      textField('home_services_banner_description', 'Special services banner description', 'textarea'),
      ...SERVICES.flatMap((service) => [
        textField(`home_service_${service.id}_title`, `${service.title} title`),
        textField(`home_service_${service.id}_tagline`, `${service.title} tagline`),
        textField(`home_service_${service.id}_description`, `${service.title} description`, 'textarea'),
      ]),
    ],
  },
  {
    id: 'transfers',
    label: 'Airport transfer booking',
    fields: [
      textField('home_transfer_label', 'Eyebrow'),
      textField('home_transfer_title', 'Section heading'),
      textField('home_transfer_description', 'Introduction', 'textarea'),
    ],
  },
  {
    id: 'news',
    label: 'Travel news & guides',
    fields: [
      textField('home_news_label', 'Eyebrow'),
      textField('home_news_title', 'Section heading'),
      textField('home_news_description', 'Introduction', 'textarea'),
      ...NEWS_ARTICLES.flatMap((article, index) => [
        textField(`home_news_${index + 1}_title`, `Guide ${index + 1} title`),
        textField(`home_news_${index + 1}_excerpt`, `Guide ${index + 1} summary`, 'textarea'),
        textField(`home_news_${index + 1}_category`, `Guide ${index + 1} category`),
        textField(`home_news_${index + 1}_image`, `Guide ${index + 1} image`, 'image'),
      ]),
    ],
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    fields: [
      textField('home_testimonials_label', 'Eyebrow'),
      textField('home_testimonials_title', 'Section heading'),
      textField('home_testimonials_description', 'Introduction', 'textarea'),
      textField('home_testimonials_background', 'Background image', 'image'),
      ...TESTIMONIALS.flatMap((testimonial, index) => [
        textField(`home_testimonial_${index + 1}_name`, `Review ${index + 1} name`),
        textField(`home_testimonial_${index + 1}_role`, `Review ${index + 1} role`),
        textField(`home_testimonial_${index + 1}_location`, `Review ${index + 1} location`),
        textField(`home_testimonial_${index + 1}_comment`, `Review ${index + 1} comment`, 'textarea'),
        textField(`home_testimonial_${index + 1}_trip`, `Review ${index + 1} service`),
        textField(`home_testimonial_${index + 1}_avatar`, `Review ${index + 1} photo`, 'image'),
      ]),
    ],
  },
  {
    id: 'team',
    label: 'About & team',
    fields: [
      textField('home_team_label', 'Eyebrow'),
      textField('home_team_title', 'Section heading'),
      textField('home_team_description', 'Introduction', 'textarea'),
      textField('home_team_description_secondary', 'Additional introduction', 'textarea'),
      textField('home_team_members_title', 'Team heading'),
      textField('home_team_members_description', 'Team introduction', 'textarea'),
      ...TEAM_MEMBERS.flatMap((member, index) => [
        textField(`home_team_${index + 1}_name`, `${member.name} name`),
        textField(`home_team_${index + 1}_role`, `${member.name} role`),
        textField(`home_team_${index + 1}_bio`, `${member.name} biography`, 'textarea'),
        textField(`home_team_${index + 1}_image`, `${member.name} photo`, 'image'),
      ]),
    ],
  },
  {
    id: 'faq',
    label: 'Frequently asked questions',
    fields: [
      textField('home_faq_label', 'Eyebrow'),
      textField('home_faq_title', 'Section heading'),
      textField('home_faq_description', 'Introduction', 'textarea'),
      textField('home_faq_cta_title', 'Contact prompt heading'),
      textField('home_faq_cta_description', 'Contact prompt description', 'textarea'),
      ...FAQS.flatMap((_, index) => [
        textField(`home_faq_${index + 1}_question`, `Question ${index + 1}`, 'textarea'),
        textField(`home_faq_${index + 1}_answer`, `Answer ${index + 1}`, 'textarea'),
      ]),
    ],
  },
  {
    id: 'newsletter',
    label: 'Newsletter & Trustpilot',
    fields: [
      textField('home_newsletter_image', 'Newsletter image', 'image'),
      textField('home_newsletter_label', 'Newsletter eyebrow'),
      textField('home_newsletter_title', 'Newsletter heading'),
      textField('home_newsletter_description', 'Newsletter introduction', 'textarea'),
      textField('home_trustpilot_title', 'Trustpilot heading'),
      textField('home_trustpilot_description', 'Trustpilot description', 'textarea'),
      textField('home_trustpilot_cta', 'Trustpilot button'),
    ],
  },
  {
    id: 'car-rental',
    label: 'Car rental promotion',
    fields: [
      textField('home_car_rental_label', 'Eyebrow'),
      textField('home_car_rental_title', 'Section heading'),
      textField('home_car_rental_description', 'Introduction', 'textarea'),
      textField('home_car_rental_cta', 'Button label'),
    ],
  },
];

export const contactContentSections: HomeContentSection[] = [
  {
    id: 'contact-hero',
    label: 'Contact banner & details',
    fields: [
      textField('contact_hero_title', 'Headline'),
      textField('contact_hero_subtitle', 'Subheading'),
      textField('contact_hero_description', 'Introduction', 'textarea'),
      textField('contact_phone_label', 'Phone card label'),
      textField('contact_phone_display', 'Phone number display'),
      textField('contact_phone_href', 'Telephone link (tel:)'),
      textField('contact_whatsapp_label', 'WhatsApp card label'),
      textField('contact_whatsapp_display', 'WhatsApp number display'),
      textField('contact_whatsapp_number', 'WhatsApp number (digits only)'),
      textField('contact_email_label', 'Email card label'),
      textField('contact_email', 'Email address'),
    ],
  },
  {
    id: 'contact-faq-intro',
    label: 'Frequently asked questions heading',
    fields: [
      textField('contact_faq_title', 'Section heading'),
      textField('contact_faq_description', 'Introduction', 'textarea'),
    ],
  },
  ...[1, 2, 3].map((number) => ({
    id: `contact-faq-${number}`,
    label: `FAQ ${number}`,
    fields: [
      textField(`contact_faq_${number}_question`, 'Question', 'textarea'),
      textField(`contact_faq_${number}_answer`, 'Answer', 'textarea'),
      textField(`contact_faq_${number}_prompt`, 'Callout prompt'),
      textField(`contact_faq_${number}_cta`, 'WhatsApp button label'),
      textField(`contact_faq_${number}_message`, 'WhatsApp message', 'textarea'),
      textField(`contact_faq_${number}_note`, 'Additional note', 'textarea'),
    ],
  })),
  {
    id: 'contact-consultation',
    label: 'Consultation & direct contacts',
    fields: [
      textField('contact_talk_title', 'Section heading'),
      textField('contact_talk_subtitle', 'Subheading'),
      textField('contact_talk_description', 'Introduction', 'textarea'),
      textField('contact_maps_label', 'Google Maps button label'),
      textField('contact_maps_url', 'Google Maps URL'),
      textField('contact_general_email_label', 'Contact 1 label'),
      textField('contact_general_email', 'Contact 1 email'),
      textField('contact_airport_email_label', 'Contact 2 label'),
      textField('contact_airport_email', 'Contact 2 email'),
      textField('contact_hotel_email_label', 'Contact 3 label'),
      textField('contact_hotel_email', 'Contact 3 email'),
    ],
  },
  {
    id: 'contact-form',
    label: 'Contact form',
    fields: [
      textField('contact_form_title', 'Form heading'),
      textField('contact_form_required_note', 'Required fields note'),
      textField('contact_name_label', 'Name label'),
      textField('contact_name_placeholder', 'Name placeholder'),
      textField('contact_email_field_label', 'Email label'),
      textField('contact_email_placeholder', 'Email placeholder'),
      textField('contact_phone_field_label', 'Phone label'),
      textField('contact_phone_placeholder', 'Phone placeholder'),
      textField('contact_service_label', 'Service label'),
      textField('contact_service_placeholder', 'Service dropdown placeholder'),
      textField('contact_service_flights', 'Flight option'),
      textField('contact_service_hotels', 'Hotels option'),
      textField('contact_service_holidays', 'Holiday packages option'),
      textField('contact_service_transfers', 'Airport transfers option'),
      textField('contact_service_visa', 'Visa assistance option'),
      textField('contact_service_medical', 'Medical tourism option'),
      textField('contact_service_corporate', 'Corporate travel option'),
      textField('contact_service_other', 'Other option'),
      textField('contact_message_label', 'Message label'),
      textField('contact_message_placeholder', 'Message placeholder'),
      textField('contact_submit_button', 'Submit button label'),
      textField('contact_saving_button', 'Submitting button label'),
      textField('contact_submit_note', 'Form note', 'textarea'),
      textField('contact_submit_error', 'Submission error message', 'textarea'),
    ],
  },
];

export const hotelApartmentsContentSections: HomeContentSection[] = [
  {
    id: 'hotel-apartments-hero',
    label: 'Hotels & apartments banner',
    fields: [
      textField('hotel_apartments_hero_title', 'Headline'),
      textField('hotel_apartments_hero_image', 'Banner image', 'image'),
      textField('hotel_apartments_hero_image_alt', 'Banner image description', 'textarea'),
    ],
  },
  {
    id: 'hotel-apartments-stays',
    label: 'Stays listing & filters',
    fields: [
      textField('hotel_apartments_stays_label', 'Eyebrow'),
      textField('hotel_apartments_stays_title', 'Section heading'),
      textField('hotel_apartments_stays_description', 'Introduction', 'textarea'),
      textField('hotel_apartments_filter_all', 'All stays filter'),
      textField('hotel_apartments_filter_apartments', 'Apartments filter'),
      textField('hotel_apartments_filter_villas', 'Villas filter'),
      textField('hotel_apartments_filter_resorts', 'Resorts filter'),
      textField('hotel_apartments_card_price_label', 'Price label'),
      textField('hotel_apartments_card_night_label', 'Per-night label'),
      textField('hotel_apartments_card_book_label', 'Property button'),
      textField('hotel_apartments_loading', 'Loading message'),
      textField('hotel_apartments_empty_stays', 'No stays message', 'textarea'),
      textField('hotel_apartments_empty_filter', 'No matching filter message', 'textarea'),
    ],
  },
  {
    id: 'hotel-apartments-benefits-intro',
    label: 'Accommodation benefits introduction',
    fields: [
      textField('hotel_apartments_benefits_label', 'Eyebrow'),
      textField('hotel_apartments_benefits_title', 'Section heading'),
      textField('hotel_apartments_benefits_description', 'Introduction', 'textarea'),
      textField('hotel_apartments_benefits_cta', 'Email link label'),
    ],
  },
  ...[1, 2, 3, 4].map((number) => ({
    id: `hotel-apartments-benefit-${number}`,
    label: `Accommodation benefit ${number}`,
    fields: [
      textField(`hotel_apartments_benefit_${number}_title`, 'Benefit title'),
      textField(`hotel_apartments_benefit_${number}_description`, 'Benefit description', 'textarea'),
    ],
  })),
  {
    id: 'hotel-apartments-booking-cta',
    label: 'Booking call to action',
    fields: [
      textField('hotel_apartments_cta_label', 'Eyebrow'),
      textField('hotel_apartments_cta_title', 'Heading'),
      textField('hotel_apartments_cta_description', 'Description', 'textarea'),
      textField('hotel_apartments_cta_book', 'Booking button'),
      textField('hotel_apartments_cta_whatsapp', 'WhatsApp button'),
      textField('hotel_apartments_whatsapp_number', 'WhatsApp number (digits only)'),
    ],
  },
];

export const airportTransfersContentSections: HomeContentSection[] = [
  {
    id: 'airport-transfers-hero',
    label: 'Airport transfer banner',
    fields: [
      textField('airport_transfers_hero_badge', 'Badge'),
      textField('airport_transfers_hero_title', 'Headline'),
      textField('airport_transfers_hero_description', 'Introduction', 'textarea'),
      textField('airport_transfers_hero_secondary', 'Additional information', 'textarea'),
      textField('airport_transfers_hero_button', 'Request button'),
      textField('airport_transfers_hero_notice', 'Availability notice', 'textarea'),
      textField('airport_transfers_hero_image', 'Banner image', 'image'),
      textField('airport_transfers_hero_image_alt', 'Banner image description', 'textarea'),
    ],
  },
  {
    id: 'airport-transfers-request-info',
    label: 'Transfer request information',
    fields: [
      textField('airport_transfers_request_eyebrow', 'Eyebrow'),
      textField('airport_transfers_request_title', 'Section heading'),
      textField('airport_transfers_request_description', 'Introduction', 'textarea'),
      ...[1, 2, 3, 4, 5, 6].map((number) =>
        textField(`airport_transfers_service_${number}`, `Service point ${number}`, 'textarea'),
      ),
      textField('airport_transfers_contact_email', 'Transfer contact email'),
    ],
  },
  {
    id: 'airport-transfers-request-form',
    label: 'Transfer request form',
    fields: [
      textField('airport_transfers_form_title', 'Form heading'),
      textField('airport_transfers_form_description', 'Form introduction', 'textarea'),
      textField('airport_transfers_pickup_label', 'Pickup location label'),
      textField('airport_transfers_pickup_placeholder', 'Pickup location placeholder'),
      textField('airport_transfers_destination_label', 'Destination label'),
      textField('airport_transfers_destination_placeholder', 'Destination placeholder'),
      textField('airport_transfers_date_label', 'Travel date label'),
      textField('airport_transfers_passengers_label', 'Passengers label'),
      textField('airport_transfers_name_label', 'Name label'),
      textField('airport_transfers_email_label', 'Email label'),
      textField('airport_transfers_phone_label', 'Phone label'),
      textField('airport_transfers_optional_label', 'Optional marker'),
      textField('airport_transfers_submit_button', 'Submit button'),
      textField('airport_transfers_submit_note', 'Form note', 'textarea'),
    ],
  },
  {
    id: 'airport-transfers-request-email',
    label: 'Transfer email request',
    fields: [
      textField('airport_transfers_email_subject', 'Email subject'),
      textField('airport_transfers_email_heading', 'Email heading'),
      textField('airport_transfers_email_pickup', 'Pickup field label'),
      textField('airport_transfers_email_destination', 'Destination field label'),
      textField('airport_transfers_email_date', 'Travel date field label'),
      textField('airport_transfers_email_passengers', 'Passengers field label'),
      textField('airport_transfers_email_name', 'Name field label'),
      textField('airport_transfers_email_email', 'Email field label'),
      textField('airport_transfers_email_phone', 'Phone field label'),
      textField('airport_transfers_email_phone_empty', 'Empty phone value'),
    ],
  },
];

export const globalAutoRentContentSections: HomeContentSection[] = [
  {
    id: 'global-auto-rent-hero',
    label: 'Global auto rent banner',
    fields: [
      textField('global_auto_rent_hero_label', 'Eyebrow'),
      textField('global_auto_rent_hero_title', 'Headline'),
      textField('global_auto_rent_hero_description', 'Introduction', 'textarea'),
      textField('global_auto_rent_hero_button', 'Booking button'),
      textField('global_auto_rent_portal_url', 'Booking portal URL'),
    ],
  },
  {
    id: 'global-auto-rent-steps-heading',
    label: 'Booking instructions heading',
    fields: [
      textField('global_auto_rent_steps_label', 'Eyebrow'),
      textField('global_auto_rent_steps_title', 'Section heading'),
      textField('global_auto_rent_steps_description', 'Introduction', 'textarea'),
    ],
  },
  ...[1, 2, 3].map((number) => ({
    id: `global-auto-rent-step-${number}`,
    label: `Booking step ${number}`,
    fields: [
      textField(`global_auto_rent_step_${number}_title`, 'Step title'),
      textField(`global_auto_rent_step_${number}_description`, 'Step description', 'textarea'),
    ],
  })),
  {
    id: 'global-auto-rent-cta',
    label: 'Booking call to action',
    fields: [
      textField('global_auto_rent_cta_label', 'Eyebrow'),
      textField('global_auto_rent_cta_title', 'Heading'),
      textField('global_auto_rent_cta_description', 'Description', 'textarea'),
      textField('global_auto_rent_cta_button', 'Button label'),
    ],
  },
];

export const sixtCarRentContentSections: HomeContentSection[] = [
  {
    id: 'sixt-car-rent-heading',
    label: 'Sixt car rent heading',
    fields: [
      textField('sixt_car_rent_heading_label', 'Eyebrow'),
      textField('sixt_car_rent_heading_title', 'Headline'),
      textField('sixt_car_rent_heading_description', 'Introduction', 'textarea'),
      textField('sixt_car_rent_heading_button', 'Booking button'),
    ],
  },
  {
    id: 'sixt-car-rent-portal',
    label: 'Sixt booking information',
    fields: [
      textField('sixt_car_rent_portal_title', 'Section heading'),
      textField('sixt_car_rent_portal_description', 'Description', 'textarea'),
      textField('sixt_car_rent_portal_button', 'Booking button'),
      textField('sixt_car_rent_portal_note', 'Partner reference note', 'textarea'),
      textField('sixt_car_rent_portal_url', 'Sixt booking URL'),
    ],
  },
];

export const carRentalContentSections: HomeContentSection[] = [
  {
    id: 'car-rental-hero',
    label: 'Car rental banner',
    fields: [
      textField('car_rental_hero_label', 'Eyebrow'),
      textField('car_rental_hero_title', 'Headline'),
      textField('car_rental_hero_description', 'Introduction', 'textarea'),
      textField('car_rental_hero_secondary', 'Additional details', 'textarea'),
      textField('car_rental_hero_button', 'Booking button'),
      textField('car_rental_hero_note', 'Booking note', 'textarea'),
      textField('car_rental_hero_image', 'Banner image', 'image'),
      textField('car_rental_hero_image_alt', 'Banner image description', 'textarea'),
      textField('car_rental_portal_url', 'SIXT booking URL'),
    ],
  },
  {
    id: 'car-rental-benefits-heading',
    label: 'Car rental benefits heading',
    fields: [
      textField('car_rental_benefits_label', 'Eyebrow'),
      textField('car_rental_benefits_title', 'Section heading'),
    ],
  },
  ...[1, 2, 3, 4, 5].map((number) => ({
    id: `car-rental-benefit-${number}`,
    label: `Car rental benefit ${number}`,
    fields: [
      textField(`car_rental_benefit_${number}_title`, 'Benefit title'),
      textField(`car_rental_benefit_${number}_description`, 'Benefit description', 'textarea'),
    ],
  })),
  {
    id: 'car-rental-cta',
    label: 'Car rental call to action',
    fields: [
      textField('car_rental_cta_description', 'Description', 'textarea'),
      textField('car_rental_cta_button', 'Booking button'),
    ],
  },
];

export const privateJetContentSections: HomeContentSection[] = [
  {
    id: 'private-jet-hero',
    label: 'Private jet charter banner',
    fields: [
      textField('private_jet_hero_badge', 'Badge'),
      textField('private_jet_hero_title', 'Headline'),
      textField('private_jet_hero_tagline', 'Tagline'),
      textField('private_jet_hero_description', 'Introduction', 'textarea'),
      textField('private_jet_hero_secondary', 'Additional details', 'textarea'),
      textField('private_jet_hero_whatsapp', 'WhatsApp button'),
      textField('private_jet_hero_email', 'Email button'),
      textField('private_jet_hero_notice', 'Assistance note'),
      textField('private_jet_hero_image', 'Banner image', 'image'),
      textField('private_jet_hero_image_alt', 'Banner image description', 'textarea'),
      textField('private_jet_image_label', 'Image badge'),
      textField('private_jet_image_caption', 'Image caption'),
    ],
  },
  {
    id: 'private-jet-details',
    label: 'Charter information',
    fields: [
      textField('private_jet_details_label', 'Eyebrow'),
      textField('private_jet_details_title', 'Section heading'),
      textField('private_jet_details_description', 'Introduction', 'textarea'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`private_jet_feature_${number}_title`, `Feature ${number} title`),
        textField(`private_jet_feature_${number}_description`, `Feature ${number} description`, 'textarea'),
      ]),
    ],
  },
  {
    id: 'private-jet-cta',
    label: 'Charter quote call to action',
    fields: [
      textField('private_jet_cta_title', 'Heading'),
      textField('private_jet_cta_description', 'Description', 'textarea'),
      textField('private_jet_whatsapp_number', 'WhatsApp number (digits only)'),
      textField('private_jet_whatsapp_message', 'WhatsApp message', 'textarea'),
      textField('private_jet_email', 'Email recipient'),
      textField('private_jet_email_subject', 'Email subject'),
      textField('private_jet_email_body', 'Email body', 'textarea'),
    ],
  },
];

export const globalToursContentSections: HomeContentSection[] = [
  {
    id: 'global-tours-hero',
    label: 'Global tours banner',
    fields: [
      textField('global_tours_hero_badge', 'Badge'),
      textField('global_tours_hero_title', 'Headline'),
      textField('global_tours_hero_description', 'Introduction', 'textarea'),
      textField('global_tours_hero_cta_primary', 'Primary button'),
      textField('global_tours_hero_cta_secondary', 'Secondary button'),
      textField('global_tours_hero_image', 'Banner image', 'image'),
      textField('global_tours_hero_image_alt', 'Banner image description', 'textarea'),
      textField('global_tours_hero_image_label', 'Image badge'),
      textField('global_tours_hero_image_caption', 'Image caption'),
      ...[1, 2, 3, 4, 5, 6].map((number) =>
        textField(`global_tours_service_${number}`, `Service tag ${number}`),
      ),
    ],
  },
  {
    id: 'global-tours-destinations',
    label: 'Global tour destinations',
    fields: [
      textField('global_tours_destinations_title', 'Popular destinations heading'),
      ...Array.from({ length: 13 }, (_, index) =>
        textField(`global_tours_popular_${index + 1}_name`, `Popular destination ${index + 1}`),
      ),
      textField('global_tours_destinations_prompt', 'Destination prompt'),
      textField('global_tours_zanzibar_title', 'Zanzibar callout heading'),
      textField('global_tours_zanzibar_description', 'Zanzibar callout description', 'textarea'),
      textField('global_tours_discover_title', 'Destination cards heading'),
      ...Array.from({ length: 7 }, (_, index) => {
        const number = index + 1;
        return [
          textField(`global_tours_destination_${number}_name`, `Destination ${number} name`),
          textField(`global_tours_destination_${number}_category`, `Destination ${number} region`),
          textField(`global_tours_destination_${number}_image`, `Destination ${number} image`, 'image'),
          textField(`global_tours_destination_${number}_image_alt`, `Destination ${number} image description`, 'textarea'),
        ];
      }).flat(),
      textField('global_tours_destinations_cta_title', 'Callout heading'),
      textField('global_tours_destinations_cta_description', 'Callout description', 'textarea'),
      textField('global_tours_destinations_cta_button', 'Callout button'),
    ],
  },
  {
    id: 'global-tours-experiences',
    label: 'Tour experiences',
    fields: [
      textField('global_tours_experiences_label', 'Eyebrow'),
      textField('global_tours_experiences_title', 'Section heading'),
      textField('global_tours_experiences_description', 'Introduction', 'textarea'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`global_tours_experience_${number}_title`, `Experience ${number} title`),
        textField(`global_tours_experience_${number}_description`, `Experience ${number} description`, 'textarea'),
      ]),
      textField('global_tours_experience_card_cta', 'Experience card link'),
      textField('global_tours_experience_cta', 'Section link'),
    ],
  },
  {
    id: 'global-tours-planning',
    label: 'Trip planning & FAQs',
    fields: [
      textField('global_tours_planning_label', 'Planning eyebrow'),
      textField('global_tours_planning_title', 'Planning heading'),
      textField('global_tours_planning_description', 'Planning introduction', 'textarea'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`global_tours_planning_step_${number}_title`, `Planning step ${number} title`),
        textField(`global_tours_planning_step_${number}_description`, `Planning step ${number} description`, 'textarea'),
      ]),
      textField('global_tours_planning_cta', 'Planning button'),
      textField('global_tours_faq_label', 'FAQ eyebrow'),
      textField('global_tours_faq_title', 'FAQ heading'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`global_tours_faq_${number}_question`, `FAQ ${number} question`, 'textarea'),
        textField(`global_tours_faq_${number}_answer`, `FAQ ${number} answer`, 'textarea'),
      ]),
      textField('global_tours_whatsapp_number', 'WhatsApp number (digits only)'),
      textField('global_tours_whatsapp_message', 'WhatsApp message', 'textarea'),
    ],
  },
];

const holidayContentSections = (prefix: 'holidays' | 'vacation'): HomeContentSection[] => [
  {
    id: `${prefix}-hero`,
    label: 'Holiday page banner',
    fields: [
      textField(`${prefix}_hero_badge`, 'Badge'),
      textField(`${prefix}_hero_title`, 'Headline'),
      textField(`${prefix}_hero_description`, 'Introduction', 'textarea'),
      textField(`${prefix}_hero_button`, 'Button label'),
    ],
  },
  {
    id: `${prefix}-partners-heading`,
    label: 'Booking partners introduction',
    fields: [
      textField(`${prefix}_partners_label`, 'Eyebrow'),
      textField(`${prefix}_partners_title`, 'Section heading'),
      textField(`${prefix}_partners_description`, 'Introduction', 'textarea'),
    ],
  },
  ...[1, 2, 3].map((number) => ({
    id: `${prefix}-partner-${number}`,
    label: `Booking partner ${number}`,
    fields: [
      textField(`${prefix}_partner_${number}_name`, 'Partner name'),
      textField(`${prefix}_partner_${number}_description`, 'Partner description', 'textarea'),
      textField(`${prefix}_partner_${number}_url`, 'Partner website URL'),
      textField(`${prefix}_partner_${number}_image`, 'Partner image', 'image'),
      textField(`${prefix}_partner_${number}_image_alt`, 'Partner image description', 'textarea'),
    ],
  })),
  {
    id: `${prefix}-partners-support`,
    label: 'Partner links & booking support',
    fields: [
      textField(`${prefix}_partner_explore_label`, 'Partner image label'),
      textField(`${prefix}_partner_button`, 'Partner button'),
      textField(`${prefix}_support_title`, 'Support heading'),
      textField(`${prefix}_support_description`, 'Support description'),
      textField(`${prefix}_help_title`, 'Booking help heading'),
      textField(`${prefix}_help_description`, 'Booking help introduction', 'textarea'),
      textField(`${prefix}_whatsapp_label`, 'WhatsApp label'),
      textField(`${prefix}_whatsapp_display`, 'WhatsApp number display'),
      textField(`${prefix}_whatsapp_number`, 'WhatsApp number (digits only)'),
      textField(`${prefix}_email_label`, 'Email label'),
      textField(`${prefix}_email`, 'Support email'),
    ],
  },
];

export const holidaysContentSections = holidayContentSections('holidays');
export const vacationContentSections = holidayContentSections('vacation');

export const globalFlightContentSections: HomeContentSection[] = [
  {
    id: 'global-flight-hero',
    label: 'Flights banner',
    fields: [
      textField('global_flight_hero_label', 'Eyebrow'),
      textField('global_flight_hero_title', 'Headline'),
      textField('global_flight_hero_description', 'Introduction', 'textarea'),
      textField('global_flight_hero_button', 'Booking button'),
    ],
  },
  {
    id: 'global-flight-features',
    label: 'Flight planning & features',
    fields: [
      textField('global_flight_steps_label', 'Eyebrow'),
      textField('global_flight_steps_title', 'Section heading'),
      textField('global_flight_steps_description', 'Introduction', 'textarea'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`global_flight_feature_${number}_title`, `Feature ${number} title`),
        textField(`global_flight_feature_${number}_description`, `Feature ${number} description`, 'textarea'),
      ]),
    ],
  },
  {
    id: 'global-flight-booking-steps',
    label: 'Booking steps',
    fields: [
      textField('global_flight_planning_label', 'Eyebrow'),
      textField('global_flight_planning_title', 'Section heading'),
      textField('global_flight_planning_description', 'Introduction', 'textarea'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`global_flight_step_${number}_title`, `Step ${number} title`),
        textField(`global_flight_step_${number}_description`, `Step ${number} description`, 'textarea'),
      ]),
    ],
  },
  {
    id: 'global-flight-portal',
    label: 'Flight booking portal',
    fields: [
      textField('global_flight_portal_label', 'Eyebrow'),
      textField('global_flight_portal_title', 'Heading'),
      textField('global_flight_portal_description', 'Description', 'textarea'),
      textField('global_flight_portal_button', 'Button label'),
      textField('global_flight_portal_url', 'Flight partner URL'),
    ],
  },
];

export const cruiseContentSections: HomeContentSection[] = [
  {
    id: 'cruise-hero',
    label: 'Cruise banner',
    fields: [
      textField('cruise_hero_label', 'Eyebrow'),
      textField('cruise_hero_title', 'Headline'),
      textField('cruise_hero_description', 'Introduction', 'textarea'),
      textField('cruise_hero_button', 'Booking button'),
    ],
  },
  {
    id: 'cruise-features',
    label: 'Cruise experiences',
    fields: [
      textField('cruise_feature_label', 'Eyebrow'),
      textField('cruise_feature_title', 'Section heading'),
      textField('cruise_feature_description', 'Introduction', 'textarea'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`cruise_feature_${number}_title`, `Feature ${number} title`),
        textField(`cruise_feature_${number}_description`, `Feature ${number} description`, 'textarea'),
      ]),
    ],
  },
  {
    id: 'cruise-planning',
    label: 'Cruise planning steps',
    fields: [
      textField('cruise_planning_label', 'Eyebrow'),
      textField('cruise_planning_title', 'Section heading'),
      textField('cruise_planning_description', 'Introduction', 'textarea'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`cruise_step_${number}_title`, `Step ${number} title`),
        textField(`cruise_step_${number}_description`, `Step ${number} description`, 'textarea'),
      ]),
    ],
  },
  {
    id: 'cruise-portal',
    label: 'Cruise booking portal',
    fields: [
      textField('cruise_portal_label', 'Eyebrow'),
      textField('cruise_portal_title', 'Heading'),
      textField('cruise_portal_description', 'Description', 'textarea'),
      textField('cruise_portal_button', 'Button label'),
      textField('cruise_portal_url', 'Cruise partner URL'),
    ],
  },
];

export const railwayContentSections: HomeContentSection[] = [
  {
    id: 'railway-hero',
    label: 'Railway tickets banner',
    fields: [
      textField('railway_hero_label', 'Eyebrow'),
      textField('railway_hero_title', 'Headline'),
      textField('railway_hero_description', 'Introduction', 'textarea'),
    ],
  },
  {
    id: 'railway-request',
    label: 'Railway ticket request',
    fields: [
      textField('railway_request_label', 'Eyebrow'),
      textField('railway_request_title', 'Section heading'),
      textField('railway_request_description', 'Introduction', 'textarea'),
      ...[1, 2, 3].flatMap((number) => [
        textField(`railway_detail_${number}_title`, `Request detail ${number} title`),
        textField(`railway_detail_${number}_description`, `Request detail ${number} description`, 'textarea'),
      ]),
      textField('railway_cta_title', 'Request callout heading'),
      textField('railway_cta_description', 'Request callout description', 'textarea'),
      textField('railway_cta_button', 'Email button'),
      textField('railway_email', 'Request email address'),
      textField('railway_email_subject', 'Email subject'),
      textField('railway_email_body', 'Email request template', 'textarea'),
    ],
  },
];

export const blogContentSections: HomeContentSection[] = [
  {
    id: 'blog-hero',
    label: 'Blog banner',
    fields: [
      textField('blog_hero_label', 'Eyebrow'),
      textField('blog_hero_title', 'Headline'),
      textField('blog_hero_description', 'Introduction', 'textarea'),
    ],
  },
  {
    id: 'blog-articles',
    label: 'Travel guides & articles',
    fields: [
      textField('blog_news_label', 'Eyebrow'),
      textField('blog_news_title', 'Section heading'),
      textField('blog_news_description', 'Introduction', 'textarea'),
      textField('blog_news_curated_label', 'Curator note'),
      textField('blog_news_empty', 'Empty article list message'),
      textField('blog_article_read_button', 'Read article button'),
      textField('blog_article_contact_prompt', 'Article contact prompt'),
      textField('blog_article_contact_email', 'Article contact email'),
      textField('blog_article_close_button', 'Close article button'),
    ],
  },
  {
    id: 'blog-contact',
    label: 'Blog enquiry contact',
    fields: [
      textField('blog_whatsapp_number', 'WhatsApp number (digits only)'),
      textField('blog_whatsapp_message', 'WhatsApp message', 'textarea'),
    ],
  },
];

export const legalPageContentSections: HomeContentSection[] = [
  {
    id: 'legal-page-content',
    label: 'Legal page content',
    fields: [
      textField('terms_page_title', 'Page heading'),
      textField('terms_page_subtitle', 'Page subtitle'),
      textField('terms_page_body', 'Full legal page text (replaces the built-in text)', 'textarea'),
    ],
  },
];

export const imprintPageContentSections: HomeContentSection[] = [
  {
    id: 'legal-page-content',
    label: 'Legal page content',
    fields: [
      textField('imprint_page_title', 'Page heading'),
      textField('imprint_page_subtitle', 'Page subtitle'),
      textField('imprint_page_body', 'Full legal page text (replaces the built-in text)', 'textarea'),
    ],
  },
];

export const privacyPageContentSections: HomeContentSection[] = [
  {
    id: 'legal-page-content',
    label: 'Legal page content',
    fields: [
      textField('privacy_policy_page_title', 'Page heading'),
      textField('privacy_policy_page_subtitle', 'Page subtitle'),
      textField('privacy_policy_page_body', 'Full legal page text (replaces the built-in text)', 'textarea'),
    ],
  },
];

export const airportTransferTermsContentSections: HomeContentSection[] = [
  {
    id: 'legal-page-content',
    label: 'Airport Transfer Terms content',
    fields: [
      textField('airport_transfer_terms_page_title', 'Page heading'),
      textField('airport_transfer_terms_page_subtitle', 'Page subtitle'),
      textField('airport_transfer_terms_page_body', 'Full legal page text', 'textarea'),
    ],
  },
];

export const accraTransferTermsContentSections: HomeContentSection[] = [
  {
    id: 'legal-page-content',
    label: 'Accra Transfers Terms content',
    fields: [
      textField('accra_transfer_terms_page_title', 'Page heading'),
      textField('accra_transfer_terms_page_subtitle', 'Page subtitle'),
      textField('accra_transfer_terms_page_body', 'Full legal page text', 'textarea'),
    ],
  },
];

export const websiteContentPages = [
  { id: 'home', label: 'Home page', route: '/', seoPrefix: 'home' },
  { id: 'services', label: 'Services', route: '/services', seoPrefix: 'services' },
  { id: 'about', label: 'About', route: '/about', seoPrefix: 'about' },
  { id: 'contact', label: 'Contact', route: '/contact', seoPrefix: 'contact' },
  { id: 'hotel-apartments', label: 'Hotels & apartments', route: '/hotel-apartments', seoPrefix: 'hotel_apartments' },
  { id: 'airport-transfers-saarland', label: 'Airport transfers', route: '/airport-transfers-saarland', seoPrefix: 'airport_transfers' },
  { id: 'global-auto-rent', label: 'Global auto rent', route: '/global-auto-rent', seoPrefix: 'global_auto_rent' },
  { id: 'sixt-car-rent', label: 'Sixt car rent', route: '/sixt-car-rent', seoPrefix: 'sixt_car_rent' },
  { id: 'car-rental', label: 'Car rental', route: '/car-rental-worldwide-save-20-with-gq-travel-hotels', seoPrefix: 'car_rental' },
  { id: 'private-jet-rentals', label: 'Private jet', route: '/private-jet-rentals', seoPrefix: 'private_jet_rentals' },
  { id: 'global-tours', label: 'Global tours', route: '/global-tours', seoPrefix: 'global_tours' },
  { id: 'holidays', label: 'Holidays', route: '/holidays', seoPrefix: 'holidays' },
  { id: 'vacation', label: 'Vacation', route: '/vacation', seoPrefix: 'vacation' },
  { id: 'global-flight', label: 'Global Flight', route: '/global-flight', seoPrefix: 'global_flight' },
  { id: 'cruise', label: 'Cruise', route: '/cruise', seoPrefix: 'cruise' },
  { id: 'railway-tickets', label: 'Railway tickets', route: '/railway-tickets', seoPrefix: 'railway_tickets' },
  { id: 'blog', label: 'Blog', route: '/blog', seoPrefix: 'blog' },
  { id: 'terms', label: 'Terms & conditions', route: '/general-terms-conditions', seoPrefix: 'terms' },
  { id: 'imprint', label: 'Imprint', route: '/imprint', seoPrefix: 'imprint' },
  { id: 'privacy-policy', label: 'Privacy policy', route: '/privacy-policy', seoPrefix: 'privacy_policy' },
  { id: 'airport-transfer-terms', label: 'Airport Transfer Terms', route: '/airport-transfer-terms', seoPrefix: 'airport_transfer_terms' },
  { id: 'accra-transfer-terms', label: 'Accra Transfers Terms', route: '/accra-transfer-terms', seoPrefix: 'accra_transfer_terms' },
] as const;

export const managedServices = [
  { id: 'hotel-flight-holiday', label: 'Hotels, flights & holidays' },
  { id: 'flight-booking', label: 'Flight booking' },
  { id: 'guided-tours', label: 'Guided tours' },
  { id: 'airport-transfer', label: 'Airport transfers' },
  { id: 'private-jet', label: 'Private jet' },
  { id: 'ghana-evisa', label: 'Ghana e-Visa' },
  { id: 'medical-treatment', label: 'Medical treatment' },
];

export const serviceContentFields = managedServices.flatMap((service) => [
  { key: `service_${service.id}_title`, label: `${service.label} title`, group: 'Service sections' },
  { key: `service_${service.id}_subtitle`, label: `${service.label} subtitle`, group: 'Service sections' },
  { key: `service_${service.id}_description`, label: `${service.label} introduction`, group: 'Service sections' },
  { key: `service_${service.id}_image`, label: `${service.label} image`, group: 'Service sections' },
]);

export const seoContentFields = (seoPrefix: string) => [
  { key: `${seoPrefix}_seo_title`, label: 'SEO title', type: 'text' as const },
  { key: `${seoPrefix}_seo_description`, label: 'SEO description', type: 'textarea' as const },
  { key: `${seoPrefix}_seo_keywords`, label: 'SEO keywords', type: 'textarea' as const },
];

export const emptyDraft: PropertyDraft = {
  name: '',
  slug: '',
  property_type: 'Hotel',
  short_description: '',
  description: '',
  country: '',
  city: '',
  address: '',
  postal_code: '',
  price_per_night: '',
  max_adults: '2',
  max_children: '0',
  featured_image: '',
  featured: false,
  status: 'draft',
  amenities: [],
};

export const asText = (value: unknown) => (value === null || value === undefined ? '' : String(value));

export const propertyId = (row: DataRow) => asText(row.id);

export const fullName = (row: DataRow) =>
  asText(row.customer_name || row.guest_name || row.name || row.full_name) || 'Guest';

export const emailAddress = (row: DataRow) =>
  asText(row.customer_email || row.guest_email || row.email);

export const statusClass = (status: unknown) => {
  const value = asText(status).toLowerCase();
  if (['confirmed', 'approved', 'completed'].includes(value)) return 'bg-emerald-50 text-emerald-700';
  if (['cancelled', 'canceled', 'rejected'].includes(value)) return 'bg-rose-50 text-rose-700';
  return 'bg-amber-50 text-amber-700';
};

export const formatDate = (value: unknown) => {
  if (!value) return '—';
  const date = new Date(asText(value));
  return Number.isNaN(date.getTime())
    ? asText(value)
    : date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};

export const propertyImageStoragePath = (value: unknown) => {
  const marker = '/storage/v1/object/public/property-images/';
  const url = asText(value);
  const markerIndex = url.indexOf(marker);
  return markerIndex < 0 ? '' : url.slice(markerIndex + marker.length).split('?')[0];
};

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}

export function filterRows(rows: DataRow[], query: string, keys: string[]) {
  if (!query.trim()) return rows;
  const needle = query.trim().toLowerCase();
  return rows.filter((row) => keys.some((key) => asText(row[key]).toLowerCase().includes(needle)));
}

export function sectionDescription(section: AdminSection) {
  if (section === 'properties') return 'Manage your hotels, stays, apartments, and property imagery.';
  if (section === 'bookings') return 'Review reservations, customer details, and booking status.';
  if (section === 'enquiries') return 'Messages and contact requests submitted by your guests.';
  return 'Update your public page copy, banners, and search appearance.';
}
