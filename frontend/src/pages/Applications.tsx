import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  Clock,
  FileText,
  Building2,
  MapPin,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Application, Job } from '../types';
import { api } from '../services/api';
import { BatchApproveModal } from '../components/BatchApproveModal';

interface ApplicationsProps {
  onOpenApplication: (app: Application) => void;
  onViewJobDetail: (jobId: number) => void;
}

export const Applications: React.FC<ApplicationsProps> = ({
  onOpenApplication,
  onViewJobDetail
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await api.getApplications(selectedStatus === 'ALL' ? undefined : selectedStatus);
      setApplications(data);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedStatus]);

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === applications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(applications.map((a) => a.id));
    }
  };

  const handleBatchConfirm = async (ids: number[]) => {
    try {
      await api.batchSubmitApplications({ application_ids: ids, confirmed: true });
      setSelectedIds([]);
      setBatchModalOpen(false);
      fetchApplications();
    } catch (err) {
      console.error('Batch submission failed:', err);
    }
  };

  const statusTabs = [
    { id: 'ALL', label: 'All Pipeline' },
    { id: 'APPLICATION_READY', label: 'Ready to Apply' },
    { id: 'RESUME_GENERATED', label: 'Resume Created' },
    { id: 'SHORTLISTED', label: 'Shortlisted' },
    { id: 'SUBMITTED', label: 'Submitted' },
    { id: 'SKIPPED', label: 'Skipped' },
  ];

  const getStatusPill = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60';
      case 'APPLICATION_READY':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60 animate-pulse';
      case 'RESUME_GENERATED':
        return 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60';
      case 'SHORTLISTED':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const selectedAppsList = applications.filter((a) => selectedIds.includes(a.id));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-slate-900 border border-cyan-800/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-extrabold text-white">Application Pipeline & Tracking</h1>
          </div>
          <p className="text-xs text-slate-400">
            Track status, inspect generated applications, and grant single or batch approval.
          </p>
        </div>
        {selectedIds.length > 0 && (
          <button
            onClick={() => setBatchModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            APPROVE BATCH ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
        {statusTabs.map((st) => (
          <button
            key={st.id}
            onClick={() => setSelectedStatus(st.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedStatus === st.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Applications Table / Cards */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedIds.length === applications.length && applications.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-300">Select All ({applications.length})</span>
          </div>
          <button onClick={fetchApplications} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {applications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs space-y-2">
            <Send className="w-8 h-8 mx-auto text-slate-600" />
            <p className="font-semibold text-slate-300">No applications in this state.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(app.id)}
                    onChange={() => handleToggleSelect(app.id)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-950/60 text-blue-400 border border-blue-800/60">
                        {app.match_score}% Fit
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getStatusPill(app.status)}`}>
                        {app.status.replace(/_/g, ' ')}
                      </span>
                      {app.role_category && (
                        <span className="text-[11px] text-slate-500 font-mono">
                          [{app.role_category}]
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                      {app.job_title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-500" /> {app.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" /> {app.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenApplication(app)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Review / Prepare
                  </button>
                  {app.status === 'APPLICATION_READY' && (
                    <button
                      onClick={() => onOpenApplication(app)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      APPLY NOW
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BatchApproveModal
        selectedApps={selectedAppsList}
        onClose={() => setBatchModalOpen(false)}
        onConfirm={handleBatchConfirm}
      />
    </div>
  );
};
