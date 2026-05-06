export const runtime = 'nodejs';

import { deleteAgent, getAgent, updateAgentSystemPrompt } from '@/lib/db/queries';

export async function GET(_request: Request, context: RouteContext<'/api/agents/[agentId]'>) {
  const { agentId } = await context.params;
  const agent = getAgent(Number(agentId));
  return agent ? Response.json(agent) : Response.json({ error: 'Agent not found' }, { status: 404 });
}

export async function PATCH(request: Request, context: RouteContext<'/api/agents/[agentId]'>) {
  const { agentId } = await context.params;
  const body = (await request.json()) as { systemPrompt?: string };
  updateAgentSystemPrompt(Number(agentId), body.systemPrompt ?? '');
  const agent = getAgent(Number(agentId));
  return agent ? Response.json(agent) : Response.json({ error: 'Agent not found' }, { status: 404 });
}

export async function DELETE(_request: Request, context: RouteContext<'/api/agents/[agentId]'>) {
  const { agentId } = await context.params;
  deleteAgent(Number(agentId));
  return new Response(null, { status: 204 });
}
