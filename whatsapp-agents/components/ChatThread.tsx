"use client";

import { useEffect, useMemo, useRef } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { normalizeMessage, useChat } from "@/contexts/ChatContext";
import type { Message } from "@/types";

export function ChatThread() {
  const {
    activeGroupId,
    agentsInGroup,
    messages,
    setMessagesForGroup,
    streamingMessageIds,
  } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const activeMessages = useMemo(
    () => (activeGroupId === null ? [] : messages[activeGroupId]),
    [activeGroupId, messages],
  );
  const loading = activeGroupId !== null && activeMessages === undefined;

  useEffect(() => {
    if (activeGroupId === null) {
      return;
    }

    let ignore = false;

    fetch(`/api/groups/${activeGroupId}/messages`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load messages");
        }
        return response.json() as Promise<Message[]>;
      })
      .then((data) => {
        if (!ignore) {
          setMessagesForGroup(activeGroupId, data.map(normalizeMessage));
        }
      })
      .catch((error: unknown) => {
        console.error(error);
        if (!ignore) {
          setMessagesForGroup(activeGroupId, []);
        }
      });

    return () => {
      ignore = true;
    };
  }, [activeGroupId, setMessagesForGroup]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
        <div className="h-20 w-2/3 animate-pulse rounded-xl border border-white/5 bg-white/5" />
        <div className="ml-auto h-16 w-1/2 animate-pulse rounded-xl border border-white/5 bg-white/5" />
        <div className="h-28 w-3/4 animate-pulse rounded-xl border border-white/5 bg-white/5" />
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
      {(activeMessages ?? []).length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-[--text-muted]">
            Send a message to get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {(activeMessages ?? []).map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              agent={agentsInGroup.find(
                (agent) => agent.id === message.sender_agent_id,
              )}
              isStreaming={streamingMessageIds.has(message.id)}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
