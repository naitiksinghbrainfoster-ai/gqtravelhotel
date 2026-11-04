import { CalendarDays } from 'lucide-react';

import type { DataRow } from '../utils';
import { asText, emailAddress, formatDate, fullName, statusClass } from '../utils';
import { EmptyState } from '../components/AdminFeedback';
import { BookingTable } from '../components/BookingTable';

export default function BookingsPage({
  bookings,
  busy,
  onOpen,
  onUpdateStatus,
}: {
  bookings: DataRow[];
  busy: boolean;
  onOpen: (booking: DataRow) => void;
  onUpdateStatus: (booking: DataRow, status: string) => void;
}) {
  return <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h3 className="text-sm font-semibold text-slate-900">All bookings</h3><p className="mt-1 text-xs text-slate-400">Select a reservation to review its details and guest information.</p></div><div className="overflow-x-auto"><BookingTable bookings={bookings} onOpen={onOpen} onUpdateStatus={onUpdateStatus} />{bookings.length === 0 && <EmptyState busy={busy} icon={CalendarDays} title="No bookings found" detail="New reservations will appear here." />}</div></section>;
}
