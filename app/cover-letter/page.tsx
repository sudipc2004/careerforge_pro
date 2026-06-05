'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Sparkles, FileText, Download, Loader2, Send, Copy, Check,
  ChevronRight, AlertCircle, ArrowLeft, RefreshCw, Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { ResumeData, createDefaultResume } from '@/lib/resume-schema';
import toast from 'react-hot-toast';

const inputClass = `w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm
  focus:outline-none focus:border-indigo-500/60 transition-all duration-200`;

export default function CoverLetterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [tone, setTone] = useState<string>('professional');
  const [customResumeData, setCustomResumeData] = useState<ResumeData>(createDefaultResume());

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<{
    subject: string;
    coverLetter: string;
    keyMatches: string[];
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Auth check and load saved resumes
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const stored = localStorage.getItem('careerforge_resumes');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ResumeData[];
        setSavedResumes(parsed);
        if (parsed.length > 0) {
          setSelectedResumeId(parsed[0].id);
          setCustomResumeData(parsed[0]);
        }
      } catch (e) {
        console.error('Failed to parse saved resumes', e);
      }
    }
  }, []);

  // Handle resume selection changes
  const handleResumeChange = (id: string) => {
    setSelectedResumeId(id);
    const resume = savedResumes.find((r) => r.id === id);
    if (resume) {
      setCustomResumeData(resume);
    } else {
      setCustomResumeData(createDefaultResume());
    }
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description first!');
      return;
    }

    if (!customResumeData.contact.fullName) {
      toast.error('Please make sure the selected resume has a full name!');
      return;
    }

    setIsGenerating(true);
    setGeneratedLetter(null);
    toast.loading('Drafting cover letter with Gemini AI...', { id: 'cl-gen' });

    try {
      const res = await fetch('/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: customResumeData,
          jobDescription,
          tone,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedLetter({
          subject: data.subject,
          coverLetter: data.coverLetter,
          keyMatches: data.keyMatches || [],
        });
        toast.success('Cover letter created successfully! ✨', { id: 'cl-gen' });
      } else {
        toast.error(data.error || 'Failed to generate cover letter.', { id: 'cl-gen' });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during generation.', { id: 'cl-gen' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(
      `Subject: ${generatedLetter.subject}\n\n${generatedLetter.coverLetter}`
    );
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    if (!generatedLetter) return;
    setIsDownloadingPdf(true);
    toast.loading('Generating cover letter PDF...', { id: 'cl-pdf' });
    try {
      const res = await fetch('/api/cover-letter/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coverLetter: generatedLetter.coverLetter,
          subject: generatedLetter.subject,
          resume: customResumeData,
        }),
      });

      if (!res.ok) throw new Error('PDF failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${customResumeData.contact.fullName.replace(/\s+/g, '_')}_Cover_Letter.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Cover letter PDF downloaded! 🎉', { id: 'cl-pdf' });
    } catch (error) {
      console.error(error);
      toast.error('Could not download PDF cover letter.', { id: 'cl-pdf' });
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] pb-12">
      <Navbar />

      <div className="pt-24 px-4 max-w-6xl mx-auto space-y-6">
        {/* Navigation back header */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/25 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> AI Cover Letter Generator
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold font-[var(--font-outfit)] text-gradient">
            Generate AI Cover Letter
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Let Gemini AI craft a personalized, keyword-optimized cover letter using your resume details.
          </p>
        </div>

        {/* Main Columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column: Form Settings (2/5 size) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-5 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <Briefcase className="w-4 h-4 text-indigo-400" /> Options & Context
              </h2>

              {/* Resume Selector */}
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Select Base Resume</label>
                {savedResumes.length === 0 ? (
                  <div className="p-3 bg-red-500/15 border border-red-500/25 text-red-300 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>
                      No saved resumes found. Go to the{' '}
                      <Link href="/builder" className="underline font-bold text-white">
                        Builder
                      </Link>{' '}
                      to create one first!
                    </span>
                  </div>
                ) : (
                  <select
                    value={selectedResumeId}
                    onChange={(e) => handleResumeChange(e.target.value)}
                    className={inputClass}
                  >
                    {savedResumes.map((r) => (
                      <option key={r.id} value={r.id} className="bg-[#0f1425] text-white">
                        {r.name} ({r.contact.fullName || 'No Name'})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Selected Candidate Info Card */}
              {customResumeData.contact.fullName && (
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
                  <div className="text-gray-400 font-medium">Selected Candidate:</div>
                  <div className="text-white font-semibold text-sm">
                    {customResumeData.contact.fullName}
                  </div>
                  {customResumeData.experience?.[0] && (
                    <div className="text-indigo-300">
                      {customResumeData.experience[0].position} at{' '}
                      {customResumeData.experience[0].company}
                    </div>
                  )}
                  {customResumeData.summary && (
                    <div className="text-gray-500 italic line-clamp-2 mt-1">
                      "{customResumeData.summary}"
                    </div>
                  )}
                </div>
              )}

              {/* Tone Selection */}
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Tone of Voice</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'professional', label: 'Professional' },
                    { id: 'enthusiastic', label: 'Enthusiastic' },
                    { id: 'confident', label: 'Confident' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTone(t.id)}
                      className={`py-2 px-3 text-xs rounded-xl border font-medium transition-all ${
                        tone === t.id
                          ? 'bg-indigo-500/15 border-indigo-500 text-indigo-300'
                          : 'glass border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">
                  Target Job Description *
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description here to analyze and optimize the letter for keywords..."
                  rows={8}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-indigo-500/60 transition-all resize-none leading-relaxed"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || savedResumes.length === 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Writing Letter...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Generated Letter Preview & Actions (3/5 size) */}
          <div className="lg:col-span-3 space-y-6">
            {!generatedLetter ? (
              <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px] border-dashed border-white/10">
                <FileText className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Cover Letter Generated</h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Complete the options on the left and click "Generate Draft" to write a premium AI-generated cover letter.
                </p>
              </div>
            ) : (
              <div className="glass-card p-6 space-y-6 animate-fade-in">
                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="font-semibold text-white text-sm">Cover Letter Draft</h3>
                    <p className="text-xs text-gray-500">Edit or copy details before sending</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 glass hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg transition-colors border border-white/10"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isDownloadingPdf}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-300 text-xs font-medium rounded-lg transition-all border border-emerald-500/20 disabled:opacity-50"
                    >
                      {isDownloadingPdf ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span>PDF Export</span>
                    </button>
                  </div>
                </div>

                {/* Key Matches Keywords */}
                {generatedLetter.keyMatches.length > 0 && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <p className="text-xs font-semibold text-indigo-300 flex items-center gap-1">
                      🎯 Key Skill Matches Addressed:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {generatedLetter.keyMatches.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Email Subject line */}
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Suggested Email Subject</label>
                  <input
                    type="text"
                    value={generatedLetter.subject}
                    onChange={(e) =>
                      setGeneratedLetter((prev) =>
                        prev ? { ...prev, subject: e.target.value } : null
                      )
                    }
                    className={inputClass}
                  />
                </div>

                {/* Cover Letter Body (Editable textarea) */}
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Letter Body</label>
                  <textarea
                    value={generatedLetter.coverLetter}
                    onChange={(e) =>
                      setGeneratedLetter((prev) =>
                        prev ? { ...prev, coverLetter: e.target.value } : null
                      )
                    }
                    rows={16}
                    className="w-full bg-black/35 border border-white/10 text-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-indigo-500/60 transition-all resize-none leading-relaxed font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
