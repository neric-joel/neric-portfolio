export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { createMessage, listMessages } from '@/lib/db/queries';

function parsePositiveInteger(value: string): number | undefined {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return undefined;
  }
  return id;
}

export async function GET(_request: Request, context: RouteContext<'/api/groups/[groupId]/messages'>) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const params = await context.params;
  const groupId = parsePositiveInteger(params.groupId);
  if (groupId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  return Response.json(listMessages(groupId));
}

export async function POST(request: Request, context: RouteContext<'/api/groups/[groupId]/messages'>) {
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

  const content = (body as { content?: unknown }).content;
  if (typeof content !== 'string' || content.trim().length === 0) {
    return Response.json({ error: 'content must be a non-empty string' }, { status: 422 });
  }

  const message = createMessage({ groupId, senderType: 'user', content: content.trim() });
  return Response.json(message, { status: 201 });
}
