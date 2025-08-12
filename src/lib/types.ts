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
