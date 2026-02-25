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
  Bar,
  Cell
} from 'recharts';
import { 
  AlertTriangle, 
  TrendingDown, 
  ArrowRight, 
  Zap, 
  ChevronUp, 
  ChevronDown,
  Factory,
  Anchor,
  Cpu,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';

const trendData = [
  { time: '08:00', sp500: 4200, nasdaq: 13000, asia: 3100 },
  { time: '10:00', sp500: 4180, nasdaq: 12950, asia: 3080 },
  { time: '12:00', sp500: 4150, nasdaq: 12800, asia: 3050 },
  { time: '14:00', sp500: 4160, nasdaq: 12850, asia: 3060 },
  { time: '16:00', sp500: 4120, nasdaq: 12700, asia: 3020 },
];

const sectorRiskData = [
  { name: 'Energy', risk: 85, color: '#ef4444' },
  { name: 'Defense Mfg', risk: 65, color: '#f97316' },
  { name: 'Logistics', risk: 75, color: '#eab308' },
  { name: 'Tech/Semi', risk: 45, color: '#3b82f6' },
  { name: 'Food Sec', risk: 60, color: '#eab308' },
];

const materialData = [
  { name: 'Titanium', status: 'STABLE', price: '+1.2%', supply: 'HIGH' },
  { name: 'Rare Earths', status: 'CRITICAL', price: '+15.4%', supply: 'LOW' },
  { name: 'Semiconductors', status: 'WARNING', price: '+4.5%', supply: 'MED' },
  { name: 'Steel (Mil-Spec)', status: 'STABLE', price: '-0.5%', supply: 'HIGH' },
];

const TimelineItem = ({ time, event, impact }: any) => (
  <div className="flex gap-3 mb-2 last:mb-0">
    <div className="text-[10px] font-mono text-gray-500 w-10 pt-0.5">{time}</div>
    <div className="flex-1">
      <div className="text-[10px] font-bold text-white">{event}</div>
      <div className="text-[9px] text-red-400">{impact}</div>
    </div>
  </div>
);

const MaterialRow = ({ name, status, price, supply }: any) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
    <div className="flex items-center gap-2">
      <div className={cn("w-1.5 h-1.5 rounded-full", 
        status === 'CRITICAL' ? 'bg-red-500' : 
        status === 'WARNING' ? 'bg-yellow-500' : 'bg-green-500'
      )} />
      <span className="text-xs text-gray-300">{name}</span>
    </div>
    <div className="flex gap-4 text-[10px] font-mono">
      <span className={cn(price.startsWith('+') ? 'text-red-400' : 'text-green-400')}>{price}</span>
      <span className="text-gray-500">{supply}</span>
    </div>
  </div>
);

export const FinintBottomPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "bg-[#0a0c10] border-t border-white/10 transition-all duration-500 ease-in-out flex flex-col relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]",
        isExpanded ? "h-[600px]" : "h-[240px]"
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
      <div className="h-[240px] flex shrink-0 border-b border-white/10">
        {/* 1. Trend Global Market */}
        <div className="w-1/4 p-4 border-r border-white/10 flex flex-col">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Global Market Trend</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Line type="monotone" dataKey="sp500" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="nasdaq" stroke="#8b5cf6" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="asia" stroke="#ef4444" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-3 mt-2 justify-center">
            <div className="flex items-center gap-1 text-[9px] text-gray-500"><div className="w-2 h-2 bg-blue-500 rounded-full"/>S&P 500</div>
            <div className="flex items-center gap-1 text-[9px] text-gray-500"><div className="w-2 h-2 bg-purple-500 rounded-full"/>Nasdaq</div>
            <div className="flex items-center gap-1 text-[9px] text-gray-500"><div className="w-2 h-2 bg-red-500 rounded-full"/>Asia</div>
          </div>
        </div>

        {/* 2. Shock Timeline */}
        <div className="w-1/4 p-4 border-r border-white/10 overflow-y-auto custom-scrollbar">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Shock Timeline</h3>
          <TimelineItem time="08:00" event="Brent Oil Surges +5%" impact="Energy sector volatility spike" />
          <TimelineItem time="10:30" event="USD/IDR Weakens to 15,900" impact="Import cost pressure alert" />
          <TimelineItem time="13:00" event="IHSG Drops -1.2%" impact="Foreign capital outflow detected" />
          <TimelineItem time="14:45" event="Bond Yields Spike +10bps" impact="Cost of funds increase" />
        </div>

        {/* 3. Financial Transmission Model */}
        <div className="w-1/4 p-4 border-r border-white/10">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Transmission Model</h3>
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <div className="bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded text-xs text-red-500 font-bold text-center w-3/4">
              Oil Price Shock (+12%)
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
            <div className="bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded text-xs text-orange-500 font-bold text-center w-3/4">
              Inflation Surge
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
            <div className="bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded text-xs text-yellow-500 font-bold text-center w-3/4">
              Social Pressure Risk
            </div>
          </div>
        </div>

        {/* 4. Tactical Impact Interpretation */}
        <div className="w-1/4 p-4 bg-red-950/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <AlertTriangle className="w-24 h-24 text-red-500" />
          </div>
          <h3 className="text-[10px] font-bold text-red-500 uppercase mb-3 flex items-center gap-2">
            <Zap className="w-3 h-3" /> Tactical Impact Interpretation
          </h3>
          <div className="text-sm text-gray-300 leading-relaxed font-medium">
            "Lonjakan harga minyak <span className="text-red-400 font-bold">12%</span> dalam 48 jam berpotensi meningkatkan biaya operasional udara sebesar <span className="text-red-400 font-bold">8–15%</span>. Jika berlanjut, risiko pengurangan sortie dalam 7 hari ke depan meningkat."
          </div>
          
          <div className="mt-4 pt-4 border-t border-red-500/20">
            <div className="text-[10px] text-gray-500 uppercase mb-1">Recommendation</div>
            <div className="text-xs text-white font-mono">
              &gt; REVIEW FUEL RESERVES<br/>
              &gt; ADJUST PATROL ROUTES<br/>
              &gt; MONITOR SOCIAL SENTIMENT
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050608] p-6">
        <div className="grid grid-cols-3 gap-6 h-full">
          
          {/* Sectoral Vulnerability */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col">
            <h3 className="text-xs font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Factory className="w-4 h-4 text-blue-500" /> Sectoral Vulnerability Matrix
            </h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorRiskData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                  />
                  <Bar dataKey="risk" radius={[0, 4, 4, 0]} barSize={20}>
                    {sectorRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[10px] text-gray-500 mt-2 text-center">
              Risk Score (0-100) based on Supply Chain, Cost, and Demand Volatility
            </div>
          </div>

          {/* Strategic Material Watch */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col">
            <h3 className="text-xs font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Anchor className="w-4 h-4 text-yellow-500" /> Strategic Material Watch
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <div className="space-y-1">
                {materialData.map((item, i) => (
                  <MaterialRow key={i} {...item} />
                ))}
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
              <div className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-red-500 uppercase">Supply Chain Alert</div>
                  <p className="text-[10px] text-gray-400 leading-tight mt-1">
                    Rare Earth export restrictions from Source Region A may impact guidance system production timelines by Q3.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Stability & Correlation */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col">
            <h3 className="text-xs font-bold text-white uppercase mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-500" /> Regional Correlation Analysis
            </h3>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-black/40 rounded p-3 border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase mb-2">ASEAN Correlation</div>
                <div className="text-2xl font-bold text-white font-mono">0.82</div>
                <div className="text-[10px] text-green-500 mt-1">High Synchronicity</div>
                <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[82%]" />
                </div>
              </div>
              <div className="bg-black/40 rounded p-3 border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase mb-2">US Market Beta</div>
                <div className="text-2xl font-bold text-white font-mono">0.45</div>
                <div className="text-[10px] text-yellow-500 mt-1">Diverging Trend</div>
                <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full w-[45%]" />
                </div>
              </div>
              <div className="col-span-2 bg-black/40 rounded p-3 border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase mb-2">Forex Heatmap</div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-1 bg-green-500/20 rounded text-[10px] text-green-400 font-bold">USD</div>
                  <div className="p-1 bg-red-500/20 rounded text-[10px] text-red-400 font-bold">EUR</div>
                  <div className="p-1 bg-yellow-500/20 rounded text-[10px] text-yellow-400 font-bold">JPY</div>
                  <div className="p-1 bg-red-500/20 rounded text-[10px] text-red-400 font-bold">IDR</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
