
import React, { useState, useEffect } from 'react';
import WebDashboard from './components/web/WebDashboard';
import Auth from './components/web/screens/Auth';
import { UserProfile, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('cjic_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleAuthComplete = (roleId: string) => {
    // Map internal role selection to full enterprise roles
    const roleMap: Record<string, UserRole> = {
      'admin': UserRole.ADMIN,
      'manager': UserRole.PROJECT_MANAGER,
      'inspector': UserRole.SITE_INSPECTOR,
      'pm': UserRole.PROJECT_MANAGER,
      'se': UserRole.SITE_ENGINEER,
      'hr': UserRole.HR_OFFICER,
      'safety': UserRole.SAFETY_OFFICER,
      'foreman': UserRole.FOREMAN,
      'store': UserRole.STORE_KEEPER,
      'procurement': UserRole.PROCUREMENT_OFFICER
    };

    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      fullName: roleId === 'admin' ? 'CJIC Administrator' : 'CJIC Staff Member',
      email: 'staff@cjic-construction.com',
      role: roleMap[roleId] || UserRole.FOREMAN,
      projectId: '1' // Defaulting to first project for mock purposes
    };
    
    setUser(newUser);
    localStorage.setItem('cjic_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cjic_user');
  };

  if (!user) {
    return <Auth onAuthComplete={handleAuthComplete} />;
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      <WebDashboard user={user} onLogout={handleLogout} />
    </div>
  );
};

export default App;
