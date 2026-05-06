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

  const body = (await request.json()) as { name?: string };
  const group = createGroup(body.name ?? '');
  return Response.json(group, { status: 201 });
}
