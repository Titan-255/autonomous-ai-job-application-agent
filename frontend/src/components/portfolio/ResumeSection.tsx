import React, { useState } from 'react';
import { 
  FileText, Download, ExternalLink, CheckCircle2, Eye, 
  Briefcase, GraduationCap, Code, Layers, Sparkles, 
  Phone, Mail, MapPin, ArrowUpRight 
} from 'lucide-react';
import { PORTFOLIO_DATA, ResumeTrack } from '../../data/portfolioData';
import { LinkedinIcon } from './BrandIcons';

export const ResumeSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'master' | 'tracks' | 'pdf'>('master');
  const [selectedTrack, setSelectedTrack] = useState<ResumeTrack>(
    PORTFOLIO_DATA.resumeTracks[0]
  );

  const { resumeMaster } = PORTFOLIO_DATA;

  const handleDownload = (pdfUrl: string = '/resumes/Tarun_S_Resume.pdf') => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Tarun_S_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="relative py-24 bg-[#05070a] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-cyan-950/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verified ATS Resume • Ready for Review</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              MY RESUME
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Official verified resume of Tarun S — Computer Science Student, Python Developer, and AI/ML Engineer.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleDownload('/resumes/Tarun_S_Resume.pdf')}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>

            <a
              href="/resumes/Tarun_S_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 p-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.08] transition-colors text-xs font-mono"
              title="Open verified PDF in new tab"
            >
              <span>Open PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center space-x-2 mb-8 bg-slate-950/80 p-1.5 rounded-2xl border border-white/[0.06] max-w-fit">
          <button
            onClick={() => setViewMode('master')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              viewMode === 'master'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            📄 Master ATS Resume
          </button>
          <button
            onClick={() => setViewMode('tracks')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              viewMode === 'tracks'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            🎯 Role-Focused Tracks
          </button>
          <button
            onClick={() => setViewMode('pdf')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
              viewMode === 'pdf'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            🔍 Live PDF Document View
          </button>
        </div>

        {/* 1. MASTER ATS RESUME VIEW */}
        {viewMode === 'master' && (
          <div className="rounded-2xl bg-[#090d16] border border-white/[0.08] p-6 sm:p-12 shadow-2xl shadow-cyan-950/20 transition-all">
            
            {/* Header / Contact Details */}
            <div className="border-b border-white/[0.08] pb-6 mb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {resumeMaster.name}
                </h3>
                <p className="text-cyan-400 text-sm font-mono mt-1 font-semibold">
                  {resumeMaster.title}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  {resumeMaster.phone}
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {resumeMaster.email}
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {resumeMaster.location}
                </span>
                <span className="text-slate-600">•</span>
                <a
                  href={PORTFOLIO_DATA.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-8">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                PROFESSIONAL SUMMARY
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-white/[0.04]">
                {resumeMaster.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mb-8">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                <Code className="w-3.5 h-3.5" />
                TECHNICAL SKILLS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resumeMaster.skills.map((cat, i) => (
                  <div key={i} className="bg-slate-900/40 border border-white/[0.04] p-3.5 rounded-xl">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-bold">
                      {cat.category}:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, si) => (
                        <span key={si} className="text-xs bg-slate-800/70 border border-white/[0.06] text-slate-200 px-2 py-0.5 rounded-md font-sans">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI/ML & Technical Projects */}
            <div className="mb-8">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                AI/ML &amp; TECHNICAL PROJECTS
              </h4>
              <div className="space-y-4">
                {resumeMaster.projects.map((proj, pi) => (
                  <div key={pi} className="bg-slate-900/40 border border-white/[0.04] p-4 sm:p-5 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="text-sm sm:text-base font-bold text-white">
                          {proj.name}
                        </h5>
                        <span className="text-xs text-slate-400 font-sans">— {proj.subtitle}</span>
                      </div>
                      <a 
                        href={proj.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                      >
                        <span>GitHub Repo</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="text-xs font-mono text-cyan-300/80 mb-3">
                      {proj.tech.join(' • ')}
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                      {proj.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" />
                EDUCATION
              </h4>
              <div className="bg-slate-900/40 border border-white/[0.04] p-4 rounded-xl flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h5 className="text-sm font-bold text-white">
                    {resumeMaster.education.degree}
                  </h5>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {resumeMaster.education.institution} | Location: {resumeMaster.education.location}
                  </div>
                </div>
                <div className="text-xs font-mono text-cyan-400 sm:text-right">
                  {resumeMaster.education.yearInfo}
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-400 font-sans px-2">
                <strong className="text-slate-300">Relevant Coursework:</strong> {resumeMaster.education.coursework.join(', ')}
              </div>
            </div>

            {/* Experience & Leadership */}
            <div>
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                EXPERIENCE &amp; LEADERSHIP
              </h4>
              {resumeMaster.experience.map((exp, ei) => (
                <div key={ei} className="bg-slate-900/40 border border-white/[0.04] p-4 sm:p-5 rounded-xl">
                  <div className="flex flex-col sm:flex-row justify-between gap-1 mb-3">
                    <h5 className="text-sm font-bold text-white">
                      {exp.role} — {exp.organization}
                    </h5>
                    <span className="text-xs font-mono text-slate-400">{exp.location}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Download Bar */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                Verified 1-Page PDF Resume available for offline review &amp; ATS indexing
              </div>
              <button
                onClick={() => handleDownload('/resumes/Tarun_S_Resume.pdf')}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Tarun_S_Resume.pdf</span>
              </button>
            </div>

          </div>
        )}

        {/* 2. ROLE-FOCUSED TRACKS VIEW */}
        {viewMode === 'tracks' && (
          <div>
            {/* Track Selector Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {PORTFOLIO_DATA.resumeTracks.map((track) => {
                const isSelected = selectedTrack.id === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedTrack(track)}
                    className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 text-white'
                        : 'bg-slate-950/70 border-white/[0.06] text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                      {track.focus}
                    </div>
                    <div className="text-xs sm:text-sm font-bold tracking-tight">
                      {track.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Resume Preview Sheet */}
            <div className="rounded-2xl bg-gradient-to-b from-[#080d1a] via-[#05070e] to-[#03050a] border border-white/[0.1] p-6 sm:p-10 shadow-2xl shadow-cyan-950/30">
              
              {/* Header of Resume Sheet */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">
                    {PORTFOLIO_DATA.personalInfo.name}
                  </h3>
                  <div className="text-cyan-400 text-xs sm:text-sm font-mono mt-0.5">
                    {selectedTrack.title} • {PORTFOLIO_DATA.personalInfo.location}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-slate-300">{PORTFOLIO_DATA.personalInfo.email}</span>
                  <span>•</span>
                  <span className="text-slate-300">{PORTFOLIO_DATA.personalInfo.phone}</span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="py-6 border-b border-white/[0.06]">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold">
                  Professional Summary
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {selectedTrack.summary}
                </p>
              </div>

              {/* Education & Core Focus */}
              <div className="py-6 border-b border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold">
                    Education
                  </h4>
                  <div className="text-sm font-bold text-white">
                    {PORTFOLIO_DATA.personalInfo.degree}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {PORTFOLIO_DATA.personalInfo.institution} • {PORTFOLIO_DATA.personalInfo.yearInfo}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold">
                    Specialized Coursework
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Machine Learning Foundations, Data Structures &amp; Algorithms, DBMS, Object-Oriented Programming, Operating Systems.
                  </p>
                </div>
              </div>

              {/* Key Track Highlights */}
              <div className="pt-6">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 font-bold">
                  Targeted Accomplishments ({selectedTrack.title})
                </h4>
                <div className="space-y-2.5">
                  {selectedTrack.coreHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Strip */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  Ready for direct download (Tarun_S_Resume.pdf)
                </div>
                
                <button
                  onClick={() => handleDownload('/resumes/Tarun_S_Resume.pdf')}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download This PDF Version</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 3. LIVE PDF DOCUMENT VIEW */}
        {viewMode === 'pdf' && (
          <div className="rounded-2xl bg-slate-950 border border-white/[0.08] p-4 sm:p-6 shadow-2xl shadow-cyan-950/20">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-white/[0.06] gap-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Original Document Preview: Tarun_S_Resume.pdf</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload('/resumes/Tarun_S_Resume.pdf')}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save PDF</span>
                </button>
                <a
                  href="/resumes/Tarun_S_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-white/[0.08]"
                >
                  <span>Fullscreen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="w-full bg-[#1e293b] rounded-xl overflow-hidden border border-white/[0.06]">
              <iframe
                src="/resumes/Tarun_S_Resume.pdf#view=FitH"
                title="Tarun S Verified Resume PDF"
                className="w-full h-[750px] sm:h-[900px] border-none"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
