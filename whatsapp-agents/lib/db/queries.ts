import { getDb } from './connection';

export type AgentBackend = 'anthropic' | 'openai' | 'google';
export type SenderType = 'user' | 'agent' | 'system';
export type MessageStatus = 'streaming' | 'complete' | 'error';

export interface Group {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: number;
  slug: string;
  displayName: string;
  backend: AgentBackend;
  model: string;
  systemPrompt: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  groupId: number;
  senderType: SenderType;
  senderAgentId?: number;
  content: string;
  status: MessageStatus;
  parentMessageId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageParams {
  groupId: number;
  senderType: SenderType;
  senderAgentId?: number;
  content: string;
  status?: MessageStatus;
  parentMessageId?: number;
}

export interface CreateAgentParams {
  slug: string;
  displayName: string;
  backend: AgentBackend;
  model: string;
  systemPrompt?: string;
  enabled?: boolean;
}

interface GroupRow {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface AgentRow {
  id: number;
  slug: string;
  display_name: string;
  backend: AgentBackend;
  model: string;
  system_prompt: string;
  enabled: number;
  created_at: string;
  updated_at: string;
}

interface MessageRow {
  id: number;
  group_id: number;
  sender_type: SenderType;
  sender_agent_id: number | null;
  content: string;
  status: MessageStatus;
  parent_message_id: number | null;
  created_at: string;
  updated_at: string;
}

function mapGroup(row: GroupRow): Group {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapAgent(row: AgentRow): Agent {
  return {
    id: row.id,
    slug: row.slug,
    displayName: row.display_name,
    backend: row.backend,
    model: row.model,
    systemPrompt: row.system_prompt,
    enabled: row.enabled === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapMessage(row: MessageRow): Message {
  return {
    id: row.id,
    groupId: row.group_id,
    senderType: row.sender_type,
    senderAgentId: row.sender_agent_id ?? undefined,
    content: row.content,
    status: row.status,
    parentMessageId: row.parent_message_id ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function listGroups(): Group[] {
  return getDb().prepare('SELECT * FROM groups ORDER BY created_at DESC, id DESC').all().map((row) => mapGroup(row as GroupRow));
}

export function getGroup(id: number): Group | undefined {
  const row = getDb().prepare('SELECT * FROM groups WHERE id = ?').get(id) as GroupRow | undefined;
  return row ? mapGroup(row) : undefined;
}

export function createGroup(name: string): Group {
  const result = getDb().prepare('INSERT INTO groups (name) VALUES (?)').run(name);
  return getGroup(Number(result.lastInsertRowid))!;
}

export function updateGroup(id: number, name: string): Group {
  getDb().prepare('UPDATE groups SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(name, id);
  const group = getGroup(id);
  if (!group) {
    throw new Error('Group not found');
  }
  return group;
}

export function deleteGroup(id: number): void {
  getDb().prepare('DELETE FROM groups WHERE id = ?').run(id);
}

export function listAgents(): Agent[] {
  return getDb().prepare('SELECT * FROM agents ORDER BY display_name ASC, id ASC').all().map((row) => mapAgent(row as AgentRow));
}

export function getAgent(id: number): Agent | undefined {
  const row = getDb().prepare('SELECT * FROM agents WHERE id = ?').get(id) as AgentRow | undefined;
  return row ? mapAgent(row) : undefined;
}

export function createAgent(params: CreateAgentParams): Agent {
  const result = getDb()
    .prepare(`
      INSERT INTO agents (slug, display_name, backend, model, system_prompt, enabled)
      VALUES (@slug, @displayName, @backend, @model, @systemPrompt, @enabled)
    `)
    .run({
      ...params,
      systemPrompt: params.systemPrompt ?? '',
      enabled: params.enabled === false ? 0 : 1,
    });

  return getAgent(Number(result.lastInsertRowid))!;
}

export function deleteAgent(id: number): void {
  getDb().prepare('DELETE FROM agents WHERE id = ?').run(id);
}

export function listAgentsForGroup(groupId: number): Agent[] {
  return getDb()
    .prepare(`
      SELECT agents.*
      FROM agents
      INNER JOIN group_agents ON group_agents.agent_id = agents.id
      WHERE group_agents.group_id = ? AND agents.enabled = 1
      ORDER BY agents.display_name ASC, agents.id ASC
    `)
    .all(groupId)
    .map((row) => mapAgent(row as AgentRow));
}

export function addAgentToGroup(groupId: number, agentId: number): void {
  getDb().prepare('INSERT OR IGNORE INTO group_agents (group_id, agent_id) VALUES (?, ?)').run(groupId, agentId);
}

export function removeAgentFromGroup(groupId: number, agentId: number): void {
  getDb().prepare('DELETE FROM group_agents WHERE group_id = ? AND agent_id = ?').run(groupId, agentId);
}

export function createMessage(params: CreateMessageParams): Message {
  const result = getDb()
    .prepare(`
      INSERT INTO messages (group_id, sender_type, sender_agent_id, content, status, parent_message_id)
      VALUES (@groupId, @senderType, @senderAgentId, @content, @status, @parentMessageId)
    `)
    .run({
      groupId: params.groupId,
      senderType: params.senderType,
      senderAgentId: params.senderAgentId ?? null,
      content: params.content,
      status: params.status ?? 'complete',
      parentMessageId: params.parentMessageId ?? null,
    });

  return getMessage(Number(result.lastInsertRowid))!;
}

export function getMessage(id: number): Message | undefined {
  const row = getDb().prepare('SELECT * FROM messages WHERE id = ?').get(id) as MessageRow | undefined;
  return row ? mapMessage(row) : undefined;
}

export function listMessages(groupId: number): Message[] {
  return getDb()
    .prepare('SELECT * FROM messages WHERE group_id = ? ORDER BY created_at ASC, id ASC')
    .all(groupId)
    .map((row) => mapMessage(row as MessageRow));
}

export function updateMessageContent(id: number, content: string): void {
  getDb().prepare('UPDATE messages SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(content, id);
}

export function markMessageComplete(id: number): void {
  getDb().prepare("UPDATE messages SET status = 'complete', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(id);
}

export function markMessageError(id: number): void {
  getDb().prepare("UPDATE messages SET status = 'error', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(id);
}

export function updateAgentSystemPrompt(id: number, systemPrompt: string): void {
  getDb().prepare('UPDATE agents SET system_prompt = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(systemPrompt, id);
}
