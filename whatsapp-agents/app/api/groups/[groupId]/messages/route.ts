export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { createMessage, listMessages } from '@/lib/db/queries';

export async function GET(_request: Request, context: RouteContext<'/api/groups/[groupId]/messages'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const { groupId } = await context.params;
  return Response.json(listMessages(Number(groupId)));
}

export async function POST(request: Request, context: RouteContext<'/api/groups/[groupId]/messages'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const { groupId } = await context.params;
  const body = (await request.json()) as { content?: string };
  const message = createMessage({ groupId: Number(groupId), senderType: 'user', content: body.content ?? '' });
  return Response.json(message, { status: 201 });
}
