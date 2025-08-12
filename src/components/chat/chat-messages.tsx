'use client'

import { type Message } from '@/lib/types'
import { ChatMessage } from '@/components/chat/chat-message'
import { useEffect, useRef } from 'react'
import { Skeleton } from '../ui/skeleton'
import { Avatar } from '../ui/avatar'
import { Shield } from 'lucide-react'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
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
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <Avatar className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
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
