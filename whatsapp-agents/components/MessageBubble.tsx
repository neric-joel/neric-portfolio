import type { Agent, Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  agent?: Agent;
  isStreaming?: boolean;
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function MessageBubble({
  message,
  agent,
  isStreaming = false,
}: MessageBubbleProps) {
  const isUser = message.sender_type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] ${
          isUser ? "items-end text-right" : "items-start text-left"
        } flex flex-col gap-1`}
      >
        <div
          className={`rounded-xl px-4 py-3 text-sm leading-6 transition-all duration-150 ${
            isUser
              ? "neon-glow-purple border border-[--accent-purple]/40 bg-[--accent-purple]/20"
              : "neon-glow border border-[--accent-cyan]/30 bg-[--accent-cyan]/10"
          }`}
        >
          {!isUser ? (
            <div className="mb-2">
              <span className="rounded-full border border-[--accent-cyan]/30 bg-[--accent-cyan]/10 px-2 py-0.5 text-xs font-medium text-[--accent-cyan]">
                @{agent?.slug ?? "agent"}
              </span>
            </div>
          ) : null}
          <p className="whitespace-pre-wrap break-words text-[--text-primary]">
            {message.content}
            {isStreaming ? (
              <span className="animate-blink-cursor ml-0.5 inline-block text-[--accent-cyan]">
                |
              </span>
            ) : null}
          </p>
        </div>
        <span className="text-xs text-[--text-muted]">
          {formatTimestamp(message.created_at)}
        </span>
      </div>
    </div>
  );
}
