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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo area */}
            <Link href="/visitor/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-green-600 p-2 rounded-lg text-white">
                <Leaf size={24} />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">WildTrails Zoo</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(link => {
                const isActive = pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-green-50 text-green-700' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={16} />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Logout */}
            <div className="flex items-center">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

          </div>
        </div>
        
        {/* Mobile Nav Links (horizontal scrollable) */}
        <div className="md:hidden border-t border-slate-100 overflow-x-auto">
          <div className="flex items-center p-2 space-x-1">
            {navLinks.map(link => {
              const isActive = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-medium transition-colors min-w-[72px] ${
                    isActive 
                      ? 'bg-green-50 text-green-700' 
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} className="mb-1" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf size={20} className="text-green-600" />
            <span className="font-bold text-lg text-slate-800">WildTrails Zoo</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} WildTrails Zoo Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
