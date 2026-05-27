'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, Users, IndianRupee, Loader2, Ticket, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TicketItem = {
  id: number;
  ticket_id: string;
  adult_count: number;
  child_count: number;
  total_price: string;
  visit_date: string;
  qr_code: string;
  status: string;
  created_at: string;
  visitor_name: string;
};

export default function VisitorTicketsPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const [visitDate, setVisitDate] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [defaultName, setDefaultName] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const res = await fetch('/api/tickets/my-tickets');
      const data = await res.json();
      if (res.ok) setTickets(data.tickets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate) { setError('Please select a visit date'); return; }
    if (adults === 0 && children === 0) { setError('Please select at least one ticket'); return; }

    setBookingLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/tickets/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adult_count: adults, child_count: children, visit_date: visitDate, visitor_name: visitorName }),
      });
      const data = await res.json();
      if (res.ok) {
        setVisitDate('');
        setVisitorName(defaultName);
        setAdults(1);
        setChildren(0);
        setSuccess(true);
        fetchTickets();
      } else {
        setError(data.error || 'Failed to book ticket');
      }
    } catch {
      setError('An error occurred during booking');
    } finally {
      setBookingLoading(false);
    }
  };

  const totalPrice = adults * 500 + children * 250;

  return (
    <div className="min-h-screen bg-[#f6f8fb] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-green-500/25">
              <Ticket size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ticket Booking</h1>
          </div>
          <p className="text-slate-500 ml-[52px]">Plan your visit and manage all your tickets in one place.</p>
        </div>

        {/* Booking Form */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {/* Section header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles size={20} className="text-green-200" />
              Book New Tickets
            </h2>
            <p className="text-green-100 text-sm mt-1">Adults ₹500 · Children ₹250 · Instant digital pass</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm font-medium">
                <span className="text-red-500 font-bold text-base">!</span> {error}
              </div>
            )}
            {success && (
              <div className="mb-6 flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-sm font-medium">
                <CheckCircle2 size={18} className="text-green-500" /> Booking confirmed! Your tickets are ready below.
              </div>
            )}

            <form onSubmit={handleBook} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <CalendarDays size={14} className="text-green-600" /> Visit Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-500/15 focus:border-green-500 outline-none transition-all bg-slate-50 hover:bg-white text-slate-900"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <Users size={14} className="text-green-600" /> Name on Ticket
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-500/15 focus:border-green-500 outline-none transition-all bg-slate-50 hover:bg-white text-slate-900"
                  />
                </div>

                {/* Adults */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Users size={14} className="text-green-600" /> Adults</div>
                    <span className="text-slate-400 font-medium normal-case">₹500 / person</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-slate-50 hover:border-slate-300 transition-colors">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(0, adults - 1))}
                      className="w-12 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold border-r border-slate-200 transition-colors text-lg"
                    >−</button>
                    <input
                      type="number"
                      readOnly
                      value={adults}
                      className="flex-1 py-3.5 text-center outline-none bg-transparent font-bold text-slate-900 text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-12 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold border-l border-slate-200 transition-colors text-lg"
                    >+</button>
                  </div>
                </div>

                {/* Children */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Users size={14} className="text-green-600" /> Children</div>
                    <span className="text-slate-400 font-medium normal-case">₹250 / person</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-slate-50 hover:border-slate-300 transition-colors">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-12 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold border-r border-slate-200 transition-colors text-lg"
                    >−</button>
                    <input
                      type="number"
                      readOnly
                      value={children}
                      className="flex-1 py-3.5 text-center outline-none bg-transparent font-bold text-slate-900 text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-12 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold border-l border-slate-200 transition-colors text-lg"
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
                <div className="bg-slate-50 rounded-2xl px-6 py-4 border border-slate-200 flex items-center gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Amount</p>
                    <div className="flex items-center gap-1 text-slate-900">
                      <IndianRupee size={22} className="text-green-600" />
                      <span className="text-3xl font-black">{totalPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-green-500/25 hover:shadow-green-500/35 transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                >
                  {bookingLoading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : <><CheckCircle2 size={18} /> Confirm Booking</>}
                </button>
              </div>
            </form>
          </div>
        </motion.section>

        {/* My Tickets */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
            <h2 className="text-2xl font-black text-slate-900">My Tickets</h2>
            {tickets.length > 0 && (
              <span className="ml-1 px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                {tickets.length}
              </span>
            )}
          </div>

          {loadingTickets ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-green-500" size={40} strokeWidth={1.5} />
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-14 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Ticket className="text-slate-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No tickets yet</h3>
              <p className="text-slate-400 text-sm">Book your first visit above and explore the zoo!</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
              <AnimatePresence>
                {tickets.map((ticket, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                    key={ticket.id}
                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row"
                  >
                    {/* Info */}
                    <div className="p-6 flex-1 relative">
                    {/* Top colored strip */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${
                      ticket.status === 'valid' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                      ticket.status === 'used' ? 'bg-slate-300' : 'bg-red-400'
                    }`} />

                    <div className="flex justify-between items-start mb-4 mt-1">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Visit Date</p>
                        <p className="text-lg font-black text-slate-900">
                          {new Date(ticket.visit_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        ticket.status === 'valid' ? 'bg-green-100 text-green-700' :
                        ticket.status === 'used' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-700'
                      }`}>
                        {ticket.status === 'valid' && <CheckCircle2 size={12} />}
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-800 mb-4">{ticket.visitor_name}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Adults</p>
                        <p className="text-xl font-black text-slate-900">{ticket.adult_count}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Children</p>
                        <p className="text-xl font-black text-slate-900">{ticket.child_count}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Ticket ID</p>
                      <p className="text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 truncate">{ticket.ticket_id}</p>
                    </div>
                  </div>

                  {/* QR Side */}
                  <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-5 flex flex-col items-center justify-center sm:w-44 border-t sm:border-t-0 sm:border-l border-dashed border-slate-200">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-200 mb-3">
                      <img src={ticket.qr_code} alt="QR Code" className="w-24 h-24" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-400 font-medium mb-0.5">Total Paid</p>
                      <p className="font-black text-slate-900 flex items-center justify-center gap-0.5">
                        <IndianRupee size={14} />{ticket.total_price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

      </div>
    </div>
  );
}
