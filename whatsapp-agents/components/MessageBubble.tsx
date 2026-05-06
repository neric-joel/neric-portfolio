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
  const senderName = agent?.display_name ?? "Agent";

  if (isUser) {
    return (
      <div className="mb-1 flex justify-end">
        <div className="animate-fade-in-up flex max-w-[65%] flex-col items-end">
          <div className="mb-1 text-[12.5px] font-medium leading-4 text-[--wa-text-secondary]">
            You
          </div>
          <div className="wa-bubble-tail-out relative rounded-[7.5px_0_7.5px_7.5px] bg-[--wa-bubble-out] px-[7px] py-[6px] pb-2 pl-[9px] text-left shadow-sm">
            <p className="whitespace-pre-wrap break-words text-[15px] leading-[1.45] text-[--wa-text-primary]">
              {message.content}
              {isStreaming ? (
                <span className="animate-blink-cursor ml-0.5 inline-block text-[--wa-text-primary]">
                  |
                </span>
              ) : null}
            </p>
            <div className="mt-1 text-right text-[11px] leading-3 text-[--wa-text-timestamp]">
              {formatTimestamp(message.created_at)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-1 flex justify-start">
      <div className="animate-fade-in-up flex max-w-[65%] flex-col items-start">
        <div className="mb-1 text-[12.5px] font-bold leading-4 text-[--wa-green]">
          {senderName}
        </div>
        <div className="wa-bubble-tail-in relative rounded-[0_7.5px_7.5px_7.5px] bg-[--wa-bubble-in] px-[7px] py-[6px] pb-2 pl-[9px] shadow-sm">
          <p className="whitespace-pre-wrap break-words text-[15px] leading-[1.45] text-[--wa-text-primary]">
            {message.content}
            {isStreaming ? (
              <span className="animate-blink-cursor ml-0.5 inline-block text-[--wa-green]">
                |
              </span>
            ) : null}
          </p>
          <div className="mt-1 text-right text-[11px] leading-3 text-[--wa-text-timestamp]">
            {formatTimestamp(message.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
}
