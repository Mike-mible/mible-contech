import React, { useState } from 'react';
import { ICONS } from '../../../constants';

interface Props {
  onAuthComplete: (role: string) => void;
}

const Auth: React.FC<Props> = ({ onAuthComplete }) => {
  const [step, setStep] = useState<'login' | 'profile' | 'role'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    company: 'CJIC Construction'
  });

  const nextStep = () => {
    if (step === 'login') setStep('profile');
    else if (step === 'profile') setStep('role');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      {/* Visual Identity Panel */}
      <div className="hidden lg:flex flex-1 bg-slate-900 relative flex-col justify-center p-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-600 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-10 shadow-3xl shadow-blue-600/40">
            <ICONS.Project className="text-white w-10 h-10" />
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            Build Better.<br />
            <span className="text-blue-500">Scale Faster.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-lg mb-12 font-medium">
            Empowering CJIC project teams with real-time site intelligence, AI-driven logistics, and unified reporting.
          </p>

          <div className="flex items-center gap-6">
            <div className="bg-slate-800/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Active Users</p>
              <p className="text-white font-bold text-lg">2,400+</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Project Accuracy</p>
              <p className="text-white font-bold text-lg">99.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Auth/Onboarding Form */}
      <div className="w-full lg:w-[650px] bg-white flex items-center justify-center p-12 lg:p-24 shadow-2xl z-20">
        <div className="w-full max-w-md">
          {step === 'login' && (
            <div className="animate-in slide-in-from-bottom-8 duration-500">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 mb-10">Access the CJIC enterprise site supervision platform.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="name@cjic.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                    <button className="text-[10px] font-black text-blue-600 uppercase">Forgot?</button>
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                  />
                </div>
                <button 
                  onClick={nextStep}
                  className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95"
                >
                  SIGN IN
                </button>
              </div>
            </div>
          )}

          {step === 'profile' && (
            <div className="animate-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Complete Profile</h2>
              <p className="text-slate-500 mb-10">Tell us about your position at CJIC.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Employee ID (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="CJIC-XXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                  />
                </div>
                <button 
                  onClick={nextStep}
                  className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}

          {step === 'role' && (
            <div className="animate-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Select Your Role</h2>
              <p className="text-slate-500 mb-10">This will configure your dashboard tools and access levels.</p>
              
              <div className="space-y-4">
                {[
                  { id: 'admin', label: 'System Administrator', desc: 'Full control over project creation, users, and SQL schema.', icon: ICONS.Admin, color: 'text-slate-900 bg-slate-100' },
                  { id: 'manager', label: 'Project Director', desc: 'Multi-site analytics, approvals, and executive reporting.', icon: ICONS.Dashboard, color: 'text-blue-600 bg-blue-50' },
                  { id: 'inspector', label: 'Quality Auditor', desc: 'Safety checklists, quality logs, and compliance auditing.', icon: ICONS.Inspections, color: 'text-emerald-600 bg-emerald-50' },
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => onAuthComplete(role.id)}
                    className="w-full p-5 rounded-3xl border border-slate-100 hover:border-blue-500 hover:bg-slate-50 transition-all flex items-center gap-5 text-left group"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${role.color}`}>
                      <role.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{role.label}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{role.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;