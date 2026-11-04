import type { DataRow } from '../utils';
import { asText, emailAddress, formatDate, fullName, statusClass } from '../utils';

export function BookingTable({
  bookings,
  onOpen,
  onUpdateStatus,
  compact = false,
}: {
  bookings: DataRow[];
  onOpen: (booking: DataRow) => void;
  onUpdateStatus: (booking: DataRow, status: string) => void;
  compact?: boolean;
}) {
  return (
    <table className="w-full min-w-[900px] text-left text-sm">
      <thead className="bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400"><tr><th className="px-5 py-3">Booking ID</th><th className="px-4 py-3">Guest</th><th className="px-4 py-3">Property</th><th className="px-4 py-3">Stay</th><th className="px-4 py-3">Status</th><th className="px-5 py-3 text-right">Details</th></tr></thead>
      <tbody className="divide-y divide-slate-100">
        {bookings.map((booking, index) => (
          <tr key={asText(booking.id) || index} className="hover:bg-slate-50/60">
            <td className="px-5 py-3.5 font-mono text-xs font-semibold text-teal-900">{asText(booking.booking_number) || 'Run booking ID migration'}</td>
            <td className="px-5 py-3.5"><p className="text-xs font-semibold text-slate-800">{fullName(booking)}</p><p className="mt-1 text-[11px] text-slate-400">{emailAddress(booking) || asText(booking.customer_phone || booking.phone) || 'Contact not provided'}</p></td>
            <td className="max-w-[180px] px-4 py-3.5 text-xs text-slate-600">
              <p className="truncate">{bookingPropertyName(booking) || '—'}</p>
              <p className="mt-1 font-mono text-[10px] text-teal-800">{bookingPropertyCode(booking) || 'Property ID not assigned'}</p>
            </td>
            <td className="px-4 py-3.5 text-xs text-slate-600">{formatDate(booking.check_in || booking.checkin || booking.start_date)}{!compact && <span className="text-slate-400"> → {formatDate(booking.check_out || booking.checkout || booking.end_date)}</span>}</td>
            <td className="px-4 py-3.5">
              {compact ? <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${statusClass(booking.booking_status || booking.status)}`}>{asText(booking.booking_status || booking.status) || 'Pending'}</span> : (
                <select value={asText(booking.booking_status || booking.status).toLowerCase() || 'pending'} onChange={(event) => onUpdateStatus(booking, event.target.value)} className={`rounded-full border-0 px-2.5 py-1.5 text-[10px] font-semibold capitalize ${statusClass(booking.booking_status || booking.status)}`}>
                  {['pending', 'confirmed', 'cancelled', 'completed'].map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              )}
            </td>
            <td className="px-5 py-3.5 text-right"><button type="button" onClick={() => onOpen(booking)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-50">View</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function bookingPropertyName(booking: DataRow) {
  const relatedProperty = booking.properties;
  if (typeof relatedProperty === 'object' && relatedProperty !== null && 'name' in relatedProperty) {
    return asText(relatedProperty.name);
  }
  return asText(booking.property_name || booking.property || booking.hotel_name || booking.property_id);
}

function bookingPropertyCode(booking: DataRow) {
  const relatedProperty = booking.properties;
  if (typeof relatedProperty === 'object' && relatedProperty !== null && 'property_code' in relatedProperty) {
    return asText(relatedProperty.property_code);
  }
  return asText(booking.property_code);
}
