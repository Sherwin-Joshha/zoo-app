'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, ShieldAlert, Loader2, ArrowLeft, Eye, EyeOff, Bird, Map, Ticket, Star } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();

  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPassword, setVisitorPassword] = useState('');
  const [visitorLoading, setVisitorLoading] = useState(false);
  const [visitorError, setVisitorError] = useState('');
  const [showVisitorPw, setShowVisitorPw] = useState(false);

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [showAdminPw, setShowAdminPw] = useState(false);

  const [activeTab, setActiveTab] = useState<'visitor' | 'admin'>('visitor');

  const [isSignUp, setIsSignUp] = useState(false);
  const [visitorName, setVisitorName] = useState('');

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
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setVisitorLoading(true);
    setVisitorError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: visitorName, email: visitorEmail, password: visitorPassword, role: 'visitor' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setVisitorError(data.error || 'Failed to sign up');
      } else {
        router.push('/visitor/dashboard');
        router.refresh();
      }
    } catch {
      setVisitorError('An unexpected error occurred');
    } finally {
      setVisitorLoading(false);
    }
  };

  const handleGuest = async () => {
    setVisitorLoading(true);
    setVisitorError('');
    try {
      const res = await fetch('/api/auth/guest', { method: 'POST' });
      if (!res.ok) {
        setVisitorError('Failed to login as guest');
      } else {
        router.push('/visitor/dashboard');
        router.refresh();
      }
    } catch {
      setVisitorError('An unexpected error occurred');
    } finally {
      setVisitorLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f0f4f0]">

      {/* ── Left Hero Panel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-14">
        
        {/* CSS Animation for Panning */}
        <style>{`
          @keyframes panImage {
            0% { transform: scale(1.15) translate(2%, 2%); }
            100% { transform: scale(1.15) translate(-2%, -2%); }
          }
        `}</style>

        {/* Moving Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/jungle_background.png')",
            animation: "panImage 25s ease-in-out infinite alternate"
          }}
        />

        {/* Overlay to ensure text legibility */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

        {/* Top: Logo + back */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black text-lg leading-none">WildTrails</p>
              <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest">Zoo & Wildlife</p>
            </div>
          </div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-emerald-200 hover:text-white text-xs font-semibold transition-colors bg-white/10 hover:bg-white/15 px-3 py-2 rounded-lg border border-white/15">
            <ArrowLeft size={13} /> Home
          </Link>
        </div>

        {/* Middle: Hero content */}
        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open Today: 9AM – 6PM
            </div>
            <h1 className="text-5xl xl:text-6xl font-black text-white leading-[1.08] tracking-tight">
              Where Nature<br />
              <span className="text-emerald-300">Comes Alive.</span>
            </h1>
            <p className="mt-5 text-emerald-100/80 text-base leading-relaxed max-w-sm">
              Home to 50+ species across 5 immersive zones. Book tickets, explore the map, and plan your perfect zoo day.
            </p>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: Bird, label: '50+ Species' },
              { icon: Map, label: '5 Zones' },
              { icon: Ticket, label: 'Instant QR Tickets' },
              { icon: Star, label: 'Top Rated' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                <Icon size={14} className="text-emerald-300" />
                <span className="text-white text-xs font-semibold">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { value: '50+', label: 'Species' },
              { value: '5', label: 'Zones' },
              { value: '10K+', label: 'Visitors/mo' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-emerald-300 text-[11px] font-semibold uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom: tagline */}
        <div className="relative z-10">
          <p className="text-emerald-300/60 text-xs font-medium">© 2025 WildTrails Zoo Management System</p>
        </div>
      </div>

      {/* ── Right: Login Forms ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-10 lg:px-16 bg-white lg:rounded-l-none">

        {/* Mobile back link */}
        <div className="lg:hidden w-full max-w-md mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-black text-slate-900">WildTrails Zoo</span>
          </div>
          <Link href="/" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sign In</h2>
            <p className="text-slate-500 text-sm mt-1.5">Access your portal below</p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-8 border border-slate-200">
            <button
              onClick={() => setActiveTab('visitor')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'visitor'
                  ? 'bg-white text-green-700 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Leaf size={15} />
              Visitor
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ShieldAlert size={15} />
              Staff Portal
            </button>
          </div>

          <AnimatePresence mode="wait">

            {/* ── Visitor Form ── */}
            {activeTab === 'visitor' && (
              <motion.div
                key="visitor"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                  <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf size={17} className="text-green-700" />
                  </div>
                  <div>
                    <p className="text-green-800 font-bold text-sm">Visitor Portal</p>
                    <p className="text-green-700/80 text-xs mt-0.5 leading-relaxed">Manage tickets, explore the map, and discover our animals.</p>
                  </div>
                </div>

                {visitorError && (
                  <div className="mb-5 flex items-center gap-2.5 rounded-xl bg-red-50 p-3.5 text-sm text-red-700 border border-red-200">
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 font-black text-xs">!</span>
                    {visitorError}
                  </div>
                )}

                <form onSubmit={isSignUp ? handleSignUp : (e) => handleLogin(e, 'visitor')} className="space-y-5">
                  {isSignUp && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all text-sm"
                      placeholder="visitor@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showVisitorPw ? 'text' : 'password'}
                        required
                        value={visitorPassword}
                        onChange={(e) => setVisitorPassword(e.target.value)}
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowVisitorPw(!showVisitorPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {showVisitorPw ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={visitorLoading}
                    className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-4 text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/35 hover:from-green-500 hover:to-emerald-500 focus:outline-none focus:ring-4 focus:ring-green-500/25 disabled:opacity-60 transition-all flex justify-center items-center gap-2 mt-2"
                  >
                    {visitorLoading ? (
                      <><Loader2 className="animate-spin" size={17} /> {isSignUp ? 'Signing up...' : 'Signing in...'}</>
                    ) : (
                      isSignUp ? 'Sign Up as Visitor →' : 'Sign In as Visitor →'
                    )}
                  </button>
                  
                  <div className="flex flex-col items-center gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setVisitorError('');
                      }}
                      className="text-sm font-semibold text-green-700 hover:text-green-800 hover:underline transition-all"
                    >
                      {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                    </button>
                    
                    <div className="w-full flex items-center gap-3">
                      <div className="h-px bg-slate-200 flex-1"></div>
                      <span className="text-xs text-slate-400 font-bold uppercase">OR</span>
                      <div className="h-px bg-slate-200 flex-1"></div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleGuest}
                      disabled={visitorLoading}
                      className="w-full rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-3 text-slate-700 font-bold text-sm border border-slate-200 transition-all flex justify-center items-center gap-2"
                    >
                      Continue as Guest
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── Admin Form ── */}
            {activeTab === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-6 p-4 bg-slate-900 border border-slate-700 rounded-2xl flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/30">
                    <ShieldAlert size={17} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Staff Portal</p>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">Restricted access for zoo management and authorized personnel.</p>
                  </div>
                </div>

                {adminError && (
                  <div className="mb-5 flex items-center gap-2.5 rounded-xl bg-red-50 p-3.5 text-sm text-red-700 border border-red-200">
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 font-black text-xs">!</span>
                    {adminError}
                  </div>
                )}

                <form onSubmit={(e) => handleLogin(e, 'admin')} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Employee Email
                    </label>
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                      placeholder="admin@zoo.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showAdminPw ? 'text' : 'password'}
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminPw(!showAdminPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {showAdminPw ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={adminLoading}
                    className="w-full rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 px-4 py-4 text-white font-bold text-sm shadow-lg shadow-slate-900/30 focus:outline-none focus:ring-4 focus:ring-slate-500/25 disabled:opacity-60 transition-all flex justify-center items-center gap-2 mt-2 border border-slate-700"
                  >
                    {adminLoading ? (
                      <><Loader2 className="animate-spin" size={17} /> Signing in...</>
                    ) : (
                      'Sign In as Staff →'
                    )}
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

          <p className="text-center text-slate-400 text-xs mt-8">
            By signing in you agree to our{' '}
            <span className="text-slate-600 font-semibold cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-slate-600 font-semibold cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
