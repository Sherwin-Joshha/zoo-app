import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 px-4 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Leaf size={24} className="text-green-500" />
          <span className="font-bold text-xl text-white tracking-tight">WildTrails Zoo</span>
        </div>
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} WildTrails Zoo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
