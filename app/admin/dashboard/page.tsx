'use client';

import { useState, useEffect } from 'react';
import { Ticket, IndianRupee, Users, ShieldCheck, Loader2 } from 'lucide-react';
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
        <Loader2 className="animate-spin text-slate-400" size={48} />
      </div>
    );
  }

  if (!data) return <div>Failed to load data</div>;

  const { stats, tickets, chartData } = data;
  const recentTickets = tickets.slice(0, 10); 

  return (
    <div className="space-y-6">
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Ticket size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Tickets Sold</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total_tickets}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
            <IndianRupee size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900">₹{stats.total_revenue}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Today's Visitors</p>
            <p className="text-2xl font-bold text-slate-900">{stats.today_visitors}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Available Employees</p>
            <p className="text-2xl font-bold text-slate-900">{stats.available_employees}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 xl:col-span-1 h-[450px] flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Tickets Sold (Last 7 Days)</h2>
          <div className="flex-1 w-full h-full pb-4">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { weekday: 'short' })}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">No data available</div>
            )}
          </div>
        </div>

        {/* Recent Tickets Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 xl:col-span-2 overflow-hidden flex flex-col h-[450px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Tickets</h2>
            <a href="/admin/tickets" className="text-sm font-medium text-blue-600 hover:underline">View All &rarr;</a>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr className="text-slate-500 border-b border-slate-200">
                  <th className="font-medium py-3 px-4">Ticket ID</th>
                  <th className="font-medium py-3 px-4">Visitor Name</th>
                  <th className="font-medium py-3 px-4">Visit Date</th>
                  <th className="font-medium py-3 px-4 text-center">Pax (A/C)</th>
                  <th className="font-medium py-3 px-4 text-right">Amount</th>
                  <th className="font-medium py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">No tickets found.</td>
                  </tr>
                ) : (
                  recentTickets.map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-600 truncate max-w-[100px]" title={t.ticket_id}>{t.ticket_id.substring(0, 8)}...</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{t.visitor_name}</td>
                      <td className="py-3 px-4 text-slate-600">{new Date(t.visit_date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-center text-slate-600">{t.adult_count} / {t.child_count}</td>
                      <td className="py-3 px-4 text-right font-medium text-slate-900">₹{t.total_price}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          t.status === 'valid' ? 'bg-green-100 text-green-700' : 
                          t.status === 'used' ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-700'
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
