export const runtime = 'nodejs';

import { isVercel } from '@/lib/runtime';
import { routeMessage } from '@/lib/message-bus';

function parsePositiveInteger(value: string): number | undefined {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return undefined;
  }
  return id;
}

export async function GET(request: Request, context: RouteContext<'/api/groups/[groupId]/stream'>) {
  if (isVercel) {
    return new Response('data: {"type":"error","message":"Local runtime required"}\n\n', {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  }

  const params = await context.params;
  const groupId = parsePositiveInteger(params.groupId);
  if (groupId === undefined) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  const url = new URL(request.url);
  const messageId = Number(url.searchParams.get('messageId'));
  if (!Number.isInteger(messageId) || messageId <= 0) {
    return Response.json({ error: 'messageId must be a positive integer' }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          // The client may disconnect while async agent work is still unwinding.
        }
      };

      const abort = () => {
        send({ type: 'aborted' });
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      };

      request.signal.addEventListener('abort', abort, { once: true });

      try {
        if (request.signal.aborted) {
          return;
        }

        for await (const event of routeMessage(groupId, messageId)) {
          if (request.signal.aborted) {
            break;
          }
          send(event);
        }
      } catch (err) {
        send({ type: 'error', message: err instanceof Error ? err.message : 'Unknown error' });
      } finally {
        request.signal.removeEventListener('abort', abort);
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      }
    },
    cancel() {},
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
