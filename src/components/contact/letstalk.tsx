import React, { useState } from 'react';
import { brandTint, btnOutline, btnPrimary } from '../service/shared';
import { supabase } from '../../lib/supabase';
import { HomeContent, contactPageContentDefaults, homeContentValue } from '../../lib/homeContent';
import { contactChannels, GERMANY_WHATSAPP } from '../../lib/contactChannels';

// Replace with the real Google Maps profile link of GQ Travel & Hotels when you have it.
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=GQ+Travel+%26+Hotels+Saarbr%C3%BCcken';

const LetsTalk: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const whatsappNumber = GERMANY_WHATSAPP.value.replace(/\D/g, '');
  const serviceOptions = [
    ['Flights', 'contact_service_flights'],
    ['Hotels', 'contact_service_hotels'],
    ['Holiday packages', 'contact_service_holidays'],
    ['Airport transfers', 'contact_service_transfers'],
    ['Visa assistance', 'contact_service_visa'],
    ['Medical tourism', 'contact_service_medical'],
    ['Corporate travel', 'contact_service_corporate'],
    ['Other', 'contact_service_other'],
  ] as const;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const phone = String(formData.get('phone') ?? '');
    const service = String(formData.get('service') ?? '');
    const note = String(formData.get('message') ?? '');
    const message = [
      'Hello GQ Travel & Hotels, I would like to request a consultation.',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Service: ${service || 'Not specified'}`,
      `Message: ${note}`,
    ].join('\n');

    setSubmitError('');
    setSubmitSuccess(false);
    setWhatsappUrl('');
    if (!supabase) {
      setSubmitError('The enquiry inbox is unavailable right now. Please contact us by email or WhatsApp.');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name,
        email,
        phone,
        subject: service || 'Website consultation',
        message: note,
      });
      if (error) throw error;
      setWhatsappUrl(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
      setSubmitSuccess(true);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
          ? error.message
          : 'Unexpected error';
      setSubmitError(`${homeContentValue(content, 'contact_submit_error', contactPageContentDefaults.contact_submit_error)} ${message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
  <section className={`${brandTint} py-16 lg:py-24`}>
    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:px-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{homeContentValue(content, 'contact_talk_title', contactPageContentDefaults.contact_talk_title)}</h2>
        <p className="mt-3 text-xl font-semibold text-gray-900">{homeContentValue(content, 'contact_talk_subtitle', contactPageContentDefaults.contact_talk_subtitle)}</p>
        <p className="mt-3 max-w-md leading-relaxed text-gray-700">
          {homeContentValue(content, 'contact_talk_description', contactPageContentDefaults.contact_talk_description)}
        </p>

        <a href={homeContentValue(content, 'contact_maps_url', GOOGLE_MAPS_URL)} target="_blank" rel="noopener noreferrer" className={`${btnOutline} mt-6`}>
          {homeContentValue(content, 'contact_maps_label', contactPageContentDefaults.contact_maps_label)}
        </a>

        <ul className="mt-8 space-y-3">
          {contactChannels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.437_0.078_188.216)]"
              >
                <span className="block text-sm font-medium text-gray-500">{channel.label}</span>
                <span className="mt-1 block break-all font-semibold text-[oklch(0.437_0.078_188.216)]">
                  {channel.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{homeContentValue(content, 'contact_form_title', contactPageContentDefaults.contact_form_title)}</h3>
          <p className="mt-2 text-sm text-gray-600">{homeContentValue(content, 'contact_form_required_note', contactPageContentDefaults.contact_form_required_note)}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            {homeContentValue(content, 'contact_name_label', contactPageContentDefaults.contact_name_label)}
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[oklch(0.437_0.078_188.216)] focus:ring-2 focus:ring-[oklch(0.437_0.078_188.216)]/20"
              placeholder={homeContentValue(content, 'contact_name_placeholder', contactPageContentDefaults.contact_name_placeholder)}
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {homeContentValue(content, 'contact_email_field_label', contactPageContentDefaults.contact_email_field_label)}
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[oklch(0.437_0.078_188.216)] focus:ring-2 focus:ring-[oklch(0.437_0.078_188.216)]/20"
              placeholder={homeContentValue(content, 'contact_email_placeholder', contactPageContentDefaults.contact_email_placeholder)}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-700">
            {homeContentValue(content, 'contact_phone_field_label', contactPageContentDefaults.contact_phone_field_label)}
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[oklch(0.437_0.078_188.216)] focus:ring-2 focus:ring-[oklch(0.437_0.078_188.216)]/20"
              placeholder={homeContentValue(content, 'contact_phone_placeholder', contactPageContentDefaults.contact_phone_placeholder)}
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {homeContentValue(content, 'contact_service_label', contactPageContentDefaults.contact_service_label)}
            <select
              name="service"
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[oklch(0.437_0.078_188.216)] focus:ring-2 focus:ring-[oklch(0.437_0.078_188.216)]/20"
            >
              <option value="">{homeContentValue(content, 'contact_service_placeholder', contactPageContentDefaults.contact_service_placeholder)}</option>
              {serviceOptions.map(([value, key]) => (
                <option key={value} value={value}>{homeContentValue(content, key, contactPageContentDefaults[key])}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm font-medium text-gray-700">
          {homeContentValue(content, 'contact_message_label', contactPageContentDefaults.contact_message_label)}
          <textarea
            name="message"
            required
            rows={5}
            className="mt-2 w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[oklch(0.437_0.078_188.216)] focus:ring-2 focus:ring-[oklch(0.437_0.078_188.216)]/20"
            placeholder={homeContentValue(content, 'contact_message_placeholder', contactPageContentDefaults.contact_message_placeholder)}
          />
        </label>

        {submitError && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{submitError}</p>}
        {submitSuccess && (
          <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <p>Your enquiry was saved and is now available in the Admin Enquiries inbox.</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-lg bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900"
            >
              Continue in WhatsApp
            </a>
          </div>
        )}
        <button type="submit" disabled={saving} className={`${btnPrimary} disabled:cursor-wait disabled:opacity-60`}>
          {saving
            ? homeContentValue(content, 'contact_saving_button', contactPageContentDefaults.contact_saving_button)
            : homeContentValue(content, 'contact_submit_button', contactPageContentDefaults.contact_submit_button)}
        </button>
        <p className="text-xs leading-relaxed text-gray-500">
          {homeContentValue(content, 'contact_submit_note', contactPageContentDefaults.contact_submit_note)}
        </p>
      </form>
    </div>
  </section>
  );
};

export default LetsTalk;