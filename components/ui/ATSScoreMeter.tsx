// components/ui/ATSScoreMeter.tsx
'use client';

import { useEffect, useRef } from 'react';
import { getScoreColor, getScoreLabel } from '@/lib/ats-scorer';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ATSScoreMeterProps {
  score: number;
  matched?: string[];
  missing?: string[];
  compact?: boolean;
}

export default function ATSScoreMeter({ score, matched = [], missing = [], compact = false }: ATSScoreMeterProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  const radius = compact ? 28 : 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
      circleRef.current.style.strokeDashoffset = `${strokeDashoffset}`;
    }
  }, [strokeDashoffset]);

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <svg width="70" height="70" viewBox="0 0 70 70" className="-rotate-90">
            <circle cx="35" cy="35" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
            <circle
              ref={circleRef}
              cx="35" cy="35" r={radius}
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold" style={{ color }}>{score}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-xs text-gray-400">ATS Score</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Circular meter */}
      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle
              ref={circleRef}
              cx="60" cy="60" r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{ filter: `drop-shadow(0 0 12px ${color})` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color }}>{score}</span>
            <span className="text-xs text-gray-400">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4" style={{ color }} />
            <span className="font-semibold text-white">{label} Match</span>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            {matched.length} of {matched.length + missing.length} keywords found
          </p>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${score}%`,
                background: `linear-gradient(90deg, ${color}, ${color}88)`,
                boxShadow: `0 0 8px ${color}55`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Keyword breakdown */}
      {(matched.length > 0 || missing.length > 0) && (
        <div className="grid grid-cols-2 gap-3">
          {matched.length > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">Matched ({matched.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {matched.slice(0, 6).map((kw) => (
                  <span key={kw} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                    {kw}
                  </span>
                ))}
                {matched.length > 6 && (
                  <span className="text-xs text-emerald-500">+{matched.length - 6} more</span>
                )}
              </div>
            </div>
          )}

          {missing.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs font-semibold text-red-400">Missing ({missing.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {missing.slice(0, 6).map((kw) => (
                  <span key={kw} className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">
                    {kw}
                  </span>
                ))}
                {missing.length > 6 && (
                  <span className="text-xs text-red-500">+{missing.length - 6} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
