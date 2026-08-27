import React, { useEffect, useState } from 'react';
import {
  Search,
  Sparkles,
  FileText,
  Send,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { JobCard } from '../components/JobCard';
import { Job, AnalyticsData, ResumeRecord } from '../types';
import { api } from '../services/api';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onViewJob: (job: Job) => void;
  onPrepareJob: (job: Job) => void;
  onGenerateResume: (job: Job) => void;
  onApplyNow: (job: Job) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  onViewJob,
  onPrepareJob,
  onGenerateResume,
  onApplyNow
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchingRole, setSearchingRole] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [anData, jobsData] = await Promise.all([
        api.getAnalytics(),
        api.getJobs()
      ]);
      setAnalytics(anData);
      setRecentJobs(jobsData.slice(0, 6));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickSearch = async (roleTitle: string, category: string) => {
    try {
      setSearchingRole(roleTitle);
      await api.searchJobs({
        role_title: roleTitle,
        location: 'Chennai, Tamil Nadu, India',
        experience_level: 'Internship',
        max_results: 10
      });
      await fetchDashboardData();
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setSearchingRole(null);
    }
  };

  const handleSkip = async (job: Job) => {
    try {
      await api.skipApplication(job.id);
      fetchDashboardData();
    } catch (err) {
      console.error('Skip failed:', err);
    }
  };

  const quickRoles = [
    { title: 'AI/ML Intern', cat: 'AI_ML_DOCUMENT_INTELLIGENCE' },
    { title: 'Python Developer Intern', cat: 'PYTHON_DEVELOPER' },
    { title: 'Generative AI Intern', cat: 'GENERATIVE_AI' },
    { title: 'Software Developer Intern', cat: 'SOFTWARE_DEVELOPER' },
    { title: 'Data Analyst Intern', cat: 'DATA_ANALYST' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/20 p-6 sm:p-8 backdrop-blur-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Autonomous AI Job Application Agent
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tarun S</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Targeting 7 specialized role categories with ATS-tailored resumes, semantic skill matching, and human-verified applications for Chennai & Remote opportunities.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('discovery')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              <Search className="w-4 h-4" />
              Find Jobs on Indeed
            </button>
            <button
              onClick={() => onNavigate('resumes')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              <FileText className="w-4 h-4" />
              Inspect 7 Role Resumes
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Jobs Discovered"
          value={analytics?.total_jobs_discovered || 0}
          subtitle="Indeed Search Engine"
          icon={Briefcase}
          color="blue"
          onClick={() => onNavigate('discovery')}
        />
        <MetricCard
          title="Avg Match Score"
          value={`${analytics?.average_match_score || 0}%`}
          subtitle="Semantic Profile Fit"
          icon={TrendingUp}
          color="cyan"
          onClick={() => onNavigate('shortlisted')}
        />
        <MetricCard
          title="Resumes Generated"
          value={analytics?.resumes_generated || 0}
          subtitle="7 Role-Specific PDFs"
          icon={FileText}
          color="purple"
          onClick={() => onNavigate('resumes')}
        />
        <MetricCard
          title="Applications Submitted"
          value={analytics?.applications_submitted || 0}
          subtitle="User-Approved Verified"
          icon={CheckCircle2}
          color="emerald"
          onClick={() => onNavigate('applications')}
        />
      </div>

      {/* Quick Discovery Buttons */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-400" />
            Quick Role Search (Chennai)
          </h2>
          <span className="text-xs text-slate-400">1-Click Automated Scrape</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickRoles.map((qr, idx) => (
            <button
              key={idx}
              disabled={searchingRole !== null}
              onClick={() => handleQuickSearch(qr.title, qr.cat)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700 text-xs font-semibold transition-all disabled:opacity-50"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>{qr.title}</span>
              {searchingRole === qr.title && <span className="animate-spin text-xs">?</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Discovered Jobs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Top Matched Opportunities</h2>
            <p className="text-xs text-slate-400">Scored against your Master CV profile</p>
          </div>
          <button
            onClick={() => onNavigate('discovery')}
            className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            View All ({analytics?.total_jobs_discovered || 0}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentJobs.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs space-y-3">
            <Search className="w-8 h-8 text-slate-600 mx-auto" />
            <p>No jobs discovered yet. Click a quick search button above or launch Indeed search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentJobs.map((job) => (
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
    </div>
  );
};
