
import React, { useState } from 'react';
import { ICONS } from '../../../constants';
import { analyzeImage } from '../../../lib/gemini';

interface Props {
  onBack: () => void;
}

const Materials: React.FC<Props> = ({ onBack }) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleAIScan = async () => {
    setScanning(true);
    setScanResult(null);
    try {
      // Simulation: Use a random high-res placeholder image for the "delivery slip"
      const sampleImageUrl = "https://picsum.photos/seed/material-slip/1000/1000";
      const response = await fetch(sampleImageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]);
        };
      });
      reader.readAsDataURL(blob);
      const base64Data = await base64Promise;

      const prompt = "Act as a site logistics auditor. Extract the following from this delivery slip: Supplier Name, Delivery Date, Item Name, and Total Quantity. Then, verify if there are any suspicious discrepancies or quality warnings based on the visual condition of the paper/items. Be concise and professional.";
      const result = await analyzeImage(prompt, base64Data, 'image/jpeg');
      setScanResult(result);
    } catch (error) {
      setScanResult("Failed to perform AI audit. Please check your connection and retry.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white pt-14 pb-4 px-6 shadow-sm flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <ICONS.Back className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900">Material Tracking</h2>
      </div>

      <div className="p-6">
        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl mb-6 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <ICONS.DailyLog className="text-blue-400 w-4 h-4" />
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">ConTech Intelligence</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">AI Logistics Audit</h3>
            <p className="text-slate-400 text-xs mb-6">Scan delivery notes to automatically update inventory using Gemini 3 Pro.</p>
            
            <button 
              onClick={handleAIScan}
              disabled={scanning}
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {scanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Thinking deeply...</span>
                </>
              ) : (
                <>
                  <ICONS.Camera className="w-5 h-5" />
                  <span>Scan Delivery Note</span>
                </>
              )}
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
        </div>

        {scanResult && (
          <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm mb-6 animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2 mb-3">
              <ICONS.Success className="text-emerald-500 w-4 h-4" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">AI Extraction Complete</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[13px] text-slate-600 leading-relaxed italic">
                {scanResult}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white text-[11px] font-bold py-2 rounded-xl">Confirm & Add to Stock</button>
              <button onClick={() => setScanResult(null)} className="flex-1 bg-slate-100 text-slate-500 text-[11px] font-bold py-2 rounded-xl">Discard</button>
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button className="flex-1 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-2">
              <ICONS.Plus className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-700">Manual Entry</span>
          </button>
          <button className="flex-1 bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex flex-col items-center">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-2">
              <ICONS.DailyLog className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-700">Usage Log</span>
          </button>
        </div>

        <h3 className="text-slate-900 font-bold mb-4">Recent Stock Changes</h3>
        <div className="space-y-4">
          {[
            { item: 'Cemex Portland Cement', qty: '200 bags', date: 'Today, 09:30 AM', status: 'verified' },
            { item: '12mm Steel Rebars', qty: '50 units', date: 'Yesterday', status: 'verified' },
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
