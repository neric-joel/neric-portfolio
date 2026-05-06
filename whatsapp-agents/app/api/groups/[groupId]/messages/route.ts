export const runtime = 'nodejs';

import { createMessage, listMessages } from '@/lib/db/queries';

export async function GET(_request: Request, context: RouteContext<'/api/groups/[groupId]/messages'>) {
  const { groupId } = await context.params;
  return Response.json(listMessages(Number(groupId)));
}

export async function POST(request: Request, context: RouteContext<'/api/groups/[groupId]/messages'>) {
  const { groupId } = await context.params;
  const body = (await request.json()) as { content?: string };
  const message = createMessage({ groupId: Number(groupId), senderType: 'user', content: body.content ?? '' });
  return Response.json(message, { status: 201 });
}
