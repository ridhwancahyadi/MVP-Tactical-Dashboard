import React from 'react';
import { HumintLayer } from './HumintSidebar';
import { Layers, MapPin, Users, TrendingUp, FileText, ShieldAlert } from 'lucide-react';

interface HumintGlobeProps {
  activeLayer: HumintLayer;
  onLayerChange: (layer: HumintLayer) => void;
}

export const HumintGlobe = ({ activeLayer, onLayerChange }: HumintGlobeProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#050505] overflow-hidden rounded-lg border border-white/10">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#451a03 1px, transparent 1px), linear-gradient(90deg, #451a03 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Globe Container */}
      <div className="relative w-[500px] h-[500px] rounded-full shadow-[0_0_100px_rgba(245,158,11,0.1)]">
        {/* Atmosphere Glow */}
        <div className={`absolute inset-0 rounded-full z-20 pointer-events-none transition-all duration-500 ${
          activeLayer === 'escalation' ? 'shadow-[inset_0_0_60px_rgba(239,68,68,0.3)]' :
          activeLayer === 'heatmap' ? 'shadow-[inset_0_0_60px_rgba(245,158,11,0.3)]' :
          'shadow-[inset_0_0_60px_rgba(245,158,11,0.2)]'
        }`} />
        
        {/* Globe Texture */}
        <div 
          className="w-full h-full rounded-full bg-[#0a1120] relative overflow-hidden"
          style={{
            boxShadow: 'inset 20px 0 80px 6px rgba(0,0,0,1)',
          }}
        >
          {/* Map Texture */}
          <div 
            className="absolute inset-0 opacity-60 transition-all duration-500"
            style={{
              backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: activeLayer === 'escalation' 
                ? 'invert(1) hue-rotate(0deg) brightness(0.5) contrast(1.5) sepia(1) saturate(5) hue-rotate(-50deg)' 
                : 'invert(1) hue-rotate(10deg) brightness(0.5) contrast(1.2) sepia(0.5)', // Amber tint
              transform: 'scale(1.4)'
            }}
          />
          
          {/* Grid Lines */}
          <div className="absolute inset-0 border border-white/5 rounded-full opacity-20" 
             style={{ background: 'radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.8) 100%)' }}
          />

          {/* LAYER: REPORTS */}
          {activeLayer === 'reports' && (
            <>
              {/* Report Markers */}
              <div className="absolute top-[35%] left-[45%] group cursor-pointer">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute left-4 top-0 bg-black/80 border border-green-500/30 px-2 py-1 rounded text-[9px] text-green-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  LOGISTICS MOVEMENT
                </div>
              </div>
              <div className="absolute top-[42%] left-[52%] group cursor-pointer">
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <div className="absolute left-4 top-0 bg-black/80 border border-amber-500/30 px-2 py-1 rounded text-[9px] text-amber-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  PROTEST GATHERING
                </div>
              </div>
            </>
          )}

          {/* LAYER: HEATMAP */}
          {activeLayer === 'heatmap' && (
            <>
              <div className="absolute top-[40%] left-[50%] w-32 h-32 bg-red-500/20 rounded-full blur-2xl" />
              <div className="absolute top-[35%] left-[45%] w-20 h-20 bg-amber-500/20 rounded-full blur-xl" />
            </>
          )}

          {/* LAYER: AGENTS */}
          {activeLayer === 'agents' && (
            <>
              <div className="absolute top-[38%] left-[48%]">
                <div className="w-2 h-2 bg-blue-500 rounded-full border border-blue-300" />
                <div className="text-[8px] text-blue-300 mt-1">ECHO-7</div>
              </div>
              <div className="absolute top-[45%] left-[55%]">
                <div className="w-2 h-2 bg-blue-500 rounded-full border border-blue-300" />
                <div className="text-[8px] text-blue-300 mt-1">BRAVO-2</div>
              </div>
            </>
          )}

          {/* LAYER: ESCALATION */}
          {activeLayer === 'escalation' && (
            <>
              <div className="absolute top-[40%] left-[50%]">
                <div className="w-4 h-4 border-2 border-red-500 rounded-full animate-ping absolute" />
                <div className="w-2 h-2 bg-red-500 rounded-full relative z-10" />
                <div className="absolute left-4 top-0 text-[10px] font-mono text-red-500 whitespace-nowrap bg-black/80 px-1 rounded border border-red-500/30">
                  CRITICAL ESCALATION
                </div>
              </div>
            </>
          )}

        </div>
        
        {/* Map Controls Overlay */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-30">
          <div className="bg-black/90 backdrop-blur border border-white/10 p-2 rounded-lg shadow-xl">
            <div className="text-[9px] text-gray-500 uppercase mb-2 font-bold flex items-center gap-2">
              <Layers className="w-3 h-3" /> Active Layer
            </div>
            <div className="flex flex-col gap-1">
              {[
                { id: 'reports', label: 'Reports', icon: FileText, color: 'text-green-500' },
                { id: 'heatmap', label: 'Heatmap', icon: MapPin, color: 'text-red-500' },
                { id: 'agents', label: 'Agents', icon: Users, color: 'text-blue-500' },
                { id: 'escalation', label: 'Escalation', icon: TrendingUp, color: 'text-amber-500' },
                { id: 'validation', label: 'Validation', icon: ShieldAlert, color: 'text-purple-500' },
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => onLayerChange(layer.id as HumintLayer)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-[10px] font-bold uppercase transition-colors ${
                    activeLayer === layer.id 
                      ? 'bg-white/10 text-white border border-white/20' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <layer.icon className={`w-3 h-3 ${activeLayer === layer.id ? layer.color : 'text-gray-600'}`} />
                  {layer.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
