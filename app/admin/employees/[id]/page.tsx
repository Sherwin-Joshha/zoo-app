'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Edit, IndianRupee, Ticket, CalendarDays, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editRole, setEditRole] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editTask, setEditTask] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/employees/${params.id}`);
      const json = await res.json();
      if (json.success) {
        setData(json);
        setEditRole(json.employee.role);
        setEditStatus(json.employee.status);
        setEditTask(json.employee.current_task || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/employees/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editRole, status: editStatus, current_task: editTask || null }),
      });
      if (res.ok) {
        setIsEditing(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-slate-300" size={40} strokeWidth={1.5} />
      </div>
    );
  }
  if (!data) return <div className="text-slate-500 text-sm p-4">Employee not found.</div>;

  const { employee, stats, attendance, earnings } = data;

  const statusStyle = (s: string) =>
    s === 'available' ? 'bg-green-100 text-green-700' :
    s === 'on_task' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500';

  return (
    <div className="space-y-6">

      <Link
        href="/admin/employees"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={15} /> Back to Employees
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden lg:col-span-1 h-fit">
          {/* Gradient header */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 h-24 relative">
            <div className="absolute -bottom-10 left-6">
              <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center text-2xl font-black text-blue-600">
                {employee.name.charAt(0)}
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <Edit size={15} />
              </button>
            ) : (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <X size={15} />
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                </button>
              </div>
            )}
          </div>

          <div className="px-6 pt-14 pb-7">
            <h2 className="text-xl font-black text-slate-900 mb-0.5">{employee.name}</h2>
            <p className="text-slate-400 text-sm mb-6">{employee.email}</p>

            <div className="space-y-5">
              {[
                {
                  label: 'Role',
                  view: <p className="font-semibold text-slate-800 capitalize text-sm">{employee.role}</p>,
                  edit: (
                    <input
                      value={editRole}
                      onChange={e => setEditRole(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50 text-slate-900"
                    />
                  ),
                },
                {
                  label: 'Status',
                  view: (
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold ${statusStyle(employee.status)}`}>
                      {employee.status.replace('_', ' ').toUpperCase()}
                    </span>
                  ),
                  edit: (
                    <select
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50 text-slate-900"
                    >
                      <option value="available">Available</option>
                      <option value="on_task">On Task</option>
                      <option value="off_duty">Off Duty</option>
                    </select>
                  ),
                },
                {
                  label: 'Current Task',
                  view: (
                    <p className="text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {employee.current_task || <span className="italic text-slate-300">No active task</span>}
                    </p>
                  ),
                  edit: (
                    <textarea
                      value={editTask}
                      onChange={e => setEditTask(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 resize-none bg-slate-50 text-slate-900"
                      rows={3}
                    />
                  ),
                },
                {
                  label: 'Date Joined',
                  view: <p className="font-medium text-slate-800 text-sm">{new Date(employee.date_of_joining).toLocaleDateString()}</p>,
                  edit: null,
                },
              ].map(({ label, view, edit }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</p>
                  {isEditing && edit ? edit : view}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats + Tables */}
        <div className="lg:col-span-2 space-y-6">

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Total Earnings', value: `₹${stats.total_earnings}`, icon: IndianRupee, bg: 'bg-green-100', text: 'text-green-600', bar: 'bg-green-500' },
              { label: 'Commissions', value: `₹${stats.tickets_commission}`, icon: Ticket, bg: 'bg-blue-100', text: 'text-blue-600', bar: 'bg-blue-500' },
              { label: 'Days Present (Mo)', value: stats.days_present_this_month, icon: CalendarDays, bg: 'bg-purple-100', text: 'text-purple-600', bar: 'bg-purple-500' },
            ].map(({ label, value, icon: Icon, bg, text, bar }) => (
              <div key={label} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-1 ${bar}`} />
                <div className="p-5 flex items-center gap-3">
                  <div className={`w-11 h-11 ${bg} ${text} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-xl font-black text-slate-900">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Attendance History */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h3 className="text-base font-black text-slate-900">Attendance History</h3>
            </div>
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 sticky top-0 border-b border-slate-100">
                  <tr className="text-slate-400">
                    <th className="font-bold py-3.5 px-5 text-[11px] uppercase tracking-wider">Date</th>
                    <th className="font-bold py-3.5 px-5 text-[11px] uppercase tracking-wider">Login Time</th>
                    <th className="font-bold py-3.5 px-5 text-[11px] uppercase tracking-wider">Logout Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {attendance.length === 0 ? (
                    <tr><td colSpan={3} className="py-8 text-center text-slate-400 text-sm">No attendance records.</td></tr>
                  ) : (
                    attendance.map((a: any) => (
                      <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-5 font-medium text-slate-700 text-sm">{new Date(a.date).toLocaleDateString()}</td>
                        <td className="py-3 px-5 text-slate-500 text-sm">{new Date(a.login_time).toLocaleTimeString()}</td>
                        <td className="py-3 px-5 text-sm">
                          {a.logout_time
                            ? <span className="text-slate-600">{new Date(a.logout_time).toLocaleTimeString()}</span>
                            : <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md font-semibold text-xs">Active</span>
                          }
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Earnings Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h3 className="text-base font-black text-slate-900">Earnings Breakdown</h3>
            </div>
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 sticky top-0 border-b border-slate-100">
                  <tr className="text-slate-400">
                    <th className="font-bold py-3.5 px-5 text-[11px] uppercase tracking-wider">Date</th>
                    <th className="font-bold py-3.5 px-5 text-[11px] uppercase tracking-wider">Source</th>
                    <th className="font-bold py-3.5 px-5 text-[11px] uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {earnings.length === 0 ? (
                    <tr><td colSpan={3} className="py-8 text-center text-slate-400 text-sm">No earnings recorded.</td></tr>
                  ) : (
                    earnings.map((e: any) => (
                      <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-5 font-medium text-slate-700 text-sm">{new Date(e.date).toLocaleDateString()}</td>
                        <td className="py-3 px-5 capitalize text-slate-500 text-sm">{e.source}</td>
                        <td className="py-3 px-5 text-right font-black text-green-700">+₹{e.amount}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
