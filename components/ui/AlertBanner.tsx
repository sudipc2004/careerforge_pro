// components/ui/AlertBanner.tsx
'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertBannerProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string | React.ReactNode;
  dismissible?: boolean;
  className?: string;
  onClose?: () => void;
}

export default function AlertBanner({
  type = 'info',
  title,
  message,
  dismissible = false,
  className = '',
  onClose,
}: AlertBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const config = {
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      shadow: 'shadow-emerald-950/20',
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      shadow: 'shadow-amber-950/20',
    },
    error: {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
      icon: XCircle,
      iconColor: 'text-rose-400',
      shadow: 'shadow-rose-950/20',
    },
    info: {
      bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300',
      icon: Info,
      iconColor: 'text-indigo-400',
      shadow: 'shadow-indigo-950/20',
    },
  };

  const current = config[type];
  const Icon = current.icon;

  return (
    <div
      className={cn(
        'flex gap-3.5 p-4 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 animate-fade-in',
        current.bg,
        current.shadow,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', current.iconColor)} />
      
      <div className="flex-1 space-y-1">
        {title && (
          <h4 className="text-sm font-semibold font-[var(--font-outfit)] leading-none text-white">
            {title}
          </h4>
        )}
        <div className="text-xs leading-relaxed opacity-90">{message}</div>
      </div>

      {dismissible && (
        <button
          onClick={handleClose}
          className="p-1 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors flex-shrink-0 self-start"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
