import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Sliders, Play, Save, CheckCircle2 } from 'lucide-react';
import { AutomationStatus } from '../types';
import { api } from '../services/api';

interface SettingsProps {
  automationStatus: AutomationStatus | null;
  onRefreshStatus: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ automationStatus, onRefreshStatus }) => {
  const [minMatchScore, setMinMatchScore] = useState(70);
  const [maxAppsPerSession, setMaxAppsPerSession] = useState(10);
  const [defaultLocation, setDefaultLocation] = useState('Chennai, Tamil Nadu, India');
  const [demoMode, setDemoMode] = useState(automationStatus?.demo_mode ?? true);
  const [saved, setSaved] = useState(false);

  const handleToggleDemo = async () => {
    await api.triggerAutomationAction('TOGGLE_DEMO');
    setDemoMode(!demoMode);
    onRefreshStatus();
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-extrabold text-white">Agent & Automation Settings</h1>
          </div>
          <p className="text-xs text-slate-400">
            Configure search locations, minimum score criteria, browser profile paths, and rate limits.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automation Modes */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" /> Automation Environment
          </h2>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">Demo Simulation Mode</p>
                <p className="text-[11px] text-slate-400">
                  Runs with instant high-fidelity mock data and safe simulated submissions.
                </p>
              </div>
              <button
                onClick={handleToggleDemo}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  demoMode
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {demoMode ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
            <p className="font-bold text-slate-200">Persistent Chromium Profile Directory</p>
            <p className="text-slate-400 font-mono text-[11px] bg-slate-900 p-2 rounded border border-slate-800">
              data/browser_profile/
            </p>
            <p className="text-[11px] text-slate-500">
              Preserves manual login cookies and session tokens without storing plain credentials in source code.
            </p>
          </div>
        </div>

        {/* Rate Limits & Thresholds */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" /> Thresholds & Rate Control
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Default Search Location</label>
              <input
                type="text"
                value={defaultLocation}
                onChange={(e) => setDefaultLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Minimum Auto-Shortlist Match Score: {minMatchScore}%</label>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Max Applications Per Session: {maxAppsPerSession}</label>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={maxAppsPerSession}
                onChange={(e) => setMaxAppsPerSession(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {saved && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Settings Saved
              </span>
            )}
            <button
              onClick={handleSave}
              className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
            >
              <Save className="w-4 h-4" /> Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
