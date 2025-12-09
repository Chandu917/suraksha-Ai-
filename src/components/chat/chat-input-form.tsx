'use client'

import { useState, useRef, type FormEvent } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { SendHorizonal, Plus, Trash2, Sparkles } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

import { type Message } from '@/lib/types'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
    <TooltipProvider>
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-3xl mx-auto items-start gap-4"
      >
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button type="button" size="icon" variant="outline" className="shrink-0" disabled={isLoading}>
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">New Chat</span>
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="top">Clear Chat</TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear your current chat history. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={clearChat}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>



        <div className="relative flex-1">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about a phishing email, a suspicious link, or Indian cyber laws..."
            className="min-h-[48px] resize-none rounded-2xl border-2 border-border/80 bg-muted/80 pr-16 shadow-sm focus:border-primary/50"
            rows={1}
            disabled={isLoading}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon" className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white" disabled={isLoading || !input.trim()}>
                  <SendHorizonal className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Send Message</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </form>
    </TooltipProvider>
  )
}
