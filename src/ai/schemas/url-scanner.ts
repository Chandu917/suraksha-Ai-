/**
 * @fileOverview This file contains the Zod schemas for the URL scanning flow.
 */

import {z} from 'genkit';

export const ScanUrlInputSchema = z.object({
  url: z.string().url().describe('The URL to be analyzed for threats.'),
});
export type ScanUrlInput = z.infer<typeof ScanUrlInputSchema>;

export const ScanUrlOutputSchema = z.object({
  isSafe: z
    .boolean()
    .describe('Whether the URL is considered safe or not.'),
  threatType: z
    .enum(['None', 'Phishing', 'Malware', 'Spam', 'Suspicious', 'Unknown'])
    .describe('The type of threat detected.'),
  report: z.string().describe('A detailed report of the findings.'),
});
export type ScanUrlOutput = z.infer<typeof ScanUrlOutputSchema>;
