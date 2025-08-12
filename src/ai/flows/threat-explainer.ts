// threat-explainer.ts
'use server';
/**
 * @fileOverview Explains cybersecurity threats and their legal implications.
 *
 * - threatExplainer - A function that explains the cybersecurity threat.
 * - ThreatExplainerInput - The input type for the threatExplainer function.
 * - ThreatExplainerOutput - The return type for the threatExplainer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThreatExplainerInputSchema = z.object({
  threatDescription: z
    .string()
    .describe('A description of the potential cybersecurity threat.'),
});
export type ThreatExplainerInput = z.infer<typeof ThreatExplainerInputSchema>;

const ThreatExplainerOutputSchema = z.object({
  threat: z.string().describe('A clear explanation of the cybersecurity threat.'),
  stepsToFix: z.string().describe('Numbered steps on how to address the threat.'),
  precautions: z.string().describe('Tips for preventing future occurrences of the threat.'),
  relevantIndianLaws: z
    .string()
    .describe('References to relevant sections of the IT Act 2000 and IPC.'),
});
export type ThreatExplainerOutput = z.infer<typeof ThreatExplainerOutputSchema>;

export async function threatExplainer(input: ThreatExplainerInput): Promise<ThreatExplainerOutput> {
  return threatExplainerFlow(input);
}

const threatExplainerPrompt = ai.definePrompt({
  name: 'threatExplainerPrompt',
  input: {schema: ThreatExplainerInputSchema},
  output: {schema: ThreatExplainerOutputSchema},
  prompt: `You are SurakshaGPT, an expert Indian cybersecurity & legal assistant.

  A user has described a potential cybersecurity threat. Explain the threat, suggest steps to fix it, give precautions, and cite relevant Indian laws.

  Threat Description: {{{threatDescription}}}

  Reply in 4 fixed sections:

  🛡 Threat / Issue → Explain clearly.
  ⚙️ Steps to Fix → Numbered steps, actionable.
  🚨 Precautions → Future prevention tips.
  📜 Relevant Indian Laws → IT Act & IPC references.

  Keep it simple but accurate.

  Use bullet points & numbering in steps.

  End with: "Stay safe online! 🛡"
  `,
});

const threatExplainerFlow = ai.defineFlow(
  {
    name: 'threatExplainerFlow',
    inputSchema: ThreatExplainerInputSchema,
    outputSchema: ThreatExplainerOutputSchema,
  },
  async input => {
    const {output} = await threatExplainerPrompt(input);
    return output!;
  }
);
