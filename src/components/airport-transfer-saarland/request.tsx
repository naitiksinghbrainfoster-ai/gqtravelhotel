import React, { useState } from 'react';
import { ArrowRight, Car, CheckCircle2, Mail } from 'lucide-react';
import { HomeContent, airportTransfersContentDefaults, homeContentValue } from '../../lib/homeContent';
import { contactChannels, HOTEL_EMAIL } from '../../lib/contactChannels';

const serviceKeys = [1, 2, 3, 4, 5, 6].map((number) => `airport_transfers_service_${number}`);

const AirportTransferRequest: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = homeContentValue(content, 'airport_transfers_email_subject', airportTransfersContentDefaults.airport_transfers_email_subject);
    const body = [
      homeContentValue(content, 'airport_transfers_email_heading', airportTransfersContentDefaults.airport_transfers_email_heading),
      '',
      `${homeContentValue(content, 'airport_transfers_email_pickup', airportTransfersContentDefaults.airport_transfers_email_pickup)}: ${pickup}`,
      `${homeContentValue(content, 'airport_transfers_email_destination', airportTransfersContentDefaults.airport_transfers_email_destination)}: ${destination}`,
      `${homeContentValue(content, 'airport_transfers_email_date', airportTransfersContentDefaults.airport_transfers_email_date)}: ${travelDate}`,
      `${homeContentValue(content, 'airport_transfers_email_passengers', airportTransfersContentDefaults.airport_transfers_email_passengers)}: ${passengers}`,
      `${homeContentValue(content, 'airport_transfers_email_name', airportTransfersContentDefaults.airport_transfers_email_name)}: ${name}`,
      `${homeContentValue(content, 'airport_transfers_email_email', airportTransfersContentDefaults.airport_transfers_email_email)}: ${email}`,
      `${homeContentValue(content, 'airport_transfers_email_phone', airportTransfersContentDefaults.airport_transfers_email_phone)}: ${phone || homeContentValue(content, 'airport_transfers_email_phone_empty', airportTransfersContentDefaults.airport_transfers_email_phone_empty)}`,
    ].join('\n');

    window.location.href = `${HOTEL_EMAIL.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">
            {homeContentValue(content, 'airport_transfers_request_eyebrow', airportTransfersContentDefaults.airport_transfers_request_eyebrow)}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {homeContentValue(content, 'airport_transfers_request_title', airportTransfersContentDefaults.airport_transfers_request_title)}
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            {homeContentValue(content, 'airport_transfers_request_description', airportTransfersContentDefaults.airport_transfers_request_description)}
          </p>

          <ul className="mt-8 space-y-4">
            {serviceKeys.map((key) => (
              <li key={key} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                <span>{homeContentValue(content, key, airportTransfersContentDefaults[key])}</span>
              </li>
            ))}
          </ul>

          <a
            href={`${HOTEL_EMAIL.href}?subject=${encodeURIComponent(homeContentValue(content, 'airport_transfers_email_subject', airportTransfersContentDefaults.airport_transfers_email_subject))}`}
            className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-800 hover:text-teal-950"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            {HOTEL_EMAIL.value}
          </a>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
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
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
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

        <div id="airport-transfer-request" className="scroll-mt-28 lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-800">
                <Car aria-hidden="true" className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{homeContentValue(content, 'airport_transfers_form_title', airportTransfersContentDefaults.airport_transfers_form_title)}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {homeContentValue(content, 'airport_transfers_form_description', airportTransfersContentDefaults.airport_transfers_form_description)}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="transfer-pickup" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    {homeContentValue(content, 'airport_transfers_pickup_label', airportTransfersContentDefaults.airport_transfers_pickup_label)}
                  </label>
                  <input
                    id="transfer-pickup"
                    required
                    autoComplete="street-address"
                    value={pickup}
                    onChange={(event) => setPickup(event.target.value)}
                    placeholder={homeContentValue(content, 'airport_transfers_pickup_placeholder', airportTransfersContentDefaults.airport_transfers_pickup_placeholder)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                  />
                </div>
                <div>
                  <label htmlFor="transfer-destination" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    {homeContentValue(content, 'airport_transfers_destination_label', airportTransfersContentDefaults.airport_transfers_destination_label)}
                  </label>
                  <input
                    id="transfer-destination"
                    required
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                    placeholder={homeContentValue(content, 'airport_transfers_destination_placeholder', airportTransfersContentDefaults.airport_transfers_destination_placeholder)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="transfer-date" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    {homeContentValue(content, 'airport_transfers_date_label', airportTransfersContentDefaults.airport_transfers_date_label)}
                  </label>
                  <input
                    id="transfer-date"
                    type="date"
                    required
                    value={travelDate}
                    onChange={(event) => setTravelDate(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                  />
                </div>
                <div>
                  <label htmlFor="transfer-passengers" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    {homeContentValue(content, 'airport_transfers_passengers_label', airportTransfersContentDefaults.airport_transfers_passengers_label)}
                  </label>
                  <input
                    id="transfer-passengers"
                    type="number"
                    min="1"
                    max="99"
                    required
                    value={passengers}
                    onChange={(event) => setPassengers(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="transfer-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    {homeContentValue(content, 'airport_transfers_name_label', airportTransfersContentDefaults.airport_transfers_name_label)}
                  </label>
                  <input
                    id="transfer-name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                  />
                </div>
                <div>
                  <label htmlFor="transfer-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                    {homeContentValue(content, 'airport_transfers_email_label', airportTransfersContentDefaults.airport_transfers_email_label)}
                  </label>
                  <input
                    id="transfer-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="transfer-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {homeContentValue(content, 'airport_transfers_phone_label', airportTransfersContentDefaults.airport_transfers_phone_label)} <span className="font-normal text-slate-500">{homeContentValue(content, 'airport_transfers_optional_label', airportTransfersContentDefaults.airport_transfers_optional_label)}</span>
                </label>
                <input
                  id="transfer-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-3.5 font-bold text-white transition-colors hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:w-auto"
              >
                {homeContentValue(content, 'airport_transfers_submit_button', airportTransfersContentDefaults.airport_transfers_submit_button)}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
              <p className="text-xs leading-5 text-slate-500">
                {homeContentValue(content, 'airport_transfers_submit_note', airportTransfersContentDefaults.airport_transfers_submit_note)}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirportTransferRequest;
