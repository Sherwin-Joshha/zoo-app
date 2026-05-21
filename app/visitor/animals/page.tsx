'use client';

import { useState, useEffect } from 'react';
import AnimalCard from '@/components/AnimalCard';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimalEncyclopedia() {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'bird' | 'mammal'>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [zones, setZones] = useState<string[]>([]);

  useEffect(() => {
    fetchAnimals();
  }, [categoryFilter, zoneFilter]);

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      let url = '/api/animals?';
      if (categoryFilter !== 'all') url += `category=${categoryFilter}&`;
      if (zoneFilter !== 'all') url += `zone=${encodeURIComponent(zoneFilter)}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setAnimals(data.animals);
        
        if (zones.length === 0) {
          const uniqueZones = Array.from(new Set(data.animals.map((a: any) => a.zone))) as string[];
          setZones(uniqueZones.sort());
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAnimals = animals.filter((animal) => 
    animal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    animal.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Animal Encyclopedia</h1>
          <p className="text-xl text-slate-600 max-w-2xl font-medium">Discover the incredible wildlife at our zoo. Filter by category, zone, or search for your favorite animals.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl p-5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col lg:flex-row gap-5 justify-between items-center sticky top-24 z-30"
        >
          {/* Category Tabs */}
          <div className="flex bg-slate-100/80 p-1.5 rounded-2xl w-full lg:w-auto border border-slate-200/50">
            {['all', 'bird', 'mammal'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat as any)}
                className={`flex-1 lg:flex-none px-8 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 relative ${
                  categoryFilter === cat 
                    ? 'text-green-800' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {categoryFilter === cat && (
                  <motion.div 
                    layoutId="activeCategory" 
                    className="absolute inset-0 bg-white shadow-sm rounded-xl border border-slate-100 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Zone Filter */}
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="px-5 py-3 rounded-2xl border border-slate-200/80 bg-white/50 text-slate-700 text-sm font-bold focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none w-full sm:w-56 transition-all"
            >
              <option value="all">🌍 All Zones</option>
              {zones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search animals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-3 rounded-2xl border border-slate-200/80 bg-white/50 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm font-medium transition-all shadow-inner shadow-slate-50/50"
              />
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-40">
            <Loader2 className="animate-spin text-green-500" size={56} strokeWidth={1.5} />
          </div>
        ) : filteredAnimals.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-white p-20 text-center shadow-sm max-w-2xl mx-auto mt-10"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-3">No animals found</h3>
            <p className="text-slate-500 font-medium text-lg">Try adjusting your filters or search query to discover more species.</p>
            <button 
              onClick={() => { setCategoryFilter('all'); setZoneFilter('all'); setSearchQuery(''); }}
              className="mt-8 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredAnimals.map((animal, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  key={animal.id}
                >
                  <AnimalCard animal={animal} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
