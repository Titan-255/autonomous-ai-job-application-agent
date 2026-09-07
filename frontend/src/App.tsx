import React, { useState } from 'react';
import { Navbar } from './components/portfolio/Navbar';
import { Hero } from './components/portfolio/Hero';
import { ContinueExploring } from './components/portfolio/ContinueExploring';
import { FeaturedRail } from './components/portfolio/FeaturedRail';
import { ProjectSpotlight } from './components/portfolio/ProjectSpotlight';
import { AIUniverse } from './components/portfolio/AIUniverse';
import { TechStack } from './components/portfolio/TechStack';
import { JourneyTimeline } from './components/portfolio/JourneyTimeline';
import { AboutSection } from './components/portfolio/AboutSection';
import { ResumeSection } from './components/portfolio/ResumeSection';
import { GitHubSection } from './components/portfolio/GitHubSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/portfolio/Footer';
import { CaseStudyModal } from './components/portfolio/CaseStudyModal';
import { CustomCursor } from './components/portfolio/CustomCursor';
import { Project } from './data/portfolioData';

export const App: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const handleOpenResume = () => {
    const el = document.getElementById('resume');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* Custom subtle ambient cursor on desktop */}
      <CustomCursor />

      {/* Main Top Navigation */}
      <Navbar onOpenResumeModal={handleOpenResume} />

      {/* Main Portfolio Content */}
      <main className="flex-1 w-full overflow-hidden">
        
        {/* 1. Hero / Featured Marquee Profile */}
        <Hero onOpenResumeModal={handleOpenResume} />

        {/* 2. Continue Exploring (Horizontal Category Rails) */}
        <ContinueExploring />

        {/* 3. Featured Projects Showcase */}
        <FeaturedRail onOpenCaseStudy={(project) => setSelectedCaseStudy(project)} />

        {/* 4. Marquee Project Spotlight (Spectrum AI) */}
        <ProjectSpotlight onOpenCaseStudy={(project) => setSelectedCaseStudy(project)} />

        {/* 5. AI / ML Capabilities Universe */}
        <AIUniverse onOpenCaseStudy={(project) => setSelectedCaseStudy(project)} />

        {/* 6. The Interactive Stack */}
        <TechStack />

        {/* 7. Journey & Career Timeline */}
        <JourneyTimeline />

        {/* 8. Behind the Builder (About Tarun) */}
        <AboutSection />

        {/* 9. Interactive Resume Experience */}
        <ResumeSection />

        {/* 10. Public GitHub Activity */}
        <GitHubSection />

        {/* 11. Final Contact Section */}
        <ContactSection />

      </main>

      {/* 12. Cinematic Minimal Footer */}
      <Footer />

      {/* Detailed Case Study Dialog */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}

    </div>
  );
};

export default App;
