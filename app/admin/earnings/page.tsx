'use client';

import { useState, useEffect } from 'react';
import { Download, Loader2, IndianRupee, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminEarningsPage() {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentMonth = (new Date().getMonth() + 1).toString();
  const currentYear = new Date().getFullYear().toString();

  const [filterMonth, setFilterMonth] = useState(currentMonth);
  const [filterYear, setFilterYear] = useState(currentYear);

  useEffect(() => { fetchEarnings(); }, [filterMonth, filterYear]);

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/earnings?month=${filterMonth}&year=${filterYear}`);
      const data = await res.json();
      if (data.success) setEarnings(data.earnings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (earnings.length === 0) return;
    const headers = ['Employee ID', 'Name', 'Role', 'Base Salary', 'Ticket Commission', 'Total Earnings'];
    const csvContent = [
      headers.join(','),
      ...earnings.map(e =>
        `"${e.employee_id}","${e.name}","${e.role}","${e.base_salary}","${e.ticket_commission}","${e.total_earnings}"`
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `earnings_export_${filterYear}_${filterMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTierStyle = (amount: number) => {
    if (amount > 80000) return 'bg-amber-50 hover:bg-amber-100/70';
    if (amount > 40000) return 'bg-blue-50/60 hover:bg-blue-100/50';
    return 'hover:bg-slate-50/80';
  };

  const totalBase = earnings.reduce((sum, e) => sum + Number(e.base_salary), 0);
  const totalCommission = earnings.reduce((sum, e) => sum + Number(e.ticket_commission), 0);
  const totalPayout = earnings.reduce((sum, e) => sum + Number(e.total_earnings), 0);

  const top10 = [...earnings].sort((a, b) => b.total_earnings - a.total_earnings).slice(0, 10);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <IndianRupee size={20} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payroll & Earnings</h1>
            <p className="text-slate-400 text-sm">Base salaries, ticket commissions, and total payouts.</p>
          </div>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={earnings.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl font-semibold text-sm transition-all shadow-sm disabled:opacity-50"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
          <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Month</label>
                <select
                  value={filterMonth}
                  onChange={e => setFilterMonth(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white shadow-sm text-slate-900"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>
                      {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Year</label>
                <select
                  value={filterYear}
                  onChange={e => setFilterYear(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white shadow-sm text-slate-900"
                >
                  {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-white border border-slate-300" /> Standard</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-100 border border-blue-200" /> &gt;40k</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-100 border border-amber-300" /> &gt;80k</span>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-slate-300" size={36} strokeWidth={1.5} />
              </div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-900 text-white sticky top-0 z-10">
                  <tr>
                    <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Employee</th>
                    <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Role</th>
                    <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-right">Base Salary</th>
                    <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-right text-blue-300">Ticket Comm.</th>
                    <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-right text-green-400">Total Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60">
                  {earnings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-14 text-center text-slate-400 text-sm">No earnings data for this period.</td>
                    </tr>
                  ) : (
                    earnings.map((e: any) => (
                      <tr key={e.employee_id} className={`transition-colors ${getTierStyle(e.total_earnings)}`}>
                        <td className="py-3.5 px-5 font-bold text-slate-900">{e.name}</td>
                        <td className="py-3.5 px-5 text-slate-500 capitalize text-sm">{e.role}</td>
                        <td className="py-3.5 px-5 text-right text-slate-700 font-medium">₹{Number(e.base_salary).toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-5 text-right text-blue-600 font-bold">+₹{Number(e.ticket_commission).toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-5 text-right text-green-700 font-black text-base">₹{Number(e.total_earnings).toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                {!loading && earnings.length > 0 && (
                  <tfoot className="bg-slate-50 font-bold sticky bottom-0 border-t-2 border-slate-200 shadow-[0_-4px_8px_rgba(0,0,0,0.04)]">
                    <tr>
                      <td colSpan={2} className="py-4 px-5 text-right text-[10px] uppercase tracking-widest text-slate-400 font-bold">Totals</td>
                      <td className="py-4 px-5 text-right text-slate-800 font-bold">₹{totalBase.toLocaleString('en-IN')}</td>
                      <td className="py-4 px-5 text-right text-blue-700 font-bold">₹{totalCommission.toLocaleString('en-IN')}</td>
                      <td className="py-4 px-5 text-right text-green-700 font-black text-lg">₹{totalPayout.toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-[500px] flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={16} className="text-emerald-600" />
              </div>
              <h2 className="text-base font-black text-slate-800">Top 10 Earners</h2>
            </div>
            <div className="flex-1 p-5">
              {!loading && top10.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={top10} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#f1f5f9" />
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#94a3b8' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      width={72}
                      tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 700 }}
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: 12 }}
                      formatter={(val) => [`₹${Number(val ?? 0).toLocaleString('en-IN')}`, 'Total Payout']}
                    />
                    <Bar dataKey="total_earnings" radius={[0, 6, 6, 0]} barSize={20}>
                      {top10.map((_, index) => (
                        <rect
                          key={index}
                          fill={index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#8b5cf6'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300 text-sm font-medium">No chart data available</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
