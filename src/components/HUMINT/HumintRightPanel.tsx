import React from 'react';
import { 
  User, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  Activity,
  FileText,
  MapPin,
  Clock,
  Paperclip,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HumintRightPanelProps {
  selectedReport: any;
}

const DetailSection = ({ title, children, className }: any) => (
  <div className={cn("mb-6", className)}>
    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-white/5 pb-1">{title}</h3>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const FieldValue = ({ label, value, sub, icon: Icon, highlight }: any) => (
  <div className="mb-3 last:mb-0">
    <div className="text-[10px] text-gray-500 uppercase mb-0.5 flex items-center gap-1.5">
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </div>
    <div className={cn("text-sm font-medium text-gray-200", highlight && "text-amber-400 font-bold")}>{value}</div>
    {sub && <div className="text-[10px] text-gray-600 font-mono">{sub}</div>}
  </div>
);

const AssessmentBadge = ({ label, value, grade, color }: any) => (
  <div className="bg-white/5 p-2 rounded border border-white/10 flex items-center justify-between">
    <div>
      <div className="text-[9px] text-gray-500 uppercase">{label}</div>
      <div className={cn("text-xs font-bold", color)}>{value}</div>
    </div>
    <div className={cn("text-lg font-bold font-mono px-2 rounded bg-black/40", color)}>
      {grade}
    </div>
  </div>
);

export const HumintRightPanel = ({ selectedReport }: HumintRightPanelProps) => {
  if (!selectedReport) {
    return (
      <div className="w-[350px] bg-[#0a0c10] border-l border-white/10 flex flex-col h-full items-center justify-center text-gray-500">
        <FileText className="w-12 h-12 mb-4 opacity-20" />
        <div className="text-xs uppercase font-bold">Select a report</div>
        <div className="text-[10px]">to view details</div>
      </div>
    );
  }

  // Mock data augmentation if missing (for existing reports)
  const report = {
    ...selectedReport,
    agentId: selectedReport.agentId || "123",
    location: selectedReport.location || "Bandara Boga, Puncak",
    reliabilityGrade: selectedReport.reliabilityGrade || "A",
    reliabilityText: selectedReport.reliabilityText || "Completely Reliable",
    accuracyGrade: selectedReport.accuracyGrade || "1",
    accuracyText: selectedReport.accuracyText || "Confirmed",
    narrative: selectedReport.narrative || "A suspicious anomaly was observed from the hillside near the cargo runway final approach. The aircraft landed safely. No casualties were reported. A suspicious object was detected at the end of the runway.",
    attachments: selectedReport.attachments || [
      { type: 'image', name: 'surveillance_01.jpg' },
      { type: 'audio', name: 'intercept_log.wav' }
    ]
  };

  return (
    <div className="w-[350px] bg-[#0a0c10] border-l border-white/10 flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-amber-950/10">
        <h2 className="text-sm font-bold text-amber-500 flex items-center gap-2 tracking-wider">
          <FileText className="w-4 h-4" /> REPORT DETAILS
        </h2>
        <div className="text-[10px] text-amber-400/60 font-mono mt-1">ID: {report.id}</div>
      </div>

      <div className="p-5">
        <div className="mb-6">
          <h1 className="text-lg font-bold text-white leading-tight mb-2">{report.title}</h1>
          <div className="text-[11px] text-gray-400 italic">
            Reporting from location for anomaly suspects
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <FieldValue 
            label="Source Agent" 
            value={report.agentId} 
            icon={User} 
          />
          <FieldValue 
            label="Time of Event" 
            value={report.time} 
            icon={Clock} 
          />
          <div className="col-span-2">
            <FieldValue 
              label="Location" 
              value={report.location} 
              icon={MapPin}
              highlight
            />
          </div>
        </div>

        <DetailSection title="Intel Assessment">
          <div className="grid grid-cols-2 gap-3">
            <AssessmentBadge 
              label="Source Reliability" 
              value={report.reliabilityText} 
              grade={report.reliabilityGrade} 
              color="text-green-500" 
            />
            <AssessmentBadge 
              label="Info Accuracy" 
              value={report.accuracyText} 
              grade={report.accuracyGrade} 
              color="text-blue-500" 
            />
          </div>
        </DetailSection>

        <DetailSection title="Narrative Description">
          <div className="bg-white/5 p-3 rounded border border-white/10 text-xs text-gray-300 leading-relaxed font-mono">
            {report.narrative}
          </div>
        </DetailSection>

        <DetailSection title="Digital Evidence / Attachments">
          <div className="space-y-2">
            {report.attachments.map((att: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-black/40 border border-white/10 rounded hover:bg-white/5 cursor-pointer transition-colors group">
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-gray-400 group-hover:text-white">
                  {att.type === 'image' ? <ImageIcon className="w-4 h-4" /> : <Paperclip className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-300 truncate group-hover:text-white">{att.name}</div>
                  <div className="text-[9px] text-gray-600 uppercase">{att.type}</div>
                </div>
              </div>
            ))}
          </div>
        </DetailSection>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-white/10">
          <button className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            Verify Intelligence
          </button>
        </div>
      </div>
    </div>
  );
};
