import React from 'react';
import { Star, GitFork, GitBranch, ArrowUpRight, Terminal, Activity } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const GitHubSection: React.FC = () => {
  const { githubActivity } = PORTFOLIO_DATA;

  return (
    <section id="github" className="relative py-24 bg-[#040609] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open Source & Code Activity</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              WHAT I'M BUILDING
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Public code repositories, experiments in RAG pipelines, and automated agent workflows on GitHub.
            </p>
          </div>

          <a
            href={githubActivity.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.1] text-white text-xs font-semibold tracking-wide transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Visit @{githubActivity.username}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* GitHub Language Breakdown Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-slate-400">Language Ecosystem Distribution</span>
            <span className="text-cyan-400 font-bold">Primary: Python 68%</span>
          </div>

          {/* Progress Multi-Bar */}
          <div className="h-2.5 rounded-full overflow-hidden flex w-full bg-slate-900">
            {githubActivity.topLanguages.map((lang) => (
              <div
                key={lang.name}
                style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-3 pt-2">
            {githubActivity.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center space-x-1.5 text-xs font-mono text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                <span>{lang.name}</span>
                <span className="text-slate-500 font-bold">({lang.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {githubActivity.repositories.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                      {repo.name}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mt-2">
                  {repo.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                  <span className="text-slate-300">{repo.language}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
