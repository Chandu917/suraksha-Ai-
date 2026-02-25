'use client'

import { type Message } from '@/lib/types'
import {
  Shield, User, Copy, Bookmark, AlertTriangle,
  ShieldCheck, AlertCircle, Landmark, Check,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Fragment, useEffect, useState, useCallback } from 'react'
import { Logo } from '../icons/logo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface ChatMessageProps {
  message: Message
  onSave: (message: Message) => void
}

/* ── Typing animation ── */
function TypingEffect({ text, onFinished }: { text: string; onFinished: () => void }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (displayed.length >= text.length) {
      onFinished()
      return
    }
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 3)), 8)
    return () => clearTimeout(t)
  }, [text, displayed, onFinished])

  return <>{displayed}</>
}

/* ── Render plain text with clickable URLs ── */
function renderTextWithLinks(content: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = content.split(urlRegex)
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline hover:text-blue-300 transition-colors"
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

/* ── Render markdown-like formatting ── */
function renderMarkdown(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Heading ##
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-white mt-4 mb-2 first:mt-0">
          {line.slice(3)}
        </h3>
      )
    }
    // Heading #
    else if (line.startsWith('# ')) {
      elements.push(
        <h2 key={i} className="text-lg font-bold text-white mt-4 mb-2 first:mt-0">
          {line.slice(2)}
        </h2>
      )
    }
    // Bullet point - or *
    else if (/^[-*]\s/.test(line)) {
      const bulletItems: string[] = []
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        bulletItems.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-2 space-y-1 pl-1">
          {bulletItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-white/80">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
              <span>{renderInlineFormatting(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }
    // Numbered list
    else if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-2 space-y-1 pl-1">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-white/80">
              <span className="mt-0.5 text-primary/60 font-bold text-xs w-4 flex-shrink-0">{j + 1}.</span>
              <span>{renderInlineFormatting(item)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }
    // Code block ```
    else if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre key={i} className="my-3 rounded-xl bg-white/5 border border-white/10 p-4 overflow-x-auto">
          <code className="text-xs text-green-300/80 font-mono leading-relaxed">
            {codeLines.join('\n')}
          </code>
        </pre>
      )
    }
    // Horizontal rule ---
    else if (line === '---' || line === '***') {
      elements.push(<hr key={i} className="my-3 border-white/10" />)
    }
    // Empty line = paragraph break
    else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />)
    }
    // Regular paragraph
    else {
      elements.push(
        <p key={i} className="text-sm text-white/85 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      )
    }

    i++
  }

  return <>{elements}</>
}

/* ── Bold / italic / inline code ── */
function renderInlineFormatting(text: string): React.ReactNode {
  // Handle **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|https?:\/\/[^\s]+)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i} className="italic text-white/80">{part.slice(1, -1)}</em>
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="px-1.5 py-0.5 rounded bg-white/10 text-green-300/80 font-mono text-xs">{part.slice(1, -1)}</code>
    if (/^https?:\/\//.test(part))
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">{part}</a>
    return <Fragment key={i}>{part}</Fragment>
  })
}

/* ═══════════════════════════════════════════════════
   MAIN ChatMessage component
═══════════════════════════════════════════════════ */
export function ChatMessage({ message, onSave }: ChatMessageProps) {
  const { toast } = useToast()
  const isUser = message.role === 'user'
  const [isTyping, setIsTyping] = useState(message.role === 'assistant' && !message.threatData)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [message.content])

  const handleSave = useCallback(() => onSave(message), [message, onSave])

  /* ── USER bubble ── */
  if (isUser) {
    return (
      <div className="flex justify-end px-2 py-3">
        <div className="flex items-end gap-2 max-w-[75%]">
          <div
            className="px-4 py-3 rounded-2xl rounded-br-sm text-sm font-medium text-white leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
              boxShadow: '0 2px 16px rgba(37,99,235,0.25)',
            }}
          >
            {message.content}
          </div>
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center mb-0.5">
            <User size={13} className="text-primary" />
          </div>
        </div>
      </div>
    )
  }

  /* ── AI bubble (full-width, expands with content) ── */
  return (
    <div className="flex items-start gap-3 px-2 py-4 group">

      {/* AI avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
        <Logo className="w-4 h-4 text-primary" />
      </div>

      {/* AI response content — no max-width, grows full width */}
      <div className="flex-1 min-w-0">

        {/* Sender label */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
            SurakshaAI
          </span>
        </div>

        {/* ── Threat data accordion ── */}
        {message.threatData ? (
          <div className="space-y-3">
            <Accordion type="multiple" defaultValue={['threat', 'steps']} className="space-y-2">
              <AccordionItem value="threat" className="border border-red-500/20 bg-red-500/5 rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="font-bold text-sm py-3 hover:no-underline text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                      <AlertTriangle className="h-3.5 w-3.5" />
                    </div>
                    Threat Analysis
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/70 text-sm leading-relaxed pb-4">
                  {message.threatData.threat}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="steps" className="border border-green-500/20 bg-green-500/5 rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="font-bold text-sm py-3 hover:no-underline text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    Remediation Steps
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/70 text-sm leading-relaxed pb-4">
                  {message.threatData.stepsToFix}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="precautions" className="border border-blue-500/20 bg-blue-500/5 rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="font-bold text-sm py-3 hover:no-underline text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <AlertCircle className="h-3.5 w-3.5" />
                    </div>
                    Future Precautions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/70 text-sm leading-relaxed pb-4">
                  {message.threatData.precautions}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="laws" className="border border-purple-500/20 bg-purple-500/5 rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="font-bold text-sm py-3 hover:no-underline text-white/90">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Landmark className="h-3.5 w-3.5" />
                    </div>
                    Legal Framework (India)
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 font-mono text-[11px] text-purple-300/80 leading-relaxed">
                    {message.threatData.relevantIndianLaws}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center gap-2 pt-1">
              <Shield className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25">Neural Guard Active</span>
            </div>
          </div>

        ) : (
          /* ── Regular text response — full width, no box ── */
          <div className="text-sm text-white/85 leading-relaxed space-y-1">
            {isTyping ? (
              <TypingEffect text={message.content} onFinished={() => setIsTyping(false)} />
            ) : (
              renderMarkdown(message.content)
            )}
          </div>
        )}

        {/* ── Action buttons (appear on hover) ── */}
        {!isTyping && (
          <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleCopy}
              title="Copy response"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleSave}
              title="Save to library"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              <Bookmark size={12} /> Save
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
