'use client';

import { SessionProvider } from 'next-auth/react';
import { ResumeProvider } from '@/lib/resume-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ResumeProvider>
        {children}
      </ResumeProvider>
    </SessionProvider>
  );
}
