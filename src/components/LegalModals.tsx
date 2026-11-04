import React from 'react';
import { X, ShieldCheck, FileText, Lock, Building, Scale } from 'lucide-react';
import { contactChannels } from '../lib/contactChannels';

interface LegalModalProps {
  type: 'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close legal modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 01. General Terms & Conditions */}
        {type === 'terms' && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                SEO Title: General Terms &amp; Conditions | GQ Travel &amp; Hotels
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                General Terms &amp; Conditions (AGB)
              </h2>
              <p className="text-xs text-slate-500">Effective Date: 1st October 2026 · GQ Travel &amp; Hotels</p>
            </div>

            <div className="prose prose-sm text-xs leading-relaxed text-slate-700 space-y-4 max-h-[60vh] overflow-y-auto pr-3">
              <section>
                <h3 className="text-sm font-bold text-slate-900">1. Scope and Services</h3>
                <p>
                  These General Terms &amp; Conditions apply to bookings, reservations, travel arrangements, quotations, and enquiries made through the GQ Travel &amp; Hotels website, online booking systems, email, WhatsApp, telephone, or our office. Services include holiday packages, hotels, serviced apartments in Saarbrücken, flights, Deutsche Bahn Tourist Tickets, Rail &amp; Fly, cruises, Sixt car rentals, private airport transfers, guided tours, private jet charter, corporate travel management, Ghana visa assistance, and medical tourism coordination.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">2. Our Role in Your Booking</h3>
                <p>
                  Depending on the service, GQ Travel &amp; Hotels may act as a Tour Operator (for qualifying holiday packages combined by us), an Intermediary (when arranging bookings with third-party airlines, hotels, or rental companies), or a Direct Service Provider (for our own serviced apartments and private transfers).
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">3. Holiday Packages &amp; Insolvency Protection</h3>
                <p>
                  GQ Travel &amp; Hotels has insolvency protection arrangements with <strong>R+V Allgemeine Versicherung AG</strong> for qualifying package travel bookings. Where required by law, customers receive the official security certificate (<em>Sicherungsschein</em>) covering package travel arrangements.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">4. Hotels &amp; Serviced Apartments</h3>
                <p>
                  We offer hotel and apartment bookings, including our serviced apartments on Rosenstraße 2, 66111 Saarbrücken. A transparent general service commission of €3.99 per day applies, and all accommodation in Saarbrücken is subject to a 3.5% municipal city tax.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">5. Prices, Payments &amp; 3D Secure</h3>
                <p>
                  Payments may be processed through authorized payment providers including PayPal and Stripe, with 3D Secure authentication. Accepted currencies include EUR, USD, and GHS.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">6. Applicable Law &amp; Jurisdiction</h3>
                <p>
                  These Terms are governed by German law. Jurisdiction is Saarbrücken, Germany, subject to mandatory consumer protection laws in the customer’s country of residence.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* 02. Impressum (Imprint) */}
        {type === 'imprint' && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                SEO Title: Impressum | GQ Travel &amp; Hotels
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Impressum (Legal Notice)
              </h2>
              <p className="text-xs text-slate-500">
                Airport Transfers, Hotels &amp; Rail Booking in Saarbrücken &amp; Germany
              </p>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Information According to § 5 TMG</h3>
                <div className="font-semibold text-slate-900">GQ Travel &amp; Hotels</div>
                <div>Responsible Operator: <strong>Jim E. Baggiocy</strong> (Managing Director)</div>
                <div>Hochstr. 145</div>
                <div>66115 Saarbrücken, Germany</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Contact Details</h3>
                {contactChannels.map((channel) => (
                  <a key={channel.label} href={channel.href} className="block text-teal-800 hover:underline">
                    {channel.label}: {channel.value}
                  </a>
                ))}
                <div>Website: https://gqtravel-hotels.com</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Insolvency Insurance Protection</h3>
                <div>Insurer: R+V Allgemeine Versicherung AG</div>
                <div>Coverage: Package Travel Insolvency Protection Certificate (Sicherungsschein)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Dispute Resolution</h3>
                <p>
                  The European Commission provides a platform for online dispute resolution (OS):{' '}
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="text-teal-800 underline">
                    https://ec.europa.eu/consumers/odr
                  </a>.
                  We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 03. Privacy Policy */}
        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                SEO Title: Privacy Policy | GQ Travel &amp; Hotels
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Privacy Policy (Datenschutzerklärung)
              </h2>
              <p className="text-xs text-slate-500">GDPR Compliant · Data Protection Notice</p>
            </div>

            <div className="prose prose-sm text-xs leading-relaxed text-slate-700 space-y-4 max-h-[60vh] overflow-y-auto pr-3">
              <section>
                <h3 className="text-sm font-bold text-slate-900">1. Data Controller</h3>
                <p>
                  Jim E. Baggiocy, GQ Travel &amp; Hotels, Hochstr. 145, 66115 Saarbrücken, Germany. Contact us on Ghana WhatsApp (+233 55 998 2727) or Germany WhatsApp (+49 1521 485 2424).
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">2. Personal Data We Collect</h3>
                <p>
                  We process contact information (name, email, phone), booking details (passenger names, travel dates, flights, hotel preferences), payment references, and communications. For credit-card payments, cardholder verification is managed through authorized gateways (PayPal, Stripe with 3D Secure).
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">3. Legal Bases for Processing (GDPR Art. 6)</h3>
                <p>
                  Processing is carried out for contract fulfillment (Art. 6(1)(b)), legal obligations (Art. 6(1)(c)), and legitimate business operations (Art. 6(1)(f)). Where consent is obtained, you may withdraw it at any time.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">4. Hosting &amp; Service Providers</h3>
                <p>
                  Our web hosting is provided by Hostinger. Payment processing is facilitated by Stripe and PayPal. In Ghana, future mobile-money (MoMo) payments will be integrated via Hubtel.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-slate-900">5. Your Rights Under GDPR</h3>
                <p>
                  You have the right to request access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), and to object (Art. 21). Contact us through either WhatsApp number above to exercise your rights.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* 04. Airport Transfer Saarbrücken Terms */}
        {type === 'airport-terms' && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                SEO Title: Airport Transfer Saarbrücken | GQ Travel &amp; Hotels
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Airport Transfer Service – Terms &amp; Conditions
              </h2>
              <p className="text-xs text-slate-500">Saarland, Frankfurt, Luxembourg, Stuttgart, Düsseldorf, Brussels</p>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-700 max-h-[60vh] overflow-y-auto pr-3">
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
                <div className="font-bold text-teal-950">Waiting-Time Policy:</div>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><strong>Airport Arrivals:</strong> First 60 minutes after actual landing are completely free. €20 per additional 30 minutes thereafter.</li>
                  <li><strong>Non-airport Pickups:</strong> First 15 minutes are free. €10 per additional 15 minutes thereafter.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">Cancellation &amp; Refund Policy:</div>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><strong>Within 24 Hours of Booking:</strong> 100% Free cancellation.</li>
                  <li><strong>14+ Calendar Days Before Pickup:</strong> 100% Free cancellation &amp; full refund.</li>
                  <li><strong>7–13 Calendar Days Before:</strong> Fixed cancellation fee of €119 deducted; remainder refunded.</li>
                  <li><strong>Fewer Than 7 Days:</strong> Non-refundable.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">WhatsApp Communication:</div>
                <p className="mt-1">
                  A WhatsApp group is created with you and the assigned driver. Customers must message the group immediately upon boarding/takeoff so the driver can coordinate arrival timing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 05. Accra Airport Transfers & Hotels Terms */}
        {type === 'accra-terms' && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                SEO Title: Accra Airport Transfers &amp; Hotels | GQ Travel
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Accra Airport Transfers &amp; Hotels — Terms &amp; Conditions
              </h2>
              <p className="text-xs text-slate-500">Kotoka International Airport &amp; Ghana Accommodations</p>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-700 max-h-[60vh] overflow-y-auto pr-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">Payment Methods in Ghana:</div>
                <p className="mt-1">
                  Payments supported via Online Mobile Money (MoMo), MTN Mobile Money, Telecel Cash, credit card 3D Secure, or bank transfer.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
                <div className="font-bold text-teal-950">Cancellation &amp; Refund Policy (Ghana):</div>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><strong>Within 24 Hours:</strong> Free cancellation.</li>
                  <li><strong>14+ Days Before Service:</strong> Free cancellation &amp; full refund.</li>
                  <li><strong>7–13 Days Before:</strong> Fixed fee of GH₵1,500 retained; balance refunded (e.g. from GH₵3,000 paid, GH₵1,500 refunded).</li>
                  <li><strong>Fewer Than 7 Days:</strong> Non-refundable.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
