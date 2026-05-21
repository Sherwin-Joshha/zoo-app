'use client';

import { Ticket, Map, Bird, Info, QrCode, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

export default function VisitorDashboard() {
  const [userName, setUserName] = useState('');
  const [upcomingTickets, setUpcomingTickets] = useState<any[]>([]);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(c => c.trim().startsWith('auth-token='));
    setUserName('Visitor'); // Fallback

    fetch('/api/tickets/my-tickets')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const now = new Date();
          now.setHours(0,0,0,0);
          const upcoming = data.tickets.filter((t: any) => new Date(t.visit_date) >= now && t.status === 'valid').slice(0, 2);
          setUpcomingTickets(upcoming);
        }
      });
  }, []);

  const animalFact = "A group of flamingos is called a 'flamboyance'!";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-900 rounded-[2.5rem] p-10 md:p-14 text-white shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none scale-150 -translate-y-1/4 translate-x-1/4">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
        </div>
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter drop-shadow-md">Welcome back, {userName}!</h1>
          <p className="text-emerald-100 text-xl max-w-xl font-medium">Ready for another wild adventure? Manage your tickets, explore the map, and discover fascinating animals.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <Link href="/visitor/tickets">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-emerald-800 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-shadow text-lg"
            >
              Book Tickets <ArrowRight size={20} />
            </motion.div>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Quick Actions & Highlights */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-2 space-y-10">
          
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-green-500 rounded-full inline-block"></span> Quick Access
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { name: 'Tickets', icon: Ticket, color: 'text-green-600', bg: 'bg-green-100', href: '/visitor/tickets' },
                { name: 'Zoo Map', icon: Map, color: 'text-blue-600', bg: 'bg-blue-100', href: '/visitor/map' },
                { name: 'Animals', icon: Bird, color: 'text-amber-600', bg: 'bg-amber-100', href: '/visitor/animals' },
                { name: 'Safety', icon: Info, color: 'text-red-600', bg: 'bg-red-100', href: '/visitor/safety' }
              ].map((item, i) => (
                <Link href={item.href} key={i}>
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center group h-full"
                  >
                    <div className={`p-4 ${item.bg} ${item.color} rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner shadow-white`}>
                      <item.icon size={28} strokeWidth={2.5} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full inline-block"></span> Zoo Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-lg flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="relative z-10">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Species</p>
                  <p className="text-5xl font-black">50+</p>
                </div>
                <Bird size={64} className="text-slate-700/50 relative z-10" />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-[2rem] shadow-lg flex items-center justify-between relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
                <div className="relative z-10">
                  <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-2">Immersive Zones</p>
                  <p className="text-5xl font-black">5</p>
                </div>
                <Map size={64} className="text-indigo-400/50 relative z-10" />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-2 bg-gradient-to-r from-amber-100 to-orange-50 border border-amber-200/50 p-8 rounded-[2rem] shadow-sm flex items-start gap-4">
                <span className="text-3xl filter drop-shadow-md">💡</span> 
                <div>
                  <p className="text-amber-900 font-bold mb-1 text-lg">Animal Fact of the Day</p>
                  <p className="text-amber-800/80 font-medium text-lg">{animalFact}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Column: Upcoming Tickets */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 space-y-6"
        >
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="w-2 h-8 bg-amber-500 rounded-full inline-block"></span> Your Visits
          </h2>
          
          {upcomingTickets.length === 0 ? (
            <div className="bg-white p-10 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Ticket className="text-slate-300" size={40} />
              </div>
              <p className="text-slate-500 font-bold text-lg mb-6">No upcoming visits.</p>
              <Link href="/visitor/tickets">
                <motion.button whileHover={{ scale: 1.05 }} className="px-6 py-3 bg-green-50 text-green-700 font-bold rounded-xl hover:bg-green-100 transition-colors">
                  Book a ticket now &rarr;
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {upcomingTickets.map((t: any) => (
                <motion.div 
                  whileHover={{ y: -4 }}
                  key={t.id} 
                  className="bg-white p-7 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-green-400 to-emerald-600"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Visit Date</p>
                      <p className="text-xl font-black text-slate-900">
                        {new Date(t.visit_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Guests</p>
                      <p className="font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-lg">{t.adult_count} Adults, {t.child_count} Kids</p>
                    </div>
                  </div>
                  <div className="pt-5 border-t border-slate-100 border-dashed flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Ticket ID</p>
                      <p className="font-mono text-sm font-bold text-slate-800">{t.ticket_id.split('-')[0]}</p>
                    </div>
                    <Link href="/visitor/tickets" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-md">
                      <QrCode size={16} /> View Pass
                    </Link>
                  </div>
                </motion.div>
              ))}
              {upcomingTickets.length > 0 && (
                <Link href="/visitor/tickets" className="block w-full text-center py-4 bg-white hover:bg-slate-50 text-sm font-bold text-slate-600 rounded-2xl transition-colors border border-slate-200 shadow-sm hover:shadow-md">
                  View all tickets &rarr;
                </Link>
              )}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
