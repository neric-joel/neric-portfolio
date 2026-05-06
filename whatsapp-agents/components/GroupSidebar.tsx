"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { normalizeMessage, useChat } from "@/contexts/ChatContext";
import type { Message } from "@/types";

function truncateText(text: string) {
  return text.length > 58 ? `${text.slice(0, 58)}...` : text;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function formatPreviewTime(value?: string) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full text-[--wa-icon] transition-colors duration-150 hover:bg-[--wa-hover]"
    >
      {children}
    </button>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h7A2.5 2.5 0 0 1 16 7.5v.7l3.1-1.8A1.25 1.25 0 0 1 21 7.5v9a1.25 1.25 0 0 1-1.9 1.07L16 15.8v.7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 16.5v-9Zm2.5-.75a.75.75 0 0 0-.75.75v9c0 .41.34.75.75.75h7c.41 0 .75-.34.75-.75v-9a.75.75 0 0 0-.75-.75h-7Z" />
    </svg>
  );
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

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
      <path d="M11 5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5Z" />
    </svg>
  );
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
      alert(`Failed to create group: ${response.status}`);
      return;
    }

    const group = (await response.json()) as { id: number };
    await refreshGroups();
    setActiveGroupId(group.id);
  }

  return (
    <aside className="relative flex h-screen w-[360px] flex-shrink-0 flex-col border-r border-[--wa-separator] bg-[--wa-sidebar-bg]">
      <header className="flex h-[60px] flex-shrink-0 items-center justify-between bg-[--wa-header-bg] px-4">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[--wa-green] text-sm font-semibold text-white">
          Y
        </div>
        <div className="flex items-center gap-1">
          <IconButton label="Video">
            <VideoIcon />
          </IconButton>
          <IconButton label="Search">
            <SearchIcon />
          </IconButton>
          <IconButton label="Menu">
            <MenuIcon />
          </IconButton>
        </div>
      </header>

      <div className="flex h-[49px] flex-shrink-0 items-center px-[10px] py-1.5">
        <label className="flex h-[37px] w-full items-center gap-3 rounded-full bg-[--wa-input-bg] px-4 text-[--wa-text-secondary]">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search or start new chat"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-[--wa-text-primary] outline-none placeholder:text-[--wa-text-secondary]"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-20">
        {groups.map((group) => {
          const isActive = group.id === activeGroupId;
          const groupMessages = messages[group.id] ?? [];
          const lastMessage = groupMessages[groupMessages.length - 1];

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroupId(group.id)}
              className={`flex h-[72px] w-full cursor-pointer items-center px-4 text-left transition-colors duration-150 ${
                isActive ? "bg-[#2a3942]" : "hover:bg-[--wa-hover]"
              }`}
            >
              <div className="mr-4 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#00a884] to-[#02775f] text-[13px] font-semibold text-white">
                {getInitials(group.name)}
              </div>
              <div className="flex h-full min-w-0 flex-1 flex-col justify-center border-b border-[--wa-separator]">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="min-w-0 flex-1 truncate text-[15px] font-normal text-[--wa-text-primary]">
                    {group.name}
                  </span>
                  <span className="flex-shrink-0 text-[12px] text-[--wa-text-secondary]">
                    {formatPreviewTime(lastMessage?.created_at ?? group.updated_at)}
                  </span>
                </div>
                <span className="mt-0.5 truncate text-[14px] leading-5 text-[--wa-text-secondary]">
                  {lastMessage ? truncateText(lastMessage.content) : "No messages yet"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={createNewGroup}
        aria-label="New chat"
        className="absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-full bg-[--wa-green] text-white shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-opacity duration-150 hover:opacity-90"
      >
        <PlusIcon />
      </button>
    </aside>
  );
}
