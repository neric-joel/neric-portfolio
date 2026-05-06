import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCodexArgs } from '../lib/agents/codex-cli.js';

function source(path: string): string {
  return readFileSync(join(process.cwd(), path), 'utf8');
}

test('Codex CLI sandbox bypass is omitted on Vercel and production runtimes', () => {
  assert.deepEqual(buildCodexArgs('gpt-5.5', { VERCEL: '1', NODE_ENV: 'development' }), [
    'e',
    '-',
    '--skip-git-repo-check',
    '--model',
    'gpt-5.5',
  ]);

  assert.deepEqual(buildCodexArgs('gpt-5.5', { NODE_ENV: 'production' }), [
    'e',
    '-',
    '--skip-git-repo-check',
    '--model',
    'gpt-5.5',
  ]);
});

test('Codex CLI sandbox bypass is enabled for local non-production runtimes', () => {
  assert.deepEqual(buildCodexArgs('gpt-5.5', { NODE_ENV: 'development' }), [
    'e',
    '-',
    '--skip-git-repo-check',
    '--model',
    'gpt-5.5',
    '--dangerously-bypass-approvals-and-sandbox',
  ]);
});

test('CLI adapters decode stdout and stderr as UTF-8 streams', () => {
  assert.match(source('lib/agents/codex-cli.ts'), /child\.stdout\.setEncoding\('utf8'\)/);
  assert.match(source('lib/agents/codex-cli.ts'), /child\.stderr\.setEncoding\('utf8'\)/);
  assert.match(source('lib/agents/claude-cli.ts'), /child\.stdout\.setEncoding\('utf8'\)/);
  assert.match(source('lib/agents/claude-cli.ts'), /child\.stderr\.setEncoding\('utf8'\)/);
});

test('message bus passes a notification preview fallback', () => {
  assert.match(source('lib/message-bus.ts'), /notifyAgentDone\(agent\.displayName, content \|\| ''\)/);
});
