'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Bird, Map, Ticket, ArrowRight, Sparkles } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] selection:bg-green-200">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-28 pb-40">
          
          {/* Parallax Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-tr from-green-100/40 to-emerald-50/10 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/40 to-teal-50/10 rounded-full blur-3xl"
            />
            
            {/* SVG Leaf Pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djI2aC0xMlYzNGgtMTRWMjJoMTRWMGgxMnYyMmgxNHYxMmgtMTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md text-green-700 font-bold text-sm mb-8 border border-green-200/50 shadow-[0_8px_16px_rgb(0,0,0,0.03)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Open Today: 9AM - 6PM <Sparkles size={16} className="text-amber-500 ml-1" />
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.1]">
              Where Nature <br className="hidden md:block" /> 
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">Comes Alive.</span>
                <motion.svg className="absolute w-full h-4 -bottom-2 left-0 text-green-400 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    d="M 0 5 Q 50 15 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" 
                  />
                </motion.svg>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              Experience the wonder of wildlife in our immersive, state-of-the-art habitats. Book your adventure today and connect with nature like never before.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/login" className="w-full sm:w-auto">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 text-lg"
                >
                  Book Tickets <ArrowRight size={20} />
                </motion.div>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-800 font-bold rounded-full shadow-sm hover:shadow-md border border-slate-200/60 flex items-center justify-center text-lg transition-colors hover:bg-white"
                >
                  Learn More
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative bg-white">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f8fafc] to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Everything for a perfect day</h2>
              <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Our modern facilities and digital tools ensure your visit is seamless, safe, and unforgettable.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-slate-100 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-50 text-green-600 rounded-3xl flex items-center justify-center mb-8 shadow-inner shadow-white group-hover:scale-110 transition-transform duration-500">
                  <Bird size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Diverse Wildlife</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-lg">Explore over 50+ species across 5 uniquely designed immersive zones mirroring natural habitats.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-slate-100 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-inner shadow-white group-hover:scale-110 transition-transform duration-500">
                  <Map size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Interactive Map</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-lg">Navigate the zoo effortlessly with our real-time digital map, locating your favorite animals instantly.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgb(0,0,0,0.04)] border border-slate-100 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-50 text-amber-600 rounded-3xl flex items-center justify-center mb-8 shadow-inner shadow-white group-hover:scale-110 transition-transform duration-500">
                  <Ticket size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Easy Booking</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-lg">Skip the lines. Purchase tickets online, receive instant digital QR passes, and walk right in.</p>
              </motion.div>
              
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
