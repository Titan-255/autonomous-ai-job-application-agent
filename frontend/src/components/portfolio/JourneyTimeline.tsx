import React from 'react';
import { GraduationCap, Briefcase, Rocket, Milestone, MapPin, CheckCircle2, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA, JourneyMilestone } from '../../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  const getRoleIcon = (type: JourneyMilestone['roleType']) => {
    switch (type) {
      case 'Education': return <GraduationCap className="w-4 h-4 text-cyan-400" />;
      case 'Startup Experience': return <Briefcase className="w-4 h-4 text-purple-400" />;
      case 'Engineering': return <Rocket className="w-4 h-4 text-rose-400" />;
      case 'Milestone': return <Milestone className="w-4 h-4 text-amber-400" />;
      default: return <GraduationCap className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="journey" className="relative py-24 bg-[#05070a] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic & Industry Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            MY JOURNEY
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Milestones in computer science foundations, startup feature engineering, and autonomous AI system building.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          
          {/* Vertical Center Glow Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent" />

          <div className="space-y-12">
            {PORTFOLIO_DATA.journey.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group`}
                >
                  
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#080c14] border-2 border-cyan-400 shadow-[0_0_12px_#00f0ff] flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                    {getRoleIcon(item.roleType)}
                  </div>

                  {/* Spacer for other side on desktop */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Milestone Card */}
                  <div
                    className={`ml-12 sm:ml-0 w-full sm:w-1/2 ${
                      isEven ? 'sm:pr-10' : 'sm:pl-10'
                    }`}
                  >
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-[#04060a] border border-white/[0.08] hover:border-cyan-500/40 shadow-xl shadow-black/60 transition-all duration-300 hover:-translate-y-1">
                      
                      {/* Period & Role Type Pill */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border font-semibold ${item.badgeColor}`}>
                          {item.period}
                        </span>
                        
                        <div className="flex items-center space-x-1 text-slate-400 text-xs font-mono">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors mt-1">
                        {item.title}
                      </h3>
                      <div className="text-cyan-400/90 text-xs font-mono font-medium mt-0.5">
                        {item.organization}
                      </div>

                      {/* Narrative Description */}
                      <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.04]">
                        {item.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.05] text-[10px] font-mono text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
