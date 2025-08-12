'use server';

/**
 * @fileOverview This file contains the URL scanning flow for SurakshaAI.
 *
 * - scanUrl - A function that analyzes a URL for potential threats.
 */

import {ai} from '@/ai/genkit';
import {
  ScanUrlInputSchema,
  type ScanUrlInput,
  ScanUrlOutputSchema,
  type ScanUrlOutput,
} from '@/ai/schemas/url-scanner';

export async function scanUrl(input: ScanUrlInput): Promise<ScanUrlOutput> {
  return urlScannerFlow(input);
}

const urlScannerPrompt = ai.definePrompt({
  name: 'urlScannerPrompt',
  input: {schema: ScanUrlInputSchema},
  output: {schema: ScanUrlOutputSchema},
  prompt: `You are a highly advanced URL Threat Scanner for SurakshaAI. Your task is to analyze the given URL and determine if it's safe.

Analyze the following URL: {{{url}}}

Based on your analysis, provide a detailed report. Consider the following:
- Domain reputation and age.
- Use of HTTPS.
- Presence of suspicious keywords or patterns in the URL.
- Common phishing or malware indicators.
- If it's a shortened URL, what might it be hiding?

Based on your analysis, determine if the URL is safe, the threat type, and generate a concise report.
`,
});

const urlScannerFlow = ai.defineFlow(
  {
    name: 'urlScannerFlow',
    inputSchema: ScanUrlInputSchema,
    outputSchema: ScanUrlOutputSchema,
  },
  async input => {
    const {output} = await urlScannerPrompt(input);
    return output!;
  }
);
