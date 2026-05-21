'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bird, MapPin, PawPrint, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Animal = {
  id: number;
  name: string;
  species: string;
  category: 'bird' | 'mammal';
  zone: string;
  image_filename: string | null;
};

export default function AnimalCard({ animal }: { animal: Animal }) {
  const [imgError, setImgError] = useState(false);
  
  const hasImage = !imgError && animal.image_filename;

  return (
    <Link href={`/visitor/animals/${animal.id}`} className="block h-full outline-none">
      <motion.div 
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden h-full flex flex-col group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
        
        <div className="relative h-56 w-full bg-slate-50 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {hasImage ? (
            <Image
              src={`/animal_images/${animal.image_filename}`}
              alt={animal.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <ImageIcon size={48} className="mb-3 opacity-30" />
              <span className="text-sm font-medium">Image Not Available</span>
            </div>
          )}
          
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-slate-800 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/40">
              {animal.category === 'bird' ? <Bird size={14} className="text-blue-500"/> : <PawPrint size={14} className="text-amber-500"/>}
              <span className="capitalize">{animal.category}</span>
            </span>
          </div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col justify-between relative z-20 bg-white/50">
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-green-700 transition-colors">{animal.name}</h3>
            <p className="text-sm font-medium italic text-slate-500 mb-5">{animal.species}</p>
          </div>
          
          <div className="flex items-center text-sm text-slate-700 bg-white/60 px-4 py-3 rounded-xl shadow-inner shadow-white/80 border border-slate-100 mt-2">
            <MapPin size={18} className="text-green-600 mr-2" />
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Zone</span>
            <span className="ml-2 font-bold text-slate-800">{animal.zone}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
