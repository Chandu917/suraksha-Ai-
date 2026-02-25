'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { getPasswordStrengthResponse } from '@/app/actions';
import { type PasswordStrengthOutput } from '@/ai/flows/password-strength-checker';

import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';
import {
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Flame,
  Zap,
  Lock,
  Terminal,
  Activity
} from 'lucide-react';
import React from 'react';

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<PasswordStrengthOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedPassword] = useDebounce(password, 600);

  useEffect(() => {
    if (debouncedPassword) {
      setIsLoading(true);
      getPasswordStrengthResponse({ password: debouncedPassword }).then((res) => {
        setResult(res);
        setIsLoading(false);
      });
    } else {
      setResult(null);
    }
  }, [debouncedPassword]);

  const getStrengthColor = () => {
    if (!result) return 'text-white/20';
    if (result.score < 25) return 'text-red-500';
    if (result.score < 50) return 'text-orange-500';
    if (result.score < 75) return 'text-primary';
    return 'text-green-500';
  }

  const getStrengthBg = () => {
    if (!result) return 'bg-white/5';
    if (result.score < 25) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
    if (result.score < 50) return 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]';
    if (result.score < 75) return 'bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]';
    return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]';
  }

  const getStrengthIcon = () => {
    if (!result) return <KeyRound className="w-10 h-10 text-white/20" />;
    if (result.score < 50) return <ShieldAlert className="w-10 h-10 text-red-500 animate-pulse" />;
    if (result.score < 75) return <Zap className="w-10 h-10 text-primary" />;
    return <ShieldCheck className="w-10 h-10 text-green-500" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <Header />
        <main className="p-6 space-y-12 animate-in fade-in duration-700 max-w-4xl mx-auto w-full">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl glass border-secondary/20 shadow-[0_0_30px_rgba(var(--secondary),0.1)] mb-2">
              <KeyRound className="h-10 h-10 text-secondary" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">ENTROPY ANALYZER</h1>
            <p className="text-white/40 font-medium max-w-lg mx-auto uppercase text-xs tracking-[0.2em]">Neural Breach Prediction & Cryptographic Strength Audit</p>
          </div>

          <div className="glass-card !p-10 border-white/5 relative group">
            <div className="absolute inset-0 bg-secondary/5 blur-3xl rounded-3xl -z-10 group-focus-within:bg-secondary/10 transition-colors"></div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Sensitive Keyphrase</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full h-18 pl-14 pr-16 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 focus:ring-1 focus:ring-secondary/20 transition-all text-2xl text-white font-mono placeholder:text-white/10 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Entropy Score</span>
                  <span className={cn("text-sm font-black uppercase tracking-tighter", getStrengthColor())}>
                    {isLoading ? 'Calculating...' : result?.strength || 'Uninitialized'}
                  </span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div
                    className={cn("h-full rounded-full transition-all duration-1000", getStrengthBg())}
                    style={{ width: `${result?.score || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-card !p-8 border-white/5 min-h-[400px]">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-xl glass border-white/10">
                  {getStrengthIcon()}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Audit Report</h3>
                  <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Neural Breach Analysis Results</p>
                </div>
              </div>

              {!password ? (
                <div className="flex flex-col items-center justify-center h-48 text-center space-y-4 opacity-30">
                  <Terminal className="w-12 h-12" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Awaiting Input Payload...</p>
                </div>
              ) : isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-full bg-white/5 rounded-full animate-pulse"></div>
                  ))}
                </div>
              ) : result ? (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Structural Vulnerabilities
                    </h4>
                    <p className="text-sm font-medium text-white/70 leading-relaxed italic border-l-2 border-secondary/30 pl-4 capitalize">
                      "{result.feedback.toLowerCase()}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" /> Strengthening Protocols
                    </h4>
                    <div className="grid gap-3">
                      {result.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 rounded-xl glass border-white/5 group hover:border-secondary/30 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(var(--secondary),0.5)]"></div>
                          <span className="text-sm font-bold text-white/60 group-hover:text-white/90 transition-colors">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              <div className="glass-card !p-6 border-white/5 space-y-4">
                <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Safety Protocol</h4>
                <p className="text-[11px] font-bold text-white/30 uppercase leading-relaxed">
                  SurakshaAI never stores your keys. Analysis is performed locally in an encrypted environment.
                </p>
              </div>

              <div className="glass-card !p-6 border-white/5 space-y-8">
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Defense Essentials</h4>
                <div className="space-y-6">
                  {[
                    { label: "12+ Chars", desc: "Prevents brute force attacks." },
                    { label: "High Entropy", desc: "Avoid predictable patterns." },
                    { label: "MFA Active", desc: "Always use secondary auth." },
                  ].map((tip, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-[11px] font-black text-white/70 uppercase">{tip.label}</span>
                      <p className="text-[10px] font-medium text-white/30 uppercase">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
