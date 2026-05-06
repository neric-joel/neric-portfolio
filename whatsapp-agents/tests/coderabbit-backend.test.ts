import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

function source(path: string): string {
  return readFileSync(join(process.cwd(), path), 'utf8');
}

const bodyRoutes = [
  'app/api/groups/route.ts',
  'app/api/groups/[groupId]/route.ts',
  'app/api/agents/route.ts',
  'app/api/agents/[agentId]/route.ts',
  'app/api/groups/[groupId]/messages/route.ts',
  'app/api/groups/[groupId]/agents/route.ts',
] as const;

const dynamicRoutes = [
  'app/api/groups/[groupId]/route.ts',
  'app/api/agents/[agentId]/route.ts',
  'app/api/groups/[groupId]/messages/route.ts',
  'app/api/groups/[groupId]/agents/route.ts',
  'app/api/groups/[groupId]/stream/route.ts',
] as const;

test('body routes reject malformed JSON and non-object request bodies before using fields', () => {
  for (const route of bodyRoutes) {
    const text = source(route);
    assert.match(text, /let body: unknown;/, `${route} parses request bodies as unknown`);
    assert.match(text, /catch\s*\{\s*return Response\.json\(\{\s*error: 'Invalid JSON'\s*\}, \{\s*status: 400\s*\}\);?\s*\}/s, `${route} catches malformed JSON`);
    assert.match(
      text,
      /Request body must be a JSON object/,
      `${route} rejects null, arrays, and scalar JSON bodies`,
    );
  }
});

test('routes validate required request body fields with 422 responses', () => {
  assert.match(source('app/api/groups/route.ts'), /name must be a non-empty string/);
  assert.match(source('app/api/groups/[groupId]/route.ts'), /name must be a non-empty string/);
  assert.match(source('app/api/groups/[groupId]/messages/route.ts'), /content must be a non-empty string/);
  assert.match(source('app/api/agents/[agentId]/route.ts'), /systemPrompt must be a string/);

  const agents = source('app/api/agents/route.ts');
  assert.match(agents, /slug must be a non-empty string/);
  assert.match(agents, /displayName must be a non-empty string/);
  assert.match(agents, /backend must be one of anthropic, openai, google/);
  assert.match(agents, /model must be a non-empty string/);
  assert.match(agents, /systemPrompt must be a string/);

  const groupAgents = source('app/api/groups/[groupId]/agents/route.ts');
  assert.match(groupAgents, /agentId must be a positive integer/);
});

test('dynamic route and stream query identifiers are validated before DB use', () => {
  for (const route of dynamicRoutes) {
    const text = source(route);
    assert.match(text, /Number\.isInteger\([^)]+\)/, `${route} validates integer ids`);
    assert.match(text, /<= 0/, `${route} rejects non-positive ids`);
    assert.match(text, /Invalid id/, `${route} returns invalid id errors`);
  }

  assert.match(source('app/api/groups/[groupId]/stream/route.ts'), /messageId must be a positive integer/);
});

test('SSE stream closes on errors and client aborts', () => {
  const text = source('app/api/groups/[groupId]/stream/route.ts');
  assert.match(text, /addEventListener\('abort'/);
  assert.match(text, /removeEventListener\('abort'/);
  assert.match(text, /request\.signal\.aborted/);
  assert.match(text, /finally\s*\{/);
  assert.match(text, /controller\.close\(\)/);
});

test('database connection is runtime-safe, enables WAL and foreign keys, and can be reset by tests', () => {
  const text = source('lib/db/connection.ts');
  assert.match(text, /fileURLToPath\(import\.meta\.url\)/);
  assert.match(text, /join\(__dirname, 'schema\.sql'\)/);
  assert.match(text, /pragma\('journal_mode = WAL'\)/);
  assert.match(text, /pragma\('foreign_keys = ON'\)/);
  assert.match(text, /let _db: Database\.Database \| null = null/);
  assert.match(text, /export function closeDb\(\): void/);
});

test('desktop notification fallback handles missing previews', () => {
  const text = source('lib/notifications.ts');
  assert.match(text, /preview: string \| undefined/);
  assert.match(text, /\(preview \?\? ''\)\.slice\(0, 140\) \|\| '\(no response\)'/);
});
