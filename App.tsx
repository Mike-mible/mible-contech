
import React, { useState } from 'react';
import { Platform, MobileScreen, WebScreen } from './types';
import MobileApp from './components/mobile/MobileApp';
import WebDashboard from './components/web/WebDashboard';

const App: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>(Platform.WEB);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Platform Switcher - Simulation Helper */}
      <div className="fixed top-4 right-4 z-[9999] flex bg-white p-1 rounded-full shadow-lg border border-slate-200">
        <button 
          onClick={() => setPlatform(Platform.MOBILE)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${platform === Platform.MOBILE ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Mobile App
        </button>
        <button 
          onClick={() => setPlatform(Platform.WEB)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${platform === Platform.WEB ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Web Dashboard
        </button>
      </div>

      {platform === Platform.MOBILE ? (
        <div className="flex justify-center items-center flex-1 bg-slate-900 p-4">
          <div className="w-[375px] h-[700px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-slate-800 overflow-hidden relative">
             <MobileApp />
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <WebDashboard />
        </div>
      )}
    </div>
  );
};

export default App;
