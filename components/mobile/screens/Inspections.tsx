
import React, { useState } from 'react';
import { ICONS } from '../../../constants';

interface Props {
  onBack: () => void;
}

const Inspections: React.FC<Props> = ({ onBack }) => {
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Safety gear compliant', status: 'pass' },
    { id: 2, text: 'Scaffolding secured', status: 'pass' },
    { id: 3, text: 'Electrical wires insulated', status: 'null' },
    { id: 4, text: 'Waste disposal clear', status: 'fail' },
    { id: 5, text: 'Fire extinguishers present', status: 'null' },
  ]);

  const toggleStatus = (id: number) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const next = item.status === 'pass' ? 'fail' : item.status === 'fail' ? 'null' : 'pass';
        return { ...item, status: next };
      }
      return item;
    }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white pt-14 pb-4 px-6 shadow-sm flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <ICONS.Back className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900">Safety Inspection</h2>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        <div className="bg-blue-600 p-5 rounded-2xl text-white shadow-md">
          <h3 className="font-bold text-lg mb-1">Daily Safety Walk</h3>
          <p className="text-blue-100 text-sm">Zone B - Main Entrance & Loading Bay</p>
          <div className="mt-4 bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="bg-white h-full" style={{ width: '60%' }} />
          </div>
          <p className="text-[10px] text-white/80 mt-2 font-medium">3 of 5 items checked</p>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">{item.text}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleStatus(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    item.status === 'pass' ? 'bg-green-500 text-white' : 
                    item.status === 'fail' ? 'bg-red-500 text-white' : 
                    'bg-slate-100 text-slate-400'
                  }`}
                >
                  {item.status === 'pass' ? 'PASS' : item.status === 'fail' ? 'FAIL' : 'PEND'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Remarks & Evidence</h4>
          <textarea 
            placeholder="Add any corrective actions required..."
            className="w-full bg-slate-50 p-3 rounded-xl text-sm border-none mb-4 focus:ring-1 focus:ring-blue-500 min-h-[80px]"
          />
          <button className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-lg">
            <ICONS.Camera className="w-4 h-4" />
            Attach Photo
          </button>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
          Complete Inspection
        </button>
      </div>
    </div>
  );
};

export default Inspections;
