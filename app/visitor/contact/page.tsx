'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle2, MessageSquare } from 'lucide-react';

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
    } catch (err) {
      setError('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Need Help? We're Here.</h1>
        <p className="text-lg text-slate-600">
          Whether you have a question about your tickets or need assistance on the zoo grounds, our support team is ready to assist you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Contact Cards & Guide */}
        <div className="lg:col-span-1 space-y-6">
          
          <a href="tel:+18005550199" className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Phone Support</h3>
                <p className="text-sm text-slate-500">9:00 AM – 6:00 PM</p>
              </div>
            </div>
            <p className="text-blue-600 font-semibold mt-4">+1 (800) 555-0199</p>
          </a>

          <a href="mailto:support@zoo.local" className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Email Support</h3>
                <p className="text-sm text-slate-500">Expect a reply within 2 hrs</p>
              </div>
            </div>
            <p className="text-green-600 font-semibold mt-4">support@zoo.local</p>
          </a>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">On-site Help Desks</h3>
                <p className="text-sm text-slate-500">Find staff across the zoo</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" /> Near the Main Gate Entrance</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" /> Central Food Court Kiosk</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" /> Aviary Zone Rest Area</li>
            </ul>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-400" />
              How to Seek Help
            </h3>
            <ol className="space-y-4 text-sm text-slate-300 list-decimal list-inside marker:text-slate-500 font-medium">
              <li>Identify your exact location (Zone or nearest Animal).</li>
              <li>For immediate emergencies, call the hotlines directly.</li>
              <li>For ticketing or feedback, use the contact form here.</li>
              <li>Keep your Ticket ID ready when speaking to support.</li>
            </ol>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 h-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
            
            {success ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center h-64">
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700">Thank you for reaching out. Our support team will get back to you shortly.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <input 
                      type="text" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input 
                      type="email" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Issue Type</label>
                  <select 
                    value={formData.issue_type} onChange={e => setFormData({...formData, issue_type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Ticketing Issue</option>
                    <option>Lost & Found</option>
                    <option>Feedback/Complaint</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea 
                    required rows={5}
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : 'Submit Request'}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
