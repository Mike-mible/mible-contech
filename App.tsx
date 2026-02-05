import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Package, 
  ShieldCheck, 
  ChevronLeft,
  Camera,
  CheckCircle2,
  HardHat
} from 'lucide-react';

type View = 'dashboard' | 'log' | 'material' | 'inspection';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [submitted, setSubmitted] = useState(false);

  const handleBack = () => {
    setView('dashboard');
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => handleBack(), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-slate-900">Submission Successful</h2>
        <p className="text-slate-500">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          {view !== 'dashboard' && (
            <button onClick={handleBack} className="mr-2 p-1 bg-white/10 rounded-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <HardHat className="text-yellow-400 w-8 h-8" />
          <h1 className="text-xl font-bold tracking-tight">CJIC Site Tool</h1>
        </div>
      </header>

      <main className="p-6">
        {view === 'dashboard' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-6">
              <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Current Site</h2>
              <p className="text-xl font-bold text-slate-900">Project Alpha - Sector 7</p>
            </div>

            <button 
              onClick={() => setView('log')}
              className="w-full flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm active:scale-95 transition-all text-left"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <ClipboardList className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Daily Log</h3>
                <p className="text-xs text-slate-500">Labor, progress & weather</p>
              </div>
            </button>

            <button 
              onClick={() => setView('material')}
              className="w-full flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm active:scale-95 transition-all text-left"
            >
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Material Delivery</h3>
                <p className="text-xs text-slate-500">Record incoming stock</p>
              </div>
            </button>

            <button 
              onClick={() => setView('inspection')}
              className="w-full flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm active:scale-95 transition-all text-left"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Safety Inspection</h3>
                <p className="text-xs text-slate-500">Compliance & hazard audit</p>
              </div>
            </button>
          </div>
        )}

        {view === 'log' && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Activities Conducted</label>
              <textarea required className="w-full p-4 rounded-xl border border-slate-200 bg-white" rows={4} placeholder="What was achieved today?" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Manpower</label>
                <input type="number" className="w-full p-4 rounded-xl border border-slate-200 bg-white" placeholder="Total staff" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Weather</label>
                <select className="w-full p-4 rounded-xl border border-slate-200 bg-white appearance-none">
                  <option>Sunny</option>
                  <option>Cloudy</option>
                  <option>Rainy</option>
                  <option>Extreme Heat</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Equipment Used</label>
              <input type="text" className="w-full p-4 rounded-xl border border-slate-200 bg-white" placeholder="Cranes, Excavators, etc." />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Site Issues / Delays</label>
              <textarea className="w-full p-4 rounded-xl border border-slate-200 bg-white" rows={2} placeholder="Any blockers?" />
            </div>
            <PhotoUpload />
            <SubmitButton label="Submit Daily Log" />
          </form>
        )}

        {view === 'material' && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Material Name</label>
              <input required type="text" className="w-full p-4 rounded-xl border border-slate-200 bg-white" placeholder="e.g. Portland Cement" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
              <input required type="text" className="w-full p-4 rounded-xl border border-slate-200 bg-white" placeholder="e.g. 500 Bags" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Supplier</label>
              <input type="text" className="w-full p-4 rounded-xl border border-slate-200 bg-white" placeholder="Company name" />
            </div>
            <PhotoUpload />
            <SubmitButton label="Log Delivery" />
          </form>
        )}

        {view === 'inspection' && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Inspection Type</label>
              <select className="w-full p-4 rounded-xl border border-slate-200 bg-white appearance-none">
                <option>Safety Audit</option>
                <option>Quality Control</option>
                <option>Environmental</option>
                <option>Scaffolding</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Result</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input type="radio" name="result" value="pass" className="peer hidden" defaultChecked />
                  <div className="p-4 text-center rounded-xl border border-slate-200 bg-white peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:border-emerald-500 font-bold">PASS</div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="result" value="fail" className="peer hidden" />
                  <div className="p-4 text-center rounded-xl border border-slate-200 bg-white peer-checked:bg-red-500 peer-checked:text-white peer-checked:border-red-500 font-bold">FAIL</div>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Remarks</label>
              <textarea className="w-full p-4 rounded-xl border border-slate-200 bg-white" rows={3} placeholder="Observations..." />
            </div>
            <PhotoUpload />
            <SubmitButton label="Save Inspection" />
          </form>
        )}
      </main>
    </div>
  );
};

const PhotoUpload = () => (
  <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400">
    <Camera className="w-10 h-10 mb-2" />
    <span className="text-sm font-bold">Capture Site Photo</span>
    <input type="file" accept="image/*" capture="environment" className="opacity-0 absolute inset-0 cursor-pointer" />
  </div>
);

const SubmitButton = ({ label }: { label: string }) => (
  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl active:scale-95 transition-all">
    {label}
  </button>
);

export default App;