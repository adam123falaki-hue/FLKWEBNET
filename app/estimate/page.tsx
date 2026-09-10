"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function EstimatePage() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const projectOptions = [
    { 
      id: 'landing', 
      title: 'Landing Page Haute Conversion', 
      desc: 'Page d\'atterrissage ciblée pour maximiser vos prospects et ventes.',
      badge: '🚀 Launch',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      id: 'vitrine', 
      title: 'Site Web Vitrine / Corporate', 
      desc: 'Présentation complète de votre entreprise, services et réalisations.',
      badge: '🌐 Global',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    { 
      id: 'saas', 
      title: 'Application Web / SaaS', 
      desc: 'Plateforme interactive sur-mesure avec tableau de bord et base de données.',
      badge: '⚡ Smart',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'ecommerce', 
      title: 'Boutique E-Commerce', 
      desc: 'Boutique en ligne complète avec gestion de catalogue et paiements sécurisés.',
      badge: '🛒 Shop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
  ];

  const featureOptions = [
    'Design Responsive (Mobile & Desktop)',
    'Optimisation SEO & Performance Maximale',
    'Système de Réservation / Prise de RDV',
    'Base de Données Supabase + Authentification',
    'Panneau d\'Administration (Admin Dashboard)',
    'Intégration WhatsApp & Paiement en Ligne',
  ];

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 py-12 px-4 flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Background Pulse Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-3xl mb-4 z-10">
        <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-2">
          ← Retour à l'accueil
        </Link>
      </div>

      <div className="bg-[#0a0f1d]/90 border border-cyan-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] w-full max-w-3xl relative backdrop-blur-xl z-10 transition-all duration-300">
        
        {/* Animated AI Header / Logo */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-bounce">
            <span className="font-black text-slate-950 text-2xl">F</span>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              FLK ESTIMATOR <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2.5 py-0.5 rounded-full font-mono animate-pulse">AI ACTIVE</span>
            </h1>
            <p className="text-xs text-slate-400">Estimation intelligente & sur-mesure</p>
          </div>
        </div>

        {/* Stepper with glow active states */}
        <div className="grid grid-cols-3 gap-3 text-xs font-semibold mb-8">
          {[
            { num: 1, label: "1. Type de projet" },
            { num: 2, label: "2. Fonctionnalités" },
            { num: 3, label: "3. Coordonnées" },
          ].map((s) => (
            <div 
              key={s.num} 
              className={`pb-2 border-b-2 transition-all duration-300 ${
                step >= s.num ? 'border-cyan-400 text-cyan-400 shadow-[0_4px_12px_rgba(6,182,212,0.3)]' : 'border-slate-800 text-slate-600'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-[fadeIn_0.3s_ease-in-out]">
            <h2 className="text-lg font-bold text-white mb-1">1. Sélectionnez le type de votre projet :</h2>
            <p className="text-xs text-slate-400 mb-6">Choisissez la structure qui correspond le mieux à vos besoins.</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {projectOptions.map((opt) => {
                const isSelected = projectType === opt.title;

                return (
                  <div
                    key={opt.id}
                    onClick={() => setProjectType(opt.title)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative transform hover:-translate-y-1 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.02]'
                        : 'border-slate-800 bg-slate-900/30 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                        isSelected 
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_#22d3ee]' 
                          : 'bg-slate-800 text-cyan-400'
                      }`}>
                        {opt.icon}
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700">
                        {opt.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-sm mb-1">{opt.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={!projectType}
                onClick={() => setStep(2)}
                className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] disabled:opacity-30 text-slate-950 font-bold py-2.5 px-7 rounded-xl text-sm transition-all duration-300"
              >
                Suivant →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-[fadeIn_0.3s_ease-in-out]">
            <h2 className="text-lg font-bold text-white mb-1">2. Sélectionner les fonctionnalités :</h2>
            <p className="text-xs text-slate-400 mb-6">Cochez les options nécessaires à votre application.</p>

            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {featureOptions.map((feat, idx) => {
                const isChecked = selectedFeatures.includes(feat);

                return (
                  <div
                    key={idx}
                    onClick={() => toggleFeature(feat)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all duration-200 hover:scale-[1.01] ${
                      isChecked
                        ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'border-slate-800 bg-slate-900/30 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{feat}</span>
                    <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${
                      isChecked 
                        ? 'bg-cyan-400 border-cyan-400 text-slate-950 shadow-[0_0_10px_#22d3ee]' 
                        : 'border-slate-700'
                    }`}>
                      {isChecked && '✓'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-5 rounded-xl text-xs transition-all"
              >
                ← Retour
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] text-slate-950 font-bold py-2.5 px-7 rounded-xl text-sm transition-all duration-300"
              >
                Suivant →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-[fadeIn_0.3s_ease-in-out]">
            <h2 className="text-lg font-bold text-white mb-1">3. Vos coordonnées & détails :</h2>
            <p className="text-xs text-slate-400 mb-4">Laissez-nous vos informations pour vous recontacter.</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nom Complet *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Amine Slaoui"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Téléphone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0600000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-5 rounded-xl text-xs transition-all"
              >
                ← Retour
              </button>
              <button
                type="button"
                onClick={() => alert('Devis envoyé !')}
                className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] text-slate-950 font-bold py-2.5 px-7 rounded-xl text-sm transition-all duration-300"
              >
                Confirmer et Envoyer
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}