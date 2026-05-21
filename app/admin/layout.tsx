'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Ticket, Users, CalendarDays, IndianRupee, LogOut, Menu, X, Leaf } from 'lucide-react';
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
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Tickets', href: '/admin/tickets', icon: Ticket },
    { name: 'Employees', href: '/admin/employees', icon: Users },
    { name: 'Attendance', href: '/admin/attendance', icon: CalendarDays },
    { name: 'Earnings', href: '/admin/earnings', icon: IndianRupee },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      <div className="flex items-center gap-3 px-6 py-6 bg-slate-950">
        <div className="bg-green-600 p-2 rounded-lg text-white">
          <Leaf size={24} />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Zoo Admin</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navLinks.map(link => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 fixed inset-y-0 z-20 shadow-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-slate-800 ml-2 md:ml-0 hidden sm:block">
              {navLinks.find(link => pathname.startsWith(link.href))?.name || 'Overview'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600 font-medium">Welcome, <span className="text-slate-900">{adminName}</span></div>
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm">
              {adminName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
