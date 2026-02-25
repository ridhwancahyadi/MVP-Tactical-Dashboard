import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Car, Plane, Ship, AlertTriangle, CheckCircle2, Clock, Fuel } from 'lucide-react';
import { cn } from '@/lib/utils';

const KPICard = ({ title, value, icon: Icon, color, sub }: any) => (
  <div className="bg-[#1a1d24] p-4 rounded-xl border border-white/5 flex flex-col justify-between h-[100px]">
    <div className="flex justify-between items-start">
      <span className="text-gray-400 text-xs font-medium">{title}</span>
      <Icon className={cn("w-5 h-5", color)} />
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-[10px] text-gray-500 mt-1">{sub}</div>}
    </div>
  </div>
);

const violationData = [
  { name: 'Speeding', value: 12403 },
  { name: 'Route Dev', value: 8500 },
  { name: 'Unauthorized', value: 6200 },
  { name: 'Idle Time', value: 4100 },
  { name: 'Maint. Due', value: 2300 },
];

const efficiencyData = [
  { time: '00:00', land: 80, air: 60, sea: 70 },
  { time: '04:00', land: 75, air: 65, sea: 72 },
  { time: '08:00', land: 85, air: 80, sea: 75 },
  { time: '12:00', land: 90, air: 85, sea: 80 },
  { time: '16:00', land: 88, air: 82, sea: 78 },
  { time: '20:00', land: 82, air: 70, sea: 75 },
  { time: '24:00', land: 78, air: 65, sea: 72 },
];

const topAssets = [
  { id: 'LND-01', name: 'Tactical Rover Alpha', type: 'Land', violations: 23, status: 'Active' },
  { id: 'AIR-04', name: 'Drone Recon X', type: 'Air', violations: 12, status: 'Active' },
  { id: 'SEA-02', name: 'Patrol Boat Bravo', type: 'Sea', violations: 8, status: 'Maintenance' },
  { id: 'LND-05', name: 'Supply Truck 05', type: 'Land', violations: 5, status: 'Active' },
];

export const OperationsAnalytics = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-[#0a0c10]">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard title="Total Fleet" value="329" icon={Car} color="text-blue-400" sub="Across all domains" />
        <KPICard title="Active Assets" value="123" icon={CheckCircle2} color="text-green-400" sub="Currently deployed" />
        <KPICard title="In Transit" value="44" icon={Plane} color="text-yellow-400" sub="Moving to target" />
        <KPICard title="Maintenance" value="16" icon={AlertTriangle} color="text-red-400" sub="Requires attention" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-6 h-[300px]">
        {/* Top Violations */}
        <div className="bg-[#1a1d24] p-4 rounded-xl border border-white/5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white">Alert Summary by Type</h3>
            <button className="text-xs text-gray-500 hover:text-white">Export</button>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="space-y-3">
              {violationData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-xs font-mono text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Efficiency Trend */}
        <div className="col-span-2 bg-[#1a1d24] p-4 rounded-xl border border-white/5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white">Fleet Efficiency Trends</h3>
            <div className="flex gap-2">
              <span className="text-xs text-blue-400">Land</span>
              <span className="text-xs text-green-400">Air</span>
              <span className="text-xs text-yellow-400">Sea</span>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="land" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="air" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sea" stroke="#eab308" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6 h-[300px]">
        {/* Top Assets List */}
        <div className="bg-[#1a1d24] p-4 rounded-xl border border-white/5 flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4">Asset Status Watchlist</h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-white/10">
                  <th className="pb-2 font-medium">Asset</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Alerts</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {topAssets.map((asset, i) => (
                  <tr key={i} className="text-xs border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center">
                          {asset.type === 'Land' && <Car className="w-3 h-3 text-blue-400" />}
                          {asset.type === 'Air' && <Plane className="w-3 h-3 text-green-400" />}
                          {asset.type === 'Sea' && <Ship className="w-3 h-3 text-yellow-400" />}
                        </div>
                        <span className="text-white font-medium">{asset.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-400">{asset.type}</td>
                    <td className="py-3 text-white font-mono">{asset.violations}</td>
                    <td className="py-3">
                      <span className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold uppercase",
                        asset.status === 'Active' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Readiness */}
        <div className="bg-[#1a1d24] p-4 rounded-xl border border-white/5 flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4">Operational Readiness</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={efficiencyData}>
                <defs>
                  <linearGradient id="colorLand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                <Area type="monotone" dataKey="land" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLand)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
