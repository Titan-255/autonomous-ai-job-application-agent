import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  PieChart,
  Target,
  FileText,
  Send
} from 'lucide-react';
import { AnalyticsData } from '../types';
import { api } from '../services/api';
import { MetricCard } from '../components/MetricCard';

export const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await api.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return null;

  const funnelSteps = [
    { label: 'Discovered', value: analytics.total_jobs_discovered, color: 'bg-blue-500' },
    { label: 'Shortlisted', value: analytics.applications_shortlisted, color: 'bg-indigo-500' },
    { label: 'Resumes Ready', value: analytics.resumes_generated, color: 'bg-purple-500' },
    { label: 'Applications Ready', value: analytics.applications_ready, color: 'bg-cyan-500' },
    { label: 'Submitted', value: analytics.applications_submitted, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/20 to-slate-900 border border-blue-800/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-extrabold text-white">Application Funnel & Performance Analytics</h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-time conversion metrics, match distributions, and role-category intelligence.
          </p>
        </div>
      </div>

      {/* Top Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Fit"
          value={`${analytics.average_match_score}%`}
          subtitle="Mean Profile Match"
          icon={TrendingUp}
          color="cyan"
        />
        <MetricCard
          title="Conversion"
          value={analytics.conversion_rate}
          subtitle="Discovered ? Applied"
          icon={Target}
          color="emerald"
        />
        <MetricCard
          title="Prepared"
          value={analytics.applications_ready}
          subtitle="Awaiting Approval"
          icon={Send}
          color="blue"
        />
        <MetricCard
          title="Resumes Created"
          value={analytics.resumes_generated}
          subtitle="ATS Verified PDFs"
          icon={FileText}
          color="purple"
        />
      </div>

      {/* Conversion Funnel Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Application Pipeline Funnel
        </h2>
        <div className="space-y-3">
          {funnelSteps.map((step, idx) => {
            const maxVal = Math.max(1, analytics.total_jobs_discovered);
            const pct = Math.round((step.value / maxVal) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{step.label}</span>
                  <span className="font-bold text-white">{step.value} ({pct}%)</span>
                </div>
                <div className="h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full ${step.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(5, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <PieChart className="w-4 h-4 text-purple-400" />
          Jobs Discovered by Target Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(analytics.category_breakdown || {}).map(([cat, count], idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">{cat.replace(/_/g, ' ')}</p>
                <p className="text-[11px] text-slate-500">Target Role Bucket</p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800/60 text-xs font-bold">
                {count} Jobs
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
