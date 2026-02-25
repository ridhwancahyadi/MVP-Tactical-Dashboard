import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  MessageCircle, 
  Share2, 
  ChevronUp, 
  ChevronDown, 
  Globe, 
  Image as ImageIcon, 
  Video, 
  MoreHorizontal, 
  Heart, 
  MessageSquare, 
  Repeat,
  Radio,
  Cast,
  Maximize2,
  Settings,
  Volume2,
  Grid,
  Layout,
  Play,
  Bot,
  Scan,
  Eye,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const trendData = [
  { time: '00:00', volume: 120, sentiment: 40, anomaly: 10 },
  { time: '04:00', volume: 150, sentiment: 35, anomaly: 12 },
  { time: '08:00', volume: 450, sentiment: 20, anomaly: 85 }, // Spike
  { time: '12:00', volume: 800, sentiment: 15, anomaly: 60 },
  { time: '16:00', volume: 600, sentiment: 25, anomaly: 45 },
  { time: '20:00', volume: 300, sentiment: 30, anomaly: 20 },
];

const objectDetectionData = [
  { object: 'Military Vehicle', confidence: 98, count: 12 },
  { object: 'Weapon (Rifle)', confidence: 92, count: 45 },
  { object: 'Uniformed Personnel', confidence: 88, count: 150 },
  { object: 'Smoke/Fire', confidence: 95, count: 3 },
  { object: 'Flag/Banner', confidence: 85, count: 22 },
];

const anomalyEvents = [
  { time: '14:05', type: 'Botnet Spike', severity: 'CRITICAL', desc: 'Sudden influx of 500+ accounts created < 24h' },
  { time: '13:45', type: 'Deepfake Audio', severity: 'HIGH', desc: 'Voice pattern mismatch detected in viral clip' },
  { time: '12:30', type: 'Geo-Spoofing', severity: 'MEDIUM', desc: 'Cluster of posts with manipulated GPS metadata' },
];

const LiveMonitor = () => (
  <div className="flex gap-4 h-full">
    {/* Main Broadcast */}
    <div className="flex-[1.5] flex flex-col bg-[#0a0c10] rounded-lg border border-white/10 overflow-hidden relative group">
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        <div className="bg-red-600 text-white px-2 py-1 text-[9px] font-bold uppercase rounded flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse" /> LIVE
        </div>
        <div className="bg-black/60 backdrop-blur text-white px-2 py-1 text-[9px] font-bold uppercase rounded border border-white/10">
          BLOOMBERG
        </div>
      </div>
      
      <img 
        src="https://picsum.photos/seed/news_live/800/450" 
        alt="Live Broadcast" 
        className="w-full h-full object-cover opacity-80"
        referrerPolicy="no-referrer"
      />
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-red-500 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Breaking News
            </div>
            <h2 className="text-xl font-bold text-white leading-none max-w-md">GLOBAL MARKETS REACT TO GEOPOLITICAL TENSIONS IN SECTOR 4</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white"><Volume2 className="w-4 h-4" /></button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white"><Maximize2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>

    {/* Webcam Grid */}
    <div className="flex-1 grid grid-cols-2 gap-[1px] bg-black border border-white/10 rounded-lg overflow-hidden">
      {[
        { loc: 'JERUSALEM', time: '14:02 UTC', img: 'https://picsum.photos/seed/jerusalem/400/300' },
        { loc: 'TEHRAN', time: '17:32 UTC', img: 'https://picsum.photos/seed/tehran/400/300' },
        { loc: 'KYIV', time: '16:02 UTC', img: 'https://picsum.photos/seed/kyiv/400/300' },
        { loc: 'WASHINGTON DC', time: '09:02 EST', img: 'https://picsum.photos/seed/dc/400/300' },
      ].map((cam) => (
        <div key={cam.loc} className="relative group overflow-hidden">
          <img 
            src={cam.img} 
            alt={cam.loc} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 left-2 flex flex-col">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] font-bold text-white shadow-black drop-shadow-md">{cam.loc}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const OsintBottomPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'monitor' | 'analytics'>('monitor');

  return (
    <div 
      className={cn(
        "bg-[#0a0c10] border-t border-white/10 transition-all duration-500 ease-in-out flex flex-col relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]",
        isExpanded ? "h-[600px]" : "h-[40px]"
      )}
    >
      {/* Toggle Handle & Tabs */}
      <div className="h-[40px] flex items-center justify-between px-4 border-b border-white/10 bg-[#0a0c10] relative z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            OSINT Command Center
          </button>
          
          <div className="h-4 w-[1px] bg-white/10" />
          
          <div className="flex gap-1">
            <button 
              onClick={() => { setActiveTab('monitor'); setIsExpanded(true); }}
              className={cn(
                "px-3 py-1 rounded text-[9px] font-bold uppercase transition-colors flex items-center gap-2",
                activeTab === 'monitor' ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <Video className="w-3 h-3" /> Live Monitor
            </button>
            <button 
              onClick={() => { setActiveTab('analytics'); setIsExpanded(true); }}
              className={cn(
                "px-3 py-1 rounded text-[9px] font-bold uppercase transition-colors flex items-center gap-2",
                activeTab === 'analytics' ? "bg-purple-600/20 text-purple-400 border border-purple-500/30" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <Activity className="w-3 h-3" /> Deep Analytics
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[9px] font-mono text-gray-500">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SYSTEM ONLINE</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>

      {/* Expanded Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'monitor' && (
          <div className="h-full p-4">
            <LiveMonitor />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="h-full p-4 grid grid-cols-3 gap-4 overflow-y-auto custom-scrollbar">
            {/* 1. Object Detection Stats */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-4">
              <h3 className="text-[10px] font-bold text-white uppercase mb-4 flex items-center gap-2">
                <Eye className="w-3 h-3 text-blue-500" /> Video Object Detection
              </h3>
              <div className="space-y-3">
                {objectDetectionData.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-300">{item.object}</span>
                      <span className="text-blue-400 font-mono">{item.count} detected</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <div className="text-[9px] text-gray-600 text-right mt-0.5">Conf: {item.confidence}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Anomaly Detection Log */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-4">
              <h3 className="text-[10px] font-bold text-white uppercase mb-4 flex items-center gap-2">
                <Scan className="w-3 h-3 text-red-500" /> Anomaly Detection Log
              </h3>
              <div className="space-y-2">
                {anomalyEvents.map((event, i) => (
                  <div key={i} className="p-2 bg-black/40 border border-white/5 rounded hover:border-red-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-mono text-gray-500">{event.time}</span>
                      <span className={cn(
                        "text-[8px] px-1.5 py-0.5 rounded font-bold uppercase",
                        event.severity === 'CRITICAL' ? "bg-red-500/20 text-red-500" :
                        event.severity === 'HIGH' ? "bg-orange-500/20 text-orange-500" : "bg-yellow-500/20 text-yellow-500"
                      )}>{event.severity}</span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-200">{event.type}</div>
                    <div className="text-[9px] text-gray-500 leading-tight mt-1">{event.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Trend & Sentiment Chart */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-4 flex flex-col">
              <h3 className="text-[10px] font-bold text-white uppercase mb-4 flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-green-500" /> Multi-Signal Correlation
              </h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                      itemStyle={{ fontSize: '10px' }}
                    />
                    <Area type="monotone" dataKey="anomaly" stroke="#ef4444" fillOpacity={1} fill="url(#colorAnomaly)" name="Anomaly Score" />
                    <Line type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} dot={false} name="Volume" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
