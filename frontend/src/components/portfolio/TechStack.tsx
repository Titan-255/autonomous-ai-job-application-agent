import React, { useState } from 'react';
import { Search, Layers, Cpu, Code2, Database, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, TechItem } from '../../data/portfolioData';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Stack', icon: Layers },
    { id: 'languages', label: 'Languages', icon: Code2 },
    { id: 'ai_ml', label: 'AI / ML & NLP', icon: Cpu },
    { id: 'backend', label: 'Backend & Data', icon: Database },
    { id: 'frontend', label: 'Frontend & UI', icon: Sparkles },
    { id: 'tools', label: 'Tools & DevOps', icon: Wrench },
  ];

  const filteredItems = PORTFOLIO_DATA.techStack.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="stack" className="relative py-24 bg-[#040609] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-950/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-sm bg-cyan-400" />
              <span>Verified Engineering Toolchain</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              THE STACK
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Languages, architectures, AI toolkits, and infrastructure technologies implemented in production and research projects.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-white placeholder-slate-500 text-xs font-mono focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((tech) => (
            <div
              key={tech.name}
              className={`group p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                tech.highlight
                  ? 'bg-slate-900/80 border-cyan-500/30 hover:border-cyan-400/80 shadow-lg shadow-cyan-950/20'
                  : 'bg-slate-950/60 border-white/[0.06] hover:bg-slate-900/40 hover:border-white/[0.12]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    {tech.categoryLabel}
                  </span>
                  {tech.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold">
                      {tech.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {tech.name}
                </h3>

                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Proficiency</span>
                <span className="text-emerald-400 font-medium">{tech.level}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-mono text-xs">
            No technologies matched your search query "{searchQuery}".
          </div>
        )}

      </div>
    </section>
  );
};
