export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { createAgent, listAgents } from '@/lib/db/queries';

export async function GET() {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  return Response.json(listAgents());
}

export async function POST(request: Request) {
  if (isVercel) {
    return Response.json({ error: 'This app requires a local runtime. Run npm run dev locally.' }, { status: 503 });
  }

  const body = (await request.json()) as Parameters<typeof createAgent>[0];
  const agent = createAgent(body);
  return Response.json(agent, { status: 201 });
}
