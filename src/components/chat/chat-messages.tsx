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
          <div className="flex w-full flex-col gap-1 items-start">
            <div className="flex max-w-[85%] flex-col gap-2 rounded-2xl rounded-bl-sm px-5 py-3 shadow-sm bg-muted/50 border border-border/50">
              <div className="space-y-2 w-full min-w-[200px]">
                <Skeleton className="h-4 w-3/4 bg-foreground/10" />
                <Skeleton className="h-4 w-1/2 bg-foreground/10" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
