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
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <Logo className="w-24 h-24 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">Welcome to SurakshaAI</h2>
        <p className="mt-2 text-muted-foreground">How can I help you stay safe today?</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {examplePrompts.map((prompt, i) => (
            <Card key={i} className="cursor-pointer bg-background/50 hover:bg-accent/50 transition-colors" onClick={() => onSelectPrompt(prompt)}>
              <CardContent className="p-4 flex items-center justify-between">
                <p className="text-sm">{prompt}</p>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
