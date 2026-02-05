
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ICONS } from '../../../constants';
import { UserRole } from '../../../types';

const usageData = [
  { item: 'Cement', stock: 450, used: 320, color: '#2563eb' },
  { item: 'Steel', stock: 120, used: 85, color: '#f97316' },
  { item: 'Sand', stock: 800, used: 400, color: '#10b981' },
  { item: 'Gravel', stock: 600, used: 250, color: '#6366f1' },
];

// Define Props interface to include role passed from WebDashboard
interface Props {
  role: UserRole;
}

const MaterialsTable: React.FC<Props> = ({ role }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Inventory Summary */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-8">Stock vs Consumption</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="item" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="stock" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
                <Bar dataKey="used" radius={[0, 4, 4, 0]}>
                   {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <span className="text-xs text-slate-500 font-medium">Initial Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-xs text-slate-500 font-medium">Currently Used</span>
            </div>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Reorder Alerts</h3>
            <p className="text-slate-500 text-sm mb-6">Stock items below threshold levels</p>
            <div className="space-y-4">
              {[
                { item: 'Structural Steel (16mm)', level: '12%', status: 'Critical' },
                { item: 'PVC Conduit Pipes', level: '22%', status: 'Low' },
                { item: 'Ceramic Tiles (Gray)', level: '8%', status: 'Critical' },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alert.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                      <ICONS.Warning className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{alert.item}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{alert.level} remaining in inventory</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700">ORDER NOW</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Recent Deliveries Log</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
             <ICONS.Plus className="w-4 h-4" /> Log Delivery
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supplier</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Item Description</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Qty</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Recieved</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inspector</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Documents</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { supplier: 'Global Steel Co.', item: 'I-Beams Grade A', qty: '40 tons', date: 'Oct 24, 2023', user: 'Mike Ross' },
              { supplier: 'City Mix Concrete', item: 'M25 Grade Ready-Mix', qty: '120 m³', date: 'Oct 23, 2023', user: 'Sarah Smith' },
              { supplier: 'Ceramic Master Ltd', item: 'Vitrified Floor Tiles', qty: '1,200 sqft', date: 'Oct 22, 2023', user: 'Mike Ross' },
            ].map((d, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-700">{d.supplier}</span>
                </td>
                <td className="px-6 py-4">
                   <span className="text-sm text-slate-600">{d.item}</span>
                </td>
                <td className="px-6 py-4 text-center font-bold text-blue-600">{d.qty}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{d.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold">MR</div>
                    <span className="text-sm text-slate-600">{d.user}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600">
                    <ICONS.Reports className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialsTable;
