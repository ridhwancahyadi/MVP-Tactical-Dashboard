import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AttackLine {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  delay: number;
}

export const CybintGlobe = () => {
  const [attacks, setAttacks] = useState<AttackLine[]>([]);

  // Generate random attacks
  useEffect(() => {
    const generateAttacks = () => {
      const newAttacks = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        // Random coordinates roughly mapped to a 2D map projection on the globe face
        startX: Math.random() * 80 + 10, // 10% to 90%
        startY: Math.random() * 80 + 10,
        endX: Math.random() * 80 + 10,
        endY: Math.random() * 80 + 10,
        color: ['#ef4444', '#eab308', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 2,
      }));
      setAttacks(newAttacks);
    };

    generateAttacks();
    const interval = setInterval(generateAttacks, 5000); // Refresh attacks every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Hex Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#0891b2 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} 
      />
      
      {/* Globe Container */}
      <div className="relative w-[600px] h-[600px] rounded-full shadow-[0_0_100px_rgba(8,145,178,0.2)]">
        {/* Atmosphere Glow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(8,145,178,0.3)] z-20 pointer-events-none" />
        
        {/* The Globe Image */}
        <div 
          className="w-full h-full rounded-full bg-[#0a1120] relative overflow-hidden"
          style={{
            boxShadow: 'inset 20px 0 80px 6px rgba(0,0,0,1)',
          }}
        >
          {/* Map Texture - Dark Blue Tint for Cyber Theme */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'invert(1) hue-rotate(190deg) brightness(0.6) contrast(1.5)', // Cyan/Blue tint
              transform: 'scale(1.2)'
            }}
          />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 border border-cyan-500/10 rounded-full opacity-30" 
             style={{ background: 'radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.9) 100%)' }}
          />

          {/* Attack Lines SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {attacks.map((attack) => {
              // Calculate control point for curve (arc)
              const midX = (attack.startX + attack.endX) / 2;
              const midY = (attack.startY + attack.endY) / 2 - 20; // Curve upwards

              return (
                <g key={attack.id}>
                  {/* The Path */}
                  <motion.path
                    d={`M ${attack.startX}% ${attack.startY}% Q ${midX}% ${midY}% ${attack.endX}% ${attack.endY}%`}
                    fill="none"
                    stroke={attack.color}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: attack.delay, repeat: Infinity, repeatDelay: 1 }}
                  />
                  
                  {/* Moving Particle */}
                  <circle
                    r="2"
                    fill="white"
                    filter="url(#glow)"
                  >
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={`M ${attack.startX * 6} ${attack.startY * 6} Q ${midX * 6} ${midY * 6} ${attack.endX * 6} ${attack.endY * 6}`} // Scale % to px (600px width)
                      begin={`${attack.delay}s`}
                    />
                  </circle>

                  {/* Impact Ripple at Destination */}
                  <motion.circle
                    cx={`${attack.endX}%`}
                    cy={`${attack.endY}%`}
                    r="4"
                    stroke={attack.color}
                    strokeWidth="1"
                    fill="none"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 1, delay: attack.delay + 1.5, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Static Markers */}
        <div className="absolute top-[30%] left-[20%]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
            <span className="text-[10px] font-mono text-cyan-500 bg-black/60 px-1 rounded border border-cyan-500/30">HQ-US</span>
          </div>
        </div>
        <div className="absolute top-[40%] left-[55%]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
            <span className="text-[10px] font-mono text-cyan-500 bg-black/60 px-1 rounded border border-cyan-500/30">EU-NODE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
