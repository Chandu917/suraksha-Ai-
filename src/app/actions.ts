'use server'

import { detectMode } from '@/ai/flows/mode-detection'
import { threatExplainer } from '@/ai/flows/threat-explainer'
import { type Message } from '@/lib/types'

export async function getAiResponse(history: Message[]): Promise<Message> {
  const id = crypto.randomUUID()
  const lastUserMessage = history.findLast(m => m.role === 'user')

  if (!lastUserMessage) {
    return {
      id,
      role: 'assistant',
      content: 'An error occurred. Please try sending your message again.',
    }
  }

  try {
    const { mode } = await detectMode({ userInput: lastUserMessage.content })

    switch (mode) {
      case 'Greeting':
        return {
          id,
          role: 'assistant',
          content: 'Hey there! 👋 I’m SurakshaGPT, your cyber safety buddy. How can I help you today?',
        }

      case 'CybersecurityThreat':
      case 'DeepDive':
      case 'CybersecurityOnly':
      case 'IndianLaw': {
        const threatExplanation = await threatExplainer({
          threatDescription: lastUserMessage.content,
        })
        const fullContent = [
          threatExplanation.threat,
          threatExplanation.stepsToFix,
          threatExplanation.precautions,
          threatExplanation.relevantIndianLaws,
        ].join('\n\n')

        return {
          id,
          role: 'assistant',
          content: fullContent,
          threatData: threatExplanation,
        }
      }

      case 'ProblemTrouble':
        return {
          id,
          role: 'assistant',
          content: 'I understand you might have a problem. Could you please describe it in more detail so I can assist you better?',
        }

      case 'Unknown':
      default:
        return {
          id,
          role: 'assistant',
          content: "I'm not quite sure how to respond to that. I specialize in cybersecurity and Indian cyber laws. Could you try rephrasing, or ask me about a security topic?",
        }
    }
  } catch (error) {
    console.error('Error getting AI response:', error);
    return {
      id,
      role: 'assistant',
      content: 'Sorry, I encountered an error while processing your request. Please try again later.',
    };
  }
}
