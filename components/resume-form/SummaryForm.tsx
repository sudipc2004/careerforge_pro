'use client';

import { useResume } from '@/lib/resume-context';
import { Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const inputClass = `w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm
  focus:outline-none focus:border-indigo-500/60 transition-all duration-200`;

export default function SummaryForm() {
  const { state, dispatch } = useResume();
  const [isRewriting, setIsRewriting] = useState(false);
  const { summary } = state.resume;

  const handleRewriteSummary = async () => {
    if (!summary.trim()) {
      toast.error('Write a summary first, then let AI enhance it!');
      return;
    }
    setIsRewriting(true);
    try {
      const keywords = state.jdAnalysis?.mustHave || state.jdAnalysis?.rawKeywords || [];
      const res = await fetch('/api/ai-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: summary, keywords, type: 'summary' }),
      });
      const data = await res.json();
      if (data.rewritten) {
        dispatch({ type: 'UPDATE_SUMMARY', payload: data.rewritten });
        toast.success('Summary rewritten by AI!');
      }
    } catch {
      toast.error('AI rewrite failed. Check your API key.');
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-400">Professional Summary</label>
        <button
          onClick={handleRewriteSummary}
          disabled={isRewriting}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-medium rounded-lg border border-indigo-500/30 transition-all disabled:opacity-50"
        >
          {isRewriting ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Sparkles className="w-3 h-3" />
          )}
          {isRewriting ? 'Rewriting...' : 'AI Enhance'}
        </button>
      </div>
      <textarea
        id="summary-text"
        value={summary}
        onChange={(e) => dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value })}
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
        rows={5}
        className={`${inputClass} resize-none leading-relaxed`}
      />
      <p className="text-xs text-gray-500">
        {summary.length} chars · Aim for 50–100 words for best ATS performance
      </p>
    </div>
  );
}
