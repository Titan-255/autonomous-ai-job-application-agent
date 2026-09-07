import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((scrollY / totalScroll) * 100);
      }

      // Active section detection
      const sections = ['hero', 'explore', 'projects', 'spotlight', 'ai-universe', 'stack', 'journey', 'about', 'resume', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'AI / ML', href: '#ai-universe', id: 'ai-universe' },
    { name: 'Experience', href: '#journey', id: 'journey' },
    { name: 'Skills', href: '#stack', id: 'stack' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-slate-900/40">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#05070a]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/60 py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center space-x-2.5 text-white font-bold tracking-wider"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 via-indigo-600/20 to-purple-600/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
              <span className="text-cyan-400 font-mono text-sm font-bold tracking-tight">T</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-widest text-slate-100 group-hover:text-cyan-300 transition-colors uppercase">
                {PORTFOLIO_DATA.personalInfo.logoText}
              </span>
              <span className="text-[9px] font-mono text-cyan-400/80 tracking-wider">AI • SOFTWARE</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-900/40 border border-white/[0.05] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || (link.id === 'projects' && activeSection === 'spotlight');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-1 text-xs font-medium tracking-wide transition-all duration-200 rounded-full ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm shadow-cyan-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_6px_#00f0ff]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Resume CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={PORTFOLIO_DATA.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              aria-label="Tarun S GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_DATA.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-white/[0.06] transition-colors"
              aria-label="Tarun S LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href="#resume"
              onClick={(e) => {
                if (onOpenResumeModal) {
                  e.preventDefault();
                  onOpenResumeModal();
                } else {
                  handleNavClick(e, '#resume');
                }
              }}
              className="group relative inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-medium tracking-wide transition-all shadow-sm shadow-cyan-950"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-cyan-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <a
              href="#resume"
              onClick={(e) => handleNavClick(e, '#resume')}
              className="px-2.5 py-1 text-[11px] font-medium rounded border border-cyan-500/40 text-cyan-300 bg-cyan-950/30"
            >
              Resume
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-4 pt-3 pb-6 bg-[#080c14]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <a
                    href={PORTFOLIO_DATA.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-white/[0.05]"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-300 hover:text-cyan-400 rounded-lg bg-slate-900 border border-white/[0.05]"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold tracking-wide shadow-lg shadow-cyan-500/20"
                >
                  Let's Connect
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
