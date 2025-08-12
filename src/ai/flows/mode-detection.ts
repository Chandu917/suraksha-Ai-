// This file uses server-side code.
'use server';

/**
 * @fileOverview This file contains the mode detection flow for SurakshaAI.
 *
 * - detectMode - A function that determines the appropriate interaction mode based on user input.
 * - DetectModeInput - The input type for the detectMode function.
 * - DetectModeOutput - The return type for the detectMode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectModeInputSchema = z.object({
  userInput: z.string().describe('The user input to analyze.'),
});
export type DetectModeInput = z.infer<typeof DetectModeInputSchema>;

const DetectModeOutputSchema = z.object({
  mode: z
    .enum([
      'Greeting',
      'CybersecurityThreat',
      'ProblemTrouble',
      'DeepDive',
      'CybersecurityOnly',
      'IndianLaw',
      'Unknown',
    ])
    .describe('The detected interaction mode.'),
  reason: z.string().describe('The reason for the mode detection.'),
});
export type DetectModeOutput = z.infer<typeof DetectModeOutputSchema>;

export async function detectMode(input: DetectModeInput): Promise<DetectModeOutput> {
  return detectModeFlow(input);
}

const modeDetectionPrompt = ai.definePrompt({
  name: 'modeDetectionPrompt',
  input: {schema: DetectModeInputSchema},
  output: {schema: DetectModeOutputSchema},
  prompt: `You are an AI assistant that analyzes user input and determines the appropriate interaction mode for SurakshaGPT, a cybersecurity and legal assistant for Indian users.

Here are the possible interaction modes:
- Greeting: The user is simply greeting the assistant (e.g., "hi", "hello").
- CybersecurityThreat: The user is asking about a specific cybersecurity threat (e.g., phishing, malware, ransomware).
- ProblemTrouble: The user is indicating they have a problem or are in trouble and need help.
- DeepDive: The user is asking for more in-depth information about a topic.
- CybersecurityOnly: The user is explicitly asking for only cybersecurity details, skipping greetings and extras.
- IndianLaw: The user is asking about legal actions related to cybercrime in India.
- Unknown: The mode cannot be determined from the user input.

Analyze the following user input and determine the most appropriate mode. Explain the reasoning behind your choice.

User Input: {{{userInput}}}

Respond with a JSON object that follows this schema:
${JSON.stringify(DetectModeOutputSchema)}
`,
});

const detectModeFlow = ai.defineFlow(
  {
    name: 'detectModeFlow',
    inputSchema: DetectModeInputSchema,
    outputSchema: DetectModeOutputSchema,
  },
  async input => {
    const {output} = await modeDetectionPrompt(input);
    return output!;
  }
);
