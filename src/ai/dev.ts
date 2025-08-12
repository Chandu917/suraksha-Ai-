import { config } from 'dotenv';
config();

import '@/ai/flows/threat-explainer.ts';
import '@/ai/flows/mode-detection.ts';
import '@/ai/flows/url-scanner.ts';
import '@/ai/schemas/url-scanner.ts';
