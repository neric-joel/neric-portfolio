import { spawn } from 'node:child_process';
import type { Agent } from '@/lib/db/queries';
import type { AgentAdapter, ChatMessage } from './types';

function formatHistory(history: ChatMessage[]): string {
  return history.map((message) => `${message.role}: ${message.content}`).join('\n');
}

function withPersonaPrefix(agentDisplayName: string, systemPrompt: string): string {
  const prefix =
    `You are ${agentDisplayName}, a friendly AI participating in a group chat with other agents and the user. ` +
    'Be conversational and concise. Respond naturally like you are texting in a group chat.';

  if (systemPrompt.startsWith(`You are ${agentDisplayName}, a friendly AI participating in a group chat`)) {
    return systemPrompt;
  }

  return systemPrompt ? `${prefix}\n\n${systemPrompt}` : prefix;
}

function buildPrompt(agentDisplayName: string, systemPrompt: string, history: ChatMessage[], userContent: string): string {
  const personaPrompt = withPersonaPrefix(agentDisplayName, systemPrompt);

  return [
    `[System: ${personaPrompt}]`,
    '',
    'Conversation history:',
    formatHistory(history),
    '',
    `User: ${userContent}`,
  ].join('\n');
}

export class ClaudeCliAdapter implements AgentAdapter {
  constructor(private readonly agent: Agent) {}

  async *stream(systemPrompt: string, history: ChatMessage[], userContent: string): AsyncGenerator<string> {
    const child = spawn('claude', ['--print'], { shell: false, env: { ...process.env } });
    const prompt = buildPrompt(this.agent.displayName, systemPrompt, history, userContent);
    let stderr = '';

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (chunk: string) => {
      stderr += chunk;
    });

    const closePromise = new Promise<number | null>((resolve, reject) => {
      child.on('error', (error) => {
        const detail = stderr.trim();
        reject(new Error(detail ? `${error.message}\n${detail}` : error.message));
      });
      child.on('close', resolve);
    });

    child.stdin.end(prompt);

    for await (const chunk of child.stdout) {
      yield chunk.toString();
    }

    const code = await closePromise;
    if (code !== 0) {
      throw new Error(stderr.trim() || `claude exited with code ${code}`);
    }
  }
}
