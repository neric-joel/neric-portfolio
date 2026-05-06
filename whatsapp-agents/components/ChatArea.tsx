"use client";

import { useState } from "react";
import { AgentRegistry } from "@/components/AgentRegistry";
import { ChatInput } from "@/components/ChatInput";
import { ChatThread } from "@/components/ChatThread";
import { useChat } from "@/contexts/ChatContext";

export function ChatArea() {
  const { groups, activeGroupId } = useChat();
  const [isRegistryOpen, setIsRegistryOpen] = useState(false);
  const activeGroup = groups.find((group) => group.id === activeGroupId);

  if (!activeGroup || activeGroupId === null) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center bg-[--bg-primary] px-6">
        <p className="text-sm text-[--text-muted]">Select a group to begin</p>
      </section>
    );
  }

  return (
    <section className="relative flex min-w-0 flex-1 flex-col bg-[--bg-primary]">
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/10 px-6">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-[--text-primary]">
            {activeGroup.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setIsRegistryOpen((open) => !open)}
          className="rounded-lg border border-[--accent-cyan]/40 px-4 py-2 text-sm font-medium text-[--accent-cyan] transition-all duration-150 hover:bg-[--accent-cyan]/10"
        >
          Agents
        </button>
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
