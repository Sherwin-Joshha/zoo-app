'use client';

import { Ticket, Map, Bird, Info, QrCode, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

export default function VisitorDashboard() {
  const [userName, setUserName] = useState('');
  const [upcomingTickets, setUpcomingTickets] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setUserName(data.user.name);
        } else {
          setUserName('Visitor');
        }
      })
      .catch(() => setUserName('Visitor'));

    fetch('/api/tickets/my-tickets')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          const upcoming = data.tickets
            .filter((t: any) => new Date(t.visit_date) >= now && t.status === 'valid')
            .slice(0, 2);
          setUpcomingTickets(upcoming);
        }
      });
  }, []);

  const animalFact = "A group of flamingos is called a 'flamboyance'!";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

      {/* ── Welcome Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, type: 'spring', bounce: 0.35 }}
        className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-emerald-700/30 overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-6 right-6 w-24 h-24 rounded-full border border-white/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-emerald-200 text-sm font-semibold uppercase tracking-widest mb-2">Welcome Back</p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">Hello, {userName}! 👋</h1>
            <p className="text-emerald-100 text-base md:text-lg max-w-lg leading-relaxed">
              Ready for another wild adventure? Manage your tickets, explore the map, and discover amazing animals.
            </p>
          </div>
          <Link href="/visitor/tickets" className="shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-white text-emerald-800 px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-shadow"
            >
              <Ticket size={18} />
              Book Tickets <ArrowRight size={16} />
            </motion.div>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: Quick Access + Highlights ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 space-y-8"
        >
          {/* Quick Access */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
              <h2 className="text-xl font-black text-slate-900">Quick Access</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Tickets', icon: Ticket, gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50', ring: 'ring-green-100', href: '/visitor/tickets' },
                { name: 'Zoo Map', icon: Map, gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', ring: 'ring-blue-100', href: '/visitor/map' },
                { name: 'Animals', icon: Bird, gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', ring: 'ring-amber-100', href: '/visitor/animals' },
                { name: 'Safety', icon: Info, gradient: 'from-red-500 to-rose-600', bg: 'bg-red-50', ring: 'ring-red-100', href: '/visitor/safety' },
              ].map((item) => (
                <Link href={item.href} key={item.name}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group cursor-pointer h-full hover:shadow-md transition-shadow"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon size={24} className="text-white" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Zoo Highlights */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
              <h2 className="text-xl font-black text-slate-900">Zoo Highlights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Species count */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-slate-900 text-white p-7 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Species</p>
                <p className="text-5xl font-black mb-1">50<span className="text-green-400">+</span></p>
                <p className="text-slate-500 text-xs">Across 5 immersive zones</p>
                <Bird size={56} className="absolute bottom-4 right-4 text-slate-800" />
              </motion.div>

              {/* Zones */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-7 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20" />
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">Immersive Zones</p>
                <p className="text-5xl font-black mb-1">5</p>
                <p className="text-indigo-200 text-xs">Unique wildlife habitats</p>
                <Map size={56} className="absolute bottom-4 right-4 text-indigo-500/50" />
              </motion.div>

              {/* Animal Fact */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="md:col-span-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 p-6 rounded-2xl shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star size={22} className="text-amber-600" fill="currentColor" />
                </div>
                <div>
                  <p className="text-amber-900 font-bold mb-1 text-sm uppercase tracking-wider">Animal Fact of the Day</p>
                  <p className="text-amber-800 font-medium text-base leading-relaxed">&ldquo;{animalFact}&rdquo;</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: Upcoming Tickets ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
            <h2 className="text-xl font-black text-slate-900">Your Visits</h2>
          </div>

          {upcomingTickets.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center min-h-[320px]">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <Ticket className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-600 font-bold text-base mb-1">No upcoming visits</p>
              <p className="text-slate-400 text-sm mb-6">Book your first ticket today!</p>
              <Link href="/visitor/tickets">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-shadow"
                >
                  Book Tickets →
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingTickets.map((t: any) => (
                <motion.div
                  whileHover={{ y: -3 }}
                  key={t.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative group hover:shadow-md transition-shadow"
                >
                  {/* Colored top bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-400" />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Visit Date</p>
                        <p className="text-lg font-black text-slate-900">
                          {new Date(t.visit_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        VALID
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-4">{t.visitor_name}</p>
                    <div className="mb-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Guests</p>
                      <p className="text-sm font-semibold text-slate-700">{t.adult_count} Adult{t.adult_count !== 1 ? 's' : ''}, {t.child_count} Child{t.child_count !== 1 ? 'ren' : ''}</p>
                    </div>
                    <div className="pt-4 border-t border-dashed border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Ticket ID</p>
                        <p className="font-mono text-xs font-bold text-slate-700">{t.ticket_id.split('-')[0]}</p>
                      </div>
                      <Link
                        href="/visitor/tickets"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                      >
                        <QrCode size={14} /> View Pass
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
              <Link
                href="/visitor/tickets"
                className="block w-full text-center py-3.5 bg-white hover:bg-slate-50 text-sm font-bold text-slate-600 rounded-2xl transition-colors border border-slate-200 shadow-sm hover:shadow-md"
              >
                View all tickets →
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
