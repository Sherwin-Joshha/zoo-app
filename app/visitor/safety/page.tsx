import {
  AlertTriangle,
  ShieldAlert,
  MapPin,
  Ban,
  HeartHandshake,
  Phone,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] pb-20">

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center sm:text-left">
          <div className="flex items-center gap-2.5 font-bold text-sm">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle size={18} className="animate-pulse" />
            </div>
            Zoo Emergency Hotlines
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm">
            <a href="tel:+18005550199" className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl transition-colors font-semibold">
              <Phone size={15} /> Medical: +1 (800) 555-0199
            </a>
            <a href="tel:+18005550200" className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl transition-colors font-semibold">
              <ShieldAlert size={15} /> Security: +1 (800) 555-0200
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert size={14} /> Safety First
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Zoo Safety Guidelines</h1>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Your safety and the well-being of our animals are our top priorities. Please review these guidelines carefully before your visit.
          </p>
        </div>

        <div className="space-y-6">

          {/* General Rules */}
          <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100 bg-blue-50/50">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-lg font-black text-slate-900">General Rules</h2>
            </div>
            <div className="p-7">
              <ul className="space-y-3">
                {[
                  { text: <><strong className="text-slate-800">Do not feed the animals.</strong> They have carefully formulated diets.</> },
                  { text: 'Stay on marked public paths and boardwalks at all times.' },
                  { text: 'Do not tap on glass enclosures or shout at the animals.' },
                  { text: 'Children under 14 must be accompanied by an adult.' },
                  { text: 'Dispose of trash and recycling in the designated bins to protect wildlife.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-sm leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Animal Interaction */}
          <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100 bg-green-50/50">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <HeartHandshake size={20} />
              </div>
              <h2 className="text-lg font-black text-slate-900">Animal Interaction Guidelines</h2>
            </div>
            <div className="p-7">
              <ul className="space-y-3">
                {[
                  'Only interact with animals in designated "Petting Zoo" areas under staff supervision.',
                  'Do not attempt to reach through or climb over fences, barriers, or moats.',
                  'Keep all personal items (cameras, phones, hats) securely fastened near enclosures.',
                  'Use flash photography only where explicitly permitted (look for signs).',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Prohibited Items */}
          <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100 bg-orange-50/50">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Ban size={20} />
              </div>
              <h2 className="text-lg font-black text-slate-900">Prohibited Items</h2>
            </div>
            <div className="p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Balloons and flying toys (drones, kites)',
                  'Glass containers or bottles',
                  'Alcoholic beverages',
                  'Outside animal feed or raw food',
                  'Pets (only registered service animals permitted)',
                  'Bicycles, skateboards, or rollerblades',
                  'Laser pointers',
                  'Loud radios or speakers',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100/60">
                    <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Ban size={11} />
                    </div>
                    <span className="text-sm text-slate-600 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Emergency Procedures */}
          <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100 bg-amber-50/50">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldAlert size={20} />
              </div>
              <h2 className="text-lg font-black text-slate-900">Emergency Procedures</h2>
            </div>
            <div className="p-7">
              <ul className="space-y-3 mb-6">
                {[
                  'In the event of an animal escape or severe weather, listen to the PA system for instructions.',
                  'If instructed to evacuate, proceed calmly to the nearest marked exit or Assembly Point.',
                  'Do not attempt to assist staff with animal emergencies. Follow staff directions immediately.',
                  'Lost children should be escorted to the Main Office at the Front Gate.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">{i + 1}</div>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 flex items-start gap-3">
                <MapPin size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900 mb-1">Primary Assembly Points</p>
                  <p className="text-sm text-amber-800">1. Main Entrance Plaza · 2. Central Food Court · 3. South Gate Parking Lot</p>
                </div>
              </div>
            </div>
          </section>

          {/* First Aid */}
          <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100 bg-red-50/50">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <h2 className="text-lg font-black text-slate-900">First Aid Locations</h2>
            </div>
            <div className="p-7">
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                First aid stations are staffed by certified medical professionals and are equipped to handle minor injuries, dehydration, and medical emergencies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { num: '1', title: 'Main Entrance Station', desc: 'Located next to the ticket counters. Open during all zoo hours.' },
                  { num: '2', title: 'Jungle Zone Kiosk', desc: 'Located near the Rainforest Cafe.' },
                  { num: '3', title: 'Savanna Outpost', desc: 'Mobile first-aid cart patrolling the Safari trails.' },
                ].map(({ num, title, desc }) => (
                  <div key={num} className="p-5 bg-red-50 rounded-xl border border-red-100">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-black text-sm mb-3 shadow-sm">
                      {num}
                    </div>
                    <p className="font-bold text-slate-800 text-sm mb-1">{title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
