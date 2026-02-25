'use client'

import { type Message } from '@/lib/types'
import { ChatMessage } from '@/components/chat/chat-message'
import { Logo } from '../icons/logo'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  onSaveMessage: (message: Message) => void
}

export function ChatMessages({ messages, isLoading, onSaveMessage }: ChatMessagesProps) {
  return (
    /*
     * No fixed height, no internal scroll.
     * Just a plain vertical list — the parent container scrolls.
     */
    <div className="flex flex-col gap-0">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} onSave={onSaveMessage} />
      ))}

      {/* ── Thinking indicator ── */}
      {isLoading && (
        <div className="flex items-start gap-3 py-6 px-2">
          {/* AI avatar */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Logo className="w-4 h-4 text-primary" />
          </div>
          {/* Pulsing dots */}
          <div className="flex items-center gap-1 pt-2">
            <span
              className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
