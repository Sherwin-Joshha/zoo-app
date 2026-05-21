'use client';

import { useState, useEffect } from 'react';
import { Download, Loader2, QrCode, X } from 'lucide-react';

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  // QR Modal
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets();
  }, [filterDate, filterStatus]);

  const fetchTickets = async () => {
    setLoading(true);
    let url = '/api/admin/tickets?';
    if (filterDate) url += `date=${filterDate}&`;
    if (filterStatus !== 'all') url += `status=${filterStatus}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setTickets(data.tickets);
        setCurrentPage(1); // Reset to first page on filter change
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (tickets.length === 0) return;
    
    const headers = ['Ticket ID', 'Visitor Name', 'Email', 'Visit Date', 'Adults', 'Children', 'Total Price', 'Status', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...tickets.map(t => 
        `"${t.ticket_id}","${t.visitor_name}","${t.visitor_email}","${new Date(t.visit_date).toLocaleDateString()}","${t.adult_count}","${t.child_count}","${t.total_price}","${t.status}","${new Date(t.created_at).toISOString()}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tickets_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indexOfLast = currentPage * ticketsPerPage;
  const indexOfFirst = indexOfLast - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ticket Management</h1>
          <p className="text-slate-500 text-sm">View, filter, and export all visitor bookings.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          disabled={tickets.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Filters */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-wrap gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Visit Date</label>
            <input 
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm min-w-[140px]"
            >
              <option value="all">All Statuses</option>
              <option value="valid">Valid</option>
              <option value="used">Used</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button 
            onClick={() => { setFilterDate(''); setFilterStatus('all'); }}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors shadow-sm"
          >
            Clear Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-slate-400">
              <Loader2 className="animate-spin" size={40} />
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50">
                <tr className="text-slate-600 border-b border-slate-200">
                  <th className="font-semibold py-4 px-6">Ticket ID</th>
                  <th className="font-semibold py-4 px-6">Visitor</th>
                  <th className="font-semibold py-4 px-6">Visit Date</th>
                  <th className="font-semibold py-4 px-6 text-center">Adults</th>
                  <th className="font-semibold py-4 px-6 text-center">Children</th>
                  <th className="font-semibold py-4 px-6 text-right">Total</th>
                  <th className="font-semibold py-4 px-6 text-center">Status</th>
                  <th className="font-semibold py-4 px-6 text-center">QR Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentTickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">No tickets found matching the criteria.</td>
                  </tr>
                ) : (
                  currentTickets.map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-6 font-mono text-slate-500 text-xs" title={t.ticket_id}>{t.ticket_id}</td>
                      <td className="py-3 px-6">
                        <p className="font-bold text-slate-900">{t.visitor_name}</p>
                        <p className="text-xs text-slate-500">{t.visitor_email}</p>
                      </td>
                      <td className="py-3 px-6 text-slate-700 font-medium">{new Date(t.visit_date).toLocaleDateString()}</td>
                      <td className="py-3 px-6 text-center text-slate-700">{t.adult_count}</td>
                      <td className="py-3 px-6 text-center text-slate-700">{t.child_count}</td>
                      <td className="py-3 px-6 text-right font-bold text-slate-900">₹{t.total_price}</td>
                      <td className="py-3 px-6 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          t.status === 'valid' ? 'bg-green-100 text-green-700' : 
                          t.status === 'used' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-700'
                        }`}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button 
                          onClick={() => setSelectedQR(t.qr_code)}
                          className="inline-flex items-center justify-center p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors bg-blue-50 border border-blue-100"
                          title="View QR Code"
                        >
                          <QrCode size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && tickets.length > 0 && (
          <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-white">
            <span className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">{indexOfFirst + 1}</span> to <span className="font-bold text-slate-900">{Math.min(indexOfLast, tickets.length)}</span> of <span className="font-bold text-slate-900">{tickets.length}</span> entries
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700"
              >
                Prev
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => {
                  // Simple pagination: show first, last, current, and adjacent if many pages
                  if (totalPages > 7) {
                    if (i !== 0 && i !== totalPages - 1 && Math.abs(currentPage - 1 - i) > 1) {
                      if (i === 1 || i === totalPages - 2) return <span key={i} className="px-1 text-slate-400">...</span>;
                      return null;
                    }
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                        currentPage === i + 1 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                })}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {selectedQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedQR(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Ticket QR Code</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 inline-block shadow-sm">
                <img src={selectedQR} alt="Enlarged QR Code" className="w-48 h-48 mx-auto" />
              </div>
              <p className="text-sm text-slate-500 mt-6 font-medium">Scan this code at the entrance gates to validate entry.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
