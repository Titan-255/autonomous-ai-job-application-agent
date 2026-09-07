import React from 'react';
import { Play, Download, Sparkles, ArrowRight, Terminal, ShieldCheck, MapPin } from 'lucide-react';
import { Hero3D } from './Hero3D';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#04060a] pt-24 pb-16 lg:py-0"
    >
      {/* 3D Interactive Canvas in Background */}
      <Hero3D />

      {/* Cinematic Ambient Gradient Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Cinematic Headline & Content */}
          <div className="lg:col-span-8 flex flex-col space-y-6 sm:space-y-8">
            
            {/* Top Metadata & Category Pill */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium tracking-wider backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="w-1.5 h-1.5 -ml-2 rounded-full bg-cyan-400" />
                <span>{PORTFOLIO_DATA.personalInfo.eyebrow}</span>
              </div>

              <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/[0.08] text-slate-300 text-xs font-mono">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{PORTFOLIO_DATA.personalInfo.location}</span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/[0.08] text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-3 h-3" />
                <span>Open for 2025/2026 Opportunities</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  {PORTFOLIO_DATA.personalInfo.heroHeadline}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-cyan-400/90 max-w-2xl leading-snug tracking-tight">
                {PORTFOLIO_DATA.personalInfo.heroSubhead}
              </p>
            </div>

            {/* Supporting Description */}
            <p className="text-slate-300 sm:text-lg text-base max-w-2xl font-normal leading-relaxed text-balance">
              {PORTFOLIO_DATA.personalInfo.heroDescription}
            </p>

            {/* Cinematic Live Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 max-w-xl">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-mono">CORE TRACK</div>
                <div className="text-sm font-bold text-white mt-0.5">AI / ML & Python</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-mono">INSTITUTION</div>
                <div className="text-sm font-bold text-white mt-0.5">Amrita Univ</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-mono">SPECIALTY</div>
                <div className="text-sm font-bold text-cyan-300 mt-0.5">RAG & ChromaDB</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-mono">STATUS</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">3rd Year CS</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA: View My Work */}
              <button
                onClick={() => handleScrollTo('projects')}
                className="group relative inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-white/10 hover:bg-slate-100 hover:shadow-cyan-500/25 transition-all duration-300 active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>VIEW MY WORK</span>
              </button>

              {/* Secondary CTA: Download Resume */}
              <button
                onClick={() => {
                  if (onOpenResumeModal) {
                    onOpenResumeModal();
                  } else {
                    handleScrollTo('resume');
                  }
                }}
                className="inline-flex items-center space-x-2.5 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/[0.12] hover:border-cyan-500/50 text-slate-100 font-semibold text-sm tracking-wide transition-all duration-300 active:scale-95 backdrop-blur-md"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>DOWNLOAD RESUME</span>
              </button>

              {/* Third Subtle Action: Let's Connect */}
              <button
                onClick={() => handleScrollTo('contact')}
                className="inline-flex items-center space-x-1.5 px-4 py-3.5 rounded-xl text-slate-400 hover:text-cyan-300 font-medium text-sm tracking-wide hover:bg-white/[0.04] transition-colors group"
              >
                <span>LET'S CONNECT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Floating Terminal / Interactive Hologram Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-[#05070a]/95 border border-white/[0.1] p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl relative overflow-hidden group">
              
              {/* Top Terminal Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] font-mono text-cyan-400/80">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>tarun_s_core.py</span>
                </div>
              </div>

              {/* Terminal Code Preview */}
              <div className="font-mono text-xs space-y-2 text-slate-300">
                <div className="text-slate-400">// Intelligent System Initialization</div>
                <div>
                  <span className="text-purple-400">class</span>{' '}
                  <span className="text-cyan-300 font-bold">TarunS</span>(
                  <span className="text-emerald-400">AIBuilder</span>):
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-blue-400">focus</span> = [
                  <span className="text-amber-300">"RAG"</span>,{' '}
                  <span className="text-amber-300">"NLP"</span>,{' '}
                  <span className="text-amber-300">"FastAPI"</span>]
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-blue-400">vector_db</span> ={' '}
                  <span className="text-cyan-300">ChromaDB()</span>
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-blue-400">speech_model</span> ={' '}
                  <span className="text-cyan-300">WhisperSTT()</span>
                </div>
                <div className="pl-4 text-slate-300">
                  <span className="text-purple-400">async def</span>{' '}
                  <span className="text-emerald-300">solve_problem</span>(problem):
                </div>
                <div className="pl-8 text-slate-300">
                  <span className="text-purple-400">return</span> context_augmented(problem)
                </div>
              </div>

              {/* Status footer pill */}
              <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-mono text-[11px]">System Online</span>
                </div>
                <span className="text-slate-400 text-[11px] font-mono">v3.0.26 Production</span>
              </div>

              {/* Subtle background glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom subtle scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 text-slate-400 cursor-pointer hover:text-white transition-colors"
        onClick={() => handleScrollTo('explore')}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Explore Rails</span>
        <div className="w-4 h-6 rounded-full border border-slate-700 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
