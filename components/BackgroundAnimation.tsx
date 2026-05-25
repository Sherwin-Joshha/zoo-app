'use client';

import { useEffect, useState } from 'react';

export default function BackgroundAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const leftStyle: React.CSSProperties = {
    transform: isVisible ? 'translateX(0)' : 'translateX(-200px)',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease-out',
    transformOrigin: 'left center'
  };

  const rightStyle: React.CSSProperties = {
    transform: isVisible ? 'translateX(0)' : 'translateX(200px)',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease-out',
    transformOrigin: 'right center'
  };

  const flowerStyle: React.CSSProperties = {
    transform: isVisible ? 'scale(1)' : 'scale(0.3)',
    transformOrigin: 'center',
    transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  const getStagger = (index: number) => ({ transitionDelay: `${index * 60}ms` });

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      style={{ zIndex: -1, background: '#0a150e' }}
    >
      <style>{`
        @keyframes slowPan {
          0% { transform: scale(1.1) translate(1%, 1%); }
          100% { transform: scale(1.1) translate(-1%, -1%); }
        }
      `}</style>

      {/* Deep Forest Valley Background Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('/deep_forest_valley.png')",
          animation: "slowPan 30s ease-in-out infinite alternate"
        }}
      />

      {/* SVG Definitions for Realistic Textures */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <pattern id="realisticTexture" patternUnits="objectBoundingBox" width="1" height="1">
            <image href="/realistic_jungle_leaves.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          </pattern>
          
          <pattern id="realisticTextureDark" patternUnits="objectBoundingBox" width="1" height="1">
            <rect width="100%" height="100%" fill="#0a1a0e" />
            <image href="/realistic_jungle_leaves.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" opacity="0.6" />
          </pattern>
          
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="6" stdDeviation="5" floodOpacity="0.5" />
          </filter>
        </defs>
      </svg>

      {/* TOP LEFT CORNER: Dense Hanging Flora */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vh]" style={{ ...leftStyle, ...getStagger(1) }}>
        <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMinYMin meet">
          {/* Background Canopy (Textured) */}
          <g style={{ animation: 'leafSway 8s ease-in-out infinite', transformOrigin: 'top left', filter: 'url(#dropShadow)' }}>
            <path d="M0,0 Q100,10 150,150 C100,100 50,200 0,100 Z" fill="url(#realisticTextureDark)" />
            <path d="M0,0 Q200,50 250,250 C150,150 100,300 0,150 Z" fill="url(#realisticTexture)" />
          </g>
          {/* Spanish Moss / Hanging vines */}
          <g style={{ animation: 'leafSway 6s ease-in-out infinite 0.5s', transformOrigin: 'top left' }}>
            <path d="M40,0 Q30,100 50,150 Q40,200 60,300" fill="none" stroke="#228B22" strokeWidth="4" />
            <circle cx="50" cy="150" r="5" fill="url(#realisticTexture)" />
            <circle cx="60" cy="300" r="4" fill="url(#realisticTexture)" />
          </g>
        </svg>
      </div>

      {/* TOP RIGHT CORNER: Dense Hanging Flora */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh]" style={{ ...rightStyle, ...getStagger(1) }}>
        <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMaxYMin meet">
          <g style={{ animation: 'leafSway 7s ease-in-out infinite 0.2s', transformOrigin: 'top right', filter: 'url(#dropShadow)' }}>
            <path d="M400,0 Q300,10 250,150 C300,100 350,200 400,100 Z" fill="url(#realisticTextureDark)" />
            <path d="M400,0 Q200,50 150,250 C250,150 300,300 400,150 Z" fill="url(#realisticTexture)" />
            <path d="M400,0 Q150,0 100,150 C200,80 300,200 400,80 Z" fill="url(#realisticTexture)" />
          </g>
        </svg>
      </div>

      {/* LEFT SIDE PLANTS */}
      <div className="absolute bottom-0 left-0 w-[45vw] md:w-[35vw] h-[85vh] flex items-end">
        <svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMinYMax meet" className="overflow-visible">
          {/* Deep Background Canopy */}
          <g style={{ ...leftStyle, ...getStagger(0), animation: 'leafSway 9s ease-in-out infinite', transformOrigin: 'bottom left', filter: 'url(#dropShadow)' }}>
            <path d="M-50,800 C-50,300 250,200 350,500 C400,700 200,800 0,800 Z" fill="url(#realisticTextureDark)" />
          </g>

          {/* Detailed Monstera 1 */}
          <g style={{ ...leftStyle, ...getStagger(2), animation: 'leafSway 7.5s ease-in-out infinite 0.1s', transformOrigin: 'bottom left', filter: 'url(#dropShadow)' }}>
            <path d="M0,800 C-30,550 180,480 230,620 C250,680 200,800 80,800 Z" fill="url(#realisticTexture)" />
            <path d="M-20,800 Q120,600 220,580" fill="none" stroke="#0f4a1b" strokeWidth="4" />
            <path d="M-20,800 C-20,500 200,450 250,600 C280,680 200,800 50,800 Z" fill="url(#realisticTexture)" />
          </g>

          {/* Curling Ferns */}
          <g style={{ ...leftStyle, ...getStagger(3), animation: 'leafSway 6.5s ease-in-out infinite 0.7s', transformOrigin: 'bottom left', filter: 'url(#dropShadow)' }}>
            <path d="M0,800 Q80,600 250,550" fill="none" stroke="url(#realisticTextureDark)" strokeWidth="12" />
            <path d="M40,750 Q120,680 180,720" fill="none" stroke="url(#realisticTexture)" strokeWidth="10" />
            <path d="M80,695 L110,660 M100,680 L140,650 M120,665 L160,640" stroke="url(#realisticTexture)" strokeWidth="14" strokeLinecap="round" />
            <path d="M100,715 L140,700 M120,710 L160,705" stroke="url(#realisticTexture)" strokeWidth="12" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* RIGHT SIDE PLANTS */}
      <div className="absolute bottom-0 right-0 w-[45vw] md:w-[35vw] h-[85vh] flex items-end justify-end">
        <svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMaxYMax meet" className="overflow-visible">
          
          {/* Deep Background Banana Leaves */}
          <g style={{ ...rightStyle, ...getStagger(0), animation: 'leafSway 9.5s ease-in-out infinite 0.4s', transformOrigin: 'bottom right', filter: 'url(#dropShadow)' }}>
            <path d="M450,800 C450,300 150,200 50,500 C0,700 200,800 400,800 Z" fill="url(#realisticTextureDark)" />
          </g>

          {/* Bird of Paradise Large */}
          <g style={{ ...rightStyle, ...getStagger(1), animation: 'leafSway 8.5s ease-in-out infinite 0.9s', transformOrigin: 'bottom right', filter: 'url(#dropShadow)' }}>
            <path d="M400,800 C350,400 100,300 200,600 C250,750 350,800 400,800 Z" fill="url(#realisticTexture)" />
          </g>

          {/* Vibrant Banana Leaf Foreground */}
          <g style={{ ...rightStyle, ...getStagger(2), animation: 'leafSway 7.5s ease-in-out infinite 1.4s', transformOrigin: 'bottom right', filter: 'url(#dropShadow)' }}>
            <path d="M420,800 C420,400 150,450 150,650 C150,750 350,800 420,800 Z" fill="url(#realisticTexture)" />
          </g>

          {/* Giant Palm Fronds */}
          <g style={{ ...rightStyle, ...getStagger(3), animation: 'leafSway 6s ease-in-out infinite 1s', transformOrigin: 'bottom right', filter: 'url(#dropShadow)' }}>
            <path d="M400,800 Q250,600 50,650" fill="none" stroke="url(#realisticTextureDark)" strokeWidth="18" />
            <path d="M250,670 L180,600 M200,660 L120,610 M150,655 L70,620 M300,690 L240,620" stroke="url(#realisticTexture)" strokeWidth="14" strokeLinecap="round" />
          </g>

          {/* Dense Trailing Vines */}
          <g style={{ ...rightStyle, ...getStagger(1.5), animation: 'leafSway 7s ease-in-out infinite 0.5s', transformOrigin: 'top right', filter: 'url(#dropShadow)' }}>
            <path d="M380,0 Q320,150 350,300 Q380,450 300,600" fill="none" stroke="#0f4a1b" strokeWidth="6" />
            <path d="M355,100 C325,70 310,120 355,130 C385,120 370,70 355,100 Z" fill="url(#realisticTexture)" />
            <path d="M335,220 C305,190 290,240 335,250 C365,240 350,190 335,220 Z" fill="url(#realisticTexture)" />
            <path d="M325,480 C295,450 280,500 325,510 C355,500 340,450 325,480 Z" fill="url(#realisticTexture)" />
          </g>

        </svg>
      </div>
      
    </div>
  );
}
