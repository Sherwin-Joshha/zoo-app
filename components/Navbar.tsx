'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              className="bg-gradient-to-br from-green-500 to-emerald-700 p-2.5 rounded-xl text-white shadow-lg shadow-green-500/25"
            >
              <Leaf size={22} strokeWidth={2.5} />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight group-hover:from-green-700 group-hover:to-emerald-600 transition-all duration-300">
                WildTrails
              </span>
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-[0.15em] hidden sm:block">
                Zoo & Wildlife
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1">
              {[{ label: 'Features', href: '/#features' }].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-semibold text-slate-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </Link>
              ))}
            </div>

            {/* Open badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open Today
            </div>

            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2.5 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-sm font-bold rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition-shadow"
              >
                Log In
              </motion.button>
            </Link>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}
