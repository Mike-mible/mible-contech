
import React from 'react';
import { ICONS } from '../../../constants';
import { UserRole } from '../../../types';

// Define Props interface to include role passed from WebDashboard
interface Props {
  role: UserRole;
}

const InspectionsTable: React.FC<Props> = ({ role }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Quality & Safety Inspections</h3>
          <p className="text-slate-500 text-sm">Review site compliance audits and corrective actions.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-emerald-700 shadow-md">
           {/* Fix: Access ICONS.Inspections instead of undefined ICONS.ShieldCheck */}
           <ICONS.Inspections className="w-4 h-4" /> New Audit Plan
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { label: 'Pass Rate', value: '94%', color: 'emerald', trend: '+2% from last wk' },
          { label: 'Active Non-Conformities', value: '7', color: 'orange', trend: '-1 this month' },
          { label: 'Scheduled Today', value: '14', color: 'blue', trend: '4 completed' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <h3 className={`text-4xl font-bold text-slate-800`}>{stat.value}</h3>
              <span className="text-[10px] font-bold text-emerald-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
         <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Audit ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project / Zone</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inspector</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Reports</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { id: 'INS-4492', project: 'Skyline Tower', zone: 'Zone B', type: 'Safety', user: 'Mark Taylor', score: '95/100', status: 'Compliant' },
              { id: 'INS-4491', project: 'Skyline Tower', zone: 'Level 2', type: 'Quality', user: 'Sarah Smith', score: '82/100', status: 'Corrective Action' },
              { id: 'INS-4490', project: 'Riverview Apts', zone: 'Pool Area', type: 'Environmental', user: 'John Doe', score: '100/100', status: 'Compliant' },
              { id: 'INS-4489', project: 'Metropolis Mall', zone: 'Sub-Station', type: 'Safety', user: 'Mark Taylor', score: '60/100', status: 'Critical Fail' },
            ].map((ins, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-blue-600">#{ins.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{ins.project}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{ins.zone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{ins.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 font-medium">{ins.user}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-800">{ins.score}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                    ins.status === 'Compliant' ? 'bg-emerald-50 text-emerald-600' : 
                    ins.status === 'Critical Fail' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {ins.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex justify-end gap-2">
                     <button className="text-slate-400 hover:text-blue-600 bg-slate-50 p-2 rounded-lg"><ICONS.Reports className="w-4 h-4" /></button>
                     <button className="text-slate-400 hover:text-blue-600 bg-slate-50 p-2 rounded-lg"><ICONS.Camera className="w-4 h-4" /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectionsTable;
