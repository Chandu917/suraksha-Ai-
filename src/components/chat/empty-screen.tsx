'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BotMessageSquare } from "lucide-react"
import { Logo } from "../icons/logo"

interface EmptyScreenProps {
  onSelectPrompt: (prompt: string) => void
}

const examplePrompts = [
  "What should I do if I clicked on a phishing link?",
  "Explain ransomware to me like I'm 10.",
  "What is the IT Act 2000?",
  "I got a weird SMS asking for my bank details.",
]

export function EmptyScreen({ onSelectPrompt }: EmptyScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <div className="relative bg-background/50 p-4 rounded-2xl border border-border/50 backdrop-blur-sm shadow-xl">
            <Logo className="w-16 h-16 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome to SurakshaAI</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your personal cybersecurity expert. Ask me anything about online safety, scams, or Indian cyber laws.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-8 w-full">
          {examplePrompts.map((prompt, i) => (
            <Card
              key={i}
              className="group cursor-pointer bg-muted/30 hover:bg-muted/50 border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm shadow-sm hover:shadow-[0_0_15px_rgba(var(--primary),0.1)]"
              onClick={() => onSelectPrompt(prompt)}
            >
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                    <BotMessageSquare className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium leading-tight text-foreground/90 group-hover:text-primary transition-colors">{prompt}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
