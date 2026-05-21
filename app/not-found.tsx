import Link from 'next/link';
import { Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <svg className="w-48 h-48 mx-auto text-slate-800 mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <circle cx="8" cy="10" r="1.5" fill="#d97706" stroke="none"/>
            <circle cx="16" cy="10" r="1.5" fill="#d97706" stroke="none"/>
            <path d="M12 16c-2.5 0-4-1.5-4-1.5" stroke="#d97706" strokeWidth="2"/>
            <path d="M4 12c-1.5-2-1.5-5 0-7" stroke="#d97706" strokeWidth="2"/>
            <path d="M20 12c1.5-2 1.5-5 0-7" stroke="#d97706" strokeWidth="2"/>
          </svg>
          
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Whoops! Lost in the jungle?</h1>
          <p className="text-lg text-slate-600 font-medium mb-8">
            The page you are looking for has migrated or doesn't exist. Let's get you back to the main trails.
          </p>
          
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all shadow-md hover:-translate-y-1"
          >
            <Home size={20} /> Return Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
