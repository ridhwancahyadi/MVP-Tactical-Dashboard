import React, { useState } from 'react';
import { HumintSidebar, HumintLayer } from './HumintSidebar';
import { HumintRightPanel } from './HumintRightPanel';
import { HumintBottomPanel } from './HumintBottomPanel';
import { HumintMain } from './HumintMain';

export const Humint = () => {
  const [activeLayer, setActiveLayer] = useState<HumintLayer>('reports');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black text-white font-mono">
      <div className="flex-1 flex min-h-0 relative">
        <HumintSidebar activeLayer={activeLayer} onLayerChange={setActiveLayer} />
        <div className="flex-1 relative flex flex-col min-w-0">
          <HumintMain 
            activeLayer={activeLayer} 
            onLayerChange={setActiveLayer}
            onSelectReport={setSelectedReport}
            selectedReportId={selectedReport?.id}
          />
          <HumintBottomPanel />
        </div>
        <HumintRightPanel selectedReport={selectedReport} />
      </div>
    </div>
  );
};
