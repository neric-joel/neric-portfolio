export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { addAgentToGroup, listAgentsForGroup, removeAgentFromGroup } from '@/lib/db/queries';

export async function GET(_request: Request, context: RouteContext<'/api/groups/[groupId]/agents'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const { groupId } = await context.params;
  return Response.json(listAgentsForGroup(Number(groupId)));
}

export async function POST(request: Request, context: RouteContext<'/api/groups/[groupId]/agents'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const { groupId } = await context.params;
  const body = (await request.json()) as { agentId?: number };
  addAgentToGroup(Number(groupId), Number(body.agentId));
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request, context: RouteContext<'/api/groups/[groupId]/agents'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const { groupId } = await context.params;
  const body = (await request.json()) as { agentId?: number };
  removeAgentFromGroup(Number(groupId), Number(body.agentId));
  return new Response(null, { status: 204 });
}
