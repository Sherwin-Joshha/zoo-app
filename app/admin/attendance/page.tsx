'use client';

import { useState, useEffect } from 'react';
import { Loader2, PlusCircle, CheckCircle2, Search, UserCheck, Clock } from 'lucide-react';

export default function AdminAttendancePage() {
  const [records, setRecords] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Manual Log States
  const [isManualLog, setIsManualLog] = useState(false);
  const [logEmpId, setLogEmpId] = useState('');
  const [logType, setLogType] = useState('login');
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logTime, setLogTime] = useState('09:00');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [filterDate]);

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
        body: JSON.stringify({
          employee_id: logEmpId,
          type: logType,
          date: logDate,
          time: logTime
        })
      });
      const data = await res.json();
      if (res.ok) {
        setIsManualLog(false);
        fetchData();
      } else {
        setError(data.error || 'Failed to log attendance');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const activeEmployees = records.filter(r => r.logout_time === null).length;
  const isToday = filterDate === new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance Tracker</h1>
          <p className="text-slate-500 text-sm">Monitor daily staff logins and operational readiness.</p>
        </div>
        <button 
          onClick={() => setIsManualLog(!isManualLog)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle size={18} />
          Manual Entry
        </button>
      </div>

      {isManualLog && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Manual Log Entry</h2>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
          <form onSubmit={handleManualLog} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-1 space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Employee</label>
              <select required value={logEmpId} onChange={e => setLogEmpId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none">
                <option value="">Select...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-1 space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Action</label>
              <select value={logType} onChange={e => setLogType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none">
                <option value="login">Clock In</option>
                <option value="logout">Clock Out</option>
              </select>
            </div>
            <div className="md:col-span-1 space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
              <input type="date" required value={logDate} onChange={e => setLogDate(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none" />
            </div>
            <div className="md:col-span-1 space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Time</label>
              <input type="time" required value={logTime} onChange={e => setLogTime(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none" />
            </div>
            <div className="md:col-span-1">
              <button type="submit" disabled={submitting} className="w-full py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50">
                {submitting ? 'Saving...' : 'Submit Entry'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isToday && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><UserCheck size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Clocked In Today</p>
                <p className="text-2xl font-bold text-slate-900">{records.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl"><Clock size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Currently Active</p>
                <p className="text-2xl font-bold text-slate-900">{activeEmployees}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 text-slate-600 rounded-xl"><Search size={24} /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">Yet to arrive</p>
                <p className="text-2xl font-bold text-slate-900">{employees.length - records.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-slate-700">View Date:</label>
            <input 
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>
          {isToday && (
            <div className="text-sm font-medium text-green-600 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Live Tracking Active
            </div>
          )}
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-slate-400">
              <Loader2 className="animate-spin" size={40} />
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50">
                <tr className="text-slate-600 border-b border-slate-200">
                  <th className="font-semibold py-4 px-6">Employee</th>
                  <th className="font-semibold py-4 px-6">Login Time</th>
                  <th className="font-semibold py-4 px-6">Logout Time</th>
                  <th className="font-semibold py-4 px-6 text-center">Hours Worked</th>
                  <th className="font-semibold py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">No attendance records found for this date.</td>
                  </tr>
                ) : (
                  records.map((r: any) => {
                    const login = new Date(r.login_time);
                    const logout = r.logout_time ? new Date(r.logout_time) : null;
                    const hoursWorked = logout ? ((logout.getTime() - login.getTime()) / (1000 * 60 * 60)).toFixed(1) : '-';

                    return (
                      <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-6 font-bold text-slate-900">{r.employee_name}</td>
                        <td className="py-3 px-6 font-medium text-slate-700">{login.toLocaleTimeString()}</td>
                        <td className="py-3 px-6 text-slate-600">
                          {logout ? logout.toLocaleTimeString() : <span className="text-slate-400 italic">--:--:--</span>}
                        </td>
                        <td className="py-3 px-6 text-center font-bold text-slate-700">
                          {hoursWorked !== '-' ? `${hoursWorked} hrs` : '-'}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {!logout ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                            </span>
                          ) : (
                            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                              Completed
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
