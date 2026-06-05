'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import {
  Plus, FileText, Crown, Zap, Clock, Trash2, Edit3, Download,
  BarChart3, ArrowRight, Loader2, Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { ResumeData } from '@/lib/resume-schema';
import { useResume } from '@/lib/resume-context';
import { MOCK_RESUME_FRONTEND, MOCK_RESUME_PRODUCT_MANAGER } from '@/data/mock-resumes';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { dispatch } = useResume();
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);
  const [loadingPortal, setLoadingPortal] = useState(false);

  const isPro = (session?.user as any)?.plan === 'pro';

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('careerforge_resumes');
    if (stored) {
      try { setSavedResumes(JSON.parse(stored)); } catch {}
    }
  }, []);

  const saveCurrentResume = () => {
    const stored = localStorage.getItem('careerforge_current');
    if (!stored) return;
    const resume = JSON.parse(stored) as ResumeData;
    const all = savedResumes.filter(r => r.id !== resume.id);
    const updated = [resume, ...all];
    setSavedResumes(updated);
    localStorage.setItem('careerforge_resumes', JSON.stringify(updated));
  };

  const openResume = (resume: ResumeData) => {
    dispatch({ type: 'SET_RESUME', payload: resume });
    router.push('/builder');
  };

  const deleteResume = (id: string) => {
    const updated = savedResumes.filter(r => r.id !== id);
    setSavedResumes(updated);
    localStorage.setItem('careerforge_resumes', JSON.stringify(updated));
  };

  const createMockResume = (templateResume: ResumeData) => {
    const newResume: ResumeData = {
      ...templateResume,
      id: crypto.randomUUID(),
      lastModified: new Date().toISOString()
    };
    const updated = [newResume, ...savedResumes];
    setSavedResumes(updated);
    localStorage.setItem('careerforge_resumes', JSON.stringify(updated));
    openResume(newResume);
    toast.success(`Loaded demo resume: ${templateResume.contact.fullName}! ✨`);
  };

  const handleManageBilling = async () => {
    setLoadingPortal(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { console.error('Portal failed'); }
    finally { setLoadingPortal(false); }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return iso; }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />

      <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-[var(--font-outfit)] text-white">
              Welcome back, {session?.user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-400 mt-1">Manage your AI-optimized resumes</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'frontend') createMockResume(MOCK_RESUME_FRONTEND);
                if (val === 'pm') createMockResume(MOCK_RESUME_PRODUCT_MANAGER);
                e.target.value = ''; // reset
              }}
              className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 text-sm rounded-xl transition-all outline-none"
            >
              <option value="" className="bg-[#0f1425] text-gray-400">Load Mock Template...</option>
              <option value="frontend" className="bg-[#0f1425] text-white">Frontend Dev Template</option>
              <option value="pm" className="bg-[#0f1425] text-white">Product Manager Template</option>
            </select>
            <Link
              href="/builder"
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-4 h-4" /> New Resume
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isPro ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-500/20 text-gray-400'}`}>
                {isPro ? 'Unlimited' : `${savedResumes.length}/1`}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{savedResumes.length}</div>
            <div className="text-xs text-gray-400 mt-1">Saved Resumes</div>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {savedResumes.length > 0
                ? `${Math.round(savedResumes.reduce((a, r) => a + (r.atsScore || 0), 0) / savedResumes.length)}%`
                : '—'}
            </div>
            <div className="text-xs text-gray-400 mt-1">Avg ATS Score</div>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-2">
              {isPro ? <Crown className="w-5 h-5 text-amber-400" /> : <Zap className="w-5 h-5 text-gray-400" />}
            </div>
            <div className="text-2xl font-bold text-white capitalize">{isPro ? 'Pro' : 'Free'}</div>
            <div className="text-xs text-gray-400 mt-1">Current Plan</div>
          </div>
        </div>

        {/* Upgrade banner for free users */}
        {!isPro && (
          <div className="glass-card p-5 mb-8 border-indigo-500/30 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Upgrade to Pro</p>
                  <p className="text-sm text-gray-400">Unlimited resumes, cover letters & premium templates</p>
                </div>
              </div>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-xl transition-all whitespace-nowrap"
              >
                Upgrade — $19/mo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Pro billing management */}
        {isPro && (
          <div className="glass-card p-5 mb-8 border-amber-500/20 bg-gradient-to-r from-amber-600/10 to-yellow-600/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="font-semibold text-white">Pro Plan Active</p>
                  <p className="text-sm text-gray-400">All features unlocked</p>
                </div>
              </div>
              <button
                onClick={handleManageBilling}
                disabled={loadingPortal}
                className="px-4 py-2 glass hover:bg-white/10 text-gray-300 text-sm rounded-xl transition-all"
              >
                {loadingPortal ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Manage Billing'}
              </button>
            </div>
          </div>
        )}

        {/* ATS Checker Quick Link */}
        <div className="glass-card p-5 mb-8 border-indigo-500/20 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white glow-indigo">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white">ATS Resume Checker</p>
              <p className="text-sm text-gray-400">Have an existing resume? Upload it as a PDF to calculate compatibility and get AI optimization recommendations.</p>
            </div>
          </div>
          <Link
            href="/ats-checker"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-xl transition-all whitespace-nowrap"
          >
            Check Resume Score <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Resume grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Your Resumes</h2>
          </div>

          {savedResumes.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No resumes yet</h3>
              <p className="text-gray-400 text-sm mb-6">Create your first AI-optimized resume</p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" /> Create Resume
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedResumes.map((resume) => (
                <div key={resume.id} className="glass-card p-5 group hover:bg-white/10 transition-all">
                  {/* Template badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full capitalize">
                      {resume.template} template
                    </span>
                    {resume.atsScore !== undefined && (
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          resume.atsScore >= 80
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : resume.atsScore >= 60
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        ATS {resume.atsScore}%
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-white mb-1 truncate">
                    {resume.contact.fullName || resume.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1 truncate">
                    {resume.contact.email || 'No email'}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
                    <Clock className="w-3 h-3" />
                    {formatDate(resume.lastModified)}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openResume(resume)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-medium rounded-lg transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => deleteResume(resume.id)}
                      className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* New resume card */}
              {(isPro || savedResumes.length < 1) && (
                <Link
                  href="/builder"
                  className="glass-card p-5 border-dashed border-white/20 flex flex-col items-center justify-center gap-3 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-gray-500 hover:text-indigo-300 min-h-[160px]"
                >
                  <Plus className="w-8 h-8" />
                  <span className="text-sm font-medium">New Resume</span>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Cover letter quick link */}
        {isPro && (
          <div className="mt-8 glass-card p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Cover Letter Generator</p>
                <p className="text-sm text-gray-400">AI-powered, personalized cover letters</p>
              </div>
            </div>
            <Link
              href="/cover-letter"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-xl"
            >
              Generate <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
