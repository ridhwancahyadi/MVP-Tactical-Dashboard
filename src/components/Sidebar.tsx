import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Radio, 
  Users, 
  Flame, 
  ShieldAlert,
  Activity,
  Globe,
  Bomb,
  Megaphone,
  Cpu,
  Briefcase,
  Ship,
  Crosshair,
  Plane,
  Eye,
  Shield,
  BrainCircuit,
  Truck,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  alert?: boolean;
  underConstruction?: boolean;
}

const NavItem = ({ icon: Icon, label, active, alert: hasAlert, underConstruction }: NavItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (underConstruction) {
      e.preventDefault();
      window.alert("Under Construction");
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all cursor-pointer group select-none",
        active 
          ? "text-tactical-accent bg-tactical-accent/10 border-l-2 border-tactical-accent" 
          : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent",
        underConstruction && "opacity-70 cursor-not-allowed hover:bg-transparent hover:text-gray-400"
      )}
    >
      <Icon className={cn("w-4 h-4", active ? "text-tactical-accent" : "text-gray-500 group-hover:text-gray-300")} />
      <span className="tracking-wide">{label}</span>
      {hasAlert && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-tactical-danger animate-pulse" />
      )}
      {underConstruction && (
        <span className="ml-auto text-[9px] px-1 py-0.5 rounded border border-gray-700 text-gray-600 font-mono">DEV</span>
      )}
    </div>
  );
};

const SidebarSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="px-4 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest font-mono">
      {title}
    </h3>
    <div className="space-y-0.5">
      {children}
    </div>
  </div>
);

interface SidebarProps {
  currentView?: any;
  onViewChange?: (view: any) => void;
}

export const Sidebar = ({ currentView = 'dashboard', onViewChange }: SidebarProps) => {
  return (
    <div className="h-full bg-tactical-card/50 border-r border-tactical-border flex flex-col backdrop-blur-sm">
      <div className="p-4 border-b border-tactical-border flex items-center gap-3">
        <div className="w-8 h-8 bg-tactical-accent/20 rounded flex items-center justify-center border border-tactical-accent/50">
          <ShieldAlert className="w-5 h-5 text-tactical-accent" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg leading-none tracking-wider text-white">TACTICAL</h1>
          <span className="text-[10px] text-tactical-accent tracking-[0.2em] font-mono">INTEL V2.0</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <SidebarSection title="Command">
          <div onClick={() => onViewChange?.('dashboard')}>
            <NavItem icon={LayoutDashboard} label="Executive Dashboard" active={currentView === 'dashboard'} />
          </div>
          <div onClick={() => onViewChange?.('tactical-plan')}>
            <NavItem icon={Map} label="Tactical Plan" active={currentView === 'tactical-plan'} />
          </div>
        </SidebarSection>

        <SidebarSection title="OPERATION">
          <div onClick={() => onViewChange?.('operations')}>
            <NavItem icon={Crosshair} label="Operations" active={currentView === 'operations'} />
          </div>
        </SidebarSection>

        <SidebarSection title="INTELLIGENCE (Collection)">
          <div onClick={() => onViewChange?.('intelligence')}>
            <NavItem icon={BrainCircuit} label="Intelligence" active={currentView === 'intelligence'} />
          </div>
          <div onClick={() => onViewChange?.('humint')}>
            <NavItem icon={Users} label="HUMINT" active={currentView === 'humint'} />
          </div>
          <div onClick={() => onViewChange?.('osint')}>
            <NavItem icon={Globe} label="OSINT" active={currentView === 'osint'} />
          </div>
          <div onClick={() => onViewChange?.('sigint')}>
            <NavItem icon={Radio} label="SIGINT" active={currentView === 'sigint'} />
          </div>
          <div onClick={() => onViewChange?.('imint')}>
            <NavItem icon={Eye} label="IMINT" active={currentView === 'imint'} />
          </div>
          <div onClick={() => onViewChange?.('cybint')}>
            <NavItem icon={Cpu} label="CYBINT" active={currentView === 'cybint'} />
          </div>
          <div onClick={() => onViewChange?.('finint')}>
            <NavItem icon={Briefcase} label="FININT" active={currentView === 'finint'} />
          </div>
        </SidebarSection>

        {/* Old Operations section removed */}
      </div>

      <div className="p-4 border-t border-tactical-border bg-black/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
        </div>
        <div className="text-[10px] text-gray-600 font-mono">
          SECURE CONNECTION ESTABLISHED
          <br />
          ENCRYPTION: AES-256-GCM
        </div>
      </div>
    </div>
  );
};
