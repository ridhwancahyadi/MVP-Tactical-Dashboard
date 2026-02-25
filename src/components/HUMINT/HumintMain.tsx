import React from 'react';
import { 
  MapPin, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HumintGlobe } from './HumintGlobe';
import { HumintLayer } from './HumintSidebar';

interface HumintMainProps {
  activeLayer: HumintLayer;
  onLayerChange: (layer: HumintLayer) => void;
  onSelectReport: (report: any) => void;
  selectedReportId: string | null;
}

const KPICard = ({ label, value, sub, color, icon: Icon }: any) => (
  <div className="bg-[#0a0c10] border border-white/10 p-3 rounded-lg flex flex-col relative overflow-hidden group hover:border-white/20 transition-all">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{label}</span>
      {Icon && <Icon className={cn("w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity", color)} />}
    </div>
    <span className={cn("text-2xl font-bold font-mono leading-none mb-1", color)}>{value}</span>
    <span className="text-[9px] text-gray-400">{sub}</span>
    <div className={cn("absolute bottom-0 left-0 h-0.5 w-full opacity-50", color.replace('text-', 'bg-'))} />
  </div>
);

const ReportItem = ({ id, time, title, reliability, intent, onClick, active }: any) => (
  <div 
    onClick={onClick}
    className={cn(
      "p-3 border-b border-white/5 cursor-pointer transition-colors group",
      active ? "bg-white/10 border-l-2 border-l-amber-500" : "hover:bg-white/5 border-l-2 border-l-transparent"
    )}
  >
    <div className="flex justify-between items-start mb-1">
      <span className="text-[10px] font-mono text-gray-500">{time}</span>
      <span className={cn(
        "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase",
        reliability === 'HIGH' ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
      )}>{reliability} RELIABILITY</span>
    </div>
    <h4 className="text-xs font-bold text-gray-200 group-hover:text-white mb-1">{title}</h4>
    <div className="flex items-center gap-2">
      <span className="text-[9px] text-amber-500 border border-amber-500/30 px-1 rounded">{intent}</span>
      <span className="text-[9px] text-gray-600">ID: {id}</span>
    </div>
  </div>
);

const reports = [
  { 
    id: "RPT-092", 
    time: "14:02", 
    title: "Suspicious Logistics Movement", 
    reliability: "HIGH", 
    intent: "LOGISTICS",
    agentId: "ECHO-7",
    location: "Sector 4 Supply Route",
    reliabilityGrade: "B",
    reliabilityText: "Usually Reliable",
    accuracyGrade: "2",
    accuracyText: "Probable",
    narrative: "Observed convoy of 3 unmarked trucks moving heavy crates into warehouse district. Security detail appears higher than standard civilian transport.",
    attachments: [
      { type: 'image', name: 'convoy_cam_04.jpg' }
    ]
  },
  { 
    id: "RPT-091", 
    time: "13:45", 
    title: "Gathering at Town Square", 
    reliability: "MED", 
    intent: "PROTEST",
    agentId: "BRAVO-2",
    location: "Central Plaza",
    reliabilityGrade: "C",
    reliabilityText: "Fairly Reliable",
    accuracyGrade: "3",
    accuracyText: "Possible",
    narrative: "Crowd size increasing. Approximately 200 individuals gathering. Banners visible but slogans unclear. No weapons sighted yet.",
    attachments: []
  },
  { 
    id: "RPT-090", 
    time: "13:12", 
    title: "Unidentified Armed Group", 
    reliability: "HIGH", 
    intent: "ARMED",
    agentId: "SIERRA-1",
    location: "North Ridge Outpost",
    reliabilityGrade: "A",
    reliabilityText: "Completely Reliable",
    accuracyGrade: "1",
    accuracyText: "Confirmed",
    narrative: "Visual confirmation of 5 armed individuals in camouflage gear moving through the treeline. Weapons appear to be assault rifles. Moving towards the comms tower.",
    attachments: [
      { type: 'image', name: 'long_range_02.jpg' },
      { type: 'audio', name: 'radio_intercept.wav' }
    ]
  },
  { 
    id: "RPT-089", 
    time: "12:50", 
    title: "Radio Silence Observed", 
    reliability: "LOW", 
    intent: "RECON",
    agentId: "LISTENER-9",
    location: "Frequency 142.500",
    reliabilityGrade: "B",
    reliabilityText: "Usually Reliable",
    accuracyGrade: "2",
    accuracyText: "Probable",
    narrative: "Sudden drop in chatter on known insurgent frequencies. Pattern matches pre-operation silence protocols observed last month.",
    attachments: [
      { type: 'audio', name: 'spectrum_analysis.dat' }
    ]
  },
  { 
    id: "RPT-088", 
    time: "12:15", 
    title: "Anomaly at Cargo Runway", 
    reliability: "HIGH", 
    intent: "SABOTAGE",
    agentId: "123",
    location: "Bandara Boga, Puncak",
    reliabilityGrade: "A",
    reliabilityText: "Completely Reliable",
    accuracyGrade: "1",
    accuracyText: "Confirmed",
    narrative: "A suspicious anomaly was observed from the hillside near the cargo runway final approach. The aircraft landed safely. No casualties were reported. A suspicious object was detected at the end of the runway.",
    attachments: [
      { type: 'image', name: 'runway_anomaly.jpg' }
    ]
  },
];

export const HumintMain = ({ activeLayer, onLayerChange, onSelectReport, selectedReportId }: HumintMainProps) => {
  return (
    <div className="flex-1 flex flex-col bg-[#050608] relative overflow-hidden">
      {/* Top KPI Section */}
      <div className="p-4 grid grid-cols-4 gap-4 z-10 relative">
        <KPICard 
          label="Total Reports" 
          value="142" 
          sub="+12 Today" 
          color="text-white" 
          icon={FileText} 
        />
        <KPICard 
          label="Critical Alerts" 
          value="5" 
          sub="Immediate Action" 
          color="text-red-500" 
          icon={AlertTriangle} 
        />
        <KPICard 
          label="Active Agents" 
          value="24" 
          sub="85% Coverage" 
          color="text-green-500" 
          icon={Users} 
        />
        <KPICard 
          label="Escalation Risk" 
          value="HIGH" 
          sub="Trend: Rising" 
          color="text-amber-500" 
          icon={TrendingUp} 
        />
      </div>

      {/* Main Content Split: Map & Feed */}
      <div className="flex-1 flex min-h-0 px-4 pb-4 gap-4">
        
        {/* Globe View */}
        <div className="flex-1 rounded-lg border border-white/10 relative overflow-hidden bg-[#0a0c10]">
          <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur px-2 py-1 rounded border border-white/10 text-[10px] text-gray-400 font-bold uppercase">
            Geo-HUMINT Intelligence Globe
          </div>
          <HumintGlobe activeLayer={activeLayer} onLayerChange={onLayerChange} />
        </div>

        {/* Report Feed */}
        <div className="w-[320px] bg-[#0a0c10] rounded-lg border border-white/10 flex flex-col">
          <div className="p-3 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase">Incoming Reports</h3>
            <span className="text-[9px] text-green-500 animate-pulse">LIVE FEED</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {reports.map(report => (
              <ReportItem 
                key={report.id}
                {...report}
                active={selectedReportId === report.id}
                onClick={() => onSelectReport(report)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
