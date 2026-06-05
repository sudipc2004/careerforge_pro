'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Sparkles, FileText, LayoutDashboard, LogOut, Menu, X, ChevronDown, Crown, Mail,
} from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isPro = (session?.user as any)?.plan === 'pro';

  const navLinks = [
    { href: '/builder', label: 'Builder', icon: FileText },
    { href: '/ats-checker', label: 'ATS Checker', icon: Sparkles },
    { href: '/cover-letter', label: 'Cover Letter', icon: Mail },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/pricing', label: 'Pricing', icon: Crown },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center glow-indigo transition-transform group-hover:scale-110">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-[var(--font-outfit)] font-bold text-lg text-gradient">
              CareerForge
            </span>
            <span className="text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-0.5 rounded-full">
              Pro
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm text-gray-300 max-w-24 truncate">
                    {session.user?.name?.split(' ')[0] || 'User'}
                  </span>
                  {isPro && (
                    <span className="text-xs bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold px-1.5 py-0.5 rounded-full">
                      PRO
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-48 glass-card py-2 shadow-2xl">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={() => { setProfileOpen(false); signOut(); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === href
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              {!session && (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 w-full text-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl"
                >
                  Get Started Free
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
