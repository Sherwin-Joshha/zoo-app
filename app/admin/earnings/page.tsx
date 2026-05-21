'use client';

import { useState, useEffect } from 'react';
import { Download, Loader2, IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminEarningsPage() {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const currentMonth = (new Date().getMonth() + 1).toString();
  const currentYear = new Date().getFullYear().toString();
  
  const [filterMonth, setFilterMonth] = useState(currentMonth);
  const [filterYear, setFilterYear] = useState(currentYear);

  useEffect(() => {
    fetchEarnings();
  }, [filterMonth, filterYear]);

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/earnings?month=${filterMonth}&year=${filterYear}`);
      const data = await res.json();
      if (data.success) {
        setEarnings(data.earnings);
      }
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
      )
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

  const getTierColor = (amount: number) => {
    if (amount > 80000) return 'bg-amber-50 hover:bg-amber-100'; // High earner
    if (amount > 40000) return 'bg-blue-50 hover:bg-blue-100'; // Mid earner
    return 'bg-white hover:bg-slate-50'; // Standard
  };

  const totalBase = earnings.reduce((sum, e) => sum + Number(e.base_salary), 0);
  const totalCommission = earnings.reduce((sum, e) => sum + Number(e.ticket_commission), 0);
  const totalPayout = earnings.reduce((sum, e) => sum + Number(e.total_earnings), 0);

  const top10 = [...earnings].sort((a, b) => b.total_earnings - a.total_earnings).slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payroll & Earnings</h1>
          <p className="text-slate-500 text-sm">Review base salaries, ticket commissions, and total payouts.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          disabled={earnings.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table Section */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Month</label>
                <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none bg-white shadow-sm">
                  {Array.from({length: 12}, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Year</label>
                <select value={filterYear} onChange={e => setFilterYear(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none bg-white shadow-sm">
                  {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-white border border-slate-200"></div> Standard</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-blue-50 border border-blue-200"></div> &gt; 40k</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-50 border border-amber-200"></div> &gt; 80k</span>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64 text-slate-400">
                <Loader2 className="animate-spin" size={40} />
              </div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-800 text-white sticky top-0 z-10">
                  <tr>
                    <th className="font-semibold py-4 px-6">Employee</th>
                    <th className="font-semibold py-4 px-6">Role</th>
                    <th className="font-semibold py-4 px-6 text-right">Base Salary</th>
                    <th className="font-semibold py-4 px-6 text-right text-blue-200">Ticket Comm.</th>
                    <th className="font-semibold py-4 px-6 text-right text-green-300">Total Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {earnings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">No earnings data for this period.</td>
                    </tr>
                  ) : (
                    earnings.map((e: any) => (
                      <tr key={e.employee_id} className={`transition-colors border-b border-slate-100 ${getTierColor(e.total_earnings)}`}>
                        <td className="py-3 px-6 font-bold text-slate-900">{e.name}</td>
                        <td className="py-3 px-6 text-slate-600 capitalize">{e.role}</td>
                        <td className="py-3 px-6 text-right text-slate-700 font-medium">₹{e.base_salary}</td>
                        <td className="py-3 px-6 text-right text-blue-700 font-bold">+₹{e.ticket_commission}</td>
                        <td className="py-3 px-6 text-right text-green-700 font-extrabold text-base">₹{e.total_earnings}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                {!loading && earnings.length > 0 && (
                  <tfoot className="bg-slate-50 font-bold text-slate-900 sticky bottom-0 border-t-2 border-slate-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <tr>
                      <td colSpan={2} className="py-4 px-6 text-right uppercase tracking-wider text-xs text-slate-500">Totals</td>
                      <td className="py-4 px-6 text-right text-slate-800">₹{totalBase.toLocaleString('en-IN')}</td>
                      <td className="py-4 px-6 text-right text-blue-700">₹{totalCommission.toLocaleString('en-IN')}</td>
                      <td className="py-4 px-6 text-right text-green-700 text-lg">₹{totalPayout.toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[500px] flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <IndianRupee size={20} className="text-green-600" /> Top 10 Earners
            </h2>
            <div className="flex-1 w-full">
              {!loading && top10.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={top10} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      width={80}
                      tick={{ fontSize: 12, fill: '#0f172a', fontWeight: 600 }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Total Payout']}
                    />
                    <Bar dataKey="total_earnings" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm font-medium">No chart data available</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
