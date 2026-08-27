import React from 'react';
import { Play, AlertTriangle } from 'lucide-react';
import { AutomationStatus } from '../types';

interface AutomationBannerProps {
  status: AutomationStatus | null;
  onResume: () => void;
}

export const AutomationBanner: React.FC<AutomationBannerProps> = ({ status, onResume }) => {
  if (!status || !status.requires_user_action) return null;

  return (
    <div className="bg-amber-950/80 border-b border-amber-800/80 px-4 py-3 text-amber-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40">
            <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-bold">{status.current_action || 'Manual Action Required'}</p>
            <p className="text-[11px] text-amber-300/80">
              {status.user_message || 'Please complete verification or authentication in the browser window.'}
            </p>
          </div>
        </div>

        <button
          onClick={onResume}
          className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>I have completed login / verification & Resume</span>
        </button>
      </div>
    </div>
  );
};
