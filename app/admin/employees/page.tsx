'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Briefcase, Coffee, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AssignTaskModal from '@/components/admin/AssignTaskModal';

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [modalData, setModalData] = useState<{id: number, name: string, task: string | null} | null>(null);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/admin/employees');
      const data = await res.json();
      if (data.success) {
        setEmployees(data.employees);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const availableCount = employees.filter(e => e.status === 'available').length;
  const busyCount = employees.filter(e => e.status === 'on_task').length;
  const offDutyCount = employees.filter(e => e.status === 'off_duty').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Employee Management</h1>
        <p className="text-slate-500 text-sm">Monitor staff status, assign tasks, and view performance.</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl"><CheckCircle2 size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Available</p>
              <p className="text-2xl font-bold text-slate-900">{availableCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><Briefcase size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">On Task</p>
              <p className="text-2xl font-bold text-slate-900">{busyCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-xl"><Coffee size={24} /></div>
            <div>
              <p className="text-sm font-medium text-slate-500">Off Duty</p>
              <p className="text-2xl font-bold text-slate-900">{offDutyCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Filters */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm w-full md:w-48"
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
            <div className="flex justify-center items-center h-64 text-slate-400">
              <Loader2 className="animate-spin" size={40} />
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50">
                <tr className="text-slate-600 border-b border-slate-200">
                  <th className="font-semibold py-4 px-6">Name & Role</th>
                  <th className="font-semibold py-4 px-6">Status</th>
                  <th className="font-semibold py-4 px-6">Current Task</th>
                  <th className="font-semibold py-4 px-6 text-right">Salary / Earned</th>
                  <th className="font-semibold py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">No employees found.</td>
                  </tr>
                ) : (
                  filtered.map((emp: any) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-6">
                        <Link href={`/admin/employees/${emp.id}`} className="font-bold text-blue-600 hover:underline">
                          {emp.name}
                        </Link>
                        <p className="text-xs text-slate-500 capitalize mt-0.5">{emp.role}</p>
                      </td>
                      <td className="py-3 px-6">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          emp.status === 'available' ? 'bg-green-100 text-green-700' : 
                          emp.status === 'on_task' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {emp.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-slate-700 max-w-[200px] truncate" title={emp.current_task}>
                        {emp.current_task || <span className="italic text-slate-400">None</span>}
                      </td>
                      <td className="py-3 px-6 text-right">
                        <p className="font-bold text-slate-900">₹{emp.salary}/mo</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">₹{emp.total_earnings} earned</p>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button 
                          onClick={() => setModalData({ id: emp.id, name: emp.name, task: emp.current_task })}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium rounded-lg text-xs transition-colors border border-blue-200"
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
          onSuccess={() => {
            setModalData(null);
            fetchEmployees();
          }}
        />
      )}
    </div>
  );
}
