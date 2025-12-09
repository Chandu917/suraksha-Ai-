import type { ThreatExplainerOutput } from '@/ai/flows/threat-explainer'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  threatData?: ThreatExplainerOutput
}

export interface SavedItem {
  id: string
  savedAt: string
  message: Message
}

export interface SharedChat {
  id: string
  title: string
  messages: Message[]
  createdAt: string
}

export interface ShareResult {
  success: boolean
  shareUrl?: string
  error?: string
}
