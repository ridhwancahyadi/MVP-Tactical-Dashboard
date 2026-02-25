import React from 'react';
import { ChevronDown, ChevronRight, ShieldAlert, Activity, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const KPICard = ({ label, value, sub, color }: any) => (
  <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex flex-col">
    <span className="text-[10px] text-gray-500 uppercase font-bold mb-1">{label}</span>
    <span className={cn("text-xl font-bold font-mono leading-none mb-1", color)}>{value}</span>
    <span className="text-[9px] text-gray-400">{sub}</span>
  </div>
);

const TopItem = ({ rank, country, flag, percent, color = "bg-cyan-500" }: any) => (
  <div className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
    <div className="w-4 h-3 bg-gray-700 rounded-sm overflow-hidden relative">
      {/* Mock Flag */}
      <div className="absolute inset-0 flex">
        <div className="w-1/3 bg-red-500"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-blue-500"></div>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-300 truncate">{country}</span>
        <span className="text-xs font-mono font-bold text-white">{percent}%</span>
      </div>
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  </div>
);

const VectorItem = ({ name, percent }: any) => (
  <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
    <span className="text-xs text-yellow-500/80">{name}</span>
    <span className="text-xs font-mono font-bold text-white">{percent}%</span>
  </div>
);

export const CybintRightPanel = () => {
  return (
    <div className="w-[300px] bg-[#0a0c10]/90 backdrop-blur-md border-l border-white/10 flex flex-col h-full z-30">
      {/* KPI Header */}
      <div className="p-4 border-b border-white/10 grid grid-cols-2 gap-2">
        <KPICard label="Threat Level" value="CRITICAL" sub="Defcon 3" color="text-red-500" />
        <KPICard label="Attacks Today" value="2.6M" sub="+12% vs Avg" color="text-white" />
        <KPICard label="Active Sources" value="1,204" sub="Global Nodes" color="text-cyan-400" />
        <KPICard label="Bandwidth" value="42 TB" sub="Peak Traffic" color="text-yellow-400" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Top Attackers */}
        <div className="p-4 border-b border-white/10">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-3">Top Attackers</h3>
          <div className="space-y-1">
            <TopItem rank="1" country="United States" percent="69" color="bg-red-500" />
            <TopItem rank="2" country="Brazil" percent="19" color="bg-green-500" />
            <TopItem rank="3" country="Netherlands" percent="6" color="bg-blue-500" />
            <TopItem rank="4" country="United Kingdom" percent="4" color="bg-indigo-500" />
            <TopItem rank="5" country="China" percent="2" color="bg-red-600" />
          </div>
        </div>

        {/* Top Attacked */}
        <div className="p-4 border-b border-white/10">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-3">Top Attacked</h3>
          <div className="space-y-1">
            <TopItem rank="1" country="United States" percent="31" color="bg-blue-500" />
            <TopItem rank="2" country="India" percent="18" color="bg-orange-500" />
            <TopItem rank="3" country="Canada" percent="17" color="bg-red-500" />
            <TopItem rank="4" country="Australia" percent="17" color="bg-blue-400" />
            <TopItem rank="5" country="Japan" percent="17" color="bg-white" />
          </div>
        </div>

        {/* Top Vectors */}
        <div className="p-4">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-3">Top Network Attack Vectors</h3>
          <div className="space-y-1">
            <VectorItem name="UDP Flood" percent="59" />
            <VectorItem name="TCP Flood" percent="36" />
            <VectorItem name="Low and Slow Attack" percent="2" />
            <VectorItem name="IP Flood" percent="2" />
            <VectorItem name="DNS Flood" percent="1" />
          </div>
        </div>
      </div>
    </div>
  );
};
