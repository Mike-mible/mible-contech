
import React from 'react';
import { MobileScreen } from '../../../types';
import { MOCK_PROJECTS, ICONS } from '../../../constants';

interface Props {
  onNavigate: (to: MobileScreen) => void;
  projectId: string;
}

const Dashboard: React.FC<Props> = ({ onNavigate, projectId }) => {
  const project = MOCK_PROJECTS.find(p => p.id === projectId) || MOCK_PROJECTS[0];

  const menuItems = [
    { id: MobileScreen.DAILY_LOG, label: 'Daily Log', icon: ICONS.DailyLog, color: 'bg-blue-100 text-blue-600' },
    { id: MobileScreen.MATERIALS, label: 'Materials', icon: ICONS.Materials, color: 'bg-orange-100 text-orange-600' },
    { id: MobileScreen.INSPECTIONS, label: 'Inspections', icon: ICONS.Inspections, color: 'bg-emerald-100 text-emerald-600' },
    { id: MobileScreen.REPORTS, label: 'Reports', icon: ICONS.Reports, color: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-blue-600 pt-16 pb-10 px-6 rounded-b-[2rem] shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-100 text-sm font-medium">Active Site</p>
            <h2 className="text-white text-xl font-bold">{project.name}</h2>
          </div>
          <button className="bg-white/20 p-2 rounded-xl text-white">
            <ICONS.Admin className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="flex items-center text-blue-100 text-xs mb-1">
              <ICONS.Weather className="w-3.5 h-3.5 mr-1" />
              Current Weather
            </div>
            <p className="text-white font-bold">Sunny, 28°C</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="flex items-center text-blue-100 text-xs mb-1">
              <ICONS.Users className="w-3.5 h-3.5 mr-1" />
              Present Staff
            </div>
            <p className="text-white font-bold">42 Workers</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <h3 className="text-slate-900 font-bold mb-4">Supervision Tools</h3>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3 group-active:scale-95 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-800">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-slate-900 font-bold mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-sm flex gap-3">
              <ICONS.Warning className="text-orange-500 w-5 h-5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">10:45 AM</p>
                <p className="text-sm font-medium text-slate-800">Concrete delivery delayed by 45 mins.</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm flex gap-3">
              <ICONS.Success className="text-blue-500 w-5 h-5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">09:15 AM</p>
                <p className="text-sm font-medium text-slate-800">Level 4 safety inspection passed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
