import React, { useState } from 'react';
import { 
  Globe, 
  AlertTriangle, 
  TrendingUp, 
  Share2,
  Newspaper,
  MessageCircle,
  Zap,
  Bot,
  Megaphone,
  Video,
  Maximize2,
  Settings,
  Volume2,
  Grid,
  Layout,
  Radio,
  Cast,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OsintGlobe } from './OsintGlobe';
import { OsintMode } from './OsintSidebar';

interface OsintMainProps {
  activeMode: OsintMode;
  onSelectItem: (item: any) => void;
  selectedItemId: string | null;
}

const KPICard = ({ label, value, sub, color, icon: Icon }: any) => (
  <div className="bg-[#0a0c10] border border-white/10 p-3 rounded-lg flex flex-col relative overflow-hidden group hover:border-white/20 transition-all">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{label}</span>
      {Icon && <Icon className={cn("w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity", color)} />}
    </div>
    <span className={cn("text-2xl font-bold font-mono leading-none mb-1", color)}>{value}</span>
    <span className="text-[9px] text-gray-400">{sub}</span>
    <div className={cn("absolute bottom-0 left-0 h-0.5 w-full opacity-50", color.replace('text-', 'bg-'))} />
  </div>
);

const FeedItem = ({ id, time, title, source, sentiment, onClick, active }: any) => (
  <div 
    onClick={onClick}
    className={cn(
      "p-3 border-b border-white/5 cursor-pointer transition-colors group",
      active ? "bg-white/10 border-l-2 border-l-blue-500" : "hover:bg-white/5 border-l-2 border-l-transparent"
    )}
  >
    <div className="flex justify-between items-start mb-1">
      <span className="text-[10px] font-mono text-gray-500">{time}</span>
      <span className={cn(
        "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase",
        sentiment === 'Negative' ? "bg-red-500/20 text-red-500" : 
        sentiment === 'Positive' ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"
      )}>{sentiment}</span>
    </div>
    <h4 className="text-xs font-bold text-gray-200 group-hover:text-white mb-1 leading-tight">{title}</h4>
    <div className="flex items-center gap-2">
      <span className="text-[9px] text-blue-400 border border-blue-500/30 px-1 rounded">{source}</span>
      <span className="text-[9px] text-gray-600">ID: {id}</span>
    </div>
  </div>
);

const newsItems = [
  { id: "NEWS-01", time: "14:30", title: "Protests Erupt in Capital Over Fuel Prices", source: "Global News", sentiment: "Negative" },
  { id: "NEWS-02", time: "14:15", title: "Government Announces New Policy", source: "State Media", sentiment: "Neutral" },
  { id: "NEWS-03", time: "13:50", title: "Border Tensions Escalate", source: "Defense Daily", sentiment: "Negative" },
];

const socialItems = [
  { id: "SOC-01", time: "14:45", title: "#ResistNow Trending Worldwide", source: "Twitter", sentiment: "Negative" },
  { id: "SOC-02", time: "14:40", title: "Viral Video of Police Action", source: "TikTok", sentiment: "Negative" },
  { id: "SOC-03", time: "14:20", title: "Support Rally Organized", source: "Facebook", sentiment: "Positive" },
];

export const OsintMain = ({ activeMode, onSelectItem, selectedItemId }: OsintMainProps) => {
  const items = activeMode === 'live-news' ? newsItems : socialItems;

  return (
    <div className="flex-1 flex flex-col bg-[#050608] relative overflow-hidden">
      {/* Top KPI Section */}
      <div className="p-4 grid grid-cols-5 gap-4 z-10 relative">
        <KPICard 
          label="Active Narratives" 
          value="12" 
          sub="+3 New" 
          color="text-white" 
          icon={Newspaper} 
        />
        <KPICard 
          label="AI Content" 
          value="28%" 
          sub="Detected in Feed" 
          color="text-red-500" 
          icon={Bot} 
        />
        <KPICard 
          label="Viral Trends" 
          value="8" 
          sub="High Velocity" 
          color="text-purple-500" 
          icon={Share2} 
        />
        <KPICard 
          label="Provocation Idx" 
          value="8.4" 
          sub="Severe Risk" 
          color="text-amber-500" 
          icon={Megaphone} 
        />
        <KPICard 
          label="Sentiment Index" 
          value="-0.65" 
          sub="Highly Negative" 
          color="text-red-400" 
          icon={TrendingUp} 
        />
      </div>

      {/* Main Content Split: Globe & Feed */}
      <div className="flex-1 flex min-h-0 px-4 pb-4 gap-4">
        
        {/* Globe View (Center Panel) */}
        <div className="flex-1 rounded-lg border border-white/10 relative overflow-hidden bg-[#0a0c10]">
          <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur px-2 py-1 rounded border border-white/10 text-[10px] text-gray-400 font-bold uppercase">
            Global Narrative Visualization
          </div>
          <OsintGlobe activeMode={activeMode} />
        </div>

        {/* Feed (Right Side of Globe, Left of Detail Panel) */}
        <div className="w-[300px] bg-[#0a0c10] rounded-lg border border-white/10 flex flex-col">
          <div className="p-3 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase">
              {activeMode === 'live-news' ? 'Live Wire' : 'Social Stream'}
            </h3>
            <span className="text-[9px] text-blue-500 animate-pulse">UPDATING</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {items.map(item => (
              <FeedItem 
                key={item.id}
                {...item}
                active={selectedItemId === item.id}
                onClick={() => onSelectItem(item)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
