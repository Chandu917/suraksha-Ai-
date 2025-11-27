import '@/lib/localStorage-polyfill';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

        {/* SEO and Social Media Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://suraksha-ai.vercel.app" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
