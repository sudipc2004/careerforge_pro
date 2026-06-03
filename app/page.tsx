// app/page.tsx — CareerForge Pro Landing Page
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import {
  Sparkles, Zap, Target, FileDown, CheckCircle2, ArrowRight, Star,
  Brain, BarChart3, FileText, Shield,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'JD Analysis Agent',
    desc: 'Paste any job description. Our AI instantly extracts and ranks every critical keyword by importance.',
    color: 'from-indigo-500 to-purple-500',
    glow: 'rgba(99,102,241,0.3)',
  },
  {
    icon: Sparkles,
    title: 'AI Bullet Rewriter',
    desc: 'Transform weak bullet points into powerful, keyword-rich statements that bypass ATS filters instantly.',
    color: 'from-purple-500 to-pink-500',
    glow: 'rgba(168,85,247,0.3)',
  },
  {
    icon: BarChart3,
    title: 'Live ATS Score',
    desc: 'Real-time compatibility score showing exactly how well your resume matches the target job.',
    color: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.3)',
  },
  {
    icon: FileDown,
    title: 'Pixel-Perfect PDF',
    desc: 'Professional-grade PDFs rendered by headless Chrome — guaranteed to look perfect in any viewer.',
    color: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    icon: FileText,
    title: 'Cover Letter AI',
    desc: 'Generate personalized cover letters that match both your experience and the job requirements.',
    color: 'from-cyan-500 to-blue-500',
    glow: 'rgba(6,182,212,0.3)',
  },
  {
    icon: Shield,
    title: '3 Premium Templates',
    desc: 'Modern, Executive, and Minimal designs that are ATS-safe and visually striking.',
    color: 'from-rose-500 to-red-500',
    glow: 'rgba(244,63,94,0.3)',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Meta',
    avatar: 'SC',
    text: 'CareerForge Pro boosted my ATS score from 34% to 91%. Got 3 interviews in the first week. This tool is a game-changer.',
    stars: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Product Manager at Stripe',
    avatar: 'MW',
    text: "The AI rewrites are insane. It turned my bland bullet points into compelling achievements. I landed my dream job in 2 weeks.",
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist at Google',
    avatar: 'PS',
    text: 'The JD analysis alone is worth the subscription. It shows exactly what keywords the hiring manager is looking for.',
    stars: 5,
  },
];

const STATS = [
  { value: '94%', label: 'Average ATS Improvement' },
  { value: '2.3x', label: 'More Interview Callbacks' },
  { value: '50K+', label: 'Resumes Generated' },
  { value: '4.9★', label: 'User Rating' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-20 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-indigo-500/30 text-sm text-indigo-300 mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Gemini AI · ATS-Proven Results</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[var(--font-outfit)] leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Build a Resume That
            <br />
            <span className="text-gradient">Gets Past Any ATS</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Upload your resume, paste a job description, and let AI rewrite your experience to perfectly match
            every keyword. Download a professional PDF that gets through ATS filters — every time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/builder"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-lg rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Start Building Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 px-8 py-4 glass hover:bg-white/10 text-white font-semibold text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20"
            >
              View Pricing
            </Link>
          </div>

          {/* Trust signals */}
          <p className="mt-6 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            ✓ Free plan available · ✓ No credit card required · ✓ PDF download included
          </p>
        </div>

        {/* Stats bar */}
        <div className="max-w-3xl mx-auto mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-3xl font-bold text-gradient font-[var(--font-outfit)]">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold font-[var(--font-outfit)] text-white mb-4">
              Everything You Need to
              <span className="text-gradient"> Land the Job</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A complete AI-powered resume toolkit built for the modern job market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card p-6 group hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    style={{ boxShadow: `0 0 20px ${feature.glow}` }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#0d1226]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-[var(--font-outfit)] text-white mb-4">
              From Resume to Interview in
              <span className="text-gradient"> 3 Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Paste Job Description',
                desc: 'Copy-paste the job posting. Our AI agent instantly extracts and ranks all critical ATS keywords.',
                icon: Target,
                color: 'from-indigo-500 to-purple-500',
              },
              {
                step: '02',
                title: 'AI Optimizes Your Resume',
                desc: 'Click the magic ✨ button next to each bullet point. Watch AI rewrite them with perfect keywords.',
                icon: Sparkles,
                color: 'from-purple-500 to-pink-500',
              },
              {
                step: '03',
                title: 'Download Perfect PDF',
                desc: 'Get a pixel-perfect, ATS-safe PDF rendered by Chrome. Apply with confidence.',
                icon: FileDown,
                color: 'from-emerald-500 to-teal-500',
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-10" />
                  )}
                  <div className="glass-card p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-indigo-400 mb-2">Step {step.step}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-[var(--font-outfit)] text-white mb-4">
              Real Results from Real Users
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h2 className="text-4xl font-bold font-[var(--font-outfit)] text-white mb-4">
                Ready to Get Hired Faster?
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Join 50,000+ job seekers who used CareerForge Pro to land their dream role.
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-lg rounded-2xl transition-all shadow-xl hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                Start Free — No Card Required
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="font-bold text-gradient font-[var(--font-outfit)]">CareerForge Pro</span>
        </div>
        <p className="text-xs text-gray-500">
          © 2025 CareerForge Pro. Built with ❤️ using Gemini AI.
        </p>
      </footer>
    </div>
  );
}
