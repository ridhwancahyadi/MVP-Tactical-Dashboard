import React from 'react';
import { ImintSidebar } from './ImintSidebar';
import { ImintGrid } from './ImintGrid';
import { ImintActivity } from './ImintActivity';

export const Imint = () => {
  return (
    <div className="flex-1 flex min-h-0 relative bg-[#0a0c10]">
      <ImintSidebar />
      <ImintGrid />
      <ImintActivity />
    </div>
  );
};
