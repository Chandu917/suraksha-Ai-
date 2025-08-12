
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Microscope, Landmark, BotMessageSquare } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 border-b bg-background/95 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
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
        <section className="relative w-full pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10"></div>
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-6">
              <BotMessageSquare className="w-20 h-20 text-primary animate-pulse" />
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-foreground">
                India's AI Guardian for Cyber Safety
              </h1>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                Instantly analyze suspicious messages, understand cyber threats, and learn about your legal rights under Indian law. Your digital world, secured.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                  <Link href="/chat">
                    Get Free Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#features">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-primary text-primary-foreground">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Digital Shield, Simplified</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl/relaxed">
                From identifying phishing scams to explaining legal recourse, we've got you covered.
              </p>
            </div>
            <div className="grid max-w-5xl gap-8 mx-auto sm:grid-cols-1 md:grid-cols-3">
              <div className="p-6 text-center transition-transform duration-300 transform bg-background rounded-xl shadow-lg hover:scale-105">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">Instant Threat Analysis</h3>
                <p className="mt-2 text-muted-foreground">
                  Paste a suspicious message or link to get an immediate, clear explanation of the potential threat.
                </p>
              </div>
              <div className="p-6 text-center transition-transform duration-300 transform bg-background rounded-xl shadow-lg hover:scale-105">
                <Microscope className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">Actionable Safety Steps</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive easy-to-follow steps to secure your accounts and devices after a potential breach.
                </p>
              </div>
              <div className="p-6 text-center transition-transform duration-300 transform bg-background rounded-xl shadow-lg hover:scale-105">
                <Landmark className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold">Indian Legal Guide</h3>
                <p className="mt-2 text-muted-foreground">
                  Understand the relevant sections of the Indian IT Act and IPC for various cybercrime incidents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Clarity in 3 Simple Steps</h2>
            </div>
            <div className="relative grid max-w-3xl gap-12 mx-auto md:grid-cols-3">
               <div className="absolute w-full h-1 bg-border top-1/2 -translate-y-1/2 left-0 md:block hidden"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="absolute w-1 h-full bg-border left-1/2 -translate-x-1/2 top-0 md:hidden"></div>
                  <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold border-2 rounded-full bg-background border-primary text-primary z-10">1</div>
                  <h3 className="mt-4 text-xl font-semibold">Submit Your Query</h3>
                  <p className="mt-1 text-muted-foreground">Copy and paste the text or link you're unsure about.</p>
                </div>
                 <div className="relative flex flex-col items-center text-center">
                  <div className="absolute w-1 h-full bg-border left-1/2 -translate-x-1/2 top-0 md:hidden"></div>
                  <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold border-2 rounded-full bg-background border-primary text-primary z-10">2</div>
                  <h3 className="mt-4 text-xl font-semibold">AI Analysis</h3>
                  <p className="mt-1 text-muted-foreground">Our AI analyzes it for threats, scams, and legal context.</p>
                </div>
                 <div className="relative flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold border-2 rounded-full bg-background border-primary text-primary z-10">3</div>
                  <h3 className="mt-4 text-xl font-semibold">Receive Your Report</h3>
                  <p className="mt-1 text-muted-foreground">Get a clear, concise report with actionable advice.</p>
                </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 text-white md:py-24 bg-gradient-to-r from-primary to-accent">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Feeling Unsure? Get a Second Opinion.</h2>
                    <p className="mx-auto max-w-xl text-primary-foreground/80">Don't risk your security. A quick check can provide peace of mind.</p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <Button asChild size="lg" variant="outline" className="text-primary bg-primary-foreground hover:bg-primary-foreground/90 hover:text-primary">
                        <Link href="/chat">
                            Chat with SurakshaAI Now
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>

      <footer className="flex flex-col items-center justify-center w-full h-24 gap-2 px-4 border-t shrink-0 md:px-6 bg-secondary/50">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SurakshaAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
