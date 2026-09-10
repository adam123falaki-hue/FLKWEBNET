"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProjectEstimatorModal from './components/ProjectEstimatorModal';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const whatsappNumber = "212660712635"; // بدل هاد الرقم برقمك
  const message = encodeURIComponent("Bonjour, je souhaite obtenir un devis pour un projet web avec FLK WEB NET.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const projectsData = [
    {
      id: "landing-hammam",
      category: "Landing Page Corporate",
      title: "Landing Page Hammam a Casa",
      description: "Site vitrine haut de gamme et immersif pour un établissement de spa & hammam traditionnel à Casablanca, optimisé pour la réservation directe.",
      coverImage: "/image1.PNG", 
      tags: ["Next.js", "Tailwind CSS", "SEO Local", "Casablanca"],
      hoverBorder: "hover:border-[#ef4444]/60"
    },
    {
      id: "app-hammam",
      category: "Application Web / SaaS",
      title: "App Hammam Casa",
      description: "Application sur-mesure avec intégration Supabase pour la gestion des réservations, suivi des clients et optimisation en temps réel.",
      coverImage: "/image3.PNG", 
      tags: ["React", "TypeScript", "Supabase", "Planning System"],
      hoverBorder: "hover:border-[#00acc1]/60"
    }
  ];

  // زدنا Accueil هنا وربطناها بـ #accueil
  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Performance', href: '#demo' },
    { name: 'Tech Stack', href: '#stack' },
    { name: 'Services', href: '#services' },
    { name: 'Projets', href: '#projects' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const observedElements: HTMLElement[] = [];

    navLinks.forEach((link) => {
      const sectionId = link.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        observedElements.push(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [mounted]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!mounted) {
    return <div className="bg-[#080d1a] min-h-screen" />;
  }

  return (
    <div className="bg-[#080d1a] text-slate-100 min-h-screen font-sans selection:bg-[#ef4444] selection:text-white relative overflow-x-hidden scroll-smooth" dir="ltr">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-tr from-[#00838F]/30 via-indigo-900/20 to-[#ef4444]/25 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#ef4444]/15 blur-[140px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-[#00838F]/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* NAVBAR */}
      <nav 
        className={`w-full fixed top-0 left-0 z-50 px-6 md:px-16 transition-all duration-300 ease-in-out flex items-center justify-between h-20 md:h-24 ${
          scrolled || mobileMenuOpen
            ? 'bg-[#080d1a]/98 backdrop-blur-xl border-b border-[#00838F]/30 shadow-2xl shadow-cyan-950/30' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* LOGO (حتى هو كيردك لـ Accueil) */}
        <a 
          href="#accueil" 
          onClick={(e) => handleNavClick(e, '#accueil')}
          className="flex items-center shrink-0 group py-1 z-50 cursor-pointer"
        >
          <img 
            src="/logo121.png" 
            alt="FLK WEB NET" 
            className="h-40 md:h-50 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* NAV LINKS DESKTOP */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a 
                key={link.name}
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 transition-colors duration-300 ${
                  isActive ? 'text-[#22d3ee] font-bold' : 'text-slate-300 hover:text-[#22d3ee]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#22d3ee] to-[#ef4444] rounded-full transition-all duration-300" />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA BUTTON / MOBILE TOGGLE BUTTON */}
        <div className="flex items-center gap-3 z-50">
          <button
            onClick={() => setIsEstimatorOpen(true)}
            className="hidden sm:inline-flex bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white font-bold px-6 py-2.5 rounded-xl transition duration-300 text-sm shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-[1.03]"
          >
            Estimation Projet
          </button>

          <button 
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-slate-200 focus:outline-none p-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl hover:bg-slate-800 transition active:scale-95 cursor-pointer z-50"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-[#080d1a]/98 backdrop-blur-2xl z-40 px-6 py-8 flex flex-col justify-between border-b border-slate-800 shadow-2xl">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#00acc1] font-bold mb-2">Navigation</span>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-lg font-bold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-between ${
                    isActive 
                      ? 'bg-slate-800/80 text-[#22d3ee] border border-[#00838F]/40' 
                      : 'text-slate-200 hover:bg-slate-900 hover:text-[#22d3ee]'
                  }`}
                >
                  <span>{link.name}</span>
                  <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsEstimatorOpen(true);
              }}
              className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold py-3.5 rounded-xl text-center shadow-lg shadow-red-600/30 transition active:scale-98"
            >
              Estimation Projet
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-center shadow-lg transition active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Contact WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}

      {/* HERO SECTION / ACCUEIL (id="accueil") */}
      <section id="accueil" className="relative z-10 flex flex-col items-center justify-center pt-36 pb-20 px-6 md:px-12 text-center max-w-6xl mx-auto scroll-mt-36">
        <div className="inline-flex items-center gap-3 bg-slate-900/90 border border-[#00838F]/40 px-5 py-2 rounded-full mb-8 text-xs font-semibold text-[#22d3ee] shadow-lg shadow-cyan-950/50 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef4444]"></span>
          </span>
          Agence Full-Stack de Nouvelle Génération
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.15] mb-8">
          Nous concevons des <br className="hidden sm:inline"/>
          <span className="bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#ef4444] bg-clip-text text-transparent drop-shadow-sm">
            Applications & Sites Web
          </span>
          <br />
          d'une précision chirurgicale
        </h1>

        <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mb-12 font-normal leading-relaxed">
          L'équipe <span className="text-[#ef4444] font-bold">FLK WEB NET</span> transforme vos idées en produits digitaux haute performance, ultra-rapides et taillés pour dominer votre marché.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center max-w-lg mb-16">
          <button
            onClick={() => setIsEstimatorOpen(true)}
            className="flex items-center justify-center gap-3 bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold py-4 px-8 rounded-2xl transition duration-300 shadow-xl shadow-red-600/30 hover:scale-[1.02]"
          >
            <span>Démarrer un projet</span>
          </button>
          <a
            href="#demo"
            onClick={(e) => handleNavClick(e, '#demo')}
            className="flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-[#00838F]/50 text-slate-200 font-bold py-4 px-8 rounded-2xl transition duration-300 hover:border-[#22d3ee]"
          >
            Découvrir notre puissance
          </a>
        </div>
      </section>

      {/* DASHBOARD DEMO SECTION */}
      <section id="demo" className="relative z-10 py-12 px-6 md:px-16 max-w-6xl mx-auto scroll-mt-28">
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl relative group hover:border-[#00838F]/40 transition duration-500">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-4 text-xs font-mono text-slate-400">flk-performance-core.v2.4.js</span>
            </div>
            <span className="text-xs font-mono bg-[#00838F]/20 text-[#22d3ee] px-3 py-1 rounded-full border border-[#00838F]/40">Status: 100% Optimized</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl hover:border-[#00acc1]/50 transition duration-300">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Lighthouse Score</span>
              <p className="text-4xl font-black text-emerald-400 mt-2">100 / 100</p>
              <p className="text-xs text-slate-500 mt-2">Performance & SEO maximales</p>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl hover:border-[#00acc1]/50 transition duration-300">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Load Time</span>
              <p className="text-4xl font-black text-[#22d3ee] mt-2">0.3s</p>
              <p className="text-xs text-slate-500 mt-2">Architecture Next.js Edge Server</p>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl hover:border-[#ef4444]/50 transition duration-300">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Conversion Rate</span>
              <p className="text-4xl font-black text-[#ef4444] mt-2">+320%</p>
              <p className="text-xs text-slate-500 mt-2">Design optimisé pour le ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" className="relative z-10 py-20 px-6 md:px-16 border-t border-slate-800/60 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[#00acc1] font-bold mb-3">Technologies Modernes</h2>
          <p className="text-3xl md:text-5xl font-black">Notre Stack de Pointe</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Next.js 14', desc: 'React Framework' },
            { name: 'TypeScript', desc: 'Type Safety' },
            { name: 'Tailwind CSS', desc: 'Modern UI' },
            { name: 'Node.js / Express', desc: 'Backend Robust' },
            { name: 'Supabase', desc: 'Database & Auth' },
            { name: 'REST & GraphQL', desc: 'APIs Performantes' },
            { name: 'Vercel / AWS', desc: 'Cloud Deployment' },
            { name: 'SEO Engine', desc: 'Visibilité Google' }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl text-left hover:border-[#00acc1]/60 hover:bg-slate-800/40 transition duration-300 group">
              <span className="font-mono text-sm font-bold text-slate-200 group-hover:text-[#22d3ee] transition-colors">{item.name}</span>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 py-20 px-6 md:px-16 border-t border-slate-800/60 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[#ef4444] font-bold mb-3">Nos Expertises</h2>
          <p className="text-3xl md:text-5xl font-black">Des solutions sur-mesure pour votre croissance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-[#00acc1]/50 transition duration-300 group relative">
            <div className="w-14 h-14 bg-[#00838F]/20 text-[#22d3ee] rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-[#00838F] group-hover:text-white transition duration-300">💻</div>
            <h3 className="text-xl font-bold mb-3">Sites Web Sur-Mesure</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Création de sites vitrines et corporate haut de gamme, ultra-rapides, responsifs et optimisés SEO.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-[#ef4444]/50 transition duration-300 group relative">
            <div className="w-14 h-14 bg-[#ef4444]/20 text-[#ef4444] rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-[#ef4444] group-hover:text-white transition duration-300">⚡</div>
            <h3 className="text-xl font-bold mb-3">Applications Web & SaaS</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Développement d'applications complexes Full-Stack avec architectures modernes et bases de données évolutives.</p>
          </div>

          <div className="bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-[#00acc1]/50 transition duration-300 group relative">
            <div className="w-14 h-14 bg-[#00838F]/20 text-[#22d3ee] rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-[#00838F] group-hover:text-white transition duration-300">🛒</div>
            <h3 className="text-xl font-bold mb-3">E-Commerce Performant</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Boutiques en ligne optimisées pour le taux de conversion avec intégration de systèmes de paiement sécurisés.</p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 py-20 px-6 md:px-16 border-t border-slate-800/60 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[#00acc1] font-bold mb-3">Réalisations</h2>
          <p className="text-3xl md:text-5xl font-black">Projets Récents</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <Link 
              key={project.id}
              href={`/projects/${project.id}`}
              className={`bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden ${project.hoverBorder} transition-all duration-300 group flex flex-col cursor-pointer hover:shadow-2xl hover:scale-[1.01]`}
            >
              <div className="h-60 bg-gradient-to-br from-slate-800 via-slate-900 to-[#00838F]/20 border-b border-slate-800 relative overflow-hidden flex items-center justify-center">
                <img 
                  src={project.coverImage} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="relative z-10 text-center px-4">
                  <span className="text-slate-200 font-bold border border-slate-700/80 bg-slate-900/90 px-5 py-2.5 rounded-xl backdrop-blur-md shadow-xl inline-flex items-center gap-2 group-hover:border-[#22d3ee] transition duration-300">
                    Voir les Détails
                    <svg className="w-4 h-4 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#22d3ee] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg text-[#22d3ee] font-mono border border-slate-700/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 py-20 px-6 md:px-16 border-t border-slate-800/60 max-w-4xl mx-auto scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[#ef4444] font-bold mb-3">FAQ</h2>
          <p className="text-3xl md:text-5xl font-black">Questions Fréquentes</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-[#00acc1]/40 transition duration-300">
            <h4 className="font-bold text-slate-200 mb-2">Combien de temps prend la réalisation d'un site web ?</h4>
            <p className="text-slate-400 text-sm">Le délai varie selon la complexité du projet. En général, une landing page prend 5 à 10 jours, tandis qu'une application sur-mesure nécessite 2 à 4 semaines.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-[#ef4444]/40 transition duration-300">
            <h4 className="font-bold text-slate-200 mb-2">Proposez-vous un service de maintenance après le lancement ?</h4>
            <p className="text-slate-400 text-sm">Oui, nous proposons un suivi technique complet, incluant les mises à jour de sécurité, l'hébergement et l'assistance technique.</p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section id="contact" className="relative z-10 py-16 px-6 md:px-16 max-w-7xl mx-auto scroll-mt-24">
        <div className="bg-gradient-to-r from-[#00838F]/30 via-slate-900 to-[#ef4444]/30 border border-slate-700/60 p-10 md:p-16 rounded-3xl text-center backdrop-blur-md relative overflow-hidden">
          <h3 className="text-3xl md:text-5xl font-black mb-6">Prêt à transformer votre présence digitale ?</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">Discutons de votre projet dès aujourd'hui et recevez une proposition sur-mesure.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsEstimatorOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ef4444] hover:bg-[#dc2626] text-white font-extrabold py-4 px-8 rounded-2xl transition duration-300 shadow-xl shadow-red-600/30 hover:scale-[1.02]"
            >
              <span>Obtenir un devis immédiat</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-2xl transition duration-300 shadow-lg shadow-emerald-950/40"
            >
              <span>Contact WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
{/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#050811] pt-12 pb-10 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] bg-gradient-to-t from-[#00838F]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60 relative z-10 items-start">
          
          {/* COL 1 & 2: BRAND & DESCRIPTION */}
          <div className="md:col-span-2 flex flex-col gap-1 items-start">
            
            {/* LOGO (استعمال Negative Margin باش يطلع للسطر الأول بالضبط) */}
            <a 
              href="#accueil" 
              onClick={(e) => handleNavClick(e, '#accueil')}
              className="inline-block group cursor-pointer -mt-3 -ml-2"
            >
              <img 
                src="/logo121.png" 
                alt="FLK WEB NET" 
                className="h-50 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* DESCRIPTION (قريبة بزاف للوجو ومقادة مع باقي الأعمدة) */}
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-md -mt-1">
              Agence de développement web & solutions digitales sur-mesure basée à Casablanca. Nous transformons vos projets en expériences digitales haute performance.
            </p>
            
            {/* STATUS BADGE */}
            <div className="flex items-center gap-2 mt-2 text-xs font-mono text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Disponible pour de nouveaux projets</span>
            </div>
          </div>

          {/* COL 3: NAVIGATION */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-slate-400">
              <li><a href="#accueil" onClick={(e) => handleNavClick(e, '#accueil')} className="hover:text-[#22d3ee] transition">Accueil</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#22d3ee] transition">Services</a></li>
              <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-[#22d3ee] transition">Projets</a></li>
              <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="hover:text-[#22d3ee] transition">FAQ</a></li>
              <li>
                <button onClick={() => setIsEstimatorOpen(true)} className="hover:text-[#ef4444] transition text-left">
                  Estimateur de Projet
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: CONTACT DIRECT */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Contact Direct</h4>
            <div className="flex flex-col gap-2.5 text-xs md:text-sm text-slate-400">
              <a 
                href="mailto:flkwebnet@gmail.com" 
                className="flex items-center gap-2 hover:text-[#22d3ee] transition-colors duration-200 group"
              >
                <svg className="w-4 h-4 text-slate-500 group-hover:text-[#22d3ee] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-mono text-xs">flkwebnet@gmail.com</span>
              </a>

              <a 
                href="tel:0660712635" 
                className="flex items-center gap-2 hover:text-white transition-colors duration-200 group"
              >
                <svg className="w-4 h-4 text-slate-500 group-hover:text-[#ef4444] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-mono text-xs">06 60 71 26 35</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                <svg className="w-4 h-4 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Casablanca, Maroc</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono relative z-10">
          <p>© {new Date().getFullYear()} FLK WEB NET. Tous droits réservés.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Confidentialité</span>
            <span className="hover:text-slate-400 cursor-pointer">Mentions Légales</span>
          </div>
        </div>
      </footer>
      {/* PROJECT ESTIMATOR MODAL */}
      <ProjectEstimatorModal 
        isOpen={isEstimatorOpen} 
        onClose={() => setIsEstimatorOpen(false)} 
      />

    </div>
  );
}
