'use client'

import { type Message } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Shield, User, Copy, Bookmark, AlertTriangle, FileText, Bot, ShieldCheck, ListOrdered, AlertCircle, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Fragment, useEffect, useState } from 'react'
import { Logo } from '../icons/logo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface ChatMessageProps {
  message: Message,
  onSave: (message: Message) => void
}

function TypingEffect({ text, onFinished }: { text: string; onFinished: () => void }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (displayedText.length === text.length) {
      onFinished()
      return
    }

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1))
    }, 10) // Adjust speed as needed

    return () => clearInterval(interval)
  }, [text, displayedText, onFinished])

  return <>{displayedText}</>
}

function LinkWarning({ url }: { url: string }) {
  return (
    <div className="my-2 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-2 text-sm text-destructive">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>
        Potential phishing link detected: <span className="font-mono">{url}</span>. Be cautious.
      </span>
    </div>
  )
}

function renderContentWithLinks(content: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = content.split(urlRegex)
  const hasLink = urlRegex.test(content)

  return (
    <>
      {parts.map((part, i) =>
        urlRegex.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:opacity-80"
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
      {hasLink && <LinkWarning url={content.match(urlRegex)?.[0] || ''} />}
    </>
  )
}


export function ChatMessage({ message, onSave }: ChatMessageProps) {
  const { toast } = useToast()
  const [isTyping, setIsTyping] = useState(message.role === 'assistant' && !message.threatData)

  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    toast({
      description: 'Response copied to clipboard.',
    })
  }

  const handleBookmark = () => {
    onSave(message)
  }

  return (
    <div className={cn('flex w-full flex-col gap-4 py-4 px-2', isUser ? 'items-end' : 'items-start')}>
      <div className={cn('flex items-center gap-3 mb-1', isUser ? 'flex-row-reverse' : 'flex-row')}>
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg border',
          isUser ? 'bg-primary/10 border-primary/20 text-primary' : 'glass border-white/10 text-white/70'
        )}>
          {isUser ? <User className="size-4" /> : <Logo className="size-5" />}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          {isUser ? 'Authorized User' : 'Neural Core v4.0'}
        </span>
      </div>

      <div
        className={cn(
          'group relative max-w-[85%] flex flex-col gap-4 rounded-3xl p-6 transition-all duration-500',
          isUser
            ? 'cyber-button border-none !bg-gradient-to-br !from-primary !to-secondary text-white rounded-tr-none shadow-[0_4px_20px_rgba(var(--primary),0.3)]'
            : 'glass border-white/10 text-white rounded-tl-none hover:border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
        )}
      >
        <div className="prose-sm prose-invert whitespace-pre-wrap break-words leading-relaxed font-medium">
          {message.threatData ? (
            <div className="w-full space-y-6">
              <Accordion type="multiple" defaultValue={['threat', 'steps']} className="w-full space-y-4">
                <AccordionItem value="threat" className="border-white/5 glass rounded-2xl overflow-hidden px-4">
                  <AccordionTrigger className="font-bold text-sm py-4 hover:no-underline text-white/90">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      THREAT ANALYSIS
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed pb-4">
                    {message.threatData.threat}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="steps" className="border-white/5 glass rounded-2xl overflow-hidden px-4">
                  <AccordionTrigger className="font-bold text-sm py-4 hover:no-underline text-white/90">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      REMEDIATION STEPS
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed pb-4">
                    {message.threatData.stepsToFix}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="precautions" className="border-white/5 glass rounded-2xl overflow-hidden px-4">
                  <AccordionTrigger className="font-bold text-sm py-4 hover:no-underline text-white/90">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      FUTURE PRECAUTIONS
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed pb-4">
                    {message.threatData.precautions}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="laws" className="border-white/5 glass rounded-2xl overflow-hidden px-4">
                  <AccordionTrigger className="font-bold text-sm py-4 hover:no-underline text-white/90">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                        <Landmark className="h-4 w-4" />
                      </div>
                      LEGAL FRAMEWORK (INDIA)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-secondary/80 leading-relaxed">
                      {message.threatData.relevantIndianLaws}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex items-center justify-center gap-2 py-4 border-t border-white/5">
                <Shield className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Neural Guard Active</span>
              </div>
            </div>

          ) : isUser ? (
            <span className="text-base font-bold tracking-tight">{renderContentWithLinks(message.content)}</span>
          ) : isTyping ? (
            <TypingEffect text={message.content} onFinished={() => setIsTyping(false)} />
          ) : (
            renderContentWithLinks(message.content)
          )}
        </div>
        {!isUser && !isTyping && (
          <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg glass border-white/10 hover:bg-white/10 transition-colors" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg glass border-white/10 hover:bg-white/10 transition-colors" onClick={handleBookmark}>
              <Bookmark className="h-4 w-4" />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
