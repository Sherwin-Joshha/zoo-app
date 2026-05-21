'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, Users, IndianRupee, Loader2, Ticket, CheckCircle2 } from 'lucide-react';

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
};

export default function VisitorTicketsPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const [visitDate, setVisitDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const res = await fetch('/api/tickets/my-tickets');
      const data = await res.json();
      if (res.ok) {
        setTickets(data.tickets);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate) {
      setError('Please select a visit date');
      return;
    }
    if (adults === 0 && children === 0) {
      setError('Please select at least one ticket');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const res = await fetch('/api/tickets/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adult_count: adults, child_count: children, visit_date: visitDate }),
      });
      const data = await res.json();

      if (res.ok) {
        setVisitDate('');
        setAdults(1);
        setChildren(0);
        // Refresh tickets
        fetchTickets();
      } else {
        setError(data.error || 'Failed to book ticket');
      }
    } catch (err) {
      setError('An error occurred during booking');
    } finally {
      setBookingLoading(false);
    }
  };

  const totalPrice = adults * 500 + children * 250;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
            <Ticket className="text-green-600" size={40} />
            Ticket Booking
          </h1>
          <p className="mt-2 text-slate-600">Plan your visit and manage your tickets.</p>
        </div>

        {/* Booking Form Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Book New Tickets</h2>
            
            {error && (
              <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleBook} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CalendarDays size={18} className="text-green-600" />
                    Visit Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  />
                </div>

                {/* Adult Counter */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-green-600" />
                      Adults
                    </div>
                    <span className="text-slate-500 font-normal">₹500</span>
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                    <button type="button" onClick={() => setAdults(Math.max(0, adults - 1))} className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold border-r border-slate-300 transition-colors">-</button>
                    <input type="number" readOnly value={adults} className="w-full px-4 py-3 text-center outline-none bg-white font-medium" />
                    <button type="button" onClick={() => setAdults(adults + 1)} className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold border-l border-slate-300 transition-colors">+</button>
                  </div>
                </div>

                {/* Child Counter */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-green-600" />
                      Children
                    </div>
                    <span className="text-slate-500 font-normal">₹250</span>
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                    <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold border-r border-slate-300 transition-colors">-</button>
                    <input type="number" readOnly value={children} className="w-full px-4 py-3 text-center outline-none bg-white font-medium" />
                    <button type="button" onClick={() => setChildren(children + 1)} className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold border-l border-slate-300 transition-colors">+</button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">Total Price:</span>
                  <span className="text-3xl font-bold text-slate-900 flex items-center">
                    <IndianRupee size={24} className="mr-1" />
                    {totalPrice}
                  </span>
                </div>
                
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {bookingLoading ? <Loader2 size={20} className="animate-spin" /> : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* My Tickets Section */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">My Tickets</h2>
          
          {loadingTickets ? (
            <div className="flex justify-center items-center py-20 text-slate-400">
              <Loader2 className="animate-spin" size={40} />
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <Ticket className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-medium text-slate-900 mb-1">No tickets found</h3>
              <p className="text-slate-500">You haven't booked any tickets yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                  {/* Left info side */}
                  <div className="p-6 flex-1 border-b sm:border-b-0 sm:border-r border-slate-100 border-dashed relative">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">VISIT DATE</p>
                        <p className="text-lg font-bold text-slate-900">
                          {new Date(ticket.visit_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'valid' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {ticket.status === 'valid' && <CheckCircle2 size={14} />}
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">ADULTS</p>
                        <p className="font-semibold text-slate-800">{ticket.adult_count}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">CHILDREN</p>
                        <p className="font-semibold text-slate-800">{ticket.child_count}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 mb-1">TICKET ID</p>
                      <p className="text-sm font-mono text-slate-700 truncate">{ticket.ticket_id}</p>
                    </div>
                  </div>

                  {/* Right QR side */}
                  <div className="bg-slate-50 p-6 flex flex-col items-center justify-center sm:w-48">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 mb-3 relative">
                      <img src={ticket.qr_code} alt="Ticket QR Code" className="w-24 h-24 object-contain" />
                    </div>
                    <p className="text-sm font-bold text-slate-900 flex items-center">
                      <IndianRupee size={14} className="mr-0.5" />
                      {ticket.total_price}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Total Paid</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
