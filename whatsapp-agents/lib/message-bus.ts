import type { ChatMessage } from './agents/types';
import { getAdapter } from './agents/registry';
import {
  createMessage,
  getMessage,
  listAgentsForGroup,
  listMessages,
  markMessageComplete,
  markMessageError,
  updateMessageContent,
} from './db/queries';
import { parseMentions } from './mention';
import { notifyAgentDone } from './notifications';

export type SseEvent = { type: string; [key: string]: unknown };

function toHistory(groupId: number, responseMessageId: number): ChatMessage[] {
  return listMessages(groupId)
    .filter((message) => message.id !== responseMessageId && message.status === 'complete')
    .slice(-20)
    .map((message) => ({
      role: message.senderType === 'agent' ? 'assistant' : 'user',
      content: message.content,
    }));
}

export async function* routeMessage(groupId: number, userMessageId: number): AsyncGenerator<SseEvent> {
  let activeMessageId: number | undefined;

  try {
    const userMessage = getMessage(userMessageId);
    if (!userMessage || userMessage.groupId !== groupId) {
      yield { type: 'error', message: 'User message not found' };
      return;
    }

    const mentions = new Set(parseMentions(userMessage.content));
    const agents = listAgentsForGroup(groupId).filter((agent) => mentions.has(agent.slug));

    if (agents.length === 0) {
      yield { type: 'no_agents' };
      return;
    }

    for (const agent of agents) {
      const responseMessage = createMessage({
        groupId,
        senderType: 'agent',
        senderAgentId: agent.id,
        content: '',
        status: 'streaming',
        parentMessageId: userMessage.id,
      });
      activeMessageId = responseMessage.id;

      yield { type: 'agent_start', agent: agent.slug, messageId: responseMessage.id };

      const adapter = getAdapter(agent);
      const history = toHistory(groupId, responseMessage.id);
      const systemPrompt =
        `You are ${agent.displayName}, a friendly AI participating in a group chat. ` +
        'Keep responses short and conversational like you are texting in a group. ' +
        "Do not start with 'As an AI' or preamble." +
        `\n\n${agent.systemPrompt}`;
      let content = '';

      for await (const token of adapter.stream(systemPrompt, history, userMessage.content)) {
        content += token;
        updateMessageContent(responseMessage.id, content);
        yield { type: 'token', agent: agent.slug, messageId: responseMessage.id, token };
      }

      markMessageComplete(responseMessage.id);
      activeMessageId = undefined;
      notifyAgentDone(agent.displayName, content || '');
      yield { type: 'agent_done', agent: agent.slug, messageId: responseMessage.id };
    }

    yield { type: 'done' };
  } catch (error) {
    if (activeMessageId !== undefined) {
      markMessageError(activeMessageId);
    }
    yield { type: 'error', message: error instanceof Error ? error.message : String(error) };
  }
}
