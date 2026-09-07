import React from 'react';
import { Mail, FileText, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020306] border-t border-white/[0.06] py-14 overflow-hidden text-slate-400 text-xs">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-white font-extrabold text-sm tracking-widest uppercase">
              {PORTFOLIO_DATA.personalInfo.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-[11px] font-mono text-cyan-400">PORTFOLIO</span>
          </div>
          <p className="text-slate-400 text-[11px] font-mono">
            AI/ML • SOFTWARE ENGINEERING • PRODUCT DEVELOPMENT
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
          <a
            href={PORTFOLIO_DATA.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={PORTFOLIO_DATA.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`mailto:${PORTFOLIO_DATA.personalInfo.email}`}
            className="hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <a
            href="#resume"
            className="hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="flex items-center space-x-4">
          <span className="text-slate-400 font-mono text-[11px]">
            © 2026 {PORTFOLIO_DATA.personalInfo.name}. All rights reserved.
          </span>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/[0.06] transition-colors"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
