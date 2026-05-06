export const runtime = 'nodejs';

import { createAgent, listAgents } from '@/lib/db/queries';

export async function GET() {
  return Response.json(listAgents());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Parameters<typeof createAgent>[0];
  const agent = createAgent(body);
  return Response.json(agent, { status: 201 });
}
