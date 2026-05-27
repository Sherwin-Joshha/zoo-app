'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Bird, Map, Ticket, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 24 } },
  };

  const features = [
    {
      icon: Bird,
      title: 'Diverse Wildlife',
      desc: 'Explore 50+ species across 5 uniquely designed immersive zones mirroring natural habitats from around the globe.',
      color: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50',
      badge: '50+ Species',
    },
    {
      icon: Map,
      title: 'Interactive Map',
      desc: 'Navigate the zoo effortlessly with our real-time digital map. Locate your favorite animals and plan the perfect route.',
      color: 'from-amber-500 to-yellow-500',
      bg: 'bg-amber-50',
      badge: '5 Zones',
    },
    {
      icon: Ticket,
      title: 'Easy Booking',
      desc: 'Skip the lines. Purchase tickets online, receive instant digital QR passes, and walk right through the gates.',
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50',
      badge: 'Instant QR',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] selection:bg-green-200 selection:text-green-900">
      <Navbar />

      <main className="flex-grow">

        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden pt-24 pb-36">

          {/* Background blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-green-100/50 to-emerald-50/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/40 to-teal-50/10 rounded-full blur-3xl"
            />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-amber-100/20 rounded-full blur-3xl" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md text-green-700 font-bold text-sm mb-10 border border-green-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              Open Today: 9AM – 6PM
              <Sparkles size={14} className="text-amber-500" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.05]"
            >
              Where Nature
              <br className="hidden md:block" />
              <span className="relative inline-block ml-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
                  Comes Alive.
                </span>
                <motion.svg
                  className="absolute w-full h-4 -bottom-2 left-0 text-green-400 opacity-60"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
                    d="M 0 5 Q 50 14 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Experience the wonder of wildlife in our immersive, state-of-the-art habitats. Book your adventure today and connect with nature like never before.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/45 flex items-center gap-2 text-base transition-shadow"
                >
                  Book Tickets <ArrowRight size={18} />
                </motion.div>
              </Link>
              <Link href="#features">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40 flex items-center gap-2 text-base transition-all"
                >
                  Explore Features
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 mt-14">
              {[
                { icon: Bird, text: '50+ Species' },
                { icon: Shield, text: 'Safety First' },
                { icon: Clock, text: 'Open Daily' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <div className="w-7 h-7 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                    <Icon size={14} className="text-green-600" />
                  </div>
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Features Section ── */}
        <section id="features" className="py-28 relative bg-white">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#f8fafc] to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-18"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-5 border border-green-200/60">
                <Sparkles size={12} /> Everything you need
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">
                Everything for a perfect day
              </h2>
              <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Our modern facilities and digital tools ensure your visit is seamless, safe, and truly unforgettable.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {features.map(({ icon: Icon, title, desc, color, bg, badge }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -8 }}
                  className="relative bg-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-slate-100 group hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  {/* Badge */}
                  <div className={`absolute top-6 right-6 px-2.5 py-1 ${bg} rounded-full text-[11px] font-bold text-slate-600`}>
                    {badge}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${color} text-white rounded-2xl flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 transition-transform duration-400`}>
                    <Icon size={32} strokeWidth={1.75} />
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-400/20 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-yellow-300/20 blur-2xl" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
              Ready for your wild adventure?
            </h2>
            <p className="text-emerald-100 text-lg font-medium mb-10 max-w-2xl mx-auto">
              Book tickets online in seconds, get instant QR passes, and skip the queues. Your family will love it.
            </p>
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-black rounded-full text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow"
              >
                Get Started Today <ArrowRight size={18} />
              </motion.div>
            </Link>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
