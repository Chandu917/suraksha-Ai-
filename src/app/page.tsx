import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Lock, Landmark, BadgeCheck, FileLock, Shield } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground selection:bg-primary/20">
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
            <Logo className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            SurakshaAI
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/chat" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden sm:block">
            Sign In
          </Link>
          <Button asChild size="sm" className="rounded-full px-6 shadow-sm">
            <Link href="/chat">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-60"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

          <div className="container px-4 md:px-6 text-center relative z-10">
            <div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.8)]"></span>
                AI-Powered Cybersecurity for India
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 max-w-5xl mx-auto leading-[1.1] drop-shadow-sm">
                Secure Your Digital Life with <span className="text-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.5)]">Intelligence</span>
              </h1>

              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl leading-relaxed">
                Your personal AI guardian against scams, fraud, and cyber threats.
                Instant analysis, legal guidance, and proactive protection tailored for Indian citizens.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 w-full justify-center pt-6">
                <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all hover:-translate-y-1 bg-primary text-primary-foreground border border-primary/20">
                  <Link href="/chat">
                    Analyze Threat Now
                    <ShieldCheck className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all hover:-translate-y-1">
                  <Link href="#features">
                    Learn More
                  </Link>
                </Button>
              </div>

              <div className="pt-16 flex items-center justify-center gap-12 text-muted-foreground/60">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <Shield className="w-6 h-6 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-semibold group-hover:text-foreground transition-colors">Bank Grade Security</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <Lock className="w-6 h-6 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-semibold group-hover:text-foreground transition-colors">Private & Anonymous</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Comprehensive Protection</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Advanced tools designed to keep you safe in an increasingly complex digital world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] transition-all duration-500 hover:-translate-y-2 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Instant Threat Analysis</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80">
                  Paste any suspicious message, email, or text. Our AI analyzes patterns to detect phishing, scams, and social engineering attempts instantly.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] transition-all duration-500 hover:-translate-y-2 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                  <FileLock className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">URL & Link Scanner</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80">
                  Never click blindly again. Verify links before you visit them to prevent malware infections and credential theft.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] transition-all duration-500 hover:-translate-y-2 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                  <Landmark className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Indian Legal Guidance</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80">
                  Demystify the Indian IT Act and IPC. Get clear, actionable advice on your legal rights and how to report cybercrimes in India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50"></div>

          <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 relative z-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Ready to Secure Your Digital Presence?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of users who trust SurakshaAI for their daily digital safety. It's free, fast, and private.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-4">
              <Button asChild size="lg" className="w-full h-14 rounded-full text-lg shadow-[0_0_25px_rgba(var(--primary),0.4)] hover:shadow-[0_0_40px_rgba(var(--primary),0.6)] transition-all hover:-translate-y-1">
                <Link href="/chat">
                  Start Free Analysis
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                No credit card required • Instant access
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border/40 bg-background">
        <div className="container flex flex-col md:flex-row items-center justify-between py-8 px-4 md:px-6 gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SurakshaAI. Built for a safer India.</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}