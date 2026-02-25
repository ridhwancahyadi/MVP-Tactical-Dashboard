import React, { useState } from 'react';
import { FinintSidebar, FinintLayer } from './FinintSidebar';
import { FinintRightPanel } from './FinintRightPanel';
import { FinintBottomPanel } from './FinintBottomPanel';
import { FinintGlobe } from './FinintGlobe';

export const Finint = () => {
  const [activeLayer, setActiveLayer] = useState<FinintLayer>('market');

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black text-white font-mono">
      <div className="flex-1 flex min-h-0 relative">
        <FinintSidebar activeLayer={activeLayer} onLayerChange={setActiveLayer} />
        <div className="flex-1 relative flex flex-col">
          <div className="flex-1 relative">
            <FinintGlobe activeLayer={activeLayer} />
          </div>
          <FinintBottomPanel />
        </div>
        <FinintRightPanel />
      </div>
    </div>
  );
};
