import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AgentAdapter, ChatMessage } from './types';

let client: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!client) {
    client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? '');
  }
  return client;
}

function toGoogleRole(role: ChatMessage['role']): 'user' | 'model' {
  return role === 'assistant' ? 'model' : 'user';
}

export class GoogleAdapter implements AgentAdapter {
  constructor(private readonly model: string) {}

  async *stream(systemPrompt: string, history: ChatMessage[], userContent: string): AsyncGenerator<string> {
    const model = getClient().getGenerativeModel({
      model: this.model,
      systemInstruction: systemPrompt,
    });
    const stream = await model.generateContentStream({
      contents: [
        ...history.map((message) => ({
          role: toGoogleRole(message.role),
          parts: [{ text: message.content }],
        })),
        { role: 'user', parts: [{ text: userContent }] },
      ],
    });

    for await (const chunk of stream.stream) {
      const token = chunk.text();
      if (token) {
        yield token;
      }
    }
  }
}
