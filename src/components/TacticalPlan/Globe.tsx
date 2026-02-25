import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const Globe = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 opacity-50" 
        style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} 
      />
      
      {/* Globe Container */}
      <div className="relative w-[600px] h-[600px] rounded-full shadow-[0_0_100px_rgba(0,100,255,0.1)]">
        {/* Atmosphere Glow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,150,255,0.2)] z-20 pointer-events-none" />
        
        {/* The Globe Image - Using a dark map projection mapped to a sphere via CSS */}
        <div 
          className="w-full h-full rounded-full bg-[#0a1120] relative overflow-hidden"
          style={{
            boxShadow: 'inset 20px 0 80px 6px rgba(0,0,0,1)',
          }}
        >
          {/* Map Texture */}
          <div 
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'invert(1) hue-rotate(180deg) brightness(0.4) contrast(1.2)',
              transform: 'scale(1.2)'
            }}
          />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 border border-white/5 rounded-full opacity-20" 
             style={{ background: 'radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.8) 100%)' }}
          />
        </div>

        {/* Markers on Globe */}
        <div className="absolute top-[30%] left-[60%]">
          <div className="w-2 h-2 bg-tactical-accent rounded-full animate-ping absolute" />
          <div className="w-2 h-2 bg-tactical-accent rounded-full relative z-10" />
          <div className="absolute left-4 top-0 text-[10px] font-mono text-tactical-accent whitespace-nowrap bg-black/50 px-1 rounded border border-tactical-accent/30">
            MBG-0001
          </div>
        </div>

        <div className="absolute top-[45%] left-[40%]">
          <div className="w-2 h-2 bg-tactical-danger rounded-full animate-ping absolute" />
          <div className="w-2 h-2 bg-tactical-danger rounded-full relative z-10" />
          <div className="absolute left-4 top-0 text-[10px] font-mono text-tactical-danger whitespace-nowrap bg-black/50 px-1 rounded border border-tactical-danger/30">
            HOSTILE
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <button className="w-8 h-8 bg-black/80 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center rounded hover:bg-white/10">+</button>
        <button className="w-8 h-8 bg-black/80 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center rounded hover:bg-white/10">-</button>
      </div>
    </div>
  );
};
