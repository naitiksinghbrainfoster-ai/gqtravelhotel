import { useState } from 'react';
import { BedDouble, LoaderCircle } from 'lucide-react';

import { InlineAlert } from '../../admin/components/AdminFeedback';

export default function AdminLoginPage({
  onLogin,
  error,
  loading,
}: {
  onLogin: (email: string, password: string) => Promise<void>;
  error: string;
  loading: boolean;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-800 text-white">
            <BedDouble className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-slate-900">GQ Travel & Hotels</p>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Admin portal</p>
          </div>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-800">Welcome back</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-slate-950">Sign in to your account</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Use your Supabase account. Only users with the admin role can access this panel.
        </p>

        <form
          className="mt-8 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            void onLogin(email.trim(), password);
          }}
        >
          <label className="block text-sm font-medium text-slate-700">
            Email address
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
              placeholder="you@company.com"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
              placeholder="Enter your password"
            />
          </label>
          {error && <InlineAlert message={error} />}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Sign in securely
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-400">
          Protected with Supabase authentication and role-based access.
        </p>
      </section>
    </main>
  );
}
