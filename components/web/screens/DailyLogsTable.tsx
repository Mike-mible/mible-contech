
import React from 'react';
import { MOCK_LOGS, ICONS } from '../../../constants';

const DailyLogsTable: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Daily Activity Logs</h3>
          <p className="text-slate-500 text-sm">Review and approve site supervisor submissions.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
            <ICONS.Reports className="w-4 h-4" /> Export All
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 shadow-md">
            <ICONS.Plus className="w-4 h-4" /> Add Manual Log
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex gap-4">
          <div className="flex-1 relative">
            <ICONS.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input type="text" placeholder="Filter by project or staff..." className="w-full bg-slate-50 border-none pl-10 pr-4 py-2 rounded-xl text-sm" />
          </div>
          <select className="bg-slate-50 border-none px-4 py-2 rounded-xl text-sm font-medium">
            <option>All Projects</option>
            <option>Skyline Tower A</option>
            <option>Riverview Apts</option>
          </select>
          <select className="bg-slate-50 border-none px-4 py-2 rounded-xl text-sm font-medium">
            <option>Status: All</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activities</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Manpower</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weather</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-700">{log.date}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600">Site #{log.projectId}</span>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <div className="flex flex-wrap gap-1">
                    {log.activities.map((a, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{a}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-bold text-blue-600">{log.manpower}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ICONS.Weather className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-sm text-slate-600">{log.weather}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                    log.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 p-2">
                    <ICONS.Reports className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-orange-600 p-2">
                    <ICONS.Admin className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
          <p className="text-xs text-slate-500 font-medium">Showing 1 to 4 of 48 entries</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed">Prev</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold">1</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">2</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLogsTable;
