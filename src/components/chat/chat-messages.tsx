'use client'

import { type Message } from '@/lib/types'
import { ChatMessage } from '@/components/chat/chat-message'
import { useEffect, useRef } from 'react'
import { Skeleton } from '../ui/skeleton'
import { Avatar } from '../ui/avatar'
import { Logo } from '../icons/logo'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  onSaveMessage: (message: Message) => void
}

export function ChatMessages({ messages, isLoading, onSaveMessage }: ChatMessagesProps) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  return (
    <div ref={scrollableContainerRef} className="h-full overflow-y-auto p-4 md:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} onSave={onSaveMessage} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-background">
              <Logo className="h-6 w-6 animate-spin" />
            </Avatar>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
