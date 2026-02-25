import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  DollarSign, 
  Droplets, 
  Zap, 
  Plane, 
  Truck, 
  Users 
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

const MetricRow = ({ label, value, change, isUp, isBad }: any) => (
  <div className="flex items-center justify-between text-xs font-mono">
    <span className="text-gray-500">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-white font-bold">{value}</span>
      {change && (
        <span className={cn(
          "flex items-center text-[10px]",
          isBad ? "text-red-500" : "text-green-500"
        )}>
          {isUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
          {change}
        </span>
      )}
    </div>
  </div>
);

const TacticalFlag = ({ icon: Icon, label, level }: any) => (
  <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/5">
    <div className="flex items-center gap-2">
      <Icon className={cn("w-3 h-3", level === 'HIGH' ? "text-red-500" : "text-yellow-500")} />
      <span className="text-[10px] text-gray-300">{label}</span>
    </div>
    <div className="flex gap-1">
      {[1, 2, 3].map(i => (
        <div key={i} className={cn(
          "w-1.5 h-3 rounded-sm",
          level === 'HIGH' 
            ? (i <= 3 ? "bg-red-500" : "bg-gray-800")
            : (i <= 2 ? "bg-yellow-500" : "bg-gray-800")
        )} />
      ))}
    </div>
  </div>
);

export const FinintRightPanel = () => {
  return (
    <div className="w-[320px] bg-[#0a0c10] border-l border-white/10 flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-red-950/10">
        <h2 className="text-sm font-bold text-red-500 flex items-center gap-2 tracking-wider">
          <Activity className="w-4 h-4" /> TACTICAL KPI BOARD
        </h2>
        <div className="text-[10px] text-red-400/60 font-mono mt-1">REAL-TIME IMPACT MONITOR</div>
      </div>

      <div className="p-4">
        {/* 1. Global Stress Indicator */}
        <KPISection title="Global Stress Indicator" status="ELEVATED" color="bg-yellow-500/20 text-yellow-500">
          <MetricRow label="VIX Index" value="24.5" change="+5.2%" isUp={true} isBad={true} />
          <MetricRow label="US 10Y Yield" value="4.2%" change="+12bps" isUp={true} isBad={true} />
          <MetricRow label="DXY (USD)" value="104.2" change="+0.8%" isUp={true} isBad={true} />
        </KPISection>

        {/* 2. Indonesia Financial Stability */}
        <KPISection title="Indonesia Stability Index" status="STABLE" color="bg-green-500/20 text-green-500">
          <MetricRow label="IHSG" value="7,240" change="-0.4%" isUp={false} isBad={true} />
          <MetricRow label="USD/IDR" value="15,850" change="+0.2%" isUp={true} isBad={true} />
          <MetricRow label="CDS 5Y" value="85.4" change="-1.2%" isUp={false} isBad={false} />
        </KPISection>

        {/* 3. Currency Shock Monitor */}
        <KPISection title="Currency Shock Monitor" status="ALERT" color="bg-red-500/20 text-red-500">
          <div className="text-[10px] text-gray-400 mb-2">Threshold: &gt;2% Daily Volatility</div>
          <MetricRow label="IDR Volatility" value="HIGH" change="2.1%" isUp={true} isBad={true} />
          <MetricRow label="JPY Volatility" value="MED" change="1.4%" isUp={true} isBad={true} />
        </KPISection>

        {/* 4. Commodity Shock Index */}
        <KPISection title="Commodity Shock Index" status="CRITICAL" color="bg-red-500/20 text-red-500">
          <MetricRow label="Brent Oil" value="$92.4" change="+4.5%" isUp={true} isBad={true} />
          <MetricRow label="Nickel" value="$18.2k" change="+2.1%" isUp={true} isBad={false} />
          <MetricRow label="Rice (C4)" value="IDR 14k" change="+1.2%" isUp={true} isBad={true} />
        </KPISection>

        {/* 5. Capital Flow Risk */}
        <KPISection title="Capital Flow Risk" status="OUTFLOW" color="bg-orange-500/20 text-orange-500">
          <MetricRow label="Foreign Net Sell" value="-$45M" change="Daily" isUp={false} isBad={true} />
          <MetricRow label="Bond Yield Spike" value="+15bps" change="Weekly" isUp={true} isBad={true} />
        </KPISection>

        {/* 6. Tactical Risk Flags */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tactical Risk Flags</h3>
          <TacticalFlag icon={Droplets} label="Aviation Fuel Risk" level="HIGH" />
          <TacticalFlag icon={Zap} label="Energy Cost Pressure" level="HIGH" />
          <TacticalFlag icon={Truck} label="Supply Chain Disruption" level="MEDIUM" />
          <TacticalFlag icon={Users} label="Social Instability Risk" level="MEDIUM" />
        </div>
      </div>
    </div>
  );
};
