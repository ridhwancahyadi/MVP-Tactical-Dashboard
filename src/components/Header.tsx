import { Search, Bell, Menu, Settings, Maximize2, Command } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 border-b border-tactical-border bg-tactical-bg/80 backdrop-blur-md flex items-center justify-between px-4 z-10">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded border border-white/10 w-64">
          <Search className="w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search intelligence database..." 
            className="bg-transparent border-none outline-none text-xs text-gray-300 w-full placeholder:text-gray-600 font-mono"
          />
          <div className="flex items-center gap-1 text-[10px] text-gray-600 font-mono border border-gray-700 rounded px-1.5">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <div className="text-xl font-mono font-bold text-tactical-accent leading-none tracking-widest">
            {format(time, 'HH:mm:ss')} <span className="text-[10px] text-gray-500">UTC</span>
          </div>
          <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            {format(time, 'dd MMM yyyy')}
          </div>
        </div>

        <div className="h-8 w-[1px] bg-tactical-border hidden md:block" />

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tactical-danger rounded-full border border-black" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
