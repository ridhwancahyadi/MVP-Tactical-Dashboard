import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { TrendingUp, AlertOctagon, FileText, BrainCircuit, ChevronUp, ChevronDown, Activity, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const escalationData = [
  { time: '06:00', score: 20 },
  { time: '09:00', score: 25 },
  { time: '12:00', score: 45 },
  { time: '15:00', score: 60 },
  { time: '18:00', score: 85 }, // Escalation
  { time: '21:00', score: 90 },
];

const patternData = [
  { type: 'Logistics', count: 12 },
  { type: 'Protest', count: 8 },
  { type: 'Armed', count: 15 },
  { type: 'Recon', count: 5 },
];

export const HumintBottomPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "bg-[#0a0c10] border-t border-white/10 transition-all duration-500 ease-in-out flex flex-col relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]",
        isExpanded ? "h-[500px]" : "h-[220px]"
      )}
    >
      {/* Toggle Handle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0a0c10] border border-white/10 border-b-0 rounded-t-lg px-6 py-1 text-gray-400 hover:text-white flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
      >
        {isExpanded ? (
          <>
            <ChevronDown className="w-3 h-3" /> Minimize Analysis
          </>
        ) : (
          <>
            <ChevronUp className="w-3 h-3" /> Expand Intelligence
          </>
        )}
      </button>

      {/* Top Row (Always Visible) */}
      <div className="h-[220px] flex shrink-0 border-b border-white/10">
        {/* 1. Escalation Timeline */}
        <div className="w-1/3 p-4 border-r border-white/10 flex flex-col">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
            <TrendingUp className="w-3 h-3" /> Escalation Risk Timeline
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={escalationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} dot={{r: 2}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Pattern Detection */}
        <div className="w-1/4 p-4 border-r border-white/10 flex flex-col">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
            <AlertOctagon className="w-3 h-3" /> Incident Pattern
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patternData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" width={50} tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                />
                <Bar dataKey="count" fill="#d97706" radius={[0, 4, 4, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Narrative Intelligence Generator */}
        <div className="flex-1 p-4 bg-amber-950/5 relative">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <BrainCircuit className="w-24 h-24 text-amber-500" />
          </div>
          <h3 className="text-[10px] font-bold text-amber-500 uppercase mb-3 flex items-center gap-2">
            <FileText className="w-3 h-3" /> AI Narrative Intelligence
          </h3>
          <div className="text-sm text-gray-300 leading-relaxed font-medium font-mono">
            "Dalam <span className="text-amber-400 font-bold">6 jam terakhir</span> terjadi peningkatan laporan logistik musuh di sektor X dengan reliabilitas tinggi (&gt;80%). Pola menunjukkan konsentrasi aktivitas dan potensi <span className="text-red-400 font-bold">mobilisasi terbatas</span>. Korelasi dengan data SIGINT menunjukkan lonjakan komunikasi 15 menit sebelum pergerakan logistik."
          </div>
          
          <div className="mt-4 pt-3 border-t border-amber-500/20 flex gap-4">
            <div>
              <div className="text-[9px] text-gray-500 uppercase">Confidence</div>
              <div className="text-xs font-bold text-green-400">HIGH (88%)</div>
            </div>
            <div>
              <div className="text-[9px] text-gray-500 uppercase">Source Count</div>
              <div className="text-xs font-bold text-white">12 Reports</div>
            </div>
            <div>
              <div className="text-[9px] text-gray-500 uppercase">Action</div>
              <div className="text-xs font-bold text-red-400">MONITOR</div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050608] p-6">
        <div className="grid grid-cols-3 gap-6 h-full">
          {/* Recurring Incident Chart */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-4">
            <h3 className="text-xs font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" /> Recurring Incident Analysis
            </h3>
            <div className="space-y-3">
              <div className="bg-black/40 p-3 rounded border border-white/5">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-gray-400">Sector 4 Logistics</span>
                  <span className="text-[10px] text-red-500 font-bold">High Recurrence</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-red-500 w-[85%]" />
                </div>
                <div className="text-[9px] text-gray-500 mt-1">Detected 5 times in 48h</div>
              </div>
              <div className="bg-black/40 p-3 rounded border border-white/5">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-gray-400">Radio Silence Patterns</span>
                  <span className="text-[10px] text-amber-500 font-bold">Moderate</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-amber-500 w-[60%]" />
                </div>
                <div className="text-[9px] text-gray-500 mt-1">Correlates with night ops</div>
              </div>
            </div>
          </div>

          {/* Tactical Recommendation Log */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-4 col-span-2">
            <h3 className="text-xs font-bold text-white uppercase mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-green-500" /> Tactical Recommendation Log
            </h3>
            <div className="space-y-2">
              <div className="flex gap-3 p-3 bg-black/40 rounded border border-white/5">
                <div className="text-[10px] font-mono text-gray-500 w-12 pt-0.5">14:05</div>
                <div>
                  <div className="text-xs font-bold text-white mb-1">Deploy Drone Surveillance to Sector X</div>
                  <div className="text-[10px] text-gray-400">Triggered by: High Reliability Logistics Report + SIGINT Spike</div>
                </div>
                <button className="ml-auto px-3 py-1 bg-green-600/20 text-green-500 text-[10px] font-bold rounded border border-green-600/30 hover:bg-green-600/30">
                  EXECUTE
                </button>
              </div>
              <div className="flex gap-3 p-3 bg-black/40 rounded border border-white/5">
                <div className="text-[10px] font-mono text-gray-500 w-12 pt-0.5">13:50</div>
                <div>
                  <div className="text-xs font-bold text-white mb-1">Increase HUMINT Asset Alert Level</div>
                  <div className="text-[10px] text-gray-400">Triggered by: Escalation Score {'>'} 75</div>
                </div>
                <button className="ml-auto px-3 py-1 bg-gray-700/20 text-gray-400 text-[10px] font-bold rounded border border-gray-700/30 cursor-not-allowed">
                  PENDING
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
