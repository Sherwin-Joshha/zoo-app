'use client';

import { useState, useEffect } from 'react';
import { Loader2, PlusCircle, CheckCircle2, UserCheck, Clock, AlertCircle, CalendarDays } from 'lucide-react';

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  const [isManualLog, setIsManualLog] = useState(false);
  const [logEmpId, setLogEmpId] = useState('');
  const [logType, setLogType] = useState('login');
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logTime, setLogTime] = useState('09:00');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchData(); }, [filterDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/attendance?date=${filterDate}`);
      const data = await res.json();
      if (data.success) {
        setRecords(data.attendance);
        setEmployees(data.employees);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: logEmpId, type: logType, date: logDate, time: logTime }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsManualLog(false);
        fetchData();
      } else {
        setError(data.error || 'Failed to log attendance');
      }
    } catch {
      setError('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const activeEmployees = records.filter(r => r.logout_time === null).length;
  const isToday = filterDate === new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <CalendarDays size={20} className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Attendance Tracker</h1>
            <p className="text-slate-400 text-sm">Monitor daily staff logins and operational readiness.</p>
          </div>
        </div>
        <button
          onClick={() => setIsManualLog(!isManualLog)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-blue-500/20"
        >
          <PlusCircle size={16} /> Manual Entry
        </button>
      </div>

      {/* Manual Log Form */}
      {isManualLog && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-base font-black text-white">Manual Log Entry</h2>
            <p className="text-blue-100 text-xs mt-0.5">Manually clock in or clock out an employee.</p>
          </div>
          <div className="p-6">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 border border-red-200">
                <AlertCircle size={15} /> {error}
              </div>
            )}
            <form onSubmit={handleManualLog} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Employee</label>
                <select
                  required
                  value={logEmpId}
                  onChange={e => setLogEmpId(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-slate-900"
                >
                  <option value="">Select...</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Action</label>
                <select
                  value={logType}
                  onChange={e => setLogType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-slate-900"
                >
                  <option value="login">Clock In</option>
                  <option value="logout">Clock Out</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Date</label>
                <input
                  type="date"
                  required
                  value={logDate}
                  onChange={e => setLogDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-slate-900"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Time</label>
                <input
                  type="time"
                  required
                  value={logTime}
                  onChange={e => setLogTime(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-slate-900"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-semibold text-sm hover:from-slate-700 hover:to-slate-800 disabled:opacity-50 transition-all shadow-sm"
              >
                {submitting ? 'Saving…' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Today's Stats */}
      {isToday && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: 'Clocked In Today', value: records.length, icon: UserCheck, bg: 'bg-blue-100', text: 'text-blue-600', bar: 'bg-blue-500' },
            { label: 'Currently Active', value: activeEmployees, icon: Clock, bg: 'bg-green-100', text: 'text-green-600', bar: 'bg-green-500' },
            { label: 'Yet to Arrive', value: employees.length - records.length, icon: AlertCircle, bg: 'bg-orange-100', text: 'text-orange-600', bar: 'bg-orange-500' },
          ].map(({ label, value, icon: Icon, bg, text, bar }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-1 ${bar}`} />
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
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-slate-600">View Date:</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 bg-white shadow-sm text-slate-900"
            />
          </div>
          {isToday && (
            <div className="flex items-center gap-2 text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              Live Tracking Active
            </div>
          )}
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-slate-300" size={36} strokeWidth={1.5} />
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-400">
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Employee</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Login Time</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Logout Time</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-center">Hours Worked</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-14 text-center text-slate-400 text-sm">No attendance records found for this date.</td>
                  </tr>
                ) : (
                  records.map((r: any) => {
                    const login = new Date(r.login_time);
                    const logout = r.logout_time ? new Date(r.logout_time) : null;
                    const hoursWorked = logout
                      ? ((logout.getTime() - login.getTime()) / (1000 * 60 * 60)).toFixed(1)
                      : '-';

                    return (
                      <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-slate-900">{r.employee_name}</td>
                        <td className="py-3.5 px-5 text-slate-600 font-medium text-sm">{login.toLocaleTimeString()}</td>
                        <td className="py-3.5 px-5 text-slate-500 text-sm">
                          {logout ? logout.toLocaleTimeString() : <span className="text-slate-300 italic">Still working</span>}
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          {hoursWorked !== '-' ? (
                            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg text-xs">{hoursWorked} hrs</span>
                          ) : '—'}
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          {!logout ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500">
                              <CheckCircle2 size={11} /> Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
