'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

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
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2">Assign Task</h3>
        <p className="text-sm text-slate-500 mb-6">Assigning a new task to <strong className="text-slate-800">{employeeName}</strong>.</p>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Task Description</label>
            <textarea
              rows={4}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. Clean the aviary zone..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Assign Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
