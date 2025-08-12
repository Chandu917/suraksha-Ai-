import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Lock, Landmark, BadgeCheck, FileLock, Shield } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 border-b bg-background/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold text-primary">SurakshaAI</span>
        </Link>
        <Button asChild variant="ghost">
          <Link href="/chat">
            Start Chat <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-6">
               <div className="p-4 rounded-full bg-primary/10 shadow-lg">
                 <Logo className="w-20 h-20" />
               </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground/90">
                Your AI Cybersecurity Guardian for a Safer Digital India
              </h1>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                Harness the power of advanced AI to protect your digital life. Analyze threats, secure your identity, and stay compliant with Indian cybersecurity laws.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-opacity">
                  <Link href="/chat">
                    Get Free Security Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/5 hover:text-primary">
                  <Link href="#features">
                    Explore Protection Tools
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Your data is encrypted & private.</p>
            </div>
             <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <BadgeCheck className="w-6 h-6 text-accent" />
                <span className="font-medium">ISO 27001 Compliant</span>
              </div>
               <div className="flex items-center justify-center gap-2">
                <Lock className="w-6 h-6 text-accent" />
                <span className="font-medium">End-to-End Encryption</span>
              </div>
               <div className="flex items-center justify-center gap-2">
                <FileLock className="w-6 h-6 text-accent" />
                <span className="font-medium">Indian IT Act 2000 Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-secondary text-secondary-foreground">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Proactive Digital Shield</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl/relaxed">
                From identifying sophisticated scams to providing legal clarity, we empower you.
              </p>
            </div>
            <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
               <div className="p-6 text-center transition-transform duration-300 transform bg-background rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/20">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">Instant Threat Analysis</h3>
                <p className="mt-2 text-muted-foreground">
                  Paste a suspicious message to get an immediate, clear explanation of the potential threat.
                </p>
              </div>
               <div className="p-6 text-center transition-transform duration-300 transform bg-background rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/20">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">URL Scanner</h3>
                <p className="mt-2 text-muted-foreground">
                  Check if a link is safe before you click. Analyze URLs for phishing, malware, and other dangers.
                </p>
              </div>
              <div className="p-6 text-center transition-transform duration-300 transform bg-background rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/20">
                <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">Actionable Safety Steps</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive easy-to-follow steps to secure your accounts and devices after a potential breach.
                </p>
              </div>
              <div className="p-6 text-center transition-transform duration-300 transform bg-background rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/20">
                <Landmark className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">Indian Legal Guide</h3>
                <p className="mt-2 text-muted-foreground">
                  Understand the relevant sections of the Indian IT Act and IPC for various cybercrime incidents.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="w-full py-16 text-white md:py-24 bg-primary">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Take Control of Your Digital Safety</h2>
                    <p className="mx-auto max-w-xl text-primary-foreground/80">Don't leave your security to chance. A quick, free check can provide peace of mind and prevent trouble.</p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-200">
                        <Link href="/chat">
                            Chat with SurakshaAI Now
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>

      <footer className="flex flex-col items-center justify-center w-full h-24 gap-2 px-4 border-t shrink-0 md:px-6 bg-background">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SurakshaAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
