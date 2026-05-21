'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Briefcase, Coffee, CheckCircle2, Users } from 'lucide-react';
import Link from 'next/link';
import AssignTaskModal from '@/components/admin/AssignTaskModal';

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [modalData, setModalData] = useState<{ id: number; name: string; task: string | null } | null>(null);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/admin/employees');
      const data = await res.json();
      if (data.success) setEmployees(data.employees);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const availableCount = employees.filter(e => e.status === 'available').length;
  const busyCount = employees.filter(e => e.status === 'on_task').length;
  const offDutyCount = employees.filter(e => e.status === 'off_duty').length;

  const summaryCards = [
    { label: 'Available', count: availableCount, icon: CheckCircle2, bg: 'bg-green-100', text: 'text-green-600', bar: 'bg-green-500' },
    { label: 'On Task', count: busyCount, icon: Briefcase, bg: 'bg-amber-100', text: 'text-amber-600', bar: 'bg-amber-500' },
    { label: 'Off Duty', count: offDutyCount, icon: Coffee, bg: 'bg-slate-100', text: 'text-slate-500', bar: 'bg-slate-400' },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <Users size={20} className="text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Employee Management</h1>
          <p className="text-slate-400 text-sm">Monitor staff status, assign tasks, and view performance.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {summaryCards.map(({ label, count, icon: Icon, bg, text, bar }) => (
          <div key={label} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-1 ${bar}`} />
            <div className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 ${bg} ${text} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-2xl font-black text-slate-900">{count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">

        {/* Filters */}
        <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/60">
          <div className="relative w-full md:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 bg-white shadow-sm text-slate-900"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 bg-white shadow-sm w-full md:w-48 text-slate-900"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="on_task">On Task</option>
            <option value="off_duty">Off Duty</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-slate-300" size={36} strokeWidth={1.5} />
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-400">
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Name & Role</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Status</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider">Current Task</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-right">Salary / Earned</th>
                  <th className="font-bold py-4 px-5 text-[11px] uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-14 text-center text-slate-400 text-sm">No employees found.</td>
                  </tr>
                ) : (
                  filtered.map((emp: any) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5">
                        <Link href={`/admin/employees/${emp.id}`} className="font-bold text-blue-600 hover:text-blue-800 hover:underline text-sm">
                          {emp.name}
                        </Link>
                        <p className="text-xs text-slate-400 capitalize mt-0.5">{emp.role}</p>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          emp.status === 'available' ? 'bg-green-100 text-green-700' :
                          emp.status === 'on_task' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            emp.status === 'available' ? 'bg-green-500' :
                            emp.status === 'on_task' ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                          {emp.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 text-sm max-w-[200px] truncate" title={emp.current_task}>
                        {emp.current_task || <span className="italic text-slate-300">None assigned</span>}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <p className="font-black text-slate-900 text-sm">₹{emp.salary}<span className="text-xs font-medium text-slate-400">/mo</span></p>
                        <p className="text-xs text-green-600 font-bold mt-0.5">₹{emp.total_earnings} earned</p>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <button
                          onClick={() => setModalData({ id: emp.id, name: emp.name, task: emp.current_task })}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold rounded-lg text-xs transition-colors border border-blue-200 hover:border-blue-300"
                        >
                          Assign Task
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalData && (
        <AssignTaskModal
          employeeId={modalData.id}
          employeeName={modalData.name}
          currentTask={modalData.task}
          onClose={() => setModalData(null)}
          onSuccess={() => { setModalData(null); fetchEmployees(); }}
        />
      )}
    </div>
  );
}
