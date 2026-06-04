// components/ui/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  overlay?: boolean;
}

export default function LoadingSpinner({
  size = 'md',
  label,
  className = '',
  overlay = false,
}: LoadingSpinnerProps) {
  // Size classes mapping
  const spinnerSizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const containerSizes = {
    sm: 'gap-1.5',
    md: 'gap-3',
    lg: 'gap-4',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${containerSizes[size]} ${className}`}>
      {/* Outer dual-ring spinning border */}
      <div className="relative">
        {/* Glow behind the spinner */}
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md animate-pulse-slow" />
        
        {/* The rotating spinner itself */}
        <div
          className={`
            ${spinnerSizes[size]}
            rounded-full 
            border-t-indigo-500 
            border-r-purple-500 
            border-b-indigo-500/20 
            border-l-indigo-500/20 
            animate-spin
          `}
          style={{
            animationDuration: '0.8s',
          }}
        />
      </div>

      {label && (
        <span className={`font-medium text-gray-400 font-[var(--font-outfit)] animate-pulse-slow ${textSizes[size]}`}>
          {label}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1e]/85 backdrop-blur-md transition-opacity duration-300">
        <div className="glass-card p-8 border border-white/10 shadow-2xl flex flex-col items-center">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}
