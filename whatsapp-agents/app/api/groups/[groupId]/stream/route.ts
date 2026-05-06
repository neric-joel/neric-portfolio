export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { routeMessage } from '@/lib/message-bus';

export async function GET(request: Request, context: RouteContext<'/api/groups/[groupId]/stream'>) {
  if (isVercel) {
    return new Response('data: {"type":"error","message":"Local runtime required"}\n\n', {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  }

  const { groupId } = await context.params;
  const url = new URL(request.url);
  const messageId = Number(url.searchParams.get('messageId'));
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for await (const event of routeMessage(Number(groupId), messageId)) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
