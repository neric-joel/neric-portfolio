import { AnthropicAdapter } from './anthropic';
import { GoogleAdapter } from './google';
import { OpenAiAdapter } from './openai';
import type { AgentAdapter } from './types';
import type { AgentBackend } from '@/lib/db/queries';

const defaultModels: Record<AgentBackend, string> = {
  anthropic: 'claude-sonnet-4-6',
  openai: 'gpt-4.1',
  google: 'gemini-2.0-flash',
};

export function getAdapter(backend: AgentBackend): AgentAdapter;
export function getAdapter(backend: AgentBackend, model: string): AgentAdapter;
export function getAdapter(backend: AgentBackend, model = defaultModels[backend]): AgentAdapter {
  if (backend === 'anthropic') {
    return new AnthropicAdapter(model);
  }
  if (backend === 'openai') {
    return new OpenAiAdapter(model);
  }
  return new GoogleAdapter(model);
}
