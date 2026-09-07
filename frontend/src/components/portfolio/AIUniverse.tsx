import React, { useState } from 'react';
import { Sparkles, Database, Network, Cpu, Mic, Bot, FileText, ArrowRight, Code, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA, AIUniverseCapability, Project } from '../../data/portfolioData';

interface AIUniverseProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const AIUniverse: React.FC<AIUniverseProps> = ({ onOpenCaseStudy }) => {
  const [selectedCapability, setSelectedCapability] = useState<AIUniverseCapability>(
    PORTFOLIO_DATA.aiUniverse[0]
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database': return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Network': return <Network className="w-5 h-5 text-sky-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Mic': return <Mic className="w-5 h-5 text-amber-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-rose-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-purple-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const relatedProject = PORTFOLIO_DATA.projects.find(
    (p) => p.id === selectedCapability.relatedProjectId
  );

  return (
    <section id="ai-universe" className="relative py-24 bg-[#05070c] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Intelligence Core</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI / ML UNIVERSE
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Explore hands-on implementations in dense vector search, RAG pipelines, NLP text analytics, and autonomous agent loops.
          </p>
        </div>

        {/* Interactive Grid & Deep Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Capability Cards Matrix */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO_DATA.aiUniverse.map((item) => {
              const isSelected = selectedCapability.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCapability(item)}
                  onMouseEnter={() => setSelectedCapability(item)}
                  className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500/80 shadow-xl shadow-cyan-950/50 -translate-y-1'
                      : 'bg-slate-950/70 border-white/[0.06] hover:bg-slate-900/50 hover:border-white/[0.15]'
                  } border`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-slate-900 border border-white/[0.06] group-hover:scale-110 transition-transform">
                        {getIcon(item.icon)}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400/80">
                      {item.technologies[0]}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-400'}`} />
                  </div>

                  {/* Active Border Accent */}
                  {isSelected && (
                    <div
                      className="absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl bg-cyan-400 shadow-[0_0_10px_#00f0ff]"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Technical Inspector & Code Sandbox */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900/95 via-[#080d1a]/95 to-[#04060c] border border-cyan-500/30 p-6 sm:p-7 shadow-2xl shadow-cyan-950/40 text-slate-100 flex flex-col space-y-5">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/[0.06] pb-4">
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wide">
                    {selectedCapability.category} Specialization
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                    {selectedCapability.title}
                  </h3>
                </div>

                <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30">
                  {getIcon(selectedCapability.icon)}
                </div>
              </div>

              {/* In-depth Narrative */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {selectedCapability.fullDesc}
              </p>

              {/* Core Concepts */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Key Algorithmic Concepts:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCapability.keyConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-300"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code Snippet / Architecture View */}
              <div className="rounded-xl bg-[#03060c] border border-white/[0.08] p-4 overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/[0.06] pb-2 mb-2">
                  <div className="flex items-center space-x-1.5 text-cyan-400">
                    <Code className="w-3.5 h-3.5" />
                    <span>implementation_logic.py</span>
                  </div>
                  <span>Verified Syntax</span>
                </div>
                <pre className="font-mono text-xs text-slate-300 overflow-x-auto py-1 leading-relaxed scrollbar-none">
                  <code>{selectedCapability.codeSnippet}</code>
                </pre>
              </div>

              {/* Linked Project Highlight */}
              {relatedProject && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-cyan-400 uppercase">
                      Applied In Production:
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {relatedProject.name}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1">
                      {relatedProject.tagline}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenCaseStudy(relatedProject)}
                    className="flex-shrink-0 inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Project</span>
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
