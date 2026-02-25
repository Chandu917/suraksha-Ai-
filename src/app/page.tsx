'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Lock, Landmark, BadgeCheck, FileLock, Shield, Terminal, Zap, Fingerprint } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground selection:bg-primary/30">
      {/* Background Grid & Glows */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <header className="sticky top-0 z-50 flex items-center justify-between h-20 px-6 border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 transition-all hover:scale-105">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 ring-1 ring-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
            <Logo className="w-7 h-7" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            SurakshaAI
          </span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-white/60 transition-colors hover:text-primary">
            Security Features
          </Link>
          <Link href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-primary">
            Intelligence
          </Link>
          <Link href="#" className="text-sm font-medium text-white/60 transition-colors hover:text-primary">
            Enterprise
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-white/70 transition-colors hover:text-primary hidden sm:block">
            Sign In
          </Link>
          <Button asChild size="lg" className="rounded-full px-8 cyber-button neon-glow border-none font-bold">
            <Link href="/login">
              Get Protected <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-36 lg:py-48 overflow-hidden">
          <div className="container px-6 text-center relative z-10 mx-auto">
            <div className="flex flex-col items-center space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-forwards">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-6 py-2 text-sm font-bold text-primary backdrop-blur-md shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                <Terminal className="w-4 h-4 mr-2" />
                Next-Gen AI Security Protocol Active
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full scale-150"></div>
                <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30 max-w-6xl mx-auto leading-[0.9] pb-4">
                  SurakshaAI – <br />
                  <span className="text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.6)]">Cybersecurity Assistant</span>
                </h1>
              </div>

              <p className="max-w-3xl mx-auto text-white/60 md:text-2xl font-medium leading-relaxed">
                Protect yourself from online threats with intelligent scanning and real-time AI guidance.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 w-full justify-center pt-8">
                <Button asChild size="lg" className="h-16 px-10 rounded-2xl text-xl cyber-button neon-glow border-none font-black tracking-tight">
                  <Link href="/login">
                    Get Started Free
                    <ShieldCheck className="w-6 h-6 ml-3" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-xl border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-primary/40 transition-all">
                  <Link href="#features">
                    System Overview
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-24 flex flex-wrap items-center justify-center gap-16 text-white/40">
                <div className="flex items-center gap-3 group">
                  <div className="p-4 rounded-2xl glass border-white/5 group-hover:border-primary/30 transition-all group-hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                    <Shield className="w-8 h-8 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/20">Security</p>
                    <p className="text-sm font-bold group-hover:text-white transition-colors">Bank Grade</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-4 rounded-2xl glass border-white/5 group-hover:border-primary/30 transition-all group-hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                    <Lock className="w-8 h-8 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/20">Privacy</p>
                    <p className="text-sm font-bold group-hover:text-white transition-colors">Zero-Log Policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-4 rounded-2xl glass border-white/5 group-hover:border-primary/30 transition-all group-hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                    <Zap className="w-8 h-8 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/20">Latency</p>
                    <p className="text-sm font-bold group-hover:text-white transition-colors">Sub-Second AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full py-32 relative overflow-hidden bg-white/[0.02]">
          <div className="container px-6 relative z-10 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-24">
              <div className="h-1 w-20 bg-primary rounded-full mb-4 animate-glow"></div>
              <h2 className="text-4xl font-black tracking-tight sm:text-6xl text-white">Security Modules</h2>
              <p className="max-w-[800px] text-white/50 md:text-xl/relaxed font-medium">
                Our ecosystem leverages distributed AI intelligence to protect every aspect of your digital existence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Feature 1: AI Chat */}
              <div className="glass-card group cursor-pointer">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.2)] group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">AI Threat Intel</h3>
                <p className="text-white/50 leading-relaxed font-medium">
                  Instant analysis of phishing emails, SMS scams, and social engineering. Get real-time counter-measures.
                </p>
                <div className="mt-8 flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                  Launch Assistant <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>

              {/* Feature 2: URL Scanner */}
              <div className="glass-card group cursor-pointer">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary ring-1 ring-secondary/20 shadow-[0_0_20px_rgba(var(--secondary),0.2)] group-hover:scale-110 transition-transform duration-500">
                  <FileLock className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-secondary transition-colors">Link Sandbox</h3>
                <p className="text-white/50 leading-relaxed font-medium">
                  Scan suspicious URLs through our AI sandbox. Detect malware, credential theft, and hidden redirects.
                </p>
                <div className="mt-8 flex items-center text-secondary font-bold group-hover:translate-x-2 transition-transform">
                  Scan Vulnerability <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>

              {/* Feature 3: Password Audit */}
              <div className="glass-card group cursor-pointer">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.2)] group-hover:scale-110 transition-transform duration-500">
                  <Fingerprint className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">Neural Password Audit</h3>
                <p className="text-white/50 leading-relaxed font-medium">
                  Entropy analysis on your passwords. Get AI-generated hardened alternatives that are unhackable.
                </p>
                <div className="mt-8 flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                  Audit Passwords <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>

              {/* Feature 4: Compliance */}
              <div className="glass-card group cursor-pointer lg:col-span-2">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-white ring-1 ring-white/10 group-hover:scale-110 transition-all duration-500">
                    <Landmark className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">Indian Cyber Compliance (IT Act)</h3>
                    <p className="text-white/50 leading-relaxed font-medium max-w-2xl">
                      Navigate the complexities of the Indian IT Act and IPC. Get instant legal guidance on reporting cybercrimes and your rights as a digital citizen of India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 5: Reports */}
              <div className="glass-card group cursor-pointer">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary ring-1 ring-secondary/20 group-hover:scale-110 transition-transform duration-500">
                  <BadgeCheck className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-secondary transition-colors">Risk Analytics</h3>
                <p className="text-white/50 leading-relaxed font-medium">
                  Visual vulnerability history and downloadable security reports for professional tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50"></div>

          <div className="container grid items-center justify-center gap-12 px-6 text-center mx-auto relative z-10">
            <div className="space-y-6">
              <h2 className="text-5xl font-black tracking-tighter md:text-7xl text-white">Secure Your Identity Today.</h2>
              <p className="mx-auto max-w-[700px] text-white/50 md:text-2xl font-medium">
                Join the elite circle of citizens protected by SurakshaAI. Zero configuration. Instant protection.
              </p>
            </div>
            <div className="mx-auto w-full max-w-md space-y-6">
              <Button asChild size="lg" className="w-full h-20 rounded-2xl text-2xl cyber-button neon-glow border-none font-black tracking-tight">
                <Link href="/signup">
                  Create Free Account
                </Link>
              </Button>
              <div className="flex items-center justify-center gap-4 text-white/30 font-bold">
                <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                System Status: Optimal
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-background/50 py-16">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Logo className="w-8 h-8 text-primary" />
                <span className="text-2xl font-black tracking-tighter text-white">SurakshaAI</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed font-medium">
                Defining the future of personal cybersecurity in India.
                AI-driven, citizen-centric, and infinitely scalable.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold">Platform</h4>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-white/40 hover:text-primary transition-colors">Analyzer</Link>
                <Link href="#" className="text-white/40 hover:text-primary transition-colors">Scanner</Link>
                <Link href="#" className="text-white/40 hover:text-primary transition-colors">Vault</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold">Resources</h4>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-white/40 hover:text-primary transition-colors">IT Act Guide</Link>
                <Link href="#" className="text-white/40 hover:text-primary transition-colors">Cyber Crime Helpline</Link>
                <Link href="#" className="text-white/40 hover:text-primary transition-colors">Legal Framework</Link>
              </nav>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-sm text-white/20 font-bold tracking-widest uppercase">© {new Date().getFullYear()} SurakshaAI Systems • Cyber Defense Unit</p>
            <div className="flex gap-8">
              <Link href="#" className="text-xs font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
              <Link href="#" className="text-xs font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
              <Link href="#" className="text-xs font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}