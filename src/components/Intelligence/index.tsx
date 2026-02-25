import React, { useState, useRef, useEffect } from 'react';
import { IntelligenceMap } from './IntelligenceMap';
import { IntelligenceRightPanel } from './IntelligenceRightPanel';
import { IntelligenceBottomPanel } from './IntelligenceBottomPanel';

export const Intelligence = () => {
  const [bottomPanelHeight, setBottomPanelHeight] = useState(240);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    document.body.style.cursor = 'ns-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newHeight = window.innerHeight - e.clientY;
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
        {/* Center Analytical Map */}
        <div className="flex-1 relative bg-[#050505]">
          <IntelligenceMap onRegionSelect={(region) => console.log(region)} />
        </div>

        {/* Right Panel */}
        <div className="w-[320px] border-l border-tactical-border bg-tactical-card/30 backdrop-blur-sm z-20">
          <IntelligenceRightPanel />
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
        <IntelligenceBottomPanel />
      </div>
    </div>
  );
};
