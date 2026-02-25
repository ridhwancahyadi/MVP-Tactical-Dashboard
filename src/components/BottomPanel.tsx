import { Activity, Wifi, Server, Database, AlertCircle, Film, FileText, Image, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard = ({ label, value, sub, trend }: any) => (
  <div className="bg-white/5 border border-white/5 p-3 rounded flex flex-col min-w-[100px]">
    <span className="text-[10px] text-gray-500 uppercase font-mono mb-1">{label}</span>
    <div className="flex items-end gap-2 mb-1">
      <span className="text-2xl font-display font-bold text-white leading-none">{value}</span>
      {trend && <span className="text-[10px] text-tactical-accent font-mono mb-0.5">{trend}</span>}
    </div>
    <span className="text-[10px] text-gray-400">{sub}</span>
  </div>
);

const CategoryBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="flex items-center gap-3 text-[10px] font-mono mb-2">
    <span className="w-16 text-gray-400">{label}</span>
    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
    <span className="w-6 text-right text-gray-300">{value}</span>
  </div>
);

const StatusIndicator = ({ label, status, value }: any) => (
  <div className="flex items-center justify-between py-1.5 border-b border-gray-800/50 last:border-0">
    <div className="flex items-center gap-2">
      <div className={cn("w-1.5 h-1.5 rounded-full", status === 'good' ? "bg-green-500" : status === 'warn' ? "bg-yellow-500" : "bg-red-500")} />
      <span className="text-[10px] text-gray-400 font-mono">{label}</span>
    </div>
    <span className="text-[10px] text-gray-500 font-mono">{value}</span>
  </div>
);

const BriefingItem = ({ title, type, location, time, severity, icons }: any) => (
  <div className="p-2 border-b border-gray-800/50 hover:bg-white/5 transition-colors group cursor-pointer">
    <div className="flex items-start justify-between mb-1">
      <div className="flex items-center gap-2">
        <div className={cn("w-1.5 h-1.5 rounded-full", severity === 'CRIT' ? "bg-red-500" : severity === 'HIGH' ? "bg-orange-500" : "bg-yellow-500")} />
        <span className="text-xs font-bold text-gray-200 group-hover:text-white line-clamp-1">{title}</span>
      </div>
      <span className={cn(
        "text-[9px] px-1 rounded border font-mono",
        severity === 'CRIT' ? "border-red-500 text-red-500" : 
        severity === 'HIGH' ? "border-orange-500 text-orange-500" : 
        "border-yellow-500 text-yellow-500"
      )}>{severity}</span>
    </div>
    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
      <span className={cn(
        "uppercase",
        type === 'CONFLICT' ? "text-red-400" :
        type === 'ECONOMIC' ? "text-blue-400" :
        type === 'NATURAL' ? "text-green-400" : "text-gray-400"
      )}>{type}</span>
      <span>{location}</span>
      {icons && (
        <div className="flex gap-1 ml-1">
          {icons.map((Icon: any, i: number) => <Icon key={i} className="w-3 h-3 text-gray-600" />)}
        </div>
      )}
      <span className="ml-auto">{time}</span>
    </div>
  </div>
);

export const BottomPanel = () => {
  return (
    <div className="h-full bg-tactical-card border-t border-tactical-border flex flex-col">
      {/* Live Feed Ticker - Full Width Top */}
      <div className="h-7 bg-black/40 flex items-center px-4 border-b border-tactical-border flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-tactical-accent animate-pulse mr-3" />
        <span className="text-[10px] font-bold text-tactical-accent uppercase tracking-widest mr-4 whitespace-nowrap">LIVE FEED</span>
        <div className="overflow-hidden relative flex-1">
           <div className="whitespace-nowrap animate-marquee text-[10px] font-mono text-gray-300 flex items-center">
             <span className="text-tactical-danger">[CONFLICT]</span><span className="ml-2">Philippines Coast Guard Standoff • Second Thomas Shoal 1h ago</span> <span className="mx-4 text-gray-700">◆</span> 
             <span className="text-tactical-info">[ECONOMIC]</span><span className="ml-2">Arctic Resource Rush — Norwegian Discovery • Svalbard 2h ago</span> <span className="mx-4 text-gray-700">◆</span>
             <span className="text-tactical-accent">[NATURAL]</span><span className="ml-2">Earthquake M6.2 — Hindu Kush Region • Hindu Kush 2h ago</span> <span className="mx-4 text-gray-700">◆</span>
             <span className="text-tactical-info">[TECH]</span><span className="ml-2">AI Deepfake Campaign Targeting Elections • Paris 2h ago</span>
           </div>
        </div>
      </div>

      {/* 4-Column Grid */}
      <div className="flex-1 grid grid-cols-4 divide-x divide-tactical-border min-h-0">
        
        {/* Col 1: Intelligence Summary */}
        <div className="p-4 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Intelligence Summary</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-6">
            <StatCard label="Events" value="40" sub="Total" trend="▲ +12" />
            <StatCard label="Alerts" value="26" sub="Active" trend="▲ +3" />
            <StatCard label="Zones" value="8" sub="Active" trend="-" />
          </div>

          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono block mb-3">Top Categories</span>
            <CategoryBar label="Conflict" value={65} color="#ef4444" />
            <CategoryBar label="Defense" value={45} color="#3b82f6" />
            <CategoryBar label="Economic" value={30} color="#3b82f6" />
            <CategoryBar label="Natural" value={20} color="#10b981" />
          </div>
        </div>

        {/* Col 2: Threat Matrix */}
        <div className="p-4 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 font-mono">Threat Matrix</h4>
          
          <div className="w-full text-left">
            <div className="flex text-[9px] font-mono text-gray-500 uppercase border-b border-gray-800 pb-2 mb-2">
              <div className="flex-1">Region</div>
              <div className="w-16 text-center">Level</div>
              <div className="w-8 text-center">Evt</div>
              <div className="w-8 text-center">Trd</div>
            </div>
            
            <div className="space-y-1">
              {[
                { region: 'Middle East', level: 'CRITICAL', val: 87, trend: '▲' },
                { region: 'Eastern Europe', level: 'HIGH', val: 64, trend: '▲' },
                { region: 'SE Asia', level: 'ELEVATED', val: 42, trend: '-' },
                { region: 'East Africa', level: 'MEDIUM', val: 28, trend: '▲' },
                { region: 'South America', level: 'LOW', val: 18, trend: '▼' },
                { region: 'Central Asia', level: 'LOW', val: 8, trend: '-' },
              ].map((row) => (
                <div key={row.region} className="flex items-center text-xs py-1.5 border-b border-gray-800/30 hover:bg-white/5 transition-colors">
                  <span className="flex-1 text-gray-300 font-mono">{row.region}</span>
                  <div className="w-16 flex justify-center">
                    <span className={cn(
                      "px-1.5 py-0.5 text-[9px] font-bold rounded w-full text-center border",
                      row.level === 'CRITICAL' ? "bg-red-500/10 text-red-500 border-red-500/30" :
                      row.level === 'HIGH' ? "bg-orange-500/10 text-orange-500 border-orange-500/30" :
                      row.level === 'ELEVATED' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" :
                      row.level === 'MEDIUM' ? "bg-yellow-600/10 text-yellow-600 border-yellow-600/30" :
                      "bg-green-500/10 text-green-500 border-green-500/30"
                    )}>{row.level}</span>
                  </div>
                  <span className="w-8 text-center font-mono text-gray-500">{row.val}</span>
                  <span className={cn("w-8 text-center font-mono", row.trend === '▲' ? "text-red-500" : row.trend === '▼' ? "text-green-500" : "text-gray-600")}>{row.trend}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: System Status */}
        <div className="p-4 flex flex-col min-h-0 overflow-y-auto custom-scrollbar relative">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 font-mono">System Status</h4>
          <div className="space-y-1 mb-auto">
            <StatusIndicator label="API Gateway" status="good" value="23ms" />
            <StatusIndicator label="WebSocket" status="good" value="Connected" />
            <StatusIndicator label="Intel Feed" status="good" value="<1s" />
            <StatusIndicator label="CCTV Service" status="warn" value="High Latency" />
            <StatusIndicator label="Drone Service" status="good" value="Active" />
            <StatusIndicator label="Anomaly Engine" status="good" value="Running" />
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between text-[9px] font-mono text-gray-600">
            <span>Layers: 4/20 active</span>
            <span>Memory: 128MB / 512MB</span>
          </div>
        </div>

        {/* Col 4: Micro-Briefing Queue */}
        <div className="p-0 flex flex-col min-h-0 bg-black/20">
          <div className="p-4 border-b border-tactical-border flex items-center justify-between bg-white/5">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase font-mono">Micro-Briefing Queue</h4>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-2 flex items-center gap-2 text-[10px] font-mono text-gray-500 border-b border-tactical-border">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>LIVE INTEL FEED</span>
              <span className="ml-auto">40</span>
            </div>

            <BriefingItem 
              title="Military Buildup Near Kherson Front"
              type="CONFLICT"
              location="Ukraine"
              time="33m ago"
              severity="CRIT"
              icons={[FileText, Image, Film]}
            />
            <BriefingItem 
              title="Philippines Coast Guard Standoff"
              type="CONFLICT"
              location="Philippines"
              time="1h ago"
              severity="HIGH"
            />
            <BriefingItem 
              title="Arctic Resource Rush — Norwegian Discovery"
              type="ECONOMIC"
              location="Norway"
              time="2h ago"
              severity="MEDI"
            />
            <BriefingItem 
              title="Earthquake M6.2 — Hindu Kush Region"
              type="NATURAL"
              location="Afghanistan"
              time="2h ago"
              severity="MEDI"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
