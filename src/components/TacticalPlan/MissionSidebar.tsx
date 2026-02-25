import { useState } from 'react';
import { 
  Plus, 
  X, 
  Plane, 
  Truck, 
  Ship, 
  Shield, 
  Calendar, 
  MapPin, 
  Box, 
  ChevronDown, 
  Sparkles,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MissionSidebarProps {
  onClose?: () => void;
}

export const MissionSidebar = ({ onClose }: MissionSidebarProps) => {
  const [view, setView] = useState<'list' | 'add'>('list');
  const [missionType, setMissionType] = useState('air');

  if (view === 'add') {
    return (
      <div className="h-full flex flex-col bg-[#0a0c10] border-l border-tactical-border">
        {/* Header */}
        <div className="p-4 border-b border-tactical-border flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-tactical-info/20 flex items-center justify-center border border-tactical-info/30">
              <Box className="w-4 h-4 text-tactical-info" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Add Mission</h2>
              <p className="text-[10px] text-gray-500 font-mono">Set up and configure a new mission</p>
            </div>
          </div>
          <button onClick={() => setView('list')} className="text-gray-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
          {/* AI Prompt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-tactical-info">
                <Sparkles className="w-3 h-3" />
                <span className="text-xs font-bold uppercase">AI Command</span>
              </div>
              <button className="text-[10px] text-tactical-info hover:underline">Generate with AI</button>
            </div>
            <textarea 
              className="w-full h-24 bg-white/5 border border-gray-700 rounded p-3 text-xs text-gray-300 placeholder:text-gray-600 focus:border-tactical-info focus:outline-none resize-none font-mono"
              placeholder="e.g. Prepare a convoy for delivery of 1.5 tons of medical supplies to Sector 4 tomorrow morning. Route is classified as high-risk."
            />
            <p className="text-[10px] text-gray-600">Create missions instantly using natural language.</p>
          </div>

          {/* Mission Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Mission Category <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'air', icon: Plane, label: 'Air' },
                { id: 'land', icon: Truck, label: 'Land' },
                { id: 'sea', icon: Ship, label: 'Sea' },
                { id: 'cyber', icon: Shield, label: 'Cyber' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setMissionType(type.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 p-2 rounded border transition-all",
                    missionType === type.id 
                      ? "bg-tactical-accent/10 border-tactical-accent text-tactical-accent" 
                      : "bg-white/5 border-transparent text-gray-500 hover:bg-white/10 hover:text-gray-300"
                  )}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Select Date"
                className="w-full bg-white/5 border border-gray-700 rounded py-2 pl-10 pr-3 text-xs text-white focus:border-tactical-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Start Point <span className="text-red-500">*</span></label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Select location"
                  className="w-full bg-white/5 border border-gray-700 rounded py-2 pl-10 pr-3 text-xs text-white focus:border-tactical-accent focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Destination <span className="text-red-500">*</span></label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Select location"
                  className="w-full bg-white/5 border border-gray-700 rounded py-2 pl-10 pr-3 text-xs text-white focus:border-tactical-accent focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payloads */}
          <div className="border border-gray-800 rounded p-3 bg-black/20">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-gray-400 uppercase">Payloads</label>
              <button className="text-[10px] text-tactical-info hover:underline">Add Payload</button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-[1fr_80px_24px] gap-2 items-end">
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-600 uppercase">Name</label>
                  <input type="text" placeholder="Item name" className="w-full bg-white/5 border border-gray-700 rounded px-2 py-1.5 text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-600 uppercase">Qty</label>
                  <input type="number" placeholder="0" className="w-full bg-white/5 border border-gray-700 rounded px-2 py-1.5 text-xs text-white" />
                </div>
                <button className="h-8 flex items-center justify-center text-gray-500 hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-tactical-border bg-black/40 flex gap-3">
          <button 
            onClick={() => setView('list')}
            className="flex-1 py-2 rounded border border-gray-700 text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => setView('list')}
            className="flex-1 py-2 rounded bg-tactical-info text-black text-xs font-bold hover:bg-tactical-info/90 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0c10] border-l border-tactical-border">
      {/* Header */}
      <div className="p-4 border-b border-tactical-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono text-gray-500 uppercase tracking-widest">Tactical Plan</span>
          <div className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-500 text-[9px] font-bold border border-red-500/30">LIVE</div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>

      {/* Add Mission Button */}
      <div className="p-4">
        <button 
          onClick={() => setView('add')}
          className="w-full py-2.5 bg-tactical-info/10 border border-tactical-info/50 text-tactical-info rounded flex items-center justify-center gap-2 hover:bg-tactical-info/20 transition-all group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wide">Add Mission</span>
        </button>
      </div>

      {/* Tracked Flights */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 mb-3">
            <Plane className="w-3 h-3 text-gray-500" />
            <h3 className="text-xs font-bold text-gray-400 uppercase">Tracked Flights</h3>
          </div>

          <div className="space-y-3">
            {[
              { id: 'MBG-0001', status: 'En Route', from: 'Jakarta', fromCode: 'CGK', to: 'Jayapura', toCode: 'DJJ', time: '15 Dec 2026, 15:00', units: 12, type: 'Cessna 208B' },
              { id: 'MBG-0002', status: 'En Route', from: 'Makassar', fromCode: 'UPG', to: 'Ambon', toCode: 'AMQ', time: '15 Dec 2026, 16:30', units: 8, type: 'Hercules C-130' },
              { id: 'MBG-0003', status: 'Delayed', from: 'Surabaya', fromCode: 'SUB', to: 'Balikpapan', toCode: 'BPN', time: '15 Dec 2026, 15:00', units: 12, type: 'Cessna 208B' },
            ].map((flight, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded p-3 hover:border-tactical-accent/30 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", flight.status === 'Delayed' ? "bg-red-500" : "bg-yellow-500")} />
                    <span className="text-xs font-bold text-white">{flight.id}</span>
                    <span className="text-[10px] text-gray-500">| {flight.type}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-300 mb-2 font-mono">
                  <span>{flight.from} <span className="text-gray-500 text-[10px] bg-white/5 px-1 rounded">{flight.fromCode}</span></span>
                  <ArrowRight className="w-3 h-3 text-gray-600" />
                  <span>{flight.to} <span className="text-gray-500 text-[10px] bg-white/5 px-1 rounded">{flight.toCode}</span></span>
                </div>

                <div className="text-[10px] text-gray-500 mb-3">{flight.time}</div>

                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase",
                    flight.status === 'Delayed' ? "bg-red-500/20 text-red-500" : "bg-tactical-info/20 text-tactical-info"
                  )}>{flight.status}</span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Box className="w-3 h-3" />
                    <span>{flight.units} Unit</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Humint Reports */}
        <div className="px-4 pt-4 pb-4 border-t border-gray-800 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Info className="w-3 h-3 text-gray-500" />
              <h3 className="text-xs font-bold text-gray-400 uppercase">Humint Reports</h3>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-600" />
          </div>

          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded p-2 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-tactical-info" />
                    <span className="text-[10px] font-bold text-gray-300 truncate w-40">Reporting from location for an...</span>
                  </div>
                  <span className="text-[9px] text-gray-500">0.87</span>
                </div>
                <div className="text-[9px] text-gray-600 mb-2">11/08/2025, 03:12</div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-black/40 px-1 rounded text-gray-500 font-mono">r-6b02</span>
                  <span className="text-[9px] bg-black/40 px-1 rounded text-gray-500 font-mono">BOM-TSL-20250725-01</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
