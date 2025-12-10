import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error('❌ CRITICAL: No Google AI API key found!');
  console.error('Please set GOOGLE_GENAI_API_KEY or GOOGLE_API_KEY in your .env file');
  throw new Error('Google AI API key is required. Please set GOOGLE_GENAI_API_KEY environment variable.');
}

console.log('✅ Google AI API key loaded successfully');

export const ai = genkit({
  plugins: [googleAI({ apiKey })],
  model: 'googleai/gemini-2.5-flash',
});
