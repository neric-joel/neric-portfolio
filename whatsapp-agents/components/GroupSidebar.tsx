"use client";

import { useEffect } from "react";
import { normalizeMessage, useChat } from "@/contexts/ChatContext";
import type { Message } from "@/types";

function truncateText(text: string) {
  return text.length > 48 ? `${text.slice(0, 48)}...` : text;
}

export function GroupSidebar() {
  const {
    groups,
    messages,
    activeGroupId,
    setActiveGroupId,
    refreshGroups,
    setMessagesForGroup,
  } = useChat();

  useEffect(() => {
    groups.forEach((group) => {
      if (messages[group.id] !== undefined) {
        return;
      }

      fetch(`/api/groups/${group.id}/messages`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load message preview");
          }
          return response.json() as Promise<Message[]>;
        })
        .then((data) => setMessagesForGroup(group.id, data.map(normalizeMessage)))
        .catch((error: unknown) => console.error(error));
    });
  }, [groups, messages, setMessagesForGroup]);

  async function createNewGroup() {
    const name = window.prompt("Group name");
    if (!name?.trim()) {
      return;
    }

    const response = await fetch("/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.trim() }),
    });

    if (!response.ok) {
      console.error("Failed to create group");
      return;
    }

    const group = (await response.json()) as { id: number };
    await refreshGroups();
    setActiveGroupId(group.id);
  }

  return (
    <aside className="flex h-screen w-72 flex-shrink-0 flex-col border-r border-white/10 bg-[--bg-sidebar]">
      <div className="border-b border-white/10 px-5 py-5">
        <h1 className="animate-gradient-shift bg-gradient-to-r from-[--accent-cyan] via-white to-[--accent-purple] bg-[length:200%_200%] bg-clip-text text-2xl font-semibold text-transparent">
          Agent Chat
        </h1>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto py-3">
        {groups.map((group) => {
          const isActive = group.id === activeGroupId;
          const groupMessages = messages[group.id] ?? [];
          const lastMessage = groupMessages[groupMessages.length - 1];

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroupId(group.id)}
              className={`flex w-full flex-col gap-1 border-l-2 px-4 py-3 text-left transition-all duration-150 hover:bg-white/5 ${
                isActive
                  ? "border-[--accent-cyan] bg-[--bg-bubble]"
                  : "border-transparent"
              }`}
            >
              <span className="truncate text-sm font-medium text-[--text-primary]">
                {group.name}
              </span>
              <span className="h-5 truncate text-xs text-[--text-muted]">
                {lastMessage ? truncateText(lastMessage.content) : "No messages yet"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={createNewGroup}
          className="neon-glow w-full rounded-lg bg-[--accent-cyan] px-4 py-2.5 text-sm font-semibold text-black transition-all duration-150 hover:opacity-90"
        >
          New Group
        </button>
      </div>
    </aside>
  );
}
