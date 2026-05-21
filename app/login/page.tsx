'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, ShieldAlert, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPassword, setVisitorPassword] = useState('');
  const [visitorLoading, setVisitorLoading] = useState(false);
  const [visitorError, setVisitorError] = useState('');

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  const handleLogin = async (
    e: React.FormEvent,
    role: 'visitor' | 'admin'
  ) => {
    e.preventDefault();
    const email = role === 'visitor' ? visitorEmail : adminEmail;
    const password = role === 'visitor' ? visitorPassword : adminPassword;
    const setLoading = role === 'visitor' ? setVisitorLoading : setAdminLoading;
    const setError = role === 'visitor' ? setVisitorError : setAdminError;
    const successRedirect = role === 'visitor' ? '/visitor/dashboard' : '/admin/dashboard';

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to login');
      } else {
        router.push(successRedirect);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Visitor Login Panel */}
      <div className="flex flex-1 flex-col justify-center bg-green-50 px-8 py-12 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center gap-3 text-green-700 mb-8">
            <Leaf size={40} />
            <h2 className="text-3xl font-bold tracking-tight">Visitor Access</h2>
          </div>
          
          <p className="mb-8 text-green-800/80">
            Sign in to manage your tickets, explore the map, and learn about our amazing animals.
          </p>

          {visitorError && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
              {visitorError}
            </div>
          )}

          <form onSubmit={(e) => handleLogin(e, 'visitor')} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-green-900 mb-2">Email address</label>
              <input
                type="email"
                required
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 text-green-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                placeholder="visitor@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-900 mb-2">Password</label>
              <input
                type="password"
                required
                value={visitorPassword}
                onChange={(e) => setVisitorPassword(e.target.value)}
                className="w-full rounded-lg border border-green-200 bg-white px-4 py-3 text-green-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={visitorLoading}
              className="w-full rounded-lg bg-green-600 px-4 py-3 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/30 disabled:opacity-70 transition-all flex justify-center items-center gap-2"
            >
              {visitorLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In as Visitor'}
            </button>
          </form>
        </div>
      </div>

      {/* Admin Login Panel */}
      <div className="flex flex-1 flex-col justify-center bg-slate-900 px-8 py-12 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center gap-3 text-slate-100 mb-8">
            <ShieldAlert size={40} className="text-blue-500" />
            <h2 className="text-3xl font-bold tracking-tight">Staff & Admin</h2>
          </div>
          
          <p className="mb-8 text-slate-400">
            Secure login for zoo management, veterinarians, and security personnel.
          </p>

          {adminError && (
            <div className="mb-4 rounded-md bg-red-950 p-4 text-sm text-red-400 border border-red-900">
              {adminError}
            </div>
          )}

          <form onSubmit={(e) => handleLogin(e, 'admin')} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Employee Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="admin@zoo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={adminLoading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-70 transition-all flex justify-center items-center gap-2"
            >
              {adminLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In as Staff'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
