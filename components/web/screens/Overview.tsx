
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_PROJECTS, ICONS } from '../../../constants';

const data = [
  { name: 'Mon', manpower: 120, progress: 2 },
  { name: 'Tue', manpower: 135, progress: 4 },
  { name: 'Wed', manpower: 142, progress: 3 },
  { name: 'Thu', manpower: 128, progress: 5 },
  { name: 'Fri', manpower: 155, progress: 6 },
  { name: 'Sat', manpower: 80, progress: 2 },
  { name: 'Sun', manpower: 10, progress: 0 },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Active Projects', value: '4', icon: ICONS.Project, color: 'blue', sub: '+1 this month' },
          { label: 'Avg. Manpower', value: '118', icon: ICONS.Users, color: 'orange', sub: 'Daily average' },
          { label: 'Pending Logs', value: '12', icon: ICONS.DailyLog, color: 'emerald', sub: 'Action required' },
          // Fix: Access ICONS.Inspections instead of undefined ICONS.ShieldCheck
          { label: 'Safety Incidents', value: '0', icon: ICONS.Inspections, color: 'slate', sub: 'Perfect record' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-bold uppercase bg-slate-50 text-slate-500 px-2 py-1 rounded-md`}>Live</span>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Manpower Trend Chart */}
        <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Manpower Trends (Weekly)</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorManpower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="manpower" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorManpower)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Progress List */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Active Project Status</h3>
          <div className="space-y-6 flex-1">
            {MOCK_PROJECTS.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-700">{project.name}</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      project.progress > 80 ? 'bg-emerald-500' : project.progress > 40 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-2">Managed by {project.manager}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-sm py-3 rounded-xl transition-colors">
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
