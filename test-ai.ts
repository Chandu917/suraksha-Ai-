import * as dotenv from 'dotenv';
dotenv.config();

async function run() {
    const { generalChat } = await import('./src/ai/flows/general-chat');
    try {
        console.log('Current directory:', process.cwd());
        console.log('GOOGLE_API_KEY present:', !!process.env.GOOGLE_API_KEY);
        console.log('GOOGLE_GENAI_API_KEY present:', !!process.env.GOOGLE_GENAI_API_KEY);

        if (!process.env.GOOGLE_API_KEY) {
            console.error('ERROR: GOOGLE_API_KEY is missing from environment variables.');
            process.exit(1);
        }

        console.log('Testing AI connection...');
        const result = await generalChat({ userInput: 'Hello' });
        console.log('AI Response:', JSON.stringify(result, null, 2));
    } catch (e) {
        console.error('AI Error:', e);
        process.exit(1);
    }
}
run();
