'use client'

import { useState, useEffect } from 'react'
import { type Message, type SavedItem } from '@/lib/types'
import { getAiResponse } from '@/app/actions'
import { ChatMessages } from '@/components/chat/chat-messages'
import { ChatInputForm } from '@/components/chat/chat-input-form'
import { EmptyScreen } from './empty-screen'
import { useToast } from '@/hooks/use-toast'

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

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
    if (messages.length > 0) {
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

    try {
      const aiMessage = await getAiResponse(newMessages)
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error("Failed to get AI response", error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from SurakshaAI. Please try again.',
      })
      // Optionally remove the user message if it failed, or keep it to allow retry
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem('suraksha-chat-history')
  }

  const saveToLibrary = (message: Message) => {
    try {
      const savedItems: SavedItem[] = JSON.parse(localStorage.getItem('suraksha-library-items') || '[]')

      if (savedItems.some(item => item.message.id === message.id)) {
        toast({
          description: "This message is already in your Library.",
        })
        return
      }

      const newItem: SavedItem = {
        id: crypto.randomUUID(),
        savedAt: new Date().toISOString(),
        message: message,
      }

      const updatedItems = [newItem, ...savedItems]
      localStorage.setItem('suraksha-library-items', JSON.stringify(updatedItems))
      toast({
        description: "Message saved to your Library!",
      })
    } catch (error) {
      console.error("Failed to save to library", error)
      toast({
        variant: 'destructive',
        description: "Could not save message. Please try again.",
      })
    }
  }

  return (
    <div className="relative flex h-full flex-col bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl h-full">
          {messages.length > 0 ? (
            <ChatMessages messages={messages} isLoading={isLoading} onSaveMessage={saveToLibrary} />
          ) : (
            <EmptyScreen onSelectPrompt={handleSendMessage} />
          )}
        </div>
      </div>
      <div className="mt-auto p-4 bg-background">
        <ChatInputForm onSubmit={handleSendMessage} isLoading={isLoading} clearChat={clearChat} />
      </div>
    </div>
  )
}
