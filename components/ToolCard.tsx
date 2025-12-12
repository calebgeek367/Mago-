import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { ToolId } from '../types';

interface ToolCardProps {
  id: ToolId;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: (id: ToolId) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ id, title, description, icon: Icon, color, onClick }) => {
  return (
    <button 
      onClick={() => onClick(id)}
      className="group relative flex flex-col p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 hover:bg-slate-800/80 transition-all duration-300 text-left overflow-hidden shadow-xl"
    >
      <div className={`absolute top-0 right-0 p-32 bg-${color}-500/5 rounded-full blur-3xl group-hover:bg-${color}-500/10 transition-all duration-500`}></div>
      
      <div className={`w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-magic-300 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
      
      <div className="mt-auto flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
        Abrir Ferramenta 
        <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </button>
  );
};

export default ToolCard;
