'use client';

import { useState, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import {
  Upload, FileText, Sparkles, Brain, CheckCircle2,
  AlertTriangle, Loader2, ArrowRight, RefreshCw, BarChart2,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ATSAnalysis {
  score: number;
  matched: string[];
  missing: string[];
  suggestions: string[];
  breakdown: {
    technical: number;
    softSkills: number;
    tools: number;
  };
}

export default function ATSCheckerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ filename: string; analysis: ATSAnalysis } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== 'application/pdf') {
        toast.error('Only PDF files are supported currently.');
        return;
      }
      if (droppedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB.');
        return;
      }
      setFile(droppedFile);
      toast.success(`Selected ${droppedFile.name}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Only PDF files are supported currently.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCheckATS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please upload a resume PDF first.');
      return;
    }
    if (!jobDescription.trim() || jobDescription.trim().length < 50) {
      toast.error('Please paste a job description (minimum 50 characters).');
      return;
    }

    setIsAnalyzing(true);
    const toastId = toast.loading('Extracting resume text and analyzing with AI...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);

      const res = await fetch('/api/ats-check-file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to scan resume');
      }

      setResult({
        filename: data.filename,
        analysis: data.analysis,
      });

      toast.success('ATS Analysis Complete! ✨', { id: toastId });
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Verification failed. Please try again.';
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    if (score >= 40) return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
    return 'text-red-400 border-red-500/30 bg-red-500/10';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Highly Compatible';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Needs Optimization';
    return 'Weak Match';
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Scanner
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight font-[var(--font-outfit)] text-gradient mb-3">
            ATS Resume Checker
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Upload any resume PDF and paste your target Job Description. Our AI extracts the text, runs a semantic matching algorithm, and scores your compatibility.
          </p>
        </div>

        {!result ? (
          /* Input Form */
          <div className="max-w-4xl mx-auto glass-card p-6 md:p-8 animate-slide-up">
            <form onSubmit={handleCheckATS} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* File Dropzone */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-300 mb-2">
                    1. Upload Resume (PDF Only)
                  </label>
                  
                  {!file ? (
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex-1 min-h-[220px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 ${
                        isDragActive
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-white/10 hover:border-white/20 bg-white/5'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="hidden"
                      />
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 glow-indigo">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-white mb-1">
                        Drag and drop your PDF here
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        or click to browse files
                      </p>
                      <p className="text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">
                        Max size: 5MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 min-h-[220px] border border-white/15 rounded-2xl bg-white/5 flex flex-col items-center justify-center p-6 relative">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                        <FileText className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-white max-w-[200px] truncate text-center mb-1">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      
                      <button
                        type="button"
                        onClick={removeFile}
                        className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg transition-all"
                      >
                        Remove file
                      </button>
                    </div>
                  )}
                </div>

                {/* Job Description Textarea */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-300 mb-2">
                    2. Target Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here...&#10;&#10;E.g., We are looking for a Software Engineer with expertise in React, Node.js, and AWS. The ideal candidate has 3+ years of experience..."
                    className="flex-1 min-h-[220px] bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-2xl px-4 py-3.5 text-xs focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAnalyzing || !file || jobDescription.trim().length < 50}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base hover:scale-[1.01]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Resume Compatibility...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Calculate ATS Score
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Results Panel */
          <div className="max-w-5xl mx-auto space-y-6 animate-slide-up">
            
            {/* Top overview bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 glass rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm md:text-base">
                    Scanned: {result.filename}
                  </h3>
                  <p className="text-xs text-gray-500">
                    ATS Audit conducted by Gemini AI Agent
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setResult(null);
                  removeFile();
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 text-xs font-semibold rounded-xl transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Scan Another Resume
              </button>
            </div>

            {/* Score & Detailed analysis grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Score Card */}
              <div className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Overall Match Score
                </h3>
                
                {/* SVG circular score meter */}
                <div className="relative">
                  <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
                    <circle cx="75" cy="75" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                    <circle
                      cx="75" cy="75" r="60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 60}
                      strokeDashoffset={2 * Math.PI * 60 - (result.analysis.score / 100) * (2 * Math.PI * 60)}
                      className={`${
                        result.analysis.score >= 80
                          ? 'text-emerald-500'
                          : result.analysis.score >= 60
                          ? 'text-amber-500'
                          : result.analysis.score >= 40
                          ? 'text-orange-500'
                          : 'text-red-500'
                      }`}
                      style={{
                        transition: 'stroke-dashoffset 1.5s ease',
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold font-[var(--font-outfit)]">
                      {result.analysis.score}
                    </span>
                    <span className="text-xs text-gray-500">/ 100</span>
                  </div>
                </div>

                <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold ${getScoreColor(result.analysis.score)}`}>
                  {getScoreLabel(result.analysis.score)}
                </div>

                <p className="text-xs text-gray-500 leading-relaxed px-4">
                  This score estimates the likelihood of passing typical ATS screens based on semantic correlation and keyword presence.
                </p>
              </div>

              {/* Middle Breakdown Card */}
              <div className="glass-card p-6 md:col-span-2 space-y-6">
                <div>
                  <h3 className="font-semibold text-white text-base mb-1 flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-indigo-400" />
                    Dimension Breakdown
                  </h3>
                  <p className="text-xs text-gray-500">How your resume performed across critical assessment pillars</p>
                </div>

                <div className="space-y-4">
                  {/* Technical Skills progress bar */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-gray-300 font-medium">Technical & Hard Skills</span>
                      <span className="font-bold text-indigo-400">{result.analysis.breakdown.technical}%</span>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                        style={{ width: `${result.analysis.breakdown.technical}%` }}
                      />
                    </div>
                  </div>

                  {/* Tools & Platforms progress bar */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-gray-300 font-medium">Tools & Platforms</span>
                      <span className="font-bold text-cyan-400">{result.analysis.breakdown.tools}%</span>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                        style={{ width: `${result.analysis.breakdown.tools}%` }}
                      />
                    </div>
                  </div>

                  {/* Soft Skills progress bar */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-gray-300 font-medium">Soft Skills & Communication</span>
                      <span className="font-bold text-emerald-400">{result.analysis.breakdown.softSkills}%</span>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        style={{ width: `${result.analysis.breakdown.softSkills}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-start gap-2.5">
                  <Brain className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="text-white font-medium">AI Feedback:</span> Your technical alignment is strong, but adding specific toolsets or framing key projects using action verbs can significantly boost your scoring index.
                  </p>
                </div>
              </div>
            </div>

            {/* Keyword Audit Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Matched Keywords */}
              <div className="glass-card p-6 border-l-4 border-emerald-500">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      Keywords Matched ({result.analysis.matched.length})
                    </h3>
                    <p className="text-[10px] text-gray-500">Successfully matched with job description</p>
                  </div>
                </div>

                {result.analysis.matched.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto pr-1">
                    {result.analysis.matched.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">No matching keywords detected. Check your resume&apos;s spelling and phrasing.</p>
                )}
              </div>

              {/* Missing Keywords */}
              <div className="glass-card p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      Keywords Missing ({result.analysis.missing.length})
                    </h3>
                    <p className="text-[10px] text-gray-500">Add these to optimize match relevance</p>
                  </div>
                </div>

                {result.analysis.missing.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto pr-1">
                    {result.analysis.missing.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs bg-red-500/15 border border-red-500/20 text-red-300 px-2.5 py-1 rounded-full font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-emerald-400 font-semibold italic">Perfect keyword match! Outstanding work.</p>
                )}
              </div>
            </div>

            {/* AI Optimization Suggestions */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm md:text-base">
                    AI Action Plan
                  </h3>
                  <p className="text-xs text-gray-500">Tailored suggestions to make your resume stand out</p>
                </div>
              </div>

              <div className="space-y-3">
                {result.analysis.suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-3.5 bg-white/5 border border-white/10 hover:bg-white/8 transition-colors rounded-xl items-start"
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 border border-indigo-500/20 bg-indigo-500/5 rounded-2xl gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="text-xs font-bold text-white mb-0.5">
                    Need these changes made automatically?
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    Use our AI Resume Builder to write and optimize experience bullets instantly.
                  </p>
                </div>
                <Link
                  href="/builder"
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-500/20"
                >
                  Go to Builder
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
