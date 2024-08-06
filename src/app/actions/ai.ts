'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { gpt4o, gpt4omini } from '@/lib/azure';
import { getAllMem } from './actions';
export async function continueConversation(messages: CoreMessage[], model: string) {
    const memories = await getAllMem();
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
    const stream = createStreamableValue(result?.textStream);
    return stream.value;

}