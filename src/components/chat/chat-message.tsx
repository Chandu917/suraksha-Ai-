'use client'

import { type Message } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Shield, User, Copy, Bookmark, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Fragment, useEffect, useState } from 'react'

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
            className="text-primary underline hover:opacity-80"
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
  const [isTyping, setIsTyping] = useState(message.role === 'assistant')

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
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-primary/10 text-primary">
          <Shield className="h-5 w-5" />
        </Avatar>
      )}
      <div
        className={cn(
          'flex max-w-xl flex-col gap-2 rounded-lg p-4',
          isUser
            ? 'rounded-br-none bg-primary text-primary-foreground'
            : 'rounded-bl-none border bg-card'
        )}
      >
        <div className="prose-sm prose-neutral dark:prose-invert whitespace-pre-wrap break-words">
          {message.threatData ? (
            <>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold font-headline">
                    <span className="text-2xl">🛡</span> Threat / Issue
                  </h3>
                  <p>{message.threatData.threat}</p>
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold font-headline">
                    <span className="text-2xl">⚙️</span> Steps to Fix
                  </h3>
                  <p>{message.threatData.stepsToFix}</p>
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold font-headline">
                    <span className="text-2xl">🚨</span> Precautions
                  </h3>
                  <p>{message.threatData.precautions}</p>
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold font-headline">
                    <span className="text-2xl">📜</span> Relevant Indian Laws
                  </h3>
                  <p className="font-code">{message.threatData.relevantIndianLaws}</p>
                </div>
              </div>
              <p className="mt-4 font-medium">Stay safe online! 🛡</p>
            </>
          ) : isUser ? (
            renderContentWithLinks(message.content)
          ) : isTyping ? (
            <TypingEffect text={message.content} onFinished={() => setIsTyping(false)} />
          ) : (
            renderContentWithLinks(message.content)
          )}
        </div>
        {!isUser && !isTyping && (
          <div className="-mb-2 -mr-2 mt-2 flex items-center justify-end gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBookmark}>
              <Bookmark className="h-4 w-4" />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        )}
      </div>
      {isUser && (
        <Avatar className="flex h-10 w-10 items-center justify-center rounded-full border">
          <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
