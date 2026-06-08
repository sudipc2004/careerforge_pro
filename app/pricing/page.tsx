'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { CheckCircle2, X, Zap, Crown, ArrowRight, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const FREE_FEATURES = [
  '1 AI-optimized resume',
  'PDF download',
  'JD Analysis Agent',
  'ATS Score meter',
  'Modern template',
];

const FREE_MISSING = [
  'Unlimited resumes',
  'Cover letter generator',
  'Executive & Minimal templates',
  'Priority AI processing',
  'Resume history dashboard',
];

const PRO_FEATURES = [
  'Unlimited AI resume rewrites',
  'All 3 premium templates',
  'PDF export (no watermarks)',
  'Cover letter generator',
  'Live ATS score optimization',
  'Priority AI processing',
  'Resume history & dashboard',
  'Cancel anytime',
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  const isPro = (session?.user as { plan?: string })?.plan === 'pro';

  const handleUpgrade = async () => {
    if (!session) {
      router.push('/login');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      console.error('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const price = billing === 'monthly' ? 19 : 15;
  const savings = billing === 'annual' ? '20% off' : null;

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-[var(--font-outfit)] text-white mb-4">
              Simple,{' '}
              <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Start free. Upgrade when you need more power.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-1 p-1 glass rounded-xl">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${billing === 'annual' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Annual
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="glass-card p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">Free</h3>
                <p className="text-gray-400 text-sm mb-4">Perfect for getting started</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white font-[var(--font-outfit)]">$0</span>
                  <span className="text-gray-400 mb-2">/month</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {FREE_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
                {FREE_MISSING.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push('/builder')}
                className="w-full py-3 glass hover:bg-white/10 text-white font-medium rounded-xl transition-all border border-white/20"
              >
                Start Free
              </button>
            </div>

            {/* Pro */}
            <div className="relative glass-card p-8 border-indigo-500/40 overflow-hidden">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl" />

              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold rounded-full">
                  <Crown className="w-3 h-3" /> POPULAR
                </span>
              </div>

              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
                <p className="text-gray-400 text-sm mb-4">For serious job seekers</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white font-[var(--font-outfit)]">${price}</span>
                  <span className="text-gray-400 mb-2">/{billing === 'monthly' ? 'month' : 'month, billed annually'}</span>
                </div>
                {savings && (
                  <span className="text-xs text-emerald-400">{savings} vs monthly billing</span>
                )}
              </div>

              <div className="space-y-3 mb-8 relative z-10">
                {PRO_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpgrade}
                disabled={loading || isPro}
                className="relative z-10 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-70 hover:scale-[1.02]"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isPro ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Current Plan
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" /> Upgrade to Pro
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'What is ATS optimization?',
                  a: "Applicant Tracking Systems (ATS) are used by 99% of large employers to filter resumes before they reach a human. Our AI ensures your resume contains the exact keywords these systems look for.",
                },
                {
                  q: 'Do I need a Gemini API key?',
                  a: "Yes, for AI features like bullet rewriting and JD analysis. You'll need to add your GEMINI_API_KEY to .env.local. Get one free at aistudio.google.com.",
                },
                {
                  q: 'Can I cancel my Pro subscription anytime?',
                  a: "Absolutely. Cancel anytime from your dashboard. You'll retain Pro access until the end of your billing period.",
                },
                {
                  q: 'How does PDF generation work?',
                  a: "We use Puppeteer (headless Chrome) to render your resume as pixel-perfect HTML and convert it to PDF — the same technology professional printing services use.",
                },
              ].map((faq) => (
                <details key={faq.q} className="glass-card p-5 group">
                  <summary className="flex items-center justify-between cursor-pointer text-white font-medium text-sm list-none">
                    {faq.q}
                    <span className="text-indigo-400 group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
