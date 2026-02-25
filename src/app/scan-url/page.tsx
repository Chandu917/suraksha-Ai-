'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUrlScanResponse } from '@/app/actions';
import { type ScanUrlOutput } from '@/ai/schemas/url-scanner';

import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  CheckCircle2,
  Link2,
  ScanLine,
  ShieldCheck,
  Terminal as TerminalIcon,
  ShieldAlert,
  Search,
  Zap,
  ShieldQuestion
} from 'lucide-react';

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid cryptographic URL protocol." }),
});

const scanSteps = [
  "INITIALIZING NEURAL HANDSHAKE...",
  "EXTRACTING URL METADATA...",
  "PROBING GLOBAL THREAT DATABASES...",
  "ANALYZING SSL/TLS CERTIFICATES...",
  "DETECTING PHISHING PATTERNS...",
  "FINALIZING SECURITY REPORT..."
];

export default function ScanUrlPage() {
  const [result, setResult] = useState<ScanUrlOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
      }, 800);
    } else {
      setScanStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getUrlScanResponse({ url: values.url });
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const getThreatLabel = (threatType: ScanUrlOutput['threatType']) => {
    const labels: Record<ScanUrlOutput['threatType'], string> = {
      None: 'Verified Safe',
      Phishing: 'Phishing Incursion',
      Malware: 'Malicious Payload',
      Spam: 'Automated Spam',
      Suspicious: 'High Risk Profile',
      Unknown: 'Unidentified Protocol',
    };
    return labels[threatType];
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header />
        <main className="p-6 space-y-12 animate-in fade-in duration-700 max-w-4xl mx-auto w-full">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl glass border-primary/20 neon-glow mb-2">
              <ScanLine className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">NEURAL URL SCANNER</h1>
            <p className="text-white/40 font-medium max-w-lg mx-auto uppercase text-xs tracking-[0.2em]">Deep Packet Inspection & AI-Powered Phishing Detection</p>
          </div>

          <div className="glass-card !p-8 border-white/5 relative group">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-3xl -z-10 group-focus-within:bg-primary/10 transition-colors"></div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Target Protocol (URL)</label>
                <div className="relative">
                  <Link2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input
                    {...form.register("url")}
                    placeholder="https://secure-node.sh/path/to/verify"
                    className="w-full h-16 pl-14 pr-6 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white font-medium placeholder:text-white/10 outline-none"
                  />
                </div>
                {form.formState.errors.url && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-1">
                    {form.formState.errors.url.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 rounded-2xl text-lg font-black tracking-tight cyber-button neon-glow border-none"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <Activity className="w-5 h-5 animate-spin" />
                    INITIALIZING SCAN...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    ANALYZE SECURITY PROTOCOL
                  </span>
                )}
              </Button>
            </form>
          </div>

          {isLoading && (
            <div className="glass-card !p-8 border-white/5 space-y-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TerminalIcon className="w-5 h-5 text-primary" />
                  <span className="text-xs font-black text-white/70 uppercase tracking-widest">{scanSteps[scanStep]}</span>
                </div>
                <span className="text-[10px] font-bold text-primary">{Math.round(((scanStep + 1) / scanSteps.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                ></div>
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-primary/50">
                <p>&gt; Connection established with Neural Node 04</p>
                <p>&gt; TLS Handshake successful</p>
                <p>&gt; Scanning for redirection loops...</p>
              </div>
            </div>
          )}

          {result && (
            <div className={cn(
              "glass-card !p-10 border-white/10 relative overflow-hidden transition-all duration-1000",
              result.isSafe ? "border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.1)]" : "border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]"
            )}>
              <div className={cn(
                "absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full opacity-20 -z-10",
                result.isSafe ? "bg-green-500" : "bg-red-500"
              )}></div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className={cn(
                  "w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 shadow-lg",
                  result.isSafe ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                )}>
                  {result.isSafe ? <ShieldCheck className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
                </div>
                <div className="flex-1 text-center md:text-left space-y-2">
                  <h2 className={cn(
                    "text-4xl font-black tracking-tighter",
                    result.isSafe ? "text-green-500" : "text-red-500"
                  )}>
                    {result.isSafe ? "STATUS: SECURE" : "STATUS: CRITICAL"}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className="text-xs font-black text-white/40 uppercase tracking-widest">THREAT PROFILE</span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      result.isSafe ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"
                    )}>
                      {getThreatLabel(result.threatType)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-6 rounded-2xl glass border-white/5">
                  <h3 className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Search className="w-4 h-4" /> FINDINGS
                  </h3>
                  <p className="text-sm font-medium text-white/70 leading-relaxed capitalize">{result.report.toLowerCase()}</p>
                </div>
                <div className="space-y-3 p-6 rounded-2xl glass border-white/5">
                  <h3 className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4" /> RECOMMENDED ACTIONS
                  </h3>
                  <ul className="text-sm font-medium text-white/70 space-y-2">
                    {result.isSafe ? (
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        Proceed to access the verified resource.
                      </li>
                    ) : (
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        Terminate connection and block protocol immediately.
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-white/20 mt-2 ml-1.5 flex-shrink-0"></div>
                      Log incident for forensic auditing.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                  <TerminalIcon className="w-3 h-3" />
                  Neural Hash: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
                <Button variant="ghost" className="text-xs font-black text-primary hover:bg-primary/10 tracking-widest uppercase">
                  Generate PDF Report
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "ZERO TRUST", desc: "No link is assumed safe until verified.", icon: ShieldCheck },
              { title: "REAL-TIME", desc: "Live analysis against global databases.", icon: Activity },
              { title: "LEGAL DATA", desc: "Cross-checked with Indian Cyber Laws.", icon: ShieldAlert },
            ].map((item, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border-white/5 text-center space-y-3">
                <item.icon className="w-6 h-6 text-primary/40 mx-auto" />
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{item.title}</h4>
                <p className="text-[10px] text-white/30 font-bold uppercase leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
