import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCodexStdout } from '../lib/agents/codex-cli.js';

test('parseCodexStdout: extracts first response block', () => {
  const raw = `codex
tokens used
123
Hello, friend!
How are you today?

tokens used
456
Hello, friend!
How are you today?`;
  assert.equal(parseCodexStdout(raw), 'Hello, friend!\nHow are you today?');
});

test('parseCodexStdout: handles single-line response', () => {
  const raw = `codex\ntokens used\n50\nHi there!\ntokens used\n50\nHi there!`;
  assert.equal(parseCodexStdout(raw), 'Hi there!');
});

test('parseCodexStdout: skips metadata with dashes and labels', () => {
  const raw = `codex\nmodel: gpt-5.5\nworkdir: /tmp\ntokens used\n99\nActual response here.\nActual response here.`;
  assert.equal(parseCodexStdout(raw), 'Actual response here.');
});

test('parseCodexStdout: handles empty input', () => {
  assert.equal(parseCodexStdout(''), '');
});

test('parseCodexStdout: handles only metadata', () => {
  const raw = 'codex\ntokens used\n100\n';
  assert.equal(parseCodexStdout(raw), '');
});
