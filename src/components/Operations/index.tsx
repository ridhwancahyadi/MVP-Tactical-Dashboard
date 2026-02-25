import React, { useState } from 'react';
import { OperationsAnalytics } from './OperationsAnalytics';
import { OperationsMap } from './OperationsMap';
import { AddUnitForm } from './AddUnitForm';
import { LayoutDashboard, Map, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Operations = () => {
  const [viewMode, setViewMode] = useState<'analytics' | 'map' | 'add'>('analytics');

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0c10]">
      {/* Top Navigation Bar */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-[#1a1d24]">
        <h1 className="text-lg font-bold text-white tracking-wide">Operations Center</h1>
        
        <div className="flex bg-black/30 p-1 rounded-lg border border-white/5">
          <button 
            onClick={() => setViewMode('analytics')}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium transition-all",
              viewMode === 'analytics' 
                ? "bg-blue-600 text-white shadow-lg" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Overview
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium transition-all",
              viewMode === 'map' 
                ? "bg-blue-600 text-white shadow-lg" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Map className="w-3.5 h-3.5" />
            Fleet Map
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setViewMode('add')}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 text-green-500 border border-green-500/30 rounded hover:bg-green-600/30 transition-colors text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Unit
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <div className="text-right">
            <div className="text-xs font-bold text-white">Bae Joohyun</div>
            <div className="text-[10px] text-gray-500">Tracker Officer</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex min-h-0 relative">
        {viewMode === 'analytics' && <OperationsAnalytics />}
        {viewMode === 'map' && <OperationsMap />}
        {viewMode === 'add' && (
          <AddUnitForm 
            onCancel={() => setViewMode('analytics')} 
            onSave={() => {
              alert('Unit saved successfully!');
              setViewMode('analytics');
            }} 
          />
        )}
      </div>
    </div>
  );
};
