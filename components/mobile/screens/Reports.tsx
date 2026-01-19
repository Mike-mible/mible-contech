
import React from 'react';
import { ICONS } from '../../../constants';

interface Props {
  onBack: () => void;
}

const Reports: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white pt-14 pb-4 px-6 shadow-sm flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <ICONS.Back className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900">Project Reports</h2>
      </div>

      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ICONS.Reports className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900">Export Daily Summary</h3>
          <p className="text-sm text-slate-500 mb-6">Generate a detailed PDF for Oct 25, 2023</p>
          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md">
            Generate PDF
          </button>
        </div>

        <h4 className="text-xs font-bold text-slate-400 uppercase mt-8 mb-2 tracking-widest">Recent Downloads</h4>
        <div className="space-y-3">
          {[
            { name: 'Monthly Progress - Sept.pdf', size: '2.4 MB', date: '3 days ago' },
            { name: 'Daily_Log_Oct_24.pdf', size: '1.1 MB', date: 'Yesterday' },
            { name: 'Site_Safety_Audit_Q3.pdf', size: '4.8 MB', date: 'Oct 15' },
          ].map((r, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center">
                <ICONS.Reports className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{r.name}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-[10px] text-slate-400">{r.size}</span>
                  <span className="text-[10px] text-slate-400">{r.date}</span>
                </div>
              </div>
              <button className="text-blue-600">
                <ICONS.Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
