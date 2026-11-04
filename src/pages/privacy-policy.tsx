import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LegalText } from '../components/LegalText';
import { HomeContent, homeContentValue, legalPageContentDefaults } from '../lib/homeContent';

type PrivacyPolicyPageProps = {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking: () => void;
  onOpenLegal: (type: 'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms') => void;
  onOpenConcierge: () => void;
  onOpenTransferModal: () => void;
  content?: HomeContent;
};

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  currentPath = '/privacy-policy',
  onNavigate,
  onOpenBooking,
  onOpenLegal,
  onOpenConcierge,
  onOpenTransferModal,
  content,
}) => {
  const customBody = content?.privacy_policy_page_body ?? '';
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar
        currentPath={currentPath}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
        onOpenLegal={onOpenLegal}
        onOpenConcierge={onOpenConcierge}
      />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {homeContentValue(content, 'privacy_policy_page_title', legalPageContentDefaults.privacy_policy_page_title)}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {homeContentValue(content, 'privacy_policy_page_subtitle', legalPageContentDefaults.privacy_policy_page_subtitle)}
          </p>

          {customBody.trim() ? <div className="mt-8"><LegalText content={customBody} /></div> : <div className="mt-8 space-y-8 text-sm leading-7 text-slate-700">
            <p>
              GQ Travel &amp; Hotels respects your privacy and is committed to protecting your personal data.
              This Privacy Policy explains how we collect, use, store, share and protect personal data when you
              visit our website, submit a travel enquiry, make a booking, pay for a service or contact us.
            </p>
            <p>
              We process personal data in accordance with applicable data protection laws, including the EU
              General Data Protection Regulation (GDPR) and applicable German data protection laws.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">1. Data Controller</h2>
              <p>The data controller responsible for the processing described in this Privacy Policy is:</p>
              <div className="space-y-1">
                <p>Jim E. Baggiocy</p>
                <p>GQ Travel &amp; Hotels</p>
                <p>Hochstr. 145</p>
                <p>66115 Saarbrücken, Germany</p>
                <p>Telephone: +49 681 3838 280</p>
                <p>WhatsApp: +49 1521 485 2424</p>
                <p>Email: <a href="mailto:info@gqtravel-hotels.com" className="text-teal-800 underline">info@gqtravel-hotels.com</a></p>
              </div>
              <p>
                For questions about this Privacy Policy or requests concerning your personal data, please contact
                us using the details above.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">2. Personal Data We Collect</h2>

              <h3 className="text-base font-bold text-slate-900">2.1 Contact and enquiry information</h3>
              <p>
                When you contact us or request a travel quotation, we may collect your name, email address,
                telephone number, preferred contact method, destination, travel dates, number of travellers,
                accommodation preferences, transport requirements and other information you provide.
              </p>

              <h3 className="text-base font-bold text-slate-900">2.2 Booking and travel information</h3>
              <p>
                When you make or request a booking through our website, we may process information necessary to
                arrange and manage your travel services. This may include passenger or guest names, contact
                details, itinerary, travel dates, booking references, accommodation details and transfer
                requirements.
              </p>
              <p>
                Depending on the service, we may need additional travel-document information to fulfil a booking
                or coordinate visa assistance. We will request such information only where it is necessary for
                the relevant service or required by a service provider or applicable law.
              </p>

              <h3 className="text-base font-bold text-slate-900">2.3 Identity verification and credit-card payments</h3>
              <p>
                GQ Travel &amp; Hotels does not routinely require customers to upload or submit copies of their
                identity cards or passports solely to make a booking or verify a payment.
              </p>
              <p>
                For credit-card bookings, the cardholder name should correspond to the name provided for the
                booking, where applicable. Additional verification may be required by the payment provider or
                where reasonably necessary to investigate a suspected fraudulent transaction, subject to
                applicable law.
              </p>
              <p>
                We do not routinely collect passport numbers, passport issue dates or passport expiry dates
                solely to process a payment. If such information is required for a specific travel service, we
                will handle it in accordance with the applicable legal requirements.
              </p>

              <h3 className="text-base font-bold text-slate-900">2.4 Payment and billing information</h3>
              <p>
                When you pay for a booking or service through our website, relevant payment and transaction
                information may be processed to complete the transaction and manage your booking. Depending on
                the payment method, this may include your name, billing information, transaction reference,
                payment status, amount paid and other information required to process the transaction.
              </p>
              <p>
                Payments may be processed through third-party providers, including PayPal and Stripe. The
                information handled by GQ Travel &amp; Hotels depends on the payment integration used and the
                information made available to us by the relevant provider.
              </p>

              <h3 className="text-base font-bold text-slate-900">2.5 Website and technical information</h3>
              <p>
                When you visit our website, technical information may be collected by our hosting provider and
                relevant technical service providers. This may include your IP address, browser type, device
                information, pages visited, access times, referral information and technical logs.
              </p>
              <p>
                Where Google Analytics is enabled and its use is permitted, additional website usage information
                may be processed as described in Section 6.
              </p>

              <h3 className="text-base font-bold text-slate-900">2.6 Communications</h3>
              <p>
                We may retain messages and correspondence you send through email, telephone, WhatsApp, website
                forms or other communication channels we make available.
              </p>
              <p>
                Please provide only information relevant to your enquiry or booking. Do not send payment-card
                security codes or copies of identity documents through ordinary email or messaging services
                unless an appropriate and secure method has been provided.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">3. How We Use Personal Data</h2>
              <p>We may use your personal data to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Respond to enquiries and prepare travel quotations.</li>
                <li>Process and manage bookings made through our website.</li>
                <li>Arrange flights, rail travel, accommodation, holiday packages, cruises, car rentals, airport transfers and other requested travel services.</li>
                <li>Coordinate guided tours, corporate travel, private jet enquiries, visa assistance and medical-tourism arrangements where requested.</li>
                <li>Communicate booking confirmations, payment information, itinerary changes and service updates.</li>
                <li>Share necessary information with relevant travel suppliers and service providers.</li>
                <li>Process transactions, manage refunds, prevent fraud and resolve payment disputes.</li>
                <li>Issue invoices and maintain business records.</li>
                <li>Respond to complaints, resolve disputes and protect our legal rights.</li>
                <li>Maintain website functionality, security and performance.</li>
                <li>Understand website usage and improve our services through analytics where lawfully permitted.</li>
                <li>Comply with applicable legal, accounting, tax and regulatory obligations.</li>
              </ul>
              <p>
                We will not use personal data for unrelated purposes without an appropriate legal basis and any
                information or consent required by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">4. Legal Bases for Processing</h2>
              <p>Where the GDPR applies, we process personal data on one or more of the following legal bases:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Contract and pre-contractual measures.</li>
                <li>Legal obligations.</li>
                <li>Legitimate interests.</li>
                <li>Consent.</li>
              </ul>
              <p>
                Where processing relies on consent, you may withdraw it at any time. Withdrawal does not affect
                processing lawfully carried out before withdrawal.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">5. Website Bookings and Travel Service Providers</h2>
              <p>
                When you submit a booking or enquiry through our website, we use the information you provide to
                process your request and coordinate the services you have selected.
              </p>
              <p>
                Depending on your booking, relevant information may be shared with airlines, railway operators,
                hotels, accommodation providers, tour operators, cruise operators, car rental companies, transfer
                providers, activity providers, payment service providers and other suppliers involved in your
                arrangement.
              </p>
              <p>
                Only information relevant to the requested service should be shared. Depending on the arrangement,
                GQ Travel &amp; Hotels may act as the organiser of a qualifying travel package, an intermediary
                for a third-party service or a coordinator of a requested service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">6. Google Analytics and Website Usage</h2>
              <p>
                Our website uses Google Analytics to help us understand how visitors use the website and assess
                website performance.
              </p>
              <p>
                Depending on the service configuration and your consent choices, information processed may include
                pages viewed, interactions with website content, referral information, browser and device
                information, usage events and information relating to the timing or duration of website visits.
              </p>
              <p>
                We use this information to understand website performance and improve the visitor experience.
              </p>
              <p>
                Google’s privacy information is available at:{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-teal-800 underline">https://policies.google.com/privacy</a>
              </p>
              <p>
                Google Analytics policy information is available at:{' '}
                <a href="https://developers.google.com/analytics/policy" target="_blank" rel="noreferrer" className="text-teal-800 underline">https://developers.google.com/analytics/policy</a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">7. Use of Cookies and Tracking Technologies</h2>
              <p>
                GQ Travel &amp; Hotels uses cookies and similar technologies to operate our website, improve its
                functionality, understand website usage and, where permitted, enhance the user experience.
              </p>
              <p>
                Cookies are small text files stored on your device when you visit a website. Some cookies are
                necessary for the website to function properly, including supporting essential features, security
                and booking-related functions. These necessary cookies may be used without consent where legally
                permitted.
              </p>
              <p>
                We may also use analytics cookies and similar technologies, including Google Analytics, to
                understand how visitors use our website, identify areas for improvement and evaluate website
                performance. Where required by applicable law, these technologies will only be activated after
                you have given your consent.
              </p>
              <p>
                When you first visit our website, you may be presented with a cookie banner that allows you to
                accept, reject or manage non-essential cookies. You can change or withdraw your consent at any
                time through the available cookie settings on our website.
              </p>
              <p>
                The information collected through cookies may include technical details such as your device or
                browser information, pages visited, interactions with the website and general usage data. The
                information collected depends on the cookies and technologies enabled and your consent
                preferences.
              </p>
              <p>
                For further information about how Google processes data through its services, please consult
                Google&apos;s Privacy Policy:{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-teal-800 underline">https://policies.google.com/privacy</a>
              </p>
              <p>
                Please note that disabling certain cookies may affect some website features or functionality.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">8. Payments, Payment Providers and Security</h2>
              <p>
                GQ Travel &amp; Hotels accepts payments through third-party payment services, including PayPal and
                Stripe.
              </p>
              <p>
                When you select a payment method, relevant personal and transaction information may be transmitted
                to the applicable payment provider to authorise and complete the payment, confirm your booking,
                manage refunds, prevent fraud and handle payment disputes.
              </p>
              <p>
                We take reasonable steps to support secure payment processing and reduce the risk of unauthorised
                payments and fraudulent transactions. No payment method can guarantee that fraud or payment
                disputes will never occur.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">9. Website Hosting and Technical Service Providers</h2>
              <p>
                Our website is hosted by Hostinger. In providing website hosting and related infrastructure,
                Hostinger may process technical information such as IP addresses, server logs, browser or device
                information and other data necessary to operate, maintain and secure the website.
              </p>
              <p>
                We may also use external service providers for website maintenance, security, booking
                functionality, form processing, analytics and payment processing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">10. External Websites and Travel Partners</h2>
              <p>
                Our website may contain links to external travel and activity websites, including
                Schauinsland-Reisen, Bentour Reisen and GetYourGuide.
              </p>
              <p>
                If you follow a link to an external website, that provider’s privacy policy and terms may apply
                to the information you submit there.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">11. International Data Transfers</h2>
              <p>
                Travel arrangements may require personal data to be shared with providers or authorities located
                outside Germany or the EEA. International processing may also occur through certain hosting,
                analytics, payment or technical providers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">12. Visa Assistance and Medical-Tourism Coordination</h2>
              <p>
                Where you request visa assistance, we may process the travel and identity information necessary to
                coordinate your request with relevant service providers or authorities.
              </p>
              <p>
                Where you request medical-tourism coordination, health information may be processed only where
                necessary and where an appropriate legal basis is satisfied.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">13. Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary for the purposes described in this Privacy
                Policy, including managing enquiries and bookings, providing customer support, resolving disputes
                and complying with legal obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">14. Data Security</h2>
              <p>
                We take reasonable technical and organisational measures intended to protect personal data
                against unauthorised access, accidental loss, alteration, disclosure or misuse.
              </p>
              <p>
                No method of electronic transmission or storage can be guaranteed to be completely secure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">15. Your Data Protection Rights</h2>
              <p>Subject to applicable law, you may have the right to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Request access to your personal data.</li>
                <li>Request correction of inaccurate or incomplete information.</li>
                <li>Request deletion of your personal data.</li>
                <li>Request restriction of processing.</li>
                <li>Object to processing based on legitimate interests.</li>
                <li>Receive certain personal data in a portable format.</li>
                <li>Withdraw consent where processing is based on consent.</li>
                <li>Lodge a complaint with a competent data protection authority.</li>
              </ul>
              <p>
                To exercise your rights, contact{' '}
                <a href="mailto:info@gqtravel-hotels.com" className="text-teal-800 underline">info@gqtravel-hotels.com</a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">16. Marketing Communications</h2>
              <p>
                We may send messages necessary to manage your enquiries, bookings, payments or requested
                services. Promotional communications will be sent only where permitted by applicable law and
                where any required consent has been obtained.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">17. Children’s Personal Data</h2>
              <p>
                Our travel services may involve bookings for children. We process children’s personal data only to
                the extent necessary for the requested travel arrangement and in accordance with applicable law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">18. Third-Party Privacy Notices</h2>
              <p>
                Third-party payment providers, travel suppliers and booking platforms may act as independent data
                controllers or as processors, depending on their role and the applicable arrangement.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>PayPal: <a href="https://www.paypal.com/us/legalhub/privacy-full" target="_blank" rel="noreferrer" className="text-teal-800 underline">https://www.paypal.com/us/legalhub/privacy-full</a></li>
                <li>Stripe: <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer" className="text-teal-800 underline">https://stripe.com/privacy</a></li>
                <li>Hostinger: <a href="https://www.hostinger.com/legal/privacy-policy" target="_blank" rel="noreferrer" className="text-teal-800 underline">https://www.hostinger.com/legal/privacy-policy</a></li>
                <li>Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-teal-800 underline">https://policies.google.com/privacy</a></li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">19. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy when our services, website technologies, service providers,
                data-processing activities or legal obligations change.
              </p>
              <p>
                The latest version will be published on this page with the date of the most recent update. We
                encourage visitors to review it periodically.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">20. Contact</h2>
              <p>For questions about this Privacy Policy, requests concerning your personal data or other privacy-related matters, please contact:</p>
              <div className="space-y-1">
                <p>GQ Travel &amp; Hotels</p>
                <p>Hochstr. 145</p>
                <p>66115 Saarbrücken, Germany</p>
                <p>Telephone: +49 681 3838 280</p>
                <p>WhatsApp: +49 1521 485 2424</p>
                <p>Email: <a href="mailto:info@gqtravel-hotels.com" className="text-teal-800 underline">info@gqtravel-hotels.com</a></p>
              </div>
            </section>
          </div>}
        </div>
      </main>

      <Footer
        onNavigate={onNavigate}
        onOpenLegal={onOpenLegal}
        onOpenBooking={onOpenBooking}
        onOpenTransferModal={onOpenTransferModal}
      />
    </div>
  );
};

export default PrivacyPolicyPage;
