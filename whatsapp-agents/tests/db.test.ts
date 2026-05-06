import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

let tmpDir: string;

before(() => {
  tmpDir = mkdtempSync(path.join(tmpdir(), 'wa-test-'));
  process.env.SQLITE_DB_PATH = path.join(tmpDir, 'test.sqlite');
});

after(async () => {
  const { getDb } = await import('../lib/db/connection.js');
  getDb().close();
  rmSync(tmpDir, { recursive: true, force: true });
});

test('groups: create and list', async () => {
  const { createGroup, listGroups } = await import('../lib/db/queries.js');
  const group = createGroup('Test Group');
  assert.equal(group.name, 'Test Group');
  assert.ok(group.id > 0);
  const groups = listGroups();
  assert.ok(groups.some((g) => g.id === group.id));
});

test('groups: update name', async () => {
  const { createGroup, updateGroup, getGroup } = await import('../lib/db/queries.js');
  const group = createGroup('Old Name');
  const updated = updateGroup(group.id, 'New Name');
  assert.equal(updated.name, 'New Name');
  const fetched = getGroup(group.id);
  assert.equal(fetched?.name, 'New Name');
});

test('groups: delete', async () => {
  const { createGroup, deleteGroup, getGroup } = await import('../lib/db/queries.js');
  const group = createGroup('To Delete');
  deleteGroup(group.id);
  assert.equal(getGroup(group.id), undefined);
});

test('messages: create and list', async () => {
  const { createGroup, createMessage, listMessages } = await import('../lib/db/queries.js');
  const group = createGroup('Msg Test');
  const msg = createMessage({ groupId: group.id, senderType: 'user', content: 'Hello' });
  assert.equal(msg.content, 'Hello');
  const msgs = listMessages(group.id);
  assert.ok(msgs.some((m) => m.id === msg.id));
});

test('messages: update content and mark complete', async () => {
  const { createGroup, createMessage, updateMessageContent, markMessageComplete, getMessage } = await import(
    '../lib/db/queries.js'
  );
  const group = createGroup('Stream Test');
  const msg = createMessage({ groupId: group.id, senderType: 'agent', content: '', status: 'streaming' });
  updateMessageContent(msg.id, 'Partial');
  const streaming = getMessage(msg.id);
  assert.equal(streaming?.content, 'Partial');
  markMessageComplete(msg.id);
  const done = getMessage(msg.id);
  assert.equal(done?.status, 'complete');
});

test('group-agent membership', async () => {
  const { createGroup, addAgentToGroup, listAgentsForGroup, removeAgentFromGroup, listAgents } = await import(
    '../lib/db/queries.js'
  );
  const group = createGroup('Agent Test');
  const agents = listAgents();
  if (agents.length === 0) return;
  const agent = agents[0];
  addAgentToGroup(group.id, agent.id);
  const members = listAgentsForGroup(group.id);
  assert.ok(members.some((a) => a.id === agent.id));
  removeAgentFromGroup(group.id, agent.id);
  const afterRemove = listAgentsForGroup(group.id);
  assert.ok(!afterRemove.some((a) => a.id === agent.id));
});
