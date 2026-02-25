import React from 'react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

const data = Array.from({ length: 60 }).map((_, i) => ({
  time: i,
  web: Math.floor(Math.random() * 50) + 20,
  ddos: Math.floor(Math.random() * 40) + 10,
  intruders: Math.floor(Math.random() * 30) + 5,
  scanners: Math.floor(Math.random() * 20) + 5,
  anonymizers: Math.floor(Math.random() * 10) + 2,
}));

export const CybintTimeline = () => {
  return (
    <div className="h-[160px] bg-[#0a0c10]/90 border-t border-white/10 backdrop-blur-sm p-2 relative z-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="flex justify-between items-center px-4 mb-1">
        <div className="flex gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-red-500">WEB ATTACKERS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-yellow-500">DDOS ATTACKERS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-blue-500">INTRUDERS</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-500 font-mono">
          LIVE TRAFFIC MONITOR
        </div>
      </div>

      <div className="h-[120px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorWeb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDdos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorIntruders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
              itemStyle={{ fontSize: '10px' }}
              labelStyle={{ display: 'none' }}
            />
            <Area type="monotone" dataKey="web" stackId="1" stroke="#ef4444" fill="url(#colorWeb)" strokeWidth={1} />
            <Area type="monotone" dataKey="ddos" stackId="1" stroke="#eab308" fill="url(#colorDdos)" strokeWidth={1} />
            <Area type="monotone" dataKey="intruders" stackId="1" stroke="#3b82f6" fill="url(#colorIntruders)" strokeWidth={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
