import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, MapPin, Briefcase, SlidersHorizontal } from 'lucide-react';
import { JobCard } from '../components/JobCard';
import { Job } from '../types';
import { api } from '../services/api';

interface JobDiscoveryProps {
  onViewJob: (job: Job) => void;
  onPrepareJob: (job: Job) => void;
  onGenerateResume: (job: Job) => void;
  onApplyNow: (job: Job) => void;
}

export const JobDiscovery: React.FC<JobDiscoveryProps> = ({
  onViewJob,
  onPrepareJob,
  onGenerateResume,
  onApplyNow
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Query state
  const [roleTitle, setRoleTitle] = useState('Python Developer Intern');
  const [location, setLocation] = useState('Chennai, Tamil Nadu, India');
  const [experienceLevel, setExperienceLevel] = useState('Internship');
  const [minScore, setMinScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await api.getJobs({
        category: selectedCategory === 'ALL' ? undefined : selectedCategory,
        min_score: minScore > 0 ? minScore : undefined
      });
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory, minScore]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSearchLoading(true);
      await api.searchJobs({
        role_title: roleTitle,
        location,
        experience_level: experienceLevel,
        max_results: 15
      });
      await fetchJobs();
    } catch (err) {
      console.error('Search run error:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSkip = async (job: Job) => {
    try {
      await api.skipApplication(job.id);
      fetchJobs();
    } catch (err) {
      console.error('Skip error:', err);
    }
  };

  const categories = [
    { id: 'ALL', label: 'All Categories' },
    { id: 'AI_ML_DOCUMENT_INTELLIGENCE', label: 'AI/ML' },
    { id: 'PYTHON_DEVELOPER', label: 'Python Dev' },
    { id: 'GENERATIVE_AI', label: 'Generative AI' },
    { id: 'SOFTWARE_DEVELOPER', label: 'Software Dev' },
    { id: 'DATA_ANALYST', label: 'Data Analyst' },
    { id: 'PRODUCT_DEVELOPER', label: 'Product Dev' },
    { id: 'PRODUCT_SUPPORT', label: 'Product Support' },
  ];

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      searchTerm === '' ||
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search Launcher Box */}
      <form
        onSubmit={handleSearchSubmit}
        className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white">Indeed Job Search Engine</h2>
          </div>
          <span className="text-xs text-slate-400">Playwright & Mock Ready</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Target Role Title
            </label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. AI/ML Intern"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Chennai, India"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Internship">Internship</option>
              <option value="Entry Level / Fresher">Entry Level / Fresher</option>
              <option value="Junior">Junior</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] text-slate-400">
            Automatically deduplicates existing jobs and calculates 0-100 match breakdown.
          </p>
          <button
            type="submit"
            disabled={searchLoading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            {searchLoading ? 'Searching Indeed...' : 'Search Jobs'}
          </button>
        </div>
      </form>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search input & score slider */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Filter by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-white w-44 focus:outline-none"
          />
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Min {minScore}%</span>
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-20 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredJobs.length} Discovered Jobs</span>
          <button onClick={fetchJobs} className="flex items-center gap-1 hover:text-white">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-2">
            <Search className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">No jobs match your criteria.</p>
            <p className="text-xs">Adjust your score slider or run an Indeed search above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
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
