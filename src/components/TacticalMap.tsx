import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Ship, 
  Flame, 
  AlertTriangle, 
  X, 
  ChevronRight, 
  Wind, 
  Anchor,
  Shield,
  Target,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data for Map Markers
const MARKERS = [
  { id: 1, type: 'military', lat: 45, lng: 35, title: 'ROCS TSO-YING (PFG-1203)', subtitle: 'FRIGATE', status: 'underway', speed: '12 kts', heading: '20°', area: 'Taiwan Strait' },
  { id: 2, type: 'conflict', lat: 30, lng: 55, title: 'SAUDI-IRAN TALKS', subtitle: 'DIPLOMATIC', status: 'progress', level: 'LOW', source: 'OSINT', desc: 'Joint communiqué issued after 3rd round of normalization talks in Beijing.' },
  { id: 3, type: 'fire', lat: -25, lng: 135, title: 'WILDFIRE ALARM', subtitle: 'THERMAL', status: 'active', temp: '450°C', area: 'Outback' },
  { id: 4, type: 'ship', lat: 10, lng: 110, title: 'CONTAINER VESSEL', subtitle: 'LOGISTICS', status: 'anchored', speed: '0 kts', area: 'South China Sea' },
  { id: 5, type: 'military', lat: 55, lng: -5, title: 'RAF TYPHOON', subtitle: 'PATROL', status: 'airborne', speed: '600 kts', heading: '180°', area: 'North Sea' },
];

const LayerToggle = ({ icon: Icon, label, color, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 w-full px-3 py-2 text-xs font-mono border-l-2 transition-all mb-1",
      active 
        ? "bg-white/5 text-white" 
        : "text-gray-500 hover:text-gray-300 border-transparent hover:bg-white/5"
    )}
    style={{ borderColor: active ? color : 'transparent' }}
  >
    <div className={cn("w-3 h-3 rounded-sm flex items-center justify-center border", active ? "border-current" : "border-gray-600")}>
      {active && <div className="w-1.5 h-1.5 bg-current" />}
    </div>
    <Icon className="w-3.5 h-3.5" style={{ color: active ? color : 'inherit' }} />
    <span>{label}</span>
  </button>
);

export const TacticalMap = ({ onSelectEvent }: { onSelectEvent: (event: any) => void }) => {
  const [activeLayers, setActiveLayers] = useState({
    military: true,
    ships: true,
    fires: true,
    conflict: true
  });

  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    onSelectEvent(marker);
  };

  return (
    <div className="relative w-full h-full bg-[#0a0c10] overflow-hidden group">
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* World Map Background - Using a dark abstract SVG or Image */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
         {/* Simple CSS Globe representation for demo purposes */}
         <div className="w-[800px] h-[800px] rounded-full border border-gray-800 bg-[#0d1117] relative shadow-2xl shadow-black">
            {/* Continents placeholder - in a real app use a geojson svg */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center opacity-30 invert mix-blend-overlay" />
            
            {/* Orbital Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-700/50 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-[50px] rounded-full border border-gray-800/50 animate-[spin_40s_linear_infinite_reverse]" />
         </div>
      </div>

      {/* Markers Layer */}
      <div className="absolute inset-0">
        {MARKERS.map((marker) => {
          if (
            (marker.type === 'military' && !activeLayers.military) ||
            (marker.type === 'ship' && !activeLayers.ships) ||
            (marker.type === 'fire' && !activeLayers.fires) ||
            (marker.type === 'conflict' && !activeLayers.conflict)
          ) return null;

          // Random positioning for demo (clamped to center area)
          // In real app, project lat/lng to x/y
          const top = 50 - (marker.lat * 0.8) + '%';
          const left = 50 + (marker.lng * 0.8) + '%';

          let Icon = Target;
          let color = '#fff';
          
          if (marker.type === 'military') { Icon = Plane; color = '#00ff9d'; }
          if (marker.type === 'ship') { Icon = Ship; color = '#00ccff'; }
          if (marker.type === 'fire') { Icon = Flame; color = '#ffb020'; }
          if (marker.type === 'conflict') { Icon = AlertTriangle; color = '#ff3333'; }

          return (
            <motion.button
              key={marker.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleMarkerClick(marker)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group/marker"
              style={{ top, left }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-current opacity-20 rounded-full animate-ping" style={{ color }} />
                <div className="w-8 h-8 rounded-full bg-black/80 border border-current flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ borderColor: color, color }}>
                  <Icon className="w-4 h-4" />
                </div>
                
                {/* Hover Label */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-black/90 border border-gray-700 p-2 rounded whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none z-30">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">{marker.subtitle}</div>
                  <div className="text-xs font-bold text-white">{marker.title}</div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Marker Popup Overlay */}
      <AnimatePresence>
        {selectedMarker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
          >
            <div className="w-96 bg-black/90 border border-tactical-border backdrop-blur-xl shadow-2xl relative overflow-hidden">
              {/* Decorative Header Line */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-tactical-accent to-transparent" />
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white/10 rounded text-tactical-accent border border-tactical-accent/30">
                        {selectedMarker.subtitle}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">ID: {selectedMarker.id}829-X</span>
                    </div>
                    <h2 className="text-lg font-bold font-display tracking-wide text-white">{selectedMarker.title}</h2>
                  </div>
                  <button onClick={() => setSelectedMarker(null)} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 p-2 rounded border border-white/5">
                    <div className="text-[10px] text-gray-500 font-mono uppercase">Status</div>
                    <div className="text-sm font-medium text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {selectedMarker.status}
                    </div>
                  </div>
                  <div className="bg-white/5 p-2 rounded border border-white/5">
                    <div className="text-[10px] text-gray-500 font-mono uppercase">Area</div>
                    <div className="text-sm font-medium text-white">{selectedMarker.area}</div>
                  </div>
                </div>

                {selectedMarker.desc && (
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 border-l-2 border-gray-700 pl-3">
                    {selectedMarker.desc}
                  </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  <div className="flex gap-4 text-xs font-mono text-gray-500">
                    {selectedMarker.speed && <span>SPD: <span className="text-white">{selectedMarker.speed}</span></span>}
                    {selectedMarker.heading && <span>HDG: <span className="text-white">{selectedMarker.heading}</span></span>}
                  </div>
                  <button className="text-xs text-tactical-accent hover:underline flex items-center gap-1">
                    TRACK ASSET <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer Controls (Floating) */}
      <div className="absolute top-4 left-4 w-64 bg-black/80 backdrop-blur-md border border-tactical-border p-3 rounded-lg z-30">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-gray-400 font-mono uppercase">Layers</span>
          <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500">?</div>
        </div>
        
        <LayerToggle 
          icon={Plane} 
          label="MILITARY FLIGHTS" 
          color="#00ff9d" 
          active={activeLayers.military} 
          onClick={() => setActiveLayers(p => ({ ...p, military: !p.military }))} 
        />
        <LayerToggle 
          icon={Ship} 
          label="SHIP TRAFFIC" 
          color="#00ccff" 
          active={activeLayers.ships} 
          onClick={() => setActiveLayers(p => ({ ...p, ships: !p.ships }))} 
        />
        <LayerToggle 
          icon={Flame} 
          label="FIRE DETECTIONS" 
          color="#ffb020" 
          active={activeLayers.fires} 
          onClick={() => setActiveLayers(p => ({ ...p, fires: !p.fires }))} 
        />
        <LayerToggle 
          icon={AlertTriangle} 
          label="CONFLICT EVENTS" 
          color="#ff3333" 
          active={activeLayers.conflict} 
          onClick={() => setActiveLayers(p => ({ ...p, conflict: !p.conflict }))} 
        />
        
        <div className="mt-3 pt-3 border-t border-gray-800">
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
            <Wind className="w-3 h-3" />
            <span>WEATHER LAYERS</span>
            <span className="ml-auto px-1.5 py-0.5 bg-gray-800 rounded text-gray-400">SOON</span>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1 z-30">
        <button className="w-8 h-8 bg-black/80 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center rounded-t hover:bg-white/10">+</button>
        <button className="w-8 h-8 bg-black/80 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center border-t-0 hover:bg-white/10">-</button>
        <button className="w-8 h-8 bg-black/80 border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center rounded-b border-t-0 mt-2 hover:bg-white/10">
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Scale */}
      <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 text-[10px] font-mono text-gray-400 border border-gray-700 rounded flex items-center gap-2">
        <div className="w-16 h-1 bg-gray-600 relative">
          <div className="absolute top-0 left-0 w-[1px] h-2 bg-gray-400 -mt-0.5" />
          <div className="absolute top-0 right-0 w-[1px] h-2 bg-gray-400 -mt-0.5" />
        </div>
        <span>2,000 km</span>
      </div>
    </div>
  );
};
