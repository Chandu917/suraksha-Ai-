import * as dotenv from 'dotenv';
dotenv.config();

async function listModels() {
    const key = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!key) {
        console.error('No API Key');
        return;
    }

    console.log('Listing models...');
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', JSON.stringify(data.error, null, 2));
        } else if (data.models) {
            console.log('Available Models:');
            data.models.forEach((m: any) => {
                if (m.name.includes('gemini')) {
                    console.log(`- ${m.name} (${m.displayName})`);
                    console.log(`  Supported: ${m.supportedGenerationMethods.join(', ')}`);
                }
            });
        } else {
            console.log('No models found or unexpected response:', data);
        }
    } catch (e) {
        console.error('Fetch Error:', e);
    }
}

listModels();
