'use client';

import { useState, useEffect } from 'react';
import { Ticket, IndianRupee, Users, ShieldCheck, Loader2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/tickets')
      .then(res => res.json())
      .then(result => {
        if (result.success) setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-slate-300" size={40} strokeWidth={1.5} />
      </div>
    );
  }

  if (!data) return <div className="text-slate-500 text-sm p-4">Failed to load data.</div>;

  const { stats, tickets, chartData } = data;
  const recentTickets = tickets.slice(0, 10);

  const statCards = [
    {
      label: 'Total Tickets Sold',
      value: stats.total_tickets,
      icon: Ticket,
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
    },
    {
      label: 'Total Revenue',
      value: `₹${stats.total_revenue}`,
      icon: IndianRupee,
      gradient: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
    },
    {
      label: "Today's Visitors",
      value: stats.today_visitors,
      icon: Users,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
    },
    {
      label: 'Available Staff',
      value: stats.available_employees,
      icon: ShieldCheck,
      gradient: 'from-purple-500 to-violet-600',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
    },
  ];

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map(({ label, value, icon: Icon, gradient, bg, text, border }) => (
          <div
            key={label}
            className={`bg-white rounded-2xl shadow-sm border ${border} overflow-hidden hover:shadow-md transition-shadow`}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />
            <div className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 ${bg} ${text} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-2xl font-black text-slate-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 xl:col-span-1 flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-blue-600" />
            </div>
            <h2 className="text-base font-black text-slate-800">Tickets – Last 7 Days</h2>
          </div>
          <div className="flex-1 p-5" style={{ minHeight: 320 }}>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                    tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { weekday: 'short' })}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#f8fafc', radius: 8 }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: 12 }}
                    labelFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={28} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">No data available</div>
            )}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 xl:col-span-2 flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Ticket size={16} className="text-green-600" />
              </div>
              <h2 className="text-base font-black text-slate-800">Recent Tickets</h2>
            </div>
            <a href="/admin/tickets" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg">
              View All →
            </a>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-500">
                  <th className="font-bold py-3.5 px-5 text-xs uppercase tracking-wider">Ticket ID</th>
                  <th className="font-bold py-3.5 px-5 text-xs uppercase tracking-wider">Visitor</th>
                  <th className="font-bold py-3.5 px-5 text-xs uppercase tracking-wider">Visit Date</th>
                  <th className="font-bold py-3.5 px-5 text-xs uppercase tracking-wider text-center">Pax</th>
                  <th className="font-bold py-3.5 px-5 text-xs uppercase tracking-wider text-right">Amount</th>
                  <th className="font-bold py-3.5 px-5 text-xs uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400 text-sm">No tickets found.</td>
                  </tr>
                ) : (
                  recentTickets.map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-5 font-mono text-slate-400 text-xs" title={t.ticket_id}>{t.ticket_id.substring(0, 8)}…</td>
                      <td className="py-3 px-5 font-semibold text-slate-900">{t.visitor_name}</td>
                      <td className="py-3 px-5 text-slate-500 text-xs">{new Date(t.visit_date).toLocaleDateString()}</td>
                      <td className="py-3 px-5 text-center text-slate-500 text-xs">{t.adult_count}A / {t.child_count}C</td>
                      <td className="py-3 px-5 text-right font-bold text-slate-900">₹{t.total_price}</td>
                      <td className="py-3 px-5 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          t.status === 'valid' ? 'bg-green-100 text-green-700' :
                          t.status === 'used' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
