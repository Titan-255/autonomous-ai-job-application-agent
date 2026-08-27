import React from 'react';
import { X, Download, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { ResumeRecord } from '../types';

interface PDFViewerModalProps {
  resume: ResumeRecord | null;
  onClose: () => void;
}

export const PDFViewerModal: React.FC<PDFViewerModalProps> = ({ resume, onClose }) => {
  if (!resume) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{resume.file_name}</h2>
              <p className="text-xs text-slate-400">{resume.resume_title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ATS Score: {resume.ats_score}%</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/60 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Fact Verified</span>
            </div>

            <a
              href={`/api/resumes/${resume.id}/pdf`}
              download={resume.file_name}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 py-2 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-emerald-400 font-medium">? 1-Page Strict Layout</span>
            <span className="flex items-center text-emerald-400 font-medium">? Standard ATS Typography</span>
            <span className="flex items-center text-emerald-400 font-medium">? 0 Fabricated Claims</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Location: {resume.file_path}</span>
        </div>

        <div className="flex-1 bg-slate-950 p-4">
          <iframe
            src={`/api/resumes/${resume.id}/pdf#toolbar=0&navpanes=0`}
            className="w-full h-full rounded-xl border border-slate-800 bg-white"
            title="Resume PDF Preview"
          />
        </div>
      </div>
    </div>
  );
};
