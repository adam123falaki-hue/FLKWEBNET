"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  Layout, 
  Globe, 
  Cpu, 
  ShoppingBag, 
  Bot,
  Smartphone, 
  Search, 
  Calendar, 
  Database, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Calculator
} from 'lucide-react';

interface ProjectOption {
  id: string;
  title: string;
  desc: string;
  basePrice: number;
  icon: React.ReactNode;
}

interface FeatureOption {
  id: string;
  name: string;
  price: number;
  icon: React.ReactNode;
}

export default function ProjectEstimator() {
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ProjectOption | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureOption[]>([]);
  
  // Champs de contact (Obligatoires)
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Champs Optionnels
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [note, setNote] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');

  // 1. Types de projets
  const projectOptions: ProjectOption[] = [
    { 
      id: 'landing', 
      title: 'Landing Page Haute Conversion', 
      desc: "Page d'atterrissage ciblée pour maximiser vos prospects et ventes rapide.",
      basePrice: 1500,
      icon: <Layout className="w-5 h-5 text-[#22d3ee]" />
    },
    { 
      id: 'vitrine', 
      title: 'Site Web Vitrine / Corporate', 
      desc: 'Présentation complète de votre entreprise, services et réalisations.',
      basePrice: 3500,
      icon: <Globe className="w-5 h-5 text-[#22d3ee]" />
    },
    { 
      id: 'ecommerce', 
      title: 'Boutique E-Commerce', 
      desc: 'Boutique en ligne complète avec gestion de catalogue et commandes.',
      basePrice: 4500,
      icon: <ShoppingBag className="w-5 h-5 text-[#22d3ee]" />
    },
    { 
      id: 'ai_solution', 
      title: 'Integration AI & Agent Virtuel', 
      desc: 'Agents IA sur-mesure, automatisation de tâches et workflows.',
      basePrice: 4000,
      icon: <Bot className="w-5 h-5 text-[#22d3ee]" />
    },
    { 
      id: 'saas', 
      title: 'Application Web / SaaS', 
      desc: 'Plateforme interactive sur-mesure avec tableau de bord complexe.',
      basePrice: 8500,
      icon: <Cpu className="w-5 h-5 text-[#22d3ee]" />
    },
  ];

  // 2. Options des fonctionnalités
  const featureOptions: FeatureOption[] = [
    { id: 'responsive', name: 'Design Responsive (Mobile, Tablette & Desktop)', price: 0, icon: <Smartphone className="w-4 h-4 text-[#22d3ee]" /> },
    { id: 'seo', name: 'Optimisation SEO & Vitesse de chargement', price: 600, icon: <Search className="w-4 h-4 text-[#22d3ee]" /> },
    { id: 'booking', name: "Système de réservation ou prise de RDV", price: 1000, icon: <Calendar className="w-4 h-4 text-[#22d3ee]" /> },
    { id: 'auth_db', name: 'Base de données Supabase + Auth Utilisateurs', price: 1200, icon: <Database className="w-4 h-4 text-[#22d3ee]" /> },
    { id: 'admin', name: "Espace d'administration (Admin Dashboard)", price: 1800, icon: <ShieldCheck className="w-4 h-4 text-[#22d3ee]" /> },
    { id: 'whatsapp_pay', name: 'Intégration WhatsApp direct & Paiement', price: 800, icon: <MessageSquare className="w-4 h-4 text-[#22d3ee]" /> },
    { id: 'ai_chatbot', name: 'Chatbot IA intelligent (Support Client 24/7)', price: 1800, icon: <Sparkles className="w-4 h-4 text-[#22d3ee]" /> },
  ];

  const budgetOptions = [
    'Moins de 5 000 DH',
    '5 000 DH - 10 000 DH',
    '10 000 DH - 20 000 DH',
    'Plus de 20 000 DH',
  ];

  const toggleFeature = (feature: FeatureOption) => {
    setSelectedFeatures((prev) =>
      prev.some(f => f.id === feature.id)
        ? prev.filter((f) => f.id !== feature.id)
        : [...prev, feature]
    );
  };

  const calculateTotal = () => {
    const base = selectedProject ? selectedProject.basePrice : 0;
    const featuresTotal = selectedFeatures.reduce((acc, f) => acc + f.price, 0);
    return base + featuresTotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom.trim() || !prenom.trim() || !phone.trim() || !email.trim()) {
      alert("Veuillez remplir tous les champs obligatoires (Nom, Prénom, Téléphone et E-mail).");
      return;
    }

    setIsSubmitting(true);

    try {
      const fullName = `${prenom.trim()} ${nom.trim()}`;
      const payload = {
        project_type: selectedProject ? `${selectedProject.title} (${selectedProject.basePrice} DH)` : '',
        selected_features: selectedFeatures.map(f => `${f.name} (+${f.price} DH)`).join(', '),
        estimated_total: `${calculateTotal()} DH`,
        name: fullName,
        phone: phone.trim(),
        email: email.trim(),
        company: company.trim(),
        budget: budget,
        note: note.trim(),
      };

      // 1. Enregistrement Supabase
      const { error } = await supabase.from('flk_leads').insert([payload]);
      if (error) throw error;

      // 2. Envoi Email via Resend Route
      try {
        await fetch('/api/send-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.error("Erreur envoi email API:", e);
      }

      // 3. Preparation du lien WhatsApp
      const myPhone = process.env.NEXT_PUBLIC_MY_WHATSAPP || '212600000000';
      const waMessage = encodeURIComponent(
        `Bonjour ! Je viens d'effectuer une estimation sur votre site :\n\n` +
        `👤 Nom: ${fullName}\n` +
        `📞 Tél: ${phone}\n` +
        `✉️ Email: ${email}\n` +
        `💻 Projet: ${selectedProject?.title}\n` +
        `💰 Total Estimé: ~${calculateTotal()} DH`
      );

      setWaLink(`https://wa.me/${myPhone.replace(/[^0-9]/g, '')}?text=${waMessage}`);
      setSubmitted(true);
    } catch (err) {
      console.error("Erreur lors de l'envoi:", err);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-left" dir="ltr">
      {/* Live Calculator & Progress Bar */}
      {!submitted && (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
            <span className="text-[10px] font-mono tracking-wider uppercase bg-[#22d3ee]/10 text-[#22d3ee] px-2.5 py-1 rounded-md border border-[#22d3ee]/20 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Devis Instantané
            </span>

            <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <Calculator className="w-4 h-4 text-[#22d3ee]" />
              <span className="text-xs text-slate-400 font-medium">Total Estimé:</span>
              <span className="text-sm font-black text-[#22d3ee]">
                ~ {calculateTotal().toLocaleString()} DH
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className={step >= 1 ? "text-[#22d3ee] font-bold" : ""}>1. Service</span>
            <span className={step >= 2 ? "text-[#22d3ee] font-bold" : ""}>2. Options</span>
            <span className={step >= 3 ? "text-[#22d3ee] font-bold" : ""}>3. Contact</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#22d3ee] to-[#00838F] transition-all duration-300 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {submitted ? (
        <div className="text-center py-10 space-y-5">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl border border-emerald-500/30">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Demande reçue avec succès !</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Merci <span className="text-white font-semibold">{prenom}</span> ! Votre estimation est de <span className="text-[#22d3ee] font-semibold">~{calculateTotal().toLocaleString()} DH</span>. Nous vous contacterons rapidement.
            </p>
          </div>

          {waLink && (
            <div className="pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition duration-200 text-sm shadow-lg shadow-emerald-950/40"
              >
                <MessageSquare className="w-4 h-4" /> Envoyer aussi sur WhatsApp
              </a>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* ÉTAPE 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">1. Sélectionnez votre besoin principal :</h3>
                <p className="text-xs text-slate-400">Choisissez le type de projet pour commencer l'estimation.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {projectOptions.map((opt) => {
                  const isSelected = selectedProject?.id === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedProject(opt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#22d3ee] bg-[#22d3ee]/10 shadow-lg shadow-cyan-950/40 ring-1 ring-[#22d3ee]/50'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                          {opt.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-100 text-sm mb-0.5">{opt.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/50 mt-1">
                        <span className="text-[11px] font-mono text-slate-500">Tarif de base</span>
                        <span className="text-xs font-bold text-[#22d3ee]">À partir de {opt.basePrice.toLocaleString()} DH</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  disabled={!selectedProject}
                  onClick={() => setStep(2)}
                  className="bg-gradient-to-r from-[#22d3ee] to-[#00838F] hover:opacity-90 disabled:opacity-40 text-slate-950 font-bold py-2.5 px-6 rounded-xl transition duration-200 flex items-center gap-2 text-sm shadow-md"
                >
                  Suivant <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">2. Fonctionnalités & Integrations :</h3>
                <p className="text-xs text-slate-400">Ajoutez des options pour affiner le tarif.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {featureOptions.map((feat) => {
                  const isChecked = selectedFeatures.some(f => f.id === feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-200 ${
                        isChecked
                          ? 'border-[#22d3ee] bg-[#22d3ee]/10 text-white'
                          : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 pr-2">
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                          {feat.icon}
                        </div>
                        <div>
                          <span className="text-xs font-medium block">{feat.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {feat.price === 0 ? 'Inclus gratuitement' : `+${feat.price.toLocaleString()} DH`}
                          </span>
                        </div>
                      </div>
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border transition-colors shrink-0 ${
                        isChecked ? 'bg-[#22d3ee] border-[#22d3ee] text-slate-950' : 'border-slate-700 bg-slate-950/50'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-5 rounded-xl transition duration-200 text-sm flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-gradient-to-r from-[#22d3ee] to-[#00838F] hover:opacity-90 text-slate-950 font-bold py-2.5 px-6 rounded-xl transition duration-200 flex items-center gap-2 text-sm shadow-md"
                >
                  Suivant <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">3. Coordonnées & Confirmation :</h3>
                <p className="text-xs text-slate-400">Remplissez vos coordonnées pour valider la demande.</p>
              </div>

              <div className="space-y-3.5">
                {/* Nom & Prénom (OBLIGATOIRES) */}
                <div className="grid md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Nom <span className="text-[#22d3ee]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Ex: Benani"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#22d3ee] rounded-xl p-3 text-sm text-slate-100 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Prénom <span className="text-[#22d3ee]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Ex: Reda"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#22d3ee] rounded-xl p-3 text-sm text-slate-100 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Téléphone & Email (OBLIGATOIRES) */}
                <div className="grid md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Téléphone / WhatsApp <span className="text-[#22d3ee]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0600000000"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#22d3ee] rounded-xl p-3 text-sm text-slate-100 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Adresse E-mail <span className="text-[#22d3ee]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@gmail.com"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#22d3ee] rounded-xl p-3 text-sm text-slate-100 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Champs OPTIONNELS */}
                <div className="grid md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Nom de l'entreprise <span className="text-slate-600">(Optionnel)</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Agency SARL"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#22d3ee] rounded-xl p-3 text-sm text-slate-100 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Budget prévu <span className="text-slate-600">(Optionnel)</span>
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-[#22d3ee] rounded-xl p-3 text-sm text-slate-100 focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionnez une tranche</option>
                      {budgetOptions.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Détails ou remarques <span className="text-slate-600">(Optionnel)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Précisez votre besoin si vous le souhaitez..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#22d3ee] rounded-xl p-3 text-sm text-slate-100 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-5 rounded-xl transition duration-200 text-sm flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#22d3ee] to-[#00838F] hover:opacity-90 disabled:opacity-50 text-slate-950 font-black py-2.5 px-6 rounded-xl transition duration-200 text-sm shadow-lg shadow-cyan-900/30"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}