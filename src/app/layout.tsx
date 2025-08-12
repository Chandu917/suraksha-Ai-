import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://suraksha-ai.app'), // Replace with your actual domain
  title: {
    default: 'SurakshaAI: Your AI Cybersecurity Guardian for India',
    template: `%s | SurakshaAI`,
  },
  description: 'Harness the power of advanced AI to protect your digital life. Analyze threats, secure your identity, and stay compliant with Indian cybersecurity laws.',
  keywords: ['Cybersecurity India', 'AI Security', 'Phishing detection', 'Online safety', 'Indian IT Act', 'Cyber law India'],
  authors: [{ name: 'SurakshaAI Team' }],
  openGraph: {
    title: 'SurakshaAI: Your AI Cybersecurity Guardian for India',
    description: 'Advanced AI-powered threat analysis and legal guidance for a safer digital India.',
    images: [
      {
        url: '/og-image.png', // You would need to create this image
        width: 1200,
        height: 630,
        alt: 'SurakshaAI Logo and promotional text',
      },
    ],
    url: 'https://suraksha-ai.app', // Replace with your actual domain
    type: 'website',
    siteName: 'SurakshaAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SurakshaAI: AI Cybersecurity Guardian for India',
    description: 'Stay safe online with AI-powered threat analysis and Indian cyber law guidance.',
     images: ['/twitter-image.png'], // You would need to create this image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
