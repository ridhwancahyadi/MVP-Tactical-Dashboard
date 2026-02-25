import React from 'react';
import { Filter, Bell, User, Car, Box } from 'lucide-react';

const alerts = [
  { id: 1, type: 'Person detected', camera: 'CCTV Lobby Cam', time: '12 Jan 2026, 14:42', img: 'https://picsum.photos/seed/alert1/100/100', icon: User },
  { id: 2, type: 'Vehicle detected', camera: 'Drone Alpha-1', time: '12 Jan 2026, 14:40', img: 'https://picsum.photos/seed/alert2/100/100', icon: Car },
  { id: 3, type: 'Person detected', camera: 'Hallway Cam 2B', time: '12 Jan 2026, 14:38', img: 'https://picsum.photos/seed/alert3/100/100', icon: User },
  { id: 4, type: 'Face recognized', camera: 'CCTV Lobby Cam', time: '12 Jan 2026, 14:35', img: 'https://picsum.photos/seed/alert4/100/100', icon: User, highlight: true },
  { id: 5, type: 'Object detected', camera: 'Perimeter Cam 04', time: '12 Jan 2026, 14:30', img: 'https://picsum.photos/seed/alert5/100/100', icon: Box },
];

export const ImintActivity = () => {
  return (
    <div className="h-full bg-tactical-card/50 border-l border-tactical-border flex flex-col w-[280px]">
      {/* Header */}
      <div className="p-4 border-b border-tactical-border flex items-center justify-between">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Activity</h2>
        <Filter className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white" />
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
        <div className="flex items-center justify-between px-2 mb-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Alerts</span>
          <button className="text-[10px] text-tactical-accent hover:underline">View All</button>
        </div>

        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white/5 border border-white/5 rounded p-2 flex gap-3 hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden flex-shrink-0 border border-white/10">
              <img src={alert.img} alt="alert" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-white truncate mb-0.5">{alert.type}</div>
              <div className="text-[9px] text-gray-400 truncate mb-1">{alert.camera}</div>
              <div className="text-[9px] text-gray-600 font-mono">{alert.time}</div>
            </div>
            {alert.highlight && (
              <div className="w-1.5 h-1.5 rounded-full bg-tactical-accent mt-1" />
            )}
          </div>
        ))}

        <div className="flex items-center justify-between px-2 mt-4 mb-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Detections</span>
          <button className="text-[10px] text-tactical-accent hover:underline">View All</button>
        </div>
        
        {/* Placeholder for detections list (reusing alerts for demo) */}
        {alerts.slice(0, 3).map((alert) => (
          <div key={`det-${alert.id}`} className="bg-white/5 border border-white/5 rounded p-2 flex gap-3 hover:bg-white/10 transition-colors group cursor-pointer opacity-70">
            <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden flex-shrink-0 border border-white/10">
              <img src={alert.img} alt="alert" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-white truncate mb-0.5">{alert.type}</div>
              <div className="text-[9px] text-gray-400 truncate mb-1">{alert.camera}</div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};
