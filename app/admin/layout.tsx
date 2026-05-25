'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Ticket, Users, CalendarDays, IndianRupee, LogOut, Menu, X, Leaf, PawPrint } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    setAdminName('Admin User');
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const navLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, color: 'text-blue-400' },
    { name: 'Tickets', href: '/admin/tickets', icon: Ticket, color: 'text-green-400' },
    { name: 'Employees', href: '/admin/employees', icon: Users, color: 'text-purple-400' },
    { name: 'Attendance', href: '/admin/attendance', icon: CalendarDays, color: 'text-amber-400' },
    { name: 'Earnings', href: '/admin/earnings', icon: IndianRupee, color: 'text-emerald-400' },
    { name: 'Add Animal', href: '/admin/animals/add', icon: PawPrint, color: 'text-orange-400' },
  ];

  const currentPage = navLinks.find(link => pathname.startsWith(link.href));

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800/60">

      {/* Brand */}
      <div className="px-5 py-6 border-b border-slate-800/60 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-2.5 rounded-xl text-white shadow-lg shadow-green-900/40">
            <Leaf size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-green-500 leading-none mb-0.5">WildTrails</p>
            <span className="text-base font-black text-white tracking-tight">Zoo Admin</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600 px-3 mb-3">Navigation</p>
        {navLinks.map(link => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 ${isActive
                ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/10 text-white border border-green-600/30 shadow-sm'
                : 'hover:bg-slate-800/70 hover:text-white'
                }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-green-600 shadow-md shadow-green-900/40' : 'bg-slate-800'
                }`}>
                <Icon size={16} className={isActive ? 'text-white' : link.color} />
              </div>
              <span className={`font-semibold text-sm ${isActive ? 'text-white' : ''}`}>{link.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin Info + Logout */}
      <div className="p-4 border-t border-slate-800/60 space-y-3">
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md flex-shrink-0">
            {adminName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{adminName}</p>
            <p className="text-[11px] text-slate-500 truncate">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 w-full rounded-xl text-slate-400 hover:bg-red-950/50 hover:text-red-400 hover:border-red-900/30 border border-transparent transition-all text-sm font-semibold"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent flex">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 z-20 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="bg-white h-16 border-b border-slate-200/70 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 -ml-1 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="hidden sm:flex items-center gap-2">
              {currentPage && (
                <>
                  <div className={`w-2 h-2 rounded-full bg-green-500`} />
                  <h1 className="text-base font-black text-slate-800 tracking-tight">
                    {currentPage.name}
                  </h1>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-bold text-slate-900 leading-tight">{adminName}</p>
              <p className="text-[11px] text-slate-400">Administrator</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md">
              {adminName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white p-6 sm:p-8 min-h-[calc(100vh-6rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
