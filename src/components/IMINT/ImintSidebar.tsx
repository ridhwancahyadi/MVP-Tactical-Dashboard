import React, { useState } from 'react';
import { Search, Filter, Plus, Video, Aperture, Plane, MoreVertical, Battery, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

const devices = [
  { id: 1, name: 'CCTV Lobby Cam', type: 'CCTV', status: 'online', tags: ['Face', 'Person'], location: 'Main Entrance' },
  { id: 2, name: 'Drone Alpha-1', type: 'Drone', status: 'active', tags: ['Vehicle', 'Person'], battery: 85, signal: 92 },
  { id: 3, name: '360 Intersection', type: '360', status: 'online', tags: ['Transportation'], location: 'Sector 4' },
  { id: 4, name: 'Perimeter Cam 04', type: 'CCTV', status: 'offline', tags: [], location: 'North Gate' },
  { id: 5, name: 'Drone Bravo-2', type: 'Drone', status: 'charging', tags: [], battery: 12, signal: 0 },
  { id: 6, name: 'Hallway Cam 2B', type: 'CCTV', status: 'online', tags: ['Person'], location: 'Level 2' },
];

export const ImintSidebar = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="h-full bg-tactical-card/50 border-r border-tactical-border flex flex-col w-[280px]">
      {/* Header */}
      <div className="p-4 border-b border-tactical-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Device List</h2>
          <button className="text-[10px] flex items-center gap-1 bg-tactical-accent/10 text-tactical-accent px-2 py-1 rounded border border-tactical-accent/20 hover:bg-tactical-accent/20 transition-colors">
            <Plus className="w-3 h-3" /> Add Device
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search devices..." 
            className="w-full bg-black/20 border border-white/10 rounded pl-7 pr-2 py-1.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-tactical-accent/50"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-1">
          {['All', 'CCTV', 'Drone', '360'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 text-[9px] py-1 rounded border transition-colors uppercase font-bold",
                filter === f 
                  ? "bg-white/10 text-white border-white/20" 
                  : "text-gray-500 border-transparent hover:bg-white/5"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
        <div className="flex items-center justify-between px-2 mb-1">
          <span className="text-[10px] text-gray-500">Selected 3/25</span>
          <button className="text-[10px] text-tactical-accent hover:underline">Select All</button>
        </div>

        {devices.map((device) => (
          <div key={device.id} className="bg-white/5 border border-white/5 rounded p-2 hover:border-white/10 transition-colors group cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {device.type === 'CCTV' && <Video className="w-3 h-3 text-blue-400" />}
                {device.type === 'Drone' && <Plane className="w-3 h-3 text-yellow-400" />}
                {device.type === '360' && <Aperture className="w-3 h-3 text-purple-400" />}
                <span className="text-xs font-bold text-gray-200">{device.name}</span>
              </div>
              <div className="flex items-center gap-1">
                {device.type === 'Drone' && (
                  <div className="flex items-center gap-0.5 text-[9px] text-gray-500 mr-1">
                    <Battery className="w-2.5 h-2.5" /> {device.battery}%
                  </div>
                )}
                <div className={cn("w-1.5 h-1.5 rounded-full", device.status === 'online' || device.status === 'active' ? "bg-green-500" : "bg-red-500")} />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {device.tags.map(tag => (
                <span key={tag} className="text-[9px] bg-black/30 text-gray-400 px-1.5 py-0.5 rounded border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
