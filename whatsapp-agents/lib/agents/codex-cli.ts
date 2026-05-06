import { spawn } from 'node:child_process';
import type { Agent } from '@/lib/db/queries';
import type { AgentAdapter, ChatMessage } from './types';

function formatHistory(history: ChatMessage[]): string {
  return history.map((message) => `${message.role}: ${message.content}`).join('\n');
}

function buildPrompt(systemPrompt: string, history: ChatMessage[], userContent: string): string {
  return [`[Persona: ${systemPrompt}]`, '', formatHistory(history), '', `User: ${userContent}`].join('\n');
}

function isMetadataLine(line: string): boolean {
  const trimmed = line.trim();

  return (
    /^codex$/i.test(trimmed) ||
    /^tokens used$/i.test(trimmed) ||
    /^\d[\d,]*$/.test(trimmed) ||
    trimmed.length === 0 ||
    /^OpenAI Codex\b/.test(trimmed) ||
    /^-+$/.test(trimmed) ||
    /^(workdir|model|provider|approval|sandbox|reasoning effort|reasoning summaries|session id):/i.test(trimmed) ||
    /^(user|exec)$/i.test(trimmed) ||
    /^(succeeded|failed) in \d+ms:/i.test(trimmed) ||
    /^Reading additional input from stdin\.\.\.$/i.test(trimmed)
  );
}

export function parseCodexStdout(raw: string): string {
  const block: string[] = [];

  for (const line of raw.replace(/\r\n/g, '\n').split('\n')) {
    if (isMetadataLine(line)) {
      if (block.length > 0) {
        break;
      }
      continue;
    }

    block.push(line);
  }

  const midpoint = block.length / 2;
  if (
    Number.isInteger(midpoint) &&
    midpoint > 0 &&
    block.slice(0, midpoint).join('\n') === block.slice(midpoint).join('\n')
  ) {
    return block.slice(0, midpoint).join('\n').trim();
  }

  return block.join('\n').trim();
}

export function buildCodexArgs(model: string, env: NodeJS.ProcessEnv = process.env): string[] {
  const bypassSandbox = !env.VERCEL && env.NODE_ENV !== 'production';
  const args = ['e', '-', '--skip-git-repo-check', '--model', model];

  if (bypassSandbox) {
    args.push('--dangerously-bypass-approvals-and-sandbox');
  }

  return args;
}

export class CodexCliAdapter implements AgentAdapter {
  constructor(agent: Agent) {
    void agent;
  }

  async *stream(systemPrompt: string, history: ChatMessage[], userContent: string): AsyncGenerator<string> {
    const prompt = buildPrompt(systemPrompt, history, userContent);
    const model = 'gpt-5.5';
    const child = spawn('codex', buildCodexArgs(model), { shell: false, env: { ...process.env } });
    let stdout = '';
    let stderr = '';

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk: string) => {
      stdout += chunk;
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (chunk: string) => {
      stderr += chunk;
    });

    const code = await new Promise<number | null>((resolve, reject) => {
      child.on('error', (error) => {
        const detail = stderr.trim();
        reject(new Error(detail ? `${error.message}\n${detail}` : error.message));
      });
      child.on('close', resolve);
      child.stdin.end(prompt);
    });

    if (code !== 0) {
      throw new Error(stderr.trim() || `codex exited with code ${code}`);
    }

    const response = parseCodexStdout(stdout);
    if (response) {
      yield response;
    }
  }
}
