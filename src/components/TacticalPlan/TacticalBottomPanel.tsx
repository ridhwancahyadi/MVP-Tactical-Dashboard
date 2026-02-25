import { Truck, Plane, Ship, Shield, CheckCircle2, Sun, Moon, CloudRain, Wind, Thermometer, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TacticalCard = ({ title, value, status, icon: Icon, color }: any) => (
  <div className="bg-white/5 border border-white/5 p-3 rounded flex items-start justify-between hover:border-white/10 transition-colors group min-w-[140px]">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={cn("w-3.5 h-3.5", color)} />
        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-xl font-display font-bold text-white mb-0.5">{value}</div>
      <div className={cn("text-[9px] font-mono", status === 'Active' ? "text-green-500" : "text-yellow-500")}>
        {status}
      </div>
    </div>
  </div>
);

const destinationData = [
  { name: 'Jayapura', missions: 12 },
  { name: 'Ilaga', missions: 8 },
  { name: 'Ambon', missions: 5 },
  { name: 'Timika', missions: 4 },
  { name: 'Wamena', missions: 3 },
];

const strategyData = [
  { name: 'Routine', value: 45, color: '#3b82f6' }, // blue
  { name: 'Logistic Max', value: 25, color: '#eab308' }, // yellow
  { name: 'Emergency', value: 15, color: '#ef4444' }, // red
  { name: 'High-Risk', value: 10, color: '#f97316' }, // orange
  { name: 'Budget', value: 5, color: '#10b981' }, // green
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-gray-700 p-2 rounded text-xs">
        <p className="font-bold text-white mb-1">{label}</p>
        <p className="text-tactical-accent">{payload[0].value} Missions</p>
      </div>
    );
  }
  return null;
};

export const TacticalBottomPanel = () => {
  return (
    <div className="h-full bg-tactical-card border-t border-tactical-border flex flex-col p-4 relative">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-tactical-accent animate-pulse" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Mission Status Overview</h3>
         </div>
         <button 
            onClick={() => window.alert("Navigating to Detailed Logistics Dashboard...")}
            className="flex items-center gap-2 px-3 py-1.5 bg-tactical-accent/10 hover:bg-tactical-accent/20 border border-tactical-accent/50 rounded text-[10px] font-bold text-tactical-accent uppercase transition-all group"
         >
            <span>Detailed Logistics View</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
         </button>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden min-h-0">
        {/* Column 1: Mission Status Cards */}
        <div className="flex flex-col gap-2 w-[160px] flex-shrink-0">
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-1">
            <TacticalCard title="Air Missions" value="12" status="Active" icon={Plane} color="text-blue-400" />
            <TacticalCard title="Land Convoys" value="08" status="Delayed" icon={Truck} color="text-yellow-400" />
            <TacticalCard title="Naval Assets" value="04" status="Active" icon={Ship} color="text-cyan-400" />
            <TacticalCard title="Cyber Ops" value="21" status="Active" icon={Shield} color="text-purple-400" />
          </div>
        </div>

        {/* Column 2: Destination Analysis (Bar Chart) */}
        <div className="flex-1 min-w-[200px] bg-white/5 border border-white/5 rounded p-3 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Top Destinations</h3>
            <div className="text-[9px] text-gray-500">Last 30 Days</div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={destinationData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }} 
                  width={50}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                <Bar dataKey="missions" fill="#00ff9d" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Column 3: Strategy Distribution (Pie Chart) */}
        <div className="w-[220px] bg-white/5 border border-white/5 rounded p-3 flex flex-col">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-2">Strategy Profile</h3>
          <div className="flex-1 relative min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={strategyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {strategyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black/90 border border-gray-700 p-2 rounded text-xs">
                        <p className="font-bold text-white" style={{ color: payload[0].payload.color }}>
                          {payload[0].name}
                        </p>
                        <p className="text-gray-300">{payload[0].value}%</p>
                      </div>
                    );
                  }
                  return null;
                }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend Overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-x-3 gap-y-1">
              {strategyData.slice(0, 3).map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[9px] text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 4: Operational Context & Success Rate */}
        <div className="w-[200px] flex flex-col gap-2">
          {/* Success Rate Card */}
          <div className="bg-tactical-accent/5 border border-tactical-accent/20 p-3 rounded flex flex-col justify-center h-[80px]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-tactical-accent uppercase">Success Rate</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-tactical-accent" />
            </div>
            <div className="text-2xl font-display font-bold text-white mb-1">94.2%</div>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-tactical-accent w-[94.2%]" />
            </div>
          </div>

          {/* Operational Conditions */}
          <div className="flex-1 bg-white/5 border border-white/5 rounded p-3 flex flex-col justify-between">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-2">Ops Conditions</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-[10px] text-gray-300">Day Ops</span>
                </div>
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[65%]" />
                </div>
                <span className="text-[9px] text-gray-500 w-6 text-right">65%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] text-gray-300">Night Ops</span>
                </div>
                <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[35%]" />
                </div>
                <span className="text-[9px] text-gray-500 w-6 text-right">35%</span>
              </div>

              <div className="pt-2 border-t border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-1.5" title="Weather Risk">
                  <CloudRain className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] text-gray-400">Rain</span>
                </div>
                <div className="flex items-center gap-1.5" title="Wind Risk">
                  <Wind className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] text-gray-400">12kt</span>
                </div>
                <div className="flex items-center gap-1.5" title="Temperature">
                  <Thermometer className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] text-gray-400">32°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
