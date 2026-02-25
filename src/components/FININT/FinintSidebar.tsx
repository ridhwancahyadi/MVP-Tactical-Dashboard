import React from 'react';
import { Layers, BarChart3, Coins, Fuel, ArrowLeftRight, AlertOctagon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FinintLayer = 'market' | 'currency' | 'commodity' | 'capital' | 'risk';

interface FinintSidebarProps {
  activeLayer: FinintLayer;
  onLayerChange: (layer: FinintLayer) => void;
}

const LayerButton = ({ id, label, icon: Icon, active, onClick, description }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full text-left p-3 rounded-lg border transition-all mb-2 group relative overflow-hidden",
      active 
        ? "bg-blue-600/20 border-blue-500 text-white" 
        : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white"
    )}
  >
    <div className="flex items-center gap-3 mb-1 relative z-10">
      <div className={cn(
        "p-1.5 rounded-md",
        active ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-500 group-hover:text-gray-300"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-[10px] opacity-70 pl-[38px] relative z-10 leading-tight">
      {description}
    </div>
    {active && (
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500" />
    )}
  </button>
);

export const FinintSidebar = ({ activeLayer, onLayerChange }: FinintSidebarProps) => {
  return (
    <div className="w-[260px] bg-[#0a0c10] border-r border-white/10 flex flex-col h-full z-20">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 tracking-wider">
          <Layers className="w-4 h-4 text-blue-500" /> GLOBAL RADAR
        </h2>
        <div className="text-[10px] text-gray-500 font-mono mt-1">MULTI-LAYER INTELLIGENCE</div>
      </div>

      {/* Layer Selection */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold text-gray-500 uppercase mb-3 px-1">Select Map Layer</div>
        
        <LayerButton 
          id="market"
          label="Market Heatmap"
          icon={BarChart3}
          active={activeLayer === 'market'}
          onClick={() => onLayerChange('market')}
          description="Global indices performance, volatility, and market stress indicators."
        />

        <LayerButton 
          id="currency"
          label="Currency Pressure"
          icon={Coins}
          active={activeLayer === 'currency'}
          onClick={() => onLayerChange('currency')}
          description="USD pairs movement, devaluation risks, and emerging market stress."
        />

        <LayerButton 
          id="commodity"
          label="Commodity Exposure"
          icon={Fuel}
          active={activeLayer === 'commodity'}
          onClick={() => onLayerChange('commodity')}
          description="Oil shock regions, energy disruption, and resource price movements."
        />

        <LayerButton 
          id="capital"
          label="Capital Flow"
          icon={ArrowLeftRight}
          active={activeLayer === 'capital'}
          onClick={() => onLayerChange('capital')}
          description="Global capital direction, bond yield impact, and risk-off movements."
        />

        <LayerButton 
          id="risk"
          label="Risk Hotspots"
          icon={AlertOctagon}
          active={activeLayer === 'risk'}
          onClick={() => onLayerChange('risk')}
          description="Critical alerts: CDS spikes, yield surges, and banking crises."
        />
      </div>

      {/* Legend Area */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Layer Legend</div>
        <div className="space-y-2">
          {activeLayer === 'market' && (
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"/> Stable</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> High Stress</div>
            </div>
          )}
          {activeLayer === 'currency' && (
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"/> Devaluation</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> Crash Risk</div>
            </div>
          )}
          {activeLayer === 'commodity' && (
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"/> Oil Shock</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"/> Food Crisis</div>
            </div>
          )}
          {activeLayer === 'capital' && (
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"/> Inflow</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> Outflow</div>
            </div>
          )}
          {activeLayer === 'risk' && (
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"/> Systemic Risk</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
