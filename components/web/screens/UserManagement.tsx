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

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Invitation sent to ${inviteData.email} as ${inviteData.role}`);
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Team Onboarding</h2>
          <p className="text-slate-500">Manage site access and role assignments for the project.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          <ICONS.Plus className="w-5 h-5" /> New Site Staff
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Active Directory</h3>
          <div className="flex gap-4">
             <div className="relative">
                <ICONS.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input placeholder="Search name..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm w-64" />
             </div>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { name: 'David Zhang', role: UserRole.FOREMAN, project: 'Skyline Tower', status: 'Active' },
              { name: 'Sarah Miller', role: UserRole.SAFETY_OFFICER, project: 'Riverview Apts', status: 'Active' },
              { name: 'Ken Wong', role: UserRole.STORE_KEEPER, project: 'Skyline Tower', status: 'Pending Invite' },
              { name: 'Lucy Chen', role: UserRole.HR_OFFICER, project: 'Metropolis Mall', status: 'Active' },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-bold text-slate-700">{user.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-wider">
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm text-slate-500 font-medium">{user.project}</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                    <span className="text-xs font-bold text-slate-600">{user.status}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ICONS.Admin className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Onboard New Staff</h3>
              <p className="text-slate-500 mb-8">This user will receive an email to set their password.</p>
              
              <form onSubmit={handleInvite} className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input 
                      required
                      className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10" 
                      placeholder="e.g. Michael Jordan"
                      onChange={e => setInviteData({...inviteData, name: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Work Email</label>
                    <input 
                      required
                      type="email"
                      className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10" 
                      placeholder="name@cjic.com"
                      onChange={e => setInviteData({...inviteData, email: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assigned Role</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 appearance-none"
                          onChange={e => setInviteData({...inviteData, role: e.target.value as any})}
                        >
                          {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Project</label>
                        <select className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 appearance-none">
                          <option value="1">Skyline Tower</option>
                          <option value="2">Riverview Apts</option>
                        </select>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-6">
                    <button 
                      type="button"
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                    >
                      SEND INVITATION
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