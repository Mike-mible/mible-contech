import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_PROJECTS, ICONS } from '../../../constants';
import { UserRole } from '../../../types';

const manpowerData = [
  { name: 'Mon', count: 120 }, { name: 'Tue', count: 145 }, { name: 'Wed', count: 138 },
  { name: 'Thu', count: 162 }, { name: 'Fri', count: 155 }, { name: 'Sat', count: 85 }, { name: 'Sun', count: 12 },
];

const complianceData = [
  { name: 'Zone A', score: 92 }, { name: 'Zone B', score: 85 }, { name: 'Zone C', score: 98 }, { name: 'Zone D', score: 70 },
];

interface Props {
  role: UserRole;
}

const Overview: React.FC<Props> = ({ role }) => {
  // Logic for different role perspectives
  const isManagement = role === UserRole.PROJECT_MANAGER || role === UserRole.SITE_ENGINEER;
  const isSafety = role === UserRole.SAFETY_OFFICER;
  const isLogistics = role === UserRole.STORE_KEEPER || role === UserRole.PROCUREMENT_OFFICER;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {role.replace('_', ' ')} Command Center
          </h2>
          <p className="text-slate-500 font-medium">Real-time intelligence for site operations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isManagement && (
          <>
            <StatCard label="Total Workforce" value="842" trend="+5.2%" icon={ICONS.Users} color="blue" />
            <StatCard label="Project Progress" value="68%" trend="On Target" icon={ICONS.Project} color="emerald" />
            <StatCard label="Budget Burn" value="$1.2M" trend="12% Margin" icon={ICONS.Materials} color="indigo" />
            <StatCard label="Open Alerts" value="4" trend="Action Required" icon={ICONS.Warning} color="orange" />
          </>
        )}
        {isSafety && (
          <>
            <StatCard label="Audit Score" value="94.2" trend="+1.2%" icon={ICONS.Inspections} color="emerald" />
            <StatCard label="Incidents" value="0" trend="Clear" icon={ICONS.Success} color="blue" />
            <StatCard label="Hazards Flagged" value="12" trend="Resolved" icon={ICONS.Warning} color="orange" />
            <StatCard label="Training %" value="88%" trend="In Progress" icon={ICONS.Users} color="indigo" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 mb-10">
             {isSafety ? 'Safety Performance by Zone' : 'Workforce Allocation Trends'}
           </h3>
           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {isSafety ? (
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#10b981" radius={[8, 8, 0, 0]} />
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
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white">
          <h3 className="text-xl font-bold mb-8">Priority Field Reports</h3>
          <div className="space-y-6">
             {[
               { title: 'Concrete Strength Fail', site: 'Zone C', time: '2h ago', level: 'High' },
               { title: 'Steel Delivery Recieved', site: 'Gate 2', time: '4h ago', level: 'Normal' },
               { title: 'Worker Safety Breach', site: 'Scaffold L4', time: '6h ago', level: 'Critical' },
             ].map((report, i) => (
               <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className={`w-2 h-2 rounded-full mt-2 ${report.level === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-blue-400'}`} />
                  <div>
                    <h4 className="font-bold text-sm text-white">{report.title}</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{report.site} • {report.time}</p>
                  </div>
               </div>
             ))}
          </div>
          <button className="w-full mt-10 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-900/40 text-sm active:scale-95 transition-all">
            Review All Reports
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${color}-50 text-${color}-600`}>
        <Icon className="w-7 h-7" />
      </div>
      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-50 text-slate-500">{trend}</span>
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-black text-slate-900">{value}</h3>
  </div>
);

export default Overview;