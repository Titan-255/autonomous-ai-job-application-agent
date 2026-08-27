import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import { Application } from '../types';

interface BatchApproveModalProps {
  selectedApps: Application[];
  onClose: () => void;
  onConfirm: (appIds: number[]) => void;
}

export const BatchApproveModal: React.FC<BatchApproveModalProps> = ({
  selectedApps,
  onClose,
  onConfirm
}) => {
  const [confirmed, setConfirmed] = useState(false);

  if (selectedApps.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Batch Application Approval</h2>
              <p className="text-xs text-slate-400">Sequential Submission</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-300">
          You are about to approve and submit <strong>{selectedApps.length}</strong> applications.
          Automation stops immediately if CAPTCHA or verification is triggered.
        </div>

        <div className="max-h-48 overflow-y-auto space-y-2 divide-y divide-slate-800/60 text-xs">
          {selectedApps.map((app) => (
            <div key={app.id} className="pt-2 first:pt-0 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-200">{app.job_title}</p>
                <p className="text-slate-400">{app.company} ? {app.location}</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold">
                {app.match_score}%
              </span>
            </div>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0"
          />
          <span>I have reviewed the above applications and confirm batch submission.</span>
        </label>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200"
          >
            Cancel
          </button>
          <button
            disabled={!confirmed}
            onClick={() => onConfirm(selectedApps.map((a) => a.id))}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              confirmed
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            SUBMIT {selectedApps.length} APPLICATIONS
          </button>
        </div>
      </div>
    </div>
  );
};
