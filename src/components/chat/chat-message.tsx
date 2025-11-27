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
    <div className={cn('flex w-full flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
      <div
        className={cn(
          'flex max-w-[85%] flex-col gap-2 rounded-2xl px-5 py-3 shadow-sm transition-all duration-200',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-muted/50 text-foreground rounded-bl-sm border border-border/50'
        )}
      >
        <div className="prose-sm prose-neutral dark:prose-invert whitespace-pre-wrap break-words leading-relaxed">
          {message.threatData ? (
            <div className="w-full">
              <Accordion type="multiple" defaultValue={['threat', 'steps']} className="w-full border-none">
                <AccordionItem value="threat" className="border-b-0 mb-2">
                  <AccordionTrigger className="font-semibold text-base py-2 hover:no-underline hover:bg-black/5 dark:hover:bg-white/5 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Threat / Issue
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    {message.threatData.threat}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="steps" className="border-b-0 mb-2">
                  <AccordionTrigger className="font-semibold text-base py-2 hover:no-underline hover:bg-black/5 dark:hover:bg-white/5 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <ListOrdered className="h-4 w-4" />
                      Steps to Fix
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    {message.threatData.stepsToFix}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="precautions" className="border-b-0 mb-2">
                  <AccordionTrigger className="font-semibold text-base py-2 hover:no-underline hover:bg-black/5 dark:hover:bg-white/5 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Precautions
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    {message.threatData.precautions}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="laws" className="border-b-0">
                  <AccordionTrigger className="font-semibold text-base py-2 hover:no-underline hover:bg-black/5 dark:hover:bg-white/5 rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-2">
                      <Landmark className="h-4 w-4" />
                      Relevant Indian Laws
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    <p className="font-code text-xs bg-black/10 dark:bg-white/10 p-2 rounded-md">{message.threatData.relevantIndianLaws}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <p className="mt-4 text-center font-medium text-sm opacity-80">Stay safe online! 🛡</p>
            </div>

          ) : isUser ? (
            renderContentWithLinks(message.content)
          ) : isTyping ? (
            <TypingEffect text={message.content} onFinished={() => setIsTyping(false)} />
          ) : (
            renderContentWithLinks(message.content)
          )}
        </div>
        {!isUser && !isTyping && (
          <div className="-mb-1 -mr-1 mt-1 flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-black/10 dark:hover:bg-white/10" onClick={handleCopy}>
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-black/10 dark:hover:bg-white/10" onClick={handleBookmark}>
              <Bookmark className="h-3 w-3" />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
