import React from 'react';
import { 
  Globe, 
  Newspaper, 
  MessageCircle, 
  TrendingUp, 
  AlertTriangle, 
  Search,
  Filter,
  BarChart2,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type OsintMode = 'live-news' | 'social-media';

interface OsintSidebarProps {
  activeMode: OsintMode;
  onModeChange: (mode: OsintMode) => void;
}

export const OsintSidebar = ({ activeMode, onModeChange }: OsintSidebarProps) => {
  return (
    <div className="w-[280px] bg-[#0a0c10] border-r border-white/10 flex flex-col h-full z-20">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 tracking-wider">
          <Globe className="w-4 h-4 text-blue-500" /> OSINT CENTER
        </h2>
        <div className="text-[10px] text-gray-500 font-mono mt-1">OPEN SOURCE INTELLIGENCE</div>
      </div>

      {/* Mode Selection */}
      <div className="p-4 border-b border-white/10">
        <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => onModeChange('live-news')}
            className={cn(
              "flex flex-col items-center justify-center py-3 px-2 rounded transition-all",
              activeMode === 'live-news' 
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
            )}
          >
            <Newspaper className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-bold uppercase">Live News</span>
          </button>
          <button
            onClick={() => onModeChange('social-media')}
            className={cn(
              "flex flex-col items-center justify-center py-3 px-2 rounded transition-all",
              activeMode === 'social-media' 
                ? "bg-purple-600/20 text-purple-400 border border-purple-500/30" 
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
            )}
          >
            <MessageCircle className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-bold uppercase">Social Media</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
          <input 
            type="text" 
            placeholder={activeMode === 'live-news' ? "Search headlines..." : "Search hashtags..."}
            className="w-full bg-black/40 border border-white/10 rounded px-8 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold text-gray-500 uppercase mb-3 px-1">Analysis Filters</div>
        
        <div className="space-y-4">
          {/* Topic Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-400 uppercase">
              <Filter className="w-3 h-3" /> Topic Category
            </div>
            <div className="space-y-1">
              {['Political Unrest', 'Military Movement', 'Economic Crisis', 'Public Health', 'Cyber Threats'].map((filter) => (
                <div key={filter} className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white cursor-pointer group">
                  <div className="w-3 h-3 border border-gray-700 rounded-sm group-hover:border-blue-500" />
                  {filter}
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-400 uppercase">
              <TrendingUp className="w-3 h-3" /> Sentiment Tone
            </div>
            <div className="space-y-1">
              {['Negative / Hostile', 'Neutral / Informative', 'Positive / Supportive', 'Fear / Panic'].map((filter) => (
                <div key={filter} className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white cursor-pointer group">
                  <div className="w-3 h-3 border border-gray-700 rounded-full group-hover:border-blue-500" />
                  {filter}
                </div>
              ))}
            </div>
          </div>

          {/* Escalation Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-400 uppercase">
              <AlertTriangle className="w-3 h-3" /> Escalation Level
            </div>
            <div className="space-y-1">
              {['Critical', 'High', 'Moderate', 'Low'].map((filter) => (
                <div key={filter} className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white cursor-pointer group">
                  <div className="w-3 h-3 border border-gray-700 rounded-sm group-hover:border-blue-500" />
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
          <span className="text-[10px] text-gray-500 uppercase">Data Stream</span>
          <span className="text-[10px] text-blue-500 font-bold">CONNECTED</span>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-full animate-pulse" />
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-gray-600 font-mono">
          <span>SRC: 1,204</span>
          <span>UPT: 99.9%</span>
        </div>
      </div>
    </div>
  );
};
