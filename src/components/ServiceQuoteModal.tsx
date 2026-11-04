import React, { useState } from 'react';
import { X, Send, CheckCircle2, Plane, FileCheck, HeartPulse, Briefcase, MessageSquare, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { contactChannels, GERMANY_WHATSAPP } from '../lib/contactChannels';

interface ServiceQuoteModalProps {
  serviceId: string | null;
  onClose: () => void;
}

export const ServiceQuoteModal: React.FC<ServiceQuoteModalProps> = ({ serviceId, onClose }) => {
  if (!serviceId) return null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [saving, setSaving] = useState(false);

  // Service specific states
  const [departureDate, setDepartureDate] = useState('2026-11-15');
  const [origin, setOrigin] = useState('Saarbrücken (SCN) / Frankfurt (FRA)');
  const [destination, setDestination] = useState(
    serviceId === 'ghana-visa' ? 'Accra, Ghana' : 'Paris Le Bourget (LBG)'
  );
  const [jetCategory, setJetCategory] = useState('Mid-Size Jet (7-8 Passengers)');
  const [urgency72h, setUrgency72h] = useState(true);
  const [preferredHospitalLanguage, setPreferredHospitalLanguage] = useState('English & Twi');

  const getServiceInfo = () => {
    switch (serviceId) {
      case 'private-jet':
        return {
          title: 'Request Private Jet Charter Quote',
          tagline: 'Luxury, Privacy & Flexible Flight Scheduling',
          icon: Plane,
          buttonText: 'Submit Private Jet Request'
        };
      case 'ghana-visa':
        return {
          title: 'Ghana e-Visa Express Assistance (72h)',
          tagline: 'Flying to Ghana Within 72 Hours? Get Immediate Guidance!',
          icon: FileCheck,
          buttonText: 'Request Urgent Visa Assistance'
        };
      case 'medical-tourism':
        return {
          title: 'Medical Treatment in Germany Coordination',
          tagline: 'Hospital Liaison, Appointments, Visas & Saarbrücken Lodging',
          icon: HeartPulse,
          buttonText: 'Submit Medical Treatment Request'
        };
      case 'corporate-travel':
        return {
          title: 'Corporate Travel Management Quote',
          tagline: 'Simplify Business Travel, Flights, Rail & DB Tickets',
          icon: Briefcase,
          buttonText: 'Request Corporate Travel Proposal'
        };
      default:
        return {
          title: 'Travel Services Inquiry',
          tagline: 'Personalized Travel Solutions',
          icon: Plane,
          buttonText: 'Submit Inquiry'
        };
    }
  };

  const info = getServiceInfo();
  const Icon = info.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!supabase) {
      setSubmitError('The enquiry inbox is unavailable right now. Please contact us by email or WhatsApp.');
      return;
    }

    setSaving(true);
    try {
      const serviceDetails = [
        `Service: ${info.title}`,
        `Departure date: ${departureDate}`,
        `From: ${origin}`,
        `To: ${destination}`,
        `Aircraft: ${jetCategory}`,
        `Urgent (72 hours): ${urgency72h ? 'Yes' : 'No'}`,
        `Hospital language: ${preferredHospitalLanguage}`,
        `Details: ${notes}`,
      ].join('\n');
      const { error } = await supabase.from('contact_messages').insert({
        name: fullName,
        email,
        phone,
        subject: info.title,
        message: serviceDetails,
      });
      if (error) throw error;
      setIsSent(true);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
          ? error.message
          : 'Unexpected error';
      setSubmitError(`We could not save your request. Please try again or contact us directly. ${message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSent ? (
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {info.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{info.tagline}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{submitError}</p>}
              {/* Specific inputs for Private Jet */}
              {serviceId === 'private-jet' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Departure Airport</label>
                      <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Arrival Destination</label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Aircraft Category</label>
                    <select
                      value={jetCategory}
                      onChange={(e) => setJetCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option>Light Jet (4-6 Passengers)</option>
                      <option>Mid-Size Jet (7-8 Passengers)</option>
                      <option>Heavy Long-Range Jet (10-14 Passengers)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Specific inputs for Ghana e-Visa */}
              {serviceId === 'ghana-visa' && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <FileCheck className="w-4 h-4 text-amber-600" />
                    <span>Flying to Ghana within 72 hours? Fast-Track Assistance</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Send us your travel itinerary, passport copy, and contact number. Our team in Saarbrücken and Accra will expedite document verification.
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-amber-900">
                    <input
                      type="checkbox"
                      checked={urgency72h}
                      onChange={(e) => setUrgency72h(e.target.checked)}
                      className="rounded-sm text-teal-800"
                    />
                    <span>Yes, I require urgent 72-hour processing</span>
                  </label>
                </div>
              )}

              {/* Specific inputs for Medical Tourism */}
              {serviceId === 'medical-tourism' && (
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3 text-xs">
                  <div className="font-bold text-teal-950">
                    Medical Coordination &amp; Translation Support
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    We coordinate appointments at leading German university clinics and hospitals, arrange medical visas, accommodation in Saarbrücken, and provide English, German, and Twi translation.
                  </p>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Preferred Translation Support</label>
                    <select
                      value={preferredHospitalLanguage}
                      onChange={(e) => setPreferredHospitalLanguage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option>English &amp; German</option>
                      <option>English, German &amp; Twi (Ghana)</option>
                      <option>German Only</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-teal-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-teal-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 1521 485 2424"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-teal-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Travel Details &amp; Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide any specific dates, passenger counts, or questions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-teal-800"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-98 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-60"
                >
                  {saving ? <span>Saving request…</span> : <><Send className="w-4 h-4" /><span>{info.buttonText}</span></>}
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 pt-1 text-[11px] text-slate-600">
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
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Request Received!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Thank you, {fullName}. Our specialized coordinator has received your inquiry for <strong>{info.title}</strong> and will contact you using the details you provided.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-sm mx-auto">
              <div>Urgent matter? Message us immediately:</div>
              <a
                href={`${GERMANY_WHATSAPP.href}?text=${encodeURIComponent(`Hello GQ Travel, I just submitted an inquiry for ${info.title} (Name: ${fullName}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-teal-800 text-white rounded-lg font-semibold hover:bg-teal-900 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
