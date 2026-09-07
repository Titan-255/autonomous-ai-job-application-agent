import React from 'react';
import { User, Sparkles, Compass, Lightbulb, Shield, Code, GraduationCap, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const { aboutDetails, personalInfo } = PORTFOLIO_DATA;

  return (
    <section id="about" className="relative py-24 bg-[#04060a] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Profile & Engineering Mindset</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            BEHIND THE BUILDER
          </h2>
          <p className="text-cyan-400 text-base sm:text-lg font-medium mt-3 italic">
            "{aboutDetails.quote}"
          </p>
        </div>

        {/* Narrative & Principles Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-slate-900/60 border border-white/[0.08] p-6 sm:p-8 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {aboutDetails.narrative.map((paragraph, index) => (
                <p key={index} className="text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {aboutDetails.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">{stat.label}</div>
                  <div className="text-sm font-bold text-white mt-1">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Core Tenets & Mindset */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              Engineering Principles
            </h3>

            {aboutDetails.philosophies.map((item, idx) => (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#06080e] border border-white/[0.06] hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                    0{idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pl-9">
                  {item.desc}
                </p>
              </div>
            ))}

            {/* Location & Academic Base Card */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-300 font-semibold">Amrita Vishwa Vidyapeetham</div>
                  <div className="text-xs text-slate-400">B.Tech Computer Science & Engineering</div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">Chennai, IN</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
