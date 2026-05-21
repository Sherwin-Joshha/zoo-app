'use client';

import { useState } from 'react';
import { X, Loader2, Briefcase, CheckCircle2 } from 'lucide-react';

type Props = {
  employeeId: number;
  employeeName: string;
  currentTask: string | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AssignTaskModal({ employeeId, employeeName, currentTask, onClose, onSuccess }: Props) {
  const [task, setTask] = useState(currentTask || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/employees/${employeeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_task: task || null }),
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess();
      } else {
        setError(data.error || 'Failed to assign task');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full relative shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Assign Task</h3>
                <p className="text-blue-100 text-xs mt-0.5">
                  To <span className="font-bold text-white">{employeeName}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-7">
          {currentTask && (
            <div className="mb-5 p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">Current Task</p>
              <p className="font-medium">{currentTask}</p>
            </div>
          )}

          {error && (
            <div className="mb-5 flex items-center gap-2 bg-red-50 text-red-700 p-3.5 rounded-xl border border-red-200 text-sm font-medium">
              <span className="font-bold">!</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                New Task Description
              </label>
              <textarea
                rows={4}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. Clean and maintain the aviary zone…"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-blue-500/15 focus:border-blue-400 outline-none transition-all resize-none text-slate-900 text-sm"
              />
              <p className="text-xs text-slate-400 mt-1.5">Leave blank to clear the current task.</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-70 flex justify-center items-center gap-2 shadow-md shadow-blue-500/20"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Saving…</>
                ) : (
                  <><CheckCircle2 size={16} /> Assign Task</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
