"use client";

import {
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { normalizeMessage, useChat } from "@/contexts/ChatContext";
import type { Agent, Message } from "@/types";

interface MentionState {
  start: number;
  end: number;
  prefix: string;
}

interface StreamEvent {
  type: string;
  agent?: string;
  messageId?: number;
  token?: string;
  message?: string;
}

function getMentionState(value: string, caret: number): MentionState | null {
  const beforeCaret = value.slice(0, caret);
  const match = beforeCaret.match(/(^|\s)@([a-zA-Z0-9_]*)$/);

  if (!match) {
    return null;
  }

  const prefix = match[2];
  const start = beforeCaret.length - prefix.length - 1;

  return {
    start,
    end: caret,
    prefix: prefix.toLowerCase(),
  };
}

function buildStreamingMessage(
  groupId: number,
  messageId: number,
  parentMessageId: number,
  agent: Agent | undefined,
): Message {
  return {
    id: messageId,
    group_id: groupId,
    sender_type: "agent",
    sender_agent_id: agent?.id ?? null,
    content: "",
    status: "streaming",
    parent_message_id: parentMessageId,
    created_at: new Date().toISOString(),
  };
}

export function ChatInput() {
  const {
    activeGroupId,
    agentsInGroup,
    appendMessage,
    updateMessage,
    appendTokenToMessage,
    setMessageStreaming,
    streamingMessageIds,
  } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [content, setContent] = useState("");
  const [caret, setCaret] = useState(0);
  const [activeMentionIndex, setActiveMentionIndex] = useState(0);
  const [sending, setSending] = useState(false);

  const rows = Math.min(Math.max(content.split("\n").length, 1), 5);
  const mentionState = useMemo(() => getMentionState(content, caret), [content, caret]);
  const mentionOptions = useMemo(() => {
    if (!mentionState) {
      return [];
    }
    return agentsInGroup.filter((agent) =>
      agent.slug.toLowerCase().startsWith(mentionState.prefix),
    );
  }, [agentsInGroup, mentionState]);
  const showMentions = mentionState !== null && mentionOptions.length > 0;
  const selectedMentionIndex =
    mentionOptions.length === 0
      ? 0
      : Math.min(activeMentionIndex, mentionOptions.length - 1);
  const isBusy = sending || streamingMessageIds.size > 0;

  function updateCaret() {
    const position = textareaRef.current?.selectionStart ?? content.length;
    const nextPrefix = getMentionState(content, position)?.prefix ?? null;
    const currentPrefix = mentionState?.prefix ?? null;

    setCaret(position);
    if (nextPrefix !== currentPrefix) {
      setActiveMentionIndex(0);
    }
  }

  function updateContent(nextContent: string, nextCaret: number) {
    const nextPrefix = getMentionState(nextContent, nextCaret)?.prefix ?? null;
    const currentPrefix = mentionState?.prefix ?? null;

    setContent(nextContent);
    setCaret(nextCaret);
    if (nextPrefix !== currentPrefix) {
      setActiveMentionIndex(0);
    }
  }

  function completeMention(agent: Agent) {
    if (!mentionState) {
      return;
    }

    const nextContent = `${content.slice(0, mentionState.start)}@${agent.slug} ${content.slice(
      mentionState.end,
    )}`;
    const nextCaret = mentionState.start + agent.slug.length + 2;
    setContent(nextContent);
    setCaret(nextCaret);
    window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(nextCaret, nextCaret);
    });
  }

  async function submitMessage() {
    const trimmed = content.trim();
    if (!trimmed || activeGroupId === null || isBusy) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch(`/api/groups/${activeGroupId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const userMessage = normalizeMessage(await response.json());
      appendMessage(activeGroupId, userMessage);
      setContent("");
      setCaret(0);

      const eventSource = new EventSource(
        `/api/groups/${activeGroupId}/stream?messageId=${userMessage.id}`,
      );

      eventSource.onmessage = (event) => {
        const streamEvent = JSON.parse(event.data) as StreamEvent;

        if (streamEvent.type === "agent_start" && streamEvent.messageId) {
          const agent = agentsInGroup.find(
            (item) => item.slug === streamEvent.agent,
          );
          appendMessage(
            activeGroupId,
            buildStreamingMessage(
              activeGroupId,
              streamEvent.messageId,
              userMessage.id,
              agent,
            ),
          );
          setMessageStreaming(streamEvent.messageId, true);
          return;
        }

        if (
          streamEvent.type === "token" &&
          streamEvent.messageId &&
          typeof streamEvent.token === "string"
        ) {
          appendTokenToMessage(
            activeGroupId,
            streamEvent.messageId,
            streamEvent.token,
          );
          return;
        }

        if (streamEvent.type === "agent_done" && streamEvent.messageId) {
          updateMessage(activeGroupId, streamEvent.messageId, (message) => ({
            ...message,
            status: "complete",
          }));
          setMessageStreaming(streamEvent.messageId, false);
          return;
        }

        if (streamEvent.type === "done" || streamEvent.type === "no_agents") {
          eventSource.close();
          setSending(false);
          return;
        }

        if (streamEvent.type === "error") {
          console.error(streamEvent.message ?? "Streaming error");
          eventSource.close();
          setSending(false);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        setSending(false);
      };
    } catch (error) {
      console.error(error);
      setSending(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (showMentions) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveMentionIndex((current) => (current + 1) % mentionOptions.length);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveMentionIndex(
          (current) => (current - 1 + mentionOptions.length) % mentionOptions.length,
        );
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        completeMention(mentionOptions[selectedMentionIndex]);
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setCaret(-1);
        return;
      }
    }

    if (event.key === "Enter" && (event.ctrlKey || (!event.shiftKey && rows === 1))) {
      event.preventDefault();
      void submitMessage();
    }
  }

  return (
    <footer className="flex-shrink-0 border-t border-white/10 bg-[--bg-primary] px-6 py-4">
      <div className="relative">
        {showMentions ? (
          <div className="absolute bottom-full left-0 mb-2 w-64 overflow-hidden rounded-md border border-[--accent-cyan]/30 bg-[--bg-sidebar] shadow-2xl">
            {mentionOptions.map((agent, index) => (
              <button
                key={agent.id}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => completeMention(agent)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-all duration-150 ${
                  index === selectedMentionIndex
                    ? "bg-[--accent-cyan]/10 text-[--accent-cyan]"
                    : "text-[--text-primary] hover:bg-white/5"
                }`}
              >
                <span>@{agent.slug}</span>
                <span className="text-xs text-[--text-muted]">
                  {agent.backend}
                </span>
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={content}
            rows={rows}
            placeholder="Message... use @claude, @codex, @antigravity"
            onChange={(event) => {
              updateContent(event.target.value, event.target.selectionStart);
            }}
            onClick={updateCaret}
            onKeyUp={updateCaret}
            onKeyDown={handleKeyDown}
            className="max-h-40 min-h-11 flex-1 resize-none rounded-md border border-white/10 bg-[--bg-bubble] px-4 py-3 text-sm text-[--text-primary] outline-none transition-all duration-150 placeholder:text-[--text-muted] focus:border-[--accent-cyan]/60 focus:ring-2 focus:ring-[--accent-cyan]/20"
          />
          <button
            type="button"
            onClick={() => void submitMessage()}
            disabled={isBusy || !content.trim()}
            className="neon-glow rounded-lg bg-[--accent-cyan] px-5 py-3 text-sm font-semibold text-black transition-all duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </footer>
  );
}
