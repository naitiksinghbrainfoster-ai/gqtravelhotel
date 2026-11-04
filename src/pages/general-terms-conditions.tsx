import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LegalModal } from '../components/LegalModals';
import { LegalText } from '../components/LegalText';
import { HomeContent, homeContentValue, legalPageContentDefaults } from '../lib/homeContent';

type GeneralTermsConditionsPageProps = {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking: () => void;
  onOpenLegal: (type: 'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms') => void;
  onOpenConcierge: () => void;
  onOpenTransferModal: () => void;
  content?: HomeContent;
};

const defaultNavigate = (path: string) => {
  const nextPath = path.startsWith('/') ? path : `/${path}`;
  if (window.location.pathname !== nextPath) {
    window.history.pushState({}, '', nextPath);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const GeneralTermsConditionsPage: React.FC<GeneralTermsConditionsPageProps> = ({
  currentPath = '/general-terms-conditions',
  onNavigate = defaultNavigate,
  onOpenBooking,
  onOpenLegal,
  onOpenConcierge,
  onOpenTransferModal,
  content,
}) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);

  const handleLegalOpen = (type: 'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms') => {
    if (type === 'terms') {
      onNavigate('/general-terms-conditions');
      return;
    }
    setLegalModalType(type);
  };
  const customBody = content?.terms_page_body ?? '';

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath={currentPath}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
        onOpenLegal={handleLegalOpen}
        onOpenConcierge={onOpenConcierge}
      />

      <main className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {homeContentValue(content, 'terms_page_title', legalPageContentDefaults.terms_page_title)}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {homeContentValue(content, 'terms_page_subtitle', legalPageContentDefaults.terms_page_subtitle)}
            </p>

            {customBody.trim() ? <div className="mt-8"><LegalText content={customBody} /></div> : <div className="mt-8 space-y-8 text-sm leading-7 text-slate-700">
              <section>
                <h2 className="text-base font-bold text-slate-900">1. Scope and Services</h2>
                <p className="mt-2">
                  These General Terms &amp; Conditions apply to bookings, reservations, travel arrangements,
                  quotations, and enquiries made through the GQ Travel &amp; Hotels website, online booking
                  systems, email, WhatsApp, telephone, or our office.
                </p>
                <p className="mt-2">
                  GQ Travel &amp; Hotels offers the following services: holiday packages and global tours,
                  hotels and serviced apartments, flights and rail tickets, cruises and car rentals,
                  airport pick-up and transfer services, guided tours and excursions, private jet charter,
                  corporate travel management, visa assistance in Ghana, medical tourism coordination, and
                  other travel-related services advertised on our website.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">2. Our Role in Your Booking</h2>
                <p className="mt-2">
                  Depending on the service and how it is offered, GQ Travel &amp; Hotels may act as a tour
                  operator for qualifying holiday packages, an intermediary when arranging a booking between
                  the customer and an independent service provider, or a direct service provider for services
                  we provide ourselves.
                </p>
                <p className="mt-2">
                  Our role and the identity of the contracting provider will be communicated during the booking
                  process or in the relevant booking documentation.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">3. Holiday Packages and Global Tours</h2>
                <p className="mt-2">
                  GQ Travel &amp; Hotels offers holiday arrangements to destinations including Germany, Dubai,
                  Ghana, Kenya, Uganda, Zanzibar, Paris, Vietnam, Laos, Cambodia, and Thailand.
                </p>
                <p className="mt-2">
                  Where GQ Travel &amp; Hotels combines and sells travel services as a package within the
                  meaning of applicable law, we act as the tour operator and fulfil the responsibilities
                  imposed by the relevant contract and legislation.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">4. Insolvency Protection for Package Travel</h2>
                <p className="mt-2">
                  GQ Travel &amp; Hotels has insolvency protection arrangements with R+V Allgemeine Versicherung
                  AG for qualifying package travel bookings, subject to the scope and conditions of the relevant
                  insurance or security arrangement.
                </p>
                <p className="mt-2">
                  Where required by law, customers will receive the applicable insolvency-protection
                  documentation, including a security certificate (Sicherungsschein) for covered package travel
                  arrangements.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">5. Hotels and Serviced Apartments</h2>
                <p className="mt-2">
                  We offer hotel and apartment bookings, including our serviced apartments in Saarbrücken and
                  accommodation through partner properties.
                </p>
                <p className="mt-2">
                  Property descriptions, amenities, occupancy limits, check-in and check-out times, house
                  rules, deposits, and cancellation conditions are governed by the relevant booking
                  confirmation and applicable property terms.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">6. Flights and Rail Travel</h2>
                <p className="mt-2">
                  Flight bookings and rail tickets are subject to the applicable ticket conditions, carrier
                  rules, baggage allowances, and change or cancellation policies.
                </p>
                <p className="mt-2">
                  Customers must check passenger names, dates, routes, and ticket restrictions before travel.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">7. Cruises and Car Rentals</h2>
                <p className="mt-2">
                  Cruises and car rentals, including Sixt rentals, may be arranged through third-party providers.
                </p>
                <p className="mt-2">
                  Where GQ Travel &amp; Hotels acts as an intermediary, the relevant provider’s booking
                  conditions, payment requirements, eligibility rules, insurance terms, and cancellation
                  policies apply to the underlying service.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">8. Airport Pick-Up, Drop-Off and Transfers</h2>
                <p className="mt-2">
                  GQ Travel &amp; Hotels offers airport transfer arrangements, which may include airport-to-hotel,
                  hotel-to-airport, and other agreed journeys.
                </p>
                <p className="mt-2">
                  Customers must provide accurate flight details, contact information, addresses, and passenger
                  numbers and notify us promptly of any changes to their travel plans.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">9. External Holiday and Travel Booking Partners</h2>
                <p className="mt-2">
                  Our website provides links to external booking partners, including Schauinsland-Reisen,
                  Bentour Reisen, and GetYourGuide as displayed on our Holidays page.
                </p>
                <p className="mt-2">
                  When customers click a partner link, they may be redirected to the partner’s website to review
                  offers, check availability, and complete a booking.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">10. Private Jet Charter and Special Requests</h2>
                <p className="mt-2">
                  Private jet charter, corporate travel, customised tours, and other specialised arrangements may
                  require an individual quotation and separate contract.
                </p>
                <p className="mt-2">
                  A request does not constitute a confirmed booking until the required confirmation has been
                  issued.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">11. Visa Assistance and Medical Tourism Coordination</h2>
                <p className="mt-2">
                  Visa assistance is an administrative support service. GQ Travel &amp; Hotels cannot guarantee visa
                  approval, entry permission, or processing times.
                </p>
                <p className="mt-2">
                  Medical tourism coordination may involve arranging travel or accommodation with independent
                  providers. Unless expressly agreed otherwise, GQ Travel &amp; Hotels does not provide medical
                  treatment or replace advice from qualified healthcare professionals.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">12. Booking Requests and Confirmation</h2>
                <p className="mt-2">
                  Bookings and requests may be submitted through our website, online booking systems, email,
                  WhatsApp, telephone, or office.
                </p>
                <p className="mt-2">
                  A quotation or enquiry does not automatically constitute a confirmed reservation. A booking
                  becomes confirmed when the applicable acceptance, payment, availability, and confirmation
                  requirements have been met.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">13. Prices and Payments</h2>
                <p className="mt-2">
                  Prices may be quoted in EUR, USD, GHS, or another stated currency. The applicable total price,
                  taxes, mandatory charges, payment deadlines, accepted payment methods, and any additional fees
                  will be disclosed as required.
                </p>
                <p className="mt-2">
                  Late or missing payment may lead to cancellation or other consequences under the applicable
                  contract and law.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">14. Changes, Cancellations and Refunds</h2>
                <p className="mt-2">
                  Cancellation, amendment, and refund conditions depend on the service, the confirmed booking,
                  the relevant provider’s conditions, and applicable law.
                </p>
                <p className="mt-2">
                  Some tickets, accommodation rates, and other reservations may be non-refundable or subject to
                  cancellation charges where these conditions have been lawfully disclosed and apply to the
                  booking.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">15. Travel Documents and Entry Requirements</h2>
                <p className="mt-2">
                  Customers are responsible for ensuring that they hold valid passports, visas, permits, and
                  other required travel documents.
                </p>
                <p className="mt-2">
                  Any travel information or visa assistance provided by GQ Travel &amp; Hotels does not guarantee
                  admission to a country.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">16. Delays and Disruptions</h2>
                <p className="mt-2">
                  Travel may be affected by weather, strikes, operational disruption, government restrictions,
                  security issues, technical problems, or other unforeseen circumstances.
                </p>
                <p className="mt-2">
                  GQ Travel &amp; Hotels will fulfil its legal obligations according to its role in the
                  particular booking.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">17. Liability</h2>
                <p className="mt-2">
                  GQ Travel &amp; Hotels’ responsibilities depend on whether it acts as tour operator,
                  intermediary, or direct service provider.
                </p>
                <p className="mt-2">
                  For third-party services, the relevant provider is generally responsible for performing its
                  own contract. This does not exclude any responsibility GQ Travel &amp; Hotels has for its own
                  acts, omissions, booking errors, or other legal obligations.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">18. Right of Withdrawal</h2>
                <p className="mt-2">
                  The availability of a statutory right of withdrawal depends on the type of contract and
                  applicable law.
                </p>
                <p className="mt-2">
                  Package travel contracts are subject to their applicable statutory rules. Customers should
                  consult the booking information and cancellation conditions relevant to their reservation.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">19. Data Protection</h2>
                <p className="mt-2">
                  Personal information is processed in accordance with applicable data protection law and our
                  Privacy Policy.
                </p>
                <p className="mt-2">
                  Booking information may be shared with relevant travel providers, accommodation partners,
                  transport operators, payment processors, and other parties where necessary to fulfil bookings
                  or meet legal obligations.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">20. Complaints and Customer Support</h2>
                <p className="mt-2">
                  Customers should contact GQ Travel &amp; Hotels promptly if they have questions, complaints,
                  or problems concerning a booking.
                </p>
                <p className="mt-2">
                  For services booked directly with external partners, customers should generally contact the
                  relevant partner regarding payment, cancellations, refunds, or service delivery.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">21. Applicable Law and Jurisdiction</h2>
                <p className="mt-2">
                  These Terms are governed by German law, subject to any mandatory consumer protection rights
                  that apply in the customer’s country of residence.
                </p>
                <p className="mt-2">
                  Jurisdiction is determined by applicable law. Nothing in these Terms restricts a consumer’s
                  mandatory right to bring proceedings before a competent court.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">22. Changes to These Terms</h2>
                <p className="mt-2">
                  GQ Travel &amp; Hotels may update these Terms to reflect changes to our services, booking
                  procedures, or legal requirements.
                </p>
                <p className="mt-2">
                  The terms applicable to a particular booking are determined by the relevant contract and
                  applicable law. Updates do not retrospectively remove rights already established under an
                  existing contract.
                </p>
              </section>

              <section>
                <h2 className="text-base font-bold text-slate-900">23. Contact Information</h2>
                <p className="mt-2">
                  For booking enquiries, changes, cancellations, or complaints, please use the contact details
                  published on the official GQ Travel &amp; Hotels website.
                </p>
                <p className="mt-2">
                  Please include your booking reference in communications where available.
                </p>
              </section>

            </div>}
          </div>
        </div>
      </main>

      <Footer
        onNavigate={onNavigate}
        onOpenLegal={(type) => handleLegalOpen(type)}
        onOpenBooking={onOpenBooking}
        onOpenTransferModal={onOpenTransferModal}
      />

      {legalModalType && <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />}
    </div>
  );
};

export default GeneralTermsConditionsPage;
