import React from 'react';
import {
  LayoutDashboard,
  Search,
  Star,
  FileText,
  Send,
  UserCheck,
  BarChart3,
  Settings as SettingsIcon,
  Octagon
} from 'lucide-react';
import { AutomationStatus } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  automationStatus: AutomationStatus | null;
  onStopAutomation: () => void;
  onToggleDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  automationStatus,
  onStopAutomation,
  onToggleDemo
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discovery', label: 'Job Discovery', icon: Search },
    { id: 'shortlisted', label: 'Shortlisted', icon: Star },
    { id: 'applications', label: 'Applications', icon: Send },
    { id: 'resumes', label: 'Resume Manager', icon: FileText },
    { id: 'profile', label: 'Master CV', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                ApplyAI <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Autonomous</span>
              </span>
              <p className="text-[11px] text-slate-400">Tarun S ? Career Intelligence</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={onToggleDemo}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${
                automationStatus?.demo_mode
                  ? 'bg-purple-950/60 text-purple-300 border-purple-800/60 hover:bg-purple-900/60'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {automationStatus?.demo_mode ? '? DEMO MODE' : '?? PLAYWRIGHT'}
            </button>

            <div className="flex items-center space-x-2 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60 text-xs">
              <span className={`w-2 h-2 rounded-full ${automationStatus?.status === 'RUNNING' ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-slate-300 text-[11px] font-medium">
                {automationStatus?.status || 'IDLE'}
              </span>
            </div>

            <button
              onClick={onStopAutomation}
              className="flex items-center space-x-1 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md shadow-rose-600/20 transition-all"
            >
              <Octagon className="w-3 h-3 fill-current" />
              <span>STOP</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
