'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Leaf, LogOut, LayoutDashboard, Map, Ticket, ShieldAlert, Phone, Bird } from 'lucide-react';

export default function VisitorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const navLinks = [
    { name: 'Dashboard', href: '/visitor/dashboard', icon: LayoutDashboard },
    { name: 'Animals', href: '/visitor/animals', icon: Bird },
    { name: 'Map', href: '/visitor/map', icon: Map },
    { name: 'Tickets', href: '/visitor/tickets', icon: Ticket },
    { name: 'Safety', href: '/visitor/safety', icon: ShieldAlert },
    { name: 'Contact', href: '/visitor/contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col">

      {/* Top Navbar */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200/70 sticky top-0 z-40 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <Link href="/visitor/dashboard" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-2 rounded-xl text-white shadow-md shadow-green-500/25 group-hover:shadow-green-500/40 transition-shadow">
                <Leaf size={20} strokeWidth={2.5} />
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-lg text-slate-900 tracking-tight group-hover:text-green-700 transition-colors">WildTrails</span>
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-[0.12em] block leading-none -mt-0.5">Zoo & Wildlife</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-green-700 bg-green-50'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={15} />
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-green-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
            >
              <LogOut size={15} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden border-t border-slate-100 bg-white overflow-x-auto">
          <div className="flex items-stretch px-2 py-1.5 gap-0.5">
            {navLinks.map(link => {
              const isActive = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl text-[10px] font-bold min-w-[64px] transition-all ${
                    isActive
                      ? 'text-green-700 bg-green-50'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={17} />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 p-6 sm:p-8 min-h-[calc(100vh-10rem)]">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/60 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf size={16} className="text-green-500" />
            <span className="font-bold text-sm text-slate-700">WildTrails Zoo</span>
          </div>
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} WildTrails Zoo Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
