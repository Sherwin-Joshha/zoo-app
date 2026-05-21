import { 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  Ban, 
  HeartHandshake, 
  Phone, 
  AlertCircle
} from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative pb-20">
      
      {/* Sticky Emergency Banner */}
      <div className="sticky top-0 z-50 bg-red-600 text-white px-4 py-3 shadow-md flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center">
        <div className="flex items-center gap-2 font-semibold">
          <AlertCircle size={20} className="animate-pulse" />
          <span>Zoo Emergency Hotlines:</span>
        </div>
        <div className="flex items-center gap-4 text-sm sm:text-base">
          <a href="tel:+18005550199" className="flex items-center gap-1.5 hover:underline">
            <Phone size={16} /> Medical: +1 (800) 555-0199
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="tel:+18005550200" className="flex items-center gap-1.5 hover:underline">
            <ShieldAlert size={16} /> Security: +1 (800) 555-0200
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Zoo Safety Guidelines</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your safety and the well-being of our animals are our top priorities. Please review these guidelines carefully before beginning your visit.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Section: General Rules */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">General Rules</h2>
            </div>
            <ul className="space-y-3 text-slate-600 list-disc list-inside ml-2 marker:text-blue-500">
              <li><strong className="text-slate-800">Do not feed the animals.</strong> They have carefully formulated diets.</li>
              <li>Stay on marked public paths and boardwalks at all times.</li>
              <li>Do not tap on glass enclosures or shout at the animals.</li>
              <li>Children under 14 must be accompanied by an adult.</li>
              <li>Dispose of trash and recycling in the designated bins to protect wildlife.</li>
            </ul>
          </section>

          {/* Section: Animal Interaction Guidelines */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <HeartHandshake size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Animal Interaction Guidelines</h2>
            </div>
            <ul className="space-y-3 text-slate-600 list-disc list-inside ml-2 marker:text-green-500">
              <li>Only interact with animals in designated "Petting Zoo" areas under staff supervision.</li>
              <li>Do not attempt to reach through or climb over fences, barriers, or moats.</li>
              <li>Keep all personal items (cameras, phones, hats) securely fastened near enclosures.</li>
              <li>Use flash photography only where explicitly permitted (look for signs).</li>
            </ul>
          </section>

          {/* Section: Prohibited Items */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                <Ban size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Prohibited Items</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
              <ul className="space-y-3 list-disc list-inside ml-2 marker:text-slate-400">
                <li>Balloons and flying toys (drones, kites)</li>
                <li>Glass containers or bottles</li>
                <li>Alcoholic beverages</li>
                <li>Outside animal feed or raw food</li>
              </ul>
              <ul className="space-y-3 list-disc list-inside ml-2 marker:text-slate-400">
                <li>Pets (only registered service animals are permitted)</li>
                <li>Bicycles, skateboards, or rollerblades</li>
                <li>Laser pointers</li>
                <li>Loud radios or speakers</li>
              </ul>
            </div>
          </section>

          {/* Section: Emergency Procedures */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <ShieldAlert size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Emergency Procedures</h2>
            </div>
            <ul className="space-y-3 text-slate-600 list-disc list-inside ml-2 marker:text-amber-500 mb-6">
              <li>In the event of an animal escape or severe weather, listen to the PA system for instructions.</li>
              <li>If instructed to evacuate, proceed calmly to the nearest marked exit or Assembly Point.</li>
              <li>Do not attempt to assist staff with animal emergencies. Follow staff directions immediately.</li>
              <li>Lost children should be escorted to the Main Office at the Front Gate.</li>
            </ul>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3 text-amber-900">
              <MapPin size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Primary Assembly Points:</strong>
                <p className="text-sm mt-1">1. Main Entrance Plaza<br/>2. Central Food Court<br/>3. South Gate Parking Lot</p>
              </div>
            </div>
          </section>

          {/* Section: First Aid Locations */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <MapPin size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">First Aid Locations</h2>
            </div>
            <p className="text-slate-600 mb-6">
              First aid stations are staffed by certified medical professionals and are equipped to handle minor injuries, dehydration, and medical emergencies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fake Map Snippet */}
              <div className="relative h-48 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center rounded-full shadow-lg border-4 border-white mb-2">
                    <span className="font-bold text-xl">+</span>
                  </div>
                  <span className="bg-white/90 px-3 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm">Main First Aid Station</span>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4 text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">1</div>
                  <div>
                    <strong className="text-slate-800 block">Main Entrance Station</strong>
                    <span className="text-sm">Located next to the ticket counters. Open during all zoo hours.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">2</div>
                  <div>
                    <strong className="text-slate-800 block">Jungle Zone Kiosk</strong>
                    <span className="text-sm">Located near the Rainforest Cafe.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">3</div>
                  <div>
                    <strong className="text-slate-800 block">Savanna Outpost</strong>
                    <span className="text-sm">Mobile first-aid cart patrolling the Safari trails.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
