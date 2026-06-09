// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CareerForge Pro — AI-Powered ATS Resume Builder by Sudip',
  description:
    'Build ATS-optimized resumes with AI. Upload your resume, paste a job description, and get a perfectly tailored, professionally formatted PDF resume in seconds.',
  keywords: ['resume builder', 'ATS optimization', 'AI resume', 'job application', 'cover letter'],
  openGraph: {
    title: 'CareerForge Pro by Sudip',
    description: 'Build ATS-optimized resumes with AI',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-[var(--font-inter)] bg-[#0a0f1e] text-white antialiased">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(30, 20, 60, 0.95)',
                color: '#fff',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#10b981', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
