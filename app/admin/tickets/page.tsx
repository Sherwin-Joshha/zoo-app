'use client';

import { useState, useEffect } from 'react';
import { Download, Loader2, QrCode, X, SlidersHorizontal } from 'lucide-react';

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

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
        setCurrentPage(1);
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
      ),
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Ticket Management</h1>
          <p className="text-slate-400 text-sm mt-0.5">View, filter, and export all visitor bookings.</p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={tickets.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl font-semibold text-sm transition-all shadow-sm disabled:opacity-50"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">

        {/* Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-end bg-slate-50/60">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
            <SlidersHorizontal size={15} /> Filters
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visit Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white shadow-sm text-slate-900"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white shadow-sm min-w-[140px] text-slate-900"
            >
              <option value="all">All Statuses</option>
              <option value="valid">Valid</option>
              <option value="used">Used</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button
            onClick={() => { setFilterDate(''); setFilterStatus('all'); }}
            className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors"
          >
            Clear
          </button>
          {tickets.length > 0 && (
            <div className="ml-auto text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
              {tickets.length} results
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-slate-300" size={36} strokeWidth={1.5} />
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-400">
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Ticket ID</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Visitor</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Visit Date</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-center">Adults</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-center">Children</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-right">Total</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-center">Status</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-center">QR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentTickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-14 text-center text-slate-400 text-sm">No tickets found matching the criteria.</td>
                  </tr>
                ) : (
                  currentTickets.map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5 font-mono text-slate-400 text-xs" title={t.ticket_id}>{t.ticket_id.substring(0, 13)}…</td>
                      <td className="py-3.5 px-5">
                        <p className="font-bold text-slate-900 text-sm">{t.visitor_name}</p>
                        <p className="text-xs text-slate-400">{t.visitor_email}</p>
                      </td>
                      <td className="py-3.5 px-5 text-slate-600 text-sm">{new Date(t.visit_date).toLocaleDateString()}</td>
                      <td className="py-3.5 px-5 text-center text-slate-600 font-semibold">{t.adult_count}</td>
                      <td className="py-3.5 px-5 text-center text-slate-600 font-semibold">{t.child_count}</td>
                      <td className="py-3.5 px-5 text-right font-black text-slate-900">₹{t.total_price}</td>
                      <td className="py-3.5 px-5 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          t.status === 'valid' ? 'bg-green-100 text-green-700' :
                          t.status === 'used' ? 'bg-slate-100 text-slate-500' : 'bg-red-100 text-red-600'
                        }`}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <button
                          onClick={() => setSelectedQR(t.qr_code)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors bg-blue-50 border border-blue-100"
                          title="View QR"
                        >
                          <QrCode size={16} />
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
          <div className="border-t border-slate-100 p-4 flex items-center justify-between bg-slate-50/40">
            <span className="text-xs text-slate-400 font-medium">
              Showing <span className="font-bold text-slate-700">{indexOfFirst + 1}–{Math.min(indexOfLast, tickets.length)}</span> of <span className="font-bold text-slate-700">{tickets.length}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 text-slate-600 transition-colors"
              >
                ← Prev
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => {
                  if (totalPages > 7 && i !== 0 && i !== totalPages - 1 && Math.abs(currentPage - 1 - i) > 1) {
                    if (i === 1 || i === totalPages - 2) return <span key={i} className="px-1 text-slate-300 text-sm">…</span>;
                    return null;
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                        currentPage === i + 1
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 text-slate-600 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QR Modal */}
      {selectedQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full relative shadow-2xl">
            <button
              onClick={() => setSelectedQR(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <QrCode size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-5">Ticket QR Code</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 inline-block shadow-sm">
                <img src={selectedQR} alt="Enlarged QR Code" className="w-48 h-48 mx-auto" />
              </div>
              <p className="text-xs text-slate-400 mt-5 font-medium">Scan at the entrance gates to validate entry.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
