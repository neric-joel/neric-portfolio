import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMentions } from '../lib/mention.js';

test('parseMentions: extracts single mention', () => {
  assert.deepEqual(parseMentions('hello @claude how are you?'), ['claude']);
});

test('parseMentions: extracts multiple mentions', () => {
  assert.deepEqual(parseMentions('@claude and @codex compare these'), ['claude', 'codex']);
});

test('parseMentions: returns empty for no mentions', () => {
  assert.deepEqual(parseMentions('just a plain message'), []);
});

test('parseMentions: is case-insensitive output', () => {
  assert.deepEqual(parseMentions('hey @Claude!'), ['claude']);
});

test('parseMentions: deduplicates mentions', () => {
  const result = parseMentions('@claude ask @claude again');
  const unique = [...new Set(result)];
  assert.deepEqual(result, unique);
});
