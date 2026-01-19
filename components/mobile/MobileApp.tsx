
import React, { useState } from 'react';
import { MobileScreen } from '../../types';
import Login from './screens/Login';
import ProjectSelect from './screens/ProjectSelect';
import Dashboard from './screens/Dashboard';
import DailyLog from './screens/DailyLog';
import Materials from './screens/Materials';
import Inspections from './screens/Inspections';
import Reports from './screens/Reports';
import { AIChat } from '../common/AIChat';
import { ICONS } from '../../constants';

const MobileApp: React.FC = () => {
  const [screen, setScreen] = useState<MobileScreen>(MobileScreen.LOGIN);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);

  const navigate = (to: MobileScreen, params?: { projectId?: string }) => {
    if (params?.projectId) setSelectedProjectId(params.projectId);
    setScreen(to);
  };

  const renderScreen = () => {
    switch (screen) {
      case MobileScreen.LOGIN:
        return <Login onLogin={() => navigate(MobileScreen.PROJECT_SELECT)} />;
      case MobileScreen.PROJECT_SELECT:
        return <ProjectSelect onSelect={(id) => navigate(MobileScreen.DASHBOARD, { projectId: id })} />;
      case MobileScreen.DASHBOARD:
        return <Dashboard onNavigate={navigate} projectId={selectedProjectId!} />;
      case MobileScreen.DAILY_LOG:
        return <DailyLog onBack={() => setScreen(MobileScreen.DASHBOARD)} />;
      case MobileScreen.MATERIALS:
        return <Materials onBack={() => setScreen(MobileScreen.DASHBOARD)} />;
      case MobileScreen.INSPECTIONS:
        return <Inspections onBack={() => setScreen(MobileScreen.DASHBOARD)} />;
      case MobileScreen.REPORTS:
        return <Reports onBack={() => setScreen(MobileScreen.DASHBOARD)} />;
      default:
        return <Login onLogin={() => navigate(MobileScreen.PROJECT_SELECT)} />;
    }
  };

  return (
    <div className="h-full w-full bg-slate-50 relative overflow-hidden flex flex-col">
      {/* Device Notch Simulation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-50"></div>
      <div className="flex-1 overflow-hidden relative">
        {renderScreen()}
      </div>

      {screen !== MobileScreen.LOGIN && (
        <button 
          onClick={() => setShowAI(true)}
          className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white z-40 animate-bounce active:scale-95"
        >
          <ICONS.DailyLog className="w-6 h-6" />
        </button>
      )}

      {showAI && (
        <div className="absolute inset-0 z-[100] animate-in slide-in-from-bottom duration-300">
          <AIChat onClose={() => setShowAI(false)} />
        </div>
      )}
    </div>
  );
};

export default MobileApp;
