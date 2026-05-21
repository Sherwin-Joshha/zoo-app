import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bird, PawPrint, MapPin, Clock, Utensils, Info, Image as ImageIcon, Leaf } from 'lucide-react';
import pool from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function AnimalDetailPage({ params }: { params: { id: string } }) {
  const [rows]: any = await pool.execute('SELECT * FROM animals WHERE id = ?', [params.id]);

  if (rows.length === 0) {
    notFound();
  }

  const animal = rows[0];
  const hasImage = !!animal.image_filename;
  const isBird = animal.category === 'bird';

  return (
    <div className="min-h-screen bg-[#f6f8fb] pb-20">

      {/* Hero */}
      <div className="relative w-full h-72 md:h-[420px] bg-slate-800 overflow-hidden">
        {hasImage ? (
          <Image
            src={`/animal_images/${animal.image_filename}`}
            alt={animal.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center text-slate-400">
            <ImageIcon size={64} className="mb-4 opacity-30" />
            <span className="text-base font-medium">Image Not Available</span>
          </div>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 to-transparent" />

        {/* Back link */}
        <div className="absolute top-5 left-5 md:left-10 z-10">
          <Link
            href="/visitor/animals"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold transition-all"
          >
            <ArrowLeft size={16} />
            Back to Animals
          </Link>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 w-full px-5 pb-8 md:px-12 md:pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm border ${
                isBird
                  ? 'bg-sky-500/80 text-white border-sky-400/30 backdrop-blur-md'
                  : 'bg-amber-500/80 text-white border-amber-400/30 backdrop-blur-md'
              }`}>
                {isBird ? <Bird size={13} /> : <PawPrint size={13} />}
                <span className="capitalize">{animal.category}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-green-500/80 text-white border border-green-400/30 backdrop-blur-md">
                <Leaf size={12} /> {animal.zone}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">{animal.name}</h1>
            <p className="text-lg text-slate-300 mt-1 italic">{animal.species}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 md:px-12 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">

          {/* Fun Fact */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Info size={20} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Did You Know?</h2>
            </div>
            <blockquote className="text-lg text-slate-700 leading-relaxed bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 italic font-medium">
              &ldquo;{animal.fun_fact}&rdquo;
            </blockquote>
          </div>

          {/* Habitat */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Leaf size={20} className="text-green-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900">About the Habitat</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-base">
              The <span className="font-bold text-slate-800">{animal.name}</span> naturally resides in{' '}
              <span className="text-slate-700">{animal.habitat?.toLowerCase() || 'various habitats'}</span>.
              In our zoo, we have meticulously recreated this environment in the{' '}
              <span className="font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-md">{animal.zone}</span>{' '}
              zone to ensure they thrive and feel at home.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {[
            {
              icon: MapPin,
              color: 'text-green-700',
              bg: 'bg-green-100',
              label: 'Location',
              value: animal.zone,
            },
            {
              icon: Utensils,
              color: 'text-amber-700',
              bg: 'bg-amber-100',
              label: 'Diet',
              value: animal.diet ? animal.diet.charAt(0).toUpperCase() + animal.diet.slice(1) : 'Unknown',
            },
            {
              icon: Clock,
              color: 'text-blue-700',
              bg: 'bg-blue-100',
              label: 'Avg. Lifespan',
              value: animal.lifespan ? `${animal.lifespan} years` : 'Unknown',
            },
          ].map(({ icon: Icon, color, bg, label, value }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${bg} ${color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-base font-black text-slate-900">{value}</p>
              </div>
            </div>
          ))}

          {/* Back button */}
          <Link
            href="/visitor/animals"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-colors shadow-sm mt-2"
          >
            <ArrowLeft size={16} /> Back to Encyclopedia
          </Link>
        </div>
      </div>
    </div>
  );
}
