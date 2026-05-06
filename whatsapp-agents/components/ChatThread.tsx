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
      <div className="min-h-0 flex-1 overflow-y-auto bg-[--wa-main-bg] px-[6%] py-5">
        <div className="flex flex-col gap-2">
          <div className="h-16 w-[62%] animate-pulse rounded-[7.5px] bg-[--wa-bubble-in]" />
          <div className="ml-auto h-14 w-[46%] animate-pulse rounded-[7.5px] bg-[--wa-bubble-out]" />
          <div className="h-20 w-[68%] animate-pulse rounded-[7.5px] bg-[--wa-bubble-in]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-[--wa-main-bg] px-[6%] py-5">
      {(activeMessages ?? []).length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="rounded-lg bg-[--wa-header-bg] px-3 py-1 text-[12px] font-medium uppercase text-[--wa-text-secondary]">
            Send a message to get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="mb-4 flex justify-center">
            <span className="rounded-lg bg-[--wa-header-bg] px-3 py-1 text-[12px] font-medium text-[--wa-text-secondary] shadow-sm">
              TODAY
            </span>
          </div>
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
