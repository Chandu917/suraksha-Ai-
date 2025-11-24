// general-chat.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneralChatInputSchema = z.object({
    userInput: z.string().describe('The user input to respond to.'),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string()
    })).optional().describe('Chat history for context')
});
export type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const GeneralChatOutputSchema = z.object({
    response: z.string().describe('The AI response to the user.'),
});
export type GeneralChatOutput = z.infer<typeof GeneralChatOutputSchema>;

export async function generalChat(input: GeneralChatInput): Promise<GeneralChatOutput> {
    return generalChatFlow(input);
}

const generalChatPrompt = ai.definePrompt({
    name: 'generalChatPrompt',
    input: { schema: GeneralChatInputSchema },
    output: { schema: GeneralChatOutputSchema },
    prompt: `You are SurakshaGPT, a helpful and knowledgeable cybersecurity assistant for Indian users.
  
  Your goal is to help users with cybersecurity questions, best practices, and general online safety.
  You can also answer general greetings and questions about yourself.
  
  If the user asks about a specific threat that requires detailed analysis, you should briefly explain it and suggest they provide more details for a full "Threat Analysis".
  
  Keep your responses concise, friendly, and easy to understand.
  
  User Input: {{{userInput}}}
  `,
});

const generalChatFlow = ai.defineFlow(
    {
        name: 'generalChatFlow',
        inputSchema: GeneralChatInputSchema,
        outputSchema: GeneralChatOutputSchema,
    },
    async input => {
        const { output } = await generalChatPrompt(input);
        return output!;
    }
);
