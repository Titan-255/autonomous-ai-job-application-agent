import React, { useState } from 'react';
import { Play, Sparkles, BookOpen, Layers, Zap, Terminal, Database, ArrowRight, Check } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';

interface ProjectSpotlightProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({ onOpenCaseStudy }) => {
  const spotlightProject = PORTFOLIO_DATA.projects.find(p => p.id === 'spectrum-ai') || PORTFOLIO_DATA.projects[0];
  const [activeTab, setActiveTab] = useState<'architecture' | 'query_sim' | 'highlights'>('architecture');
  const [simQuery, setSimQuery] = useState('Explain cross-attention in transformer models');
  const [simState, setSimState] = useState<'idle' | 'searching' | 'done'>('idle');

  const handleSimulate = () => {
    setSimState('searching');
    setTimeout(() => {
      setSimState('done');
    }, 900);
  };

  return (
    <section id="spotlight" className="relative py-24 bg-[#04060a] overflow-hidden border-t border-white/[0.04]">
      
      {/* Background Spotlight Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Spotlight Tag */}
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Cinematic Spotlight Showcase</span>
        </div>

        {/* Main Spotlight Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#080d1a]/95 to-[#04060c] border border-white/[0.1] shadow-2xl shadow-cyan-950/40 p-6 sm:p-10 lg:p-12 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT: Interactive Holographic Project Simulation */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              
              {/* Tab Selector for Left Panel */}
              <div className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-xl border border-white/[0.06] w-fit">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                    activeTab === 'architecture'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pipeline Flow
                </button>
                <button
                  onClick={() => setActiveTab('query_sim')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                    activeTab === 'query_sim'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Vector Query Sim
                </button>
                <button
                  onClick={() => setActiveTab('highlights')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                    activeTab === 'highlights'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Benchmarks
                </button>
              </div>

              {/* Holographic Window */}
              <div className="rounded-2xl bg-[#03060c] border border-white/[0.08] p-5 font-mono text-xs text-slate-300 min-h-[340px] flex flex-col justify-between shadow-inner">
                
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-slate-400 text-[11px]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="text-slate-300 ml-1">spectrum_engine_core</span>
                  </div>
                  <span className="text-cyan-400 font-semibold">ChromaDB v0.5</span>
                </div>

                {/* Tab Content: Architecture Pipeline */}
                {activeTab === 'architecture' && (
                  <div className="space-y-3 py-4 text-xs">
                    <div className="text-slate-400">// Ingestion & RAG Workflow</div>
                    
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 flex items-center space-x-3">
                      <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="text-white font-bold">1. Audio STT & Chunking</div>
                        <div className="text-[11px] text-slate-400">OpenAI Whisper + timestamped token segmentation</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-indigo-500/30 flex items-center space-x-3">
                      <Database className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <div>
                        <div className="text-white font-bold">2. Dense Vector Indexing</div>
                        <div className="text-[11px] text-slate-400">text-embedding-3-small → ChromaDB collection</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-purple-500/30 flex items-center space-x-3">
                      <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div>
                        <div className="text-white font-bold">3. Context Augmented Synthesis</div>
                        <div className="text-[11px] text-slate-400">Top-4 vector context → Study Notes & Knowledge Graph</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content: Query Sim */}
                {activeTab === 'query_sim' && (
                  <div className="space-y-3 py-3 text-xs">
                    <div className="text-slate-400">// Test Semantic Vector Distance Query</div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-300">Natural Language Prompt:</label>
                      <input
                        type="text"
                        value={simQuery}
                        onChange={(e) => setSimQuery(e.target.value)}
                        className="w-full bg-slate-900/90 border border-white/[0.1] rounded-lg px-3 py-2 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <button
                      onClick={handleSimulate}
                      className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors"
                    >
                      {simState === 'searching' ? 'Computing Cosine Distances...' : 'Execute Vector Retrieval'}
                    </button>

                    {simState === 'done' && (
                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[11px] text-emerald-300 space-y-1 animate-fadeIn">
                        <div className="flex items-center justify-between font-bold">
                          <span>Retrieval Complete (142ms)</span>
                          <span className="text-cyan-300">Score: 0.942 Sim</span>
                        </div>
                        <p className="text-slate-300 text-[10px]">
                          Matched: Document Chunk #18 [Lecture 04, Time 14:22]
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Content: Highlights */}
                {activeTab === 'highlights' && (
                  <div className="space-y-3 py-3 text-xs">
                    <div className="text-slate-400">// Engineering Benchmarks</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
                        <div className="text-slate-400 text-[10px]">Vector Latency</div>
                        <div className="text-sm font-bold text-cyan-300 mt-0.5">&lt; 180ms</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
                        <div className="text-slate-400 text-[10px]">Whisper STT Accuracy</div>
                        <div className="text-sm font-bold text-emerald-300 mt-0.5">99.2%</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
                        <div className="text-slate-400 text-[10px]">Chunk Window</div>
                        <div className="text-sm font-bold text-white mt-0.5">512 tokens / 64 overlap</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04]">
                        <div className="text-slate-400 text-[10px]">Vector Space</div>
                        <div className="text-sm font-bold text-purple-300 mt-0.5">1536-dim Cosine</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Window Footer Status */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>FastAPI Live Gateway</span>
                  </div>
                  <span>Production Schema</span>
                </div>

              </div>
            </div>

            {/* RIGHT: Project Description & Deep Dive Info */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold tracking-wider">
                    {spotlightProject.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    {spotlightProject.rating}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {spotlightProject.name}
                </h3>
                <p className="text-cyan-400 text-sm sm:text-base font-mono mt-1 font-medium">
                  {spotlightProject.tagline}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {spotlightProject.description}
              </p>

              {/* Core Features List */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Engineered Capabilities:
                </div>
                {spotlightProject.keyFeatures.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Integrated Architecture:
                </div>
                <div className="flex flex-wrap gap-2">
                  {spotlightProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-xs font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenCaseStudy(spotlightProject)}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>VIEW FULL CASE STUDY</span>
                </button>

                <a
                  href={spotlightProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.1] text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB REPO</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
