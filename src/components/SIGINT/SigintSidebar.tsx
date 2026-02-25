import React from 'react';
import { 
  Radio, 
  Activity, 
  AlertTriangle, 
  Users, 
  MicOff, 
  WifiOff, 
  Move, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type SigintLayer = 
  | 'density' 
  | 'coordination' 
  | 'anomaly' 
  | 'crowd' 
  | 'silence' 
  | 'interference' 
  | 'movement' 
  | 'internal' 
  | 'multidomain';

interface SigintSidebarProps {
  activeLayer: SigintLayer;
  onLayerChange: (layer: SigintLayer) => void;
}

const LayerButton = ({ id, label, icon: Icon, active, onClick, description }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full text-left p-3 rounded-lg border transition-all mb-2 group relative overflow-hidden",
      active 
        ? "bg-emerald-600/20 border-emerald-500 text-white" 
        : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
    )}
  >
    <div className="flex items-center gap-3 mb-1 relative z-10">
      <div className={cn(
        "p-1.5 rounded-md",
        active ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-500 group-hover:text-gray-300"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-[10px] opacity-70 pl-[38px] relative z-10 leading-tight">
      {description}
    </div>
    {active && (
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-500" />
    )}
  </button>
);

export const SigintSidebar = ({ activeLayer, onLayerChange }: SigintSidebarProps) => {
  return (
    <div className="w-[280px] bg-[#0a0c10] border-r border-white/10 flex flex-col h-full z-20">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 tracking-wider">
          <Radio className="w-4 h-4 text-emerald-500" /> SIGNAL INTELLIGENCE
        </h2>
        <div className="text-[10px] text-gray-500 font-mono mt-1">SPECTRUM ANALYSIS & MONITORING</div>
      </div>

      {/* Layer Selection */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold text-gray-500 uppercase mb-3 px-1">Analysis Modules</div>
        
        <LayerButton 
          id="density"
          label="Signal Density"
          icon={Activity}
          active={activeLayer === 'density'}
          onClick={() => onLayerChange('density')}
          description="Volume analysis, surge detection, and active device concentration."
        />

        <LayerButton 
          id="coordination"
          label="Coordination Pattern"
          icon={Users}
          active={activeLayer === 'coordination'}
          onClick={() => onLayerChange('coordination')}
          description="Burst communication, synchronous activation, and structured coordination."
        />

        <LayerButton 
          id="anomaly"
          label="Anomaly Detection"
          icon={AlertTriangle}
          active={activeLayer === 'anomaly'}
          onClick={() => onLayerChange('anomaly')}
          description="Temporal and spatial deviations from baseline signal patterns."
        />

        <LayerButton 
          id="crowd"
          label="Crowd Intensity"
          icon={Users}
          active={activeLayer === 'crowd'}
          onClick={() => onLayerChange('crowd')}
          description="Correlation of signal surges with physical crowd density (IMINT)."
        />

        <LayerButton 
          id="silence"
          label="Signal Silence"
          icon={MicOff}
          active={activeLayer === 'silence'}
          onClick={() => onLayerChange('silence')}
          description="Blackout detection, sudden drops in communication, and radio silence."
        />

        <LayerButton 
          id="interference"
          label="Interference & Jamming"
          icon={WifiOff}
          active={activeLayer === 'interference'}
          onClick={() => onLayerChange('interference')}
          description="Noise floor analysis, channel overload, and GPS interference zones."
        />

        <LayerButton 
          id="movement"
          label="Device Movement"
          icon={Move}
          active={activeLayer === 'movement'}
          onClick={() => onLayerChange('movement')}
          description="Cluster movement correlation, convergence patterns, and dispersal."
        />

        <LayerButton 
          id="internal"
          label="Internal Comms"
          icon={ShieldCheck}
          active={activeLayer === 'internal'}
          onClick={() => onLayerChange('internal')}
          description="Tactical network monitoring, channel load, and latency analysis."
        />

        <LayerButton 
          id="multidomain"
          label="Multi-Domain"
          icon={Globe}
          active={activeLayer === 'multidomain'}
          onClick={() => onLayerChange('multidomain')}
          description="Cross-correlation with OSINT, GEOINT, and IMINT data sources."
        />
      </div>

      {/* Status Footer */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex items-center justify-between text-[10px] text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> 
            <span>Spectrum Monitor Active</span>
          </div>
          <span className="font-mono">CH: 14-82</span>
        </div>
      </div>
    </div>
  );
};
