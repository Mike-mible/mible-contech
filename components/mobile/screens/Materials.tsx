
import React from 'react';
import { ICONS } from '../../../constants';

interface Props {
  onBack: () => void;
}

const Materials: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white pt-14 pb-4 px-6 shadow-sm flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <ICONS.Back className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900">Material Tracking</h2>
      </div>

      <div className="p-6 flex gap-4">
        <button className="flex-1 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-2">
            <ICONS.Plus className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-700">New Delivery</span>
        </button>
        <button className="flex-1 bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex flex-col items-center">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-2">
            <ICONS.DailyLog className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-700">Usage Log</span>
        </button>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <h3 className="text-slate-900 font-bold mb-4">Recent Deliveries</h3>
        <div className="space-y-4">
          {[
            { item: 'Cemex Portland Cement', qty: '200 bags', date: 'Today, 09:30 AM', status: 'verified' },
            { item: '12mm Steel Rebars', qty: '50 units', date: 'Yesterday', status: 'verified' },
            { item: 'Ready-mix Concrete', qty: '12 m³', date: 'Oct 23', status: 'issue' },
            { item: 'Electrical Conduit Pipes', qty: '500 ft', date: 'Oct 22', status: 'verified' },
          ].map((d, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${d.status === 'verified' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {d.status === 'verified' ? <ICONS.Success className="w-6 h-6" /> : <ICONS.Warning className="w-6 h-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{d.item}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{d.qty}</span>
                  <span className="text-[10px] text-slate-400">{d.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materials;
