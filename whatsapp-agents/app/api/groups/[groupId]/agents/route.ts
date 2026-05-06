export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { addAgentToGroup, listAgentsForGroup, removeAgentFromGroup } from '@/lib/db/queries';

function parsePositiveInteger(value: string): number | undefined {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return undefined;
  }
  return id;
}

async function readAgentId(request: Request): Promise<number | Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Request body must be a JSON object' }, { status: 400 });
  }

  const agentId = (body as { agentId?: unknown }).agentId;
  if (typeof agentId !== 'number' || !Number.isInteger(agentId) || agentId <= 0) {
    return Response.json({ error: 'agentId must be a positive integer' }, { status: 422 });
  }
  return agentId;
}

export async function GET(_request: Request, context: RouteContext<'/api/groups/[groupId]/agents'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const groupId = parsePositiveInteger(params.groupId);
  if (groupId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  return Response.json(listAgentsForGroup(groupId));
}

export async function POST(request: Request, context: RouteContext<'/api/groups/[groupId]/agents'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const groupId = parsePositiveInteger(params.groupId);
  if (groupId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  const agentId = await readAgentId(request);
  if (agentId instanceof Response) return agentId;

  addAgentToGroup(groupId, agentId);
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request, context: RouteContext<'/api/groups/[groupId]/agents'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const groupId = parsePositiveInteger(params.groupId);
  if (groupId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  const agentId = await readAgentId(request);
  if (agentId instanceof Response) return agentId;

  removeAgentFromGroup(groupId, agentId);
  return new Response(null, { status: 204 });
}
