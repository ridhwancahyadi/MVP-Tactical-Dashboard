import React from 'react';
import { 
  Users, 
  Filter,
  Search,
  Globe,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type HumintLayer = 
  | 'reports' 
  | 'agents' 
  | 'escalation' 
  | 'heatmap' 
  | 'validation';

interface HumintSidebarProps {
  activeLayer: HumintLayer;
  onLayerChange: (layer: HumintLayer) => void;
}

export const HumintSidebar = ({ activeLayer, onLayerChange }: HumintSidebarProps) => {
  return (
    <div className="w-[280px] bg-[#0a0c10] border-r border-white/10 flex flex-col h-full z-20">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 tracking-wider">
          <Users className="w-4 h-4 text-amber-500" /> HUMINT OPS
        </h2>
        <div className="text-[10px] text-gray-500 font-mono mt-1">HUMAN INTELLIGENCE NETWORK</div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search reports, agents..." 
            className="w-full bg-black/40 border border-white/10 rounded px-8 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold text-gray-500 uppercase mb-3 px-1">Operational Filters</div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-400 uppercase">
              <Filter className="w-3 h-3" /> Intent Class
            </div>
            <div className="space-y-1">
              {['Protest Mobilization', 'Armed Activity', 'Logistics Build-up', 'Political Escalation', 'Sabotage'].map((filter) => (
                <div key={filter} className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white cursor-pointer group">
                  <div className="w-3 h-3 border border-gray-700 rounded-sm group-hover:border-amber-500" />
                  {filter}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-400 uppercase">
              <Globe className="w-3 h-3" /> Region
            </div>
            <div className="space-y-1">
              {['Sector Alpha', 'Sector Bravo', 'Urban Centers', 'Border Zones'].map((filter) => (
                <div key={filter} className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white cursor-pointer group">
                  <div className="w-3 h-3 border border-gray-700 rounded-full group-hover:border-amber-500" />
                  {filter}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-400 uppercase">
              <Radio className="w-3 h-3" /> Source Reliability
            </div>
            <div className="space-y-1">
              {['High Confidence (>80%)', 'Medium Confidence', 'Unverified'].map((filter) => (
                <div key={filter} className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white cursor-pointer group">
                  <div className="w-3 h-3 border border-gray-700 rounded-sm group-hover:border-amber-500" />
                  {filter}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-gray-500 uppercase">Network Status</span>
          <span className="text-[10px] text-green-500 font-bold">ONLINE</span>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
