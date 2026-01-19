
import React, { useState } from 'react';
import { ICONS } from '../../../constants';

interface Props {
  onComplete: () => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Real-time Field Supervision",
      desc: "Track every milestone, delivery, and safety check as it happens on site.",
      icon: ICONS.Project,
      color: "bg-blue-600"
    },
    {
      title: "AI-Powered Audits",
      desc: "Use Gemini 3 Pro to automatically analyze site photos for safety compliance.",
      icon: ICONS.DailyLog,
      color: "bg-orange-500"
    },
    {
      title: "Seamless Collaboration",
      desc: "Connect field staff with management through unified daily reporting.",
      icon: ICONS.Users,
      color: "bg-emerald-600"
    }
  ];

  const current = slides[step];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <div className={`w-24 h-24 ${current.color} rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl mb-12 animate-in zoom-in duration-500`}>
          <current.icon className="w-12 h-12" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-4 animate-in slide-in-from-bottom-2 duration-500">
          {current.title}
        </h2>
        <p className="text-slate-500 leading-relaxed animate-in slide-in-from-bottom-4 duration-500">
          {current.desc}
        </p>

        <div className="flex gap-2 mt-12">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
      </div>

      <div className="p-10 space-y-4">
        {step < slides.length - 1 ? (
          <div className="flex gap-4">
            <button 
              onClick={onComplete}
              className="flex-1 py-4 text-slate-400 font-bold text-sm"
            >
              Skip
            </button>
            <button 
              onClick={() => setStep(step + 1)}
              className="flex-[2] bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 active:scale-95 transition-all"
            >
              Next
            </button>
          </div>
        ) : (
          <button 
            onClick={onComplete}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 animate-in fade-in slide-in-from-bottom-4 duration-500 active:scale-95 transition-all"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
