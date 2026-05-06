"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AgentRegistry } from "@/components/AgentRegistry";
import { ChatInput } from "@/components/ChatInput";
import { ChatThread } from "@/components/ChatThread";
import { useChat } from "@/contexts/ChatContext";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : name.slice(0, 2);
  return letters.toUpperCase();
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M10.5 4a6.5 6.5 0 0 1 5.15 10.46l3.45 3.45a.84.84 0 0 1-1.19 1.19l-3.45-3.45A6.5 6.5 0 1 1 10.5 4Zm0 1.7a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    </svg>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full text-[--wa-icon] transition-colors duration-150 hover:bg-[--wa-hover]"
    >
      {children}
    </button>
  );
}

export function ChatArea() {
  const { groups, activeGroupId, agentsInGroup } = useChat();
  const [isRegistryOpen, setIsRegistryOpen] = useState(false);
  const activeGroup = groups.find((group) => group.id === activeGroupId);

  if (!activeGroup || activeGroupId === null) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center bg-[--wa-main-bg] px-6">
        <p className="text-[14px] text-[--wa-text-secondary]">
          Select a chat to begin
        </p>
      </section>
    );
  }

  const memberSummary =
    agentsInGroup.length === 0
      ? "No agents"
      : agentsInGroup.map((agent) => agent.display_name).join(", ");

  return (
    <section className="relative flex min-w-0 flex-1 flex-col bg-[--wa-main-bg]">
      <header className="flex h-[60px] flex-shrink-0 items-center justify-between bg-[--wa-header-bg] px-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#00a884] to-[#02775f] text-[13px] font-semibold text-white">
            {initials(activeGroup.name)}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-[16px] font-semibold leading-5 text-[--wa-text-primary]">
              {activeGroup.name}
            </h2>
            <p className="truncate text-[13px] leading-5 text-[--wa-text-secondary]">
              {memberSummary}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <IconButton label="Search">
            <SearchIcon />
          </IconButton>
          <IconButton
            label="Agent menu"
            onClick={() => setIsRegistryOpen((open) => !open)}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </header>

      <ChatThread />
      <ChatInput />
      <AgentRegistry
        open={isRegistryOpen}
        onClose={() => setIsRegistryOpen(false)}
      />
    </section>
  );
}
