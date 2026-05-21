'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bird, MapPin, PawPrint, Image as ImageIcon, ArrowRight } from 'lucide-react';
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

  const isBird = animal.category === 'bird';

  return (
    <Link href={`/visitor/animals/${animal.id}`} className="block h-full outline-none">
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col group hover:shadow-xl hover:border-slate-200 transition-shadow"
      >
        {/* Image */}
        <div className="relative h-52 w-full bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
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
            <div className="flex flex-col items-center justify-center text-slate-300">
              <ImageIcon size={40} className="mb-2 opacity-40" />
              <span className="text-xs font-medium text-slate-400">No Image</span>
            </div>
          )}

          {/* Gradient overlay on bottom */}
          {hasImage && (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md shadow-sm border ${
              isBird
                ? 'bg-sky-500/90 text-white border-sky-400/40'
                : 'bg-amber-500/90 text-white border-amber-400/40'
            }`}>
              {isBird ? <Bird size={12} /> : <PawPrint size={12} />}
              <span className="capitalize">{animal.category}</span>
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex-grow flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-lg font-black text-slate-900 group-hover:text-green-700 transition-colors leading-tight mb-0.5">
              {animal.name}
            </h3>
            <p className="text-sm italic text-slate-400">{animal.species}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm">
              <MapPin size={14} className="text-green-600 flex-shrink-0" />
              <span className="text-slate-500 font-medium text-xs">{animal.zone}</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-green-600 flex items-center justify-center border border-slate-200 group-hover:border-green-600 transition-all shadow-sm">
              <ArrowRight size={13} className="text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
