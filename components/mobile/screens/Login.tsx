
import React from 'react';
import { ICONS } from '../../../constants';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="flex flex-col h-full bg-white px-8 pt-20">
      <div className="flex flex-col items-center mb-12">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <ICONS.Project className="text-white w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">ConTech</h1>
        <p className="text-slate-500 font-medium">Enterprise Site Management</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 block">Staff ID</label>
          <input 
            type="text" 
            placeholder="e.g. EMP-2401"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1 block">Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <button 
          onClick={onLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md shadow-blue-200 transition-colors mt-4"
        >
          Sign In
        </button>
      </div>

      <div className="mt-auto pb-10 flex flex-col items-center">
        <p className="text-slate-400 text-xs mb-4">Secured by ConTech Auth</p>
        <button className="text-blue-600 font-semibold text-sm">Trouble signing in?</button>
      </div>
    </div>
  );
};

// Fix: Add missing default export
export default Login;
