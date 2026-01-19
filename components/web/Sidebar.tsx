
import React from 'react';
import { WebScreen } from '../../types';
import { ICONS } from '../../constants';

interface Props {
  activeScreen: WebScreen;
  onNavigate: (screen: WebScreen) => void;
}

const Sidebar: React.FC<Props> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { id: WebScreen.OVERVIEW, label: 'Overview', icon: ICONS.Dashboard },
    { id: WebScreen.DAILY_LOGS, label: 'Daily Logs', icon: ICONS.DailyLog },
    { id: WebScreen.MATERIALS, label: 'Materials', icon: ICONS.Materials },
    { id: WebScreen.INSPECTIONS, label: 'Inspections', icon: ICONS.Inspections },
    { id: WebScreen.ADMIN, label: 'Administration', icon: ICONS.Admin },
  ];

  return (
    <div className="w-64 bg-slate-900 flex flex-col shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
          <ICONS.Project className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold tracking-tight">ConTech</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Enterprise</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeScreen === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${activeScreen === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
            <span className="text-sm font-semibold tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs">JD</div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">John Doe</p>
              <p className="text-slate-500 text-[10px] font-medium truncate">Project Director</p>
            </div>
          </div>
          <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold py-2 rounded-lg transition-colors border border-slate-700">
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

// Fix: Add missing default export
export default Sidebar;
