import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  FileWarning,
  TrendingUp,
  Layers,
  Zap,
  Globe,
  AlertOctagon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MetricCard = ({ label, value, sub, color = "text-white", icon: Icon }: any) => (
  <div className="bg-white/5 border border-white/5 p-3 rounded flex flex-col items-start justify-center hover:border-white/10 transition-colors group">
    <div className="flex items-center justify-between w-full mb-2">
      <span className="text-[9px] text-gray-500 uppercase font-mono">{label}</span>
      {Icon && <Icon className={cn("w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity", color)} />}
    </div>
    <span className={cn("text-xl font-display font-bold leading-none mb-1", color)}>{value}</span>
    {sub && <span className="text-[9px] text-gray-400">{sub}</span>}
  </div>
);

export const IntelligenceRightPanel = () => {
  return (
    <div className="h-full bg-tactical-card/90 border-l border-tactical-border flex flex-col backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-tactical-border bg-black/20">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-tactical-accent" />
          <span className="text-[10px] font-bold text-tactical-accent uppercase tracking-widest">INTELLIGENCE ANALYTICS</span>
        </div>
        <div className="text-[10px] text-gray-500 font-mono">Real-time Signal Processing</div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        
        {/* 1. Intelligence Activity Overview - New KPIs */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
            <Activity className="w-3 h-3" /> Signal Metrics
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <MetricCard 
              label="Total Signals (24h)" 
              value="126" 
              sub="Active Signals" 
              color="text-white" 
              icon={Activity}
            />
            <MetricCard 
              label="Multi-Domain" 
              value="18" 
              sub="Cross-Domain Patterns" 
              color="text-blue-400" 
              icon={Layers}
            />
            <MetricCard 
              label="Momentum" 
              value="Increasing ↑" 
              sub="+23% vs 6h ago" 
              color="text-green-400" 
              icon={TrendingUp}
            />
            <MetricCard 
              label="Emerging Patterns" 
              value="7" 
              sub="Emerging Clusters" 
              color="text-yellow-400" 
              icon={Zap}
            />
            <MetricCard 
              label="Noise Ratio" 
              value="32%" 
              sub="Signal Validity" 
              color="text-gray-400" 
              icon={FileWarning}
            />
            <MetricCard 
              label="Dominant Domain" 
              value="OSINT" 
              sub="Contribution: 38%" 
              color="text-purple-400" 
              icon={Globe}
            />
          </div>
        </section>

        {/* 4. Conflict & Misinformation Detection (Kept as requested) */}
        <section>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3 flex items-center gap-2">
            <AlertOctagon className="w-3 h-3" /> Conflict Detection
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-red-400 mb-0.5">Contradicting Reports</div>
                <p className="text-[9px] text-gray-400 leading-relaxed">
                  HUMINT source A4 conflicts with SIGINT data regarding troop movement in Sector 9.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <FileWarning className="w-3.5 h-3.5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-yellow-400 mb-0.5">Narrative Amplification</div>
                <p className="text-[9px] text-gray-400 leading-relaxed">
                  Suspicious bot activity detected amplifying unverified incident reports on social channels.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
