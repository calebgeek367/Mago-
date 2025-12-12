import React, { useState } from 'react';
import { Menu, Wand2, Youtube, LayoutDashboard, FileText, Tags, Image as ImageIcon, LineChart } from 'lucide-react';
import { ToolId } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTool: ToolId;
  onToolSelect: (tool: ToolId) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTool, onToolSelect }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: ToolId.DASHBOARD, label: 'Painel', icon: LayoutDashboard },
    { id: ToolId.TITLES, label: 'Gerador de Títulos', icon: Youtube },
    { id: ToolId.SCRIPT, label: 'Roteiro Mágico', icon: FileText },
    { id: ToolId.TAGS, label: 'Gerador de Tags', icon: Tags },
    { id: ToolId.THUMBNAIL, label: 'Thumbnails', icon: ImageIcon },
    { id: ToolId.TRENDS, label: 'Tendências', icon: LineChart },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-magic-500 selection:text-white">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 p-6 border-b border-slate-800">
          <div className="bg-gradient-to-br from-magic-500 to-blue-600 p-2 rounded-lg shadow-lg shadow-magic-500/20">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Mago do Tube
          </span>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTool === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onToolSelect(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-magic-600 text-white shadow-lg shadow-magic-500/25' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-magic-400'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm border border-slate-700/50">
            <p className="text-xs text-slate-400 mb-2">Créditos de IA</p>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-magic-500 to-blue-500 h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-right text-magic-300">Ilimitado</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 px-4 md:px-0">
             {/* Breadcrumb or Title could go here */}
          </div>

          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-magic-500 to-pink-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold">
                  MT
                </div>
             </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 relative">
           {/* Background Decoration */}
           <div className="absolute top-0 left-0 w-full h-96 bg-magic-900/10 rounded-full blur-3xl -z-10 transform -translate-y-1/2 pointer-events-none"></div>
           
           <div className="max-w-6xl mx-auto animate-fade-in">
            {children}
           </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
