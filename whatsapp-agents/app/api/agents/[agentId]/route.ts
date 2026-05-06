export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { deleteAgent, getAgent, updateAgentSystemPrompt } from '@/lib/db/queries';

function parsePositiveInteger(value: string): number | undefined {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return undefined;
  }
  return id;
}

export async function GET(_request: Request, context: RouteContext<'/api/agents/[agentId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const agentId = parsePositiveInteger(params.agentId);
  if (agentId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  const agent = getAgent(agentId);
  return agent ? Response.json(agent) : Response.json({ error: 'Agent not found' }, { status: 404 });
}

export async function PATCH(request: Request, context: RouteContext<'/api/agents/[agentId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const agentId = parsePositiveInteger(params.agentId);
  if (agentId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
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

  const systemPrompt = (body as { systemPrompt?: unknown }).systemPrompt;
  if (typeof systemPrompt !== 'string') {
    return Response.json({ error: 'systemPrompt must be a string' }, { status: 422 });
  }

  updateAgentSystemPrompt(agentId, systemPrompt);
  const agent = getAgent(agentId);
  return agent ? Response.json(agent) : Response.json({ error: 'Agent not found' }, { status: 404 });
}

export async function DELETE(_request: Request, context: RouteContext<'/api/agents/[agentId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const agentId = parsePositiveInteger(params.agentId);
  if (agentId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  deleteAgent(agentId);
  return new Response(null, { status: 204 });
}
