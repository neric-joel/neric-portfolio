"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
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

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M3.5 4.5a1 1 0 0 1 1.14-.16l16 7a1 1 0 0 1 0 1.83l-16 7A1 1 0 0 1 3.3 18l2.2-5.25h7a.75.75 0 0 0 0-1.5h-7L3.3 6a1 1 0 0 1 .2-1.5Z" />
    </svg>
  );
}

function EmojiIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM4.5 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Zm4.7-1.15a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3Zm5.6 0a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3Zm-5.8 2.2a.8.8 0 0 1 1.1.27A2.23 2.23 0 0 0 12 14.4c.82 0 1.55-.42 1.9-1.08a.8.8 0 1 1 1.39.79A3.83 3.83 0 0 1 12 16a3.83 3.83 0 0 1-3.29-1.89.8.8 0 0 1 .29-1.06Z" />
    </svg>
  );
}

function AttachmentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M17.64 6.36a4.5 4.5 0 0 0-6.36 0l-5.3 5.3a3.25 3.25 0 0 0 4.6 4.6l5.48-5.48a1.9 1.9 0 1 0-2.69-2.69l-5.2 5.2a.75.75 0 0 1-1.06-1.06l5.2-5.2a3.4 3.4 0 0 1 4.8 4.81l-5.47 5.48a4.75 4.75 0 0 1-6.72-6.72l5.3-5.3a6 6 0 0 1 8.48 8.48l-5.04 5.04a.75.75 0 1 1-1.06-1.06l5.04-5.04a4.5 4.5 0 0 0 0-6.36Z" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M12 3.5a3 3 0 0 0-3 3V12a3 3 0 1 0 6 0V6.5a3 3 0 0 0-3-3Zm-4.75 8.25a.75.75 0 0 1 .75.75 4 4 0 0 0 8 0 .75.75 0 0 1 1.5 0 5.5 5.5 0 0 1-4.75 5.45V20h2.25a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5h2.25v-2.05A5.5 5.5 0 0 1 6.5 12.5a.75.75 0 0 1 .75-.75Z" />
    </svg>
  );
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
  const esRef = useRef<EventSource | null>(null);
  const activeStreamingIdsRef = useRef<Set<number>>(new Set());
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
  const hasText = content.trim().length > 0;

  useEffect(() => {
    return () => {
      esRef.current?.close();
      esRef.current = null;
    };
  }, []);

  useEffect(() => {
    esRef.current?.close();
    esRef.current = null;
    activeStreamingIdsRef.current.forEach((messageId) => {
      setMessageStreaming(messageId, false);
    });
    activeStreamingIdsRef.current.clear();
    const resetSendingTimer = window.setTimeout(() => setSending(false), 0);
    return () => window.clearTimeout(resetSendingTimer);
  }, [activeGroupId, setMessageStreaming]);

  function updateCaret() {
    const position = textareaRef.current?.selectionStart ?? content.length;
    setCaret(position);
    if (getMentionState(content, position)?.prefix !== mentionState?.prefix) {
      setActiveMentionIndex(0);
    }
  }

  function updateContent(nextContent: string, nextCaret: number) {
    setContent(nextContent);
    setCaret(nextCaret);
    if (getMentionState(nextContent, nextCaret)?.prefix !== mentionState?.prefix) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const userMessage = normalizeMessage(await response.json());
      appendMessage(activeGroupId, userMessage);
      setContent("");
      setCaret(0);

      esRef.current?.close();
      activeStreamingIdsRef.current.forEach((messageId) => {
        setMessageStreaming(messageId, false);
      });
      activeStreamingIdsRef.current.clear();

      const es = new EventSource(
        `/api/groups/${activeGroupId}/stream?messageId=${userMessage.id}`,
      );
      esRef.current = es;

      es.onmessage = (event) => {
        if (esRef.current !== es) {
          return;
        }

        let data: unknown;
        try {
          data = JSON.parse(event.data as string);
        } catch {
          console.warn('SSE: non-JSON frame ignored', event.data);
          return;
        }

        if (!data || typeof data !== "object" || typeof (data as StreamEvent).type !== "string") {
          console.warn("SSE: malformed frame ignored", data);
          return;
        }

        const streamEvent = data as StreamEvent;

        if (streamEvent.type === "agent_start" && streamEvent.messageId) {
          const agent = agentsInGroup.find((item) => item.slug === streamEvent.agent);
          appendMessage(
            activeGroupId,
            buildStreamingMessage(activeGroupId, streamEvent.messageId, userMessage.id, agent),
          );
          activeStreamingIdsRef.current.add(streamEvent.messageId);
          setMessageStreaming(streamEvent.messageId, true);
          return;
        }

        if (
          streamEvent.type === "token" &&
          streamEvent.messageId &&
          typeof streamEvent.token === "string"
        ) {
          appendTokenToMessage(activeGroupId, streamEvent.messageId, streamEvent.token);
          return;
        }

        if (streamEvent.type === "agent_done" && streamEvent.messageId) {
          updateMessage(activeGroupId, streamEvent.messageId, (message) => ({
            ...message,
            status: "complete",
          }));
          setMessageStreaming(streamEvent.messageId, false);
          activeStreamingIdsRef.current.delete(streamEvent.messageId);
          return;
        }

        if (streamEvent.type === "done" || streamEvent.type === "no_agents") {
          es.close();
          esRef.current = null;
          activeStreamingIdsRef.current.clear();
          setSending(false);
          return;
        }

        if (streamEvent.type === "error") {
          console.error(streamEvent.message ?? "Streaming error");
          es.close();
          esRef.current = null;
          activeStreamingIdsRef.current.forEach((messageId) => {
            setMessageStreaming(messageId, false);
          });
          activeStreamingIdsRef.current.clear();
          setSending(false);
        }
      };

      es.onerror = () => {
        es.close();
        esRef.current = null;
        activeStreamingIdsRef.current.forEach((messageId) => {
          setMessageStreaming(messageId, false);
        });
        activeStreamingIdsRef.current.clear();
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
    <footer className="relative flex h-[62px] flex-shrink-0 items-center gap-2 bg-[--wa-sidebar-bg] px-4 py-2">
      {showMentions ? (
        <div className="absolute bottom-[62px] left-[104px] z-20 mb-2 w-72 overflow-hidden rounded-lg bg-[--wa-header-bg] py-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
          {mentionOptions.map((agent, index) => (
            <button
              key={agent.id}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => completeMention(agent)}
              className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[14px] transition-colors duration-150 ${
                index === selectedMentionIndex
                  ? "bg-[--wa-hover] text-[--wa-green]"
                  : "text-[--wa-text-primary] hover:bg-[--wa-hover]"
              }`}
            >
              <span className="truncate font-medium">@{agent.slug}</span>
              <span className="rounded-full bg-[--wa-green] px-2 py-0.5 text-[11px] font-semibold capitalize text-[--wa-main-bg]">
                {agent.backend}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Emoji (coming soon)"
        disabled
        className="grid h-9 w-9 flex-shrink-0 cursor-not-allowed place-items-center rounded-full text-[--wa-icon] opacity-50"
      >
        <EmojiIcon />
      </button>
      <button
        type="button"
        aria-label="Attachment (coming soon)"
        disabled
        className="grid h-9 w-9 flex-shrink-0 cursor-not-allowed place-items-center rounded-full text-[--wa-icon] opacity-50"
      >
        <AttachmentIcon />
      </button>

      <div className="flex min-h-[42px] flex-1 items-center rounded-lg bg-[--wa-input-bg] px-3 py-[9px]">
        <textarea
          ref={textareaRef}
          value={content}
          rows={rows}
          placeholder="Type a message"
          onChange={(event) => {
            updateContent(event.target.value, event.target.selectionStart);
          }}
          onClick={updateCaret}
          onKeyUp={updateCaret}
          onKeyDown={handleKeyDown}
          className="max-h-[110px] min-h-5 w-full resize-none bg-transparent text-[15px] leading-5 text-[--wa-text-primary] outline-none placeholder:text-[--wa-text-secondary]"
        />
      </div>

      {hasText ? (
        <button
          type="button"
          aria-label="Send"
          onClick={() => void submitMessage()}
          disabled={isBusy}
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[--wa-green] text-white transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendIcon />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Voice message"
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-[--wa-icon] transition-colors duration-150 hover:bg-[--wa-hover]"
        >
          <MicIcon />
        </button>
      )}
    </footer>
  );
}
