import React from 'react';
import { SigintLayer } from './SigintSidebar';

interface SigintGlobeProps {
  activeLayer: SigintLayer;
}

export const SigintGlobe = ({ activeLayer }: SigintGlobeProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Globe/Map Container */}
      <div className="relative w-[600px] h-[600px] rounded-full shadow-[0_0_100px_rgba(16,185,129,0.1)]">
        {/* Atmosphere Glow */}
        <div className={`absolute inset-0 rounded-full z-20 pointer-events-none transition-all duration-500 ${
          activeLayer === 'interference' ? 'shadow-[inset_0_0_60px_rgba(239,68,68,0.3)]' :
          activeLayer === 'anomaly' ? 'shadow-[inset_0_0_60px_rgba(234,179,8,0.3)]' :
          'shadow-[inset_0_0_60px_rgba(16,185,129,0.2)]'
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
              filter: activeLayer === 'interference' 
                ? 'invert(1) hue-rotate(0deg) brightness(0.5) contrast(1.5) sepia(1) saturate(5) hue-rotate(-50deg)' 
                : 'invert(1) hue-rotate(90deg) brightness(0.5) contrast(1.2)', // Emerald/Green tint
              transform: 'scale(1.2)'
            }}
          />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 border border-white/5 rounded-full opacity-20" 
             style={{ background: 'radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.8) 100%)' }}
          />

          {/* LAYER: SIGNAL DENSITY */}
          {activeLayer === 'density' && (
            <>
              <div className="absolute top-[30%] left-[20%] w-24 h-24 bg-emerald-500/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-emerald-500 rounded-full" />
              <div className="absolute top-[45%] left-[60%] w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
            </>
          )}

          {/* LAYER: COORDINATION */}
          {activeLayer === 'coordination' && (
            <>
              {/* Burst Cluster */}
              <div className="absolute top-[40%] left-[50%]">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-blue-500 rounded-full relative z-10" />
                {/* Connecting Lines */}
                <svg className="absolute top-1.5 left-1.5 w-40 h-40 overflow-visible pointer-events-none">
                  <line x1="0" y1="0" x2="50" y2="-30" stroke="#3b82f6" strokeWidth="1" className="animate-pulse" />
                  <line x1="0" y1="0" x2="-40" y2="20" stroke="#3b82f6" strokeWidth="1" className="animate-pulse" />
                  <line x1="0" y1="0" x2="30" y2="40" stroke="#3b82f6" strokeWidth="1" className="animate-pulse" />
                </svg>
                <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-[-30px] left-[50px]" />
                <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-[20px] left-[-40px]" />
                <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-[40px] left-[30px]" />
              </div>
            </>
          )}

          {/* LAYER: ANOMALY */}
          {activeLayer === 'anomaly' && (
            <>
              <div className="absolute top-[25%] left-[70%]">
                <div className="w-4 h-4 border-2 border-yellow-500 rounded-full animate-ping absolute" />
                <div className="w-2 h-2 bg-yellow-500 rounded-full relative z-10" />
                <div className="absolute left-4 top-0 text-[10px] font-mono text-yellow-500 whitespace-nowrap bg-black/80 px-1 rounded border border-yellow-500/30">
                  TEMPORAL ANOMALY
                </div>
              </div>
            </>
          )}

          {/* LAYER: INTERFERENCE */}
          {activeLayer === 'interference' && (
            <>
              <div className="absolute top-[50%] left-[30%]">
                <div className="w-20 h-20 bg-red-500/20 rounded-full blur-xl absolute -top-8 -left-8 animate-pulse" />
                <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                   <div className="w-1 h-1 bg-red-500 rounded-full" />
                </div>
                <div className="absolute left-4 top-0 text-[10px] font-mono text-red-500 whitespace-nowrap bg-black/80 px-1 rounded border border-red-500/30">
                  JAMMING DETECTED
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
