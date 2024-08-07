'use server';

import { cache } from 'react'
import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { gpt4o, gpt4omini } from '@/lib/azure';
import { getAllMem } from './actions';
import { groq } from '@/lib/groq';
interface MemoryCache {
    memories: any[];
    lastUpdated: number;
}

let memoryCache: MemoryCache | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

async function getCachedMemories(): Promise<any[]> {
    const now = Date.now();

    if (!memoryCache || now - memoryCache.lastUpdated > CACHE_TTL) {
        console.log('Cache miss or expired, fetching new memories');
        const memories = await getAllMem();
        memoryCache = {
            memories,
            lastUpdated: now,
        };
    } else {
        console.log('Using cached memories');
    }

    return memoryCache.memories;
}
export async function invalidateMemoriesCache() {
    memoryCache = null;
    console.log('Memory cache invalidated');
}
export async function continueConversation(messages: CoreMessage[], model: string) {
    const memories = await getCachedMemories()
    console.log(model)
    // console.log(timestamp)
    let result;

    if (model === 'gpt4o') {
        result = await streamText({
            model: gpt4o('yugaa-gpt4o'),
            system: `Your are a helpful assistant. You are given the previous memories which user has shared with you. You are also given the current conversation. Answer the user's question using only the given memories. If you don't know the answer, just say that you don't know, don't try to make up an answer. 
            
            Memories: ${memories.map((mem: any) => mem.memory).join('\n\n')}\n\n
            `,
            messages,
        });
    }
    if (model === 'gpt4omini') {
        result = await streamText({
            model: gpt4omini('gpt-4o-mini'),
            system: `Your are a helpful assistant. You are given the previous memories which user has shared with you. You are also given the current conversation. Answer the user's question using only the given memories. If you don't know the answer, just say that you don't know, don't try to make up an answer. 
            
            Memories: ${memories.map((mem: any) => mem.memory).join('\n\n')}\n\n
            `,
            messages,
        });
    }
    if (model === 'groq-llama3-8b-8192') {
        result = await streamText({
            model: groq('llama3-8b-8192'),
            system: `Your are a helpful assistant. You are given the previous memories which user has shared with you. You are also given the current conversation. Answer the user's question using only the given memories. If you don't know the answer, just say that you don't know, don't try to make up an answer. 
            
            Memories: ${memories.map((mem: any) => mem.memory).join('\n\n')}\n\n
            `,
            messages,
        });
    }
    const stream = createStreamableValue(result?.textStream);
    return stream.value;

}