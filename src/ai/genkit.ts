import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';

const plugins = [];
const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error('❌ CRITICAL: No Google AI API key found!');
  console.error('Please set GOOGLE_GENAI_API_KEY or GOOGLE_API_KEY in your .env file');
} else {
  console.log('✅ Google AI API key loaded successfully');
  plugins.push(googleAI({ apiKey }));
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-1.5-flash',
});
