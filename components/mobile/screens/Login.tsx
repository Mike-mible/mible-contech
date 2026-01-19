
import React, { useState } from 'react';
import { ICONS } from '../../../constants';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white px-8 pt-20 animate-in fade-in duration-500">
      <div className="flex flex-col items-center mb-12">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <ICONS.Project className="text-white w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">ConTech</h1>
        <p className="text-slate-500 font-medium">Enterprise Site Management</p>
      </div>

      <div className="space-y-4">
        {isRegistering && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 block">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Wick"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        )}
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 block">Work Email</label>
          <input 
            type="email" 
            placeholder="name@company.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
            {!isRegistering && <button className="text-[10px] text-blue-600 font-bold uppercase">Forgot?</button>}
          </div>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        
        <button 
          onClick={onLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md shadow-blue-200 transition-all mt-4 active:scale-95"
        >
          {isRegistering ? 'Create Account' : 'Sign In'}
        </button>

        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">or continue with</span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 border border-slate-200 py-3 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors">
            <div className="w-5 h-5 bg-slate-900 rounded-full mr-2" />
            <span className="text-sm font-bold text-slate-700">Google</span>
          </button>
          <button className="flex-1 border border-slate-200 py-3 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors">
            <div className="w-5 h-5 bg-blue-600 rounded-full mr-2" />
            <span className="text-sm font-bold text-slate-700">Microsoft</span>
          </button>
        </div>
      </div>

      <div className="mt-auto pb-10 text-center">
        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-slate-500 text-sm font-medium"
        >
          {isRegistering ? "Already have an account? " : "New to ConTech? "}
          <span className="text-blue-600 font-bold">{isRegistering ? 'Sign In' : 'Create One'}</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
