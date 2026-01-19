
import React, { useState } from 'react';
import { ICONS } from '../../../constants';
import { analyzeImage } from '../../../lib/gemini';

interface Props {
  onBack: () => void;
}

const DailyLog: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [analyzing, setAnalyzing] = useState<number | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<number, string>>({});

  const handleAnalyze = async (id: number, imageUrl: string) => {
    setAnalyzing(id);
    try {
      // Fetch the image as base64
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]); // remove prefix
        };
      });
      reader.readAsDataURL(blob);
      const base64Data = await base64Promise;

      const prompt = "Act as a construction safety inspector. Analyze this site photo. Identify the activities taking place, list any visible safety equipment, and point out any potential hazards or compliance issues. Be concise.";
      const result = await analyzeImage(prompt, base64Data, 'image/jpeg');
      setAnalysisResults(prev => ({ ...prev, [id]: result || "No significant issues detected." }));
    } catch (error) {
      setAnalysisResults(prev => ({ ...prev, [id]: "Error analyzing image. Please try again." }));
    } finally {
      setAnalyzing(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white pt-14 pb-4 px-6 shadow-sm flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
          <ICONS.Back className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-slate-900">New Daily Log</h2>
      </div>

      <div className="flex bg-white px-6 overflow-x-auto border-b border-slate-100">
        {['Summary', 'Manpower', 'Equipment', 'Photos'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`py-3 px-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.toLowerCase() ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">General Info</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Date</label>
                  <input type="date" defaultValue="2023-10-25" className="w-full bg-slate-50 p-2 rounded-lg text-sm border-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">Shift</label>
                  <select className="w-full bg-slate-50 p-2 rounded-lg text-sm border-none">
                    <option>Morning (08:00 - 17:00)</option>
                    <option>Night (19:00 - 04:00)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Weather Observation</label>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-50 border border-blue-200 p-3 rounded-xl flex flex-col items-center">
                    <ICONS.Weather className="text-blue-600 w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold text-blue-600">Sunny</span>
                  </button>
                  <button className="flex-1 bg-slate-100 border border-transparent p-3 rounded-xl flex flex-col items-center">
                    <ICONS.Weather className="text-slate-400 w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold text-slate-500">Cloudy</span>
                  </button>
                  <button className="flex-1 bg-slate-100 border border-transparent p-3 rounded-xl flex flex-col items-center">
                    <ICONS.Weather className="text-slate-400 w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold text-slate-500">Rainy</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Activities Today</h4>
              <textarea 
                placeholder="Describe key milestones achieved today..."
                className="w-full bg-slate-50 p-3 rounded-xl text-sm border-none min-h-[100px] focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="aspect-square bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-300 transition-all">
                <ICONS.Camera className="w-8 h-8 mb-2" />
                <span className="text-xs font-bold">Add Photo</span>
              </button>
              {[1, 2, 3].map(i => {
                const imgUrl = `https://picsum.photos/seed/${i + 15}/600/600`;
                return (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
                    <div className="aspect-square relative group shrink-0">
                      <img src={imgUrl} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleAnalyze(i, imgUrl)}
                          disabled={analyzing === i}
                          className="bg-white text-blue-600 p-2 rounded-full shadow-lg active:scale-95 disabled:opacity-50"
                        >
                          <ICONS.DailyLog className="w-5 h-5" />
                        </button>
                        <button className="bg-white text-red-500 p-2 rounded-full shadow-lg">
                          <ICONS.Error className="w-5 h-5" />
                        </button>
                      </div>
                      {analyzing === i && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">AI Analyzing</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {analysisResults[i] && (
                      <div className="p-3 bg-blue-50/50 border-t border-blue-100">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <ICONS.DailyLog className="w-3 h-3 text-blue-600" />
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">AI Inspection Notes</span>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-relaxed italic line-clamp-4">
                          {analysisResults[i]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'manpower' && (
          <div className="space-y-3">
             {[
               { role: 'Foreman', count: 2 },
               { role: 'Steel Fixers', count: 12 },
               { role: 'Concrete Workers', count: 8 },
               { role: 'Plumbers', count: 4 },
             ].map((m, i) => (
               <div key={i} className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                 <span className="font-medium text-slate-700">{m.role}</span>
                 <div className="flex items-center gap-4">
                   <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-lg">-</button>
                   <span className="w-6 text-center font-bold">{m.count}</span>
                   <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">+</button>
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
          Submit Daily Log
        </button>
      </div>
    </div>
  );
};

export default DailyLog;
