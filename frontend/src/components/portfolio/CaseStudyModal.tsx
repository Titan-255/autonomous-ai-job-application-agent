import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles, Layers, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { Project } from '../../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#080c14] border border-white/[0.1] shadow-2xl shadow-cyan-950/60 p-6 sm:p-8 text-slate-100 flex flex-col space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header / Close Button */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-white/[0.08] text-slate-300 text-xs font-mono">
                {project.year}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                {project.rating}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.name}
            </h2>
            <p className="text-slate-400 text-sm mt-1">{project.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/[0.08] transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deep Dive Grid */}
        <div className="space-y-6">
          
          {/* Executive Overview */}
          <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-4 sm:p-5">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Overview</span>
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Problem Solved */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-4 sm:p-5">
              <h3 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Problem Statement</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{project.problemSolved}</p>
            </div>

            <div className="rounded-xl bg-slate-900/40 border border-white/[0.06] p-4 sm:p-5">
              <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Impact & Delivery</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.impact || "Validated engineering solution designed for production stability, low query overhead, and modular expansion."}
              </p>
            </div>
          </div>

          {/* Key Features List */}
          <div>
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Key Features & Engineering Highlights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/50 border border-white/[0.04] text-xs text-slate-300 flex items-start space-x-2.5"
                >
                  <span className="font-mono text-cyan-400 font-bold text-[11px] pt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Architecture Flow */}
          {project.architecture && (
            <div className="rounded-xl bg-slate-950/80 border border-cyan-500/20 p-4 sm:p-5">
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Architectural Pipeline Flow</span>
              </h3>
              <div className="space-y-2 font-mono text-xs text-slate-300">
                {project.architecture.map((step, i) => (
                  <div key={i} className="flex items-center space-x-3 p-2 rounded bg-slate-900/60 border border-white/[0.04]">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px] border border-cyan-500/30">
                      {i + 1}
                    </span>
                    <span className="text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="border-t border-white/[0.08] pt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400">
            Verified implementation by Tarun S
          </div>
          
          <div className="flex items-center space-x-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.1] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Repository</span>
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold tracking-wide transition-colors"
            >
              Close Case Study
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
