// app/not-found.tsx
'use client';

import Link from 'next/link';
import { Home, ArrowLeft, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] overflow-hidden flex flex-col justify-between relative">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Empty space for alignment */}
      <div />

      {/* Main content */}
      <div className="max-w-md mx-auto px-6 py-12 text-center relative z-10">
        <div className="glass-card p-10 relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
          
          {/* Logo / Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-xl animate-float">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>

          {/* Heading */}
          <h1 className="text-8xl font-black font-[var(--font-outfit)] text-gradient mb-2">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track!
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:scale-[1.02]"
            >
              <Home className="w-4 h-4" />
              Go to Home Page
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3.5 glass hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10 hover:border-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center border-t border-white/5 relative z-10">
        <p className="text-xs text-gray-500">
          © 2026 CareerForge Pro. Built with ❤️ by <a href="https://github.com/sudipc2004" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">Sudip</a>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
