import React, { useState } from 'react';
import { OsintSidebar, OsintMode } from './OsintSidebar';
import { OsintBottomPanel } from './OsintBottomPanel';
import { OsintMain } from './OsintMain';

export const Osint = () => {
  const [activeMode, setActiveMode] = useState<OsintMode>('live-news');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-black text-white font-mono">
      <div className="flex-1 flex min-h-0 relative">
        <OsintSidebar activeMode={activeMode} onModeChange={setActiveMode} />
        <div className="flex-1 relative flex flex-col min-w-0">
          <OsintMain 
            activeMode={activeMode} 
            onSelectItem={setSelectedItem}
            selectedItemId={selectedItem?.id}
          />
          <OsintBottomPanel />
        </div>
      </div>
    </div>
  );
};
