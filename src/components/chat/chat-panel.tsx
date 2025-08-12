'use client'

import { useState, useEffect } from 'react'
import { type Message } from '@/lib/types'
import { getAiResponse } from '@/app/actions'
import { ChatMessages } from '@/components/chat/chat-messages'
import { ChatInputForm } from '@/components/chat/chat-input-form'
import { EmptyScreen } from './empty-screen'

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem('suraksha-chat-history')
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages))
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error)
    }
  }, [])

  useEffect(() => {
    if (messages.length) {
      localStorage.setItem('suraksha-chat-history', JSON.stringify(messages))
    }
  }, [messages])

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

    const aiMessage = await getAiResponse(newMessages)
    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)
  }
  
  const clearChat = () => {
    setMessages([])
    localStorage.removeItem('suraksha-chat-history')
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.length > 0 ? (
          <ChatMessages messages={messages} isLoading={isLoading} />
        ) : (
          <EmptyScreen onSelectPrompt={handleSendMessage} />
        )}
      </div>
      <div className="mt-auto border-t bg-background p-4">
        <ChatInputForm onSubmit={handleSendMessage} isLoading={isLoading} clearChat={clearChat} />
      </div>
    </div>
  )
}
