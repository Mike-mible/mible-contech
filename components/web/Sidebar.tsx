import React from 'react';
import { WebScreen, UserRole } from '../../types';
import { ICONS } from '../../constants';

interface Props {
  activeScreen: WebScreen;
  onNavigate: (screen: WebScreen) => void;
  userRole: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<Props> = ({ activeScreen, onNavigate, userRole, onLogout }) => {
  // Define visibility permissions
  const canManageUsers = userRole === UserRole.PROJECT_MANAGER || userRole === UserRole.SITE_ENGINEER;
  const canSeeAdmin = userRole === UserRole.PROJECT_MANAGER;

  const navItems = [
    { id: WebScreen.OVERVIEW, label: 'Control Center', icon: ICONS.Dashboard, show: true },
    { id: WebScreen.DAILY_LOGS, label: 'Field Logs', icon: ICONS.DailyLog, show: true },
    { id: WebScreen.MATERIALS, label: 'Supply Chain', icon: ICONS.Materials, show: true },
    { id: WebScreen.INSPECTIONS, label: 'QC & Safety', icon: ICONS.Inspections, show: true },
    { id: WebScreen.USER_MGMT, label: 'Team Onboarding', icon: ICONS.Users, show: canManageUsers },
    { id: WebScreen.ADMIN, label: 'System Admin', icon: ICONS.Admin, show: canSeeAdmin },
  ];

  return (
    <div className="w-72 bg-slate-900 flex flex-col shrink-0 h-full border-r border-slate-800">
      <div className="p-8 flex items-center gap-4">
        <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-900/50">
          <ICONS.Project className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-tight">CJIC ConTech</h1>
          <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Digital Site Office</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.filter(i => i.show).map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-200 group relative ${
              activeScreen === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${activeScreen === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
            <span className="text-sm font-semibold">{item.label}</span>
            {activeScreen === item.id && (
              <div className="absolute left-[-1rem] w-1.5 h-8 bg-white rounded-r-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-slate-800/40 rounded-3xl p-5 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
              {userRole.substring(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate capitalize">{userRole.replace('_', ' ')}</p>
              <p className="text-slate-500 text-[9px] font-medium truncate tracking-wider">PROJECT ALPHA</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 text-[10px] font-bold py-2.5 rounded-xl transition-all border border-slate-700"
          >
            SIGN OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;