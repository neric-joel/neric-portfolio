import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

const routes = [
  { path: 'app/api/groups/route.ts', handlers: ['GET', 'POST'], sse: false },
  { path: 'app/api/groups/[groupId]/route.ts', handlers: ['GET', 'PATCH', 'DELETE'], sse: false },
  { path: 'app/api/groups/[groupId]/messages/route.ts', handlers: ['GET', 'POST'], sse: false },
  { path: 'app/api/groups/[groupId]/stream/route.ts', handlers: ['GET'], sse: true },
  { path: 'app/api/agents/route.ts', handlers: ['GET', 'POST'], sse: false },
  { path: 'app/api/agents/[agentId]/route.ts', handlers: ['GET', 'PATCH', 'DELETE'], sse: false },
  { path: 'app/api/groups/[groupId]/agents/route.ts', handlers: ['GET', 'POST', 'DELETE'], sse: false },
] as const;

test('api routes short-circuit on Vercel before touching local runtime dependencies', () => {
  for (const route of routes) {
    const source = readFileSync(join(process.cwd(), route.path), 'utf8');

    assert.match(source, /import\s+\{\s*isVercel\s*\}\s+from\s+['"]@\/lib\/runtime['"];/, `${route.path} imports isVercel`);

    for (const handler of route.handlers) {
      assert.match(
        source,
        new RegExp(`export\\s+async\\s+function\\s+${handler}\\s*\\([^)]*\\)\\s*\\{\\s*if\\s*\\(isVercel\\)\\s*\\{`, 's'),
        `${route.path} ${handler} starts with isVercel guard`,
      );
    }

    if (route.sse) {
      assert.match(source, /Local runtime required/, `${route.path} returns local runtime SSE error`);
      assert.match(source, /text\/event-stream/, `${route.path} returns an SSE response`);
    } else {
      assert.match(
        source,
        /This app requires a local runtime\. Run npm run dev locally\./,
        `${route.path} returns local runtime JSON error`,
      );
    }
  }
});
