import { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Globe, 
  MapPin, 
  ChevronDown, 
  BrainCircuit,
  Target,
  Radio,
  Users,
  Zap,
  Wifi,
  Plane,
  Ship,
  Lock,
  FileText,
  AlertOctagon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// Mock Data for different regions
const REGION_DATA: any = {
  'Global': {
    threatLevel: 'ELEVATED',
    trend: 'stable',
    score: 65,
    events: { total: 142, critical: 12, high: 28 },
    confidence: 88,
    composition: [
      { name: 'Conflict', value: 45, color: '#ef4444' },
      { name: 'Cyber', value: 30, color: '#8b5cf6' },
      { name: 'Civil', value: 15, color: '#f59e0b' },
      { name: 'Disaster', value: 10, color: '#10b981' },
    ],
    escalation: 42,
    assets_risk: 15,
    fleet_readiness: 92,
    conditionSummary: [
      "Global threat indicators remain elevated due to persistent regional conflicts.",
      "Cyber activity targeting critical infrastructure has increased by 15%.",
      "Supply chain disruptions in SE Asia are affecting logistics readiness."
    ],
    humintReports: [
      { source: "Field Agent 44", location: "Kyiv", time: "2h ago", content: "Troop movements detected near northern border.", reliability: "A1" },
      { source: "Asset 9", location: "Tehran", time: "5h ago", content: "Unusual signals traffic observed from command centers.", reliability: "B2" },
    ]
  },
  'Asia Pacific': {
    threatLevel: 'HIGH',
    trend: 'rising',
    score: 78,
    events: { total: 45, critical: 8, high: 15 },
    confidence: 92,
    composition: [
      { name: 'Conflict', value: 60, color: '#ef4444' },
      { name: 'Cyber', value: 20, color: '#8b5cf6' },
      { name: 'Civil', value: 15, color: '#f59e0b' },
      { name: 'Disaster', value: 5, color: '#10b981' },
    ],
    escalation: 75,
    assets_risk: 8,
    fleet_readiness: 88,
    conditionSummary: [
      "Naval posturing in South China Sea has intensified.",
      "Cyber defense readiness elevated for regional command nodes.",
      "Civil unrest in coastal cities monitoring required."
    ],
    humintReports: [
      { source: "Station Manila", location: "SCS", time: "1h ago", content: "Unidentified naval vessel tracking commercial lanes.", reliability: "A2" },
      { source: "Source Red", location: "Taipei", time: "3h ago", content: "Electronic interference reported on civilian bands.", reliability: "C1" },
    ]
  },
  'Indonesia': {
    threatLevel: 'CRITICAL',
    trend: 'rising',
    score: 85,
    events: { total: 18, critical: 5, high: 8 },
    confidence: 95,
    composition: [
      { name: 'Conflict', value: 30, color: '#ef4444' },
      { name: 'Cyber', value: 40, color: '#8b5cf6' },
      { name: 'Civil', value: 20, color: '#f59e0b' },
      { name: 'Disaster', value: 10, color: '#10b981' },
    ],
    escalation: 82,
    assets_risk: 4,
    fleet_readiness: 94,
    conditionSummary: [
      "Immediate deployment of rapid response units to Sector 4 required.",
      "Jamming protocols initiated in affected zones due to signal anomalies.",
      "Civil unrest in urban centers showing signs of coordination."
    ],
    humintReports: [
      { source: "Papua Ops", location: "Jayapura", time: "30m ago", content: "Ground movement observed in highland sectors.", reliability: "A1" },
      { source: "Jakarta Cell", location: "Gambir", time: "1h ago", content: "Cyber chatter indicates planned disruption of transport.", reliability: "B1" },
      { source: "Maritime Unit", location: "Natuna", time: "4h ago", content: "Fishing fleet reporting harassment by foreign vessels.", reliability: "A2" },
    ]
  }
};

const MetricCard = ({ label, value, sub, color = "text-white" }: any) => (
  <div className="bg-white/5 border border-white/5 p-2 rounded flex flex-col items-center justify-center text-center">
    <span className="text-[9px] text-gray-500 uppercase font-mono mb-1">{label}</span>
    <span className={cn("text-lg font-display font-bold leading-none", color)}>{value}</span>
    {sub && <span className="text-[9px] text-gray-400 mt-1">{sub}</span>}
  </div>
);

const ProgressBar = ({ label, value, color }: any) => (
  <div className="mb-2">
    <div className="flex justify-between text-[9px] mb-1 font-mono">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}%</span>
    </div>
    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  </div>
);

export const RightPanel = ({ selectedEvent }: { selectedEvent: any }) => {
  const [selectedRegion, setSelectedRegion] = useState('Indonesia');
  const [timeFilter, setTimeFilter] = useState('24H');
  
  const data = REGION_DATA[selectedRegion];

  return (
    <div className="h-full bg-tactical-card/90 border-l border-tactical-border flex flex-col backdrop-blur-md overflow-hidden">
      
      {/* Region Context Header */}
      <div className="p-4 border-b border-tactical-border bg-black/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-tactical-accent" />
            <span className="text-[10px] font-bold text-tactical-accent uppercase tracking-widest">SITUATION AWARENESS</span>
          </div>
          <div className="flex gap-1 bg-white/5 p-0.5 rounded">
            {['RT', '24H', '7D'].map((t) => (
              <button 
                key={t}
                onClick={() => setTimeFilter(t)}
                className={cn(
                  "px-2 py-0.5 text-[9px] font-bold rounded transition-colors",
                  timeFilter === t ? "bg-tactical-accent text-black" : "text-gray-500 hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <button className="w-full flex items-center justify-between bg-white/5 border border-white/10 px-3 py-2 rounded hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400 group-hover:text-white" />
              <div className="text-left">
                <div className="text-[10px] text-gray-500 uppercase font-mono">Selected Region</div>
                <div className="text-sm font-bold text-white">{selectedRegion}</div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          
          {/* Simple Dropdown for Demo */}
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#0f1115] border border-tactical-border rounded shadow-xl z-50 hidden group-focus-within:block">
            {Object.keys(REGION_DATA).map(region => (
              <button 
                key={region}
                onClick={() => setSelectedRegion(region)}
                className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:bg-white/5 hover:text-white"
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              "px-2 py-0.5 rounded text-[10px] font-bold border",
              data.threatLevel === 'CRITICAL' ? "bg-red-500/20 text-red-500 border-red-500/30" :
              data.threatLevel === 'HIGH' ? "bg-orange-500/20 text-orange-500 border-orange-500/30" :
              "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
            )}>
              {data.threatLevel} THREAT
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
            {data.trend === 'rising' ? <TrendingUp className="w-3 h-3 text-red-500" /> : 
             data.trend === 'declining' ? <TrendingDown className="w-3 h-3 text-green-500" /> :
             <Minus className="w-3 h-3 text-yellow-500" />}
            <span className="uppercase">{data.trend} Trend</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        
        {/* Condition Summary */}
        <section className="bg-white/5 border border-white/5 rounded p-3">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
            <FileText className="w-3 h-3" /> Condition Summary
          </h3>
          <ul className="space-y-2">
            {data.conditionSummary.map((point: string, index: number) => (
              <li key={index} className="flex gap-2 text-[10px] text-gray-300 leading-relaxed">
                <span className="text-tactical-accent mt-0.5">›</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Situational Awareness Summary */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
            <Activity className="w-3 h-3" /> Summary Metrics
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <MetricCard label="Active Events" value={data.events.total} sub={`${data.events.critical} Critical`} />
            <MetricCard label="Escalation Prob" value={`${data.escalation}%`} color={data.escalation > 70 ? "text-red-500" : "text-yellow-500"} />
            <MetricCard label="Intel Conf." value={`${data.confidence}%`} color="text-tactical-accent" />
          </div>
        </section>

        {/* Event Composition Breakdown */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
            <AlertOctagon className="w-3 h-3" /> Event Composition
          </h3>
          <div className="flex items-center gap-4 h-32">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.composition}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.composition.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-32 space-y-1">
              {data.composition.map((item: any) => (
                <div key={item.name} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-mono text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Exposure */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
            <Target className="w-3 h-3" /> Operational Exposure
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] text-gray-400">Assets at Risk</span>
              </div>
              <span className="text-xs font-bold text-white">{data.assets_risk}</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ship className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] text-gray-400">Fleet Ready</span>
              </div>
              <span className="text-xs font-bold text-white">{data.fleet_readiness}%</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="w-3 h-3 text-yellow-400" />
                <span className="text-[10px] text-gray-400">Air Conflict</span>
              </div>
              <span className="text-xs font-bold text-red-500">DETECTED</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3 text-purple-400" />
                <span className="text-[10px] text-gray-400">Jamming</span>
              </div>
              <span className="text-xs font-bold text-green-500">NONE</span>
            </div>
          </div>
        </section>

        {/* HUMINT Reports */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
            <Users className="w-3 h-3" /> HUMINT Reports
          </h3>
          <div className="space-y-2">
            {data.humintReports.map((report: any, index: number) => (
              <div key={index} className="bg-white/5 border border-white/5 rounded p-2 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-tactical-accent">{report.source}</span>
                    <span className="text-[9px] text-gray-500 font-mono">| {report.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-500 font-mono">{report.time}</span>
                    <span className={cn(
                      "text-[9px] font-bold px-1 rounded",
                      report.reliability.startsWith('A') ? "bg-green-500/20 text-green-500" :
                      report.reliability.startsWith('B') ? "bg-blue-500/20 text-blue-500" :
                      "bg-yellow-500/20 text-yellow-500"
                    )}>{report.reliability}</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-300 leading-relaxed">
                  {report.content}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
