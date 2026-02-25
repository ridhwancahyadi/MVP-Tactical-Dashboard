import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import { Radio, Zap, Activity } from 'lucide-react';

const signalTrendData = [
  { time: '00:00', volume: 20 },
  { time: '04:00', volume: 15 },
  { time: '08:00', volume: 45 },
  { time: '12:00', volume: 80 },
  { time: '14:00', volume: 150 }, // Surge
  { time: '16:00', volume: 90 },
  { time: '20:00', volume: 50 },
  { time: '23:59', volume: 30 },
];

const burstFreqData = [
  { freq: 'HF', count: 12 },
  { freq: 'VHF', count: 45 },
  { freq: 'UHF', count: 80 },
  { freq: 'SAT', count: 25 },
  { freq: 'CELL', count: 120 },
];

const channelLoadData = [
  { channel: 'CH1', load: 45 },
  { channel: 'CH2', load: 60 },
  { channel: 'CH3', load: 95 }, // Overload
  { channel: 'CH4', load: 30 },
  { channel: 'CH5', load: 50 },
];

export const SigintBottomPanel = () => {
  return (
    <div className="h-[200px] bg-[#0a0c10] border-t border-white/10 flex">
      {/* 1. Signal Trend Timeline */}
      <div className="w-1/3 p-4 border-r border-white/10 flex flex-col">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
          <Activity className="w-3 h-3" /> Signal Activity Trend (24h)
        </h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={signalTrendData}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Area type="monotone" dataKey="volume" stroke="#10b981" fillOpacity={1} fill="url(#colorVolume)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Burst Frequency Chart */}
      <div className="w-1/3 p-4 border-r border-white/10 flex flex-col">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
          <Radio className="w-3 h-3" /> Burst Frequency Distribution
        </h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={burstFreqData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="freq" tick={{ fill: '#666', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Channel Load Chart */}
      <div className="w-1/3 p-4 flex flex-col">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
          <Zap className="w-3 h-3" /> Channel Load Analysis
        </h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelLoadData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis dataKey="channel" type="category" width={30} tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
              />
              <Bar dataKey="load" radius={[0, 4, 4, 0]} barSize={15}>
                {channelLoadData.map((entry, index) => (
                  <cell key={`cell-${index}`} fill={entry.load > 80 ? '#ef4444' : '#eab308'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
