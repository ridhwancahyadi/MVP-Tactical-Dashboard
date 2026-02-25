import React, { useState, useRef, useEffect } from 'react';
import { Globe } from './Globe';
import { MissionSidebar } from './MissionSidebar';
import { TacticalBottomPanel } from './TacticalBottomPanel';
import { Cloud, Wind, ArrowUpRight } from 'lucide-react';

const WeatherWidget = () => (
  <div className="bg-[#0f1115]/80 backdrop-blur-md border border-tactical-border rounded p-3 flex items-center justify-between w-[300px] shadow-lg">
    <div>
      <div className="text-sm font-bold text-white mb-0.5">Papua</div>
      <div className="text-[10px] text-gray-500 mb-2">Jayapura, Papua</div>
      <div className="text-[10px] font-mono text-tactical-accent">February 23, 2026, 11:00 AM</div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <Cloud className="w-8 h-8 text-yellow-500" />
      <div className="flex gap-2">
        <div className="bg-white/5 rounded px-2 py-1 text-center">
          <div className="text-[9px] text-gray-500 flex items-center gap-1"><Wind className="w-3 h-3" /> Wind</div>
          <div className="text-[10px] font-bold text-white">12 km/h</div>
        </div>
        <div className="bg-white/5 rounded px-2 py-1 text-center">
          <div className="text-[9px] text-gray-500 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> Dir</div>
          <div className="text-[10px] font-bold text-white">NW</div>
        </div>
      </div>
    </div>
  </div>
);

export const TacticalPlan = () => {
  // Resizable Bottom Panel State
  const [bottomPanelHeight, setBottomPanelHeight] = useState(300);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    document.body.style.cursor = 'ns-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newHeight = window.innerHeight - e.clientY;
      // Clamp height
      if (newHeight >= 150 && newHeight <= 600) {
        setBottomPanelHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <div className="flex-1 flex min-h-0 relative">
        {/* Center Globe */}
        <div className="flex-1 relative bg-[#050505]">
          <Globe />
          {/* Weather Widget Overlay */}
          <div className="absolute bottom-4 left-4 z-10">
            <WeatherWidget />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[320px] border-l border-tactical-border bg-tactical-card/30 backdrop-blur-sm z-20">
          <MissionSidebar />
        </div>
      </div>

      {/* Resizable Bottom Panel */}
      <div 
        className="flex-shrink-0 z-20 relative bg-tactical-card border-t border-tactical-border"
        style={{ height: bottomPanelHeight }}
      >
        {/* Drag Handle */}
        <div 
          className="absolute -top-1 left-0 right-0 h-2 cursor-ns-resize flex items-center justify-center hover:bg-tactical-accent/50 transition-colors z-50"
          onMouseDown={handleMouseDown}
        >
          <div className="w-16 h-1 bg-gray-600 rounded-full" />
        </div>
        <TacticalBottomPanel />
      </div>
    </div>
  );
};
