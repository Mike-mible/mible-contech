
import React, { useState } from 'react';
import { ICONS } from '../../../constants';

const Administration: React.FC = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);

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
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setShowProjectForm(true)}
          className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left hover:border-blue-500 transition-colors group"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ICONS.Project className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Create New Project</h3>
          <p className="text-slate-500 text-sm mt-1">Set up a new site, location, and milestones.</p>
        </button>
        <button className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left hover:border-blue-500 transition-colors group">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <ICONS.Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">User Management</h3>
          <p className="text-slate-500 text-sm mt-1">Assign roles, permissions, and staff IDs.</p>
        </button>
        <button className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left hover:border-blue-500 transition-colors group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <ICONS.Admin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">System Settings</h3>
          <p className="text-slate-500 text-sm mt-1">Configure company-wide defaults and API keys.</p>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Team Members</h3>
          <p className="text-slate-500 text-sm">Managing 24 active site staff members.</p>
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
    </div>
  );
};

export default Administration;
