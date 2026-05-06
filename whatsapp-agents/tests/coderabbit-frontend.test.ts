import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

function source(path: string): string {
  return readFileSync(join(process.cwd(), path), 'utf8');
}

test('ChatInput owns EventSource lifetime and ignores malformed SSE frames', () => {
  const text = source('components/ChatInput.tsx');

  assert.match(text, /useRef<EventSource \| null>\(null\)/);
  assert.match(text, /esRef\.current\?\.close\(\);/);
  assert.match(text, /esRef\.current = es;/);
  assert.match(text, /return \(\) => \{\s*esRef\.current\?\.close\(\);\s*esRef\.current = null;/s);
  assert.match(text, /try\s*\{\s*data = JSON\.parse\(event\.data as string\);/s);
  assert.match(text, /console\.warn\('SSE: non-JSON frame ignored', event\.data\);/);
  assert.match(text, /es\.onerror = \(\) => \{\s*es\.close\(\);\s*esRef\.current = null;/s);
  assert.match(text, /streamEvent\.type === "done"[\s\S]*?es\.close\(\);[\s\S]*?esRef\.current = null;/);
});

test('MessageBubble renders streaming cursor only for agent messages', () => {
  const text = source('components/MessageBubble.tsx');

  assert.match(text, /isStreaming && message\.sender_type === "agent"/);
  assert.doesNotMatch(text, /animate-blink-cursor/);
});

test('GroupSidebar trims initials and alerts failed group creation', () => {
  const text = source('components/GroupSidebar.tsx');

  assert.match(text, /function getInitials\(name: string\): string/);
  assert.match(text, /\.trim\(\)\s*\.split\(\/\\s\+\/\)/s);
  assert.match(text, /\.slice\(0, 2\)/);
  assert.match(text, /w\[0\]\?\.toUpperCase\(\) \?\? ''/);
  assert.match(text, /alert\(`Failed to create group: \$\{response\.status\}`\);/);
});

test('AgentRegistry renders a null-group guard before group agent actions', () => {
  const text = source('components/AgentRegistry.tsx');
  const guardIndex = text.indexOf('if (!activeGroupId)');
  const fetchIndex = text.indexOf('fetch(`/api/groups/${activeGroupId}/agents`');

  assert.notEqual(guardIndex, -1);
  assert.notEqual(fetchIndex, -1);
  assert.ok(guardIndex < fetchIndex, 'null group guard should appear before group agent fetch logic');
  assert.match(text, /Select a group to manage agents\./);
});

test('ChatInput marks inactive emoji and attachment controls as disabled placeholders', () => {
  const text = source('components/ChatInput.tsx');

  assert.match(text, /aria-label="Emoji \(coming soon\)"[\s\S]*?disabled/);
  assert.match(text, /aria-label="Attachment \(coming soon\)"[\s\S]*?disabled/);
  assert.match(text, /cursor-not-allowed/);
});
