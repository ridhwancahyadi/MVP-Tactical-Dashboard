import React from 'react';
import { 
  Newspaper, 
  MessageCircle, 
  TrendingUp, 
  AlertTriangle, 
  Share2, 
  BarChart2,
  Globe,
  Zap,
  Bot,
  Scan,
  Eye,
  Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OsintMode } from './OsintSidebar';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

interface OsintRightPanelProps {
  selectedItem: any;
  activeMode: OsintMode;
}

const DetailSection = ({ title, children, className }: any) => (
  <div className={cn("mb-6", className)}>
    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">{title}</h3>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const MetricBadge = ({ label, value, color, icon: Icon }: any) => (
  <div className="bg-white/5 p-2 rounded border border-white/10 flex flex-col items-center justify-center text-center">
    {Icon && <Icon className={cn("w-4 h-4 mb-1", color)} />}
    <div className={cn("text-lg font-bold font-mono leading-none mb-1", color)}>{value}</div>
    <div className="text-[9px] text-gray-500 uppercase leading-tight">{label}</div>
  </div>
);

const SentimentBar = ({ positive, neutral, negative }: any) => (
  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex">
    <div style={{ width: `${positive}%` }} className="bg-green-500 h-full" />
    <div style={{ width: `${neutral}%` }} className="bg-gray-500 h-full" />
    <div style={{ width: `${negative}%` }} className="bg-red-500 h-full" />
  </div>
);

const framingData = [
  { subject: 'Apresiasi', A: 40, fullMark: 100 },
  { subject: 'Mobilisasi', A: 90, fullMark: 100 },
  { subject: 'Agitasi', A: 85, fullMark: 100 },
  { subject: 'Delegitimasi', A: 60, fullMark: 100 },
  { subject: 'Expressive', A: 50, fullMark: 100 },
];

export const OsintRightPanel = ({ selectedItem, activeMode }: OsintRightPanelProps) => {
  if (!selectedItem) {
    return (
      <div className="w-[350px] bg-[#0a0c10] border-l border-white/10 flex flex-col h-full items-center justify-center text-gray-500">
        <Globe className="w-12 h-12 mb-4 opacity-20" />
        <div className="text-xs uppercase font-bold">Select an item</div>
        <div className="text-[10px]">to view analysis</div>
      </div>
    );
  }

  // Mock Analysis Data based on mode
  const analysis = activeMode === 'live-news' ? {
    amplification: "High",
    spreadIndex: "8.5/10",
    sentiment: "Negative",
    escalationRisk: "Critical",
    narrative: "Core narrative suggests government negligence in recent supply shortages.",
    crossDomain: ["SIGINT Spike", "HUMINT Reports"],
    aiProbability: 12,
    provocationScore: 45,
    anomalies: ["None detected"]
  } : {
    momentum: "Viral",
    acceleration: "+450%/hr",
    sentiment: "Hostile",
    botActivity: "Detected (25%)",
    narrative: "Coordinated hashtag campaign targeting policy changes.",
    crossDomain: ["Social Only"],
    aiProbability: 88,
    provocationScore: 92,
    anomalies: ["Unnatural growth pattern", "Bot-like syntax"]
  };

  return (
    <div className="w-[350px] bg-[#0a0c10] border-l border-white/10 flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-blue-950/10">
        <h2 className="text-sm font-bold text-blue-500 flex items-center gap-2 tracking-wider">
          {activeMode === 'live-news' ? <Newspaper className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
          {activeMode === 'live-news' ? 'NEWS ANALYSIS' : 'TREND INTELLIGENCE'}
        </h2>
        <div className="text-[10px] text-blue-400/60 font-mono mt-1">ID: {selectedItem.id}</div>
      </div>

      <div className="p-5">
        <div className="mb-6">
          <h1 className="text-lg font-bold text-white leading-tight mb-2">{selectedItem.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">{selectedItem.source || selectedItem.hashtag}</span>
            <span className="text-[10px] text-gray-500 font-mono">{selectedItem.time}</span>
          </div>
        </div>

        {/* 1. Core Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <MetricBadge 
            label="Escalation" 
            value={analysis.escalationRisk || "High"} 
            color="text-red-500" 
            icon={AlertTriangle} 
          />
          <MetricBadge 
            label="AI Prob." 
            value={`${analysis.aiProbability}%`} 
            color={analysis.aiProbability > 70 ? "text-red-500" : "text-green-500"} 
            icon={Bot} 
          />
          <MetricBadge 
            label="Provocation" 
            value={`${analysis.provocationScore}/100`} 
            color="text-amber-500" 
            icon={Megaphone} 
          />
        </div>

        {/* 2. Framing Analysis (Radar Chart) */}
        <DetailSection title="Narrative Framing">
          <div className="h-[200px] w-full bg-white/5 rounded border border-white/10 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={framingData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 9 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Framing"
                  dataKey="A"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute top-2 right-2 text-[9px] text-gray-500 font-mono">FRAME ANALYSIS</div>
          </div>
        </DetailSection>

        {/* 3. Narrative Extraction */}
        <DetailSection title="Narrative Extraction Engine">
          <div className="bg-white/5 p-3 rounded border border-white/10 text-xs text-gray-300 leading-relaxed font-mono">
            {analysis.narrative}
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {['Negligence', 'Supply Chain', 'Unrest'].map(tag => (
              <span key={tag} className="text-[9px] bg-blue-900/30 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </DetailSection>

        {/* 4. Anomaly & Object Detection */}
        <DetailSection title="Anomaly & Object Detection">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
              <div className="flex items-center gap-2">
                <Scan className="w-3 h-3 text-purple-400" />
                <span className="text-[10px] text-gray-300">Deepfake / AI Check</span>
              </div>
              <span className={cn("text-[10px] font-bold", analysis.aiProbability > 50 ? "text-red-500" : "text-green-500")}>
                {analysis.aiProbability > 50 ? "LIKELY AI GENERATED" : "ORGANIC CONTENT"}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
              <div className="flex items-center gap-2">
                <Eye className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] text-gray-300">Object Detection</span>
              </div>
              <div className="flex gap-1">
                <span className="text-[9px] bg-white/10 px-1 rounded text-gray-400">Crowd</span>
                <span className="text-[9px] bg-white/10 px-1 rounded text-gray-400">Banner</span>
                <span className="text-[9px] bg-white/10 px-1 rounded text-gray-400">Fire</span>
              </div>
            </div>
          </div>
        </DetailSection>

        {/* 5. Sentiment & Tone */}
        <DetailSection title="Tone & Sentiment Intelligence">
          <div className="mb-2 flex justify-between text-[10px] text-gray-400">
            <span>Polarization Index</span>
            <span className="text-white font-bold">High (0.85)</span>
          </div>
          <SentimentBar positive={15} neutral={25} negative={60} />
          <div className="flex justify-between mt-1 text-[9px] text-gray-600">
            <span>Pos</span>
            <span>Neu</span>
            <span>Neg</span>
          </div>
        </DetailSection>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-white/10">
          <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors uppercase tracking-wider">
            <BarChart2 className="w-3 h-3" />
            Generate Full Report
          </button>
        </div>
      </div>
    </div>
  );
};
