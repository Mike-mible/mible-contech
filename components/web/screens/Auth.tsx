
import React, { useState } from 'react';
import { ICONS } from '../../../constants';

interface Props {
  onAuthComplete: (role: string) => void;
}

const Auth: React.FC<Props> = ({ onAuthComplete }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'role_select'>('login');

  const handleRoleSelect = (role: string) => {
    onAuthComplete(role);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 animate-in fade-in duration-700">
      {/* Left Panel: Value Prop */}
      <div className="hidden lg:flex flex-1 bg-slate-900 relative overflow-hidden flex-col justify-center p-20">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/40">
            <ICONS.Project className="text-white w-10 h-10" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight mb-6">
            Digitize Your <br />
            <span className="text-blue-500">Construction</span> <br />
            Supervision.
          </h1>
          <p className="text-slate-400 text-xl max-w-lg mb-12 leading-relaxed">
            From foundation to finishes. Manage every project with AI-assisted logs, inspections, and real-time logistics tracking.
          </p>

          <div className="grid grid-cols-2 gap-8 max-w-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-500">
                <ICONS.Success className="w-6 h-6" />
              </div>
              <p className="text-slate-200 font-bold text-sm">99.9% Site Visibility</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-orange-500">
                <ICONS.DailyLog className="w-6 h-6" />
              </div>
              <p className="text-slate-200 font-bold text-sm">AI Auto-Inspection</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-20">
          <p className="text-slate-500 text-sm font-medium">Trusted by leading contractors worldwide.</p>
        </div>
      </div>

      {/* Right Panel: Auth Forms */}
      <div className="w-full lg:w-[600px] bg-white flex flex-col justify-center p-12 lg:p-24 shadow-2xl z-20">
        <div className="max-w-md w-full mx-auto">
          {mode === 'role_select' ? (
            <div className="animate-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Initialize Profile</h2>
              <p className="text-slate-500 mb-10">Select your primary role to configure your workspace.</p>
              
              <div className="space-y-4">
                {[
                  { id: 'manager', label: 'Project Director', desc: 'Full site visibility and financial reporting.', icon: ICONS.Admin, color: 'text-blue-600 bg-blue-50' },
                  { id: 'supervisor', label: 'Field Supervisor', desc: 'Daily logs, site safety, and team coordination.', icon: ICONS.Project, color: 'text-orange-600 bg-orange-50' },
                  { id: 'inspector', label: 'Quality Auditor', desc: 'Detailed inspections and compliance auditing.', icon: ICONS.Inspections, color: 'text-emerald-600 bg-emerald-50' }
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className="w-full p-5 rounded-3xl border border-slate-100 hover:border-blue-500 hover:bg-slate-50 transition-all flex items-center gap-5 text-left group"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${role.color}`}>
                      <role.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{role.label}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{role.desc}</p>
                    </div>
                    <ICONS.ChevronRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-blue-500 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-bottom-8 duration-500">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-slate-500">
                  {mode === 'login' ? 'Enter your credentials to access the site dashboard.' : 'Start managing your projects for free today.'}
                </p>
              </div>

              <div className="space-y-5">
                {mode === 'signup' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Company Name</label>
                    <input type="text" placeholder="e.g. BuildCorp Int" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" placeholder="john@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                    {mode === 'login' && <button className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Forgot Password?</button>}
                  </div>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" />
                </div>

                <button 
                  onClick={() => setMode(mode === 'login' ? 'login' : 'role_select')} // Simplified flow simulation
                  className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98]"
                >
                  {mode === 'login' ? 'Sign In' : 'Continue'}
                </button>

                <div className="flex items-center gap-4 py-4">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enterprise Access</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 border border-slate-200 py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors">
                    <div className="w-5 h-5 bg-slate-900 rounded-full" />
                    <span className="text-xs font-bold text-slate-700">Google SSO</span>
                  </button>
                  <button className="flex-1 border border-slate-200 py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors">
                    <div className="w-5 h-5 bg-blue-600 rounded-full" />
                    <span className="text-xs font-bold text-slate-700">Azure AD</span>
                  </button>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-slate-500 text-sm">
                  {mode === 'login' ? "Don't have an account yet? " : "Already have an account? "}
                  <button 
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    {mode === 'login' ? 'Join Now' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
