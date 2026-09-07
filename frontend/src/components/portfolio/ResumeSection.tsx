import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Sparkles, CheckCircle2, Eye, Printer } from 'lucide-react';
import { PORTFOLIO_DATA, ResumeTrack } from '../../data/portfolioData';

export const ResumeSection: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<ResumeTrack>(
    PORTFOLIO_DATA.resumeTracks[0]
  );
  const [showFullPreview, setShowFullPreview] = useState(false);

  const handleDownload = (pdfUrl: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() || 'Tarun_S_Resume.pdf';
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/[0.06] pb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tailored Technical Profiles</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              MY RESUME
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Inspect tailored focus areas and download the verified PDF resume for your role requirements.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleDownload(selectedTrack.pdfFile)}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>

            <a
              href={selectedTrack.pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
              title="Open PDF in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

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
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              Professional Summary
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {selectedTrack.summary}
            </p>
          </div>

          {/* Education & Core Focus */}
          <div className="py-6 border-b border-white/[0.06] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
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
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                Specialized Coursework
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Machine Learning Foundations, Data Structures & Algorithms, DBMS, Object-Oriented Programming, Operating Systems.
              </p>
            </div>
          </div>

          {/* Key Track Highlights */}
          <div className="pt-6">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
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
              PDF file ready for direct download ({selectedTrack.pdfFile.split('/').pop()})
            </div>
            
            <button
              onClick={() => handleDownload(selectedTrack.pdfFile)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download This PDF Version</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
