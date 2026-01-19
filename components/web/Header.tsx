
import React from 'react';
import { ICONS } from '../../constants';

interface Props {
  activeScreenName: string;
}

const Header: React.FC<Props> = ({ activeScreenName }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 capitalize">{activeScreenName.replace('_', ' ')}</h2>
        <div className="h-6 w-px bg-slate-200"></div>
        <p className="text-slate-500 text-sm font-medium">All Projects &middot; Last updated 2 mins ago</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <ICONS.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-blue-600" />
          <input 
            type="text" 
            placeholder="Search projects, logs..."
            className="bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all"
          />
        </div>
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <ICONS.DailyLog className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};

// Fix: Add missing default export
export default Header;
