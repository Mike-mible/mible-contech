import React, { useState } from 'react';
import { WebScreen, UserProfile, UserRole } from '../../types';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './screens/Overview';
import DailyLogsTable from './screens/DailyLogsTable';
import MaterialsTable from './screens/MaterialsTable';
import InspectionsTable from './screens/InspectionsTable';
import Administration from './screens/Administration';
import UserManagement from './screens/UserManagement';
import { AIChat } from '../common/AIChat';
import { ICONS } from '../../constants';

interface Props {
  user: UserProfile;
  onLogout: () => void;
}

const WebDashboard: React.FC<Props> = ({ user, onLogout }) => {
  const [screen, setScreen] = useState<WebScreen>(WebScreen.OVERVIEW);
  const [showAI, setShowAI] = useState(false);

  const renderScreen = () => {
    switch (screen) {
      case WebScreen.OVERVIEW: return <Overview role={user.role} />;
      case WebScreen.DAILY_LOGS: return <DailyLogsTable role={user.role} />;
      case WebScreen.MATERIALS: return <MaterialsTable role={user.role} />;
      case WebScreen.INSPECTIONS: return <InspectionsTable role={user.role} />;
      case WebScreen.USER_MGMT: return <UserManagement />;
      case WebScreen.ADMIN: return <Administration />;
      default: return <Overview role={user.role} />;
    }
  };

  return (
    <div className="flex h-full w-full bg-slate-50 relative overflow-hidden">
      <Sidebar 
        activeScreen={screen} 
        onNavigate={setScreen} 
        userRole={user.role}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header activeScreenName={screen} />
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {renderScreen()}
          </div>
        </main>
      </div>

      <button 
        onClick={() => setShowAI(!showAI)}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-[100] ${
          showAI ? 'bg-slate-900 text-white rotate-90 scale-110' : 'bg-blue-600 text-white hover:scale-105 active:scale-95'
        }`}
      >
        {showAI ? <ICONS.Back className="w-6 h-6 rotate-180" /> : <ICONS.DailyLog className="w-6 h-6" />}
      </button>

      <div className={`fixed bottom-24 right-8 w-[400px] h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-400 transform origin-bottom-right z-[90] ${
        showAI ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
      }`}>
        <AIChat onClose={() => setShowAI(false)} />
      </div>
    </div>
  );
};

export default WebDashboard;