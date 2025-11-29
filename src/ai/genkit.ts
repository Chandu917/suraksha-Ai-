import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';

const plugins = [];
const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;

if (apiKey) {
  plugins.push(googleAI({ apiKey }));
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.0-flash',
});
