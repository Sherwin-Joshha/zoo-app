'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Edit, IndianRupee, Ticket, CalendarDays } from 'lucide-react';
import Link from 'next/link';

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editRole, setEditRole] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editTask, setEditTask] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-slate-400" size={48} /></div>;
  if (!data) return <div>Employee not found.</div>;

  const { employee, stats, attendance, earnings } = data;

  return (
    <div className="space-y-6">
      <Link href="/admin/employees" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium mb-2">
        <ArrowLeft size={16} /> Back to Employees
      </Link>

      {/* Header & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 lg:col-span-1 h-fit">
          <div className="flex justify-between items-start mb-6">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
              {employee.name.charAt(0)}
            </div>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors">
                <Edit size={20} />
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-md font-medium hover:bg-slate-200 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50">
                  {saving && <Loader2 size={12} className="animate-spin" />} Save
                </button>
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{employee.name}</h2>
          <p className="text-slate-500 text-sm mb-6">{employee.email}</p>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Role</p>
              {isEditing ? (
                <input value={editRole} onChange={e => setEditRole(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              ) : (
                <p className="font-medium text-slate-800 capitalize">{employee.role}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
              {isEditing ? (
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="available">Available</option>
                  <option value="on_task">On Task</option>
                  <option value="off_duty">Off Duty</option>
                </select>
              ) : (
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                  employee.status === 'available' ? 'bg-green-100 text-green-700' : 
                  employee.status === 'on_task' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {employee.status.replace('_', ' ').toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Task</p>
              {isEditing ? (
                <textarea value={editTask} onChange={e => setEditTask(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows={3} />
              ) : (
                <p className="font-medium text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">{employee.current_task || <span className="italic text-slate-400">No active task</span>}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date Joined</p>
              <p className="font-medium text-slate-800 text-sm">{new Date(employee.date_of_joining).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Stats & Tables Column */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-green-100 text-green-600 rounded-xl"><IndianRupee size={20} /></div>
                <p className="text-sm font-bold text-slate-500">Total Earnings</p>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">₹{stats.total_earnings}</p>
            </div>
            
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl"><Ticket size={20} /></div>
                <p className="text-sm font-bold text-slate-500">Commissions</p>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">₹{stats.tickets_commission}</p>
            </div>
            
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl"><CalendarDays size={20} /></div>
                <p className="text-sm font-bold text-slate-500">Days Present (Mo)</p>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{stats.days_present_this_month}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Attendance History</h3>
            </div>
            <div className="overflow-x-auto max-h-72 overflow-y-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 sticky top-0">
                  <tr className="text-slate-600 border-b border-slate-200">
                    <th className="font-semibold py-4 px-6">Date</th>
                    <th className="font-semibold py-4 px-6">Login Time</th>
                    <th className="font-semibold py-4 px-6">Logout Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance.length === 0 ? (
                    <tr><td colSpan={3} className="py-8 text-center text-slate-500 font-medium">No attendance records.</td></tr>
                  ) : (
                    attendance.map((a: any) => (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-6 font-medium text-slate-700">{new Date(a.date).toLocaleDateString()}</td>
                        <td className="py-3 px-6 text-slate-600">{new Date(a.login_time).toLocaleTimeString()}</td>
                        <td className="py-3 px-6 font-medium">{a.logout_time ? new Date(a.logout_time).toLocaleTimeString() : <span className="text-amber-500 bg-amber-50 px-2 py-1 rounded-md">Currently Active</span>}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Earnings Breakdown</h3>
            </div>
            <div className="overflow-x-auto max-h-72 overflow-y-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 sticky top-0">
                  <tr className="text-slate-600 border-b border-slate-200">
                    <th className="font-semibold py-4 px-6">Date</th>
                    <th className="font-semibold py-4 px-6">Source</th>
                    <th className="font-semibold py-4 px-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {earnings.length === 0 ? (
                    <tr><td colSpan={3} className="py-8 text-center text-slate-500 font-medium">No earnings recorded.</td></tr>
                  ) : (
                    earnings.map((e: any) => (
                      <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-6 font-medium text-slate-700">{new Date(e.date).toLocaleDateString()}</td>
                        <td className="py-3 px-6 capitalize text-slate-600">{e.source}</td>
                        <td className="py-3 px-6 text-right font-bold text-green-700">+ ₹{e.amount}</td>
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
