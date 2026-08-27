import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Save,
  CheckCircle2,
  ShieldCheck,
  History,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { MasterProfile } from '../types';
import { api } from '../services/api';

export const ProfileEditor: React.FC = () => {
  const [profile, setProfile] = useState<MasterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await api.getProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    try {
      setSaving(true);
      const updated = await api.updateProfile({
        personal_info: profile.personal_info,
        professional_summary: profile.professional_summary,
        education: profile.education,
        skills: profile.skills,
        projects: profile.projects,
        experience: profile.experience,
        change_summary: `Profile updated to v${profile.version + 1}`
      });
      setProfile(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Profile save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-900 border border-emerald-800/30">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-extrabold text-white">Master CV & Profile Source of Truth</h1>
          </div>
          <p className="text-xs text-slate-400">
            Immutable foundation. All 7 role-specific ATS resumes derive strictly from verified facts here.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Saved v{profile.version}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 active:scale-95 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Form Sections */}
        <div className="lg:col-span-8 space-y-6">
          {/* Personal Info */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.personal_info.name}
                  onChange={(e) => setProfile({ ...profile, personal_info: { ...profile.personal_info, name: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Phone</label>
                <input
                  type="text"
                  value={profile.personal_info.phone}
                  onChange={(e) => setProfile({ ...profile, personal_info: { ...profile.personal_info, phone: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Email</label>
                <input
                  type="text"
                  value={profile.personal_info.email}
                  onChange={(e) => setProfile({ ...profile, personal_info: { ...profile.personal_info, email: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Location</label>
                <input
                  type="text"
                  value={profile.personal_info.location}
                  onChange={(e) => setProfile({ ...profile, personal_info: { ...profile.personal_info, location: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Master Professional Summary</h2>
            <textarea
              rows={4}
              value={profile.professional_summary}
              onChange={(e) => setProfile({ ...profile, professional_summary: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-white focus:outline-none"
            />
          </div>

          {/* Core Projects */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">4 Master Projects (Strict Facts)</h2>
            <div className="space-y-4">
              {profile.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-blue-400">{proj.name}</span>
                  <p className="text-[11px] text-slate-400 font-mono">Stack: {proj.tech_stack.join(', ')}</p>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {proj.bullets.map((b, bidx) => (
                      <li key={bidx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Version & Safety Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Factual Grounding Engine
            </h3>
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 space-y-1">
              <p className="font-bold">Anti-Fabrication Guarantee Active</p>
              <p className="text-slate-300">
                Any modifications made here become the definitive source of truth across all 7 generated role PDFs.
              </p>
            </div>
            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <p>Current Profile Version: <span className="text-white font-bold">v{profile.version}</span></p>
              <p>Last Updated: <span className="text-white font-bold">{new Date(profile.updated_at).toLocaleDateString()}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
