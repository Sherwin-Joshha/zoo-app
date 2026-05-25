'use client';

// npm install react-leaflet leaflet @types/leaflet
// Add to next.config.js: transpilePackages: ['react-leaflet', 'leaflet']

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { getZoneIcon, zoneConfigs } from './ZoneMarker';

const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 17, { animate: true });
  }, [lat, lng, map]);
  return null;
};

// SVG icons for amenities
const getAmenityIcon = (type: string) => {
  let iconHtml = '';
  let bgColor = '';
  
  switch(type) {
    case 'entrance':
      bgColor = '#a855f7'; // purple
      iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>';
      break;
    case 'reception':
      bgColor = '#3b82f6'; // blue
      iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>';
      break;
    case 'parking':
      bgColor = '#64748b'; // slate
      iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path></svg>';
      break;
    case 'food':
      bgColor = '#f59e0b'; // amber
      iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>';
      break;
    case 'help':
      bgColor = '#ef4444'; // red
      iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
      break;
    case 'restroom':
      bgColor = '#06b6d4'; // cyan
      iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H14"></path><path d="M11 22v-4"></path><circle cx="7" cy="5" r="2"></circle><circle cx="17" cy="5" r="2"></circle><path d="M7 22H4a2 2 0 0 1-2-2v-8h5.3"></path></svg>';
      break;
    default:
      bgColor = '#94a3b8';
      iconHtml = '';
  }

  return L.divIcon({
    html: `<div style="background-color: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 2px solid white;">${iconHtml}</div>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

export default function ZooMap() {
  const [zones, setZones] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState<any>(null);

  useEffect(() => {
    fetch('/api/zones')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setZones(data.zones);
        }
      });
  }, []);

  const searchedZone = search.trim() ? zones.find(z => 
    z.animals.some((a: any) => a.name.toLowerCase().includes(search.toLowerCase())) ||
    z.zone_name.toLowerCase().includes(search.toLowerCase())
  ) : null;

  useEffect(() => {
    if (searchedZone) {
      setSelectedZone(searchedZone);
    }
  }, [searchedZone]);

  const defaultCenter: [number, number] = [34.0820, -118.2380];
  const center: [number, number] = selectedZone 
    ? [parseFloat(selectedZone.lat), parseFloat(selectedZone.lng)] 
    : defaultCenter;

  // Static Map Data (Overlay elements)
  const zooBoundary: [number, number][] = [
    [34.0860, -118.2420],
    [34.0870, -118.2380],
    [34.0850, -118.2340],
    [34.0810, -118.2330],
    [34.0780, -118.2350],
    [34.0770, -118.2390],
    [34.0790, -118.2430],
    [34.0830, -118.2440],
  ];

  const paths: [number, number][][] = [
    [[34.0775, -118.2390], [34.0800, -118.2385], [34.0820, -118.2390], [34.0840, -118.2375], [34.0855, -118.2365]], // Main crooked spine
    [[34.0820, -118.2390], [34.0815, -118.2370], [34.0825, -118.2355], [34.0815, -118.2340]], // East path
    [[34.0820, -118.2390], [34.0825, -118.2410], [34.0815, -118.2425], [34.0820, -118.2435]], // West path
    [[34.0840, -118.2375], [34.0850, -118.2355], [34.0860, -118.2360], [34.0860, -118.2385]], // North loop
    [[34.0800, -118.2385], [34.0795, -118.2405], [34.0785, -118.2410], [34.0775, -118.2390]], // South loop
  ];

  const amenities = [
    { id: 'a1', name: 'Main Entrance & Reception', type: 'entrance', position: [34.0775, -118.2390] as [number, number] },
    { id: 'a2', name: 'Visitor Parking', type: 'parking', position: [34.0765, -118.2395] as [number, number] },
    { id: 'a3', name: 'Central Food Court', type: 'food', position: [34.0820, -118.2385] as [number, number] },
    { id: 'a4', name: 'Jungle Cafe', type: 'food', position: [34.0855, -118.2365] as [number, number] },
    { id: 'a5', name: 'Help Desk & First Aid', type: 'help', position: [34.0800, -118.2380] as [number, number] },
    { id: 'a6', name: 'Restrooms (North)', type: 'restroom', position: [34.0845, -118.2385] as [number, number] },
    { id: 'a7', name: 'Restrooms (South)', type: 'restroom', position: [34.0815, -118.2350] as [number, number] },
    { id: 'a8', name: 'East Entrance', type: 'entrance', position: [34.0815, -118.2340] as [number, number] },
    { id: 'a9', name: 'North Entrance', type: 'entrance', position: [34.0860, -118.2385] as [number, number] },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-64px)] min-h-[600px]">
      
      {/* Search Bar Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4 pointer-events-none">
        <div className="relative bg-white rounded-full shadow-lg border border-slate-200 flex items-center px-4 py-3 pointer-events-auto">
          <Search size={20} className="text-slate-400 mr-2 flex-shrink-0" />
          <input 
            type="text"
            placeholder="Search for an animal or zone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-800 font-medium"
          />
        </div>
      </div>

      <MapContainer 
        center={defaultCenter} 
        zoom={17} 
        style={{ height: '100%', width: '100%', zIndex: 10 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        
        <RecenterAutomatically lat={center[0]} lng={center[1]} />

        {/* Draw Zoo Boundary */}
        <Polygon 
          positions={zooBoundary} 
          pathOptions={{ color: '#22c55e', fillColor: '#86efac', fillOpacity: 0.1, weight: 3, dashArray: '5, 10' }} 
        />

        {/* Draw Walking Paths */}
        {paths.map((path, index) => (
          <Polyline 
            key={`path-${index}`} 
            positions={path} 
            pathOptions={{ color: '#fcd34d', weight: 8, opacity: 0.7, lineCap: 'round', lineJoin: 'round' }} 
          />
        ))}

        {/* Draw Amenities */}
        {amenities.map(amenity => (
          <Marker 
            key={amenity.id} 
            position={amenity.position}
            icon={getAmenityIcon(amenity.type)}
          >
            <Popup className="custom-popup">
              <div className="px-2 py-1 text-center">
                <p className="font-bold text-slate-900 m-0">{amenity.name}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Draw Animal Zones */}
        {zones.map(zone => (
          <Marker 
            key={zone.id} 
            position={[parseFloat(zone.lat), parseFloat(zone.lng)]}
            icon={getZoneIcon(zone.zone_name)}
            eventHandlers={{
              click: () => {
                setSelectedZone(zone);
                setSearch('');
              },
            }}
          >
            <Tooltip direction="bottom" offset={[0, 10]} opacity={1} permanent className="font-bold bg-white/90 border-0 shadow-sm text-slate-800 rounded-lg px-2 py-1">
              {zone.zone_name}
            </Tooltip>
            <Popup className="custom-popup" maxWidth={320}>
              <div className="w-72 max-h-80 overflow-y-auto overflow-x-hidden p-1">
                <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-3">{zone.zone_name}</h3>
                <p className="text-sm text-slate-600 mb-4">{zone.description}</p>
                <div className="space-y-3">
                  {zone.animals.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No animals here.</p>
                  ) : zone.animals.map((animal: any) => (
                    <div key={animal.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative flex-shrink-0 border border-slate-200">
                        {animal.image_filename ? (
                          <Image 
                            src={`/animal_images/${animal.image_filename}`}
                            alt={animal.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex items-center justify-center w-full h-full text-[10px] font-semibold text-slate-400">NA</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{animal.name}</p>
                        <Link href={`/visitor/animals/${animal.id}`} className="text-xs text-blue-600 font-medium hover:underline inline-flex mt-0.5">
                          View Details &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend Panel */}
      <div className="absolute bottom-8 left-8 z-[1000] bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-200 w-56 pointer-events-auto">
        <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">Map Legend</h4>
        
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Animal Zones</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-1">
              {['Savanna', 'Aquatic', 'Aviary', 'Jungle', 'Reptile House'].map(zoneName => {
                const config = zoneConfigs[zoneName];
                if (!config) return null;
                return (
                  <div key={zoneName} className="flex items-center gap-2">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.bg, border: `1px solid ${config.color}` }}
                      dangerouslySetInnerHTML={{ __html: config.svg.replace('width="16"', 'width="12"').replace('height="16"', 'height="12"') }}
                    />
                    <span className="text-[11px] font-medium text-slate-700">{zoneName.replace(' House', '')}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Amenities</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-1">
              {[
                { name: 'Food', color: 'bg-amber-500' },
                { name: 'Help', color: 'bg-red-500' },
                { name: 'Restroom', color: 'bg-cyan-500' },
                { name: 'Parking', color: 'bg-slate-500' },
                { name: 'Entrance', color: 'bg-purple-500' },
              ].map(amenity => (
                <div key={amenity.name} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-sm shadow-sm ${amenity.color}`}></span>
                  <span className="text-[11px] font-medium text-slate-700">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-3 border-t border-slate-100">
             <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 rounded-full shadow-sm bg-amber-300"></span>
                <span className="text-[11px] font-medium text-slate-700">Walking Paths</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
