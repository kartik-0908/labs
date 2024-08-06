import { createAzure } from '@ai-sdk/azure';

export const gpt4o = createAzure({
    resourceName:'yuga-openai',
    apiKey: process.env.AZURE_API_KEY,
});

export const gpt4omini = createAzure({
    resourceName:'yuga-openai',
    apiKey: process.env.AZURE_API_KEY,
});