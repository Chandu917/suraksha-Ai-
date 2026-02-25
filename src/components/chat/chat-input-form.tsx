'use client'

import { useState, useRef, type FormEvent } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { type Message } from '@/lib/types'

interface ChatInputFormProps {
  onSubmit: (input: string) => Promise<void>
  isLoading: boolean
  clearChat: () => void
  messages: Message[]
}

export function ChatInputForm({ onSubmit, isLoading, clearChat, messages }: ChatInputFormProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    onSubmit(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="mx-auto max-w-3xl w-full">
      <form
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
        <div className="relative flex items-end gap-2 p-2 glass border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">

          <Textarea
            ref={inputRef}
            tabIndex={0}
            placeholder="Initialize Query... (e.g., Analyze suspicious link)"
            className="min-h-[56px] w-full resize-none bg-transparent px-4 py-[18px] focus-within:outline-none border-none text-white font-medium placeholder:text-white/20 scrollbar-none shadow-none"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <div className="flex items-center gap-2 pr-2 pb-2">
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 shrink-0 rounded-xl cyber-button neon-glow border-none"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send Data</span>
            </Button>
          </div>
        </div>
      </form>
      <p className="mt-3 text-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
        SurakshaAI can identify cyber threats but always verify sensitive information manually.
      </p>
    </div>
  )
}
