import React, { useState } from 'react';
import { Car, Clock, ShieldCheck, MessageSquare, ArrowRight, CheckCircle2, AlertCircle, Plane } from 'lucide-react';
import { AIRPORT_TRANSFER_ROUTES } from '../../data/travelData';
import { homeContentValue, HomeContent } from '../../lib/homeContent';
import { contactChannels } from '../../lib/contactChannels';

interface AirportTransferCalculatorProps {
  onBookTransfer: (details: {
    route: typeof AIRPORT_TRANSFER_ROUTES[0];
    date: string;
    time: string;
    flightNumber: string;
    passengers: number;
    luggage: string;
    name: string;
    email: string;
    phone: string;
  }) => void;
  content?: HomeContent;
}

export const AirportTransferCalculator: React.FC<AirportTransferCalculatorProps> = ({ onBookTransfer, content }) => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [transferDate, setTransferDate] = useState('2026-11-10');
  const [transferTime, setTransferTime] = useState('14:30');
  const [flightNumber, setFlightNumber] = useState('LH 1234');
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState('2 Large Suitcases, 2 Hand Luggage');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBookingNo, setConfirmedBookingNo] = useState('');

  const route = AIRPORT_TRANSFER_ROUTES[selectedRouteIndex];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('Please accept the Airport Transfer Service Terms & Conditions to proceed.');
      return;
    }
    const bookingNo = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingNo(bookingNo);
    setShowConfirmation(true);
    onBookTransfer({
      route,
      date: transferDate,
      time: transferTime,
      flightNumber,
      passengers,
      luggage,
      name: guestName,
      email: guestEmail,
      phone: guestPhone
    });
  };

  return (
    <section id="transfers" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
            {homeContentValue(content, 'home_transfer_label', 'Saarbrücken & European Airports · Accra Kotoka')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            {homeContentValue(content, 'home_transfer_title', 'Airport Pick-Up & Drop-Off Service')}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {homeContentValue(content, 'home_transfer_description', 'Book your private airport transfer online — easy, punctual, and reliable with direct WhatsApp driver coordination.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Route selection & Policy Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-teal-800" />
                <span>Select Your Airport Route</span>
              </h3>

              <div className="space-y-2">
                {AIRPORT_TRANSFER_ROUTES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedRouteIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                      selectedRouteIndex === idx
                        ? 'bg-teal-900 text-white border-teal-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{item.to}</div>
                      <div className={`text-[11px] ${selectedRouteIndex === idx ? 'text-teal-200' : 'text-slate-500'}`}>
                        From {item.from} · {item.distanceKm} km ({item.estTime})
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold tabular-nums">
                        €{item.priceEur}
                      </span>
                      {item.priceGhc && (
                        <div className={`text-[10px] ${selectedRouteIndex === idx ? 'text-teal-200' : 'text-slate-500'}`}>
                          GH₵{item.priceGhc}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Waiting Time & WhatsApp Policy Card */}
            <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs text-slate-700 space-y-3">
              <h4 className="font-bold text-teal-950 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-800" />
                <span>Airport Arrival &amp; Waiting-Time Policy</span>
              </h4>
              <p>
                <strong>Airport Arrivals:</strong> The first <strong>60 minutes</strong> after actual flight landing time are completely free. Afterwards, €20 applies for each additional 30 minutes.
              </p>
              <p>
                <strong>WhatsApp Group:</strong> We create a dedicated WhatsApp group with you and the assigned driver. Please message the group immediately after your flight takes off.
              </p>
              <div className="pt-2 border-t border-teal-200/60 text-[11px] text-teal-900 font-medium">
                Cancellation: Free within 24 hours of booking, or 14+ days before pickup. (7–13 days: €119 fee).
              </div>
            </div>
          </div>

          {/* Right Column: Direct Online Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Book Transfer: {route.from} ⇄ {route.to}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fixed price guaranteed: <span className="font-bold text-teal-800 text-base">€{route.priceEur}</span> {route.priceGhc ? `(or GH₵${route.priceGhc})` : ''} · No hidden meter charges.
              </p>

              {!showConfirmation ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Transfer Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={transferDate}
                        onChange={(e) => setTransferDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Scheduled Pickup Time *
                      </label>
                      <input
                        type="time"
                        required
                        value={transferTime}
                        onChange={(e) => setTransferTime(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Flight Number (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LH 1450"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Passengers *
                      </label>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                      >
                        <option value={1}>1 Passenger</option>
                        <option value={2}>2 Passengers</option>
                        <option value={3}>3 Passengers</option>
                        <option value={4}>4 Passengers</option>
                        <option value={6}>5-7 Minivan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Luggage Count *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 bags"
                        value={luggage}
                        onChange={(e) => setLuggage(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Guest Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Thomas Müller"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+49 152 1485 2424"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-teal-800 bg-slate-50"
                      />
                    </div>
                  </div>

                  {/* Mandatory Unticked Checkbox for Terms */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        required
                        className="mt-0.5 rounded-sm border-slate-300 text-teal-800 focus:ring-teal-800"
                      />
                      <span>
                        I have read and agree to the <strong>GQ Travel &amp; Hotels Airport Transfer Terms &amp; Conditions</strong>, waiting-time policy (60 mins free after landing), and the cancellation policy (free within 24h or 14+ days before pickup; €119 fee for 7-13 days).
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={!acceptedTerms}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                        acceptedTerms
                          ? 'bg-teal-800 hover:bg-teal-900 active:scale-98'
                          : 'bg-slate-300 cursor-not-allowed text-slate-500'
                      }`}
                    >
                      <span>Confirm &amp; Book Airport Transfer (€{route.priceEur})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                      {contactChannels.map((channel) => (
                        <a
                          key={channel.label}
                          href={channel.href}
                          {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="hover:text-teal-800 hover:underline"
                        >
                          {channel.label}: {channel.value}
                        </a>
                      ))}
                    </div>
                  </div>
                </form>
              ) : (
                /* Confirmed Airport Transfer Voucher matching user specification */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm">
                        Airport Transfer Booking Confirmed!
                      </h4>
                      <p className="text-xs text-emerald-800">
                        An email confirmation has been dispatched to {guestEmail} and your driver will initiate the WhatsApp arrival group.
                      </p>
                    </div>
                  </div>

                  {/* Exact message format specified in prompt */}
                  <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-800 select-all">
                    <div className="text-teal-400 font-bold">
                      GQTravel-Hotels.com | Airport Transfer Booking Confirmed
                    </div>
                    <div>Dear {guestName || 'Guest'},</div>
                    <div className="text-slate-300">
                      Your airport transfer booking is confirmed! Thank you for choosing GQ Travel &amp; Hotels.
                    </div>
                    <div className="pt-2 text-slate-200">
                      ✈️ Service: Private Airport Transfer<br />
                      📍 Pickup Location: {route.from}<br />
                      🏁 Destination: {route.to}<br />
                      📅 Transfer Date: {transferDate}<br />
                      🕒 Pickup Time: {transferTime}<br />
                      ✈️ Flight Number: {flightNumber || 'N/A'}<br />
                      👥 Passengers: {passengers}<br />
                      🧳 Luggage: {luggage}<br />
                      🔖 Booking Number: {confirmedBookingNo}<br />
                      {contactChannels.map((channel) => (
                        <React.Fragment key={channel.label}>{channel.label}: {channel.value}<br /></React.Fragment>
                      ))}
                      ✉️ Email: {guestEmail}
                    </div>
                    <div className="pt-2 text-teal-300 text-[11px]">
                      ✈️ Important Airport Pickup Information:<br />
                      Please send a message in your WhatsApp group immediately after your flight takes off to confirm that you have boarded.
                    </div>
                  </div>

                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    ← Book Another Airport Transfer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
