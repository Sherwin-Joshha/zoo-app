'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-gradient-to-br from-green-500 to-emerald-700 p-2.5 rounded-xl text-white shadow-md shadow-green-500/20"
            >
              <Leaf size={28} />
            </motion.div>
            <span className="font-black text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300">
              WildTrails
            </span>
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600">
              <Link href="/#features" className="relative group">
                <span className="hover:text-green-600 transition-colors">Features</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full rounded-full"></span>
              </Link>
            </div>
            <Link href="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-shadow"
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
