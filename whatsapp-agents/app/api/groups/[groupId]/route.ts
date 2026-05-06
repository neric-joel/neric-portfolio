export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { deleteGroup, getGroup, updateGroup } from '@/lib/db/queries';

export async function GET(_request: Request, context: RouteContext<'/api/groups/[groupId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const { groupId } = await context.params;
  const group = getGroup(Number(groupId));
  return group ? Response.json(group) : Response.json({ error: 'Group not found' }, { status: 404 });
}

export async function PATCH(request: Request, context: RouteContext<'/api/groups/[groupId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const { groupId } = await context.params;
  const body = (await request.json()) as { name?: string };
  const group = updateGroup(Number(groupId), body.name ?? '');
  return Response.json(group);
}

export async function DELETE(_request: Request, context: RouteContext<'/api/groups/[groupId]'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const { groupId } = await context.params;
  deleteGroup(Number(groupId));
  return new Response(null, { status: 204 });
}
