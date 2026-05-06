export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { deleteGroup, getGroup, updateGroup } from '@/lib/db/queries';

function parsePositiveInteger(value: string): number | undefined {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return undefined;
  }
  return id;
}

export async function GET(_request: Request, context: RouteContext<'/api/groups/[groupId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const groupId = parsePositiveInteger(params.groupId);
  if (groupId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  const group = getGroup(groupId);
  return group ? Response.json(group) : Response.json({ error: 'Group not found' }, { status: 404 });
}

export async function PATCH(request: Request, context: RouteContext<'/api/groups/[groupId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const groupId = parsePositiveInteger(params.groupId);
  if (groupId === undefined) {
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

  const name = (body as { name?: unknown }).name;
  if (typeof name !== 'string' || name.trim().length === 0) {
    return Response.json({ error: 'name must be a non-empty string' }, { status: 422 });
  }

  const group = updateGroup(groupId, name.trim());
  return Response.json(group);
}

export async function DELETE(_request: Request, context: RouteContext<'/api/groups/[groupId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const groupId = parsePositiveInteger(params.groupId);
  if (groupId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  deleteGroup(groupId);
  return new Response(null, { status: 204 });
}
