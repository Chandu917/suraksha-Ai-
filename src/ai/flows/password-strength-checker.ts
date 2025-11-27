'use server';

/**
 * @fileOverview This file contains the password strength checker flow.
 *
 * - checkPasswordStrength - A function that analyzes a password for its strength.
 * - PasswordStrengthInput - The input type for the checkPasswordStrength function.
 * - PasswordStrengthOutput - The return type for the checkPasswordStrength function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PasswordStrengthInputSchema = z.object({
  password: z.string().describe('The password to be analyzed.'),
});
export type PasswordStrengthInput = z.infer<typeof PasswordStrengthInputSchema>;

const PasswordStrengthOutputSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score from 0 to 100 representing the password strength. 0 is weakest, 100 is strongest.'
    ),
  strength: z
    .enum(['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'])
    .describe('A qualitative assessment of the password strength.'),
  suggestions: z
    .array(z.string())
    .describe(
      'A list of actionable suggestions to improve the password strength.'
    ),
  feedback: z
    .string()
    .describe(
      'A general feedback message about the password strength and why it is rated as such.'
    ),
});
export type PasswordStrengthOutput = z.infer<typeof PasswordStrengthOutputSchema>;

export async function checkPasswordStrength(
  input: PasswordStrengthInput
): Promise<PasswordStrengthOutput> {
  return passwordStrengthCheckerFlow(input);
}

const passwordStrengthPrompt = ai.definePrompt({
  name: 'passwordStrengthPrompt',
  input: { schema: PasswordStrengthInputSchema },
  output: { schema: PasswordStrengthOutputSchema },
  prompt: `You are a cybersecurity expert specializing in password security. Analyze the provided password based on various criteria and provide a detailed strength assessment.

Password to analyze: {{{password}}}

Analysis Criteria:
- Length (e.g., shorter passwords are weaker)
- Character variety (presence of uppercase letters, lowercase letters, numbers, and symbols)
- Common patterns (e.g., '123456', 'password', 'qwerty')
- Uniqueness (avoiding common words or names)

Based on your analysis, provide a response in the specified JSON format.
- The 'score' should be an integer between 0 and 100.
- The 'strength' should be one of 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'.
- The 'suggestions' should be a list of clear, actionable tips.
- The 'feedback' should be a concise paragraph explaining the rating.`,
});

const passwordStrengthCheckerFlow = ai.defineFlow(
  {
    name: 'passwordStrengthCheckerFlow',
    inputSchema: PasswordStrengthInputSchema,
    outputSchema: PasswordStrengthOutputSchema,
  },
  async input => {
    // Basic validation to prevent sending empty passwords to the AI
    if (!input.password || input.password.length === 0) {
      return {
        score: 0,
        strength: 'Very Weak' as const,
        suggestions: ['Password cannot be empty.'],
        feedback: 'Please enter a password to check its strength.',
      } satisfies PasswordStrengthOutput;
    }
    const { output } = await passwordStrengthPrompt(input);
    return output!;
  }
);
