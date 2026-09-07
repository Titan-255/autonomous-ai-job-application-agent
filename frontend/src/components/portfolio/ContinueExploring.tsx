import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Cpu, Sparkles, Code2, Database, Bot, Layers, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA, ExploreRailItem } from '../../data/portfolioData';

interface ContinueExploringProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const ContinueExploring: React.FC<ContinueExploringProps> = ({ onSelectCategory }) => {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-400" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-rose-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-sky-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleCardClick = (item: ExploreRailItem) => {
    if (onSelectCategory) {
      onSelectCategory(item.id);
    }
    // Also smooth scroll down to relevant section
    const targetSection = item.id === 'ai-ml' || item.id === 'rag-nlp' || item.id === 'generative-ai'
      ? 'ai-universe'
      : item.id === 'software-engineering' || item.id === 'product-dev'
      ? 'projects'
      : 'stack';

    const el = document.getElementById(targetSection);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="explore" className="relative py-16 bg-[#06080e] border-y border-white/[0.04] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rail Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-sm bg-cyan-400" />
              <span>Streaming Rail 01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              CONTINUE EXPLORING
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select a core specialization domain to explore technical architectures and case studies.
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] text-slate-300 hover:text-white transition-colors active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] text-slate-300 hover:text-white transition-colors active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Content Rail */}
        <div
          ref={railRef}
          className="flex space-x-5 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Continue Exploring Rails"
        >
          {PORTFOLIO_DATA.exploreRails.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group relative flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-[#05070a] border border-white/[0.08] hover:border-cyan-500/50 p-5 cursor-pointer snap-start transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/50 flex flex-col justify-between overflow-hidden"
            >
              {/* Dynamic Gradient Glow Backdrop */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                    {item.number}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-white/[0.06] group-hover:scale-110 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-cyan-400 tracking-wide uppercase mb-1">
                  {item.category}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-xs mt-2 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Card Footer: Tech Tags & Explore Trigger */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.05] text-[10px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

              {/* Bottom colored accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: item.accentColor }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
