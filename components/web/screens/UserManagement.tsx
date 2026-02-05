
import React, { useState } from 'react';
import { ICONS } from '../../../constants';
import { UserRole } from '../../../types';

const UserManagement: React.FC = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    role: UserRole.FOREMAN,
    project: '1'
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real scenario, this would call supabase.auth.admin.createUser()
    alert(`Enterprise User Created: ${inviteData.name}\nRole: ${inviteData.role}\nAccess: Project #${inviteData.project}`);
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Staff Management</h2>
          <p className="text-slate-500 font-medium">Control platform access and organizational hierarchy.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 text-sm"
        >
          <ICONS.Plus className="w-5 h-5" /> CREATE NEW USER
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center">
          <div>
             <h3 className="font-bold text-xl text-slate-800">Organization Directory</h3>
             <p className="text-sm text-slate-400 mt-1">Manage 42 site staff and office personnel.</p>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input placeholder="Search name or role..." className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm w-80 focus:ring-2 focus:ring-blue-500/10 focus:outline-none" />
             </div>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Role</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Site</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Status</th>
              <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { name: 'David Zhang', role: UserRole.FOREMAN, project: 'Skyline Tower', status: 'Active' },
              { name: 'Sarah Miller', role: UserRole.SAFETY_OFFICER, project: 'Riverview Apts', status: 'Active' },
              { name: 'Ken Wong', role: UserRole.STORE_KEEPER, project: 'Skyline Tower', status: 'Pending' },
              { name: 'Lucy Chen', role: UserRole.HR_OFFICER, project: 'Metropolis Mall', status: 'Active' },
              { name: 'James Wilson', role: UserRole.PROCUREMENT_OFFICER, project: 'Riverview Apts', status: 'Away' },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors group">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block text-sm">{user.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">EMP-ID: {Math.floor(Math.random() * 9000) + 1000}</span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm">
                    {user.role}
                  </span>
                </td>
                <td className="px-10 py-6">
                  <span className="text-sm text-slate-500 font-bold">{user.project}</span>
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                      user.status === 'Pending' ? 'bg-orange-500 animate-pulse' : 'bg-slate-300'
                    }`}></div>
                    <span className="text-xs font-black text-slate-600 tracking-tight uppercase">{user.status}</span>
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <button className="text-slate-300 hover:text-slate-900 transition-colors p-2 hover:bg-white rounded-xl">
                    <ICONS.Admin className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-8 bg-slate-50/50 flex justify-center">
           <button className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline">Show all 42 employees</button>
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] w-full max-w-xl p-12 shadow-3xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start mb-10">
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Create Site User</h3>
                    <p className="text-slate-400 font-medium mt-1">Assign roles and project permissions immediately.</p>
                 </div>
                 <button onClick={() => setShowInviteModal(false)} className="p-3 bg-slate-50 rounded-2xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                    <ICONS.Error className="w-5 h-5" />
                 </button>
              </div>
              
              <form onSubmit={handleCreateUser} className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Staff Full Name</label>
                        <input 
                          required
                          className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-bold" 
                          placeholder="e.g. Robert Deniro"
                          onChange={e => setInviteData({...inviteData, name: e.target.value})}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Enterprise Email Address</label>
                        <input 
                          required
                          type="email"
                          className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-bold" 
                          placeholder="name@cjic-contech.com"
                          onChange={e => setInviteData({...inviteData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Platform Role</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 appearance-none font-bold text-sm"
                          onChange={e => setInviteData({...inviteData, role: e.target.value as any})}
                        >
                          {Object.values(UserRole).map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Assigned Project</label>
                        <select className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 appearance-none font-bold text-sm">
                          <option value="1">Skyline Tower A</option>
                          <option value="2">Riverview Apts</option>
                          <option value="3">Industrial Hub</option>
                        </select>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button 
                      type="submit"
                      className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-2xl shadow-slate-900/20 active:scale-95 transition-all text-xs tracking-widest"
                    >
                      CONFIRM & CREATE ACCOUNT
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
