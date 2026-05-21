'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', issue_type: 'General Inquiry', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', issue_type: 'General Inquiry', message: '' });
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setError('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] py-12 px-4 sm:px-6 lg:px-8">

      {/* Hero */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <MessageSquare size={13} /> Support
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">We&apos;re Here to Help</h1>
        <p className="text-base text-slate-500 leading-relaxed">
          Whether you have a question about tickets or need on-site assistance, our support team is ready.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">

          <a
            href="tel:+18005550199"
            className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Phone Support</h3>
              <p className="text-xs text-slate-400 mb-1">9:00 AM – 6:00 PM</p>
              <p className="text-blue-600 font-bold text-sm">+1 (800) 555-0199</p>
            </div>
          </a>

          <a
            href="mailto:support@zoo.local"
            className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-green-200 transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Email Support</h3>
              <p className="text-xs text-slate-400 mb-1">Reply within 2 hours</p>
              <p className="text-green-600 font-bold text-sm">support@zoo.local</p>
            </div>
          </a>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">On-site Help Desks</h3>
                <p className="text-xs text-slate-400">Staff available across the zoo</p>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                'Near the Main Gate Entrance',
                'Central Food Court Kiosk',
                'Aviary Zone Rest Area',
              ].map((loc) => (
                <li key={loc} className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  {loc}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-base mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-400" />
              How to Seek Help
            </h3>
            <ol className="space-y-3 text-sm text-slate-300">
              {[
                'Identify your exact location (Zone or nearest animal).',
                'For immediate emergencies, call the hotlines directly.',
                'For ticketing or feedback, use the contact form.',
                'Keep your Ticket ID ready when contacting support.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 shadow-sm">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden h-full">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Send size={18} className="text-slate-400" />
                Send us a Message
              </h2>
              <p className="text-slate-400 text-sm mt-1">We typically respond within 2 hours during business hours.</p>
            </div>

            <div className="p-8">
              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mb-5">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-8 max-w-sm">Thank you for reaching out. Our support team will get back to you shortly.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm font-medium">
                      <span className="font-bold">!</span> {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-green-500/15 focus:border-green-500 outline-none transition-all text-slate-900"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-green-500/15 focus:border-green-500 outline-none transition-all text-slate-900"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Issue Type</label>
                    <select
                      value={formData.issue_type}
                      onChange={e => setFormData({ ...formData, issue_type: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-green-500/15 focus:border-green-500 outline-none transition-all text-slate-900"
                    >
                      <option>General Inquiry</option>
                      <option>Ticketing Issue</option>
                      <option>Lost & Found</option>
                      <option>Feedback/Complaint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-4 focus:ring-green-500/15 focus:border-green-500 outline-none transition-all resize-none text-slate-900"
                      placeholder="How can we help you today?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                  >
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={16} /> Submit Request</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
