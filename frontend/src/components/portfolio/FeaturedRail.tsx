import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { Sparkles, Filter, Grid } from 'lucide-react';

interface FeaturedRailProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const FeaturedRail: React.FC<FeaturedRailProps> = ({ onOpenCaseStudy }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'AI / ML & RAG', label: 'AI / ML & RAG' },
    { id: 'Automation & NLP', label: 'Automation & NLP' },
    { id: 'Fintech & Data', label: 'Fintech & Data' },
    { id: 'Full Stack & Backend', label: 'Full Stack & Backend' }
  ];

  const filteredProjects = selectedFilter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedFilter);

  return (
    <section id="projects" className="relative py-20 bg-[#05070a] overflow-hidden">
      
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-sm bg-cyan-400" />
              <span>Production Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              FEATURED PROJECTS
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Things I've built, experimented with, and learned from.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                  selectedFilter === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>

        {/* Bottom Verification Note */}
        <div className="mt-12 text-center text-xs font-mono text-slate-400">
          All projects reflect Tarun S's verified development repository and codebase architecture.
        </div>

      </div>
    </section>
  );
};
