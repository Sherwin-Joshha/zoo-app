import L from 'leaflet';

export const getZoneIcon = (zoneName: string) => {
  const configs: Record<string, { color: string; bg: string; svg: string }> = {
    'Savanna': { 
      color: '#f59e0b', bg: '#fffbeb', 
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.42 20.33a4 4 0 0 1-5.75-.41L2 15h11z"/><path d="M17.15 20.33a4 4 0 0 1-5.75-.41L7.73 15H19z"/><path d="M22 15h-4.27l4.13-4.91a4 4 0 0 0-5.75-5.18L12 9l-4.11-4.09a4 4 0 0 0-5.75 5.18L6.27 15H2"/></svg>'
    },
    'Aquatic': { 
      color: '#3b82f6', bg: '#eff6ff', 
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>'
    },
    'Aviary': { 
      color: '#10b981', bg: '#ecfdf5', 
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-3 3-5-5L6.5 9.5a2.12 2.12 0 1 0-3 3L8 17l4 4a6.36 6.36 0 1 0 9-9L18 15z"/><path d="m14 11-4 4"/></svg>'
    },
    'Jungle': { 
      color: '#22c55e', bg: '#f0fdf4', 
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'
    },
    'Reptile House': { 
      color: '#8b5cf6', bg: '#f5f3ff', 
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"/><path d="M12 2v4"/></svg>'
    },
  };

  const config = configs[zoneName] || { 
    color: '#ef4444', bg: '#fef2f2', 
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>' 
  };

  const html = `
    <div style="
      background-color: ${config.bg};
      border: 2px solid ${config.color};
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
    ">
      <div style="display: flex; align-items: center; justify-content: center;">
        ${config.svg}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-zone-marker bg-transparent border-0',
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};
