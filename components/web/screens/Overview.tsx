
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { MOCK_PROJECTS, ICONS } from '../../../constants';
import { UserRole } from '../../../types';

const manpowerData = [
  { name: 'Mon', count: 120 }, { name: 'Tue', count: 145 }, { name: 'Wed', count: 138 },
  { name: 'Thu', count: 162 }, { name: 'Fri', count: 155 }, { name: 'Sat', count: 85 }, { name: 'Sun', count: 12 },
];

const hrTradeData = [
  { name: 'Steel Fixers', value: 45, color: '#2563eb' },
  { name: 'Electricians', value: 25, color: '#f97316' },
  { name: 'Foremen', value: 10, color: '#10b981' },
  { name: 'Masons', value: 50, color: '#6366f1' },
];

const complianceData = [
  { name: 'Zone A', score: 92 }, { name: 'Zone B', score: 85 }, { name: 'Zone C', score: 98 }, { name: 'Zone D', score: 70 },
];

interface Props {
  role: UserRole;
}

const Overview: React.FC<Props> = ({ role }) => {
  // Logic for different role perspectives
  const isAdmin = role === UserRole.ADMIN || role === UserRole.PROJECT_MANAGER;
  const isHR = role === UserRole.HR_OFFICER;
  const isSafety = role === UserRole.SAFETY_OFFICER;
  const isLogistics = role === UserRole.STORE_KEEPER || role === UserRole.PROCUREMENT_OFFICER;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {role.replace('_', ' ')} Dashboard
          </h2>
          <p className="text-slate-500 font-medium">Site Intelligence & Monitoring System</p>
        </div>
      </div>

      {/* Global Stats - Dynamic based on role */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isAdmin && (
          <>
            <StatCard label="Total Projects" value="8" trend="+1 New" icon={ICONS.Project} color="blue" />
            <StatCard label="Group Progress" value="64.2%" trend="On Target" icon={ICONS.Reports} color="emerald" />
            <StatCard label="Active Budget" value="$4.2M" trend="Normal" icon={ICONS.Materials} color="indigo" />
            <StatCard label="Alerts" value="3" trend="Critical" icon={ICONS.Warning} color="orange" />
          </>
        )}
        {isHR && (
          <>
            <StatCard label="Present Today" value="184" trend="92% Attendance" icon={ICONS.Users} color="blue" />
            <StatCard label="Active Shifts" value="3" trend="Normal" icon={ICONS.Calendar} color="indigo" />
            <StatCard label="Compliance" value="98%" trend="+2%" icon={ICONS.Success} color="emerald" />
            <StatCard label="Pending Leave" value="12" trend="Review Needed" icon={ICONS.DailyLog} color="orange" />
          </>
        )}
        {isSafety && (
          <>
            <StatCard label="Pass Rate" value="94.2" trend="+1.2%" icon={ICONS.Inspections} color="emerald" />
            <StatCard label="Incidents" value="0" trend="Safe Site" icon={ICONS.Success} color="blue" />
            <StatCard label="Open Hazards" value="4" trend="Resolving" icon={ICONS.Warning} color="orange" />
            <StatCard label="Audits Done" value="28" trend="Weekly Goal" icon={ICONS.Reports} color="indigo" />
          </>
        )}
        {isLogistics && (
          <>
            <StatCard label="Stock Levels" value="Low" trend="4 Items" icon={ICONS.Warning} color="orange" />
            <StatCard label="Deliveries" value="6" trend="Today" icon={ICONS.Materials} color="blue" />
            <StatCard label="Approvals" value="2" trend="Pending" icon={ICONS.Success} color="emerald" />
            <StatCard label="Requests" value="14" trend="In Review" icon={ICONS.Reports} color="indigo" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Analytics Visualizer */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 mb-10">
             {isHR ? 'Workforce Trade Distribution' : isSafety ? 'Compliance by Zone' : 'Group Performance Trends'}
           </h3>
           <div className="h-[400px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                {isHR ? (
                  <PieChart>
                    <Pie
                      data={hrTradeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {hrTradeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : isSafety ? (
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="score" fill="#10b981" radius={[10, 10, 0, 0]} />
                  </BarChart>
                ) : (
                  <AreaChart data={manpowerData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
           </div>
           
           {isHR && (
             <div className="grid grid-cols-4 gap-4 mt-8">
               {hrTradeData.map((t, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: t.color}} />
                   <span className="text-xs font-bold text-slate-500">{t.name}</span>
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* Priority Sidebar for Action Items */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white">
          <h3 className="text-xl font-bold mb-8">Action Required</h3>
          <div className="space-y-6">
             {[
               { title: 'Approve Material Request', role: 'Procurement', time: '1h ago', urgency: 'High' },
               { title: 'Daily Log Missing', role: 'Foreman', time: '3h ago', urgency: 'Medium' },
               { title: 'Corrective Action Due', role: 'Safety', time: '5h ago', urgency: 'High' },
               { title: 'Worker ID Expiring', role: 'HR', time: '1d ago', urgency: 'Low' },
             ].map((action, i) => (
               <div key={i} className="group p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg ${
                      action.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-blue-400/20 text-blue-400'
                    }`}>
                      {action.urgency}
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">{action.time}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">{action.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">{action.role}</p>
               </div>
             ))}
          </div>
          <button className="w-full mt-10 bg-white text-slate-900 font-black py-4 rounded-2xl shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 text-xs">
            VIEW PROJECT OVERVIEW
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${color}-50 text-${color}-600 transition-transform group-hover:scale-110`}>
        <Icon className="w-7 h-7" />
      </div>
      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 group-hover:bg-slate-100">{trend}</span>
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
  </div>
);

export default Overview;
