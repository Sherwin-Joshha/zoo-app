import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-2 rounded-lg text-white shadow-lg shadow-green-900/30">
                <Leaf size={18} strokeWidth={2.5} />
              </div>
              <span className="font-black text-lg text-white tracking-tight">WildTrails Zoo</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              Where nature comes alive. Home to 50+ species across 5 immersive zones, crafted to inspire and educate.
            </p>
            <div className="flex items-center gap-2">
              {['TW', 'IG', 'FB'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-green-700 text-slate-400 hover:text-white flex items-center justify-center transition-all text-[10px] font-bold border border-slate-700/50 hover:border-green-600"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Plan Your Visit', href: '/login' },
                { name: 'Book Tickets', href: '/login' },
                { name: 'Interactive Zoo Map', href: '/login' },
                { name: 'Animal Encyclopedia', href: '/login' },
                { name: 'Safety Guidelines', href: '/login' },
                { name: 'Contact Support', href: '/login' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:text-green-400 transition-colors group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-green-500 transition-colors flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Hours */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5">Visit Us</h3>
            <ul className="space-y-3.5 text-sm mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">123 Wildlife Boulevard,<br />Nature Park, NP 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-green-500 flex-shrink-0" />
                <a href="tel:+18005550199" className="hover:text-green-400 transition-colors">+1 (800) 555-0199</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-green-500 flex-shrink-0" />
                <a href="mailto:support@zoo.local" className="hover:text-green-400 transition-colors">support@zoo.local</a>
              </li>
            </ul>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">Opening Hours</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mon – Fri</span>
                  <span className="text-slate-200 font-semibold">9AM – 6PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sat – Sun</span>
                  <span className="text-green-400 font-semibold">8AM – 8PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Divider + Bottom bar */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} WildTrails Zoo. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span className="text-slate-800">·</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span className="text-slate-800">·</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
