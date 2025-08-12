
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 border-b bg-background/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">SurakshaAI</span>
        </Link>
        <Button asChild>
          <Link href="/chat">
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
                    Your Personal Cybersecurity Guardian
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    SurakshaAI is your friendly Indian cybersecurity and legal assistant. Ask questions, get clarity on threats, and understand your rights under Indian Cyber Law.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/chat">
                      Start Chatting
                    </Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="cybersecurity abstract"
                className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 text-sm rounded-lg bg-muted">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How SurakshaAI Helps You</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From identifying phishing scams to explaining legal recourse, we've got you covered.
                </p>
              </div>
            </div>
            <div className="grid items-center max-w-5xl gap-6 py-12 mx-auto lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <h3 className="text-xl font-bold">Threat Analysis</h3>
                <p className="text-muted-foreground">
                  Get instant, clear explanations of cybersecurity threats like phishing, malware, and more.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <h3 className="text-xl font-bold">Actionable Steps</h3>
                <p className="text-muted-foreground">
                  Receive easy-to-follow steps to secure your accounts and devices after a potential breach.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <h3 className="text-xl font-bold">Indian Legal Guide</h3>
                <p className="text-muted-foreground">
                  Understand the relevant sections of the Indian IT Act and IPC for cybercrime incidents.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="flex flex-col items-center justify-center w-full h-24 gap-2 px-4 border-t shrink-0 md:px-6">
        <p className="text-xs text-muted-foreground">&copy; 2024 SurakshaAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
