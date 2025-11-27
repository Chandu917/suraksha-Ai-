'use server'

import { detectMode } from '@/ai/flows/mode-detection'
import { threatExplainer } from '@/ai/flows/threat-explainer'
import { scanUrl } from '@/ai/flows/url-scanner'
import { checkPasswordStrength } from '@/ai/flows/password-strength-checker'
import { generalChat } from '@/ai/flows/general-chat'
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

      case 'GeneralChat':
      case 'Unknown':
      case 'Greeting': // Greeting can also be handled by general chat for more variety
        const chatResponse = await generalChat({
          userInput: lastUserMessage.content,
          history: history.map(m => ({ role: m.role, content: m.content }))
        })
        return {
          id,
          role: 'assistant',
          content: chatResponse.response,
        }
    }
  } catch (error) {
    console.error('Error getting AI response:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    // Check if it's a specific Genkit error or API error if possible, otherwise generic
    return {
      id,
      role: 'assistant',
      content: 'I apologize, but I encountered a temporary issue connecting to my AI brain. Please check your internet connection or try again in a moment.',
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
