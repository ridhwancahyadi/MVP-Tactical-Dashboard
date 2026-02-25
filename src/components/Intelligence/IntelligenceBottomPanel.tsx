import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { Activity, PieChart as PieChartIcon, BarChart3, List, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const trendData = [
  { time: '00:00', osint: 40, humint: 24, sigint: 24, cyber: 10 },
  { time: '04:00', osint: 30, humint: 13, sigint: 22, cyber: 15 },
  { time: '08:00', osint: 20, humint: 58, sigint: 22, cyber: 30 },
  { time: '12:00', osint: 27, humint: 39, sigint: 20, cyber: 45 },
  { time: '16:00', osint: 18, humint: 48, sigint: 21, cyber: 50 },
  { time: '20:00', osint: 23, humint: 38, sigint: 25, cyber: 60 },
  { time: '24:00', osint: 34, humint: 43, sigint: 21, cyber: 70 },
];

const contributionData = [
  { name: 'OSINT', value: 32, color: '#3b82f6' },
  { name: 'HUMINT', value: 18, color: '#22c55e' },
  { name: 'SIGINT', value: 24, color: '#eab308' },
  { name: 'CYBINT', value: 16, color: '#a855f7' },
  { name: 'FININT', value: 10, color: '#10b981' },
];

const convergenceData = [
  { name: 'Multi-Source', value: 45 },
  { name: 'Isolated', value: 25 },
  { name: 'Conflicting', value: 12 },
  { name: 'Emerging', value: 18 },
];

const feedData = [
  { id: 1, type: 'OSINT', content: 'Social media spike detected in Sector 7 regarding protest organization.', time: '10m ago', color: 'text-blue-400', border: 'border-blue-500/30' },
  { id: 2, type: 'SIGINT', content: 'High-frequency burst transmission intercepted near border region.', time: '24m ago', color: 'text-yellow-400', border: 'border-yellow-500/30' },
  { id: 3, type: 'HUMINT', content: 'Source verified movement of unmarked vehicles in urban center.', time: '1h ago', color: 'text-green-400', border: 'border-green-500/30' },
  { id: 4, type: 'CYBINT', content: 'DDoS signature matched known threat actor group "RedShadow".', time: '1h 30m ago', color: 'text-purple-400', border: 'border-purple-500/30' },
  { id: 5, type: 'OSINT', content: 'News outlets reporting infrastructure outage in neighboring province.', time: '2h ago', color: 'text-blue-400', border: 'border-blue-500/30' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-gray-700 p-2 rounded text-xs">
        <p className="font-bold text-white mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const IntelligenceBottomPanel = () => {
  const [feedFilter, setFeedFilter] = useState('ALL');

  const filteredFeed = feedFilter === 'ALL' 
    ? feedData 
    : feedData.filter(item => item.type === feedFilter);

  return (
    <div className="h-full bg-tactical-card border-t border-tactical-border p-4 flex gap-4 overflow-hidden">
      
      {/* A. Domain Signal Trend */}
      <div className="flex-1 bg-white/5 border border-white/5 rounded p-3 flex flex-col min-w-[250px]">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
          <Activity className="w-3 h-3" /> Domain Signal Trend
        </h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="osint" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="humint" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sigint" stroke="#eab308" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="cyber" stroke="#a855f7" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* B. Domain Contribution */}
      <div className="w-[200px] bg-white/5 border border-white/5 rounded p-3 flex flex-col">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
          <PieChartIcon className="w-3 h-3" /> Contribution
        </h3>
        <div className="flex-1 min-h-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contributionData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {contributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-x-2 gap-y-1">
            {contributionData.slice(0, 3).map(item => (
              <div key={item.name} className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[8px] text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C. Convergence Strength */}
      <div className="w-[200px] bg-white/5 border border-white/5 rounded p-3 flex flex-col">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-2">
          <BarChart3 className="w-3 h-3" /> Convergence
        </h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={convergenceData} layout="vertical" margin={{ left: 0, right: 10 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={70} tick={{ fill: '#999', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="value" fill="#00ff9d" radius={[0, 4, 4, 0]} barSize={15}>
                {convergenceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    entry.name === 'Multi-Source' ? '#10b981' :
                    entry.name === 'Conflicting' ? '#ef4444' :
                    entry.name === 'Isolated' ? '#eab308' : '#3b82f6'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* D. Intelligence Feed (Replaces Confidence Trend) */}
      <div className="flex-1 bg-white/5 border border-white/5 rounded p-3 flex flex-col min-w-[250px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono flex items-center gap-2">
            <List className="w-3 h-3" /> Live Intel Feed
          </h3>
          <div className="flex gap-1">
            {['ALL', 'OSINT', 'HUMINT', 'SIGINT'].map(filter => (
              <button 
                key={filter}
                onClick={() => setFeedFilter(filter)}
                className={cn(
                  "text-[8px] px-1.5 py-0.5 rounded border transition-colors",
                  feedFilter === filter 
                    ? "bg-tactical-accent/20 text-tactical-accent border-tactical-accent/30" 
                    : "text-gray-500 border-transparent hover:text-gray-300"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
          {filteredFeed.map(item => (
            <div key={item.id} className={cn("p-2 rounded bg-black/20 border-l-2", item.border)}>
              <div className="flex items-center justify-between mb-1">
                <span className={cn("text-[9px] font-bold", item.color)}>{item.type}</span>
                <span className="text-[9px] text-gray-600 font-mono">{item.time}</span>
              </div>
              <p className="text-[10px] text-gray-300 leading-tight">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
