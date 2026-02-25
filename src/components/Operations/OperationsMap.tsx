import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Car, 
  Plane, 
  Ship, 
  Battery, 
  Signal, 
  MapPin, 
  Navigation, 
  MoreHorizontal,
  Thermometer,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const assets = [
  { id: 'LND-01', name: 'Porsche 911 Carrera', type: 'Land', status: 'Active', driver: 'Rizki Saputra', plate: 'AA 2453 WDS', location: 'Jl. Yos Sudarso No. 12', speed: 40, battery: 98, signal: 'Good', temp: 80 },
  { id: 'LND-02', name: 'Chevrolet Tornado', type: 'Land', status: 'Active', driver: 'Subadrun', plate: 'B 1234 CD', location: 'Sector 4', speed: 65, battery: 85, signal: 'Good', temp: 82 },
  { id: 'LND-03', name: 'Ford Raptor', type: 'Land', status: 'Standby', driver: 'Maulana Ibrahim', plate: 'D 5678 EF', location: 'Base HQ', speed: 0, battery: 100, signal: 'Excellent', temp: 40 },
  { id: 'AIR-01', name: 'Drone Recon X', type: 'Air', status: 'Active', driver: 'Auto-Pilot', plate: 'DR-001', location: 'Sector 7 Aerial', speed: 120, battery: 45, signal: 'Weak', temp: 65 },
  { id: 'SEA-01', name: 'Patrol Boat Bravo', type: 'Sea', status: 'Active', driver: 'Capt. Haddock', plate: 'PB-09', location: 'North Coast', speed: 30, battery: 90, signal: 'Good', temp: 70 },
];

export const OperationsMap = () => {
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [filter, setFilter] = useState('All');

  const filteredAssets = filter === 'All' ? assets : assets.filter(a => a.type === filter);

  return (
    <div className="flex-1 flex min-h-0 bg-[#0a0c10]">
      {/* Sidebar List */}
      <div className="w-[300px] bg-[#1a1d24] border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white mb-3">Vehicle List</h2>
          <div className="relative mb-3">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search vehicle or user" 
              className="w-full bg-black/30 border border-white/10 rounded pl-8 pr-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-1">
            {['All', 'Land', 'Air', 'Sea'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "flex-1 py-1 text-[10px] font-bold rounded border transition-colors",
                  filter === f ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "text-gray-500 border-transparent hover:bg-white/5"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {filteredAssets.map(asset => (
            <div 
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className={cn(
                "p-2 rounded cursor-pointer border transition-colors flex items-center gap-3",
                selectedAsset.id === asset.id 
                  ? "bg-blue-500/10 border-blue-500/30" 
                  : "bg-transparent border-transparent hover:bg-white/5"
              )}
            >
              <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center border border-white/10">
                {asset.type === 'Land' && <Car className="w-4 h-4 text-blue-400" />}
                {asset.type === 'Air' && <Plane className="w-4 h-4 text-green-400" />}
                {asset.type === 'Sea' && <Ship className="w-4 h-4 text-yellow-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className={cn("text-xs font-bold truncate", selectedAsset.id === asset.id ? "text-white" : "text-gray-300")}>
                  {asset.name}
                </div>
                <div className="text-[10px] text-gray-500 truncate">{asset.driver}</div>
              </div>
              <TargetIcon status={asset.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-[#050505] overflow-hidden">
        {/* Map Placeholder */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'invert(1) grayscale(1) brightness(0.4)'
          }}
        />
        
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Asset Marker (Mock Position) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap border border-blue-500/30">
              {selectedAsset.name}
            </div>
          </div>
        </div>

        {/* Asset Detail Card (Floating) */}
        <div className="absolute top-4 left-4 w-[300px] bg-[#1a1d24]/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-3 border-b border-white/10 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-500 uppercase">Connected</span>
            </div>
            <div className="text-[10px] text-gray-500">Signal: <span className="text-white">{selectedAsset.signal}</span></div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">{selectedAsset.name}</h3>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-gray-700 flex items-center justify-center text-[8px]">👤</span>
                  {selectedAsset.driver}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">{selectedAsset.speed} <span className="text-xs text-gray-500">km/h</span></div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="bg-black/30 p-1.5 rounded text-center">
                <Battery className="w-3 h-3 text-green-500 mx-auto mb-1" />
                <span className="text-[10px] text-white font-mono">{selectedAsset.battery}%</span>
              </div>
              <div className="bg-black/30 p-1.5 rounded text-center">
                <Thermometer className="w-3 h-3 text-red-500 mx-auto mb-1" />
                <span className="text-[10px] text-white font-mono">{selectedAsset.temp}°C</span>
              </div>
              <div className="bg-black/30 p-1.5 rounded text-center">
                <Lock className="w-3 h-3 text-yellow-500 mx-auto mb-1" />
                <span className="text-[10px] text-white font-mono">N/A</span>
              </div>
              <div className="bg-black/30 p-1.5 rounded text-center">
                <Signal className="w-3 h-3 text-blue-500 mx-auto mb-1" />
                <span className="text-[10px] text-white font-mono">15</span>
              </div>
            </div>

            <div className="space-y-2 text-[10px] text-gray-400 font-mono border-t border-white/5 pt-3">
              <div className="flex justify-between">
                <span>License Plate</span>
                <span className="text-white">{selectedAsset.plate}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Update</span>
                <span className="text-white">18 Dec 2025, 18:02:31</span>
              </div>
              <div className="flex justify-between">
                <span>Last Position</span>
                <span className="text-white text-right max-w-[150px] truncate">{selectedAsset.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="bg-white/5 hover:bg-white/10 text-white text-xs py-2 rounded border border-white/10 transition-colors">
                Track Replay
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 rounded transition-colors">
                Command
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TargetIcon = ({ status }: { status: string }) => (
  <div className={cn(
    "w-1.5 h-1.5 rounded-full",
    status === 'Active' ? "bg-green-500" : 
    status === 'Standby' ? "bg-blue-500" : "bg-red-500"
  )} />
);
