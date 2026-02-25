import React, { useState } from 'react';
import { SigintSidebar, SigintLayer } from './SigintSidebar';
import { SigintRightPanel } from './SigintRightPanel';
import { SigintBottomPanel } from './SigintBottomPanel';
import { SigintGlobe } from './SigintGlobe';

export const Sigint = () => {
  const [activeLayer, setActiveLayer] = useState<SigintLayer>('density');

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black text-white font-mono">
      <div className="flex-1 flex min-h-0 relative">
        <SigintSidebar activeLayer={activeLayer} onLayerChange={setActiveLayer} />
        <div className="flex-1 relative flex flex-col">
          <div className="flex-1 relative">
            <SigintGlobe activeLayer={activeLayer} />
          </div>
          <SigintBottomPanel />
        </div>
        <SigintRightPanel />
      </div>
    </div>
  );
};
