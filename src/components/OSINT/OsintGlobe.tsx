import React from 'react';
import { OsintMode } from './OsintSidebar';

interface OsintGlobeProps {
  activeMode: OsintMode;
}

export const OsintGlobe = ({ activeMode }: OsintGlobeProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#050505] overflow-hidden rounded-lg border border-white/10">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Globe Container */}
      <div className="relative w-[500px] h-[500px] rounded-full shadow-[0_0_100px_rgba(59,130,246,0.1)]">
        {/* Atmosphere Glow */}
        <div className={`absolute inset-0 rounded-full z-20 pointer-events-none transition-all duration-500 ${
          activeMode === 'live-news' 
            ? 'shadow-[inset_0_0_60px_rgba(59,130,246,0.2)]' 
            : 'shadow-[inset_0_0_60px_rgba(168,85,247,0.2)]'
        }`} />
        
        {/* Globe Texture */}
        <div 
          className="w-full h-full rounded-full bg-[#0a1120] relative overflow-hidden"
          style={{
            boxShadow: 'inset 20px 0 80px 6px rgba(0,0,0,1)',
          }}
        >
          {/* Map Texture */}
          <div 
            className="absolute inset-0 opacity-60 transition-all duration-500"
            style={{
              backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: activeMode === 'live-news' 
                ? 'invert(1) hue-rotate(180deg) brightness(0.6) contrast(1.2)' // Blue tint
                : 'invert(1) hue-rotate(240deg) brightness(0.6) contrast(1.2)', // Purple tint
              transform: 'scale(1.4)'
            }}
          />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 border border-white/5 rounded-full opacity-20" 
             style={{ background: 'radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.8) 100%)' }}
          />

          {/* LAYER: LIVE NEWS */}
          {activeMode === 'live-news' && (
            <>
              {/* News Intensity Heatmap */}
              <div className="absolute top-[30%] left-[40%] w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute top-[35%] left-[45%] w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
              
              {/* Narrative Hotspot */}
              <div className="absolute top-[45%] left-[55%]">
                <div className="w-4 h-4 border border-blue-400 rounded-full animate-ping absolute" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full relative z-10" />
                <div className="absolute left-4 top-0 bg-black/80 border border-blue-500/30 px-2 py-1 rounded text-[9px] text-blue-400 whitespace-nowrap">
                  BREAKING NEWS
                </div>
              </div>
            </>
          )}

          {/* LAYER: SOCIAL MEDIA */}
          {activeMode === 'social-media' && (
            <>
              {/* Hashtag Clustering */}
              <div className="absolute top-[38%] left-[48%]">
                <div className="w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-purple-300 font-bold">#ProtestNow</div>
              </div>

              {/* Sentiment Layer (Negative/Red) */}
              <div className="absolute top-[50%] left-[30%]">
                <div className="w-20 h-20 bg-red-500/20 rounded-full blur-xl" />
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-1/2 left-1/2" />
                <div className="absolute left-4 top-0 bg-black/80 border border-red-500/30 px-2 py-1 rounded text-[9px] text-red-400 whitespace-nowrap">
                  HIGH POLARIZATION
                </div>
              </div>
            </>
          )}

        </div>
        
        {/* Map Controls Overlay */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30">
          <div className="bg-black/90 backdrop-blur border border-white/10 p-2 rounded-lg shadow-xl">
            <div className="text-[9px] text-gray-500 uppercase mb-2 font-bold">Visualization Layers</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
                <div className={`w-2 h-2 rounded-full ${activeMode === 'live-news' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                <span className="text-[10px] text-gray-300 uppercase font-bold">
                  {activeMode === 'live-news' ? 'News Intensity' : 'Trend Heatmap'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 border border-transparent">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] text-gray-500 uppercase font-bold">Escalation Zones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
