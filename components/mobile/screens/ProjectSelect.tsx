
import React from 'react';
import { MOCK_PROJECTS, ICONS } from '../../../constants';

interface Props {
  onSelect: (id: string) => void;
}

const ProjectSelect: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="h-full flex flex-col pt-12">
      <div className="px-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Select Project</h2>
        <p className="text-slate-500">Choose your assigned site to begin.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-10">
        {MOCK_PROJECTS.map((project) => (
          <button 
            key={project.id}
            onClick={() => onSelect(project.id)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-left hover:border-blue-500 transition-all shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-900">{project.name}</h3>
                <div className="flex items-center text-slate-500 text-xs mt-0.5">
                  <ICONS.Map className="w-3 h-3 mr-1" />
                  {project.location}
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs text-slate-400">Completion</span>
                <span className="text-xs font-bold text-slate-700">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectSelect;
