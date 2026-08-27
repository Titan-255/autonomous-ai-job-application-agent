import React, { useState } from 'react';
import { X, Send, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { Application, Job } from '../types';

interface ApplicationModalProps {
  application: Application | null;
  job: Job | null;
  onClose: () => void;
  onSubmit: (appId: number, notes?: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  application,
  job,
  onClose,
  onSubmit
}) => {
  if (!application || !job) return null;

  const [notes, setNotes] = useState('');
  const [questions, setQuestions] = useState(application.application_questions || []);

  const handleToggleQuestion = (index: number) => {
    const updated = [...questions];
    updated[index].is_approved = !updated[index].is_approved;
    setQuestions(updated);
  };

  const handleAnswerChange = (index: number, val: string) => {
    const updated = [...questions];
    updated[index].user_answer = val;
    setQuestions(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Application Review & Approval</h2>
              <p className="text-xs text-slate-400">{job.title} ? {job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-blue-300">Human-In-The-Loop Verification Active</p>
              <p className="text-slate-400">
                Please inspect the prepared application details and role-specific resume below before granting final submission approval.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Attached ATS Resume</h4>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-xs font-bold text-slate-200">
                    Tarun_S_{application.role_category || 'Intern'}_{job.company.replace(/\s+/g, '_')}.pdf
                  </p>
                  <p className="text-[11px] text-slate-400">ATS Match Score: {application.match_score}% ? Verified Factual Grounds</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-xs font-bold">
                ? Ready
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Autofilled Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">Full Name</span>
                <span className="text-slate-200 font-semibold">{application.prepared_fields?.full_name || 'Tarun S'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Email Address</span>
                <span className="text-slate-200 font-semibold">{application.prepared_fields?.email || 'tarun.s19906@gmail.com'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone</span>
                <span className="text-slate-200 font-semibold">{application.prepared_fields?.phone || '+91 6380644305'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Location</span>
                <span className="text-slate-200 font-semibold">{application.prepared_fields?.location || 'Chennai, India'}</span>
              </div>
            </div>
          </div>

          {questions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Application Questions & Factual Answers
              </h4>
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-200">{q.question}</p>
                      <label className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={q.is_approved}
                          onChange={() => handleToggleQuestion(idx)}
                          className="rounded border-slate-700 bg-slate-800 text-emerald-600 focus:ring-0"
                        />
                        Approve Answer
                      </label>
                    </div>
                    <textarea
                      rows={2}
                      value={q.user_answer || q.suggested_answer}
                      onChange={(e) => handleAnswerChange(idx, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                    {q.reasoning && (
                      <p className="text-[11px] text-slate-500">Source: {q.reasoning}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Submission Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Applied via Indeed Easy Apply"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(application.id, notes)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            CONFIRM & SUBMIT APPLICATION
          </button>
        </div>
      </div>
    </div>
  );
};
