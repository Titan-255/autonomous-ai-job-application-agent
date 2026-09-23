import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const { personalInfo } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#6366f1', '#38bdf8']
      });
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#030508] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-950/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Channel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            LET'S BUILD SOMETHING.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Have an idea, opportunity, or interesting problem? Let's talk.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card with Copy Action */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] flex items-center justify-between group">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Direct Email</div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Copy Email"
                aria-label="Copy Email Address"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Card */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/[0.08] hover:border-cyan-500/40 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-400">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Professional Network</div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    linkedin.com/in/tarun-s-1435a5340
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/[0.08] hover:border-cyan-500/40 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-slate-800 border border-white/[0.1] text-slate-200">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Code Repositories</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    github.com/Titan-255
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </a>

            {/* Location / Availability Strip */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Chennai, India (IST / UTC+5:30)</span>
              </div>
              <span className="text-emerald-400 font-bold">Open to Remote / Relocate</span>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/90 to-[#04060c] border border-white/[0.08] p-6 sm:p-8 shadow-2xl shadow-black/60">
              
              <h3 className="text-lg font-bold text-white mb-1">
                Send a Direct Message
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Whether you're inquiring about an internship, full-time engineering role, or discussing a technical collaboration.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-emerald-300">
                    Message Sent Successfully!
                  </div>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out! Tarun will review your message and reply back shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-xs font-mono text-cyan-400 underline hover:text-cyan-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@domain.com"
                        className="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discussing an AI/ML engineering role or project collaboration..."
                      className="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Transmitting Message...' : 'SEND MESSAGE'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
