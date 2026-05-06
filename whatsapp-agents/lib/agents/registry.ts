import { ClaudeCliAdapter } from './claude-cli';
import { CodexCliAdapter } from './codex-cli';
import { GoogleStubAdapter } from './google-stub';
import type { AgentAdapter } from './types';
import type { Agent, AgentBackend } from '@/lib/db/queries';

const defaultModels: Record<AgentBackend, string> = {
  anthropic: 'claude-sonnet-4-6',
  openai: 'gpt-4.1',
  google: 'gemini-2.0-flash',
};

export function getAdapter(agent: Agent): AgentAdapter;
export function getAdapter(backend: AgentBackend, model: string): AgentAdapter;
export function getAdapter(agentOrBackend: Agent | AgentBackend, model = defaultModels[agentOrBackend as AgentBackend]): AgentAdapter {
  const agent =
    typeof agentOrBackend === 'string'
      ? {
          id: 0,
          slug: agentOrBackend,
          displayName: agentOrBackend,
          backend: agentOrBackend,
          model,
          systemPrompt: '',
          enabled: true,
          createdAt: '',
          updatedAt: '',
        }
      : agentOrBackend;

  if (agent.backend === 'anthropic') {
    return new ClaudeCliAdapter(agent);
  }
  if (agent.backend === 'openai') {
    return new CodexCliAdapter(agent);
  }
  return new GoogleStubAdapter();
}
