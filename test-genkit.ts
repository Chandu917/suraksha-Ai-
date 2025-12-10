import * as dotenv from 'dotenv';
dotenv.config();

import { detectMode } from './src/ai/flows/mode-detection';

async function testAI() {
    console.log('Testing AI without gateway...');
    try {
        const result = await detectMode({ userInput: 'hello' });
        console.log('✅ SUCCESS! AI Response:', result);
    } catch (error: any) {
        console.error('❌ ERROR:', error.message);
        console.error('Full error:', error);
    }
}

testAI();
