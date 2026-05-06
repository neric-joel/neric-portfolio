import Anthropic from '@anthropic-ai/sdk';
import type { AgentAdapter, ChatMessage } from './types';

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export class AnthropicAdapter implements AgentAdapter {
  constructor(private readonly model: string) {}

  async *stream(systemPrompt: string, history: ChatMessage[], userContent: string): AsyncGenerator<string> {
    const stream = getClient().messages.stream({
      model: this.model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [...history, { role: 'user', content: userContent }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  }
}
