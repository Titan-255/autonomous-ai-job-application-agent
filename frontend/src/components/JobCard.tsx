import React from 'react';
import {
  Building2,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  Send,
  ExternalLink
} from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onViewDetail: (job: Job) => void;
  onPrepare: (job: Job) => void;
  onGenerateResume: (job: Job) => void;
  onApplyNow: (job: Job) => void;
  onSkip: (job: Job) => void;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewDetail,
  onPrepare,
  onGenerateResume,
  onApplyNow,
  onSkip,
  isSelected = false,
  onToggleSelect
}) => {
  const match = job.match;
  const score = match?.overall_score || 0;

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    if (score >= 75) return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    if (score >= 60) return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    return 'bg-slate-700/40 text-slate-400 border-slate-600/40';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'APPLICATION_READY':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 animate-pulse';
      case 'RESUME_GENERATED':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'SHORTLISTED':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'SKIPPED':
        return 'bg-slate-700/40 text-slate-400 border-slate-600/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className={`group relative rounded-2xl bg-slate-900/70 border p-4 sm:p-5 transition-all duration-200 hover:border-slate-700 hover:shadow-xl ${
      isSelected ? 'border-blue-500/60 bg-blue-950/10' : 'border-slate-800'
    }`}>
      <div className="flex items-start justify-between gap-4">
        {onToggleSelect && (
          <div className="pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getScoreBadge(score)}`}>
              {score}% Match
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${getStatusBadge(job.application_status)}`}>
              {job.application_status.replace('_', ' ')}
            </span>
            {job.target_role_category && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                {job.target_role_category.replace(/_/g, ' ')}
              </span>
            )}
            <span className="text-[11px] text-slate-400 ml-auto flex items-center gap-1">
              <Clock className="w-3 h-3" /> {job.posted_date || 'Recent'}
            </span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 mt-1">
            <span className="flex items-center gap-1 font-semibold text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              {job.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {job.location}
            </span>
            {job.salary && (
              <span className="text-emerald-400 font-medium bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                {job.salary}
              </span>
            )}
          </div>

          {match && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {match.matched_skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-800/40"
                >
                  ? {skill}
                </span>
              ))}
              {match.missing_skills.slice(0, 2).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/60 text-slate-400 border border-slate-700/60"
                >
                  ? {skill}
                </span>
              ))}
            </div>
          )}

          {match?.match_reasoning && (
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
              ?? {match.match_reasoning}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetail(job)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            View Details
          </button>
          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Open on Indeed"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          {job.application_status === 'DISCOVERED' && (
            <button
              onClick={() => onGenerateResume(job)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-600/20"
            >
              <FileText className="w-3.5 h-3.5" />
              Generate Resume
            </button>
          )}

          {(job.application_status === 'SHORTLISTED' || job.application_status === 'RESUME_GENERATED') && (
            <button
              onClick={() => onPrepare(job)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-sm shadow-cyan-600/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Prepare Application
            </button>
          )}

          {job.application_status === 'APPLICATION_READY' && (
            <button
              onClick={() => onApplyNow(job)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white transition-all shadow-md shadow-emerald-600/30 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              APPLY NOW
            </button>
          )}

          {job.application_status === 'SUBMITTED' && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
              <CheckCircle2 className="w-3.5 h-3.5" /> Submitted
            </span>
          )}

          {job.application_status !== 'SUBMITTED' && job.application_status !== 'SKIPPED' && (
            <button
              onClick={() => onSkip(job)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
