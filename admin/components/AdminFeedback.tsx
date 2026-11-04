import { AlertCircle, Building2 } from 'lucide-react';

export function InlineAlert({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-800">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function EmptyState({ busy, icon: Icon, title, detail }: { busy: boolean; icon: typeof Building2; title: string; detail: string }) {
  return <div className="grid min-h-56 place-items-center px-5 py-10 text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Icon className="h-5 w-5" /></span><h3 className="mt-3 text-sm font-semibold text-slate-800">{busy ? 'Loading records…' : title}</h3><p className="mt-1 text-xs text-slate-400">{busy ? 'This should only take a moment.' : detail}</p></div></div>;
}
