import { X } from 'lucide-react';

import type { DataRow } from '../utils';
import { asText, formatDate, fullName } from '../utils';

export function BookingDetail({ booking, onClose }: { booking: DataRow; onClose: () => void }) {
  const relatedProperty =
    typeof booking.properties === 'object' && booking.properties !== null
      ? booking.properties as DataRow
      : {};
  const propertyCode = asText(relatedProperty.property_code || booking.property_code);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-detail-title">
      <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 p-6"><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-800">Reservation details</p><h2 id="booking-detail-title" className="mt-2 font-display text-xl font-semibold text-slate-900">{fullName(booking)}</h2><p className="mt-1 text-xs text-slate-500">Booking ID: <span className="font-mono font-semibold text-teal-900">{asText(booking.booking_number) || 'Not assigned — run the booking ID migration'}</span></p></div><button type="button" onClick={onClose} aria-label="Close details" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button></div>
        <div className="grid gap-3 p-6 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Property ID</p>
            <p className="mt-1 break-words font-mono text-sm font-semibold text-teal-900">
              {propertyCode || 'Not assigned — run the property ID migration'}
            </p>
          </div>
          {Object.entries(booking).filter(([key, value]) => value !== null && !['id', 'property_id', 'property_code'].includes(key) && typeof value !== 'object').map(([key, value]) => (
            <div key={key} className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{key.replaceAll('_', ' ')}</p><p className="mt-1 break-words text-sm text-slate-800">{key.includes('date') || key.includes('check') ? formatDate(value) : asText(value) || '—'}</p></div>
          ))}
        </div>
        <div className="flex justify-end border-t border-slate-100 p-5"><button type="button" onClick={onClose} className="rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900">Done</button></div>
      </section>
    </div>
  );
}
