import type { ThreatExplainerOutput } from '@/ai/flows/threat-explainer'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  threatData?: ThreatExplainerOutput
}
