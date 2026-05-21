import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bird, PawPrint, MapPin, Clock, Utensils, Info, Image as ImageIcon } from 'lucide-react';
import pool from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function AnimalDetailPage({ params }: { params: { id: string } }) {
  const [rows]: any = await pool.execute('SELECT * FROM animals WHERE id = ?', [params.id]);
  
  if (rows.length === 0) {
    notFound();
  }

  const animal = rows[0];
  const hasImage = !!animal.image_filename;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Image Section */}
      <div className="relative w-full h-64 md:h-96 bg-slate-800 flex items-center justify-center">
        {hasImage ? (
          <Image
            src={`/animal_images/${animal.image_filename}`}
            alt={animal.name}
            fill
            className="object-cover opacity-80"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <ImageIcon size={64} className="mb-4 opacity-50" />
            <span className="text-lg font-medium">Image Not Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        
        {/* Nav */}
        <div className="absolute top-6 left-6 md:left-12">
          <Link href="/visitor/animals" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium transition-all">
            <ArrowLeft size={18} />
            Back to Animals
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-300 backdrop-blur-md border border-green-500/30 shadow-sm">
                  {animal.category === 'bird' ? <Bird size={16} /> : <PawPrint size={16} />}
                  <span className="capitalize">{animal.category}</span>
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{animal.name}</h1>
              <p className="text-xl text-slate-300 mt-2 italic">{animal.species}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Info className="text-blue-500" />
              Did you know?
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed bg-blue-50/50 p-6 rounded-2xl border border-blue-100 italic">
              "{animal.fun_fact}"
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About the Habitat</h2>
            <p className="text-slate-600 leading-relaxed">
              The {animal.name} naturally resides in {animal.habitat?.toLowerCase() || 'various habitats'}. 
              In our zoo, we have recreated this environment meticulously in the <span className="font-semibold text-slate-800">{animal.zone}</span> zone to ensure they thrive.
            </p>
          </div>

        </div>

        {/* Info Cards Sidebar */}
        <div className="space-y-4">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-xl text-green-700">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-0.5">Location</p>
              <p className="text-lg font-bold text-slate-900">{animal.zone}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-start gap-4">
            <div className="p-3 bg-amber-100 rounded-xl text-amber-700">
              <Utensils size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-0.5">Diet</p>
              <p className="text-lg font-bold text-slate-900 capitalize">{animal.diet || 'Unknown'}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-0.5">Avg. Lifespan</p>
              <p className="text-lg font-bold text-slate-900">{animal.lifespan ? `${animal.lifespan} years` : 'Unknown'}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
