import { ArrowUpRight, Building2, CalendarDays, Clock3, FileText, Mail } from 'lucide-react';

import type { DataRow } from '../utils';
import { BookingTable } from '../components/BookingTable';

export function CountCard({
  label,
  value,
  hint,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  hint: string;
  icon: typeof Building2;
  color: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          <p className="mt-2 text-xs text-slate-400">{hint}</p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

export default function DashboardPage({
  dashboard,
  bookings,
  onViewBookings,
  onBookingClick,
}: {
  dashboard: { properties: number; bookings: number; pending: number; enquiries: number };
  bookings: DataRow[];
  onViewBookings: () => void;
  onBookingClick: (booking: DataRow) => void;
}) {
  return (
    <div className="space-y-7">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <CountCard label="Total properties" value={dashboard.properties} hint="Published and draft properties" icon={Building2} color="bg-teal-50 text-teal-800" />
        <CountCard label="Total bookings" value={dashboard.bookings} hint="All reservations received" icon={CalendarDays} color="bg-blue-50 text-blue-700" />
        <CountCard label="Pending bookings" value={dashboard.pending} hint="Awaiting your confirmation" icon={Clock3} color="bg-amber-50 text-amber-700" />
        <CountCard label="Contact enquiries" value={dashboard.enquiries} hint="Guest messages received" icon={Mail} color="bg-violet-50 text-violet-700" />
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div><h3 className="text-sm font-semibold text-slate-900">Recent bookings</h3><p className="mt-1 text-xs text-slate-400">The latest guest reservations</p></div>
          <button type="button" onClick={onViewBookings} className="flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950">All bookings <ArrowUpRight className="h-3.5 w-3.5" /></button>
        </div>
        <BookingTable bookings={bookings} onOpen={onBookingClick} onUpdateStatus={() => {}} compact />
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        <QuickLink icon={Building2} title="Keep your stays up to date" description="Add a new hotel or manage existing apartments." />
        <QuickLink icon={FileText} title="Refresh your website" description="Edit homepage and services content, banners, and SEO." />
      </div>
    </div>
  );
}

export function QuickLink({ icon: Icon, title, description }: { icon: typeof Building2; title: string; description: string }) {
  return <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-teal-800"><Icon className="h-5 w-5" /></span><div><h3 className="text-sm font-semibold text-slate-900">{title}</h3><p className="mt-1 text-xs text-slate-500">{description}</p></div></div>;
}
