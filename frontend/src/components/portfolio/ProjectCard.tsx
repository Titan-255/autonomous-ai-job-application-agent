import React from 'react';
import { Play, ExternalLink, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { Project } from '../../data/portfolioData';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy }) => {
  return (
    <div className="group relative rounded-2xl bg-gradient-to-b from-[#0e1320]/90 via-[#0a0d16]/95 to-[#06080e] border border-white/[0.08] hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-950/40 overflow-hidden">
      
      {/* Top Ambient Glow & Streaming Metadata */}
      <div className="relative z-10 flex flex-col space-y-4">
        
        {/* Category & Rating Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-medium">
              {project.category}
            </span>
            {project.badge && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono">
                {project.badge}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5 font-mono text-[11px] text-emerald-400 font-semibold bg-emerald-950/30 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{project.rating || `${project.matchScore}% Match`}</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-200 transition-colors tracking-tight">
            {project.name}
          </h3>
          <p className="text-cyan-400/80 text-xs font-mono mt-1 line-clamp-1">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Problem Solved Highlight Box */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.04] text-xs text-slate-400">
          <span className="font-mono text-cyan-400 font-semibold text-[11px] block mb-1">
            CORE CHALLENGE SOLVED:
          </span>
          <p className="line-clamp-2 text-slate-300 text-xs">{project.problemSolved}</p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-slate-300 group-hover:border-cyan-500/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>

      {/* Card Actions Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-semibold text-xs transition-all active:scale-95"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Case Study</span>
        </button>

        <div className="flex items-center space-x-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/[0.06] transition-colors"
            aria-label={`${project.name} GitHub Repository`}
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <button
            onClick={() => onOpenCaseStudy(project)}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-white/[0.06] transition-colors"
            aria-label={`View ${project.name} Details`}
          >
            <Play className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Decorative gradient overlay on hover */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
