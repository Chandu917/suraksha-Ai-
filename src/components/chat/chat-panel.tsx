'use client'

import { useState, useEffect, useRef } from 'react'
import { type Message, type SavedItem } from '@/lib/types'
import { getAiResponse } from '@/app/actions'
import { ChatMessages } from '@/components/chat/chat-messages'
import { ChatInputForm } from '@/components/chat/chat-input-form'
import { EmptyScreen } from './empty-screen'
import { useToast } from '@/hooks/use-toast'

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Load chat history from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('suraksha-chat-history')
        if (stored) setMessages(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to parse chat history', e)
    }
  }, [])

  // Persist chat history
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem('suraksha-chat-history', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSendMessage = async (input: string) => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const aiMessage = await getAiResponse(newMessages)
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI response failed', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from SurakshaAI. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('suraksha-chat-history')
    }
  }

  const saveToLibrary = (message: Message) => {
    if (typeof window === 'undefined') return
    try {
      const savedItems: SavedItem[] = JSON.parse(localStorage.getItem('suraksha-library-items') || '[]')
      if (savedItems.some(item => item.message.id === message.id)) {
        toast({ description: 'Already in your Library.' })
        return
      }
      const newItem: SavedItem = { id: crypto.randomUUID(), savedAt: new Date().toISOString(), message }
      localStorage.setItem('suraksha-library-items', JSON.stringify([newItem, ...savedItems]))
      toast({ description: 'Saved to Library!' })
    } catch (e) {
      console.error('Failed to save to library', e)
      toast({ variant: 'destructive', description: 'Could not save message.' })
    }
  }

  return (
    /*
     * Full-height flex column.
     * Messages area: flex-1 + overflow-y-auto → scrolls naturally.
     * Input: sticky at bottom, never overlaps messages.
     */
    <div className="flex flex-col h-full bg-background">

      {/* ── Background decorations ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* ── Messages area — scrolls, grows with content ── */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 pb-2">
          {messages.length > 0 ? (
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              onSaveMessage={saveToLibrary}
            />
          ) : (
            <EmptyScreen onSelectPrompt={handleSendMessage} />
          )}
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* ── Sticky input bar at bottom ── */}
      <div className="relative z-10 sticky bottom-0 bg-background/90 backdrop-blur-xl border-t border-white/5 px-4 py-4">
        <ChatInputForm
          onSubmit={handleSendMessage}
          isLoading={isLoading}
          clearChat={clearChat}
          messages={messages}
        />
      </div>
    </div>
  )
}
