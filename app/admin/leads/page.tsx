'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  Trash2, 
  Phone, 
  Mail, 
  ExternalLink, 
  RefreshCw, 
  Database, 
  Users, 
  DollarSign, 
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  LogOut,
  AtSign,
  Clock
} from 'lucide-react';

interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  budget?: string;
  note?: string;
  project_type: string;
  selected_features?: string;
  estimated_total: string;
}

// 🔐 معلومات الدخول الثابتة
const ADMIN_EMAIL = "adam@flkwebnet.com";
const ADMIN_PASSWORD = "Flkwebnet2026Secure"; 

// ⏱️ مدة صلاحية الجلسة بالدقائق
const SESSION_DURATION_MINUTES = 60;

export default function AdminLeadsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const sessionDataStr = localStorage.getItem('flkwebnet_session');
    
    if (sessionDataStr) {
      try {
        const sessionData = JSON.parse(sessionDataStr);
        const now = new Date().getTime();

        if (now < sessionData.expiresAt) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('flkwebnet_session');
          setIsAuthenticated(false);
        }
      } catch (e) {
        localStorage.removeItem('flkwebnet_session');
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      emailInput.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && 
      passwordInput.trim() === ADMIN_PASSWORD.trim()
    ) {
      const now = new Date().getTime();
      const expiresAt = now + SESSION_DURATION_MINUTES * 60 * 1000;
      
      const sessionData = {
        authenticated: true,
        expiresAt: expiresAt
      };

      localStorage.setItem('flkwebnet_session', JSON.stringify(sessionData));
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('flkwebnet_session');
    setIsAuthenticated(false);
    setEmailInput('');
    setPasswordInput('');
  };

  const fetchLeads = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('flk_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      console.error('Erreur Supabase fetch:', err);
      setErrorMsg(err?.message || "Impossible de charger les données depuis Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    fetchLeads();

    const channel = supabase
      .channel('realtime_flk_leads')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'flk_leads' },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce prospect ?')) return;
    try {
      const { error } = await supabase.from('flk_leads').delete().eq('id', id);
      if (error) throw error;
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err: any) {
      alert("Erreur lors de la suppression: " + err.message);
    }
  };

  if (!isMounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22d3ee]/20 to-[#00838F]/30 border border-[#22d3ee]/30 flex items-center justify-center text-[#22d3ee] mb-6 mx-auto shadow-lg shadow-cyan-950/50">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-white text-center mb-2">Flkwebnet Admin</h1>
          <p className="text-xs text-slate-400 text-center mb-6">
            Session sécurisée ({SESSION_DURATION_MINUTES} min). Entrez vos identifiants.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Email</label>
              <div className="relative">
                <AtSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@flkwebnet.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#22d3ee] transition"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Mot de passe</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#22d3ee] transition"
                required
              />
              {authError && <p className="text-red-400 text-xs mt-2 text-center">⚠️ Email ou mot de passe incorrect.</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#22d3ee] hover:bg-[#06b6d4] text-slate-950 font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-cyan-500/20 cursor-pointer mt-2"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalLeads = leads.length;
  const totalRevenueEstimated = leads.reduce((acc, lead) => {
    const rawVal = lead.estimated_total ? parseInt(lead.estimated_total.replace(/[^0-9]/g, ''), 10) : 0;
    return acc + (isNaN(rawVal) ? 0 : rawVal);
  }, 0);

  const filteredLeads = leads.filter(
    (l) =>
      l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone?.includes(searchTerm) ||
      l.project_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 font-sans selection:bg-[#22d3ee]/30 selection:text-[#22d3ee]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22d3ee]/20 to-[#00838F]/30 border border-[#22d3ee]/30 flex items-center justify-center text-[#22d3ee] shadow-lg shadow-cyan-950/50 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white">
                  Flkwebnet Leads Dashboard
                </h1>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#22d3ee]/10 text-[#22d3ee] px-2.5 py-0.5 rounded-full border border-[#22d3ee]/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse"></span> Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#22d3ee]" /> Session active ({SESSION_DURATION_MINUTES} min max)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#22d3ee] ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-3.5 h-3.5" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition">
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Prospects</p>
              <h3 className="text-2xl font-black text-white mt-1">{totalLeads}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-[#22d3ee]">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition">
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Pipeline Estimé</p>
              <h3 className="text-2xl font-black text-[#22d3ee] mt-1">
                ~ {totalRevenueEstimated.toLocaleString()} <span className="text-xs text-slate-400 font-normal">DH</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-[#22d3ee]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition">
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Source Supabase</p>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-slate-200">flk_leads</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-[#22d3ee]">
              <Database className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/30 p-3 rounded-2xl border border-slate-800/80">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, tél..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#22d3ee]/60 transition"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono self-end sm:self-center pr-2">
            Affichage de <strong className="text-slate-300">{filteredLeads.length}</strong> sur {leads.length}
          </span>
        </div>

        {/* ERROR STATE */}
        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs flex items-center justify-between">
            <span>⚠️ {errorMsg}</span>
            <button onClick={fetchLeads} className="underline font-bold hover:text-red-300">Réessayer</button>
          </div>
        )}

        {/* TABLE CONTENT */}
        {loading ? (
          <div className="text-center py-24 space-y-3 bg-slate-900/20 border border-slate-800/50 rounded-2xl">
            <div className="w-8 h-8 border-2 border-[#22d3ee] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-slate-400">Connexion à Supabase & chargement des prospects...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/20 border border-slate-800/50 rounded-2xl space-y-3">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">Aucun prospect trouvé</p>
            <p className="text-xs text-slate-500">Les demandes envoyées depuis le simulateur s'afficheront automatiquement ici.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-800/80 rounded-2xl bg-slate-900/30 backdrop-blur-sm shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Client / Entreprise</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Projet & Features</th>
                  <th className="p-4">Estimation</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/80 transition duration-150">
                    <td className="p-4 whitespace-nowrap font-mono text-slate-500 text-[11px]">
                      {new Date(lead.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      {lead.company && (
                        <span className="inline-block mt-0.5 text-[10px] text-slate-400 font-medium bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          🏢 {lead.company}
                        </span>
                      )}
                      {lead.budget && (
                        <div className="text-[#22d3ee] text-[10px] font-mono mt-1">
                          Budget: {lead.budget}
                        </div>
                      )}
                    </td>
                    <td className="p-4 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-mono font-medium hover:underline flex items-center gap-1"
                          title="Ouvrir WhatsApp"
                        >
                          {lead.phone} <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-slate-300 hover:text-white hover:underline truncate max-w-[180px]"
                        >
                          {lead.email}
                        </a>
                      </div>
                    </td>
                    <td className="p-4 max-w-xs space-y-1">
                      <div className="font-bold text-slate-100 text-xs">{lead.project_type}</div>
                      {lead.selected_features && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed" title={lead.selected_features}>
                          {lead.selected_features}
                        </p>
                      )}
                      {lead.note && (
                        <div className="text-[10px] text-amber-300/90 italic bg-amber-500/10 border border-amber-500/20 p-1.5 rounded-lg mt-1">
                          "{lead.note}"
                        </div>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-black text-[#22d3ee] text-xs bg-[#22d3ee]/10 px-3 py-1.5 rounded-xl border border-[#22d3ee]/20 inline-block shadow-sm">
                        {lead.estimated_total}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition duration-150 border border-red-500/20 cursor-pointer"
                        title="Supprimer ce lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}