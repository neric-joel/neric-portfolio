export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { createGroup, listGroups } from '@/lib/db/queries';

export async function GET() {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  return Response.json(listGroups());
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

  const name = (body as { name?: unknown }).name;
  if (typeof name !== 'string' || name.trim().length === 0) {
    return Response.json({ error: 'name must be a non-empty string' }, { status: 422 });
  }

  const group = createGroup(name.trim());
  return Response.json(group, { status: 201 });
}
