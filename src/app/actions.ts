'use server'

import { detectMode } from '@/ai/flows/mode-detection'
import { threatExplainer } from '@/ai/flows/threat-explainer'
import { scanUrl } from '@/ai/flows/url-scanner'
import { checkPasswordStrength } from '@/ai/flows/password-strength-checker'
import { type PasswordStrengthInput, type PasswordStrengthOutput } from '@/ai/flows/password-strength-checker'
import { type ScanUrlInput, type ScanUrlOutput } from '@/ai/schemas/url-scanner'
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
          content: "It sounds like you're dealing with a security concern. I'm here to help. Please describe the situation in as much detail as you can. For example, you can paste the full text of a suspicious email, SMS, or share a link you're worried about. The more information you provide, the better I can assist you.",
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


export async function getUrlScanResponse(input: ScanUrlInput): Promise<ScanUrlOutput> {
  try {
    const result = await scanUrl(input);
    return result;
  } catch (error) {
    console.error('Error getting URL scan response:', error);
    return {
      isSafe: false,
      threatType: 'Unknown',
      report: 'Sorry, I encountered an error while scanning the URL. Please try again later.',
    };
  }
}

export async function getPasswordStrengthResponse(input: PasswordStrengthInput): Promise<PasswordStrengthOutput> {
    try {
        return await checkPasswordStrength(input);
    } catch (error) {
        console.error('Error getting password strength response:', error);
        return {
            score: 0,
            strength: 'Very Weak',
            suggestions: ['Could not analyze password due to an error.'],
            feedback: 'Sorry, I encountered an error while analyzing the password. Please try again later.',
        };
    }
}
