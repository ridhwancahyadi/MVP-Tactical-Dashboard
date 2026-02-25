import React from 'react';
import { motion } from 'motion/react';
import { FinintLayer } from './FinintSidebar';

interface FinintGlobeProps {
  activeLayer: FinintLayer;
}

export const FinintGlobe = ({ activeLayer }: FinintGlobeProps) => {
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
      
      {/* Globe Container */}
      <div className="relative w-[600px] h-[600px] rounded-full shadow-[0_0_100px_rgba(59,130,246,0.1)]">
        {/* Atmosphere Glow - Changes based on layer */}
        <div className={`absolute inset-0 rounded-full z-20 pointer-events-none transition-all duration-500 ${
          activeLayer === 'risk' ? 'shadow-[inset_0_0_60px_rgba(239,68,68,0.3)]' :
          activeLayer === 'commodity' ? 'shadow-[inset_0_0_60px_rgba(249,115,22,0.3)]' :
          'shadow-[inset_0_0_60px_rgba(59,130,246,0.2)]'
        }`} />
        
        {/* The Globe Image */}
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
              filter: activeLayer === 'risk' 
                ? 'invert(1) hue-rotate(0deg) brightness(0.5) contrast(1.5) sepia(1) saturate(5) hue-rotate(-50deg)' // Red tint
                : activeLayer === 'commodity'
                ? 'invert(1) hue-rotate(180deg) brightness(0.5) contrast(1.2) sepia(1) saturate(3) hue-rotate(-30deg)' // Orange/Gold tint
                : 'invert(1) hue-rotate(180deg) brightness(0.5) contrast(1.2)', // Blue/Neutral
              transform: 'scale(1.2)'
            }}
          />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 border border-white/5 rounded-full opacity-20" 
             style={{ background: 'radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.8) 100%)' }}
          />

          {/* LAYER 1: MARKET HEATMAP */}
          {activeLayer === 'market' && (
            <>
              {/* US - Green */}
              <div className="absolute top-[30%] left-[20%] w-16 h-16 bg-green-500/20 rounded-full blur-xl" />
              <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              
              {/* EU - Yellow */}
              <div className="absolute top-[25%] left-[50%] w-12 h-12 bg-yellow-500/20 rounded-full blur-xl" />
              <div className="absolute top-[25%] left-[50%] w-2 h-2 bg-yellow-500 rounded-full" />

              {/* China - Red */}
              <div className="absolute top-[35%] left-[75%] w-16 h-16 bg-red-500/20 rounded-full blur-xl" />
              <div className="absolute top-[35%] left-[75%] w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </>
          )}

          {/* LAYER 2: CURRENCY PRESSURE */}
          {activeLayer === 'currency' && (
            <>
              {/* Indonesia Highlight */}
              <div className="absolute top-[55%] left-[80%]">
                <div className="w-20 h-20 bg-red-500/30 rounded-full blur-xl absolute -top-8 -left-8" />
                <div className="w-3 h-3 border-2 border-red-500 rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-red-500 rounded-full relative z-10" />
                <div className="absolute left-4 top-0 text-[10px] font-mono text-red-500 whitespace-nowrap bg-black/80 px-1 rounded border border-red-500/30">
                  IDR PRESSURE
                </div>
              </div>

              {/* Japan */}
              <div className="absolute top-[30%] left-[85%]">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <div className="absolute left-4 top-0 text-[10px] font-mono text-yellow-500 whitespace-nowrap bg-black/80 px-1 rounded border border-yellow-500/30">
                  JPY VOLATILITY
                </div>
              </div>
            </>
          )}

          {/* LAYER 3: COMMODITY EXPOSURE */}
          {activeLayer === 'commodity' && (
            <>
              {/* Middle East - Oil */}
              <div className="absolute top-[40%] left-[60%]">
                <div className="w-24 h-24 bg-orange-500/20 rounded-full blur-xl absolute -top-10 -left-10" />
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
                <div className="absolute left-6 top-0 text-[10px] font-mono text-orange-500 whitespace-nowrap bg-black/80 px-1 rounded border border-orange-500/30">
                  OIL SHOCK REGION
                </div>
              </div>

              {/* Indonesia - Coal/Nickel */}
              <div className="absolute top-[55%] left-[80%]">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <div className="absolute left-4 top-0 text-[10px] font-mono text-yellow-500 whitespace-nowrap bg-black/80 px-1 rounded border border-yellow-500/30">
                  NICKEL/COAL
                </div>
              </div>
            </>
          )}

          {/* LAYER 4: CAPITAL FLOW */}
          {activeLayer === 'capital' && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                </marker>
              </defs>
              {/* US to Asia Outflow */}
              <path d="M 150 200 Q 300 100 500 300" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="5,5" className="animate-pulse" />
              {/* Europe to US Inflow */}
              <path d="M 350 180 Q 250 150 180 200" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
            </svg>
          )}

          {/* LAYER 5: RISK HOTSPOTS */}
          {activeLayer === 'risk' && (
            <>
              {/* Multiple Risk Points */}
              <div className="absolute top-[30%] left-[20%] w-4 h-4 bg-red-600 rounded-full animate-ping" />
              <div className="absolute top-[35%] left-[75%] w-4 h-4 bg-red-600 rounded-full animate-ping delay-75" />
              <div className="absolute top-[50%] left-[65%] w-4 h-4 bg-red-600 rounded-full animate-ping delay-150" />
              
              <div className="absolute top-[30%] left-[20%] text-[10px] text-red-500 bg-black/80 px-1 ml-6 rounded">BANK CRISIS ALERT</div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
