import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface IntelligenceMapProps {
  onRegionSelect: (region: string) => void;
}

export const IntelligenceMap = ({ onRegionSelect }: IntelligenceMapProps) => {
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

        {/* Intelligence Markers */}
        <div className="absolute top-[30%] left-[60%] cursor-pointer group" onClick={() => onRegionSelect('Middle East')}>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping absolute" />
          <div className="w-2 h-2 bg-blue-500 rounded-full relative z-10" />
          <div className="absolute left-4 top-0 text-[10px] font-mono text-blue-400 whitespace-nowrap bg-black/80 px-2 py-1 rounded border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity z-30">
            OSINT Cluster
          </div>
        </div>

        <div className="absolute top-[45%] left-[75%] cursor-pointer group" onClick={() => onRegionSelect('SE Asia')}>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping absolute" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full relative z-10" />
          <div className="absolute left-4 top-0 text-[10px] font-mono text-yellow-400 whitespace-nowrap bg-black/80 px-2 py-1 rounded border border-yellow-500/30 opacity-0 group-hover:opacity-100 transition-opacity z-30">
            SIGINT Anomaly
          </div>
        </div>
        
        <div className="absolute top-[50%] left-[20%] cursor-pointer group" onClick={() => onRegionSelect('South America')}>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute" />
          <div className="w-2 h-2 bg-green-500 rounded-full relative z-10" />
          <div className="absolute left-4 top-0 text-[10px] font-mono text-green-400 whitespace-nowrap bg-black/80 px-2 py-1 rounded border border-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity z-30">
            HUMINT Report
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
