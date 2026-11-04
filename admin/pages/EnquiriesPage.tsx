import { Mail, MessageSquare } from 'lucide-react';

import type { DataRow } from '../utils';
import { asText, formatDate } from '../utils';
import { EmptyState } from '../components/AdminFeedback';

export default function EnquiriesPage({ enquiries, busy }: { enquiries: DataRow[]; busy: boolean }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4"><h3 className="text-sm font-semibold text-slate-900">Contact messages</h3><p className="mt-1 text-xs text-slate-400">Guest enquiries received from the website.</p></div>
      <div className="divide-y divide-slate-100">
        {enquiries.map((item, index) => (
          <article key={asText(item.id) || index} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><h4 className="text-sm font-semibold text-slate-800">{asText(item.name || item.full_name) || 'Website enquiry'}</h4><p className="mt-1 text-xs text-slate-500">{asText(item.email)} {item.phone ? `· ${asText(item.phone)}` : ''}</p></div>
              <span className="text-xs text-slate-400">{formatDate(item.created_at)}</span>
            </div>
            {Boolean(item.subject || item.message) && <div className="mt-3 rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-800">{asText(item.subject) || 'Message'}</p><p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-slate-600">{asText(item.message)}</p></div>}
            {Boolean(item.email) && <a className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950" href={`mailto:${encodeURIComponent(asText(item.email))}`}><Mail className="h-3.5 w-3.5" /> Reply by email</a>}
          </article>
        ))}
        {enquiries.length === 0 && <EmptyState busy={busy} icon={MessageSquare} title="No enquiries found" detail="Contact requests from your website will show up here." />}
      </div>
    </section>
  );
}
