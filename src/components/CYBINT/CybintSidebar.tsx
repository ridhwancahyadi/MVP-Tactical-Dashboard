import React from 'react';
import { Shield, Layers, Eye, EyeOff, X, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const LayerItem = ({ label, color, active = true }: { label: string, color: string, active?: boolean }) => (
  <div className="flex items-center justify-between p-3 hover:bg-white/5 cursor-pointer rounded-lg group transition-all border border-transparent hover:border-white/5">
    <div className="flex items-center gap-3">
      <div className={cn(
        "w-3 h-3 rounded-full shadow-[0_0_8px]",
        active ? `bg-${color} shadow-${color}/50` : "bg-gray-700"
      )} style={{ backgroundColor: active ? color : undefined, boxShadow: active ? `0 0 8px ${color}` : 'none' }} />
      <span className={cn("text-sm font-medium transition-colors", active ? "text-white" : "text-gray-500")}>{label}</span>
    </div>
    <div className="text-gray-500 group-hover:text-white transition-colors">
      {active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
    </div>
  </div>
);

export const CybintSidebar = () => {
  return (
    <div className="w-[240px] bg-[#0a0c10]/90 backdrop-blur-md border-r border-white/10 flex flex-col h-full z-30">
      {/* Header / Logo Area */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-6 h-6 text-cyan-500" />
          <h1 className="text-lg font-bold text-white tracking-tight">CYBER INTEL</h1>
        </div>
        <div className="text-[10px] text-cyan-500/60 font-mono">GLOBAL THREAT MONITORING</div>
      </div>

      {/* Map Layers */}
      <div className="flex-1 px-4 py-4">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
          <Layers className="w-3 h-3" /> Map Layers
        </h3>
        <div className="space-y-1">
          <LayerItem label="Web Attackers" color="#ef4444" active={true} />
          <LayerItem label="DDoS Attackers" color="#eab308" active={true} />
          <LayerItem label="Intruders" color="#3b82f6" active={true} />
          <LayerItem label="Scanners" color="#8b5cf6" active={false} />
          <LayerItem label="Anonymizers" color="#ec4899" active={false} />
        </div>
      </div>

      {/* Footer Socials */}
      <div className="p-4 border-t border-white/10 flex gap-2">
        <div className="text-[10px] text-gray-600">
          System Status: <span className="text-green-500">ONLINE</span>
        </div>
      </div>
    </div>
  );
};
