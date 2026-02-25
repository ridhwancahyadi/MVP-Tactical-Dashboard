import React from 'react';
import { CybintSidebar } from './CybintSidebar';
import { CybintRightPanel } from './CybintRightPanel';
import { CybintGlobe } from './CybintGlobe';
import { CybintTimeline } from './CybintTimeline';

export const Cybint = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0c10]">
      <div className="flex-1 flex min-h-0 relative">
        <CybintSidebar />
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 relative">
            <CybintGlobe />
          </div>
          <CybintTimeline />
        </div>
        <CybintRightPanel />
      </div>
    </div>
  );
};
