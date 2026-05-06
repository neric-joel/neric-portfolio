export const runtime = 'nodejs';

import { createGroup, listGroups } from '@/lib/db/queries';

export async function GET() {
  return Response.json(listGroups());
}

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string };
  const group = createGroup(body.name ?? '');
  return Response.json(group, { status: 201 });
}
