import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Microscope, Landmark, BotMessageSquare, Link2, Sparkles } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 border-b border-border/10 bg-background/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold">SurakshaAI</span>
        </Link>
        <Button asChild variant="ghost">
          <Link href="/chat">
            Start Chat <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] -z-10 bg-gradient-radial from-primary/20 via-secondary/10 to-transparent"></div>
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg">
                <Sparkles className="w-16 h-16 text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-500">
                Your AI Cybersecurity Guardian for a Safer Digital India
              </h1>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                Harnessing the power of advanced AI to protect your digital life. Analyze threats, secure your identity, and understand your rights.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity">
                  <Link href="/chat">
                    Get Free Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#features">
                    Explore Features
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-background/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Proactive Digital Shield</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl/relaxed">
                From identifying sophisticated scams to providing legal clarity, we empower you.
              </p>
            </div>
            <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
               <div className="p-6 text-center transition-transform duration-300 transform bg-muted/30 rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/20">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">Instant Threat Analysis</h3>
                <p className="mt-2 text-muted-foreground">
                  Paste a suspicious message to get an immediate, clear explanation of the potential threat.
                </p>
              </div>
               <div className="p-6 text-center transition-transform duration-300 transform bg-muted/30 rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/20">
                <Link2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">URL Scanner</h3>
                <p className="mt-2 text-muted-foreground">
                  Check if a link is safe before you click. Analyze URLs for phishing, malware, and other dangers.
                </p>
              </div>
              <div className="p-6 text-center transition-transform duration-300 transform bg-muted/30 rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/20">
                <Microscope className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">Actionable Safety Steps</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive easy-to-follow steps to secure your accounts and devices after a potential breach.
                </p>
              </div>
              <div className="p-6 text-center transition-transform duration-300 transform bg-muted/30 rounded-xl shadow-lg hover:scale-105 hover:shadow-primary/20">
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
        <section className="w-full py-16 text-white md:py-24 bg-gradient-to-r from-primary to-secondary">
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

      <footer className="flex flex-col items-center justify-center w-full h-24 gap-2 px-4 border-t shrink-0 md:px-6 bg-background/50 border-border/10">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SurakshaAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
