'use client';

import { useState, useTransition } from 'react';
import { addAnimal } from './actions';
import { Save, AlertCircle, CheckCircle2, PawPrint } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Zone {
  id: number;
  zone_name: string;
}

export default function AddAnimalForm({ zones }: { zones: Zone[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await addAnimal(formData);
      if (result.success) {
        setSuccess(true);
        // Reset form
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(result.error || 'Something went wrong.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200">
          <AlertCircle size={20} className="text-red-500" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-3 border border-emerald-200">
          <CheckCircle2 size={20} className="text-emerald-500" />
          <p className="text-sm font-medium">Animal added successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-bold text-slate-700">Animal Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder="e.g. African Elephant"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none" 
          />
        </div>

        {/* Species */}
        <div className="space-y-2">
          <label htmlFor="species" className="text-sm font-bold text-slate-700">Scientific Name (Species) *</label>
          <input 
            type="text" 
            id="species" 
            name="species" 
            required 
            placeholder="e.g. Loxodonta africana"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none" 
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-bold text-slate-700">Category *</label>
          <select 
            id="category" 
            name="category" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none appearance-none"
          >
            <option value="">Select Category</option>
            <option value="mammal">Mammal</option>
            <option value="bird">Bird</option>
            <option value="reptile">Reptile</option>
          </select>
        </div>

        {/* Zone */}
        <div className="space-y-2">
          <label htmlFor="zone" className="text-sm font-bold text-slate-700">Zone *</label>
          <select 
            id="zone" 
            name="zone" 
            required 
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none appearance-none"
          >
            <option value="">Select Zone</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.zone_name}>{zone.zone_name}</option>
            ))}
          </select>
        </div>

        {/* Habitat */}
        <div className="space-y-2">
          <label htmlFor="habitat" className="text-sm font-bold text-slate-700">Habitat</label>
          <input 
            type="text" 
            id="habitat" 
            name="habitat" 
            placeholder="e.g. Savanna"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none" 
          />
        </div>

        {/* Lifespan */}
        <div className="space-y-2">
          <label htmlFor="lifespan" className="text-sm font-bold text-slate-700">Lifespan (Years)</label>
          <input 
            type="number" 
            id="lifespan" 
            name="lifespan" 
            placeholder="e.g. 60"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none" 
          />
        </div>

        {/* Diet */}
        <div className="space-y-2">
          <label htmlFor="diet" className="text-sm font-bold text-slate-700">Diet</label>
          <input 
            type="text" 
            id="diet" 
            name="diet" 
            placeholder="e.g. Herbivore"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none" 
          />
        </div>

        {/* Image Filename */}
        <div className="space-y-2">
          <label htmlFor="image_filename" className="text-sm font-bold text-slate-700">Image Filename</label>
          <input 
            type="text" 
            id="image_filename" 
            name="image_filename" 
            placeholder="e.g. elephant.jpg"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none" 
          />
        </div>
      </div>

      {/* Fun Fact */}
      <div className="space-y-2">
        <label htmlFor="fun_fact" className="text-sm font-bold text-slate-700">Fun Fact</label>
        <textarea 
          id="fun_fact" 
          name="fun_fact" 
          rows={3}
          placeholder="e.g. Elephants are the only animals that can't jump."
          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none resize-none" 
        />
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={20} />
          )}
          {isPending ? 'Saving...' : 'Save Animal'}
        </button>
      </div>
    </form>
  );
}
