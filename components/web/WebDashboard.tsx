
import React, { useState } from 'react';
import { WebScreen } from '../../types';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './screens/Overview';
import DailyLogsTable from './screens/DailyLogsTable';
import MaterialsTable from './screens/MaterialsTable';
import InspectionsTable from './screens/InspectionsTable';
import Administration from './screens/Administration';
import Auth from './screens/Auth';
import { AIChat } from '../common/AIChat';
import { ICONS } from '../../constants';

const WebDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState<WebScreen>(WebScreen.OVERVIEW);
  const [showAI, setShowAI] = useState(false);

  const handleAuthComplete = (role: string) => {
    setIsAuthenticated(true);
    setScreen(WebScreen.OVERVIEW);
  };

  const renderScreen = () => {
    switch (screen) {
      case WebScreen.OVERVIEW: return <Overview />;
      case WebScreen.DAILY_LOGS: return <DailyLogsTable />;
      case WebScreen.MATERIALS: return <MaterialsTable />;
      case WebScreen.INSPECTIONS: return <InspectionsTable />;
      case WebScreen.ADMIN: return <Administration />;
      default: return <Overview />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onAuthComplete={handleAuthComplete} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      <Sidebar activeScreen={screen} onNavigate={setScreen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeScreenName={screen} />
        <main className="flex-1 overflow-y-auto p-8">
          {renderScreen()}
        </main>
      </div>

      {/* Floating AI Trigger */}
      <button 
        onClick={() => setShowAI(!showAI)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-[60] ${
          showAI ? 'bg-slate-800 text-white rotate-90' : 'bg-blue-600 text-white hover:scale-110 active:scale-95'
        }`}
      >
        {showAI ? <ICONS.Error className="w-8 h-8" /> : <ICONS.DailyLog className="w-8 h-8" />}
      </button>

      {/* AI Chat Drawer */}
      <div className={`fixed bottom-28 right-8 w-[400px] h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform origin-bottom-right z-[50] ${
        showAI ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-20 pointer-events-none'
      }`}>
        <AIChat onClose={() => setShowAI(false)} />
      </div>
    </div>
  );
};

export default WebDashboard;
