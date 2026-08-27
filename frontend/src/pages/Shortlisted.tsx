import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Send, FileText, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Job } from '../types';
import { api } from '../services/api';
import { JobCard } from '../components/JobCard';

interface ShortlistedProps {
  onViewJob: (job: Job) => void;
  onPrepareJob: (job: Job) => void;
  onGenerateResume: (job: Job) => void;
  onApplyNow: (job: Job) => void;
}

export const Shortlisted: React.FC<ShortlistedProps> = ({
  onViewJob,
  onPrepareJob,
  onGenerateResume,
  onApplyNow
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShortlisted = async () => {
    try {
      setLoading(true);
      const data = await api.getJobs({ min_score: 70 });
      setJobs(data);
    } catch (err) {
      console.error('Failed to load shortlisted jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShortlisted();
  }, []);

  const handleSkip = async (job: Job) => {
    try {
      await api.skipApplication(job.id);
      fetchShortlisted();
    } catch (err) {
      console.error('Skip failed:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/20 to-slate-900 border border-blue-800/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h1 className="text-xl font-extrabold text-white">Shortlisted Opportunities (70%+ Match)</h1>
          </div>
          <p className="text-xs text-slate-400">
            High-scoring jobs with strong technical alignment against your Master CV. Ready for tailored resume generation.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="font-bold text-white text-base mr-1.5">{jobs.length}</span> Highly Compatible Roles
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-2">
          <Star className="w-8 h-8 mx-auto text-slate-600" />
          <p className="text-sm font-semibold text-slate-300">No shortlisted jobs above 70% match yet.</p>
          <p className="text-xs">Run a search in Job Discovery to find high-match positions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetail={onViewJob}
              onPrepare={onPrepareJob}
              onGenerateResume={onGenerateResume}
              onApplyNow={onApplyNow}
              onSkip={handleSkip}
            />
          ))}
        </div>
      )}
    </div>
  );
};
