
import React, { useState, useEffect } from 'react';
import { ICONS } from '../../../constants';
import { testConnection, TableStatus } from '../../../lib/supabase';

const Administration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'schema' | 'settings'>('users');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [dbHealth, setDbHealth] = useState<{fullSync: boolean, status: TableStatus} | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const SCHEMA_SQL = `-- ConTech Robust Relational Schema
-- 1. Profiles (Staff Management)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'Site Staff',
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Projects (Central Entity)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'active',
  manager_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Daily Logs (Time-Series Activity)
CREATE TABLE IF NOT EXISTS daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  log_date DATE DEFAULT CURRENT_DATE,
  weather TEXT,
  temp TEXT,
  manpower INTEGER DEFAULT 0,
  activities JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'pending',
  -- Ensures only one log per project per day
  UNIQUE(project_id, log_date)
);

-- 4. Materials (Inventory Tracking)
CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  supplier TEXT,
  item_name TEXT NOT NULL,
  quantity TEXT,
  received_by UUID REFERENCES profiles(id),
  received_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Inspections (Quality & Safety)
CREATE TABLE IF NOT EXISTS inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  inspector_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  zone_name TEXT,
  audit_type TEXT,
  score INTEGER,
  status TEXT DEFAULT 'scheduled',
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;`;

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    const res = await testConnection();
    // Fix: Access fullSync and status which are now returned by testConnection
    setDbHealth({ 
      fullSync: res.fullSync ?? false, 
      status: res.status ?? {} 
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SCHEMA_SQL);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (showProjectForm) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setShowProjectForm(false)}
            className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 transition-colors border border-transparent hover:border-slate-200"
          >
            <ICONS.Back className="w-6 h-6" />
          </button>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Create New Project</h3>
            <p className="text-slate-500 text-sm">Initialize a new construction site in the system.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowProjectForm(false); }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Skyline Tower Phase B"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location Address</label>
                <div className="relative">
                  <ICONS.Map className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Street, City, Sector"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Start Date</label>
                <div className="relative">
                  <ICONS.Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assigned Project Manager</label>
                <div className="relative">
                  <ICONS.Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none">
                    <option>Select a manager...</option>
                    <option>John Doe</option>
                    <option>Sarah Smith</option>
                    <option>Mike Ross</option>
                    <option>Emily White</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => setShowProjectForm(false)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Administration</h2>
          <p className="text-slate-500 text-sm">Manage projects, users, and system integration.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${dbHealth?.fullSync ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 animate-pulse'}`}></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Sync: {dbHealth?.fullSync ? 'Complete' : 'Schema Missing'}
            </span>
          </div>
          <button 
            onClick={checkHealth}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ICONS.Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 w-fit">
        {[
          { id: 'users', label: 'Team Directory', icon: ICONS.Users },
          { id: 'schema', label: 'Database Schema', icon: ICONS.Project },
          { id: 'settings', label: 'Settings', icon: ICONS.Admin },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'schema' && (
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
                >
                  {copySuccess ? <ICONS.Success className="w-3.5 h-3.5 text-emerald-500" /> : <ICONS.DailyLog className="w-3.5 h-3.5" />}
                  {copySuccess ? 'Copied' : 'Copy SQL'}
                </button>
              </div>
              <pre className="p-6 text-[13px] font-mono text-blue-300 leading-relaxed overflow-x-auto max-h-[500px]">
                {SCHEMA_SQL}
              </pre>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
                <ICONS.Warning className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-blue-900 font-bold mb-1">Keys to a Robust Schema</h4>
                <p className="text-blue-700/70 text-sm leading-relaxed">
                  The SQL above uses UUIDs as Primary Keys (PK) for global uniqueness and Foreign Keys (FK) to enforce data relationships. For example, a daily log cannot exist without a valid Project ID.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="text-sm font-bold text-slate-800 mb-6">Table Verification</h4>
              <div className="space-y-4">
                {dbHealth?.status && Object.entries(dbHealth.status).map(([table, exists]) => (
                  <div key={table} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${exists ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                      <span className="text-sm font-medium text-slate-600 capitalize">{table.replace('_', ' ')}</span>
                    </div>
                    {exists ? (
                      <ICONS.Success className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ICONS.Error className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                ))}
              </div>
              <button 
                onClick={checkHealth}
                className="w-full mt-8 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs py-3 rounded-xl transition-colors border border-slate-100"
              >
                Refresh Status
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Team Members</h3>
              <p className="text-slate-500 text-sm">Managing 24 active site staff members.</p>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
              Add Staff
            </button>
          </div>
          <div className="p-8 grid grid-cols-2 gap-6">
            {[
              { name: 'John Doe', role: 'Project Director', projects: 4, email: 'j.doe@buildsupervise.com' },
              { name: 'Sarah Smith', role: 'Site Engineer', projects: 2, email: 's.smith@buildsupervise.com' },
              { name: 'Mike Ross', role: 'Safety Officer', projects: 8, email: 'm.ross@buildsupervise.com' },
              { name: 'Emily White', role: 'Logistics Manager', projects: 12, email: 'e.white@buildsupervise.com' },
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800">{user.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{user.role}</p>
                  <p className="text-[10px] text-blue-600 mt-1">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Assigned Sites</span>
                  <span className="text-lg font-bold text-slate-700">{user.projects}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-8 pb-8 text-center">
             <button className="text-blue-600 font-bold text-sm hover:underline">View all staff directory</button>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-6">System Configuration</h3>
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
              <input type="text" defaultValue="ConTech Enterprise" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="pt-4">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold">Update Settings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administration;
