export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { createAgent, listAgents, type AgentBackend, type CreateAgentParams } from '@/lib/db/queries';

const validBackends = new Set<AgentBackend>(['anthropic', 'openai', 'google']);

function getNonEmptyString(body: Record<string, unknown>, field: string, error: string): string | Response {
  const value = body[field];
  if (typeof value !== 'string' || value.trim().length === 0) {
    return Response.json({ error }, { status: 422 });
  }
  return value.trim();
}

export async function GET() {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  return Response.json(listAgents());
}

export async function POST(request: Request) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Request body must be a JSON object' }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  const slug = getNonEmptyString(fields, 'slug', 'slug must be a non-empty string');
  if (slug instanceof Response) return slug;
  const displayName = getNonEmptyString(fields, 'displayName', 'displayName must be a non-empty string');
  if (displayName instanceof Response) return displayName;
  const backend = fields.backend;
  if (typeof backend !== 'string' || !validBackends.has(backend as AgentBackend)) {
    return Response.json({ error: 'backend must be one of anthropic, openai, google' }, { status: 422 });
  }
  const model = getNonEmptyString(fields, 'model', 'model must be a non-empty string');
  if (model instanceof Response) return model;
  const systemPrompt = fields.systemPrompt;
  if (typeof systemPrompt !== 'string') {
    return Response.json({ error: 'systemPrompt must be a string' }, { status: 422 });
  }

  const agentParams: CreateAgentParams = { slug, displayName, backend: backend as AgentBackend, model, systemPrompt };
  const agent = createAgent(agentParams);
  return Response.json(agent, { status: 201 });
}
