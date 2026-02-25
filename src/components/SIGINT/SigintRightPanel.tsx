import React from 'react';
import { 
  Activity, 
  Radio, 
  AlertTriangle, 
  Wifi, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const KPISection = ({ title, status, color, children }: any) => (
  <div className="mb-4 border-b border-white/5 pb-4 last:border-0">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{title}</h3>
      {status && (
        <span className={cn("text-[9px] px-1.5 py-0.5 rounded font-bold uppercase", color)}>
          {status}
        </span>
      )}
    </div>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const MetricRow = ({ label, value, subtext, isAlert }: any) => (
  <div className="flex items-center justify-between text-xs font-mono">
    <span className="text-gray-500">{label}</span>
    <div className="text-right">
      <div className={cn("font-bold", isAlert ? "text-red-500" : "text-white")}>{value}</div>
      {subtext && <div className="text-[9px] text-gray-600">{subtext}</div>}
    </div>
  </div>
);

export const SigintRightPanel = () => {
  return (
    <div className="w-[300px] bg-[#0a0c10] border-l border-white/10 flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-emerald-950/10">
        <h2 className="text-sm font-bold text-emerald-500 flex items-center gap-2 tracking-wider">
          <Activity className="w-4 h-4" /> SIGINT METRICS
        </h2>
        <div className="text-[10px] text-emerald-400/60 font-mono mt-1">REAL-TIME SIGNAL ANALYSIS</div>
      </div>

      <div className="p-4">
        {/* 1. Active Signal Events */}
        <KPISection title="Active Signal Events" status="HIGH" color="bg-emerald-500/20 text-emerald-500">
          <MetricRow label="Total Events" value="1,248" subtext="+12% vs baseline" />
          <MetricRow label="Active Emitters" value="42" subtext="High Power Sources" />
        </KPISection>

        {/* 2. Surge Detection */}
        <KPISection title="Surge Detected (24h)" status="ALERT" color="bg-red-500/20 text-red-500">
          <MetricRow label="Surge Count" value="3" isAlert={true} />
          <MetricRow label="Peak Volume" value="+450%" subtext="Sector 4 (14:00)" isAlert={true} />
        </KPISection>

        {/* 3. Anomaly Count */}
        <KPISection title="Anomaly Count" status="WARNING" color="bg-yellow-500/20 text-yellow-500">
          <MetricRow label="Temporal" value="5" subtext="Off-hour activity" />
          <MetricRow label="Spatial" value="2" subtext="Unexpected cluster" />
        </KPISection>

        {/* 4. Coordination Events */}
        <KPISection title="Coordination Events" status="DETECTED" color="bg-orange-500/20 text-orange-500">
          <MetricRow label="Burst Comms" value="12" subtext="Synchronized" />
          <MetricRow label="Coordination Idx" value="0.85" subtext="High Structured" />
        </KPISection>

        {/* 5. Interference Alerts */}
        <KPISection title="Interference Alerts" status="CRITICAL" color="bg-red-500/20 text-red-500">
          <MetricRow label="Jamming Risk" value="HIGH" isAlert={true} />
          <MetricRow label="GPS Noise" value="Elevated" subtext="Zone B" />
        </KPISection>

        {/* 6. Communication Stability */}
        <KPISection title="Comms Stability" status="STABLE" color="bg-blue-500/20 text-blue-500">
          <MetricRow label="Uptime" value="99.8%" />
          <MetricRow label="Packet Loss" value="0.2%" />
        </KPISection>

        {/* Tactical Implication Summary */}
        <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Tactical Implication</h3>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            High probability of <span className="text-red-400 font-bold">coordinated mobilization</span> detected in Sector 4. Signal bursts correlate with known tactical patterns. Recommend increased IMINT surveillance.
          </p>
        </div>
      </div>
    </div>
  );
};
