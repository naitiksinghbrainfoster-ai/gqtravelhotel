import React, { useRef, useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Calendar, Users, Building, AlertCircle, Copy, Check } from 'lucide-react';
import { Property, PROPERTIES } from '../data/travelData';
import { supabase } from '../lib/supabase';
import { contactChannels } from '../lib/contactChannels';
import { PayPalCheckout } from './PayPalCheckout';

interface BookingModalProps {
  property: Property | null;
  properties?: Property[];
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onClose: () => void;
}

const getDateOffset = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const BookingModal: React.FC<BookingModalProps> = ({
  property: initialProperty,
  properties = PROPERTIES,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  onClose,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property>(
    initialProperty || properties[0] || PROPERTIES[0]
  );
  const [roomType, setRoomType] = useState<'Deluxe' | 'Superior'>('Deluxe');
  const [checkIn, setCheckIn] = useState(initialCheckIn || getDateOffset(2));
  const [checkOut, setCheckOut] = useState(initialCheckOut || getDateOffset(6));
  const [guests, setGuests] = useState(initialGuests);
  const [rateType, setRateType] = useState<'best_price' | 'flexible' | 'early_booking'>('flexible');
  
  // Customer details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const paymentSessionToken = useRef('');
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID?.trim() || '';

  // Calculation logic
  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const roomMultiplier = roomType === 'Superior' ? 1.25 : 1.0;
  const baseRate = selectedProperty.pricePerNight * roomMultiplier;
  const baseAccommodationTotal = baseRate * nights;
  
  // Rule from brief: General Service commission €3.99 per day
  const serviceCommission = 3.99 * nights;
  
  // Rule from brief: All Accommodation in Saarbrücken, city tax €3.5%
  const cityTax = selectedProperty.isSaarbruecken ? 0.035 * baseAccommodationTotal : 0;
  
  const grandTotal = baseAccommodationTotal + serviceCommission + cityTax;

  const validateCheckout = () => {
    if (isSubmitting) return false;
    if (!formRef.current?.reportValidity()) return false;
    if (!agreedToTerms) {
      setSubmitError('Please agree to the Booking Terms & Conditions before paying.');
      return false;
    }
    if (!supabase) {
      setSubmitError('Online payment is unavailable until Supabase is configured.');
      return false;
    }
    setSubmitError('');
    return true;
  };

  const createPayPalOrder = async () => {
    if (!supabase) throw new Error('Online payment is not configured. Please contact us.');
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const { data, error } = await supabase.functions.invoke<{
        orderId: string;
        sessionToken: string;
        bookingNumber: string;
        amount: string;
      }>('paypal-checkout', {
        body: {
          action: 'create-order',
          booking: {
            propertyId: selectedProperty.id,
            checkIn,
            checkOut,
            guests,
            roomType,
            rateType,
            customerName: guestName,
            customerEmail: guestEmail,
            customerPhone: guestPhone,
          },
        },
      });
      if (error) throw error;
      if (!data?.orderId || !data.sessionToken || !data.bookingNumber || !data.amount) {
        throw new Error('PayPal could not start checkout. Please try again.');
      }
      if (Number(data.amount).toFixed(2) !== grandTotal.toFixed(2)) {
        throw new Error('The property price has changed. Please close and reopen the booking form to review the updated total.');
      }
      paymentSessionToken.current = data.sessionToken;
      setBookingNumber(data.bookingNumber);
      return data.orderId;
    } finally {
      setIsSubmitting(false);
    }
  };

  const capturePayPalOrder = async (orderId: string) => {
    if (!supabase || !paymentSessionToken.current) {
      throw new Error('This payment session has expired. Please start checkout again.');
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const { data, error } = await supabase.functions.invoke<{
        bookingNumber: string;
        amount: string;
        currency: string;
        paymentStatus: string;
      }>('paypal-checkout', {
        body: {
          action: 'capture-order',
          orderId,
          sessionToken: paymentSessionToken.current,
        },
      });
      if (error) throw error;
      if (!data?.bookingNumber || data.paymentStatus !== 'paid') {
        throw new Error('PayPal has not confirmed the payment. Please try again or contact us.');
      }
      setBookingNumber(data.bookingNumber);
      setIsConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayPalError = (error: unknown) => {
    setSubmitError(error instanceof Error ? error.message : 'PayPal could not process the payment. Please try again.');
  };

  const voucherText = `GQTravel-Hotels.com | Paid Booking Request
Dear ${guestName || '[Guest Name]'}, your payment was received and your booking request was sent.
🏠 ${selectedProperty.title}
📍 ${selectedProperty.address || selectedProperty.location}
Selected Room / ${roomType} Room
📅 Check-in: ${checkIn} from 14:00
📅 Check-out: ${checkOut} by 10:00
🔖 Booking No.: ${bookingNumber}
💳 Payment: Received via PayPal · €${grandTotal.toFixed(2)}
${contactChannels.map((channel) => `${channel.label}: ${channel.value}`).join('\n')}
✉️ Email: ${guestEmail}
Rate Policy: ${rateType === 'flexible' ? 'Flexible Rate (Free cancellation up to 14 days)' : rateType === 'best_price' ? 'Best Price (Non-refundable)' : 'Early Booking (Free cancellation up to 28 days)'}

Thank you for choosing GQTravel-Hotels.com. We look forward to welcoming you!

Kind regards,
GQ Travel & Hotels
${contactChannels.map((channel) => `${channel.label}: ${channel.value}`).join('\n')}`;

  const copyVoucherToClipboard = () => {
    navigator.clipboard.writeText(voucherText);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Direct Accommodation Checkout
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Book Your Stay with GQ Travel &amp; Hotels
              </h2>
              <p className="text-xs text-slate-500">
                Official booking engine for Saarbrücken serviced apartments and worldwide partner hotels.
              </p>
            </div>

            <form ref={formRef} onSubmit={(event) => event.preventDefault()} className="space-y-6">
              {/* Property & Room Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Property
                  </label>
                  <select
                    value={selectedProperty.id}
                    onChange={(e) => {
                      const prop = properties.find((p) => p.id === e.target.value);
                      if (prop) setSelectedProperty(prop);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-teal-800 font-medium"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.city}, {p.country})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Room Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRoomType('Deluxe')}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                        roomType === 'Deluxe'
                          ? 'bg-teal-800 text-white border-teal-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Deluxe Room
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoomType('Superior')}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                        roomType === 'Superior'
                          ? 'bg-teal-800 text-white border-teal-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Superior Suite (+25%)
                    </button>
                  </div>
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    min={getDateOffset(0)}
                    required
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value > checkOut) setCheckOut(e.target.value);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-teal-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    min={checkIn}
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-teal-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-teal-800"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Rate Selection as required in terms */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Choose Your Rate &amp; Cancellation Policy
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div
                    onClick={() => setRateType('flexible')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      rateType === 'flexible'
                        ? 'border-teal-800 bg-teal-50/50 ring-1 ring-teal-800'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Flexible Rate</div>
                    <div className="text-[11px] text-teal-800 font-semibold mt-0.5">Free cancellation</div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Free cancellation up to 14 or 24 days prior to check-in.
                    </p>
                  </div>

                  <div
                    onClick={() => setRateType('best_price')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      rateType === 'best_price'
                        ? 'border-teal-800 bg-teal-50/50 ring-1 ring-teal-800'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Best Price Rate</div>
                    <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Non-Refundable</div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Lowest price. 100% cancellation charge applies after booking.
                    </p>
                  </div>

                  <div
                    onClick={() => setRateType('early_booking')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      rateType === 'early_booking'
                        ? 'border-teal-800 bg-teal-50/50 ring-1 ring-teal-800'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Early Booking (84+ Days)</div>
                    <div className="text-[11px] text-teal-800 font-semibold mt-0.5">Special Terms</div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Free cancellation until 28 days before scheduled arrival date.
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 text-sm mb-2 flex items-center justify-between">
                  <span>Price Breakdown ({nights} night{nights > 1 ? 's' : ''})</span>
                  <span className="text-teal-900 font-extrabold text-base tabular-nums">
                    €{grandTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Base Rate: €{baseRate.toFixed(2)} × {nights} nights</span>
                  <span className="tabular-nums font-medium">€{baseAccommodationTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>General Service Commission (€3.99 / day):</span>
                  <span className="tabular-nums font-medium">€{serviceCommission.toFixed(2)}</span>
                </div>

                {selectedProperty.isSaarbruecken && (
                  <div className="flex justify-between text-teal-800 font-medium">
                    <span>Saarbrücken City Tax (3.5% of accommodation):</span>
                    <span className="tabular-nums">€{cityTax.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                  <span>Total Amount Payable (incl. VAT &amp; Taxes):</span>
                  <span className="text-teal-900 tabular-nums">€{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Guest Information &amp; Billing Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandra Schneider"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sandra@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+49 1521 485 2424"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                    />
                  </div>

                </div>
              </div>

              {/* Mandatory Unticked Checkbox as specified in prompt */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    required
                    className="mt-0.5 rounded-sm border-slate-300 text-teal-800 focus:ring-teal-800"
                  />
                  <span className="leading-relaxed">
                    I have read and agree to the <strong>GQ Travel &amp; Hotels Booking Terms &amp; Conditions</strong> and the cancellation and refund policy applicable to my selected rate. I understand the free-cancellation deadline and that, after this deadline, my reservation may be non-refundable and a cancellation charge of up to 100% of the booking price may apply, subject to applicable law. I understand that a statutory right of withdrawal generally does not apply to accommodation services booked for specific dates where the legal requirements for this exception are met. My mandatory statutory rights remain unaffected.
                  </span>
                </label>
              </div>

              {submitError && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">{submitError}</p>}

              {/* PayPal checkout */}
              <div className="pt-2">
                <PayPalCheckout
                  clientId={paypalClientId}
                  onValidate={validateCheckout}
                  onCreateOrder={createPayPalOrder}
                  onCapture={capturePayPalOrder}
                  onCancel={() => setSubmitError('Payment was cancelled. No charge was made.')}
                  onError={handlePayPalError}
                />
                {isSubmitting && (
                  <p role="status" className="mt-2 text-center text-xs text-teal-800">
                    <ShieldCheck className="mr-1 inline h-4 w-4 animate-pulse" />
                    Processing secure payment…
                  </p>
                )}
                <div className="text-center mt-2 text-[11px] text-slate-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                  <span>PayPal processes the payment securely. Your stay remains pending until availability is confirmed by our team.</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Automatic Confirmed Welcome Message matching user prompt verbatim */
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
              <div>
                <h3 className="font-bold text-emerald-950 text-base">
                  Payment Received
                </h3>
                <p className="text-xs text-emerald-800">
                  Your payment was received and your booking request was sent. The stay remains pending until our team confirms availability.
                </p>
              </div>
            </div>

            {/* Verbatim Format from prompt */}
            <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-3 border border-slate-800 shadow-inner select-all relative">
              <button
                onClick={copyVoucherToClipboard}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedVoucher ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedVoucher ? 'Copied' : 'Copy Voucher'}</span>
              </button>

              <div className="text-teal-400 font-bold text-sm">
                GQTravel-Hotels.com | Paid Booking Request
              </div>
              <div className="text-slate-200">
                Dear {guestName}, your payment was received and your booking request has been sent.
              </div>

              <div className="space-y-1 text-slate-300 pt-2 border-t border-white/10">
                <div>🏠 {selectedProperty.title}</div>
                <div>📍 {selectedProperty.address || selectedProperty.location}</div>
                <div>🛏️ Selected Room / {roomType} Room</div>
                <div className="pt-2">📅 Check-in: {checkIn} from 14:00</div>
                <div>📅 Check-out: {checkOut} by 10:00</div>
                <div>🔖 Booking No.: {bookingNumber}</div>
                <div>💳 Payment: Received via PayPal · €{grandTotal.toFixed(2)}</div>
                {contactChannels.map((channel) => (
                  <div key={channel.label}>{channel.label}: {channel.value}</div>
                ))}
                <div>✉️ Email: {guestEmail}</div>
              </div>

              <div className="text-slate-400 text-[11px] pt-2 border-t border-white/10">
                For any questions or assistance before or during your stay, please contact us directly.<br />
                Thank you for choosing GQTravel-Hotels.com. We look forward to welcoming you!
              </div>

              <div className="pt-2 text-teal-300 text-[11px]">
                Kind regards,<br />
                <strong>GQ Travel &amp; Hotels</strong><br />
                {contactChannels.map((channel) => (
                  <React.Fragment key={channel.label}>{channel.label}: {channel.value}<br /></React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
