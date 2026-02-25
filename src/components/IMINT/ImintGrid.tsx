import React from 'react';
import { Maximize2, MoreHorizontal, Settings, User, Car, Box } from 'lucide-react';

const CameraFeed = ({ name, location, src, detections = [] }: any) => (
  <div className="relative bg-black border border-tactical-border rounded overflow-hidden group h-full flex flex-col">
    {/* Header Overlay */}
    <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between">
      <div>
        <div className="text-xs font-bold text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {name}
        </div>
        <div className="text-[10px] text-gray-400">{location}</div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 hover:bg-white/10 rounded"><Settings className="w-3 h-3 text-white" /></button>
        <button className="p-1 hover:bg-white/10 rounded"><Maximize2 className="w-3 h-3 text-white" /></button>
      </div>
    </div>

    {/* Video/Image Placeholder */}
    <div className="flex-1 relative bg-gray-900">
      <img 
        src={src} 
        alt={name} 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        referrerPolicy="no-referrer"
      />
      
      {/* Detection Overlays (Mock) */}
      {detections.map((det: any, i: number) => (
        <div 
          key={i}
          className="absolute border-2 border-tactical-accent/70 rounded-sm flex items-start justify-start"
          style={{ 
            top: det.y + '%', 
            left: det.x + '%', 
            width: det.w + '%', 
            height: det.h + '%' 
          }}
        >
          <span className="bg-tactical-accent text-black text-[9px] font-bold px-1 uppercase">{det.label}</span>
        </div>
      ))}
    </div>

    {/* Footer Overlay */}
    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent z-10 flex items-center justify-between">
      <div className="flex gap-2">
        <button className="text-[10px] text-white bg-white/10 px-2 py-0.5 rounded hover:bg-white/20 transition-colors">All Object</button>
        <button className="text-[10px] text-gray-400 hover:text-white transition-colors">Person</button>
        <button className="text-[10px] text-gray-400 hover:text-white transition-colors">Vehicle</button>
      </div>
      <MoreHorizontal className="w-4 h-4 text-gray-400" />
    </div>
  </div>
);

export const ImintGrid = () => {
  return (
    <div className="flex-1 bg-[#0a0c10] p-2 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex gap-2">
          <button className="text-xs font-bold text-white bg-tactical-accent/20 border border-tactical-accent/30 px-3 py-1 rounded">All Object</button>
          <button className="text-xs font-bold text-gray-500 hover:text-white px-3 py-1 rounded">Person</button>
          <button className="text-xs font-bold text-gray-500 hover:text-white px-3 py-1 rounded">Face</button>
          <button className="text-xs font-bold text-gray-500 hover:text-white px-3 py-1 rounded">Vehicle</button>
        </div>
        <div className="text-[10px] text-gray-500">Active Devices: <span className="text-white">10/25</span></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[calc(100%-40px)]">
        <CameraFeed 
          name="CCTV Lobby Cam" 
          location="Main Entrance" 
          src="https://picsum.photos/seed/cctv1/800/600"
          detections={[{ x: 60, y: 40, w: 10, h: 25, label: 'Person' }]}
        />
        <CameraFeed 
          name="Drone Alpha-1" 
          location="Sector 7 - Aerial" 
          src="https://picsum.photos/seed/drone1/800/600"
          detections={[{ x: 30, y: 50, w: 15, h: 10, label: 'Vehicle' }]}
        />
        <CameraFeed 
          name="Hallway Cam 2B" 
          location="Level 2 Corridor" 
          src="https://picsum.photos/seed/cctv2/800/600"
          detections={[]}
        />
        <CameraFeed 
          name="360 Intersection" 
          location="Sector 4" 
          src="https://picsum.photos/seed/360cam/800/600"
          detections={[{ x: 45, y: 45, w: 5, h: 10, label: 'Person' }]}
        />
      </div>
    </div>
  );
};
