/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TacticalMap } from '@/components/TacticalMap';
import { RightPanel } from '@/components/RightPanel';
import { BottomPanel } from '@/components/BottomPanel';
import { TacticalPlan } from '@/components/TacticalPlan';
import { Intelligence } from '@/components/Intelligence';
import { Imint } from '@/components/IMINT';
import { Operations } from '@/components/Operations';
import { Finint } from '@/components/FININT';
import { Cybint } from '@/components/CYBINT';
import { Sigint } from '@/components/SIGINT';
import { Humint } from '@/components/HUMINT';
import { Osint } from '@/components/OSINT';
import { GripHorizontal } from 'lucide-react';

type ViewType = 
  | 'dashboard' 
  | 'tactical-plan' 
  | 'intelligence' 
  | 'imint'
  | 'operations'
  | 'finint'
  | 'cybint'
  | 'sigint'
  | 'humint'
  | 'osint';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Resizable Bottom Panel State
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
      // Clamp height between 100px and 600px
      if (newHeight >= 100 && newHeight <= 600) {
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
    <div className="flex h-screen w-screen bg-tactical-bg text-white overflow-hidden font-sans selection:bg-tactical-accent/30">
      {/* Scanline Effect Overlay */}
      <div className="scanlines pointer-events-none" />
      
      {/* Left Sidebar */}
      <div className="w-[260px] flex-shrink-0 z-20">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0a0c10] relative z-10">
        <Header />
        
        {currentView === 'dashboard' ? (
          <>
            <div className="flex-1 flex min-h-0 relative">
              {/* Map Area */}
              <div className="flex-1 relative">
                <TacticalMap onSelectEvent={setSelectedEvent} />
              </div>

              {/* Right Sidebar */}
              <div className="w-[320px] border-l border-tactical-border bg-tactical-card/30 backdrop-blur-sm z-20">
                <RightPanel selectedEvent={selectedEvent} />
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
              <BottomPanel />
            </div>
          </>
        ) : currentView === 'tactical-plan' ? (
          <TacticalPlan />
        ) : currentView === 'intelligence' ? (
          <Intelligence />
        ) : currentView === 'imint' ? (
          <Imint />
        ) : currentView === 'operations' ? (
          <Operations />
        ) : currentView === 'finint' ? (
          <Finint />
        ) : currentView === 'cybint' ? (
          <Cybint />
        ) : currentView === 'sigint' ? (
          <Sigint />
        ) : currentView === 'humint' ? (
          <Humint />
        ) : currentView === 'osint' ? (
          <Osint />
        ) : (
          <Imint />
        )}
      </div>
    </div>
  );
}
