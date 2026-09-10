"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProjectDetails() {
  const params = useParams();
  const projectId = params.id;
  

  // Data map linking specific screenshots & details to each project
  const projectsDetailsData: Record<string, {
    title: string;
    category: string;
    description: string;
    fullDetails: string;
    gallery: string[];
    tags: string[];
    databaseInfo?: {
      title: string;
      subtitle: string;
      supabaseWorkflow: string[];
      businessBenefits: string[];
    };
  }> = {
    "landing-hammam": {
      title: "Landing Page Hammam a Casa",
      category: "Landing Page Corporate",
      description: "Site vitrine haut de gamme et immersif pour un établissement de spa & hammam traditionnel à Casablanca, optimisé pour la réservation directe.",
      fullDetails: "Ce projet inclut une optimisation SEO poussée pour le marché casablancais, un design ultra-fluide avec animations Next.js, et un tunnel de conversion directe vers WhatsApp pour la prise de rendez-vous.",
      gallery: [
        "/image1.PNG",
        "/image2.PNG"
      ],
      tags: ["Next.js", "Tailwind CSS", "SEO Local", "Casablanca"]
    },
    "app-hammam": {
      title: "App Hammam a Casa",
      category: "Application Web / SaaS",
      description: "Application sur-mesure de gestion de créneaux, système de réservation en ligne et suivi des soins pour un réseau de hammams à Casablanca.",
      fullDetails: "SaaS complet gérant l'agenda des masseurs, la gestion des abonnements clients, la gestion des stocks de produits de soin et un dashboard d'analyse en temps réel.",
      gallery: [
        "/image3.PNG",
        "/image4.PNG",
        "/image5.PNG",
        "/image6.PNG"
      ],
      tags: ["React", "TypeScript", "Supabase", "Planning System"],
      databaseInfo: {
        title: "Gestion des Données & Intégration Supabase",
        subtitle: "Comment les données circulent en toute sécurité vers Supabase et maximisent la rentabilité du Hammam.",
        supabaseWorkflow: [
          "Flux en temps réel (Real-time DB) : Chaque réservation effectuée par un client est instantanément synchronisée dans Supabase sans rafraîchissement de page.",
          "Authentification Sécurisée (Supabase Auth) : Gestion des rôles (Admin, Réceptionniste, Masseur) avec des accès restreints aux données sensibles.",
          "Stockage Sécurisé (PostgreSQL Cloud) : Sauvegarde automatique des historiques de soins, profils clients, paies du personnel et inventaire.",
          "Row Level Security (RLS) : Protection stricte des données personnelles des clients conformément aux normes de sécurité."
        ],
        businessBenefits: [
          "Zéro Conflit de Créneaux : Empêche la double réservation d'une même salle ou d'un même masseur à la même heure.",
          "Fidélisation Client : Suivi précis des habitudes des clients (soins préférés, fréquence de visite) pour des offres personnalisées.",
          "Optimisation du Chiffre d'Affaires : Rapports détaillés en temps réel sur les heures creuses et les prestations les plus rentables.",
          "Accès Multi-Établissements : Possibilité de gérer plusieurs franchises ou locaux de Hammam depuis un seul dashboard centralisé."
        ]
      }
    }
  };

  const project = projectsDetailsData[projectId as string] || projectsDetailsData["app-hammam"];

  const whatsappNumber = "212600000000";
  const message = encodeURIComponent(`Bonjour, je suis intéressé par un projet similaire à : ${project.title}`);

  return (
    <div className="bg-[#080d1a] text-slate-100 min-h-screen font-sans relative overflow-hidden selection:bg-[#ef4444] selection:text-white">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-tr from-[#00838F]/30 via-indigo-900/20 to-[#ef4444]/25 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-50 px-6 md:px-16 py-4 bg-[#080d1a]/85 backdrop-blur-xl border-b border-[#00838F]/30 flex items-center justify-between">
        <Link href="/" className="flex items-center h-14 w-auto relative">
          <Image 
            src="/logo121.png" 
            alt="FLK WEB NET Logo" 
            width={220} 
            height={80} 
            className="object-contain mix-blend-screen"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            href="/#projects"
            className="text-slate-300 hover:text-[#22d3ee] font-semibold text-sm transition hidden sm:inline-block"
          >
            ← Retour 
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold px-6 py-2.5 rounded-xl transition text-sm shadow-lg shadow-red-600/25"
          >
            Discuter de ce projet
          </a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 pt-36 pb-24 px-6 md:px-16 max-w-6xl mx-auto">
        
        {/* Back Link Button */}
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-[#22d3ee] hover:underline text-sm font-semibold mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux réalisations
        </Link>

        {/* Header Section */}
        <div className="mb-12 bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-md">
          <span className="text-xs uppercase tracking-widest text-[#00acc1] font-bold font-mono">
            {project.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-2 mb-4 text-slate-100">
            {project.title}
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed mb-4">
            {project.description}
          </p>
          <p className="text-slate-400 text-sm max-w-3xl leading-relaxed mb-6">
            {project.fullDetails}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-slate-800/80 px-3.5 py-1.5 rounded-xl text-[#22d3ee] font-mono border border-slate-700/80">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* SECTION SUPABASE / DATABASE (If Available) */}
        {project.databaseInfo && (
          <div className="mb-16 bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#00838F]/10 border border-[#00838F]/40 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <svg className="w-48 h-48 text-[#22d3ee]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#00acc1]/20 text-[#22d3ee] border border-[#00acc1]/40 text-xs px-3 py-1 rounded-full font-mono font-bold">
                Backend Architecture
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-mono">
                Supabase Connected
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-100 mb-2">
              {project.databaseInfo.title}
            </h2>
            <p className="text-slate-400 text-sm mb-8 max-w-3xl">
              {project.databaseInfo.subtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* How Data Goes to Supabase */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-[#22d3ee] mb-4 flex items-center gap-2">
                  <span>⚡</span> Circuit des Données vers Supabase
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  {project.databaseInfo.supabaseWorkflow.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#00acc1] font-mono font-bold">0{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How it helps the business */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-[#ef4444] mb-4 flex items-center gap-2">
                  <span>📈</span> Impact Direct sur le Hammam
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  {project.databaseInfo.businessBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#ef4444] font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Full Screenshots Display */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-200">
              Captures d'écran du Projet
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {project.gallery.length} Images
            </span>
          </div>

          <div className="flex flex-col gap-10">
            {project.gallery.map((imgSrc, idx) => (
              <div 
                key={idx} 
                className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-2xl hover:border-[#00838F]/60 transition duration-300 group"
              >
                <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                    <span className="ml-2 text-slate-500">{imgSrc.replace('/', '')}</span>
                  </div>
                  <span>Screenshot #{idx + 1}</span>
                </div>
                
                <div className="relative w-full overflow-hidden bg-slate-900">
                  <img 
                    src={imgSrc} 
                    alt={`${project.title} screenshot ${idx + 1}`} 
                    className="w-full h-auto object-cover block group-hover:scale-[1.01] transition duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#050811] pt-12 pb-10 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] bg-gradient-to-t from-[#00838F]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60 relative z-10 items-start">
          
          {/* COL 1 & 2: BRAND & DESCRIPTION */}
          <div className="md:col-span-2 flex flex-col gap-1 items-start">
            <Link 
              href="/" 
              className="inline-block group cursor-pointer -mt-3 -ml-2"
            >
             <img 
            src="/logo121.png" 
            alt="FLK WEB NET" 
            className="h-40 md:h-50 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
            </Link>

            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-md -mt-1">
              Agence de développement web & solutions digitales sur-mesure basée à Casablanca. Nous transformons vos projets en expériences digitales haute performance.
            </p>
            
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
              <li><Link href="/" className="hover:text-[#22d3ee] transition">Accueil</Link></li>
              <li><Link href="/#services" className="hover:text-[#22d3ee] transition">Services</Link></li>
              <li><Link href="/#projects" className="hover:text-[#22d3ee] transition">Projets</Link></li>
              <li><Link href="/#faq" className="hover:text-[#22d3ee] transition">FAQ</Link></li>
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

    </div>
  );
}