'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Terminal, Zap, FileText } from "lucide-react"
import { Logo } from "../icons/logo"

interface EmptyScreenProps {
  onSelectPrompt: (prompt: string) => void
}

const examplePrompts = [
  { text: "Analyze a suspicious phishing SMS", icon: Zap },
  { text: "Explain Indian IT Act 2000 rights", icon: FileText },
  { text: "Recover from a hacked WhatsApp", icon: Shield },
  { text: "Check vulnerability in bit.ly link", icon: Terminal },
]

export function EmptyScreen({ onSelectPrompt }: EmptyScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-6">
        <div className="relative inline-flex mb-4">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative glass p-6 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(var(--primary),0.2)]">
            <Logo className="w-20 h-20" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase">SurakshaAI Agent</h2>
          <p className="text-lg text-white/40 max-w-md mx-auto font-medium leading-relaxed">
            Your AI cybersecurity assistant. Scan links, detect threats, and get instant security guidance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-2">
        {examplePrompts.map((prompt, i) => (
          <div
            key={i}
            className="glass-card !p-4 group cursor-pointer border-white/5 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1"
            onClick={() => onSelectPrompt(prompt.text)}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                  <prompt.icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold leading-tight text-white/70 group-hover:text-white transition-colors uppercase tracking-tight">{prompt.text}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
        Encrypted P2P Connection Established
      </div>
    </div>
  )
}
